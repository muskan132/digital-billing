Digital Billing Core — Technical Design Specification	Internal — v1.0 (rev.1 — packaging errata)

**Technical Design Specification**

**Digital Billing Core**

JioPay | Merchant Platform

Status: v1.0 (rev.1 — packaging errata: For-the-Record deployable count aligned to Blueprint §3; no technical decision changed) | Internal | Implementation guide for engineering / AI coding sessions

Sources & precedence: FSD v1.0 (frozen behaviour) > Architecture Blueprint v1.1 + Architecture Review findings F-1..F-11 (applied) > this document (implementation detail)

# 0. How to Use This Document

- Each module section (§3–§10) is independently implementable: it names its owned entities, its inbound/outbound contracts, and the stubs needed to build it alone (§11).

- §1 defines cross-cutting conventions once. A module aspect marked “inherits §1” means the default applies with no module-specific delta — that is a definition, not an omission.

- Behaviour questions resolve to the FSD by section number; architecture questions to the Blueprint. This document adds detail; it never overrides either. If an implementation detail here seems to conflict with the FSD, the FSD wins and the conflict is a bug in this document — report it, do not improvise.

- Build-time blockers (§12) list what is still unknown (PG hash spec, settlement extract, DPDP backup ceiling). Modules touching them define stub behaviour so work proceeds; stubs are marked and gated from production.

# 1. Cross-Cutting Conventions (inherited by every module)

| **Convention** | **Definition** |
| --- | --- |
| Money | Integers in paise, everywhere, including metering and credit notes. Field suffix _paise. No floats in any money path — lint-enforced. |
| Identifiers | bill_id = base32(HMAC-SHA256(system_key, idempotency_key))[0:26] — deterministic (Review F-3). idempotency_key = “PG:”+merchantTxnNo+“#”+paymentID for callbacks; “API:”+merchant_id+“#”+external_transaction_id for direct calls. url_hash = 128-bit CSPRNG, base62, minted once, stored on the facts item. |
| Event envelope | {event_id (ULID), type, schema_version, occurred_at, merchant_id, bill_id?, trace_id, payload}. Registered in the schema registry; additive-only evolution. NO PII in any payload; contact never leaves stores (F-1). |
| Event emission | No service publishes bill lifecycle events directly. Services write items to the Bill Store; the Event Relay (§3.6) transforms the change stream into Kafka topics (CDC/outbox, Review F-2). engagement.events and config.changed are direct-publish (no invariant rides them). |
| Error envelope (APIs) | {error_code (stable string), message (operator-readable, no internals, no PII), field?, trace_id}. 4xx = caller must change the request; 5xx = caller may retry; 409 = idempotency/state conflict carrying the existing resource id. |
| Retry defaults | Kafka consumers: at-least-once, idempotent handlers keyed (bill_id, step), manual commit after side-effect. Poison → 5 handler retries → DLQ (paged, runbook-linked). HTTP calls out: timeout + 3 retries, exponential + jitter, retry budget 10%/dependency; breakers at 50% failure over 30 s. |
| AuthN/Z context | Every internal request carries {principal, roles[], merchant_scope[]} from the gateway-validated token. merchant_id is ALWAYS taken from scope, never from the body (BR-15/IDOR). Services re-check scope at the data layer. |
| PII handling | Contact data exists in exactly two places: contact_enc field on the bill facts item (AES-GCM under the PII KMS key, envelope encryption) and the PII Vault. Logs, events, analytics, traces: surrogate ids only. Log middleware redaction is deny-tested in CI. |
| Time | All timestamps UTC ISO-8601; bill business date = sale time from payload (BR-6), stored alongside server_received_at. |
| Testing floor | Per module: unit tests on branching logic; contract tests against registered schemas; the T1 money-path floor (happy/retry/partial/concurrent/reconciles) wherever money or bill-creating state is touched; every FSD AC mapped in §11.2; every bug fixed = a pinning test. |
| Config | 12-factor; all tunables (retry counts, TTLs, budgets) via config service/env, defaults as stated here; no magic numbers in code. |
| Observability | OTel traces (trace_id from gateway, propagated via Kafka headers); RED metrics per endpoint/consumer; domain metrics named per module; structured JSON logs. |

# 2. Shared Data Dictionary

### 2.1 Bill Store (wide-column KV, single-table)

| **Item** | **Keys** | **Attributes (type)** | **Mutability** |
| --- | --- | --- | --- |
| Bill FACTS | PK=bill_id, SK=“FACTS” | idempotency_key (S, unique-by-construction), merchant_id, bill_type (RECEIPT│TAX_INVOICE), source (PG_CALLBACK│DIRECT_API│OFFLINE_BATCH), currency, total_paise, subtotal_paise?, tax_paise?, discount_paise?, line_items (L, INVOICE only: {name, qty, unit_paise, hsn?, tax_rate_bp}), tax_block (M: place_of_supply, cgst/sgst/igst_paise), template_id_requested?, template_id_used, url_hash, artifact_ver (N), contact_enc (B, nullable), contact_present (BOOL), consent (BOOL), sale_at, received_at, scrubbed_at? | Immutable after create, except contact_enc→null + scrubbed_at (scrub only) and artifact_ver (re-render versioning) |
| Bill STATUS | PK=bill_id, SK=“STATUS#”+ULID | state (REQUESTED│GENERATED│DISPATCHED│DELIVERED│DELIVERY_FAILED│NO_CONTACT), channel?, failover (BOOL), detail?, at | Append-only; current state = latest item |
| Credit note | PK=bill_id, SK=“CN#”+cn_id | cn_id (deterministic from CN idempotency key), amount_paise, reason?, url_hash, created_at | Immutable |
| GSI-1 merchant listing | GSIPK=merchant_id+“#”+yyyymmdd, GSISK=received_at+bill_id | projection: type, state-summary, total_paise, contact_present | — |

### 2.2 Metering Ledger (KV table, T1 money)

| **Keys** | **Attributes** | **Rules** |
| --- | --- | --- |
| PK=merchant_id+“#”+yyyymm, SK=bill_id+“#”+channel+“#”+attempt | unit_cost_paise, provider, provider_msg_id, at | Conditional put (no overwrite) = idempotent metering; charges derived by summation only; no running totals anywhere (Blueprint §4.1) |

### 2.3 Config DB (PostgreSQL)

| **Table** | **Key Columns ****&**** Constraints** |
| --- | --- |
| merchants | merchant_id PK; gstin (format check); legal_name, address; status |
| branding | merchant_id PK/FK; logo_asset_key (proxied upload, never external URL at render); color_primary/secondary (CHECK ^#[0-9A-F]{6}$); font_id FK fonts |
| labels | (merchant_id, system_key) PK; display_label; UNIQUE(merchant_id, system_key) |
| templates | template_id PK; merchant_id FK NULLABLE (NULL = shared library, read-only via role); name; base_skeleton (ENUM 4); layout_schema JSONB (validated against block-type enum); version N; industry_tag? |
| merchant_defaults | merchant_id PK; default_template_id FK — the one-default invariant (BR-18) as a schema property |
| widget_config | (merchant_id, widget_type) PK; payload JSONB (per-type schema); enabled BOOL |
| delivery_prefs | merchant_id PK; default_channel ENUM(WHATSAPP,SMS,EMAIL); failover_enabled BOOL; sender identities |
| users, roles | dashboard principals; role ENUM per FSD §2; merchant scoping |

### 2.4 PII Vault (PostgreSQL, separate cluster, PII KMS key)

| **Table** | **Key Columns** |
| --- | --- |
| contacts | contact_id PK; merchant_id; phone_hash (HMAC, indexed), phone_enc, email_enc?, name_enc?, dob_enc?; consent BOOL; created_at; partitioned by hash(phone_hash) |
| contact_bills | (contact_id, bill_id) PK; merchant_id; created_at — the portal lookup path and the scrub target (row deleted at T-90) |
| otp_state | lives in auth Redis, not here (TTL-native); listed for completeness |

### 2.5 Kafka Topics (schema-registered)

| **Topic** | **Emitted by** | **Payload core** |
| --- | --- | --- |
| bill.requested v1 | Event Relay (from FACTS create) | bill_id, merchant_id, bill_type, source, template_id_requested?, contact_present |
| bill.generated v1 | Event Relay (from STATUS=GENERATED) | bill_id, merchant_id, bill_type, url_hash, artifact_ver |
| bill.delivery v1 | Event Relay (from STATUS dispatch/delivered/failed) | bill_id, merchant_id, state, channel, failover |
| engagement.events v1 | Beacon Collector / BFF (direct) | bill_id, merchant_id, kind (OPEN│CLICK│SURVEY│REDEEM│PDF), widget_ref?, surrogate_customer_id? |
| config.changed v1 | Config service (direct) | merchant_id, entity (BRANDING│LABELS│TEMPLATE│WIDGETS│DELIVERY), version |
| compliance.scrub_due v1 | Compliance scheduler (direct) | bill_id, merchant_id, due_at |

# 3. Module: Ingestion (incl. Event Relay)

**Purpose: **Sole write path for bill and credit-note creation. Verifies callers, routes bill_type by invocation path (BR-21), enforces idempotency, performs the single hot-path write, and (via the Event Relay sub-component) turns Bill Store changes into Kafka events.

### Responsibilities

- Verify PG secureHash over the raw body; act only on responseCode 0000 (BR-20).

- Enforce OAuth2 scopes on direct API; reject cross-merchant bodies (BR-15).

- Resolve bill_type: PG callback → RECEIPT; direct → TAX_INVOICE, line items mandatory (BR-22).

- Single write: encrypt contact → contact_enc; conditional put FACTS (attribute_not_exists(bill_id)); write initial STATUS=REQUESTED in the same transaction (transact-write).

- Offline batch intake: same contract per item, no expiry (BR-10).

- Credit-note intake: validated conditional put of CN item (see logic).

- Event Relay: consume the Bill Store change stream, map item types to topics (§2.5), publish with trace propagation. At-least-once; consumers dedupe.

### Public Interfaces

| **Interface** | **Direction** | **Contract** |
| --- | --- | --- |
| POST /v1/callbacks/pg | in | Raw PG S2S payload + secureHash header. 202 {bill_id, urls} │ 401 hash │ 409 returns existing bill on duplicate key |
| POST /v1/bills | in | Direct Tax Invoice payload (§2.1 fields). 202 │ 4xx field errors │ 409 existing |
| POST /v1/bills/batch | in | Array of direct payloads (offline flush); per-item results, order-independent |
| POST /v1/credit-notes | in | {bill_id │ (merchant_txn ref), amount_paise, reason?, cn_external_id}. 201 │ 404 unknown bill │ 422 over-cap |
| GET /v1/bills/{bill_id} | in | Status + urls; scope-checked |
| Bill Store change stream | out (Relay) | → bill.requested / bill.generated / bill.delivery per §2.5 |

### Database Entities

Owns writes to: Bill FACTS, initial STATUS, CN items (§2.1). Reads: none beyond conditional-put results.

### API Contracts

| **Endpoint** | **Request (core)** | **Response / Errors** |
| --- | --- | --- |
| POST /v1/callbacks/pg | merchantId, merchantTxnNo, txnID, paymentID, amount, paymentMode, paymentDateTime, customerMobileNo?, customerEmailID?, secureHash | 202 {bill_id, url, short_url}; 401 INVALID_SIGNATURE; 422 NON_SUCCESS_CODE (parked, logged); 409 DUPLICATE → existing ids |
| POST /v1/bills | merchant scope from token; external_transaction_id; line_items[] (name, qty, unit_paise, hsn?, tax_rate_bp); totals; tax_block; contact?; template_id?; sale_at | 202 as above; 422 LINE_ITEMS_REQUIRED (BR-22); 422 CALC_MISMATCH {expected, supplied}; 422 GST_FIELD_MISSING {field}; 404 TEMPLATE_UNKNOWN → noted, falls back (FSD 5.4) |
| POST /v1/credit-notes | bill ref; amount_paise; cn_external_id (idempotency) | 201 {cn_id, url}; 422 CN_OVER_CAP; 409 duplicate cn_external_id → existing |

### Validation & Business Logic

- Calc validation (FSD 5.2, INVOICE only): recompute item-order discounts then bill-level; equality in paise; CGST+SGST | IGST must sum to tax_paise; mismatch → 422, no write.

- GST validation (FSD 5.3, INVOICE only): HSN per line where required; split matches place_of_supply; merchant GSTIN present (Config read, cached).

- Receipt path: amount displayed must equal callback amount; no line math (Review-upheld scope).

- Delivery-contact rule (BR-16): missing/invalid contact → bill still created with contact_present=false; STATUS chain will end NO_CONTACT after generation; caller told delivery skipped.

- Credit-note cap (BR-13): transactional read of Σ CN amounts for bill_id + conditional put in one transact-write; concurrent notes cannot exceed total_paise — the money-path concurrency test targets exactly this.

- Batch items are independent: one bad item never fails the batch; per-item error envelope.

### State Transitions

Bill state machine (STATUS items): REQUESTED → GENERATED → (DISPATCHED → DELIVERED | DELIVERY_FAILED) | NO_CONTACT. Legal-transition enforcement lives in writers (Orchestration/Dispatch) via conditional append — Ingestion writes only REQUESTED.

### Dependencies

Config DB (GSTIN read, cached); Bill Store; KMS (PII key); Kafka (Relay out). NO synchronous dependency on Vault, Redis, or any downstream service on the ACK path (Review F-1).

### Sequence (primary + failure)

PG -POST-> Gateway -> Ingestion: verify HMAC -> route RECEIPT

  -> transact-write [FACTS(contact_enc) + STATUS#REQUESTED]  (single conditional write)

  -> 202 {bill_id}                          .... p95 budget 80 ms in-service

ChangeStream -> Event Relay -> bill.requested

FAILURE: crash after transact-write, before nothing else needed - Relay still emits (F-2 closed).

DUPLICATE: conditional put fails -> read FACTS -> 202 existing (no new STATUS, no event).

### Error Handling & Retry Strategy

- Hash invalid → 401, metric pg_hash_failures; rate spike pages (secret drift/attack).

- Transact-write throttled → 503 + Retry-After; PG/POS retries are safe (idempotent).

- Relay: at-least-once with checkpointing; on Kafka outage, stream position holds (no loss); DLQ for unmappable records (should be zero — paged).

- Batch: partial failures returned per item; caller re-submits failures only (idempotency absorbs overlap).

### Caching

Reads GSTIN/merchant-exists from the config Redis cache (§5 Blueprint); no other caching. Idempotency fast-path Redis is optional and OFF by default at T1 — the conditional put is the truth (ADR-2).

### Testing Strategy

- Money-path floor on credit notes: happy / retry (same cn_external_id) / partial (transact-write conflict) / concurrent (two notes racing the cap) / reconciles (Σ CN ≤ total).

- Property test: for any payload, at most one FACTS item per idempotency_key under concurrent replay.

- Contract tests: PG payload fixtures (incl. sandbox once hash spec lands — stubbed until then, §12); direct-API schema; Relay event schemas.

- AC coverage: AC-1..5, 18, 19, 23, 24, 12, 2/3/4 (see §11.2 map).

### Performance Considerations

Hot path = HMAC + AES-GCM encrypt + one transact-write: p95 < 80 ms in-service against the 200 ms gateway-to-ACK budget. Stateless; scales on RPS. Relay lag target < 1 s (feeds the 2 s generation budget).

### Security Considerations

- Raw-body HMAC before any parsing; constant-time compare; per-merchant secrets from the secrets manager, cached with TTL + version.

- Contact encrypted before it touches the write path; plaintext contact never logged, never in errors.

- Scope enforcement: direct-API merchant_id from token only; body merchant_id, if present, must match or 403.

- Batch size caps + per-caller rate limits (gateway) prevent queue-flush floods.

# 4. Module: Orchestration & Rendering

**Purpose: **Consumes bill.requested, assembles the bill model from config, renders HTML (eager) and provides PDF rendering (lazy, on first download — Review F-1/ADR-5), writes artifacts to S3, and appends STATUS=GENERATED / NO_CONTACT.

### Responsibilities

- Resolve merchant config (branding, labels, layout, widgets, default template) via cache; apply template override if template_id_requested valid, else default; unknown → default + log (FSD 5.4).

- Render bill HTML from logic-less template + block layout; skip widget blocks with missing data (BR-14).

- Write artifact to S3 (key: bills/{url_hash}/v{artifact_ver}/index.html); bump artifact_ver on re-render.

- Append STATUS=GENERATED (or NO_CONTACT when contact_present=false) via conditional append (legal transition only).

- PDF service endpoint: on first GET, render PDF from the same bill model, cache to S3, redirect thereafter.

- Re-render worker: consumes compliance/credit-note triggers to produce anonymised or CN-linked artifact versions.

### Public Interfaces

| **Interface** | **Direction** | **Contract** |
| --- | --- | --- |
| Kafka bill.requested | in | Consumer group orch-render; partition-ordered per merchant |
| GET /bills/{url_hash}/pdf | in (via gateway) | 302 to S3 PDF (rendering on miss); 404 unknown; 410 scrubbed-and-expired per OQ ruling |
| S3 artifacts | out | HTML/PDF versions; immutable per version |
| STATUS append | out | GENERATED │ NO_CONTACT items |

### Database Entities

Writes: STATUS items, artifact_ver on FACTS. Reads: FACTS (point read by bill_id), Config (via cache).

### Validation & Business Logic

- Template selection: requested → exists-and-owned check → else merchant default → else skeleton default; the choice recorded as template_id_used on FACTS (audit).

- Layout validation at render: only known block types (defence-in-depth — builder already enforces); invalid block → skip + warn metric.

- Widget data completeness per FSD 5.10: absent → block omitted, never empty.

- Receipt model: amount, mode, date, txn ids, branding — no line-item section, no GST block (BR-23).

### State Transitions

Appends REQUESTED→GENERATED or REQUESTED→NO_CONTACT only; any other observed prior state → duplicate-delivery of the event → no-op (idempotent).

### Dependencies

Bill Store; Config cache (Redis) → read-replica fallback; S3; Kafka in. Chromium pool only for the lazy PDF path.

### Sequence (primary + failure)

bill.requested -> worker: read FACTS -> config(cache) -> render HTML -> S3 put

  -> conditional STATUS append GENERATED -> (Relay emits bill.generated)

FAILURE render (template bomb): CPU/mem/time caps kill -> fallback skeleton render

  -> template auto-disabled to default + merchant notified (FSD 5.4 fallback) -> GENERATED

FAILURE S3 put: retry w/ backoff; consumer does not commit offset until STATUS appended.

### Error Handling & Retry Strategy

- Handler idempotency: if STATUS already ≥ GENERATED → ack and skip (at-least-once safe).

- Render caps: 2 vCPU-s / 512 MB / 5 s per render; breach = fallback path, offending template quarantined.

- S3/Store transient errors: retry 3× then leave offset uncommitted (Kafka redelivers); consumer lag alarm at 30 s (2 s p95 budget guard).

- PDF failures: retry on next request; HTML remains the source (FSD error table).

### Caching

Config cache per Blueprint §5 (write-through + 5-min TTL; dashboard test-generate bypasses — Review F-10). Compiled-template in-process cache keyed (template_id, version). No caching of bill data.

### Testing Strategy

- Golden-file render tests per skeleton × block permutations; widget-missing-data omission tests (AC-6).

- Fallback tests: unknown template, hostile template (resource bomb), oversized item list pagination.

- Idempotent-consumer test: duplicate bill.requested → exactly one GENERATED, one artifact version.

- AC coverage: AC-6, 16, 20, 21-adjacent (render side), 23 render split.

### Performance Considerations

CPU-bound: budget 400 ms p95 per HTML render at T1 fleet sizing; scales on consumer lag (KEDA). Lazy PDF keeps Chromium off the per-bill path entirely (Review F-1 cost point).

### Security Considerations

- Templates are data: logic-less engine subset, no expressions, no external fetch at render (logos are pre-proxied assets by upload flow).

- Output encoding on every merchant-supplied string (XSS in bill microsite).

- Rendered pages ship Referrer-Policy: no-referrer; external widget links rel=noopener noreferrer (Review F-11).

- PDF renderer network-isolated: may fetch from our S3 only.

# 5. Module: Dispatch

**Purpose: **Consumes bill.generated, resolves the delivery contact from the bill record (KV point read — F-1 pattern), sends over the merchant's channel with failover (BR-9), tracks provider callbacks, appends delivery STATUS, and meters premium sends (T1 money).

### Responsibilities

- Channel resolution: payload override_delivery if present else delivery_prefs default; contact field for channel must exist and be valid, else next channel; none valid → (should not occur; NO_CONTACT bills never reach here — assert + alert).

- Send via provider adapters (WhatsApp BSP / SMS / Email) behind a common port; SMS uses short link.

- Meter WhatsApp: conditional put to Metering Ledger (bill_id, channel, attempt) BEFORE the send call (meter-then-send; a failed send with a meter row is reconciled against provider reports — never the reverse, which loses money).

- Provider callbacks: verify per-provider signature/token (Review F-4 of blueprint / §7.1), map to STATUS DELIVERED / attempt-failure.

- Failover chain per FSD: WhatsApp exhausted → SMS; all exhausted → DELIVERY_FAILED + Ops alert; bill URL stays live.

- Timeout with no callback → state UNKNOWN internally; poll provider status API where available; else mark per retry policy.

### Public Interfaces

| **Interface** | **Direction** | **Contract** |
| --- | --- | --- |
| Kafka bill.generated | in | Consumer group dispatch |
| POST /v1/providers/{provider}/callback | in | Signed provider status callbacks → 202 |
| SQS retry queue | internal | {bill_id, channel, attempt, not_before} |
| STATUS append | out | DISPATCHED / DELIVERED / DELIVERY_FAILED |
| Metering Ledger | out | Conditional puts per premium attempt |

### Database Entities

Writes: STATUS items; Metering items. Reads: FACTS (contact_enc → decrypt via PII key grant; delivery prefs via config cache).

### API Contracts

| **Endpoint** | **Request (core)** | **Response / Errors** |
| --- | --- | --- |
| POST /v1/providers/wa/callback | provider payload + signature | 202; 401 bad signature; idempotent on provider_msg_id |
| POST /v1/bills/{bill_id}/resend | dashboard/Ops action; channel? | 202; 409 illegal state (only DELIVERED/FAILED resendable per FSD 6.5); audited |

### Validation & Business Logic

- Retry schedule per channel: 1 m / 5 m / 30 m, max 5 attempts (Blueprint §6.2), then failover; every attempt is a new SQS message, never in-memory sleep.

- Send dedup: conditional 'sent-marker' item (bill_id, channel, attempt) before provider call — duplicate event consumption becomes a no-op (double-send is the invariant this kills).

- Resend (FSD 6.5): allowed from DELIVERED or DELIVERY_FAILED only; creates attempt series 100+ (distinguishable in metering/audit).

### State Transitions

DISPATCHED on first successful provider accept; DELIVERED on provider confirmation; DELIVERY_FAILED only after full chain exhausts. Transitions conditional-appended; illegal transition = duplicate/stale signal → dropped with metric.

### Dependencies

Bill Store; Metering Ledger; PII KMS key (decrypt grant scoped to this service); provider adapters; SQS; config cache. Circuit breaker per provider.

### Sequence (primary + failure)

bill.generated -> resolve prefs -> decrypt contact -> meter(WA) -> send WA

  provider cb DELIVERED -> STATUS DELIVERED -> (Relay emits bill.delivery)

FAILURE: WA cb=failed or timeout -> SQS(backoff) x5 -> exhausted

  -> send SMS(short link) -> DELIVERED {failover:true}  (dashboard note per FSD)

  -> SMS exhausted too -> STATUS DELIVERY_FAILED -> Ops alert; URL remains live

### Error Handling & Retry Strategy

- Provider 5xx/timeouts → SQS backoff (never tight-loop); breaker OPEN → skip straight to failover channel (Blueprint §17).

- Unverifiable provider callback → 401 + metric (F-4 closure); replayed callback (same provider_msg_id) → no-op.

- Metering put fails → the send does NOT proceed (money before message); retried via SQS.

### Caching

Config cache for prefs; provider client connection pooling. No contact caching — decrypt per send, by design.

### Testing Strategy

- Money-path floor on metering: happy / retry (same attempt key) / partial (meter ok, send fails → reconciliation catches) / concurrent (duplicate event race → one meter row) / reconciles (Σ meter rows vs provider report fixture).

- Failover chain tests incl. breaker-open path (AC-7, 8); resend legality (dashboard states).

- Provider adapter contract tests against sandbox/fixtures per contracted provider.

### Performance Considerations

IO-bound; scales on queue depth + consumer lag. Decrypt adds ~1 ms; provider latency dominates. Per-merchant send-rate anomaly metric (phishing/abuse tell, §9.1 Blueprint threat model).

### Security Considerations

- Only this service holds a decrypt grant on the PII key besides CRM/BFF-portal; grants are per-workload identity.

- Contact plaintext exists in memory only for the provider call; never logged, never in SQS payloads (SQS carries bill_id + channel + attempt only).

- Resend is an audited action (actor, reason) — append to audit stream.

# 6. Module: Merchant Config & Templates

**Purpose: **System of record for merchant setup: branding, labels, delivery prefs, widgets, template library and builder backend, and the one-default invariant. Publishes config.changed for cache invalidation.

### Responsibilities

- CRUD per §2.3 tables with schema-level invariants (BR-17/18/19).

- Template builder backend: validate layout_schema (Header+Items mandatory — FSD 5.5; known blocks only; enabled widgets have data before default-eligibility).

- Clone-and-edit: library template (merchant_id NULL) → deep copy owned by merchant; library rows immutable to merchants (role-guarded).

- Default management: set-default is transactional (validate template → upsert merchant_defaults); deleting the current default is blocked until another is chosen (FSD 5.5 edge).

- Write-through to Redis config cache + config.changed publish on every save.

### Public Interfaces

| **Interface** | **Direction** | **Contract** |
| --- | --- | --- |
| REST /v1/config/* , /v1/templates/* | in | Dashboard BFF is the only caller (plus Ops read); scope-checked CRUD |
| config.changed | out | Cache invalidation + render-worker recompile signal |
| Redis write-through | out | Per-merchant config blob, versioned |

### Database Entities

Owns all §2.3 tables. No Bill Store access.

### API Contracts

| **Endpoint** | **Request (core)** | **Response / Errors** |
| --- | --- | --- |
| PUT /v1/templates/{id} | layout_schema, name, base_skeleton | 200 {version}; 422 LAYOUT_INVALID {reason}; 403 library row |
| POST /v1/templates/{id}/clone | — | 201 {new_template_id} |
| PUT /v1/config/default-template | {template_id} | 200; 422 TEMPLATE_NOT_ELIGIBLE (validation fails); 404 |
| DELETE /v1/templates/{id} | — | 204; 409 IS_DEFAULT (choose another first) |

### Validation & Business Logic

- Layout JSONB validated against block enum + per-widget data schemas; invalid saves rejected with field-level reasons (AC-22).

- GSTIN format + colour HEX + logo constraints enforced at the schema and the API layer (parse-don't-validate).

- Library updates never propagate to clones (FSD 5.5 edge) — clones are copies, not references.

### State Transitions

Template lifecycle: DRAFT → SAVED → DEFAULT (one per merchant) → (deletion blocked while DEFAULT). Versions monotonically increment; render pins the version it used.

### Dependencies

Postgres (Config DB); Redis; Kafka (config.changed out). No downstream sync calls.

### Error Handling & Retry Strategy

- Postgres serialization conflicts on default-swap → retry once then 409 to caller (client retries).

- Redis write-through failure → save still commits (DB is truth); invalidation event covers cache; alert on write-through error rate.

### Caching

IS the cache producer: write-through blob + 5-min TTL backstop; consumers fall back to read replicas (Blueprint §5).

### Testing Strategy

- Constraint tests: one default (concurrent set-default race), library immutability by role, delete-default block (AC-21, 22).

- Layout validator property test: any schema not conforming to block enum is rejected.

- Cache coherence test: save → config.changed → stale-read window bounded.

### Performance Considerations

Low write volume; read path is the render-critical one and is served by cache/replicas — this service is not on the bill hot path at all.

### Security Considerations

- Only BFF/Ops principals reach it; merchant scope on every row (IDOR tests on template ids).

- Logo upload flow: content-type sniffing, size caps, image re-encode (strips payloads), stored as our asset — external URLs never fetched at render (SSRF closure).

# 7. Module: CRM (Customer Data & Consent)

**Purpose: **Asynchronously builds the merchant customer database from billing contacts (F-1 pattern: consumes events, reads contact_enc from the bill record, writes the Vault). Owns consent and the contact↔bill graph the portal and scrub depend on.

### Responsibilities

- Consume bill.requested where contact_present=true; point-read FACTS; decrypt contact; upsert Vault contact (by merchant_id + phone_hash) and contact_bills link.

- Consent recording: consent flag from payload stored per contact; default false for marketing (BR-12); consent withdrawal API triggers early scrub for that contact.

- Single profile per customer per merchant across stores (FSD 5.7 edge): upsert key is (merchant_id, phone_hash).

- Serve internal lookups: portal (bills for verified phone), dashboard customer list (via BFF), scrub targets.

### Public Interfaces

| **Interface** | **Direction** | **Contract** |
| --- | --- | --- |
| Kafka bill.requested | in | Filtered on contact_present |
| Internal gRPC/REST: contacts-by-phone, bills-for-contact, upsert-consent | in | BFF + Compliance only; mTLS + workload identity |
| Vault tables | out | contacts, contact_bills (§2.4) |

### Database Entities

Owns §2.4 Vault tables. Reads FACTS (decrypt grant).

### Validation & Business Logic

- Phone/email syntactic validation before storage (FSD 5.7); invalid → dropped with metric, bill unaffected (delivery already handled it).

- Upsert is idempotent by natural key; duplicate event consumption is a no-op.

- Consent transitions: false→true only via explicit flag on a new bill or an authenticated consent API call; true→false immediately honoured and propagated (marketing widget suppression is a render-time config read, out of CRM's path).

### State Transitions

Contact lifecycle: ACTIVE → (T-90 per-bill link deletes) → orphaned contact deleted when last link expires → GONE. Early path: consent-withdrawal → scheduled deletion.

### Dependencies

PII Vault (Postgres); Bill Store read; PII KMS decrypt grant; Kafka in. Lag-tolerant by design (eventually-right class).

### Sequence (primary + failure)

bill.requested{contact_present} -> read FACTS -> decrypt -> upsert contact + link

FAILURE Vault down: consumer pauses (lag alarm at 15 min, not paged at 30 s -

  CRM lag never blocks bills); resumes and drains; no loss (Kafka retention 7 d).

### Error Handling & Retry Strategy

- Vault write conflicts (same contact, two stores, concurrent) → natural-key upsert wins; retry on serialization failure.

- Decrypt failure (key issue) → DLQ + page: PII-key health is a platform incident, not a data bug.

- Backfill safety: replay of bill.requested history is safe end-to-end (idempotent upserts) — this is the recovery mechanism after a CRM bug.

### Caching

None (deliberate): every read is an indexed Vault query; caching PII multiplies scrub surfaces.

### Testing Strategy

- Idempotent-upsert tests incl. concurrent same-customer races; consent default/withdrawal tests (BR-12; AC-9).

- Replay test: consume the same event stream twice → identical Vault state.

- Partition-pruning test on phone_hash (portal latency depends on it).

### Performance Considerations

Write rate = bill rate with contact (async, laggable). Vault partitioned by hash(phone_hash); at T3 sustained writes approach Postgres comfort limits — the lag alarm and partition scaling are the pressure valves (Blueprint-reviewed, accepted).

### Security Considerations

- Smallest decrypt-grant surface: this service, Dispatch, and the portal path only.

- Vault reachable solely from CRM/BFF/Compliance workloads (network policy); all queries merchant-scoped or phone-verified.

- No PII in metrics/log/trace attributes — surrogate contact_id only.

# 8. Module: Analytics (Pipeline + Beacon Collector)

**Purpose: **Owns engagement truth: ingests beacons and delivery events, maintains merchant aggregates for the dashboard, and stores survey/feedback responses. Includes the thin Beacon Collector (Review F-7) so open/click firehose never touches the BFF.

### Responsibilities

- Beacon Collector: unauthenticated-but-signed beacon endpoint (bill url_hash acts as capability); validates, rate-limits per bill, publishes engagement.events. Stateless, no reads.

- Pipeline consumers: engagement.events + bill.delivery → T1 store = partitioned Postgres aggregates (Review F-8: warehouse deferred to T2 trigger); raw events retained on the topic (3 d) + cold object-store archive.

- Aggregates per merchant per day: sent, delivered, failed, opens, unique customers (HLL sketch on surrogate ids), widget CTR, survey scores, top customers.

- Survey/feedback store: one response per (bill_id, surrogate_customer) enforced here (FSD 5.10) — the BFF widget API calls this module's check-and-record.

### Public Interfaces

| **Interface** | **Direction** | **Contract** |
| --- | --- | --- |
| POST /b/{url_hash} | in (Collector, via gateway) | kind, widget_ref?; 204 always (fire-and-forget semantics to the page) |
| Kafka engagement.events, bill.delivery | in | Pipeline consumers |
| Internal query API: aggregates, feedback | in | BFF only |
| record-survey (check-and-insert) | in | BFF widget API; 200 recorded │ 200 duplicate-ignored (AC-13) |

### Database Entities

Owns: aggregates tables, feedback table, event archive. No PII — surrogate ids only.

### Validation & Business Logic

- Beacon validation: url_hash must resolve (bloom-filter of live hashes, refreshed from bill.generated) — garbage traffic dropped before Kafka.

- Once-per-customer survey: unique index (bill_id, surrogate_customer_id); duplicates return success-but-ignored (first counted — FSD 5.10 edge).

- Delivery aggregates derive only from bill.delivery events — never from provider callbacks directly (single source).

### State Transitions

None beyond append/derive; aggregates are rebuildable from the archive (stated recovery property).

### Dependencies

Kafka; Postgres (aggregates, T1); object store archive. The T2 warehouse swap changes consumers only (topics are the interface).

### Sequence (primary + failure)

page load -> POST /b/{hash}{kind:OPEN} -> collector: bloom check -> publish -> 204

consumer -> upsert daily aggregate row (idempotent on event_id)

FAILURE consumer bug deployed: fix -> replay from topic/archive -> aggregates rebuilt

### Error Handling & Retry Strategy

- Collector never blocks the page: 204 regardless; drops on internal error with a counter (beacons are lossy-tolerable by contract — stated to Product).

- Aggregate upsert idempotent on event_id (at-least-once safe).

- Rebuild runbook: truncate range → replay archive → verify counts vs bill.delivery totals.

### Caching

Bloom filter of url_hashes in-process (space-bounded, false-positive-tolerant); dashboard reads served from aggregate rows — no query-time event scans.

### Testing Strategy

- Idempotent-aggregate tests; survey-once tests incl. race (AC-13); bloom false-positive tolerance test (garbage hash → dropped downstream by join failure, harmless).

- Rebuild-from-archive test is CI-run monthly (recovery is rehearsed, not assumed).

### Performance Considerations

Collector is the highest-RPS endpoint in the system (opens ≈ 0.7× sends): budget 5 ms p95, no I/O on request path except Kafka produce (async, buffered). Aggregates write rate is bounded by event rate / batch size.

### Security Considerations

- url_hash-as-capability means no auth cookie on bill pages (privacy-positive); per-hash rate limits kill beacon spam.

- No PII ever: surrogate_customer_id minted by BFF portal/widget layer via keyed hash; Analytics cannot reverse it.

- Feedback free-text (if enabled later) would be PII-adjacent — flagged as an FSD change, not silently absorbed.

# 9. Module: Experience BFF (Dashboard, Portal, Widget APIs)

**Purpose: **The human-facing API layer: merchant dashboard, customer OTP portal, and interactive widget endpoints (survey submit). Composes reads across Config, Bill Store, CRM, and Analytics. Never on the bill-generation path.

### Responsibilities

- Dashboard: bills list (GSI-1 queries: date, type, state, channel filters — FSD 6.5), bill detail, resend action (delegates to Dispatch, audited), analytics views (Analytics query API), customer list (CRM API), config/template UIs (Config API), test-generate (cache-bypass flag — Review F-10).

- Portal: phone → OTP (auth Redis, rate-limited, fail-closed) → CRM bills-for-contact → list; scrubbed bills structurally absent (links deleted).

- Widget APIs: survey submit → Analytics check-and-record; coupon view state; marketing click passthrough logging.

- Mints surrogate_customer_id (keyed hash of verified phone) for Analytics.

### Public Interfaces

| **Interface** | **Direction** | **Contract** |
| --- | --- | --- |
| REST /v1/dashboard/* | in | OIDC session + role claims (FSD §2 roles) |
| REST /v1/portal/* | in | OTP flow; phone-scoped access only |
| REST /v1/widgets/* | in | url_hash capability + per-bill limits |
| Downstream | out | Config, CRM, Analytics APIs; Bill Store GSI reads; Dispatch resend |

### Database Entities

Owns nothing durable (sessions/OTP in auth Redis). All reads scoped.

### API Contracts

| **Endpoint** | **Request (core)** | **Response / Errors** |
| --- | --- | --- |
| POST /v1/portal/otp | {phone} | 202 (always, no user enumeration); rate limits per phone + IP |
| POST /v1/portal/verify | {phone, otp} | 200 {session} │ 401 (attempts capped → lockout window) (AC-15) |
| GET /v1/portal/bills | session | List for verified phone only; 410 entries excluded |
| POST /v1/widgets/{url_hash}/survey | {rating│text-choice} | 200 recorded/duplicate-ignored (AC-13) |
| POST /v1/dashboard/bills/{id}/resend | role ≥ Merchant Admin │ Ops | 202 │ 409 illegal state; audit-logged |

### Validation & Business Logic

- Every dashboard query injects merchant scope from session claims — request-body merchant ids ignored (IDOR).

- Portal OTP: 6-digit, 5-min TTL, 5 attempts, per-phone and per-IP budgets, fail-closed when auth Redis is down (Blueprint §5).

- Role gates mirror FSD §2 exactly: Store Staff sees no analytics/config; Ops read-across is break-glass + audited.

### State Transitions

OTP session: ISSUED → VERIFIED (single-use) → EXPIRED. Dashboard sessions per OIDC norms.

### Dependencies

Auth Redis; Config, CRM, Analytics APIs; Bill Store GSI; Dispatch. Circuit breakers + per-downstream timeouts; a downstream outage degrades one dashboard panel, never the whole app (bulkheads).

### Error Handling & Retry Strategy

- Downstream timeout → partial UI payloads with per-panel error markers (graceful degradation contract with frontend).

- OTP service errors fail closed with honest messaging; no retry-after leaks of lockout state.

- Resend races (double-click) → Dispatch-side dedup makes it one action; BFF also debounces.

### Caching

Short-TTL (30 s) per-merchant dashboard aggregate cache (read-heavy panels); nothing user-identifying cached; portal path uncached.

### Testing Strategy

- IDOR test suite is the centrepiece: every endpoint fuzzed with foreign merchant/bill/contact ids (Blueprint §9.1 threat model row).

- OTP brute-force and enumeration tests (uniform 202); lockout behaviour (AC-15).

- Role-matrix tests generated from FSD §2 table.

### Performance Considerations

Read-heavy; scales stateless. GSI query patterns cover all dashboard filters without scans (verified in design: filters map to GSI-1 key + projected attributes).

### Security Considerations

- Sessions httpOnly/secure/SameSite; CSRF tokens on state-changing dashboard calls.

- Portal responses never confirm whether a phone exists (uniform 202).

- Surrogate-id key lives in the secrets manager; rotation re-keys analytics joins forward-only (documented limitation).

# 10. Module: Compliance Jobs

**Purpose: **Scheduled/batch plane: the 90-day PII scrub, artifact anonymisation, reconciliation jobs (Blueprint §14.2), archive tiering, and audit-stream shipping. Never contends with real-time traffic (off-peak windows, separate workload).

### Responsibilities

- Scrub scheduler: daily scan of bills at T-90 (GSI on received_at bucket) → compliance.scrub_due; scrub executor: null contact_enc + set scrubbed_at (FACTS), delete contact_bills links (Vault), delete orphaned contacts, trigger anonymised re-render (Orchestration re-render worker), verify — then emit scrub.completed to the audit stream.

- Reconciliation jobs (all idempotent, all page on drift): metering vs provider reports; bills vs PG extract (STUBBED until feed confirmed — §12); internal sums (Σ CN ≤ total per bill; event counts vs STATUS counts; scrub completeness = the T-90+1d SLO).

- Backup-retention enforcement per the DPDP ceiling ruling (Review F-4): asserts PII-store backup configs match policy; drift alarms.

- Cold tiering: FACTS past hot window to object storage per Blueprint §4.2.

### Public Interfaces

| **Interface** | **Direction** | **Contract** |
| --- | --- | --- |
| Cron schedules | in | Platform scheduler; every run writes an audit entry (start/end/counts) |
| compliance.scrub_due | out/in | Self-produced work queue; executor consumes |
| Vault + Bill Store + S3 | out | Scrub mutations (the ONLY writer allowed to null contact_enc) |
| Audit stream | out | scrub.completed, reconciliation results, job runs |

### Database Entities

Writes: the two scrub mutations + tiering moves. Reads: everything it reconciles.

### Validation & Business Logic

- Scrub is idempotent: re-running on a scrubbed bill is a no-op (null stays null; missing links stay missing) — reruns are the recovery path.

- Legal-hold list (merchant_id/bill_id) exempts bills from scrub with an audit reason (FSD 5.13 edge).

- Consent-withdrawal deletions ride the same executor (early due_at).

### State Transitions

Per-bill scrub state: DUE → SCRUBBED (verified) | HELD (legal) | FAILED (paged). The completeness reconciliation is the state machine's external verifier.

### Dependencies

Bill Store; Vault; S3; Kafka; audit stream; provider report feeds; PG extract (pending). Runs in the async-workers deployable but on isolated schedules/quotas.

### Sequence (primary + failure)

daily: scan T-90 -> scrub_due events -> executor: FACTS.contact_enc=null

  -> Vault link deletes -> re-render anonymised artifact v+1 -> verify -> audit

FAILURE any step: item stays DUE -> next run retries; completeness recon

  pages on anything past T-90+1d (the SLO is externally enforced, not assumed)

### Error Handling & Retry Strategy

- Partial scrub (store ok, Vault fails) → rerun converges (idempotence); verification step reads all three surfaces before marking SCRUBBED.

- Provider report missing/late → metering recon marks UNRECONCILED window + alerts (not silent).

- Drift found by any recon → page + auto-open postmortem ticket (methodology: every nonzero drift is a postmortem).

### Caching

None. Batch reads use paginated scans in off-peak windows with rate caps (never contend — stated responsibility).

### Testing Strategy

- Scrub idempotence + partial-failure tests (kill executor mid-bill → rerun converges) (AC-14).

- Legal-hold exemption tests; consent-withdrawal early-scrub tests.

- Reconciliation property test: seeded discrepancies of each class are detected (a recon that can't fail its fixtures is theatre).

### Performance Considerations

Batch throughput sized so a full day's scrub cohort completes in < 2 h off-peak at T3 volumes; tiering incremental.

### Security Considerations

- This module holds the most dangerous grants (Vault delete, FACTS mutate) — its workload identity is unique, its actions are 100% audit-covered, and its code changes require [blocking]-level review by policy.

- Legal-hold list changes are themselves audited actions.

# 11. Module Independence & Build Map

### 11.1 Build-alone prerequisites (what to stub)

| **Module** | **Needs real** | **Stub with** |
| --- | --- | --- |
| Ingestion | Bill Store (local KV container), KMS (local key) | Kafka → in-memory relay assertion; Config cache → fixture map; PG hash → HMAC-SHA256 stub flag (§12) |
| Orchestration & Rendering | S3 (local object store), Bill Store | bill.requested → fixture events; Config cache → fixture blobs |
| Dispatch | Metering table, Bill Store | Provider adapters → contract fakes (success/fail/timeout scripts); SQS → local queue |
| Config & Templates | Postgres | Redis → embedded; Kafka → log-only publisher |
| CRM | Vault Postgres, Bill Store read | Events → fixtures; KMS → local key |
| Analytics | Postgres aggregates | Kafka → fixtures; bloom → static set |
| BFF | Auth Redis | All downstreams → recorded-contract fakes (the bulkhead tests need scripted failures anyway) |
| Compliance | Bill Store, Vault, S3 (locals) | Provider reports / PG extract → CSV fixtures; scheduler → manual trigger |

Order-free rule: because every cross-module contract is either a registered event schema or an API contract in this document, any module can be built first against fakes and integrated later without rework. Recommended order for fastest end-to-end slice: Ingestion → Orchestration → Dispatch (with fakes) = a demonstrable callback→delivered path; then Config (real templates), then BFF/Analytics/CRM/Compliance in parallel.

### 11.2 FSD Acceptance Criteria → Owning Module

| **ACs** | **Module(s)** |
| --- | --- |
| AC-1, 2, 3, 4, 5, 12, 18, 19, 23, 24 | Ingestion (validation, idempotency, routing, credit-note cap) |
| AC-6, 16, 20, 21 (render half), 23 (render half) | Orchestration & Rendering |
| AC-7, 8 | Dispatch (failover, failed-state + live URL) |
| AC-21, 22 | Config & Templates (clone/edit/default; save validation) |
| AC-9 | CRM (consented profile + link) |
| AC-13 | Analytics (survey once) |
| AC-15 | BFF (portal OTP scoping) |
| AC-10 | Ingestion batch + Orchestration (offline exactly-once, sale-time) |
| AC-11 | Ingestion (CN record) + Orchestration (CN artifact/link) |
| AC-14, 17 | Compliance (scrub); Gateway+all (tenancy) — IDOR suite in BFF covers the read surface |

### 11.3 Build-Time Blockers Carried (§12 detail)

PG secureHash algorithm + secret provisioning (Ingestion ships behind a hash-stub flag; flag removal is a release gate). PG settlement extract (bills-vs-PG recon stubbed; internal recon is the operative tripwire until then). DPDP backup ceiling (Compliance retention assertion parameterised, awaiting Legal). Peak-TPS ratification (affects fleet sizing only — no contract here changes). Permanent-URL vs scrub ruling (anonymised re-render implemented as recommended; a different ruling changes the Compliance executor and the PDF 410 behaviour only).

## For the Record

- This TDS implements FSD v1.0 behaviour on the corrected architecture (Blueprint v1.1 + Review F-1..F-11): encrypted-contact-in-record, CDC event relay, deterministic bill_id, meter-then-send, beacon collector, Postgres-first analytics, logical-8 / physical-3 packaging per Blueprint §3 assumed (sync plane / async workers / analytics consumers).

- Decisions made here (implementation-level): single-table Bill Store layout (FACTS/STATUS/CN items); transact-write FACTS+REQUESTED; metering keyed (merchant-month, bill#channel#attempt); bloom-guarded beacons; surrogate-id minting in BFF; scrub verified by external reconciliation.

- Nothing here changes FSD behaviour; two FSD open questions (portal scope, URL/scrub ruling) have their implementation isolated so either ruling is a bounded change.

- Open: four build-time blockers in §11.3 with stub strategies; fleet sizing pending TPS ratification.

Page  of