<!-- TIER-0 KERNEL. Loaded every session, first. Hard cap ~400 tokens. Regenerated to truth, never grown. -->
# STATE — Digital Billing Core

**As of:** 2026-07-11 · **Phase:** P0 Foundation (not started) · **Docs:** FSD v1.0 (frozen), Blueprint v1.1, TDS v1.0, Roadmap 262 tasks

## Where we are
- Design complete and reviewed. **No code written yet.** Next real work = the P0 Foundation track.
- **Next action:** start `F-01` (monorepo scaffold). First unblocked task in the roadmap.

## High-water marks (furthest done per track)
```
F:—  X:—  ING:—  ORCH:—  DISP:—  CFG:—  CRM:—  ANL:—  BFF:—  CMP:—  INT:—  HRD:—  LNCH:—
```
(— = not started. Update the prefix to the last completed task, e.g. `ING:ING-18`.)

## Open blockers (carried; close before the tasks that need them)
- **PG secureHash spec + secret provisioning** → blocks `ING-04` real impl (ships behind hash-stub flag until then).
- **PG settlement extract feed** → `CMP-08` recon stubbed until confirmed.
- **DPDP backup-retention ceiling (Legal)** → parameterises `CMP-10`.
- **Peak-TPS ratification** → fleet sizing only (`LNCH-04`); no contract changes.
- **Permanent-URL vs 90-day-scrub ruling** → `CMP-04`/`ORCH-12`; anonymised re-render implemented as recommended.

## Last 3 decisions (full list in DECISIONS.md)
- ADR-R3: deterministic `bill_id` from idempotency key (cross-region convergence).
- ADR-R2: CDC/outbox as primary event emission (no dual-write bill loss).
- ADR-R1: contact encrypted **in the bill record**, off the hot path; async copy to Vault.

## Active session
- Owner: — · Track: — · Task: — (set at session start; cleared at session end.)

<!-- consistent with FSD v1.0, Blueprint v1.1, TDS v1.0 -->

Completed

✓ F-01
✓ F-02

Architecture

✓ ADR-009 approved
✓ ADR-010 approved

Next Action

Implement F-03