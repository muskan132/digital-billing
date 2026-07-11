Digital Billing Core — Engineering Architecture Blueprint	Internal — v1.2

**Engineering Architecture Blueprint**

**Digital Billing Core**

JioPay  |  Merchant Platform

Audience: Engineering, SRE, Security, Product

Status: v1.2 (post self-review; Architecture Review findings F-1..F-11 applied)  |  Internal  |  Source of truth for behaviour: FSD v1.0 (frozen)

# 1. Load-Bearing Numbers & Constraints

Every design decision below traces to a number in this table. Where a figure is an assumption rather than a verified requirement, it is marked and must be confirmed before capacity commitments.

| **Dimension** | **Figure** | **Tier** | **Design Consequence** |
| --- | --- | --- | --- |
| Merchants | Design ceiling: millions. Launch reality: 5k–30k (Year 1–3 per strategy docs) | Stated + assumption | merchant_id is the universal partition key; no table scans across merchants |
| Write TPS (bill generation) | Ceiling: 50k TPS. Comparable market leader averages ~13 TPS; full Reliance Retail ≈ 44 TPS avg, ~500–1,500 TPS festive peak | Stated ceiling; peak = assumption | Architecture must scale linearly to ceiling; deployment sized in tiers (see §16) |
| Read pattern | Bill opens ≈ 0.7× sends (70% open target); heavily cacheable; reads spike after dispatch | FSD-derived | CDN-first for bill views; origin sees a small fraction of reads |
| Latency budgets | Callback ACK < 200 ms; bill generated < 2 s (p95); bill page load < 1 s (p95, India mobile); dispatch enqueue < 5 s | FSD (2 s) + assumption | Accept-then-process-async; CDN edge for views |
| Consistency: must never be wrong | Idempotency (no duplicate bills); bill immutability; credit-note cap ≤ bill value; secureHash verification; premium-delivery metering | FSD | Conditional writes on the bill store; append-only records; metering as ledger entries |
| Consistency: eventually right is fine | Analytics counters, dashboards, CRM enrichment, open/click events | FSD-derived | Event stream + async consumers; no sync coupling to bill path |
| Availability | Bill generation 99.9% (FSD MVP criterion); bill viewing 99.95% (CDN-backed) | FSD + assumption | Multi-AZ everywhere; degrade to “generate now, dispatch later” |
| Data lifecycle | PII scrub at exactly 90 days; tax data retained per statute; audit trail for ops access | FSD (BR-11) | PII isolated in its own store/columns so scrubbing is a targeted delete, not a rewrite |
| Tenancy | Strict per-merchant isolation (BR-15); Ops read-across with audit | FSD | Row-level scoping by merchant_id in every query path; audited break-glass for Ops |

**Open capacity question carried from FSD: **confirmed peak-TPS target and latency SLA remain unowned. Until confirmed, Tier-1 deployment sizing (§16) assumes 500 TPS sustained / 1,500 TPS peak with a tested scale path to 50k.

**Riskiest technical assumption (named per methodology Phase 1): **that the PG S2S callback behaves as this design assumes — HMAC-SHA256-class hash, at-least-once retries, and per-merchant secrets. Every generation flow starts there. Validation task: a contract test against the PG sandbox is the first engineering deliverable, before any service code.

# 2. System Architecture

Three planes, mirroring the FSD's Ingestion → Orchestration → Delivery layering, made asynchronous at every boundary that does not affect the caller's response.

                          +-------------------------+

  PG S2S callback -->   |                          |

  POS / PSP direct ->   |   API GATEWAY / WAF      |  auth, rate-limit, schema

  Dashboard / Portal >  |   (edge, multi-AZ)       |  validation, routing

                          +----------+------------+

                                     |

          +----------------------+-----------------------+

          |  INGESTION SVC (stateless)                        |

          |  hash verify * bill_type route * idempotency put   |

          +------------------+------------------------+

                               | event: bill.requested

                     +========+========+

                     |   EVENT BACKBONE   |  (Kafka, partition = merchant_id)

                     +==+=====+=====+==+

                        |     |     |

        +-------------+     |     +--------------+

        v                    v                     v

  +----------+   +-------------+      +------------+

  | ORCHESTR. |   | CRM SYNC     |      | ANALYTICS   |

  | + RENDER  |   | (consent-    |      | PIPELINE    |

  | workers   |   |  gated)      |      | -> warehouse |

  +----+-----+   +-------------+      +------------+

       | writes HTML/PDF -> S3 -> CDN

       | event: bill.generated

       v

  +------------+   provider callbacks

  | DISPATCH   | <--------------------  WhatsApp BSP / SMS / Email

  | (retry +   | -------------------->

  |  failover) |   event: bill.delivery (delivered / failed)

  +------------+

**Key property: **the synchronous path is only Gateway → Ingestion → idempotency write → 202 ACK. Everything after is event-driven, so a rendering or provider outage never blocks the PG callback or a POS terminal, and the 200 ms ACK budget holds at any TPS.

# 3. Service Decomposition

Eight services — split along scaling and failure boundaries, not org-chart lines. Anything without an independent scaling or failure profile stays inside an existing service (boring by default; each split below names the requirement that justifies it).

| **Service** | **Responsibility (FSD modules)** | **Why it is separate** | **Scaling profile** |
| --- | --- | --- | --- |
| Ingestion | 4.1 — hash verify, auth, bill_type routing, idempotency, offline batch intake | Sits on the 200 ms ACK path; must scale with raw TPS independent of render cost | CPU-light, stateless; scales on request rate |
| Orchestration & Rendering | 4.2–4.4 — validation, merge, label/layout resolve, template render, PDF | CPU-heavy (HTML/PDF); its load must not steal capacity from ACKing | CPU-bound workers; scales on Kafka lag |
| Dispatch | 4.6 — channel send, callback tracking, failover, premium metering | Blocked on third-party providers; needs its own retry/queue semantics and circuit breakers | IO-bound; scales on queue depth |
| Merchant Config & Templates | 4.3, 4.5 — config CRUD, template builder backend, default library | Low-volume writes, very-high-volume reads by every render; caching boundary | Read-replica + cache; small fleet |
| CRM | 4.8 — contact upsert, consent, profile-bill links | Owns PII; isolating it makes the 90-day scrub and DPDP audits a one-service problem | Modest; scales on event rate |
| Analytics | 4.9 — open/click/widget events, aggregates, feedback | Firehose write pattern totally unlike transactional stores | Append-heavy; stream consumers |
| Experience BFF | 4.12 — merchant dashboard API, customer portal (OTP), bill microsite widget APIs | Public-facing read paths with their own auth models (OIDC, OTP) | Read-heavy; CDN-assisted |
| Compliance Jobs | 4.10–4.11 — PII scrub, credit-note issuance, retention, reconciliation | Scheduled/batch semantics; must never contend with real-time traffic | Batch; off-peak windows |

**Deliberately not split: **the calculation validator, label resolver, and template engine live inside Orchestration & Rendering — they always execute together per bill, so a network hop between them adds latency and failure surface for zero independent-scaling benefit. Offline-queue intake is an Ingestion code path, not a service: same contract, same idempotency.

**Physical packaging by tier (monolith-first, per methodology 1.4): **the eight services are logical boundaries — separate modules, separate event contracts — but at Tier 1 they ship as three deployables: (a) sync plane (Ingestion + BFF + Config), (b) async workers (Orchestration/Render + Dispatch + CRM + Compliance), (c) analytics consumers. One team operates three deployables, not eight. Physical extraction happens per service when its scaling profile diverges in practice (render CPU is the first expected split, at T2) or when team ownership splits — the module boundaries make extraction a deployment change, not a rewrite.

# 4. Database Architecture

Data model before components. Four stores, each matched to its access pattern; merchant_id is the partition key everywhere. PII is physically separated from bill facts so the 90-day scrub (BR-11) is a targeted delete.

| **Store** | **Technology** | **Holds** | **Access Pattern** | **Why this store** |
| --- | --- | --- | --- | --- |
| Bill Store | DynamoDB-class wide-column KV (or Cassandra/ScyllaDB self-hosted) | Bill records: immutable facts, artifact pointers, status, idempotency key; credit notes as linked records | Write-once at up to 50k TPS; point reads by bill_id / (merchant_id, txn_id) | Linear horizontal write scaling; conditional put gives idempotency inside the data model; relational DBs need sharding gymnastics at this ceiling |
| Config DB | PostgreSQL (managed, multi-AZ + read replicas) | Merchants, templates, layout_schema, labels, delivery prefs, users/roles | Low-write, read-mostly; relational integrity (one default template per merchant = constraint) | Boring, transactional, enforces FSD invariants (BR-18) in the schema |
| PII Vault | PostgreSQL, separate cluster, separate KMS key | Customer contacts, consent flags, contact↔bill links, portal OTP state | Upserts on generation; deletes at 90 days; lookups for portal | Isolation makes DPDP scrub/audit tractable; own encryption key allows crypto-shredding |
| Analytics Store | Kafka → partitioned PostgreSQL aggregates at T1 (Review F-8); columnar warehouse (ClickHouse-class) deferred to a measured T2 trigger | Open/click/widget/delivery events; merchant aggregates | Append firehose; aggregate reads for dashboards | Aggregate rows answer dashboard queries without touching transactional stores; topics are the interface, so the columnar swap changes consumers only |

### 4.1 Bill Record Invariants (T1 rules)

- Append-only: a bill row is never updated after generation; status transitions and credit notes are new records referencing it. Corrections are new entries, never edits.

- Idempotency in the data model: bill creation is a conditional put on the idempotency key (merchantTxnNo+paymentID or external_transaction_id). A replay loses the write race and reads the existing record — correctness does not depend on a cache being up.

- Money as integers: all amounts stored in minor units (paise). No floats anywhere in the money path, including the premium-delivery meter.

- Premium metering as a ledger: each WhatsApp send appends a metering entry (bill_id, merchant_id, unit cost, timestamp); merchant charges are derived by summation, never stored as a mutable running total.

- Credit-note cap enforced at write: issuing a credit note re-reads the sum of prior notes inside a transaction/conditional expression so concurrent notes cannot exceed bill value (BR-13).

### 4.2 Partitioning & Growth

- Bill Store partition key: merchant_id + coarse time bucket, so one giant merchant (Reliance-scale) cannot create a hot partition; sort key: bill timestamp + bill_id.

- At 1,500 TPS peak ≈ 130M bills/day worst case ≈ 260 GB/day at ~2 KB/record. Hot store keeps 90 days (PII window); older bill facts tier to object storage; hosted HTML lives in S3 from day one.

- Config DB stays small (millions of merchants × a few KB); read replicas + Redis absorb render-path reads, so it never becomes the bottleneck.

# 5. Caching Strategy

| **Layer** | **Technology** | **What is cached** | **Invalidation** | **Failure Behaviour** |
| --- | --- | --- | --- | --- |
| Edge / CDN | CloudFront-class CDN | Rendered bill HTML, PDFs, template assets, logos | Immutable content — hashed URLs never change; credit-note linkage adds a page element via versioned asset, no purge storm | CDN miss → origin S3; bill viewing survives total backend outage |
| Merchant config cache | Redis (cluster mode) | Branding, labels, layout_schema, default template, delivery prefs — the per-bill render lookup | Write-through on config save + short TTL (5 min) as backstop | Cache down → read replica direct; renders slow but correct (cache-aside, never cache-only) |
| Template cache | In-process (per render worker) | Compiled template skeletons (4 foundational + merchant clones) | Version stamp in config record; recompile on mismatch | Cold start recompiles; bounded cost |
| Idempotency fast-path | Redis (cache cluster), 24 h TTL | Recently seen idempotency keys (saves a Bill Store read on hot replays) | TTL only | Cache miss → conditional put on Bill Store decides; Redis is an optimisation, never the source of truth |
| OTP / session | Redis — separate auth cluster, isolated from the cache cluster | Portal OTP state, rate-limit counters, dashboard sessions | Native TTL | Fail-closed: OTP unavailable → portal login temporarily unavailable. Isolation means a cache-load incident cannot take authentication down with it |

**Rule: **no cache is authoritative for any FSD invariant. Idempotency, credit-note caps, and consent all resolve against durable stores; caches only make the happy path cheaper.

# 6. Event Architecture & Queues

### 6.1 Event Backbone (Kafka)

Kafka is the one deliberate innovation token beyond managed basics, justified by three named requirements boring alternatives fail: (1) tens-of-thousands-TPS fan-out to ≥4 independent consumers, (2) replay for reprocessing after a consumer bug, (3) ordered per-merchant processing via partition keys.

| **Topic** | **Producer** | **Consumers** | **Key / Ordering** | **Retention** |
| --- | --- | --- | --- | --- |
| bill.requested | Event Relay (from FACTS create) | Orchestration workers | merchant_id (per-merchant order) | 7 days |
| bill.generated | Event Relay (from STATUS=GENERATED) | Dispatch, CRM, Analytics | merchant_id | 7 days |
| bill.delivery (state: DISPATCHED│DELIVERED│DELIVERY_FAILED) | Event Relay (from Dispatch STATUS appends) | Analytics, Experience BFF (status), Ops alerting | merchant_id | 7 days |
| engagement.events (open/click/survey/redeem) | Beacon Collector (Analytics, Review F-7) | Analytics pipeline | merchant_id | 3 days |
| config.changed | Merchant Config | Cache invalidator, render workers | merchant_id | 1 day |
| compliance.scrub_due | Compliance scheduler | CRM, Bill Store scrubber, hosting anonymiser | merchant_id | 30 days |

### 6.2 Work Queues & Retry Semantics

- Dispatch retry queue (SQS-class): per-channel send attempts with exponential backoff (1 m / 5 m / 30 m), max 5 attempts, then failover per FSD (WhatsApp → SMS) and finally bill marked Failed with Ops alert.

- Every consumer is idempotent (keyed on bill_id + step), because Kafka is at-least-once. Duplicate bill.generated events must not double-send or double-meter — the metering ledger append is conditional on (bill_id, channel, attempt).

- Dead-letter queues on every consumer; DLQ depth is a paged alert with a linked runbook (every page is actionable — methodology 6.2). Poison messages never block a partition for more than the retry budget.

- Consumers use cooperative rebalancing + static group membership so a rolling deploy does not trigger a stop-the-world rebalance across the render fleet — the classic self-inflicted latency spike during releases.

- Event schemas are a published contract: versioned (schema registry), additive-only changes; breaking change = new topic version with parallel-run deprecation. This is a one-way door priced before the first consumer ships.

# 7. Authentication, Authorization, Audit

### 7.1 Authentication by Caller

| **Caller** | **Mechanism** | **Notes** |
| --- | --- | --- |
| PG S2S callback | secureHash (HMAC) verification against per-merchant secret; source-IP allowlist as defence-in-depth | Hash algorithm + secret provisioning pending from PG team (FSD Open Question); architecture assumes HMAC-SHA256-class with secrets in the vault |
| POS / PSP / aggregator (direct API) | OAuth2 client-credentials issuing short-lived tokens scoped to merchant_id(s); mTLS optional for high-volume partners | API keys rejected as sole mechanism: no expiry, no scoping, painful rotation at millions of merchants |
| Merchant dashboard users | OIDC (SSO with Jio identity where available) + MFA for Merchant Admin role | Session in Redis; short-lived JWT to BFF |
| Customer portal | Phone + OTP (FSD 5.11); rate-limited, fail-closed | No account creation; OTP proves control of the number |
| Provider status callbacks (BSP / SMS / Email delivery reports) | Per-provider signature verification where offered; otherwise dedicated callback URLs with embedded per-provider tokens + source-IP allowlist | Unauthenticated status callbacks would let an attacker mark bills Delivered/Failed at will — closed in v1.1 self-review |
| Internal service-to-service | mTLS via service mesh + workload identity (SPIFFE-class) | No shared static secrets between services |
| JioPay Ops / Platform Admin | Corporate SSO + MFA; break-glass PII access requires ticket-tagged elevation | Every elevated read is audit-logged (7.3) |

### 7.2 Authorization

- Tenancy is enforced in code and data: every token carries merchant scope; every query path requires merchant_id from the token, not the request body. Cross-merchant access is structurally impossible for merchant-scoped principals (BR-15).

- RBAC mirrors FSD §2 roles exactly: Merchant Admin (config write), Store Staff (generate only), Ops (read-across + resend, no content edit), Platform Admin (library/config, no bulk PII). Roles are claims in the token; services enforce, gateway pre-filters.

- Customer portal authorization: OTP-verified number → bills linked to that number only, resolved in the PII Vault; scrubbed bills excluded by construction (the link row is gone).

### 7.3 Audit Logs

- Append-only audit stream (separate Kafka topic → immutable object-store archive with object lock): config changes, template edits, resends, role grants, Ops cross-merchant reads, PII exports, scrub-job executions, secret rotations.

- Each entry: actor, role, merchant scope, action, resource, before/after hash (not PII payloads), timestamp, request id. Retained 7 years (assumption — confirm statutory requirement with Legal).

- Audit write failures fail the privileged action (fail-closed) for Ops/Admin operations; merchant self-service actions log asynchronously with alerting on gaps.

# 8. API Gateway & Edge

| **Concern** | **Design** |
| --- | --- |
| Placement | Managed gateway + WAF at edge, multi-AZ; separate listener domains for machine traffic (callbacks/API) and human traffic (dashboard/portal/bill microsite) so rate policies and WAF rules differ |
| Rate limiting | Per-merchant token bucket on direct API (protects platform from one integrator's bug); global burst ceiling; portal OTP endpoints aggressively limited per-number and per-IP |
| Validation | Schema validation at gateway for cheap rejects; deep validation (calculation, tax fields) stays in services where bill_type context lives |
| Routing | Path-based to services; PG callback route pinned to Ingestion with no gateway-level transformation (hash is computed over the raw payload) |
| Resilience | Gateway returns 202 for accepted bills; 429 with Retry-After under load-shed; never buffers unbounded request bodies |
| Versioning | /v1 in path; deprecation policy published with the first external consumer (one-way door, ADR-6) |

# 9. Security Architecture

| **Layer** | **Controls** |
| --- | --- |
| Network | Private subnets for all services and stores; only gateway/CDN public; egress via NAT with allowlisted provider endpoints (BSP/SMS/Email); no direct DB exposure |
| Transport | TLS 1.2+ external; mTLS internal (mesh); HSTS on human-facing domains |
| Data at rest | Encryption on every store; PII Vault under a dedicated KMS key — key destruction is the DR-grade crypto-shred for DPDP worst cases |
| Secrets | Central secrets manager (Vault-class / cloud KMS+SM): per-merchant PG HMAC secrets, provider API keys, DB creds. No secrets in env files or images; short-TTL dynamic DB credentials; rotation runbooks with zero-downtime dual-secret windows |
| Application | Input validation per bill_type; template engine sandboxed (merchant templates are data, not code — logic-less Handlebars subset, no arbitrary expressions); SSRF-safe asset fetching (logo URLs proxied and validated); output encoding on the bill microsite (merchant content is untrusted) |
| PII handling | PII never in logs (structured logging with denylist redaction verified by tests). PII never rides Kafka: Ingestion encrypts the contact onto the bill FACTS item (contact_enc, AES-GCM under the PII KMS key) in the single hot-path write; the PII Vault is populated asynchronously by CRM from bill.requested; the ACK path has no Vault dependency (Review F-1). Dispatch and CRM point-read the bill record and decrypt at point of use under per-workload grants. Analytics events carry customer surrogate ids only |
| URL security | Bill URLs are 128-bit random hashes (BR-7); no enumeration; OTP portal is the only cross-bill lookup |
| Abuse | Coupon/survey endpoints rate-limited per bill; one-survey-per-customer enforced server-side (FSD 5.10) |

### 9.1 Threat Model (one page, per methodology 4.1)

| **What is worth stealing / breaking** | **Who wants it** | **Surface** | **Blast-radius bound** |
| --- | --- | --- | --- |
| Customer PII at scale (phones, emails, purchase links) | Data brokers, spammers, insiders | PII Vault, CRM APIs, BFF portal, backups | Vault isolation + dedicated KMS key + 90-day scrub caps the corpus; break-glass audited; crypto-shred as last resort |
| Ability to send messages as a merchant (phishing at WhatsApp trust levels) | Phishers | Dispatch service, template builder (content injection), compromised merchant creds | Templates are logic-less data; dispatch only sends artifacts rendered by us; MFA on Merchant Admin; per-merchant send-rate anomaly alerts |
| Premium-metering integrity (inflate/deflate merchant charges) | Fraudulent merchants, attackers | Metering ledger writes, provider status callbacks | Append-only ledger + reconciliation vs BSP invoices (§14.3); provider callbacks authenticated |
| Bill content tampering (fake invoices) | Fraud actors | Bill Store, S3 artifacts, render pipeline | Records append-only; artifacts versioned + integrity-checksummed; URLs unguessable |
| Cross-tenant access (merchant A reads merchant B) | Competitors, scrapers | Every API; the IDOR classic | merchant_id from token, never request body; enforced at data layer; portal scoped by OTP-verified number |
| Platform availability (extortion / disruption) | DDoS actors | Gateway, OTP endpoints, callback URL | WAF + per-merchant rate limits + CDN-served bills survive origin loss; callback flood absorbed by idempotency |

# 10. Data Flow Diagrams

### 10.1 Payment Receipt (PG callback path)

PG -POST(payload+secureHash)-> Gateway -> Ingestion

                                            | 1. verify HMAC (secret from vault cache)

                                            | 2. responseCode==0000? else park

                                            | 3. encrypt contact -> contact_enc; conditional put -> Bill Store (no Vault write on the ACK path)

                                            | 4. (Event Relay emits bill.requested {type: RECEIPT, contact_present} from the FACTS create)

                                            v

                                        202 ACK (<200ms)

Kafka -> Orchestration: config lookup (Redis) -> render receipt -> S3 (HTML/PDF)

        -> append STATUS=GENERATED -> (Relay emits bill.generated)

Kafka -> Dispatch: point-read FACTS -> decrypt contact_enc -> WhatsApp -> (fail) -> SMS -> status

Kafka -> CRM: point-read FACTS -> decrypt -> consent-gated upsert (PII Vault)   Kafka -> Analytics: log

### 10.2 Tax Invoice (direct API path)

POS -POST(items,taxes,HSN,totals,contact,template_id?)-> Gateway(OAuth2) -> Ingestion

    | line items present? else 4xx (BR-22)   | idempotency put | emit bill.requested {INVOICE}

Orchestration: recompute totals (5.2) -> GST validation (5.3) -> label/layout resolve

    -> render on template (override or default) -> S3 -> bill.generated -> Dispatch -> …

### 10.3 Bill View & Engagement

Customer taps link -> CDN (hit: serve HTML) -miss-> S3 origin

Widget interactions -> BFF -> engagement.events -> Analytics warehouse -> dashboard aggregates

Survey submit: server-side once-per-customer check -> feedback store -> merchant webhook (optional)

### 10.4 PII Scrub (90 days, BR-11)

Scheduler -daily-> compliance.scrub_due(bills @ T-90d)

  +-> PII Vault: delete contact<->bill links + orphaned contacts (consent-aware)

  +-> Bill Store: null PII columns on bill record (facts + amounts retained per statute)

  +-> Hosting anonymiser: re-render hosted HTML/PDF without contact block (resolves

       permanent-URL vs scrub conflict — pending the FSD open question’s final ruling)

All three emit scrub.completed; reconciliation job alerts on any bill past T-90+1d unscrubbed

# 11. Sequence Diagrams

### 11.1 Happy Path: Callback to Delivered

PG        Gateway   Ingestion   Kafka   Orchestr.   S3    Dispatch   BSP

 |-POST--->|-------->|

 |         |          |-verify+put-->(BillStore cond. write)

 |<-202----|<--------|

 |         |          |--publish-->|

 |         |          |            |-consume->|

 |         |          |            |           |-render->|

 |         |          |            |<-bill.generated-|

 |         |          |            |--------------------->|-send->|

 |         |          |            |                     |<-dlvd-|

 |         |          |            |<-bill.delivery------|        |

### 11.2 Failure Path: WhatsApp Fails → SMS Failover (FSD BR-9)

Dispatch -send-> WhatsApp BSP --> (timeout / failure callback)

Dispatch: attempt++ -> retry queue (backoff) -> exhausted for channel

Dispatch -send(short link)-> SMS gateway -> delivered callback

Dispatch STATUS append -> bill.delivery {state: DELIVERED, channel: SMS, failover: true} -> merchant dashboard note

If SMS also exhausts -> bill.delivery {state: DELIVERY_FAILED} -> status Failed + Ops alert; URL remains live

### 11.3 Duplicate Callback (idempotency)

PG -POST(same merchantTxnNo+paymentID)-> Ingestion

Ingestion -conditional put-> Bill Store -> CONDITION FAILED (key exists)

Ingestion -read existing bill-> 202 with existing bill id; NO event emitted -> no resend, no re-meter

# 12. Module Dependency Graph

                    +------------+

                    |  Gateway   |

                    +-+----+---+-+

          +----------+    |    +----------+

          v               v               v

    +---------+   +----------+   +-----------+

    |Ingestion|   |Experience|   |Merchant    |

    +---+-----+   |   BFF    |   |Config/Tmpl |<--+

        | K       +-+----+---+   +-----+-----+   |

        v           |    |             |(cache)   |

    +-----------+  |    |             v          |

    |Orchestr.+ |<-|----|---------- Redis        |

    | Render    |  |    |                          |

    +-+------+--+  |    +--> PII Vault <--- CRM -+K

      | K    +---> S3/CDN <---+(reads)

      v

  +--------+ K  +---------+    +-----------+

  |Dispatch|--->|Analytics|<-K-|Compliance |

  +--------+    +---------+    |   Jobs    |

   (K = Kafka edge; solid = sync call)          +-----------+

- Rule: sync arrows only point at stores, caches, or the mesh — never service-to-service on the bill path. All service→service handoff on the generation path is via Kafka, so there is no synchronous call chain to cascade.

- Exception (accepted): BFF reads Config DB and PII Vault synchronously — human-facing read paths with their own latency budgets and circuit breakers.

# 13. Deployment & Infrastructure

| **Concern** | **Design** |
| --- | --- |
| Compute | Kubernetes (managed — EKS-class). All eight services as Deployments; render workers as a separate node pool (CPU-optimised) with KEDA-style autoscaling on Kafka consumer lag; ingestion autoscales on RPS |
| Topology | One region (India — data-residency default for a payments adjacency; confirm with Legal), 3 AZs, every tier AZ-redundant. Second region as DR (§15), promotable |
| Stateful services | Managed wherever offered: managed Kafka, managed Postgres (multi-AZ), managed Redis, DynamoDB-class store, S3, CDN. Self-hosting a database is an innovation token this design does not spend |
| Environments | dev → staging (prod-shaped, synthetic PG callbacks) → prod. Staging runs the full event backbone; load tests run against staging at 2× target tier before each tier promotion |
| Isolation | Separate accounts/projects per environment; prod PII Vault reachable only from prod CRM/BFF/Compliance workloads via network policy |
| Config & rollout | Progressive delivery: canary 5% → 25% → 100% keyed on error rate + p95 latency; feature flags for bill_type-affecting logic so behaviour changes ship dark (FSD is frozen — flags gate rollout, not behaviour changes) |

# 14. Observability & Monitoring

### 14.1 Golden Signals & SLOs

| **SLO** | **Target** | **Alert (page)** |
| --- | --- | --- |
| Callback ACK latency | p95 < 200 ms | p95 > 200 ms for 5 min |
| Bill generated end-to-end | p95 < 2 s (FSD) | p95 > 2 s for 5 min, or bill.requested→generated lag > 30 s |
| Bill page load (CDN) | p95 < 1 s | CDN 5xx > 0.1% or origin error spike |
| Delivery success (post-failover) | > 99% within 5 min | Failure rate > 1% over 15 min, per channel |
| Generation availability | 99.9% monthly | Error budget burn > 2× for 1 h |
| Idempotency violations (duplicate bills) | Zero — invariant | Any occurrence pages immediately |
| Scrub timeliness | 100% by T-90+1d | Any bill unscrubbed past deadline |

### 14.2 Reconciliation as a Standing Process (T1)

Per methodology 6.3: reconciliation is what makes “money/state is never wrong” an operational property instead of an aspiration. Three scheduled jobs; drift on any of them pages, and every nonzero drift is a postmortem.

| **Job** | **Proves** | **Against** | **Cadence** |
| --- | --- | --- | --- |
| Metering vs providers | Our premium-delivery metering ledger sums match what the BSP/SMS providers will invoice | Provider delivery reports / settlement files | Daily |
| Bills vs PG | Every 0000 callback produced exactly one bill; no phantom bills without a PG record | PG transaction extract on merchantTxnNo+paymentID | Daily |
| Internal consistency | Credit-note sums ≤ bill values across all bills; event stream counts match Bill Store counts; scrub completed for all bills past T-90 | Bill Store + Kafka offsets + PII Vault | Daily (scrub check), weekly (full sweep) |

### 14.3 Instrumentation

- Tracing: OpenTelemetry end-to-end; trace id minted at gateway, propagated through Kafka headers, so one trace covers callback → render → dispatch → provider callback.

- Metrics: Prometheus-class; RED per service + Kafka lag per topic/consumer + provider-level delivery rates (detects a BSP brownout before merchants do).

- Logs: structured JSON, PII-redacted by denylist middleware with CI tests that fail on raw phone/email patterns in log fixtures.

- Business observability: per-merchant send/open/failure dashboards double as the merchant-facing analytics source — one pipeline, two views (Ops + merchant), no divergence.

- Synthetic probes: a canary merchant generates a bill end-to-end (callback → delivered to a test number) every minute in prod; its failure is the earliest whole-path alarm.

# 15. Disaster Recovery & Business Continuity

| **Scenario** | **Mechanism** | **RTO / RPO** |
| --- | --- | --- |
| AZ loss | Multi-AZ everything; Kafka RF=3 across AZs; zero manual action | RTO ≈ 0 / RPO 0 |
| Region loss | Warm standby region: continuous async replication (Bill Store global tables-class; Postgres streaming replica; S3 cross-region replication); DNS failover | RTO ≤ 1 h / RPO ≤ 5 min (async — accepted trade-off, ADR-8) |
| Kafka outage | Ingestion falls back to durable local buffer (write-ahead to Bill Store outbox table) and replays on recovery — ACK path survives; downstream lags but nothing is lost | No data loss; processing delayed |
| Provider (BSP/SMS/Email) outage | Circuit breaker per provider; FSD failover chain; if all channels down, bills accumulate in retry queue (no expiry — FSD BR-10) and URLs remain live via CDN | Delivery delayed; zero loss |
| Bad deploy | Canary + instant rollback; event replay from Kafka reprocesses any bills mis-rendered during the window (immutability means re-render creates a corrected artifact version, original facts untouched) | Minutes |
| Data corruption / operator error | Point-in-time recovery on Postgres (35 days); Bill Store on-demand backups + append-only design limits blast radius; S3 versioning on hosted artifacts | RPO ≤ 5 min for config; bills append-only |
| PII Vault compromise (worst case) | Dedicated KMS key destruction = crypto-shred; bill facts survive, PII rendered unrecoverable | Deliberate last resort |

- DR is drilled, not assumed: quarterly game-day promotes the standby region against synthetic traffic; the runbook is invalid if it has not been executed in the last quarter.

# 16. Scalability Strategy (Tiered)

The architecture's ceiling is ~50k TPS by design; the deployment grows in tiers by configuration, not re-architecture. This resolves the tension between the stated tens-of-thousands-TPS requirement and market-reality volumes (§1) without spending the money twice.

| **Tier** | **Sustained / Peak TPS** | **What changes vs previous tier** | **What never changes** |
| --- | --- | --- | --- |
| T1 — Launch | 100 / 500 | Baseline: 3-AZ, small fleets, 6 Kafka partitions per topic | Data model, event contracts, partition keys, idempotency design |
| T2 — Growth | 1,000 / 3,000 | Scale replicas + Kafka partitions (pre-provisioned key-space allows this without repartition pain); add Postgres read replicas | Same |
| T3 — Reliance-scale | 5,000 / 15,000 | Dedicated render node pools; CDN pre-warming for festive events; Bill Store throughput raised (on-demand → provisioned) | Same |
| T4 — Ceiling | 20,000 / 50,000 | Regional cell sharding: merchants assigned to cells (full stack replicas) by hash; a cell failure strands only its merchants (blast-radius cap) | Same — cells are copies, not redesigns |

- Scaling triggers are measured, not scheduled: tier promotion when sustained load exceeds 50% of current tier for 2 weeks, or a named onboarding (e.g., a Reliance format) is dated.

- Hot-merchant protection: per-merchant partition sub-keying (§4.2) plus per-merchant rate limits mean one merchant's Friday rush cannot starve others — verified in load tests, not assumed.

# 17. Failure Modes & Responses

| **Failure** | **Blast Radius** | **Detection** | **Response** |
| --- | --- | --- | --- |
| PG sends malformed / bad-hash callback | None (rejected) | Hash-failure metric | Reject, alert if rate spikes (possible secret drift or attack) |
| PG callback flood (retry storm) | Ingestion load | RPS anomaly | Idempotency absorbs duplicates; rate-limit per source as backstop |
| Redis cluster down | Slower renders; portal login unavailable | Health checks | Config reads fall to replicas (correct, slower); OTP fails closed; page SRE |
| Config DB primary fails | Config writes pause; renders unaffected (cache/replicas) | Managed failover event | Auto-failover < 60 s; template saves retried client-side |
| Bill Store throttling | Generation latency rises | Throttle metrics + Kafka lag | Backpressure via queue (no loss); auto-raise throughput; ACK path unaffected until buffer limits |
| Kafka partition unavailable | Affected merchants' bills delayed | Lag + ISR alerts | RF=3 self-heals; outbox fallback if cluster-wide (§15) |
| Render worker OOM / template bomb | One worker; one merchant's template | Render-time/size limits | Per-render CPU+memory+time caps; offending template auto-disabled to default, merchant notified (FSD fallback behaviour) |
| WhatsApp BSP brownout | Premium deliveries | Provider success-rate metric | Circuit breaker → automatic SMS failover (BR-9); cost delta surfaced to Ops |
| S3/CDN regional issue | Bill views | Synthetic probe | CDN serves stale-if-error; cross-region replica promotes for origin |
| Scrub job silently failing | DPDP breach risk | Reconciliation alert (§14 SLO) | Paged; job idempotent — rerun safely; audit entry on every run |
| Duplicate bill.generated consumed twice | Double send / double meter risk | Consumer idempotency-hit metric | Conditional metering append + send-dedup key make it a no-op (§6.2) |

# 18. Technology Choices & Trade-offs

Every choice states its runner-up and why it lost. Managed-cloud primitives are named by class (“DynamoDB-class”) — final vendor selection follows JioPay's cloud standard, which this document does not know (Open Item).

| **Decision** | **Choice** | **Runner-up** | **Why the runner-up lost** |
| --- | --- | --- | --- |
| Bill store | Wide-column KV (DynamoDB-class / Cassandra) | Partitioned PostgreSQL | Postgres reaches ~50k TPS writes only with heavy manual sharding — exactly the ops burden a managed KV eliminates; we lose ad-hoc SQL on bills (accepted: analytics store covers queries) |
| Config store | PostgreSQL | Same KV as bills | Config needs relational constraints (one default template, FK to library) and transactional multi-row saves; volume is tiny — KV buys nothing |
| Event backbone | Kafka (managed) | SQS/SNS only | SQS lacks replay and ordered per-merchant consumption; fan-out via SNS loses ordering. Cost: Kafka is operationally heavier — mitigated by managed service |
| Dispatch retries | SQS-class queue | Kafka delay topics | Native per-message backoff and DLQ semantics; delay-topic patterns on Kafka are hand-rolled complexity |
| Rendering | Server-side HTML via logic-less templates, eager; PDF via headless-Chromium pool, lazy (first download, then cached) | Client-side rendering from JSON; eager PDF per bill | Bill URL must work on any device/webview with zero JS dependency (India low-end mobile reality). Eager PDF lost in self-review: it dominates CPU at scale while most PDFs are never downloaded, and FSD 5.12 specifies on-the-fly |
| Compute | Kubernetes (managed) | Serverless functions per service | Render workloads need warm pools and Kafka consumers (poor fit for FaaS cold starts + consumer models); K8s also matches JioPay platform norms (assumption — verify) |
| Cache | Redis (managed) | Memcached | Need TTL + data structures (rate counters, OTP state); Redis is the boring default |
| Warehouse | Partitioned PostgreSQL aggregates at T1; ClickHouse-class columnar at a measured T2 trigger (Review F-8) | Columnar warehouse from day one | An innovation-token spend before event volumes demand it; topics are the interface so the swap changes consumers only. At T2 volumes, aggregates over billions of events move to columnar to protect the transactional store |
| Service mesh | Lightweight mesh for mTLS + identity only | Full-feature mesh (traffic mgmt everywhere) | Full mesh is an innovation token without a named requirement; we take only workload identity + mTLS |

### 18.1 Lock-in Exposure & Escape Hatches

| **Component** | **Lock-in Risk** | **Mitigation** |
| --- | --- | --- |
| Bill Store (DynamoDB-class) | High — conditional-put semantics and global tables are vendor-specific | Repository layer isolates the store behind put-if-absent / get / query-by-partition operations; Cassandra/ScyllaDB named as the portable fallback and exercised in a quarterly compatibility test against the repository contract |
| Kafka | Low — open protocol; managed vendors interchangeable | Standard clients only; no vendor-proprietary extensions |
| S3 + CDN | Low — commodity object storage/CDN semantics | No vendor-specific features beyond signed URLs |
| Postgres / Redis | Low — open engines under managed wrappers | Vanilla SQL / Redis commands; no proprietary modules |
| Kubernetes + mesh | Medium — manifests portable, managed-cluster glue is not | Plain manifests + Helm; mesh used only for mTLS/identity so it is swappable |

# 19. CI/CD

| **Stage** | **Gates** |
| --- | --- |
| Build | Unit tests; contract tests against event schemas (registry-verified); PII-in-logs test suite; SAST + dependency scan; image signed |
| Pre-merge | Ephemeral env spins per PR for the touched service; consumer-driven contract tests (a Dispatch change must not break on Orchestration's events) |
| Staging | Full integration suite incl. FSD acceptance criteria automated (AC-1…AC-24 as test cases — the FSD is the test oracle); money-path test floor on metering and credit notes (happy / retry / partial failure / concurrent / reconciles — methodology 3.2); nightly load test at current tier; chaos jobs (kill a render pod, drop a Kafka broker) weekly |
| Production | Progressive canary (§13) gated on SLO metrics; auto-rollback on error-budget burn; DB migrations expand–contract only (no destructive change in the same release as the code that stops using a column) |
| Release policy | Behaviour changes require an FSD revision first — the pipeline links each release to the FSD version it implements; “FSD frozen” is enforceable, not aspirational |
| Operability gate | A service cannot take production traffic until its runbooks and rollback are written and its alerts link them (methodology Card 8: operable at 3am before traffic, not after) |
| Flag & debt hygiene | Feature flags carry an owner and expiry; monthly cleanup sweep. Deliberate shortcuts enter a debt register with interest (what it slows) and a repayment trigger; register triaged monthly (methodology 7.1, 5.3) |

# 20. Architecture Decision Records

### ADR-1 — Async event-driven core; sync path ends at the 202 ACK

|  |  |
| --- | --- |
| Context | PG callback needs fast ACK; render/dispatch are slow and depend on third parties; FSD requires no-expiry offline processing. |
| Decision | Ingestion persists + ACKs; all downstream via Kafka. |
| Why | Decouples caller latency from processing cost; gives replay and backpressure for free. |
| Trade-off | Eventual consistency between ACK and visible bill (~1–2 s); status endpoint covers the gap. |
| Revisit when | A consumer needs synchronous bill artifacts in the ACK response. |

### ADR-2 — Idempotency enforced by conditional write in the Bill Store, not in cache

|  |  |
| --- | --- |
| Context | Duplicate bills are an FSD invariant violation (BR-1); caches fail. |
| Decision | Conditional put on the idempotency key is the source of truth; Redis is a fast-path only. |
| Why | Correctness survives any cache outage; T1 rule. |
| Trade-off | Every generation pays one conditional write; negligible at KV latencies. |
| Revisit when | Never — this is load-bearing. |

### ADR-3 — Wide-column KV for bills; PostgreSQL for config; separate PII Vault

|  |  |
| --- | --- |
| Context | 50k TPS write ceiling; relational invariants on config; DPDP 90-day scrub (BR-11). |
| Decision | Three stores by access pattern; PII physically isolated under its own KMS key. |
| Why | Each store does the one thing it is best at; scrub becomes a targeted delete + crypto-shred option. |
| Trade-off | Three operational surfaces instead of one; no cross-store transactions (mitigated: no flow needs one — verified against FSD workflows). |
| Revisit when | A flow emerges needing atomic writes across bill facts and PII. |

### ADR-4 — Kafka as the single innovation token

|  |  |
| --- | --- |
| Context | Fan-out to ≥4 consumers, per-merchant ordering, replay — named requirements SQS/SNS fail. |
| Decision | Managed Kafka; everything else boring managed primitives. |
| Why | Complexity budget spent once, where the numbers demand it. |
| Trade-off | Schema-registry discipline and consumer idempotency become mandatory engineering practice. |
| Revisit when | If real volumes stay < 100 TPS after Year 1, a simpler bus reconsideration is legitimate. |

### ADR-5 — Bills rendered server-side to static HTML on CDN

|  |  |
| --- | --- |
| Context | 99% of bills opened on mobile (source docs); low-end devices; bill must outlive backend outages. |
| Decision | Static artifact per bill in S3, CDN-served, zero runtime dependency for viewing. |
| Why | p95 < 1 s on Indian mobile networks; viewing availability decoupled from platform availability. |
| Trade-off | HTML render CPU paid up-front per bill; PDF deferred to first download (v1.1 revision — most bills never need one, and FSD 5.12 specifies on-the-fly). Re-render for post-hoc changes (credit-note link, PII scrub) handled as artifact versioning. |
| Revisit when | Widget interactivity needs exceed what static HTML + light JS can do. |

### ADR-6 — API and event contracts versioned before first external consumer

|  |  |
| --- | --- |
| Context | Direct API and event schemas are one-way doors (FSD white-label ambitions make external consumers likely). |
| Decision | /v1 path versioning; additive-only event evolution; published deprecation policy (12-month window). |
| Why | Pricing the door before opening it; retrofitting versioning onto live consumers is far costlier. |
| Trade-off | Ceremony on day one. |
| Revisit when | N/A — policy, not mechanism. |

### ADR-7 — OAuth2 client-credentials for direct API (not static API keys)

|  |  |
| --- | --- |
| Context | Millions of merchants; BR-15 tenancy; key rotation at scale. |
| Decision | Short-lived scoped tokens; mTLS optional for top-volume partners. |
| Why | Scoping and expiry are structural, not procedural. |
| Trade-off | Integrators face a token step; mitigated with SDK snippets and long-lived refresh credentials in their vault. |
| Revisit when | A major partner class cannot implement OAuth2 (then mTLS-only lane). |

### ADR-8 — Warm-standby cross-region DR with async replication

|  |  |
| --- | --- |
| Context | Region loss is rare; synchronous cross-region replication would tax every write's latency. |
| Decision | Async replication, RPO ≤ 5 min, RTO ≤ 1 h, quarterly drills. |
| Why | Bills are re-derivable from PG/POS sources in the worst window; latency budget protected. |
| Trade-off | Up to 5 min of bills may need regeneration after failover (idempotency makes replay safe). |
| Revisit when | Regulatory requirement mandates lower RPO. |

# 21. Architecture Self-Review (v1.0 → v1.1)

Findings from a full-document review against the Software Engineering Methodology v1.0 and six lenses. Every finding below is already fixed in this version; the table records what was wrong so the reasoning survives (methodology 1.6).

| **Lens** | **Finding in v1.0** | **Severity** | **Fix in v1.1** |
| --- | --- | --- | --- |
| Consistency | §9 forbade PII in Kafka while §10.1 had Dispatch reading contact from the event payload — mutually exclusive | Blocking | contact_ref pattern: PII written to Vault at intake; events carry an opaque ref; Dispatch/CRM resolve at point of use (§9, §10.1) |
| Scalability | Eager PDF-per-bill via Chromium was the CPU dominator at scale; most PDFs are never downloaded — and the FSD (5.12) specifies on-the-fly generation anyway | High | PDF rendered lazily on first download, cached in S3 thereafter (§18 render row, ADR-5) |
| Operational risk | No standing reconciliation — the methodology's single most important T1 alarm — despite a live money path (premium metering → merchant charges) | High | §14.2: three daily/weekly reconciliation jobs (metering vs providers, bills vs PG, internal sums); drift pages and triggers postmortem |
| Security | Provider delivery-status callbacks were unauthenticated — an attacker could mark bills Delivered/Failed at will | High | Per-provider signature/token + IP allowlist (§7.1) |
| Security | Threat model deferred to a checklist item rather than written | Medium | One-page threat model added (§9.1) |
| Operational risk | One Redis cluster served both cache and OTP/auth — a cache-load incident would take authentication down with it | Medium | Separate auth Redis cluster, isolated blast radius (§5) |
| Maintainability | Eight physical deployables on day one violates monolith-first under one team (methodology 1.4) | Medium | Logical 8 / physical 3 at Tier 1 with extraction seams; splits earned by measured divergence or team scale (§3) |
| Lock-in | DynamoDB-class conditional-put and global tables are vendor-specific with no priced exit | Medium | Repository-layer isolation + named portable fallback + quarterly compatibility test (§18.1) |
| Hidden assumptions | Riskiest technical assumption never named; 2 KB/bill and 70% open-rate silently drove capacity math | Medium | PG-callback-contract named as the riskiest assumption with a validation task (§1); figures tier-labeled |
| Operational risk | Kafka consumer rebalance storms during rolling deploys unaddressed; DLQ alerts lacked runbook links; no flag/debt hygiene | Low | Cooperative rebalancing + static membership (§6.2); runbook-linked alerts; operability gate + flag/debt register in CI/CD (§19) |

**v1.1 → v1.2 note: **this revision applies the Architecture Review findings (F-1..F-11) already implemented by TDS v1.0 and the Engineering Roadmap, correcting four stale sections found in cross-document validation: §9/§10.1 (v1.1's contact_ref-with-Vault-at-intake superseded by contact_enc-on-record with async Vault population — Review F-1), §6.1 (bill lifecycle topics produced by the Event Relay; single bill.delivery topic; engagement.events produced by the Beacon Collector — Reviews F-2/F-7), and §4/§18 (analytics Postgres-first at T1, columnar deferred to a measured T2 trigger — Review F-8). No other architectural content changed.

# 22. Architecture Review Checklist

Sign-off gate before build. Each row is checked against this document and the FSD; a “no” blocks the corresponding epic, not the whole programme.

| **#** | **Check** | **Owner** |
| --- | --- | --- |
| 1 | Peak-TPS target and latency SLA confirmed by Product + Eng leadership (§1 assumption closed) | Product + Eng |
| 2 | PG team has supplied secureHash algorithm, secret provisioning, and callback retry schedule (FSD Open Questions) | PG team |
| 3 | Cloud/vendor selection maps each “-class” primitive to a concrete service within JioPay's approved stack | Platform Eng |
| 4 | Data-residency and audit-retention requirements confirmed with Legal (region choice, 7-year audit assumption) | Legal + Security |
| 5 | Permanent-URL vs 90-day-scrub resolution ratified (this blueprint implements re-render-anonymised; FSD open question must close to match) | Product + Legal |
| 6 | Event schemas drafted and registered before any consumer code merges (ADR-6) | Eng |
| 7 | FSD acceptance criteria AC-1…AC-24 mapped to automated tests in staging pipeline | QA |
| 8 | Load test at 2× T1 passed, incl. hot-merchant scenario and duplicate-callback storm | SRE |
| 9 | PII-in-logs CI gate demonstrably fails a seeded violation | Security |
| 10 | DR runbook executed once end-to-end in staging before launch | SRE |
| 11 | Threat model reviewed (template injection, SSRF via logo URLs, OTP abuse, enumeration) | Security |
| 12 | Cost model per tier approved (esp. WhatsApp unit economics vs ₹0.50/bill pricing in strategy docs) | Finance + Product |
| 13 | Reconciliation jobs (§14.2) implemented and paging before first paying merchant | Eng + SRE |
| 14 | Provider callback authentication verified per contracted provider | Security |

## For the Record

- Decisions made: async event-driven core (ADR-1); idempotency as conditional write (ADR-2); three-store data architecture with isolated PII Vault (ADR-3); Kafka as the single innovation token (ADR-4); static CDN-served bills with lazy PDF (ADR-5, revised in self-review); contracts versioned day one (ADR-6); OAuth2 for direct API (ADR-7); warm-standby DR (ADR-8); tiered deployment T1–T4 with a 50k TPS design ceiling; logical-8/physical-3 packaging at launch; encrypted-contact-on-record (contact_enc) pattern keeping PII out of the event backbone (Review F-1, superseding v1.1's contact_ref); standing reconciliation as the T1 alarm.

- Options killed: microservice-per-FSD-module (no independent scaling profiles → 8 logical services, not 12+); eight physical deployables at launch (monolith-first → 3); eager PDF per bill (CPU at scale, unused output); partitioned Postgres for bills (sharding burden at ceiling); serverless compute (render + consumer fit); static API keys (rotation/scoping at millions of merchants); synchronous cross-region replication (latency tax); PII in event payloads (encrypted contact on the bill record instead — v1.1's contact_ref superseded by Review F-1).

- Facts established: market-comparable volume is ~13 TPS avg (BillMe) and ~44 TPS avg for all of Reliance Retail — the tens-of-thousands-TPS figure is a ceiling to design toward, not a day-one load to pay for.

- Open questions: checklist items 1–5 and 12 — peak-TPS ratification, PG hash spec, vendor mapping, data residency, permanent-URL/scrub ruling, WhatsApp unit economics.

Page  of