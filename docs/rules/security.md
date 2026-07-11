# Security rules — Digital Billing Platform

Cross-cutting security floor. Detail lives with its owners: tenancy and PII boundaries → architecture.md; implementation patterns → backend.md; roles and audit mechanics → rbac.md; portal surfaces → portals.md. If a rule here conflicts with those or with the FSD/Blueprint/TDS, the source wins — report the conflict, don't improvise.

## Sensitive data
- Never log raw PII, contact plaintext, secrets, passwords, OTPs, API keys, or full JWTs. Redact sensitive fields in logs and traces; redaction is deny-tested in CI.
- Customer contact data exists only in its two designated encrypted locations (`contact_enc` on the bill record; the PII Vault). Surrogate identifiers everywhere else — events, logs, analytics, caches, errors.
- Never cache decrypted PII. Plaintext exists in memory only at the point of use, in workloads holding an explicit decrypt grant.

## API & portal security
- Validate all incoming data strictly at the boundary; verify signatures over raw bytes before parsing (PG callback, provider callbacks).
- Apply authorization on every sensitive read and write. Merchant scope comes from the token/session only and is re-checked at the data layer.
- Public surfaces expose the minimum: uniform responses on enumeration-prone endpoints (portal OTP lookup), `url_hash` as a single-bill read capability, aggressive rate limits keyed per phone, IP, and bill.
- Never trust frontend role hints. Internal portal APIs still enforce full RBAC and scope checks server-side.

## Files & assets
- Merchant asset uploads (logos, template imagery): enforce content-type sniffing, size caps, and re-encoding that strips embedded payloads; store as a platform-owned asset. Never fetch external URLs at render time.
- Use signed, time-bound access for private artifacts (bill PDFs, exports). Core domain records store references and metadata, not blobs.
- Merchant templates are logic-less data. Output-encode every merchant-supplied string when rendering bills, previews, and portals.

## Auditability
- Audit, append-only: resends, break-glass cross-merchant reads, PII exports, merchant config changes, template and shared-library changes, role and permission grants, legal-hold changes, scrub executions, secret and provider-config rotations.
- Every audit entry carries actor, actor class, role used, scope, action, target, reason where mandated, UTC timestamp, and trace_id — surrogate references only, never PII payloads.
- Privileged actions fail closed if the audit write fails.

## Least privilege
- Least privilege for users, calling systems, service accounts, workloads, environments, and storage access.
- PII decrypt grants are per-workload and minimal — never widened to make a feature easier.
- Per-workload short-TTL credentials; no shared static secrets; secrets live only in the secrets manager, never in code, config files, or environment defaults committed to the repo.
