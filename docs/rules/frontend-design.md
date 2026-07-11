# Frontend design rules — Digital Billing Platform

Portal inventory, auth models, and boundaries → portals.md. Visual tokens and components → jpsl-design-system.md (the token source). Framework rules → tech-stack.md.

## Design system
- Follow the JPSL design system for every human-facing surface.
- Preserve its structural qualities: editorial spacing, clear hierarchy, calm surfaces, restrained color usage, clean component anatomy.

## Icons
- Use Lucide icons only.
- Never use emojis as icons or decorative elements.

## Customer surfaces (bill microsite, customer portal)
- Optimize for clarity and trust on low-end mobile: fast load, readable bill hierarchy, obvious PDF download and widget actions.
- The microsite stays minimal and dependency-light: CDN-servable with zero runtime backend dependency. A broken or missing widget asset hides that block — it never breaks the bill.
- OTP flow: explicit steps, clear rate-limit and lockout messaging, and uniform responses that never leak whether a phone number exists.

## Merchant portal UX
- Optimize for setup and insight: template gallery and builder with live preview, config forms with inline validation (HEX colors, GSTIN, label lengths), bills list with type/status/channel filters, analytics panels.
- Builder validation mirrors the server's rules exactly (required blocks, widget data prerequisites) — the client mirrors, it never replaces, server enforcement.

## Admin & support portal UX
- Optimize for queues, delivery health, per-bill timelines, and auditability.
- Prefer dense but readable layouts: tables, filters, timelines, side panels, status chips.
- Contact data renders masked by default; unmasking happens only through the elevated, audited path — never a client-side toggle.

## UI behavior
- Consistent token-based styling only; explicit forms; clear validation; no decorative motion or noisy UI.
- Money renders from integer paise and timestamps from UTC ISO-8601, always via the shared formatting utilities — never ad hoc arithmetic or formatting in components.
- Per-panel bulkheads: a failed panel shows its own error state; it never blanks the page or blocks sibling panels.

## Form, API & error handling
- **API requests**: standardize on the unified client `api` from `@/lib/api` for all requests. No raw fetch calls.
- **Submissions**: wrap every `onSubmit` in `try...catch`; set submitting state, clear previous errors, and on failure store the exception in local error state and render an inline warning banner above the form. No silent failures.
- **API error parsing**: always use the `parseApiError` utility from `@/lib/errors` (it joins array messages from server-side validation). Render the standard error envelope's message only — never internals, stack traces, or raw payloads.
