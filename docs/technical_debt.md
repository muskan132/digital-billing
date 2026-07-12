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

TD-001
Review .prettierignore after repository stabilizes.

TD-002
Replace placeholder CODEOWNERS.

TD-003
Review Git line-ending configuration.

TD-004
Implement Docker image build pipeline after first deployable service exists.

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