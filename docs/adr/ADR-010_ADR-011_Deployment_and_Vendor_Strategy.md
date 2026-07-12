# ADR-010 — Deployment Architecture Principles

**Status:** Approved · **Date:** 2026-07-12 · **Consistent with:** FSD v1.0-r1, Blueprint v1.2 (§13, §15, §16, §19), TDS v1.0-r1, Methodology v1.0 Phase 5, architecture.md

## Context

Blueprint §19 defines the CI/CD gate table and §13/§15 define canary and rollback behaviour, but they describe *what the pipeline must guarantee*, not the platform-independent contract a deployment engine must implement. Dozens of roadmap tasks (foundation CI, per-service operability gates, launch hardening) will each touch deployment; without a single principled ADR, each task risks re-deriving — or drifting from — the same rules. The project's standing philosophy applies: boring technology, explicit interfaces, adapters for infrastructure, no vendor names in architectural truth.

## Decision

Deployment is defined as a **platform-neutral contract** with the following principles. Any concrete deployment engine chosen later must implement this contract; none of it may be weakened by tool choice.

### 1. Deployment philosophy
- Shipping is boring: small, frequent, reversible, rehearsed (Methodology 5.2). Deploy size correlates superlinearly with risk; the unit of deployment is the smallest independently verifiable change.
- Deploy is decoupled from release: feature flags separate "code on servers" from "users experience it." Every flag carries an owner and an expiry (Blueprint §19 flag hygiene).
- A service cannot take production traffic until its runbooks and rollback are written and its alerts link to them (operability gate — this is a deployment invariant, not a launch checklist item).

### 2. One-artifact promotion
- Every merge produces exactly **one immutable, signed, uniquely versioned artifact per deployable**. That artifact — not the source — is promoted through environments. **Never rebuilt per stage** (Methodology 5.1: rebuilding is how "it passed staging" becomes fiction).
- Artifact identity is content-addressed or digest-pinned; environment differences are injected exclusively via 12-factor configuration (architecture.md), never baked in.

### 3. Promotion contract
Every promotion from environment E→E+1 must record, immutably:
- the artifact digest and version being promoted;
- the FSD version the release implements (Blueprint §19 release policy — "FSD frozen" is enforceable);
- the gate results of E (test suites, contract tests, schema-registry verification, PII-in-logs suite, security scans) with pass evidence;
- the promoting identity (human or automation) and timestamp;
- the migration set included, each tagged expand / migrate / contract.
A promotion missing any field is invalid. Promotions are append-only records; a failed promotion is superseded by a new one, never edited.

### 4. Canary stages
- Production rollout is progressive, from a smallest slice to full traffic, with the canary-merchant probe (Blueprint §14) exercised end-to-end in the canary slice before real merchant traffic reaches new code.
- The **number of stages, their fractions, and dwell times are deployment configuration, not architecture** — declarative, versioned, per-tier. This ADR fixes only that rollout is staged and gated; fixing the stage count today would be a premature decision.
- Canary respects the domain calendar: bill-lifecycle and metering changes avoid billing-cycle peaks (Methodology 5.5 — a deploy can be HTTP-healthy and money-broken).

### 5. Gate evaluation
- Each canary stage advances only on **automatic evaluation of golden signals AND domain signals**: error rate, latency percentiles, saturation, *plus* bill-generation success rate, dispatch success rate, and reconciliation drift. Domain signals are first-class gates, never advisory.
- Gates evaluate against error-budget burn, not fixed thresholds alone; burn beyond budget at any stage triggers automatic rollback without human approval.
- Gate definitions are declarative artifacts, versioned alongside the service, testable in staging (a gate that has never failed a seeded fault is theatre — same rule as recon jobs in backend.md).

### 6. Rollback philosophy
- Rollback is a rehearsed requirement, answered *before* ship: "how do we undo this in minutes" (Methodology 5.4). Target: minutes (Blueprint §15 "bad deploy" row).
- Rollback = redeploy the previous artifact digest — possible only because of one-artifact promotion and expand–contract migrations.
- Data corrected by event replay: bills mis-rendered during a bad window are re-processed from Kafka; immutability means re-render creates a corrected artifact version, original facts untouched (§15).
- Rollback is exercised quarterly as part of the DR drill; an unrehearsed rollback is a document, not a capability.

### 7. Migration philosophy
- Expand → migrate → contract, always. **Never a destructive schema change in the same release as the code that stops using the column** (Blueprint §19, architecture.md). Contract steps ship releases later, behind their own gate.
- Every migration is forward-safe under rollback: the previous artifact must run correctly against the post-expand schema.
- Migrations are committed, reviewed artifacts (prisma.md discipline for the Postgres stores; explicit versioned scripts for KV table/access changes).

### 8. Deployment invariants
1. One artifact per deployable per version; no per-environment rebuilds.
2. No production traffic without runbooks, rollback, and linked alerts.
3. No canary advance without passing golden + domain gates.
4. No destructive migration co-released with dependent code removal.
5. No behaviour change deployed without the FSD revision it implements linked in the promotion record.
6. Scaling changes tier by configuration only — contracts, partition keys, idempotency design never change with tier (architecture.md).
7. Consumer deployments use rebalance-safe rollout (cooperative rebalancing / static membership semantics, Blueprint §6.2) — a deploy must not cause a consumer-group storm.

### 9. Audit requirements
- Every promotion, rollback, gate decision, flag change, and migration execution writes an **append-only audit entry**: actor, artifact digest, environment, reason, outcome, timestamp. Same spine as operator actions in backend.md.
- Audit records are queryable and retained per the project audit-retention ruling (7-year assumption pending Checklist #4).

### 10. Conformance contract for any future deployment engine
This is a **conformance checklist**, not an API to implement in code — the engine is configured, never called from application code, and no deployment adapter exists in `libs/`. Whatever engine is chosen must demonstrably provide these capabilities, each verifiable by a seeded test:
- Build: one immutable, signed, digest-identified artifact per deployable per version.
- Promote: promotion only with the full §3 evidence record; incomplete evidence is rejected mechanically, not by convention.
- Canary: progressive staged rollout whose stage definitions and gates are declarative, versioned repository artifacts.
- Gate: automatic evaluation of golden + domain signals against error budgets, with autonomous stop/rollback.
- Rollback: single rehearsed operation returning to the previous artifact digest, in minutes, no ad-hoc steps.
- Migrate: expand/migrate/contract phases tracked as distinct, individually gated records.
- Flags: owner and expiry mandatory at creation; expired flags surfaced mechanically.
- Audit: every one of the above emits an append-only, queryable record (§9).
An engine that cannot pass a seeded failure test for any row does not conform, regardless of feature claims.

## Consequences
- Any future tool selection is a *mapping exercise* against this contract, not a design exercise; tool swaps are bounded.
- Ceremony cost: promotion evidence and declarative gate specs must exist before the first production deploy — paid once, in the foundation track.
- The contract makes Blueprint §19's table enforceable per-service rather than aspirational.
- Nothing here changes FSD behaviour, service boundaries, or data contracts.

## Alternatives Considered
- **Pick a concrete deployment platform now and document its usage.** Rejected: violates vendor-neutrality and Checklist #3 sequencing; couples dozens of tasks to a choice with no named requirement forcing it today. (Runner-up.)
- **Leave deployment rules distributed across Blueprint §19 + Methodology Phase 5.** Rejected: those documents state guarantees but no implementable interface; each roadmap task would re-derive the contract, the exact ambiguity this ADR removes.
- **Per-service deployment policies.** Rejected: violates the single-write-path spirit — one deployment contract, uniformly enforced, mirrors the "no second implementation path" rule.

## Deferred Decisions
- Concrete engine/tooling mapping (belongs to the vendor decision, governed by ADR-011 and Blueprint Checklist #3).
- Canary stage count, fractions, and dwell times per tier (config, set with fleet sizing after peak-TPS ratification); gate-spec file format.
- Region/topology specifics of promotion environments (pending data-residency ruling, Checklist #4).

## Affected Roadmap Tasks
Foundation CI/CD tasks (F track), every service's operability-gate task, HRD (hardening) and LNCH (launch) tracks — any task whose deliverable is a pipeline stage, gate, migration, or rollback runbook. *(Task-ID mapping to be completed against the roadmap workbook — not readable in this session; see evaluation note.)*

## Implementation Guidance
- The contract lives as documentation + CI checks, **not as application code** — there is no deployment module in `libs/`. The engine chosen later is verified against §10 as a conformance exercise.
- Gate specs and stage configs are declarative, versioned repository artifacts, schema-validated in CI (format is an implementation choice, deferred).
- Seed a failing test per invariant: a promotion without evidence must be rejected mechanically, a destructive-migration-plus-code-removal in one release must fail the pipeline, the PII/log gate must fail its seeded violation (Checklist #9 pattern).

## Future Review Criteria
- Revisit if a deployable emerges whose release cadence genuinely cannot satisfy one-artifact promotion (none known).
- Revisit canary structure if tier T2+ traffic shows stage dwell times masking regressions (measured, not assumed).
- Review annually against DR-drill findings; any rollback that required off-runbook action reopens §6.

---

# ADR-011 — Vendor Selection Strategy

**Status:** Approved · **Date:** 2026-07-12 · **Consistent with:** Blueprint v1.2 (§18, §18.1, Checklist #3), architecture.md, tech-stack.md, Methodology 1.4/2.5

## Context

The Blueprint deliberately names infrastructure by *class* ("DynamoDB-class," "managed Kafka," "S3 + CDN") and carries lock-in exposure with named escape hatches (§18.1). Checklist #3 requires mapping each class to a concrete service within JioPay's approved stack before launch. Implementation has begun; without a documented process, vendor choices risk being made ad hoc inside tasks, invisibly, and inconsistently with the adapter discipline.

## Decision

Vendor decisions follow this standing process. No product is selected by this ADR.

### 1. Why vendor decisions are intentionally deferred
- The architecture is specified against **capability classes with named semantics** (conditional-put KV, ordered partitioned log, object storage + CDN, relational stores), so correctness never depends on a brand. Deferral keeps every one-way door priced and delays commitment until a task has a *named requirement* that forces it (Methodology 1.4: tech chosen without a forcing requirement is chosen by fashion).
- Deferral is bounded, not indefinite: the classes, their required semantics, and their portable fallbacks are already fixed (§18/§18.1). What's deferred is only the brand mapping.

### 2. When vendor decisions become mandatory
A vendor decision becomes mandatory at the **first roadmap task that provisions or consumes the real primitive** — i.e., when a stub/fake behind the repository or adapter interface would otherwise ship toward production. Concretely: real environment provisioning, first load test against real stores (Checklist #8), and in all cases **before Blueprint Checklist #3 sign-off gates the corresponding epic**. Local development and CI may run on fakes/containers indefinitely; production-path tasks may not.

### 3. How adapters isolate infrastructure
- Every infrastructure dependency sits behind a **repository interface or port/adapter** (architecture.md, tech-stack.md): Bill Store behind put-if-absent/get/query-by-partition; providers behind the Dispatch port; the deployment engine behind the ADR-010 §10 contract.
- Vendor-specific payloads, options, and semantics never leak past the adapter into domain logic, controllers, or client contracts.
- Each adapter classified high-lock-in in §18.1 names a **portable fallback**, and the fallback is exercised in a **quarterly compatibility test** against the repository contract. This obligation attaches only where §18.1 names a fallback (Bill Store today) — it is not a blanket duty invented for every adapter.

### 4. Rules for introducing a new vendor
1. A **named requirement** the current stack measurably fails (the innovation-token rule; "popular" is not a requirement).
2. The dependency enters behind an existing or new adapter — never called directly from domain code.
3. Lock-in classification (high/medium/low) added to the §18.1 table, with mitigation and, for high, a portable fallback plus compatibility test.
4. Security/compliance review where the vendor touches PII, money, or the trust boundary (data residency, DPDP obligations).
5. Napkin cost model per tier, added to the Checklist #12 cost model.
6. An ADR recording context, decision, runner-up and why it lost, trade-off, revisit-when — **before code** (architecture.md ADR rule).

### 5. Documentation requirements
Every vendor decision produces: the ADR (append-only in DECISIONS.md), an updated §18.1 lock-in row, the adapter's contract test suite, an updated Checklist #3 mapping row, and dated cost figures (volatile facts are dated, never asserted as evergreen).

### 6. Review process
- Proposal reviewed against this ADR's rules by the architecture owner; Security and Finance sign where rules 4/5 apply (mirrors Checklist owner columns).
- Settled vendor ADRs bind; re-litigation only via a superseding ADR carrying new information (architecture.md).
- Quarterly: compatibility tests run, cost actuals vs model reviewed, §18.1 table re-verified (aligns with the Methodology's quarterly Stack Sheet update).

### 7. Migration expectations
- Low-lock-in components (Kafka protocol, Postgres, Redis, object storage): migration = re-point the adapter config; no domain change; rehearsed implicitly by using only open semantics.
- High-lock-in components: migration path is the named fallback, kept honest by the quarterly compatibility test; a failing compatibility test is a paged debt-register entry, not a silent decay.
- Any migration follows expand–contract at the data layer and ADR-010 promotion/rollback rules at the deploy layer. A vendor with no priced exit may not enter the system.

### 8. Interaction with roadmap tasks
- Tasks that can complete against fakes/adapters proceed without vendor decisions; the adapter contract is their definition of done.
- Tasks that require the real primitive declare the dependency at session start (STATE.md blocker list) and block on the mandatory-decision trigger in §2 — vendor ambiguity must surface as an explicit named blocker, never be resolved improvisationally inside an implementation session.
- Checklist #3 remains the launch gate: every "-class" primitive mapped, with this ADR as the process it was mapped under.

## Consequences
- Implementation proceeds in parallel with procurement; no task idles waiting on brand decisions it doesn't need.
- Cost: adapter + fake maintenance and quarterly compatibility tests — the standing price of exit optionality, already accepted in §18.1.
- Every future vendor argument has a fixed shape; "which vendor" debates cannot reopen "whether adapters" debates.

## Alternatives Considered
- **Select all vendors now, up front.** Rejected: commits one-way doors before requirements force them and contradicts the deferral already encoded in Blueprint §18/Checklist #3. (Runner-up — legitimate for orgs with a mandated platform catalogue; the JioPay approved-stack constraint is honoured instead by making Checklist #3 the binding gate.)
- **Decide per-task, informally.** Rejected: invisible decisions, inconsistent lock-in accounting, exactly the drift this ADR exists to prevent.
- **Hard multi-vendor abstraction for everything (run two of each).** Rejected: pays permanent complexity for exit options already secured more cheaply by adapters + fallback tests.

## Deferred Decisions
All concrete vendor mappings (Checklist #3), including the deployment engine binding for ADR-010 §10. Data-residency-driven regional constraints (Checklist #4) may narrow candidate sets and must be closed before high-lock-in mappings are signed.

## Affected Roadmap Tasks
Every task provisioning real infrastructure or first exercising a real primitive (environment setup, load-test, DR-drill, launch tracks); every adapter-construction task inherits §3–§4 as acceptance criteria. *(Task-ID mapping pending readable roadmap — see evaluation.)*

## Implementation Guidance
- The living mapping table is the **Blueprint §18.1 lock-in table plus DECISIONS.md entries** — no new canonical file; CONTEXT_SYSTEM.md's file structure is closed and adding an always-relevant file spends recurring token budget. Each §18.1 row stamps its vendor ADR and date.
- Encode rule 2 mechanically: a lint/CI boundary check that vendor SDK imports appear only under adapter directories.
- Template the vendor ADR (context / named requirement / runner-up / lock-in class / fallback / cost / revisit-when) so rule 6 is fill-in, not prose.

## Future Review Criteria
- Revisit deferral policy if >2 tasks in a quarter block on §2 triggers — that pattern means decisions are lagging need.
- Revisit adapter overhead if quarterly compatibility tests are being skipped or faked — either fund them or consciously accept the lock-in via a superseding ADR.
