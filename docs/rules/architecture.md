# Architecture rules — Digital Billing Core

Permanent coding rules for implementation sessions. Behaviour questions resolve to the FSD; architecture questions to the Blueprint; implementation detail to the TDS. This file never overrides those documents — if a rule here seems to conflict, the source document wins and the conflict is a bug to report, not to improvise around.

## Current system
- The system is a set of logical services packaged as few deployables (logical boundaries are fixed; physical packaging follows the current tier).
- The core runtime object is the bill record: an immutable FACTS item plus append-only STATUS items and linked credit-note items in the Bill Store.
- The synchronous path ends at the 202 ACK. Everything after ingestion is event-driven via Kafka.
- Merchant dashboard, customer portal, and bill microsite operate on the same bill, config, and engagement data with different auth models and permissions.

## Real runtime model
- `bill_id` is deterministic from the idempotency key; `idempotency_key` derives from the invocation source (PG callback vs direct API).
- Bill FACTS is write-once. Only two mutations are ever legal: `contact_enc → null` + `scrubbed_at` (Compliance scrub only) and `artifact_ver` bumps (re-render only).
- Bill state is an append-only STATUS chain: REQUESTED → GENERATED → (DISPATCHED → DELIVERED | DELIVERY_FAILED) | NO_CONTACT. Current state = latest item. Transitions are conditional appends; illegal transitions are dropped as stale signals, never forced.
- Credit notes are immutable linked records under the bill; the cap (Σ notes ≤ bill value) is enforced transactionally at write time.
- The Metering Ledger is append-only conditional puts keyed (bill, channel, attempt); charges are derived by summation. No running totals exist anywhere.
- The Event Relay (CDC/outbox from the Bill Store change stream) is the only publisher of bill lifecycle events. Services never publish `bill.*` topics directly.
- `merchant_id` is the universal partition and scoping key: Kafka partition key, Bill Store partition prefix, and the tenancy filter on every query path.
- PII exists in exactly two places: `contact_enc` on FACTS and the PII Vault. Events, logs, traces, analytics, and queues carry surrogate/opaque refs only.
- The audit stream is append-only; privileged actions (Ops cross-merchant reads, scrubs, resends, config/role changes) fail closed if the audit write fails.

## Bounded contexts and service boundaries
- The eight logical services are: Ingestion (incl. Event Relay), Orchestration & Rendering, Dispatch, Merchant Config & Templates, CRM, Analytics (incl. Beacon Collector), Experience BFF, Compliance Jobs.
- Boundaries follow scaling and failure profiles, not org charts or FSD section numbers. New code maps into one of these eight unless a new, named, independent scaling or failure profile justifies a ninth.
- Components that always execute together per bill (validation, label resolve, template render) stay inside one service. Do not introduce a network hop for zero independent-scaling benefit.
- Logical boundaries are contracts (module separation + event/API schemas); physical extraction is a deployment change earned by measured divergence, never a rewrite. Do not couple modules within a deployable in ways that would block extraction.

## Module ownership and database ownership
- One writer per table/item type. Ownership map:
  - Ingestion: Bill FACTS creation, initial STATUS=REQUESTED, credit-note items.
  - Orchestration: STATUS GENERATED/NO_CONTACT, `artifact_ver`, S3 artifacts.
  - Dispatch: STATUS DISPATCHED/DELIVERED/DELIVERY_FAILED, Metering Ledger, send-dedup markers.
  - Config & Templates: all Config DB tables.
  - CRM: all PII Vault tables.
  - Analytics: aggregates, feedback, event archive.
  - Compliance: the scrub mutations (the ONLY writer allowed to null `contact_enc`), tiering moves.
  - BFF: owns nothing durable.
- Reads across a boundary go through the owner's published API, the event stream, or an explicitly sanctioned read pattern (Bill Store point reads / GSI, config cache). Never query another module's Postgres tables directly.
- Each store is chosen per access pattern (KV bills, relational config, isolated PII Vault, columnar/aggregate analytics). Do not put a new entity in a store because it is convenient; match it to its access pattern and owner.

## Dependency direction and cross-module interaction
- On the bill-generation path, service→service handoff is Kafka only. Sync arrows point at stores, caches, and the mesh — never at another service.
- Accepted sync exceptions: BFF reads Config, CRM, Analytics APIs, Bill Store GSI, and delegates resend to Dispatch — human-facing read paths with their own timeouts, circuit breakers, and per-panel bulkheads. Do not add new sync exceptions without an ADR.
- The ACK path (Ingestion) has NO synchronous dependency on Vault, Redis, Kafka availability, or any downstream service. Its hot path is: verify, encrypt, one conditional transact-write, respond.
- Downstream consumers must tolerate lag independently: Dispatch/Orchestration lag pages fast; CRM/Analytics lag is tolerated longer and never blocks bills.

## Event-driven communication
- Every event uses the standard envelope (event_id ULID, type, schema_version, occurred_at, merchant_id, trace_id, payload) and is registered in the schema registry before any consumer code merges.
- Schema evolution is additive-only. A breaking change is a new topic version with a parallel-run deprecation window — never an in-place mutation.
- Kafka is at-least-once. Every consumer is idempotent, keyed (bill_id, step), with manual commit after the side effect. Duplicate consumption of any event must be a provable no-op (conditional writes, dedup markers, natural-key upserts).
- Every consumer has a DLQ; DLQ depth pages with a linked runbook.
- No PII in any event payload, ever. Contact data is resolved from the bill record or Vault at point of use.
- Direct-publish is allowed only for topics carrying no invariant (engagement.events, config.changed, compliance.scrub_due). Bill lifecycle events come from the Event Relay only.

## Synchronous communication
- External APIs are versioned in the path (/v1) with the standard error envelope (stable error_code, no internals, no PII, trace_id). 4xx = change the request; 5xx = retryable; 409 = idempotency/state conflict returning the existing resource id.
- Outbound HTTP: timeout + bounded retries with jitter, per-dependency retry budget, circuit breakers. Never tight-loop or sleep in memory for retries — deferred work goes to the retry queue.
- Internal service-to-service calls use mTLS + workload identity; no shared static secrets.

## Transaction boundaries
- No transaction spans two stores. Every invariant is enforceable within a single store's transactional unit (conditional put, transact-write, or a Postgres transaction). If a design seems to need a cross-store transaction, the design is wrong — restructure or escalate.
- Idempotency, the credit-note cap, one-default-template, and metering uniqueness are enforced in the durable store's write, never in application memory or cache. Caches are never authoritative for any invariant.
- Multi-item atomicity within a store uses the store's native mechanism (transact-write for FACTS+STATUS; Postgres transactions for default-swap).

## Tenancy, auth, and PII boundaries
- `merchant_id` comes from the validated token/session scope, never from the request body. A body merchant_id, if present, must match or be rejected. Scope is re-checked at the data layer.
- Roles mirror the FSD role table exactly; role gates are enforced in services, pre-filtered at the gateway.
- Decrypt grants on the PII key are per-workload and minimal (Dispatch, CRM, BFF-portal path, Compliance). Never widen a grant to make a feature easier.
- Contact plaintext exists in memory only at point of use; never logged, never in errors, never in queue payloads. Log redaction is deny-tested in CI.

## Domain modeling
- Money is integers in minor units (paise), field suffix `_paise`, everywhere including metering and credit notes. No floats in any money path — lint-enforced.
- Timestamps are UTC ISO-8601; bill business date is the sale time from the payload, stored alongside server receive time.
- `bill_type` is determined by invocation path and is never caller-overridable. Receipt and invoice validation rules are distinct; do not blur them.
- Corrections are new records (credit notes, new STATUS items, new artifact versions) — never edits. Prefer append-only child records wherever traceability matters.
- Parse, don't validate: constraints live in the schema (CHECKs, unique indexes, FKs, enums) first, API validation second, never only in application logic.
- Missing widget/contact data degrades explicitly (block omitted, NO_CONTACT state) — never rendered empty, never silently defaulted.

## Shared libraries and anti-corruption layers
- Shared code is limited to genuinely cross-cutting, domain-free concerns: event envelope/serde, error envelope, auth-context propagation, observability, money type, retry/breaker utilities. No domain logic in shared libraries; a shared lib that knows what a bill is has crossed the boundary.
- Every third party sits behind an anti-corruption layer owned by exactly one module: provider adapters behind a common port in Dispatch; the PG contract isolated in Ingestion; the Bill Store behind a repository interface (put-if-absent / get / query-by-partition) with a named portable fallback. Vendor-specific types never leak past the adapter.
- External inputs (PG payloads, provider callbacks, merchant templates, logo uploads) are untrusted at the boundary: verify signatures over raw bytes before parsing, re-encode uploads, treat templates as logic-less data, encode all merchant-supplied output.

## Extensibility and backwards compatibility
- Extend by configuration and additive contracts, not by new implementation paths: new channels are new adapters behind the Dispatch port; new widgets are new block types in the layout enum; new bill sources conform to the existing ingestion contract and idempotency scheme.
- Published API and event contracts are one-way doors: additive evolution only, deprecations announced with a published window, and DB migrations are expand–contract (never destroy a column in the same release as the code that stops using it).
- Behaviour changes require an FSD revision first; feature flags gate rollout, not undocumented behaviour changes. Flags carry an owner and expiry.
- Scaling changes tier by configuration (replicas, partitions, node pools, cells). Data model, event contracts, partition keys, and idempotency design never change with tier.

## Architectural decision records
- Any change to: a service boundary, a store choice, a sync exception, an event contract's semantics, an auth mechanism, or a T1 invariant's enforcement point requires an ADR before code.
- ADR format: context, decision, why, trade-off, revisit-when. Every choice names its runner-up and why it lost.
- Existing ADRs bind: do not re-litigate a settled ADR in code; propose a superseding ADR with new information instead.

## Coding boundaries
- Controllers/handlers stay thin; orchestration lives in services and domain helpers. The write path stays minimal and auditable.
- 12-factor config: all tunables via config/env with documented defaults; no magic numbers.
- Every module is independently buildable against fakes/stubs of its registered contracts; stubs for build-time blockers are marked and release-gated from production.
- Testing floor per module: unit tests on branching logic; contract tests against registered schemas; the T1 money-path floor (happy / retry / partial / concurrent / reconciles) wherever money or bill-creating state is touched; every fixed bug gets a pinning test.
- Observability is part of done: trace propagation (incl. Kafka headers), RED metrics, named domain metrics, structured PII-free logs. A component cannot take production traffic without runbooks, rollback, and runbook-linked alerts.

## Forbidden architectural patterns
- No second implementation path for bill creation, idempotency, event emission, state transitions, or scrubbing. One write path, one relay, one scrub executor.
- No synchronous service-to-service calls on the bill-generation path.
- No cache as source of truth for any invariant; no invariant enforced only in application memory.
- No floats in money paths; no mutable running totals; no editing generated bills or ledger rows.
- No PII in events, logs, traces, metrics, analytics, or queue payloads; no caching of decrypted contact data.
- No cross-store transactions; no direct writes to another module's tables; no bypassing the owner's API.
- No merchant scope from request bodies; no unauthenticated inbound callbacks; no external URL fetches at render time.
- No unregistered or breaking event schema changes; no destructive migration in the same release as its code change.
- No infrastructure, workflow engines, or services documented or referenced that do not exist in this repo.

## Future module additions
- A new module requires: a named independent scaling or failure profile, an ADR, registered contracts before consumer code, an ownership row in this file's map, and stubs so it remains build-alone.
- Prefer extending an existing boundary first; a new module is the last resort, not the default. Splits are earned by measurement (divergent scaling in practice, or team ownership splitting), never scheduled.
- Any addition inherits every cross-cutting convention above with no exceptions by default; deviations are per-rule, ADR-recorded, and never implied.
