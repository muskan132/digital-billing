# Technical Debt

## TD-001
Title: Docker image build pipeline

Reason
No deployable services exist yet.

Deferred From
F-02

Future Task
Add Docker build, image publishing and signing when first service is runnable.

Priority
Medium

TD-002
Review .prettierignore after repository stabilizes.

TD-003
Replace placeholder CODEOWNERS.

TD-004
Review Git line-ending configuration.

TD-005
Implement Cosign image signing after container publishing exists.

TD-006
Change npm audit from report-only to blocking gate before beta.

TD-007
Title: Deployment engine / cloud vendor selection

Reason
ADR-011 defers vendor decisions until a task provisions or consumes the real primitive; F-03 built the CD gate contract against fixtures only.

Deferred From
F-03

Future Task
Select and wire a concrete deployment engine per the ADR-010 §10 conformance checklist at the first task that provisions a real environment.

Priority
Medium

TD-008
Title: Canary stage dwell times

Reason
ADR-010 §4 fixes only that rollout is staged and gated; stage count/fractions are set by the roadmap (5/25/100), but dwell times are explicitly deferred pending fleet sizing after peak-TPS ratification.

Deferred From
F-03

Future Task
Set dwell-time values in `platform/deployment/canary-stages.yml` once peak-TPS is ratified (LNCH-04 fleet sizing).

Priority
Low

TD-009
Title: Brain repository-structure diagram out of sync with repo

Reason
00_Project_Brain.md §15 describes a context/ directory (context/STATE.md, DECISIONS.md, checkpoints/, sessions/log/, progress/PROGRESS.md) that does not exist; actual files are docs/01_STATE.md and docs/decision.md, with no checkpoints/session-log/progress files at all. Brain is regenerated only via an ADR-logged change, so this is not a same-session fix.

Deferred From
F-01 through F-03 review

Future Task
Reconcile Brain §15 with the real repository layout via an ADR-logged Brain update, or stand up the missing context/ artifacts to match Brain.

Priority
Medium

TD-010
Title: Missing per-task checkpoint files

Reason
IMPLEMENTATION_PLAYBOOK.md Step 11 requires a CP-<TASKID>.md checkpoint per completed task, but no checkpoint files exist for F-01, F-02, or F-03.

Deferred From
F-01 through F-03 review

Future Task
Backfill CP-F-01.md, CP-F-02.md, CP-F-03.md (what changed / how to verify / how to roll back) once the checkpoint storage location is reconciled with TD-009.

Priority
Medium