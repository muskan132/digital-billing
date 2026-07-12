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

## F-04 — Ephemeral Per-PR Environment (Planning Note)

ADR-011 mandatory-vendor-trigger evaluation
- During F-04 planning, ADR-011 §2 ("a vendor decision becomes mandatory at the first roadmap task that provisions or consumes the real primitive... local development and CI may run on fakes/containers indefinitely") was evaluated against F-04's objective.
- Determination: F-04 does **not** trigger the mandatory vendor decision. Its ephemeral per-PR environment maps to the Blueprint §19 **Pre-merge** CI/CD stage — job-scoped containers spun up and torn down within the GitHub Actions run, squarely inside ADR-011's CI/local carve-out. No persistent cloud account, managed service, or IaC tool is provisioned.
- The trigger is expected to fire at **F-05** (dev/staging/prod isolation — separate accounts/projects) and/or **F-06** (managed Kubernetes provisioning), whose objectives are themselves the real, persistent primitives ADR-011 §2 describes.
- Recorded here so this determination is not re-litigated in future F-track sessions; re-open only if F-04's scope changes materially from job-scoped containers.

## F-04 — Ephemeral Per-PR Environment (Implementation)

Status: ✅ Completed

Summary
- Implemented the per-PR ephemeral environment as GitHub Actions job-scoped containers only — no cloud vendor, platform, Kubernetes distribution, or IaC tool selected (per the ADR-011 evaluation above).
- Added `platform/pr-environments/config.json` — the compose-filename/servicesRoot convention as repository configuration, not hardcoded, so it can evolve without a code change.
- Added `platform/pr-environments/resolve-service-compose.mjs` — pure logic: which `services/*` directory a PR touches, and whether that service has a compose definition per the config.
- Added `platform/pr-environments/detect.mjs`, `provision.mjs`, `teardown.mjs`, `summarize.mjs` — CLI entry points the workflow calls: resolve the plan, start compose projects only where a definition exists, always tear down whatever was started, and render a Markdown job-summary table (service, compose-found, action, reason).
- Added `.github/workflows/ephemeral-pr-env.yml` — runs the above on `pull_request`, diffing against the PR base/head SHAs.
- No fixture or placeholder Docker Compose file was created, per instruction. The repository currently has no service with a compose definition, so the workflow's real, current behaviour is "detect touched service(s) → not found → skip," exercised directly against actual repo state — not a fabricated one. The "found" branch of the resolver is proven with an injected existence-check function instead of a real file.
- Added a Node-globals block to `eslint.config.mjs` (scoped to `**/*.mjs`) so these CLI scripts' use of `process` lints cleanly — no new dependency added.

Validation
- `node --test platform/pr-environments/resolve-service-compose.test.mjs` — 5/5 passed.
- Full CLI chain (`detect` → `provision` → `summarize` → `teardown`) dry-run against real repo state: correctly detects touched services, correctly resolves "not found" for both, provisions nothing, tears down nothing, and renders the required summary fields.
- `npm run lint` passed.
- `npm run format` (Prettier) passed.

Deferred (see technical_debt.md)
- None new. The ADR-011 mandatory-decision trigger remains un-fired; expected at F-05/F-06 (see planning note above).