# Tech stack rules — Digital Billing Platform

Stack selection is recorded as **ADR-9 (pending ratification)**. Behaviour → FSD; architecture → Blueprint (which names platform primitives by class; final vendor mapping is Blueprint Checklist #3); implementation detail → TDS. This file never overrides those documents — if a rule here seems to conflict, the source document wins and the conflict is a bug to report, not to improvise around.

## Language & repository
- TypeScript everywhere, strict mode, single monorepo (`services/`, `libs/`, `apps/`) mirroring the logical-8 / physical-3 packaging.
- Shared code lives in `libs/` and is limited to domain-free, cross-cutting concerns (see architecture.md); no domain logic in shared libraries.

## Backend
- NestJS services. One NestJS domain module per logical service boundary (Ingestion, Orchestration & Rendering, Dispatch, Config & Templates, CRM, Analytics, BFF, Compliance).
- Keep feature/domain modules small and explicit; controllers thin, orchestration in services and reusable domain helpers (backend.md owns the detail).
- Seed data (roles, block-type enums, the default template library, channel-provider config, widget payload schemas) ships as idempotent bootstrap/seed code — never ad hoc manual setup.

## Frontend
- Next.js App Router with TypeScript for the four portals (Merchant, Admin, Support, Customer bill portal). Dynamic route segments use App Router conventions (`[id]`).
- Portals are separate frontends per portals.md, backed by shared domain APIs through the Experience BFF only.
- The bill **microsite is not a Next.js app**: it is a rendered static artifact owned by Orchestration & Rendering, served from object storage via CDN.

## Data
- The three Postgres stores (Config DB, PII Vault, Analytics) are managed via Prisma per prisma.md — Prisma is the only ORM, and only for those stores.
- The Bill Store and Metering Ledger are wide-column KV behind a repository interface — never Prisma, never Postgres, no shadow copies.
- Schema evolution is explicit through committed migrations, expand–contract only.

## Auth
- Mechanisms follow the TDS exactly: PG callback = HMAC over raw bytes; direct API = OAuth2 client-credentials scoped to merchant(s); dashboards = OIDC + MFA; customer portal = phone + OTP; internal service-to-service = mTLS + workload identity.
- Short-lived JWTs appear only as BFF session tokens — JWT is never the calling-system authentication mechanism.
- Authorization is role- and scope-aware per rbac.md; external and internal user behaviour stays explicit in the API layer.

## Integrations
- Every external provider (WhatsApp BSP, SMS, Email, PG) sits behind an adapter implementing a common port and remains swappable at that boundary.
- Vendor-specific payloads never leak past the adapter into controllers, domain logic, or client contracts.

## Observability
- OTel tracing, RED metrics, and structured PII-redacted JSON logging are mandatory platform facilities per the Blueprint — assume them, use them, and emit them as part of Done.

## Non-rules
- Do not introduce a workflow engine, an additional ORM, or an additional store without an ADR naming the requirement and the runner-up.
- Do not document infrastructure as implemented before its roadmap task ships. The Blueprint-named platform (Kafka, KV Bill Store, Redis, S3/CDN, Kubernetes, OTel) is the plan of record — build toward it; never invent beyond it.
