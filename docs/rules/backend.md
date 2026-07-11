# Backend Engineering Rules — Digital Billing Platform

Permanent implementation rulebook. Behaviour questions resolve to the FSD; architecture questions to the Blueprint; implementation detail to the TDS. If code you are writing seems to require violating any of those, stop and report the conflict — never improvise around it.

## Module shape
- Organize code by domain module matching the logical service boundaries (Ingestion, Orchestration/Rendering, Dispatch, Config/Templates, CRM, Analytics, BFF, Compliance). Modules communicate only through registered event schemas or documented API contracts — never through shared internal classes or direct DB reads into another module's tables.
- Each module owns its entities exclusively. Only the owning module writes its tables; the sole exception is the Compliance scrub executor, the only writer permitted to null `contact_enc`.
- Components that always execute together per request stay in one module (e.g. calculation validator + label resolver + template engine). Do not introduce a network hop without an independent-scaling or ownership reason.
- Logical modules ship in the tiered physical packaging (sync plane / async workers / analytics consumers). Extraction is a deployment change, never a rewrite — keep module boundaries clean enough that this stays true.

## Controllers
- Controllers validate shape, enforce auth context, and delegate. No business logic, no DB access.
- `merchant_id` always comes from the gateway-validated token scope, never from the request body. If the body carries a merchant id, it must match scope or the request is rejected (403).
- Verify signatures over the raw body before any parsing (PG callback, provider callbacks). Constant-time compare; per-merchant secrets from the secrets manager, cached with TTL + version.
- Return the standard error envelope: `{error_code (stable string), message (operator-readable, no internals, no PII), field?, trace_id}`. 4xx = caller must change the request; 5xx = caller may retry; 409 = idempotency/state conflict and must carry the existing resource id.

## Services & business logic placement
- Services own orchestration and authorization-aware domain behavior. Re-check merchant scope at the data layer, not just the controller.
- Business invariants live in exactly one place, closest to the data: one-default-template is a schema constraint; credit-note cap is a transactional conditional write; survey-once is a unique index. Never re-implement an invariant in application code that the store already enforces.
- Validation is parse-don't-validate: reject invalid input at the boundary with field-level reasons; downstream code assumes validated types.
- Bill-type routing, calculation validation, and GST validation follow the FSD by section number. A calc mismatch is a 422 with `{expected, supplied}` and no write.

## Repositories & data access
- Every query path is scoped by `merchant_id` (partition key everywhere). No cross-merchant scans; Ops read-across is break-glass and audited.
- Bill records are append-only: facts immutable after create; status transitions and credit notes are new records referencing the bill. Corrections are new entries, never edits.
- State transitions are enforced by conditional appends in the writer. An illegal transition means a duplicate/stale signal: drop it with a metric, don't error the flow.
- Dashboard/list reads go through designed indexes (GSI patterns); if a filter can't be served by an existing index projection, that's a design change, not a scan.
- No caching of PII, ever. No caching of bill data. Config reads use the write-through cache with TTL backstop and read-replica fallback.

## DTOs & contracts
- API and event schemas are registered contracts with additive-only evolution. Never repurpose or change the meaning of an existing field.
- Map provider-specific response shapes to domain types at the adapter boundary; provider semantics never touch domain logic.
- Response contracts stay stable across consumers; derived views are computed server-side once, not recomputed per client.
- Event envelope is fixed: `{event_id (ULID), type, schema_version, occurred_at, merchant_id, bill_id?, trace_id, payload}` — and payloads carry no PII, only surrogate ids.

## Dependency injection & integrations
- External providers (WhatsApp/SMS/Email, verification, PG) sit behind adapters implementing a common port, injected by interface. Contract tests run against fixtures or sandbox per provider.
- The hot ACK path has no synchronous dependency on the Vault, Redis, or any downstream service. Anything that can be async is async.
- All tunables (retry counts, TTLs, budgets, rate limits) come from config/env with documented defaults. No magic numbers in code.

## Events & asynchronous processing
- Services do not publish bill lifecycle events directly. Write the store item; the Event Relay (CDC/outbox) turns the change stream into topics. Only non-invariant events (`engagement.events`, `config.changed`) are direct-publish.
- Consumers are at-least-once and idempotent, keyed on `(bill_id, step)` or `event_id`; commit offsets manually only after the side-effect is durable. Duplicate delivery must be a no-op.
- Poison messages: bounded handler retries, then DLQ with paging and a runbook link. A DLQ that should be empty pages when it isn't.
- Replay is the recovery mechanism: every consumer must be safe to re-run over history and converge to identical state.
- Delays are queue messages with `not_before`, never in-memory sleeps.

## Transactions & financial consistency
- Money is integers in minor units (`_paise` suffix) everywhere, including metering and credit notes. No floats in any money path — lint-enforced.
- Charges are derived by summation over an append-only ledger. No mutable running totals anywhere.
- Meter-then-send: record the metering entry (conditional put) before calling the paid provider. A metered-but-unsent attempt is reconciled later; the reverse loses money and is forbidden.
- Caps that must hold under concurrency (credit-note ≤ bill value) are enforced inside a single transaction/conditional expression — a transactional read of the prior sum plus the conditional write, so racing writers cannot exceed the cap.
- Related writes that must be atomic (facts + initial status) go in one transact-write.

## Idempotency
- Creation is a conditional put on a deterministic idempotency key derived from the caller's transaction identity. A replay loses the write race, reads the existing record, and returns it with 409/202-existing semantics. Correctness never depends on a cache being up.
- Derived ids are deterministic functions of the idempotency key so retries mint the same identifiers.
- Sends are deduped with a conditional sent-marker `(bill_id, channel, attempt)` before the provider call. Provider callbacks are idempotent on `provider_msg_id`.
- Batch items are independent: one bad item never fails the batch; return per-item results; resubmitting overlap is safe by idempotency.

## Error handling
- Outbound HTTP: timeout + bounded retries with exponential backoff and jitter; a retry budget per dependency; circuit breakers on sustained failure. Breaker-open skips to the fallback path (e.g. failover channel) rather than queueing against a dead dependency.
- Throttled hot-path writes return 503 + Retry-After; caller retries are safe because creation is idempotent.
- Design the failure leg of every sequence explicitly: what happens on crash mid-flow, on partial write, on missing callback. If the answer is "rerun converges," prove it with a test.
- Fail closed on auth infrastructure outages. Never leak lockout state, internals, or existence of resources (uniform responses on enumeration-prone endpoints).
- Non-critical collection paths (beacons) never block the user-facing response: accept, drop on internal error with a counter.

## Logging, PII & auditability
- Contact data exists only in its two designated encrypted locations. Logs, events, metrics, traces, queue payloads, and error messages carry surrogate ids only. Plaintext contact lives in memory just long enough for the provider call.
- Log-redaction is deny-tested in CI — a test that asserts PII patterns cannot reach log output.
- Structured JSON logs; OTel traces with `trace_id` propagated from the gateway through queue headers; RED metrics per endpoint/consumer plus named domain metrics.
- Every privileged or state-changing operator action (resend, break-glass read, legal-hold change, scrub, job run) writes an append-only audit entry with actor and reason. Prefer append-only action logs over overwrites wherever traceability matters.
- Scheduled jobs audit their own runs (start/end/counts).

## Background jobs & scheduled work
- Batch/compliance work runs in its own workload on off-peak schedules with rate caps — it never contends with real-time traffic.
- Every job is idempotent; rerunning is the recovery path. Items that fail stay due and are retried next run.
- SLOs on jobs are externally verified by reconciliation, not assumed: a completeness check pages when work is overdue.
- Reconciliation jobs (money vs provider reports, internal sums, event counts vs status counts) page on any nonzero drift; a recon that can't fail its seeded-discrepancy fixtures is theatre.

## Testing
- Floor per module: unit tests on branching logic; contract tests against registered schemas; every acceptance criterion mapped to an owning test; every fixed bug gets a pinning test.
- T1 money-path floor wherever money or record-creating state is touched — five cases minimum: happy / retry (same key) / partial failure / concurrent race / reconciles.
- Property tests on core invariants (e.g. at most one record per idempotency key under concurrent replay; invalid layouts always rejected).
- Idempotent-consumer tests: duplicate event delivery produces exactly one side-effect.
- IDOR suite on every human-facing endpoint: fuzz with foreign merchant/bill/contact ids. Role-matrix tests generated from the role table.
- Rebuild/replay recovery paths are rehearsed in CI, not assumed.
- Each module must be buildable alone against documented stubs/fakes; production-gated stubs are flagged, and flag removal is a release gate.

## Performance & scalability
- Know the latency budget of the path you're on before writing it; hot-path budgets are per-service and tighter than the gateway SLA. Keep heavy work (PDF render, enrichment, analytics) off the per-request path — lazy or async.
- Hot-path services are stateless and scale on RPS; workers scale on queue depth/consumer lag with lag alarms sized to the downstream latency budget.
- Bound every resource: render CPU/memory/time caps with a fallback path and quarantine for offenders; batch size caps; per-caller and per-resource rate limits.
- Partition keys are chosen so no single tenant creates a hot partition; verify new query patterns against index design before shipping them.
- Timestamps are UTC ISO-8601; business time (from payload) is stored alongside server-received time — don't conflate them.
