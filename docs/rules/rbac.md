# RBAC rules — Digital Billing Platform

Permanent coding rules. Role behaviour resolves to the FSD role table; auth mechanics to the TDS; boundaries to architecture.md. If a rule here conflicts with those, the source document wins — report the conflict, don't improvise.

## Principals
- Three principal classes only: human user, calling system, internal workload. Every request is exactly one.
- Human dashboard auth: OIDC session + role claims. Customer portal: phone → OTP, rate-limited, fail-closed when auth Redis is down.
- Calling systems: PG callback authenticated by secureHash over raw bytes before parsing; direct API by OAuth2 scopes. Do not hardcode a broader calling-system auth model — it is an open FSD question.
- Internal service-to-service: mTLS + workload identity. No shared static secrets.
- Every internal request carries the gateway-validated `{principal, roles[], merchant_scope[]}`. Never re-derive identity in a service; always re-check scope.

## Scoping
- `merchant_id` is the tenancy root and comes from the token/session only, never the request body. A body merchant_id must match the token scope or the request is rejected.
- Store is an authorization scope, not a tenancy boundary: enforce it as a service-level filter on top of the merchant_id partition. Never introduce a second partition key for it.
- Store-scoped roles carry an explicit store list. Empty list = no access, never all-stores.
- Merchant-side roles never read across merchants. Cross-merchant reads are platform-side only, break-glass, reason-tagged, audited.

## Access check order
Every sensitive action evaluates, in order:
1. Authentication
2. Actor class (merchant-side / platform-side / calling system / workload)
3. Role eligibility
4. Merchant and store scope
5. State eligibility when workflow-sensitive (resend only from DELIVERED or DELIVERY_FAILED → 409 on illegal state, per FSD §6.5; credit note only under the transactional cap)

Guard owns 1–3; services own 4–5. No raw permission logic in controllers when the guard can own it; services must still enforce the ownership and state checks the guard cannot infer.

## Roles
Role names below are the FSD §2 role table names, verbatim. Adding a role — including read-only audit-style roles — requires an FSD role-table revision first; this file never introduces roles the FSD does not define.

Merchant-side (own org only):
- `Store Staff`: generate bills for assigned stores; capture contact at checkout. No config, no analytics, no customer list, no user management.
- `Merchant Admin`: full read/write on own org config (branding, labels, layout, widgets, delivery); manage templates; manage org users and store assignments; read bills/customers/analytics for own org; request resend of own-org bills. No bill generation — bills are created only by calling systems and the POS trigger path (FSD §2); no consent overrides.

Platform-side:
- `JioPay Ops / Support`: cross-merchant read (break-glass + audited); resend with actor + reason; delivery-health monitoring. No bill-content edits, no merchant config writes, no PII decrypt beyond the audited support path.
- `Platform Admin`: platform config, shared template library, channel providers, platform role assignments; review of audit stream and break-glass records. No customer PII beyond audit needs; no merchant-scoped grants implied — merchant reads still go through the support path.

End customers are principals of the portal surfaces only (OTP session or `url_hash` capability), never dashboard roles.

Calling systems: submit bills, submit credit notes, flush offline queue — for authorized merchants only. No reads, no config, no resend. `bill_type` follows invocation path and is never caller-overridable.

## Hard denials (no role exempts)
- No principal edits a generated bill, metering row, or ledger entry. Corrections are new records.
- PII scrub is a Compliance-workload permission, never a human role. Only Compliance nulls `contact_enc`.
- No role overrides a customer's consent state. Consent changes come from checkout capture or the authenticated consent API only.
- PII decrypt grants are per-workload and minimal; never widen a grant to make a feature easier. No role in this file implies a decrypt grant.
- Credit notes are submitted by calling systems through the credit-note API only — no dashboard role issues them directly.

## API rules
- Versioned paths, standard error envelope, no internals or PII in errors. 403 = scope violation; 409 = idempotency/state conflict returning the existing resource id.
- Customer bill pages: `url_hash` is the capability — unguessable, grants read on exactly one bill, no auth cookie.
- Provider callbacks authenticate per-provider signature/token inside the Dispatch adapter. No unauthenticated inbound callbacks.
- Role-matrix tests are generated from the role table. A role or permission change without a regenerated matrix test does not merge.
- New features add a row to the permission matrix and the FSD role table before enforcement code merges. Anything not explicitly granted is denied.

## Audit
- Privileged actions fail closed if the audit write fails: cross-merchant reads, scrubs, resends, config changes, role changes, legal-hold changes.
- Audit entries are append-only and carry actor, actor class, role used, scope, action, target, reason (mandatory for break-glass and resend), UTC timestamp, trace_id. Surrogate refs only — never PII.
- Break-glass access is per-incident, reason-tagged, auto-expiring, and reviewable by `Platform Admin`.
- Role and permission grants are audited at the same tier as data access.
