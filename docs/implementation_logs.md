# Implementation Log

## F-01 - Monorepo Skeleton
Status: ✅ Completed
Commit: <commit hash>

Notes
- Monorepo scaffold created.
- Husky configured.
- CODEOWNERS added.

Follow-ups
- Review .prettierignore after implementation stabilizes.
- Replace placeholder CODEOWNERS owners.
- Review Git line-ending configuration (`core.autocrlf`).

Issue
Claude generated Bash validation commands for a Windows PowerShell development environment.

Resolution
Updated project implementation rules to always generate PowerShell-compatible commands unless Bash is explicitly requested.

Impact
Prevents future execution failures caused by shell incompatibilities.

## F-02 — CI Pipeline Skeleton

Status: ✅ Completed

Summary
- Added GitHub Actions CI workflow.
- Added CodeQL workflow.
- Added Dependabot configuration.
- Added PowerShell implementation guidance.

Validation
- npm ci passed
- lint passed
- YAML validated
- npm audit passed
- typecheck correctly skipped (no workspace packages yet)
- unit tests correctly skipped (no workspace packages yet)

## F-03 — CD Pipeline Skeleton (Canary + Rollback + Migration Gate)

Status: ✅ Completed

Summary
- Implemented ADR-010's platform-neutral deployment contract as declarative artifacts + mechanical CI checks — no deployment engine or cloud vendor chosen (deferred per ADR-011 §2; F-03 does not provision a real primitive).
- Added `platform/deployment/promotion-record.schema.json` — the ADR-010 §3 promotion-evidence contract.
- Added `platform/deployment/canary-stages.yml` — declarative 5/25/100 stage fractions + golden/domain gate signal names (dwell times explicitly left unset — deferred pending peak-TPS ratification).
- Added `platform/deployment/checks/validate-promotion-record.mjs` and `validate-migration-gate.mjs` — mechanical, hand-rolled validators (no new dependency) enforcing: a promotion missing required evidence is rejected, and a destructive ("contract") migration co-released with code that stops using the same column is rejected.
- Added seeded fault tests (`gates.test.mjs`, `node:test`) proving both validators pass on valid fixtures and fail on invalid ones.
- Added `.github/workflows/cd-gates.yml` running the seeded tests in CI.

Reconciliation (pre-implementation, per user instruction)
- ADR-009/ADR-010 in `docs/adr/` had a self-declared numbering collision against `tech-stack.md`'s reservation of ADR-9 for stack ratification (still pending). Renumbered: Deployment Architecture Principles → **ADR-010**, Vendor Selection Strategy → **ADR-011**. Updated all internal cross-references, removed the drafting-warning callouts, set Status to Approved (matching `01_STATE.md`), renamed the file to `ADR-010_ADR-011_Deployment_and_Vendor_Strategy.md`.

Validation
- `node --test platform/deployment/checks/gates.test.mjs` — 4/4 passed.
- All new JSON fixtures/schema parse valid.
- `npm run lint` passed.
- `npm run format` (Prettier) passed after `format:write` auto-fixed one file's style.

Deferred (see technical_debt.md)
- Deployment engine / cloud vendor selection (TD-007).
- Canary dwell-time values (TD-008).