# 00_Project_Brain.md — Digital Billing Core

<!-- PERMANENT IMPLEMENTATION BRAIN. Read this before writing any code, every session.
     Consistent with: FSD v1.0 (frozen), Blueprint v1.2, TDS v1.0, Roadmap (262 tasks).
     This file SYNTHESIZES the design set; it never overrides it. On conflict: repo > DECISIONS.md > FSD > STATE.md, and the loser gets fixed via the documented process — never improvised around. -->

---

## 1. Project identity

**Digital Billing Core** — JioPay Merchant Platform. A backend service that converts a completed payment transaction into a dynamic, hosted, widgetized digital bill (an interactive microsite, not a flat PDF), delivered over WhatsApp/SMS/Email with failover, with lightweight CRM and engagement built in.

- Org: JioPay. Classification: Internal. Phase: MVP (Phase 1) + core architecture.
- System criticality: **T1 throughout** (money, auth, user PII, published APIs). Every T1 rule in the methodology binds without exception.

## 2. Vision

JioPay captures the payment but loses the post-payment relationship. This system owns the post-payment lifecycle: every transaction becomes a branded bill that is also an engagement surface (survey, coupon, marketing), a CRM capture point (consented contact data), and an analytics source — closing the loop between a purchase and everything that follows it, on one platform instead of the merchant's four disconnected tools.

## 3. Product scope (Phase 1)

- Bill generation API with idempotency; calculation validation; GST-compliant invoice fields.
- **Two bill types by invocation path, never caller-chosen:** PG S2S callback (responseCode 0000) → Payment Receipt; direct POS/PSP/aggregator API (must carry line items/taxes/HSN) → Tax Invoice.
- Merchant drag-and-drop template builder (clone-and-edit from an industry library), branding, custom labels, widget config, delivery prefs.
- Widgetized bill rendering; hosting (permanent URL, short link, lazy PDF); multi-channel delivery with failover (WhatsApp → SMS).
- Customer data capture + consent + CRM sync; customer bill portal (phone + OTP); survey/coupon/marketing widgets; engagement analytics.
- Offline queue and sync; credit notes; DPDP data lifecycle (90-day scrub); merchant dashboard, admin portal, support portal.

## 4. Out of scope (do NOT build, stub, or "prepare for")

Advanced segmentation / campaign builder, automated journeys, AI/predictive analytics, voice bill sharing, JioFinance lending, JioMart cross-sell, e-commerce plug-ins (Shopify/Magento/WooCommerce), multi-store group management. Referenced only where they touch a Phase-1 interface. Also out: any portal, role, store, channel, or write path not in the fixed inventories below.

## 5. Primary actors

| Actor | Class | Auth | Ceiling |
|---|---|---|---|
| Merchant Admin | human | OIDC + MFA | full R/W own-org config; read own bills/customers/analytics; NO bill generation |
| Store Staff | human | OIDC session | generate bills for assigned stores only; nothing else |
| End Customer | human | 128-bit `url_hash` (microsite) / phone+OTP (portal) | read own bills; widget writes for own bill |
| Calling System (POS/PG/PSP/aggregator) | calling system | PG: HMAC secureHash over raw bytes; direct: OAuth2 client-credentials | submit bills, credit notes, offline flush — no reads |
| JioPay Ops / Support | human | corporate SSO + MFA | cross-merchant READ (break-glass, audited), resend; no edits |
| Platform Admin | human | corporate SSO + MFA | platform config, shared library, roles; no customer PII |
| Internal workloads | workload | mTLS + workload identity | per-workload minimal grants |

Role names and permissions mirror FSD §2 verbatim. New role ⇒ FSD revision first.

## 6. Business domains (bounded contexts)

Eight, fixed. Boundaries follow **scaling and failure profiles**, not FSD section numbers:

1. **Ingestion** (incl. Event Relay) — accept, verify, idempotent create, 202 ACK.
2. **Orchestration & Rendering** — validate calc, resolve config/labels/layout, render artifacts.
3. **Dispatch** — channel delivery with failover, metering, provider callbacks.
4. **Merchant Config & Templates** — templates, branding, labels, prefs, users/roles.
5. **CRM** — PII Vault, consent, contact↔bill links.
6. **Analytics** (incl. Beacon Collector) — engagement/delivery events → aggregates.
7. **Experience BFF** — portal read/command façade; owns nothing durable.
8. **Compliance Jobs** — T-90 scrub (the ONLY `contact_enc` nuller), legal hold, tiering, recon.

A ninth requires a named independent scaling/failure profile + ADR. Prefer extending an existing boundary.

## 7. High-level architecture

- **Async event-driven core.** The synchronous path ends at the **202 ACK**; everything after ingestion flows via Kafka. No sync service→service calls on the bill-generation path — ever.
- **Hot ACK path** (Ingestion): verify signature over raw bytes → encrypt contact → **one conditional transact-write** (FACTS + STATUS=REQUESTED) → respond. Zero sync dependency on Vault, Redis, Kafka, or any downstream.
- **Bill record** = immutable FACTS item + append-only STATUS chain (REQUESTED → GENERATED → (DISPATCHED → DELIVERED | DELIVERY_FAILED) | NO_CONTACT) + linked credit-note items. Current state = latest item; illegal transitions are dropped as stale, never forced.
- **Event Relay (CDC/outbox)** on the Bill Store change stream is the *only* publisher of `bill.*` lifecycle topics (ADR-R2). Direct publish only for non-invariant topics (`engagement.events`, `config.changed`, `compliance.scrub_due`).
- **Deterministic identity:** `bill_id` derives from the idempotency key (ADR-R3); the key derives from invocation source. Retries mint the same ids everywhere.
- **PII in exactly two places:** `contact_enc` on FACTS (ADR-R1, async copy to Vault) and the PII Vault. Everything else — events, logs, traces, analytics, queues — carries surrogate refs only.
- `merchant_id` is the universal partition/scoping key: Kafka partition key, Bill Store partition prefix, tenancy filter on every query.
- Microsite is a **rendered static artifact** (Orchestration-owned), CDN-served, servable during origin loss. Not an app.

## 8. Logical services

The eight domains above ARE the logical services. Interaction rules:

- Bill-generation path handoffs: **Kafka only**. Sync arrows point at stores/caches/mesh, never other services.
- Sanctioned sync exceptions (BFF only): Config/CRM/Analytics APIs, Bill Store point reads/GSI, resend delegation to Dispatch — each with its own timeout, breaker, per-panel bulkhead. New sync exception ⇒ ADR.
- One writer per table/item type (ownership map in `architecture.md`/`prisma.md` — memorize before writing any write path).
- Cross-boundary reads: owner's API, event stream, or a sanctioned read pattern. Never another module's tables.

## 9. Deployable architecture

**Logical 8 / physical 3** (monolith-first, Blueprint §3):

- (a) **Sync plane** — Ingestion + BFF + Config
- (b) **Async workers** — Orchestration/Render + Dispatch + CRM + Compliance
- (c) **Analytics consumers**

Extraction is a deployment change earned by measured divergence (render CPU is the first expected split, at T2) or team split — never a rewrite. Keep module boundaries clean enough that this stays true. Scaling changes tier by configuration only; data model, contracts, partition keys, idempotency design never change with tier.

## 10. Technology stack (approved — ADR-9 pending ratification; vendor mapping = Blueprint Checklist #3)

- **Language/repo:** TypeScript strict, single monorepo (`services/`, `libs/`, `apps/`).
- **Backend:** NestJS; one domain module per logical service; controllers thin; idempotent seed code for bootstrap data.
- **Frontend:** Next.js App Router (TS) for the four portals; microsite = static artifact, NOT Next.js.
- **Data:** Prisma for exactly three Postgres stores (Config DB, PII Vault, Analytics — each its own schema, client, credentials). Bill Store + Metering Ledger = wide-column KV (DynamoDB-class; portable fallback named) behind a repository interface — never Prisma, never Postgres, no shadow copies.
- **Events:** Kafka (the single innovation token, ADR-4); schema registry; standard envelope.
- **Cache/sessions:** Redis — separate auth cluster for OTP/session (blast-radius isolation).
- **Artifacts:** S3-class object storage + CDN; signed time-bound URLs for private artifacts.
- **Platform:** Kubernetes, OTel tracing, RED metrics, structured PII-redacted JSON logs.
- **Auth:** exactly per TDS — HMAC (PG), OAuth2 client-credentials (direct API), OIDC+MFA (dashboards), phone+OTP (portal), mTLS+workload identity (internal). JWTs only as short-lived BFF session tokens.

Do not introduce a workflow engine, another ORM, or another store without an ADR naming the requirement and the runner-up.

## 11. Coding principles (the floor, not the aspiration)

1. Correctness ladder: runs → happy path → edge cases → maintainable → fast. Never polish above a broken rung.
2. Make the wrong thing hard to express: types, enums, schema constraints, parse-don't-validate. The DB is the last line — it sees every writer.
3. Smallest change that solves the problem; refactors proposed, never smuggled.
4. Every failure path is a design decision — handled, propagated, or explicitly accepted; never swallowed. Every money-path error answers "what state is the money in?"
5. **Money = integers in minor units (`_paise`), everywhere.** No floats in any money path (lint-enforced). Charges derived by summation over append-only ledgers; no mutable running totals.
6. Every mutation is idempotent, conditional at the store, replayable, reconcilable. Meter-then-send: the metered-but-unsent attempt is recoverable; the reverse loses money and is forbidden.
7. Corrections are new records (credit notes, STATUS items, artifact versions) — never edits.
8. Invariants live in exactly one place, closest to the data (schema constraint, conditional write, unique index) — never re-implemented in app code, never enforced in cache or memory.
9. Boring technology; controllers thin; 12-factor config, no magic numbers; every module buildable alone against fakes of its registered contracts.
10. Observability is part of Done: trace propagation (incl. Kafka headers), RED + domain metrics, runbook-linked alerts, rollback before traffic.

## 12. Data ownership principles

- **One writer per table/item type.** Ownership: Ingestion → FACTS create, initial STATUS, credit notes. Orchestration → GENERATED/NO_CONTACT, `artifact_ver`, S3 artifacts. Dispatch → delivery STATUSes, Metering Ledger, send-dedup markers. Config → all Config DB. CRM → all Vault writes (create/upsert/consent). Compliance → scrub deletes/`contact_enc` null, legal-hold, tiering. Analytics → aggregates, feedback, archive. BFF → nothing durable.
- FACTS is write-once; only two legal mutations ever: `contact_enc → null` + `scrubbed_at` (Compliance scrub) and `artifact_ver` bumps (re-render).
- No transaction spans two stores. If a design seems to need one, the design is wrong — restructure via events or escalate.
- Cross-store references are plain scoped columns (no FK fakes); reconciliation proves integrity.
- Stores match access patterns (KV bills, relational config, isolated Vault, aggregate analytics). New entity → owner row + TDS/ADR anchor + constraints before columns + named access patterns before indexes.
- Default: NO soft delete. PII is never soft-deleted — scrub is a hard delete.

## 13. Security principles

- `merchant_id` from validated token/session only, never from a request body; body mismatch → 403. Scope re-checked at the data layer.
- Access check order: authn → actor class → role → merchant/store scope → state eligibility. Anything not explicitly granted is denied.
- Verify signatures over **raw bytes before parsing** (PG + provider callbacks), constant-time compare. No unauthenticated inbound callbacks.
- PII: never in logs/events/traces/metrics/errors/queues; never cached decrypted; plaintext in memory only at point of use in workloads with an explicit decrypt grant (Dispatch, CRM, BFF-portal, Compliance). Log redaction deny-tested in CI.
- Privileged actions (cross-merchant reads, resends, scrubs, config/role/legal-hold changes) write append-only audit and **fail closed** if the audit write fails. Break-glass is per-incident, reason-tagged, expiring.
- Untrusted input everywhere at the boundary: re-encode uploads, logic-less templates, output-encode all merchant/customer content, no external URL fetches at render time.
- Uniform responses on enumeration-prone endpoints; aggressive rate limits (per phone/IP/bill); OTP fails closed when auth Redis is down.
- Secrets only in the secrets manager; per-workload short-TTL credentials; no shared static secrets.

## 14. Documentation precedence

When any two sources disagree, this order wins and the loser gets fixed:

**Repo (what is built) → DECISIONS.md (why) → FSD v1.0 (what it must do; frozen) → STATE.md (where we are).**

- Behaviour questions → FSD. Architecture → Blueprint v1.2. Implementation detail → TDS v1.0. Task scope → Roadmap row.
- Rule files (`architecture.md`, `backend.md`, `prisma.md`, `portals.md`, `rbac.md`, `security.md`, `tech-stack.md`, `frontend-design.md`) never override the design set — a perceived conflict is a bug to report, not to improvise around.
- Load by **section, never whole document** (tiering in CONTEXT_SYSTEM.md §7). Boot integrity: never act on a section you haven't actually loaded.
- Version stamps: every context file footer names the doc versions it assumes; a mismatch means reconcile before trusting.

## 15. Repository structure

```
digital-billing-core/
├── context/              ← volatile truth, always relevant
│   ├── STATE.md          ← ≤400-token kernel; loaded first, every session
│   ├── CONTEXT_SYSTEM.md ← the rules of this system
│   ├── DECISIONS.md      ← append-only ADR ledger
│   ├── GLOSSARY.md       ← canonical terms + invariants
│   ├── sessions/log/     ← append-only, one tiny file per session
│   ├── checkpoints/      ← CP-<TASKID>.md per completed checkpoint
│   └── progress/PROGRESS.md ← regenerated roll-up, never grown
├── docs/                 ← FSD.md, BLUEPRINT.md, REVIEW.md, TDS.md, ROADMAP.xlsx
├── services/             ← one track per roadmap prefix (ING, ORCH, DISP, CFG, CRM, ANL, BFF, CMP)
├── libs/                 ← domain-free cross-cutting only (envelope/serde, error envelope, auth context, observability, money type, retry/breaker)
├── apps/                 ← the four portals (merchant, admin, support, customer)
└── infra/, platform/, .github/  ← IaC, pipelines
```

A shared lib that knows what a bill is has crossed the boundary.

## 16. ADR philosophy

- **ADR-before-code** for: service boundaries, store choices, sync exceptions, event-contract semantics, auth mechanisms, T1-invariant enforcement points, new deps/stores/portals/roles, soft delete, new decrypt grants.
- Format: context · decision · why · trade-off · revisit-when. **Every choice names its runner-up and why it lost.**
- Append-only ledger in `DECISIONS.md`; supersede, never edit ("ADR-12 supersedes ADR-4"). Settled ADRs bind — do not re-litigate in code; propose a superseding ADR with new information.
- Standing ADRs to know: ADR-1 async core · ADR-2 idempotency as conditional write · ADR-3 three-store split, isolated Vault · ADR-4 Kafka as the single innovation token · ADR-5 static CDN bills + lazy PDF · ADR-6 contracts versioned day one · ADR-7 OAuth2 for direct API · ADR-8 warm-standby DR · ADR-9 stack (pending) · ADR-R1 contact_enc on record · ADR-R2 CDC/outbox relay · ADR-R3 deterministic bill_id.

## 17. Development workflow

Governed entirely by `IMPLEMENTATION_PLAYBOOK.md` (the companion to this file). In one line: boot from STATE.md → take exactly one roadmap task → load its T1 slice → plan → get approval → implement behind the task's flag if applicable → build/test/verify DoD → checkpoint → update progress → suggest commit → stop. One track per session where possible (the task-type rhythm within a track — entities→repo→logic→api→event→tests→obs→checkpoint — is the context-switching optimization the roadmap was designed for).

## 18. Current implementation status

Per STATE.md (2026-07-11 — **verify against the repo at session start; the repo is authoritative, STATE can be stale**):

- Design complete and reviewed. **No code written yet.** All 13 track high-water marks at `—`.
- Phase: **P0 Foundation, not started.** Next action: **F-01** (monorepo scaffold), the first unblocked task.

## 19. Current roadmap state

262 tasks, 13 tracks, 13 milestones (M0 platform-ready → M12 launched). Each task: 30–90 min, own DoD, rollback, checkpoint ID.

- **P0 F** (26, sequential-ish, blocks everything) → **P1 X** shared libs (20, blocks all modules) → **P2** eight module tracks in PARALLEL against fakes (ING 24, ORCH 24, DISP 24, CFG 20, CRM 14, ANL 18, BFF 22, CMP 18; one cross-edge: ING's GST validation waits on CFG-02) → **P3 INT** (18, real wiring + FSD AC 1–24 E2E) → **P4 HRD** (20, perf/sec/chaos/DR) → **P5 LNCH** (14, gates).
- A task is startable when all its listed dependencies are done. Uniform DoD: checkpoint demoable + CI green + review checklist passed + flagged where applicable + observability emitting.

## 20. Active assumptions

- The **PG-callback contract is the named riskiest technical assumption** (validation task exists); 2 KB/bill and 70% open-rate drive capacity math and are tier-labeled estimates.
- 50k TPS is a design **ceiling**, not day-one load (market comparables ~13–44 TPS avg). Fleet sizing awaits peak-TPS ratification.
- Blueprint platform (Kafka, KV Bill Store, Redis, S3/CDN, K8s, OTel) is the plan of record — build toward it; treat nothing as implemented before its roadmap task ships.
- ADR-9 (stack) pending ratification; final vendor mapping is Blueprint Checklist #3.

## 21. Open decisions / carried blockers (close before dependent tasks; never invent answers)

1. **PG secureHash spec + secret provisioning** → blocks ING-04 real impl (ships behind hash-stub flag).
2. **PG settlement extract feed** → CMP-08 recon stubbed until confirmed.
3. **DPDP backup-retention ceiling (Legal)** → parameterises CMP-10.
4. **Peak-TPS ratification** → LNCH-04 fleet sizing only; no contract changes.
5. **Permanent-URL vs 90-day-scrub ruling** → CMP-04/ORCH-12; anonymised re-render implemented as recommended.
6. Calling-system auth model breadth (open FSD question) — do not hardcode beyond HMAC/OAuth2 as specified.

All flagged stubs are release-gated; flag removal is closed in the LNCH track.

## 22. Things Claude must NEVER do

- Never create a second implementation path for bill creation, idempotency, event emission, state transitions, or scrubbing. One write path, one relay, one scrub executor.
- Never make a sync service→service call on the bill-generation path; never add a sync exception without an ADR.
- Never use floats on money paths; never keep mutable running totals; never edit bills, ledger rows, audit rows, or history.
- Never put PII in events/logs/traces/metrics/analytics/queues/errors; never cache decrypted contact; never widen a decrypt grant for convenience.
- Never take `merchant_id` from a request body; never enforce an invariant only in app code, client code, the BFF, or a cache.
- Never span two stores with a transaction; never write to another module's tables; never model Bill Store/Metering Ledger/dedup/OTP state in Prisma.
- Never make a breaking or unregistered event-schema change; never a destructive migration in the same release as its code change; never `db push` outside local scratch.
- Never accept unauthenticated callbacks; never fetch external URLs at render time; never trust frontend role hints.
- Never invent roles, portals, stores, channels, endpoints, API signatures, or infrastructure not in the design set; never document unbuilt things as implemented.
- Never change behaviour without an FSD revision; never re-litigate a settled ADR in code; never improvise around a document conflict — report it.
- Never implement more than the active roadmap task; never continue past a checkpoint without ending the session correctly.
- Never act on a document section not actually loaded in context.

## 23. Checklist BEFORE implementing any task

1. `STATE.md` loaded; repo verified against it (tests of the active module run; latest CP-* matches commits). Reconcile drift first.
2. Task's roadmap row loaded: dependencies all done? Blockers from §21 touching it? (If yes → stub-behind-flag per the row, or stop.)
3. T1 slice loaded: TDS §1 (conventions) + §2 (data dictionary) + the active module's TDS section + dependency modules' *interface* subsections only.
4. `DECISIONS.md` scanned for ADRs binding this task; GLOSSARY checked for any uncertain term.
5. Ownership check: every write in this task targets tables/items this module owns.
6. Invariants named: which schema constraint / conditional write / unique index enforces each, and where.
7. Failure legs named: crash mid-flow, partial write, duplicate delivery, missing callback — with the convergence argument.
8. Assumptions listed explicitly; plan written; **approval received**.

## 24. Checklist AFTER completing any task

1. Build green; full module test suite green; new tests cover the task's DoD line by line (T1 money floor where money/state is touched: happy / retry / partial / concurrent / reconciles).
2. Idempotency proven by test (replay → no change); IDOR/role-matrix tests updated if a human-facing endpoint changed; PII-redaction deny-test still green.
3. Observability emitting: traces propagate, RED + domain metrics named, alerts runbook-linked. Flags registered with owner + expiry.
4. Migration (if any): expand–contract, named constraints, EXPLAIN evidence, shipped with regenerated client in the same PR.
5. `CP-<TASKID>.md` written: what changed / how to verify / how to roll back (three lines).
6. `STATE.md` regenerated (high-water mark, next action, blockers); `PROGRESS.md` regenerated from checkpoints.
7. Any decision made → ADR appended; any behaviour ambiguity found → reported, not resolved silently.
8. Commit message suggested with the Checkpoint ID in it. Session END template written. **Stop.**

---
*Consistent with FSD v1.0, Blueprint v1.2, TDS v1.0, Roadmap (262 tasks). Regenerate this file only via an ADR-logged change.*

## Architecture Decision Records (ADRs)

Canonical architecture decisions are stored under:

docs/adr/

All implementation work must follow approved ADRs before introducing new architectural decisions.

Repository Markdown documents are the canonical working source. The original Engineering Execution Roadmap.xlsx is archival only. Never parse the XLSX unless explicitly instructed.