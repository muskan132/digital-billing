# Prisma rules — Digital Billing Platform

Permanent implementation rules for all Prisma-managed PostgreSQL stores. Behaviour → FSD; architecture → Blueprint; implementation detail → TDS. If a rule here conflicts with those, the source document wins — report the conflict, do not improvise.

## Scope

- Prisma manages exactly three stores, each with its own schema file, generated client, and credentials:
  - **Config DB** — merchants, branding, labels, templates, merchant_defaults, widget_config, delivery_prefs, users, roles. Owner: Config & Templates.
  - **PII Vault** — contacts, contact_bills. Owner: CRM; scrub deletes: Compliance only.
  - **Analytics** — aggregates, feedback, event archive index. Surrogate ids only.
- Never model the Bill Store, Metering Ledger, dedup markers, or OTP/session state in Prisma. No shadow copies of KV data in Postgres.
- Never write one schema spanning two databases. No cross-database relations or transactions.
- Import a store's client only inside its owning module (lint-enforced boundary).

## Schema design

- Model only entities anchored in the TDS data dictionary or an ADR.
- Put every expressible invariant in the schema: CHECKs, UNIQUE indexes, FKs, enums. API validation second; application logic never as the only enforcement.
- Write CHECK constraints in migration SQL; document each on the model with a `/// CHECK:` comment.
- Required constraints (never drop):
  - `merchant_defaults(merchant_id PK, FK templates)` — one default per merchant.
  - `UNIQUE(merchant_id, system_key)` on labels.
  - `UNIQUE(bill_id, surrogate_customer_id)` on feedback — duplicate insert → catch unique violation → return success-but-ignored.
  - `UNIQUE(merchant_id, phone_hash)` on contacts — the upsert key.
  - Format CHECKs: colour `^#[0-9A-F]{6}$`, GSTIN format.
- Enums: Prisma enums mapped to Postgres enums; values match TDS/event spellings exactly. Add values additively; remove/rename only via expand–contract.
- JSONB only where the TDS specifies (`layout_schema`, `widget_config.payload`); validate against the registered JSON schema before every write. Deep-path queries on hot paths require a GIN index + ADR.
- No new fixed slot columns per widget/document type — extend via enum values + JSONB payloads.
- Library templates: `merchant_id NULL`. Clones are deep copies; optional `cloned_from_id` is informational only, no cascade.
- Never store the same fact in two places (column + JSONB, status + flag). Temporary compatibility fields: document here, centralize writes, attach a removal trigger.

## Naming

- DB objects `snake_case`; Prisma models PascalCase with `@@map`, fields camelCase with `@map`. DB name is canonical.
- Suffixes: money `_paise`, timestamps `_at`, encrypted `_enc`, hashes `_hash`, FKs `<entity>_id`. Booleans affirmative.
- Name every index/constraint explicitly in migrations: `idx_<table>_<cols>`, `uq_<table>_<cols>`, `ck_<table>_<rule>`.
- Enum values UPPER_SNAKE.

## Relations

- Name relations explicitly when a model links to the same table twice.
- No implicit many-to-many. Join models carry their own PK, `merchant_id`, `created_at`.
- FKs only within one database. Cross-store references (`bill_id`, `merchant_id` pointing at KV data) are plain scoped columns — no FK, no lookup-table fakes; reconciliation proves integrity.
- No cascades on Vault tables — scrub deletes are explicit, ordered, audited. Config relations: `Restrict` unless an ADR defines the delete operation.
- `merchant_id` on every row of every multi-tenant table, even when derivable via join.

## Indexing

- Index only named access patterns: `phone_hash`, `contact_bills(contact_id)` and `(bill_id)`, aggregates `(merchant_id, day)`, composite PKs. No speculative indexes.
- Every production query must be covered by an index or PK — verify with `EXPLAIN` in review; uncovered hot-path queries block merge.
- Unique indexes are invariants; never drop for performance.
- Partial indexes: allowed with a comment stating the predicate's business meaning.
- Vault contacts partitioning (`hash(phone_hash)`) lives in raw migration SQL; the Prisma model maps to the parent table. Keep a partition-pruning test.

## Migrations

- `prisma migrate` with committed SQL only. No `db push` outside local scratch. CI runs `migrate diff` against a shadow DB; drift fails the build.
- Expand–contract only: add → backfill → switch → verify → drop in a later release. Never destroy/rename in the same release as the code change.
- Destructive steps: separate migration, named owner, linked verification query.
- Review every migration for locks: `CREATE INDEX CONCURRENTLY` (raw SQL); new CHECK/FK on large tables as `NOT VALID` + `VALIDATE`.
- Backfills: idempotent, batched, rate-capped, resumable.
- Vault migrations require blocking-level review; never run during a scrub window; never touch `*_enc` columns destructively without an ADR.
- Migrations never encode data corrections to bills or metering.

## Transactions

- `$transaction` within one database only. A flow needing cross-store atomicity is a design error — restructure via events or escalate.
- Invariant writes are transactional: default-template swap = validate + upsert in one transaction; on serialization conflict retry once, then 409.
- Upserts on natural keys (`merchant_id, phone_hash`; composite PKs). Every event consumer write must be idempotent — test: replay the same event twice, diff the database, expect no change.
- No network calls (KMS, Kafka, HTTP) inside a transaction. Encrypt/decrypt before; publish after commit. Post-commit direct publish only for non-invariant topics.
- Batch jobs: chunked, each chunk atomic and idempotent, progress resumable. Never one transaction per run.

## Optimistic locking & versioning

- Mutable entities that caches/renders depend on carry a monotonic integer `version`. Update with `version: { increment: 1 }` guarded by `WHERE version = expected` (`updateMany` + count check). Zero rows updated → 409, never silent overwrite.
- The version is the cache token: emit it in config.changed, embed it in the write-through blob, pin it on render. Never reset or reuse.
- Column semantics are one-way: changing a column's meaning = new column + expand–contract.
- Never use `updatedAt` for conflict detection.

## Soft delete

- Default: NO soft delete. History = append-only child records + versions. Adding `deleted_at` requires an ADR.
- PII is never soft-deleted. Scrub and consent-withdrawal are hard deletes. No delete-to-update middleware on the Vault client — ever.
- Lifecycle via state machines, not flags: deleting the current default template → 409 (checked inside the delete transaction).
- If an ADR approves soft delete: partial unique indexes exclude deleted rows, filtering is centralized in a client extension, hard-purge timing defined at creation.

## Auditing

- `created_at` + `@updatedAt` on every mutable table. Append-only tables: `created_at` only — no `updated_at` on immutable rows.
- Actor fields (`actor_id`, role/reason where relevant) on every mutable domain action.
- Privileged actions (cross-merchant reads, resends, config/role changes, scrubs, legal-hold edits) also write the audit stream and FAIL CLOSED if that write fails.
- Prefer append-only child tables for approvals, responses, state history over overwriting status columns. Do not build history tables speculatively.
- Audit rows: hashes and surrogate ids only — never PII payloads.

## Financial consistency

- Money = `BigInt` in paise, `_paise` suffix, `CHECK >= 0` where domain-true. No `Float`/`Double` in any money path (lint-enforced). `Decimal` for transient display math only.
- No mutable running totals. Money figures in Postgres are derived aggregates, rebuildable from source, verified by reconciliation — never a source of truth.
- Money-adjacent code passes the T1 floor: happy / retry / partial / concurrent / reconciles. No reconciliation query = not done.
- Store an ISO currency code beside every amount.

## Prisma usage

- Prisma calls live in repository/service layers; never in controllers/handlers.
- Every multi-tenant query carries `merchant_id` from validated auth scope — enforced via client extension; never from a request body.
- `$queryRaw` only for partition DDL, EXPLAIN-verified reports, or inexpressible operations — always parameterized, always inside the owning repository. Never `$queryRawUnsafe` with interpolation.
- `*_enc` columns are `Bytes`; crypto happens in the service layer. Prisma query logging arg-redacted or off wherever Vault traffic is visible; PII-in-logs CI test covers Prisma output.
- Schema, migration, and regenerated client ship in one PR.

## Query optimization & performance

- Use `select` projections on hot reads. No N+1 `include` fan-out — batch with `in` or a single query; check dev query logs.
- Keyset (cursor) pagination for user-scrollable lists; OFFSET only on small bounded admin lists.
- Bounded connection pools per deployable, configured via env; pool exhaustion has a metric + alert.
- Config hot reads go to cache/replicas, never the primary. The Vault is never cached — indexed queries only.
- Batch/Compliance reads: paginated, off-peak, rate-capped. Dashboard reads hit aggregate rows only — no event-grain scans.
- Slow-query logging on everywhere. New index or query-shape change ships with `EXPLAIN (ANALYZE, BUFFERS)` evidence.

## Ownership

- One writer per table:
  - Config & Templates → all Config DB tables.
  - CRM → Vault creates/upserts/consent.
  - Compliance → the only scrub deleter (links, orphan contacts), legal-hold, tiering.
  - Analytics → aggregates, feedback, archive index.
  - BFF → owns nothing durable.
- Cross-boundary reads go through the owner's API or the event stream — never another module's tables or client.
- Per-workload short-TTL DB credentials; no shared static users.
- A new table requires: an owner row here, a TDS/ADR anchor, constraints designed before columns, access patterns named before indexes. New stores are an architecture decision, not a Prisma one.

## Forbidden

- Prisma models for Bill Store, Metering Ledger, dedup markers, OTP state.
- Floats in money paths; mutable running totals; editing audit/history rows.
- Soft-delete middleware on the Vault; cached decrypted PII; PII in logs, errors, or seeds.
- Cross-database transactions/relations; reading another module's tables; `merchant_id` from request bodies.
- `db push` to shared environments; destructive migration in the same release as its code change; unnamed constraints or indexes.
- Invariants enforced only in application code when the schema can hold them; dropping unique constraints for speed.
- Speculative columns, tables, or indexes without a named access pattern and document anchor.
