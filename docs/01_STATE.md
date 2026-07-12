<!-- TIER-0 KERNEL. Loaded every session, first. Hard cap ~400 tokens. Regenerated to truth, never grown. -->
# STATE — Digital Billing Core

**As of:** 2026-07-12 · **Phase:** P0 Foundation (in progress) · **Docs:** FSD v1.0 (frozen), Blueprint v1.2, TDS v1.0, Roadmap 262 tasks

## Where we are
- Foundation track underway. F-04 (ephemeral per-PR environment) implemented as GitHub Actions job-scoped containers only, no vendor/platform chosen (ADR-011 deferral not yet triggered).
- Next action: identify the next unblocked Foundation task (expected: F-05 — the ADR-011 mandatory vendor-decision trigger is expected here or at F-06).

## High-water marks (furthest done per track)
```
F:F-04  X:—  ING:—  ORCH:—  DISP:—  CFG:—  CRM:—  ANL:—  BFF:—  CMP:—  INT:—  HRD:—  LNCH:—
```
(— = not started. Update the prefix to the last completed task, e.g. `ING:ING-18`.)

## Open blockers (carried; close before the tasks that need them)
- **PG secureHash spec + secret provisioning** → blocks `ING-04` real impl (ships behind hash-stub flag until then).
- **PG settlement extract feed** → `CMP-08` recon stubbed until confirmed.
- **DPDP backup-retention ceiling (Legal)** → parameterises `CMP-10`.
- **Peak-TPS ratification** → fleet sizing only (`LNCH-04`); no contract changes. Also gates canary dwell-time config (ADR-010).
- **Permanent-URL vs 90-day-scrub ruling** → `CMP-04`/`ORCH-12`; anonymised re-render implemented as recommended.
- **Deployment engine / cloud vendor mapping** → deferred per ADR-011 §2 until a task provisions a real primitive; not yet triggered.

## Last 3 decisions (full list in DECISIONS.md)
- ADR-011: vendor decisions deferred until a task provisions/consumes the real primitive (process ADR, selects nothing).
- ADR-010: deployment is a platform-neutral contract (one-artifact promotion, staged canary, expand-migrate-contract, rehearsed rollback); no engine chosen.
- ADR-R3: deterministic `bill_id` from idempotency key (cross-region convergence).

## Active session
- Owner: — · Track: — · Task: — (set at session start; cleared at session end.)

Completed

✓ F-01
✓ F-02
✓ F-03
✓ F-04

Current Phase

Foundation

Next Task

F-05

<!-- consistent with FSD v1.0, Blueprint v1.2, TDS v1.0 -->