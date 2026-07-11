# Portal rules — Digital Billing Platform

Behaviour → FSD. Architecture → Blueprint. Implementation detail → TDS. If a rule here conflicts with those, the source document wins; report the conflict, never improvise around it.

## Portal inventory (fixed)

| Portal | Users | Auth |
| --- | --- | --- |
| Merchant Portal | Merchant Admin, Store Staff | OIDC + MFA (Admin role); Redis session → short-lived JWT to BFF |
| Admin Portal | Platform Admin | Corporate SSO + MFA |
| Support Portal | JioPay Ops / Support | Corporate SSO + MFA; break-glass PII via ticket-tagged elevation |
| Bill microsite | End Customer | Unguessable 128-bit URL hash; no login |
| Customer bill portal | End Customer | Phone + OTP; rate-limited per-number and per-IP; fail-closed |

- Each portal is a separate frontend with its own auth model, session domain, and permission ceiling. Never share sessions, tokens, or cookies across portals.
- Every portal read/write goes through the Experience BFF. No portal code calls a store, queue, or internal service directly.
- Do not add a portal, a role, or an auth model without an FSD revision and an ADR.

## Universal rules (all portals)

- The BFF owns nothing durable. Every action resolves to the owning service's API per the ownership map in architecture.md.
- Portals own presentation, in-progress drafts, and client-side validation only. Never enforce an invariant client-side or in the BFF; the owning service's write is the enforcement point. Client validation mirrors server rules — it never replaces them.
- Tenancy/identity scope comes from the validated session or OTP verification, never from a request body, query param, or client state. Re-check scope at the data layer.
- Role gates mirror the FSD §2 role table exactly. Enforce in services; pre-filter at the gateway; never encode role logic in shared UI components.
- Sync fan-out from the BFF is limited to the sanctioned exceptions (Config, CRM, Analytics APIs, Bill Store point reads/GSI, resend delegation to Dispatch). New sync exception = ADR first.
- Per-panel bulkheads: every BFF fan-out call has its own timeout and circuit breaker; one dependency down degrades its panel, never the portal.
- No portal feature may introduce a new decrypt grant, a cache-as-truth, or a second write path. If a screen seems to require one, the screen design is wrong — restructure or escalate.
- Money renders from integer minor units (`_paise`); no float touches a UI money path. Timestamps render from UTC ISO-8601.
- All merchant- or customer-supplied content is untrusted: output-encode on render, re-encode uploads, treat templates as logic-less data.
- Internal portals (Admin, Support) run on a separate listener domain from merchant and customer traffic; WAF and rate policies differ per domain.
- Standard error envelope everywhere: stable error_code, trace_id, no internals, no PII.

## Merchant Portal

- Scope: own-merchant config (templates, branding, labels, delivery prefs), own bills list, own analytics, own customer list, store-user management. No API path to another merchant's data may exist.
- Store Staff role is generate-only: no config write routes rendered or reachable.
- Server enforces the FSD §6 validations (one default template per merchant, Header+Items minimum, HEX/GSTIN/label checks, verified sender per channel). Portal duplicates them for UX only.
- Resend is a delegated command to Dispatch, allowed only for delivered/failed bills. The portal never mutates bill state.
- Bills list reads use the sanctioned Bill Store GSI; analytics reads use the Analytics store — never the transactional stores.

## Admin Portal

- Scope: shared template library, platform config, channel providers, role grants. No bill content, no customer PII views.
- Shared-library edits affect the library only — never a merchant's cloned copy.
- Privileged actions (config change, role grant, provider change) fail closed if the audit write fails.
- No merchant-impersonation view.

## Support Portal

- Scope: cross-merchant read (queues, delivery health, per-bill timelines), resend delegation. No bill-content edit exists as a function — corrections are credit notes through the normal write path.
- Every cross-merchant read is audit-logged; audit write failure fails the action.
- Contact data renders masked by default; unmasking only through the elevated, ticket-tagged, audited path.
- Delivery-health views read the same Analytics pipeline as merchant dashboards — one pipeline, two views; never a parallel data path.

## Customer surfaces

- Microsite is a rendered artifact (owned by Orchestration), served from object storage via CDN; it must remain servable during origin loss. Widget interactions post `engagement.events` via the BFF only.
- Enforce one survey response per customer per bill server-side. Broken widget asset → hide the block; never break the bill.
- Bill portal lists only bills linked to the OTP-verified number, resolved in the PII Vault. Scrubbed bills are excluded by construction (link row deleted), never by filtering.
- OTP state lives in the dedicated auth Redis cluster; OTP unavailable → login unavailable (fail closed). Never fall back to a weaker check.
- No cross-bill lookup exists except the OTP portal; never add enumeration, search, or listing by any other key.

## Shared components

- Share only presentation-level, domain-light code: design-system components, error-envelope renderer, auth-context plumbing, money/timestamp formatters, observability hooks.
- A shared component that encodes role logic or bill semantics has crossed the boundary — move the logic to the owning service or portal.
- Merchant and internal portals may share a component library; the microsite stays minimal, dependency-light, and CDN-servable.
- Never collapse portals into one generic UX shell: auth, density, and audit posture differ materially by design.

## Future portals

- A new portal requires: a named role in an FSD revision, its own auth model and session domain by ADR, BFF endpoints registered before frontend code, and a row in the inventory table above.
- Extend an existing portal first; a new portal is the last resort.
- New portals inherit every universal rule with no exceptions by default; deviations are per-rule and ADR-recorded.
