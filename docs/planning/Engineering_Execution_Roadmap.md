# Engineering Execution Roadmap — Digital Billing Core

> Canonical Markdown conversion of `Engineering_Execution_Roadmap_Digital_Billing_Core.xlsx`.
> Faithful representation of the workbook (4 sheets). No roadmap content has been added, removed, reordered, or reworded.
> Source sheets: `Roadmap`, `Tracks & Parallelism`, `Milestones`, `How to Use`.

---

# Roadmap

*262 tasks. Columns preserved in original sheet order: `Task ID`, `Phase`, `Track`, `Objective`, `Est (min)`, `Dependencies`, `Inputs`, `Outputs`, `Definition of Done`, `Files Affected`, `Testing Requirements`, `Review Checklist`, `Rollback Strategy`, `Checkpoint ID`, `Parallelizable`.*

# Phase: P0 Foundation

## F-01

| Field | Value |
|---|---|
| Task ID | F-01 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Stand up the monorepo skeleton: service dirs, shared libs dir, lint/format config, commit hooks, CODEOWNERS. |
| Est (min) | 45 |
| Dependencies | — |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0 |
| Outputs | Stand up the monorepo skeleton: service dirs, shared libs dir, lint/format config, commit hooks, CODEOWNERS — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-01; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-01 |
| Parallelizable | Sequential-ish |

## F-02

| Field | Value |
|---|---|
| Task ID | F-02 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | CI pipeline skeleton: build + unit-test stages per service, image build + sign, SAST + dependency scan gates. |
| Est (min) | 90 |
| Dependencies | F-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-01 |
| Outputs | CI pipeline skeleton: build + unit-test stages per service, image build + sign, SAST + dependency scan gates — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-02; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-02 |
| Parallelizable | Sequential-ish |

## F-03

| Field | Value |
|---|---|
| Task ID | F-03 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | CD pipeline: canary 5/25/100 gates keyed on error-rate + p95; auto-rollback hook; expand–contract migration gate. |
| Est (min) | 90 |
| Dependencies | F-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-02 |
| Outputs | CD pipeline: canary 5/25/100 gates keyed on error-rate + p95; auto-rollback hook; expand–contract migration gate — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-03; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-03 |
| Parallelizable | Sequential-ish |

## F-04

| Field | Value |
|---|---|
| Task ID | F-04 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Ephemeral per-PR environment provisioning for the touched service (spins deps, tears down). |
| Est (min) | 90 |
| Dependencies | F-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-02 |
| Outputs | Ephemeral per-PR environment provisioning for the touched service (spins deps, tears down) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-04; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-04 |
| Parallelizable | Sequential-ish |

## F-05

| Field | Value |
|---|---|
| Task ID | F-05 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Provision dev/staging/prod isolation (separate accounts/projects); network baseline (private subnets, NAT allowlist). |
| Est (min) | 90 |
| Dependencies | F-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-01 |
| Outputs | Provision dev/staging/prod isolation (separate accounts/projects); network baseline (private subnets, NAT allowlist) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-05; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-05 |
| Parallelizable | Sequential-ish |

## F-06

| Field | Value |
|---|---|
| Task ID | F-06 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Provision managed Kubernetes per env, 3-AZ; base node pool + CPU-optimised render pool; autoscaler. |
| Est (min) | 90 |
| Dependencies | F-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-05 |
| Outputs | Provision managed Kubernetes per env, 3-AZ; base node pool + CPU-optimised render pool; autoscaler — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-06; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-06 |
| Parallelizable | Sequential-ish |

## F-07

| Field | Value |
|---|---|
| Task ID | F-07 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Install lightweight service mesh for mTLS + workload identity (SPIFFE-class) only. |
| Est (min) | 60 |
| Dependencies | F-06 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-06 |
| Outputs | Install lightweight service mesh for mTLS + workload identity (SPIFFE-class) only — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-07; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-07 |
| Parallelizable | Sequential-ish |

## F-08

| Field | Value |
|---|---|
| Task ID | F-08 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Deploy API gateway + WAF at edge; split machine vs human listener domains; base rate-limit policy. |
| Est (min) | 90 |
| Dependencies | F-06 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-06 |
| Outputs | Deploy API gateway + WAF at edge; split machine vs human listener domains; base rate-limit policy — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-08; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-08 |
| Parallelizable | Sequential-ish |

## F-09

| Field | Value |
|---|---|
| Task ID | F-09 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Stand up secrets manager/KMS; dynamic short-TTL DB creds; per-merchant secret namespace; rotation runbook stub. |
| Est (min) | 90 |
| Dependencies | F-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-05 |
| Outputs | Stand up secrets manager/KMS; dynamic short-TTL DB creds; per-merchant secret namespace; rotation runbook stub — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-09; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-09 |
| Parallelizable | Sequential-ish |

## F-10

| Field | Value |
|---|---|
| Task ID | F-10 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Create the dedicated PII KMS key (separate from platform keys) enabling crypto-shred; grant policy scaffold. |
| Est (min) | 45 |
| Dependencies | F-09 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-09 |
| Outputs | Create the dedicated PII KMS key (separate from platform keys) enabling crypto-shred; grant policy scaffold — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-10; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-10 |
| Parallelizable | Sequential-ish |

## F-11

| Field | Value |
|---|---|
| Task ID | F-11 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Provision the wide-column KV Bill Store (single-table); on-demand throughput; PITR/backups on. |
| Est (min) | 60 |
| Dependencies | F-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-05 |
| Outputs | Provision the wide-column KV Bill Store (single-table); on-demand throughput; PITR/backups on — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-11; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-11 |
| Parallelizable | Sequential-ish |

## F-12

| Field | Value |
|---|---|
| Task ID | F-12 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Enable the Bill Store change stream (CDC) feeding the Event Relay (Review F-2 primary path). |
| Est (min) | 45 |
| Dependencies | F-11 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-11 |
| Outputs | Enable the Bill Store change stream (CDC) feeding the Event Relay (Review F-2 primary path) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-12; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-12 |
| Parallelizable | Sequential-ish |

## F-13

| Field | Value |
|---|---|
| Task ID | F-13 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Provision Config DB (managed Postgres, multi-AZ + read replicas); PITR 35d. |
| Est (min) | 45 |
| Dependencies | F-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-05 |
| Outputs | Provision Config DB (managed Postgres, multi-AZ + read replicas); PITR 35d — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-13; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-13 |
| Parallelizable | Sequential-ish |

## F-14

| Field | Value |
|---|---|
| Task ID | F-14 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Provision the PII Vault (separate Postgres cluster) reachable only from CRM/BFF/Compliance; own KMS key. |
| Est (min) | 60 |
| Dependencies | F-05, F-10 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-05, F-10 |
| Outputs | Provision the PII Vault (separate Postgres cluster) reachable only from CRM/BFF/Compliance; own KMS key — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-14; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-14 |
| Parallelizable | Sequential-ish |

## F-15

| Field | Value |
|---|---|
| Task ID | F-15 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Provision the Metering Ledger KV table; conditional-put-only IAM (no overwrite). |
| Est (min) | 45 |
| Dependencies | F-11 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-11 |
| Outputs | Provision the Metering Ledger KV table; conditional-put-only IAM (no overwrite) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-15; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-15 |
| Parallelizable | Sequential-ish |

## F-16

| Field | Value |
|---|---|
| Task ID | F-16 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Provision managed Kafka; base topics with merchant_id partitioning; RF=3 across AZ. |
| Est (min) | 60 |
| Dependencies | F-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-05 |
| Outputs | Provision managed Kafka; base topics with merchant_id partitioning; RF=3 across AZ — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-16; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-16 |
| Parallelizable | Sequential-ish |

## F-17

| Field | Value |
|---|---|
| Task ID | F-17 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Stand up the schema registry; additive-only compatibility policy; CI contract-test hook. |
| Est (min) | 60 |
| Dependencies | F-16 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-16 |
| Outputs | Stand up the schema registry; additive-only compatibility policy; CI contract-test hook — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-17; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-17 |
| Parallelizable | Sequential-ish |

## F-18

| Field | Value |
|---|---|
| Task ID | F-18 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Provision the config/cache Redis cluster; separate auth Redis cluster (Review isolation) for OTP/session. |
| Est (min) | 45 |
| Dependencies | F-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-05 |
| Outputs | Provision the config/cache Redis cluster; separate auth Redis cluster (Review isolation) for OTP/session — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-18; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-18 |
| Parallelizable | Sequential-ish |

## F-19

| Field | Value |
|---|---|
| Task ID | F-19 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Provision object storage + CDN; signed-URL config; cross-region replication on artifacts. |
| Est (min) | 45 |
| Dependencies | F-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-05 |
| Outputs | Provision object storage + CDN; signed-URL config; cross-region replication on artifacts — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-19; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-19 |
| Parallelizable | Sequential-ish |

## F-20

| Field | Value |
|---|---|
| Task ID | F-20 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Deploy OTel collector + tracing backend; trace-id minting at gateway; Kafka header propagation convention. |
| Est (min) | 90 |
| Dependencies | F-08, F-16 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-08, F-16 |
| Outputs | Deploy OTel collector + tracing backend; trace-id minting at gateway; Kafka header propagation convention — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-20; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-20 |
| Parallelizable | Sequential-ish |

## F-21

| Field | Value |
|---|---|
| Task ID | F-21 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Deploy Prometheus-class metrics + dashboards-as-code; RED templates; Kafka-lag exporter. |
| Est (min) | 60 |
| Dependencies | F-06 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-06 |
| Outputs | Deploy Prometheus-class metrics + dashboards-as-code; RED templates; Kafka-lag exporter — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-21; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-21 |
| Parallelizable | Sequential-ish |

## F-22

| Field | Value |
|---|---|
| Task ID | F-22 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Deploy structured-logging pipeline with PII-denylist redaction middleware + a CI test that fails on seeded PII. |
| Est (min) | 90 |
| Dependencies | F-06 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-06 |
| Outputs | Deploy structured-logging pipeline with PII-denylist redaction middleware + a CI test that fails on seeded PII — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-22; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-22 |
| Parallelizable | Sequential-ish |

## F-23

| Field | Value |
|---|---|
| Task ID | F-23 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Stand up the append-only audit stream (Kafka topic → object-lock archive); entry schema (actor/role/scope/action/hash). |
| Est (min) | 60 |
| Dependencies | F-16, F-19 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-16, F-19 |
| Outputs | Stand up the append-only audit stream (Kafka topic → object-lock archive); entry schema (actor/role/scope/action/hash) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-23; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-23 |
| Parallelizable | Sequential-ish |

## F-24

| Field | Value |
|---|---|
| Task ID | F-24 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Deploy the whole-path synthetic canary merchant (callback→delivered every minute) harness (wired later). |
| Est (min) | 60 |
| Dependencies | F-08 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-08 |
| Outputs | Deploy the whole-path synthetic canary merchant (callback→delivered every minute) harness (wired later) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-24; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-24 |
| Parallelizable | Sequential-ish |

## F-25

| Field | Value |
|---|---|
| Task ID | F-25 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Stand up the load-test rig (staging, 2× tier) incl. hot-merchant + duplicate-callback-storm scenarios. |
| Est (min) | 90 |
| Dependencies | F-04 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-04 |
| Outputs | Stand up the load-test rig (staging, 2× tier) incl. hot-merchant + duplicate-callback-storm scenarios — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-25; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-25 |
| Parallelizable | Sequential-ish |

## F-26

| Field | Value |
|---|---|
| Task ID | F-26 |
| Phase | P0 Foundation |
| Track | F · Foundation & Platform |
| Objective | Stand up the chaos harness (kill render pod, drop Kafka broker, throttle store) for weekly staging runs. |
| Est (min) | 60 |
| Dependencies | F-04 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-04 |
| Outputs | Stand up the chaos harness (kill render pod, drop Kafka broker, throttle store) for weekly staging runs — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-F-26; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | infra/, platform/, .github/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-F-26 |
| Parallelizable | Sequential-ish |

# Phase: P1 Shared

## X-01

| Field | Value |
|---|---|
| Task ID | X-01 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Money library: paise-integer type, parse/format, arithmetic guards; lint rule banning floats in money paths. |
| Est (min) | 60 |
| Dependencies | F-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-01 |
| Outputs | Money library: paise-integer type, parse/format, arithmetic guards; lint rule banning floats in money paths — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-01; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | Unit tests over all branches; property tests where noted; deny-tests for PII-in-logs. |
| Review Checklist | Public API stable; Conventions §1 honoured; No PII in logs/errors; Documented; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Versioned library: pin previous version; new behaviour behind a flag. |
| Checkpoint ID | CP-X-01 |
| Parallelizable | Yes |

## X-02

| Field | Value |
|---|---|
| Task ID | X-02 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Identifier library: deterministic bill_id (HMAC over idempotency_key), url_hash CSPRNG, ULID event_id, cn_id. |
| Est (min) | 60 |
| Dependencies | F-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-01 |
| Outputs | Identifier library: deterministic bill_id (HMAC over idempotency_key), url_hash CSPRNG, ULID event_id, cn_id — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-02; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | Unit tests over all branches; property tests where noted; deny-tests for PII-in-logs. |
| Review Checklist | Public API stable; Conventions §1 honoured; No PII in logs/errors; Documented; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Versioned library: pin previous version; new behaviour behind a flag. |
| Checkpoint ID | CP-X-02 |
| Parallelizable | Yes |

## X-03

| Field | Value |
|---|---|
| Task ID | X-03 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Event-envelope library: struct, schema-version tagging, registry client, additive-only serializer. |
| Est (min) | 60 |
| Dependencies | F-17 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-17 |
| Outputs | Event-envelope library: struct, schema-version tagging, registry client, additive-only serializer — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-03; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | Unit tests over all branches; property tests where noted; deny-tests for PII-in-logs. |
| Review Checklist | Public API stable; Conventions §1 honoured; No PII in logs/errors; Documented; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Versioned library: pin previous version; new behaviour behind a flag. |
| Checkpoint ID | CP-X-03 |
| Parallelizable | Yes |

## X-04

| Field | Value |
|---|---|
| Task ID | X-04 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Error-envelope library: stable error codes, operator-safe messages (no PII/internals), field + trace_id. |
| Est (min) | 45 |
| Dependencies | F-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-01 |
| Outputs | Error-envelope library: stable error codes, operator-safe messages (no PII/internals), field + trace_id — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-04; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | Unit tests over all branches; property tests where noted; deny-tests for PII-in-logs. |
| Review Checklist | Public API stable; Conventions §1 honoured; No PII in logs/errors; Documented; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Versioned library: pin previous version; new behaviour behind a flag. |
| Checkpoint ID | CP-X-04 |
| Parallelizable | Yes |

## X-05

| Field | Value |
|---|---|
| Task ID | X-05 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Auth-context library: parse gateway token → {principal, roles, merchant_scope}; helper that forbids body merchant_id. |
| Est (min) | 60 |
| Dependencies | F-08 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-08 |
| Outputs | Auth-context library: parse gateway token → {principal, roles, merchant_scope}; helper that forbids body merchant_id — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-05; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | Unit tests over all branches; property tests where noted; deny-tests for PII-in-logs. |
| Review Checklist | Public API stable; Conventions §1 honoured; No PII in logs/errors; Documented; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Versioned library: pin previous version; new behaviour behind a flag. |
| Checkpoint ID | CP-X-05 |
| Parallelizable | Yes |

## X-06

| Field | Value |
|---|---|
| Task ID | X-06 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Envelope-encryption helper (AES-GCM under PII key) for contact_enc; encrypt/decrypt with grant scoping. |
| Est (min) | 60 |
| Dependencies | F-10, X-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-10, X-02 |
| Outputs | Envelope-encryption helper (AES-GCM under PII key) for contact_enc; encrypt/decrypt with grant scoping — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-06; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | Unit tests over all branches; property tests where noted; deny-tests for PII-in-logs. |
| Review Checklist | Public API stable; Conventions §1 honoured; No PII in logs/errors; Documented; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Versioned library: pin previous version; new behaviour behind a flag. |
| Checkpoint ID | CP-X-06 |
| Parallelizable | Yes |

## X-07

| Field | Value |
|---|---|
| Task ID | X-07 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Bill Store repository layer: put-if-absent, transact-write, point-read, GSI query; hides vendor semantics (§18.1). |
| Est (min) | 90 |
| Dependencies | F-11, X-01, X-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-11, X-01, X-02 |
| Outputs | Bill Store repository layer: put-if-absent, transact-write, point-read, GSI query; hides vendor semantics (§18.1) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-07; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | Unit tests against local store: conditional-put/idempotency, point-read, query-by-partition. |
| Review Checklist | Store abstraction leak-free (lock-in escape §18.1); merchant_id scoping; No cross-partition scans; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Pure code: revert commit; store interface unchanged so callers unaffected. |
| Checkpoint ID | CP-X-07 |
| Parallelizable | Yes |

## X-08

| Field | Value |
|---|---|
| Task ID | X-08 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Config cache client: read-through vs read-replica fallback, version stamp, test-generate bypass flag (F-10). |
| Est (min) | 60 |
| Dependencies | F-13, F-18 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-13, F-18 |
| Outputs | Config cache client: read-through vs read-replica fallback, version stamp, test-generate bypass flag (F-10) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-08; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | Unit tests over all branches; property tests where noted; deny-tests for PII-in-logs. |
| Review Checklist | Public API stable; Conventions §1 honoured; No PII in logs/errors; Documented; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Versioned library: pin previous version; new behaviour behind a flag. |
| Checkpoint ID | CP-X-08 |
| Parallelizable | Yes |

## X-09

| Field | Value |
|---|---|
| Task ID | X-09 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Kafka consumer wrapper: idempotent-handler keying (bill_id,step), manual commit, 5-retry→DLQ, cooperative rebalance. |
| Est (min) | 90 |
| Dependencies | F-16, X-03 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-16, X-03 |
| Outputs | Kafka consumer wrapper: idempotent-handler keying (bill_id,step), manual commit, 5-retry→DLQ, cooperative rebalance — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-09; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | Unit tests over all branches; property tests where noted; deny-tests for PII-in-logs. |
| Review Checklist | Public API stable; Conventions §1 honoured; No PII in logs/errors; Documented; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Versioned library: pin previous version; new behaviour behind a flag. |
| Checkpoint ID | CP-X-09 |
| Parallelizable | Yes |

## X-10

| Field | Value |
|---|---|
| Task ID | X-10 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Kafka producer wrapper: schema-checked publish, trace-header propagation, partition-by-merchant_id. |
| Est (min) | 45 |
| Dependencies | F-16, X-03 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-16, X-03 |
| Outputs | Kafka producer wrapper: schema-checked publish, trace-header propagation, partition-by-merchant_id — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-10; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | Unit tests over all branches; property tests where noted; deny-tests for PII-in-logs. |
| Review Checklist | Public API stable; Conventions §1 honoured; No PII in logs/errors; Documented; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Versioned library: pin previous version; new behaviour behind a flag. |
| Checkpoint ID | CP-X-10 |
| Parallelizable | Yes |

## X-11

| Field | Value |
|---|---|
| Task ID | X-11 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Event Relay component: Bill Store change stream → topic mapping (§2.5) with at-least-once + checkpointing (F-2). |
| Est (min) | 90 |
| Dependencies | F-12, X-03, X-10 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-12, X-03, X-10 |
| Outputs | Event Relay component: Bill Store change stream → topic mapping (§2.5) with at-least-once + checkpointing (F-2) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-11; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | Unit tests over all branches; property tests where noted; deny-tests for PII-in-logs. |
| Review Checklist | Public API stable; Conventions §1 honoured; No PII in logs/errors; Documented; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Versioned library: pin previous version; new behaviour behind a flag. |
| Checkpoint ID | CP-X-11 |
| Parallelizable | Yes |

## X-12

| Field | Value |
|---|---|
| Task ID | X-12 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Resilient HTTP client: timeout + 3 retries w/ jitter, 10% retry budget, circuit breaker at 50%/30s. |
| Est (min) | 60 |
| Dependencies | F-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-01 |
| Outputs | Resilient HTTP client: timeout + 3 retries w/ jitter, 10% retry budget, circuit breaker at 50%/30s — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-12; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | Unit tests over all branches; property tests where noted; deny-tests for PII-in-logs. |
| Review Checklist | Public API stable; Conventions §1 honoured; No PII in logs/errors; Documented; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Versioned library: pin previous version; new behaviour behind a flag. |
| Checkpoint ID | CP-X-12 |
| Parallelizable | Yes |

## X-13

| Field | Value |
|---|---|
| Task ID | X-13 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Secrets client: fetch + cache with TTL/version; per-merchant HMAC secret resolution; rotation-aware. |
| Est (min) | 60 |
| Dependencies | F-09 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-09 |
| Outputs | Secrets client: fetch + cache with TTL/version; per-merchant HMAC secret resolution; rotation-aware — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-13; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | Unit tests over all branches; property tests where noted; deny-tests for PII-in-logs. |
| Review Checklist | Public API stable; Conventions §1 honoured; No PII in logs/errors; Documented; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Versioned library: pin previous version; new behaviour behind a flag. |
| Checkpoint ID | CP-X-13 |
| Parallelizable | Yes |

## X-14

| Field | Value |
|---|---|
| Task ID | X-14 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Observability library: trace propagation, RED metric helpers, domain-metric registry, log redaction wiring. |
| Est (min) | 60 |
| Dependencies | F-20, F-22 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-20, F-22 |
| Outputs | Observability library: trace propagation, RED metric helpers, domain-metric registry, log redaction wiring — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-14; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | Unit tests over all branches; property tests where noted; deny-tests for PII-in-logs. |
| Review Checklist | Public API stable; Conventions §1 honoured; No PII in logs/errors; Documented; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Versioned library: pin previous version; new behaviour behind a flag. |
| Checkpoint ID | CP-X-14 |
| Parallelizable | Yes |

## X-15

| Field | Value |
|---|---|
| Task ID | X-15 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Reconciliation framework skeleton: job runner, discrepancy classes, paging + auto-postmortem-ticket hook. |
| Est (min) | 60 |
| Dependencies | F-23 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-23 |
| Outputs | Reconciliation framework skeleton: job runner, discrepancy classes, paging + auto-postmortem-ticket hook — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-15; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | Unit tests over all branches; property tests where noted; deny-tests for PII-in-logs. |
| Review Checklist | Public API stable; Conventions §1 honoured; No PII in logs/errors; Documented; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Versioned library: pin previous version; new behaviour behind a flag. |
| Checkpoint ID | CP-X-15 |
| Parallelizable | Yes |

## X-16

| Field | Value |
|---|---|
| Task ID | X-16 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Money-path test-floor harness (happy/retry/partial/concurrent/reconciles) as a reusable fixture. |
| Est (min) | 60 |
| Dependencies | X-01, X-07 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-01, X-07 |
| Outputs | Money-path test-floor harness (happy/retry/partial/concurrent/reconciles) as a reusable fixture — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-16; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-X-16 |
| Parallelizable | Yes |

## X-17

| Field | Value |
|---|---|
| Task ID | X-17 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | IDOR/tenancy test harness: fuzz foreign merchant/bill/contact ids across any endpoint (§9.1). |
| Est (min) | 60 |
| Dependencies | X-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-05 |
| Outputs | IDOR/tenancy test harness: fuzz foreign merchant/bill/contact ids across any endpoint (§9.1) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-17; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-X-17 |
| Parallelizable | Yes |

## X-18

| Field | Value |
|---|---|
| Task ID | X-18 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Contract-test harness bound to the schema registry (consumer-driven; fails on breaking change). |
| Est (min) | 60 |
| Dependencies | F-17, X-03 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-17, X-03 |
| Outputs | Contract-test harness bound to the schema registry (consumer-driven; fails on breaking change) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-18; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-X-18 |
| Parallelizable | Yes |

## X-19

| Field | Value |
|---|---|
| Task ID | X-19 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | Encode the FSD AC→module map (§11.2) as a machine-checkable coverage report in CI. |
| Est (min) | 45 |
| Dependencies | F-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-02 |
| Outputs | Encode the FSD AC→module map (§11.2) as a machine-checkable coverage report in CI — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-19; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-X-19 |
| Parallelizable | Yes |

## X-20

| Field | Value |
|---|---|
| Task ID | X-20 |
| Phase | P1 Shared |
| Track | X · Cross-Cutting Shared Libraries |
| Objective | One-command local dev stack (KV, Postgres, Kafka, S3, Redis containers) + fixtures, so any module builds alone. |
| Est (min) | 90 |
| Dependencies | F-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-01 |
| Outputs | One-command local dev stack (KV, Postgres, Kafka, S3, Redis containers) + fixtures, so any module builds alone — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-X-20; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | libs/common/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-X-20 |
| Parallelizable | Yes |

# Phase: P2 Module Build

## ING-01

| Field | Value |
|---|---|
| Task ID | ING-01 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Confirm Bill Store FACTS/STATUS/CN item shapes for Ingestion writes; add GSI-1 projections (TDS §2.1). |
| Est (min) | 45 |
| Dependencies | F-11, X-07 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-11, X-07 |
| Outputs | Confirm Bill Store FACTS/STATUS/CN item shapes for Ingestion writes; add GSI-1 projections (TDS §2.1) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-01; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Run up + down on an ephemeral DB; assert constraints from TDS §2; seed + query round-trip. |
| Review Checklist | Additive + reversible; Constraints match TDS §2; Indexed for stated access path; No PII in non-vault store unencrypted; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Expand–contract: down-migration drops only newly added objects; never destructive in the same release as code that stops using a column. |
| Checkpoint ID | CP-ING-01 |
| Parallelizable | Yes — within-track order only |

## ING-02

| Field | Value |
|---|---|
| Task ID | ING-02 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Ingestion write layer: transact-write(FACTS + STATUS#REQUESTED) + CN conditional put on the Bill Store repo. |
| Est (min) | 60 |
| Dependencies | ING-01, X-07 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-01, X-07 |
| Outputs | Ingestion write layer: transact-write(FACTS + STATUS#REQUESTED) + CN conditional put on the Bill Store repo — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-02; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Unit tests against local store: conditional-put/idempotency, point-read, query-by-partition. |
| Review Checklist | Store abstraction leak-free (lock-in escape §18.1); merchant_id scoping; No cross-partition scans; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Pure code: revert commit; store interface unchanged so callers unaffected. |
| Checkpoint ID | CP-ING-02 |
| Parallelizable | Yes — within-track order only |

## ING-03

| Field | Value |
|---|---|
| Task ID | ING-03 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Register PG-callback, direct-bill, batch, credit-note request schemas + bill.requested event schema. |
| Est (min) | 45 |
| Dependencies | X-03, X-18 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-03, X-18 |
| Outputs | Register PG-callback, direct-bill, batch, credit-note request schemas + bill.requested event schema — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-03; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Schema contract test; at-least-once duplicate-delivery test proves handler idempotency. |
| Review Checklist | No PII in payload; Schema registered + versioned; Keyed by merchant_id; Handler idempotent (bill_id,step); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Additive schema; consumer can be disabled with events retained (7d) and replayed. |
| Checkpoint ID | CP-ING-03 |
| Parallelizable | Yes — within-track order only |

## ING-04

| Field | Value |
|---|---|
| Task ID | ING-04 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Implement PG secureHash verification over raw body (constant-time), behind the hash-stub flag (§12). |
| Est (min) | 60 |
| Dependencies | X-13, ING-03 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-13, ING-03 |
| Outputs | Implement PG secureHash verification over raw body (constant-time), behind the hash-stub flag (§12) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-04; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ING-04 |
| Parallelizable | Yes — within-track order only |

## ING-05

| Field | Value |
|---|---|
| Task ID | ING-05 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Gate on responseCode 0000; park non-success with reason + metric. |
| Est (min) | 30 |
| Dependencies | ING-04 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-04 |
| Outputs | Gate on responseCode 0000; park non-success with reason + metric — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-05; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ING-05 |
| Parallelizable | Yes — within-track order only |

## ING-06

| Field | Value |
|---|---|
| Task ID | ING-06 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | bill_type routing: PG→RECEIPT, direct→TAX_INVOICE with mandatory line items (BR-21/22). |
| Est (min) | 45 |
| Dependencies | ING-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-02 |
| Outputs | bill_type routing: PG→RECEIPT, direct→TAX_INVOICE with mandatory line items (BR-21/22) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-06; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ING-06 |
| Parallelizable | Yes — within-track order only |

## ING-07

| Field | Value |
|---|---|
| Task ID | ING-07 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Idempotency via conditional put on idempotency_key; duplicate → read-and-return existing (409/202). |
| Est (min) | 60 |
| Dependencies | ING-02, X-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-02, X-02 |
| Outputs | Idempotency via conditional put on idempotency_key; duplicate → read-and-return existing (409/202) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-07; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ING-07 |
| Parallelizable | Yes — within-track order only |

## ING-08

| Field | Value |
|---|---|
| Task ID | ING-08 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Encrypt contact → contact_enc on the write path; set contact_present; never log plaintext (F-1). |
| Est (min) | 45 |
| Dependencies | X-06, ING-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-06, ING-02 |
| Outputs | Encrypt contact → contact_enc on the write path; set contact_present; never log plaintext (F-1) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-08; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ING-08 |
| Parallelizable | Yes — within-track order only |

## ING-09

| Field | Value |
|---|---|
| Task ID | ING-09 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Calculation validation (INVOICE): recompute discounts→tax→total in paise; mismatch→422 (FSD 5.2). |
| Est (min) | 60 |
| Dependencies | X-01, ING-06 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-01, ING-06 |
| Outputs | Calculation validation (INVOICE): recompute discounts→tax→total in paise; mismatch→422 (FSD 5.2) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-09; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Table-driven valid/invalid cases incl. FSD edge cases; field-level error assertions. |
| Review Checklist | Every mandatory field checked; Error envelope §1; Rejects unknown/oversized input; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind flag; revert commit. |
| Checkpoint ID | CP-ING-09 |
| Parallelizable | Yes — within-track order only |

## ING-10

| Field | Value |
|---|---|
| Task ID | ING-10 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | GST field validation (INVOICE): HSN per line, split vs place-of-supply, GSTIN present (FSD 5.3). |
| Est (min) | 60 |
| Dependencies | ING-06, CFG-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-06, CFG-02 |
| Outputs | GST field validation (INVOICE): HSN per line, split vs place-of-supply, GSTIN present (FSD 5.3) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-10; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Table-driven valid/invalid cases incl. FSD edge cases; field-level error assertions. |
| Review Checklist | Every mandatory field checked; Error envelope §1; Rejects unknown/oversized input; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind flag; revert commit. |
| Checkpoint ID | CP-ING-10 |
| Parallelizable | Yes — within-track order only |

## ING-11

| Field | Value |
|---|---|
| Task ID | ING-11 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Delivery-contact rule (BR-16): missing contact → create bill, contact_present=false, mark delivery-skip intent. |
| Est (min) | 30 |
| Dependencies | ING-08 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-08 |
| Outputs | Delivery-contact rule (BR-16): missing contact → create bill, contact_present=false, mark delivery-skip intent — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-11; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ING-11 |
| Parallelizable | Yes — within-track order only |

## ING-12

| Field | Value |
|---|---|
| Task ID | ING-12 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Credit-note cap: transactional Σ(CN)+new ≤ total in one transact-write (BR-13). |
| Est (min) | 60 |
| Dependencies | ING-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-02 |
| Outputs | Credit-note cap: transactional Σ(CN)+new ≤ total in one transact-write (BR-13) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-12; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ING-12 |
| Parallelizable | Yes — within-track order only |

## ING-13

| Field | Value |
|---|---|
| Task ID | ING-13 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | POST /v1/callbacks/pg endpoint: verify→route→write→202; error envelope; 401/409 paths. |
| Est (min) | 60 |
| Dependencies | ING-04, ING-07, ING-08 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-04, ING-07, ING-08 |
| Outputs | POST /v1/callbacks/pg endpoint: verify→route→write→202; error envelope; 401/409 paths — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-13; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-ING-13 |
| Parallelizable | Yes — within-track order only |

## ING-14

| Field | Value |
|---|---|
| Task ID | ING-14 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | POST /v1/bills endpoint: validate→write→202; LINE_ITEMS_REQUIRED/CALC_MISMATCH/GST paths. |
| Est (min) | 60 |
| Dependencies | ING-09, ING-10, ING-07 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-09, ING-10, ING-07 |
| Outputs | POST /v1/bills endpoint: validate→write→202; LINE_ITEMS_REQUIRED/CALC_MISMATCH/GST paths — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-14; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-ING-14 |
| Parallelizable | Yes — within-track order only |

## ING-15

| Field | Value |
|---|---|
| Task ID | ING-15 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | POST /v1/bills/batch: independent per-item processing, per-item error envelope, no-expiry semantics (BR-10). |
| Est (min) | 45 |
| Dependencies | ING-14 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-14 |
| Outputs | POST /v1/bills/batch: independent per-item processing, per-item error envelope, no-expiry semantics (BR-10) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-15; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-ING-15 |
| Parallelizable | Yes — within-track order only |

## ING-16

| Field | Value |
|---|---|
| Task ID | ING-16 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | POST /v1/credit-notes: validated conditional CN put; over-cap + duplicate paths. |
| Est (min) | 45 |
| Dependencies | ING-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-12 |
| Outputs | POST /v1/credit-notes: validated conditional CN put; over-cap + duplicate paths — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-16; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-ING-16 |
| Parallelizable | Yes — within-track order only |

## ING-17

| Field | Value |
|---|---|
| Task ID | ING-17 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | GET /v1/bills/{id}: scope-checked status + urls read. |
| Est (min) | 30 |
| Dependencies | ING-02, X-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-02, X-05 |
| Outputs | GET /v1/bills/{id}: scope-checked status + urls read — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-17; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-ING-17 |
| Parallelizable | Yes — within-track order only |

## ING-18

| Field | Value |
|---|---|
| Task ID | ING-18 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Wire the Event Relay to emit bill.requested from FACTS creation (CDC, not dual-write) (F-2). |
| Est (min) | 60 |
| Dependencies | X-11, ING-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-11, ING-02 |
| Outputs | Wire the Event Relay to emit bill.requested from FACTS creation (CDC, not dual-write) (F-2) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-18; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Schema contract test; at-least-once duplicate-delivery test proves handler idempotency. |
| Review Checklist | No PII in payload; Schema registered + versioned; Keyed by merchant_id; Handler idempotent (bill_id,step); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Additive schema; consumer can be disabled with events retained (7d) and replayed. |
| Checkpoint ID | CP-ING-18 |
| Parallelizable | Yes — within-track order only |

## ING-19

| Field | Value |
|---|---|
| Task ID | ING-19 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Error handling + envelopes for all Ingestion paths; throttle→503+Retry-After; retries safe by idempotency. |
| Est (min) | 45 |
| Dependencies | ING-13, ING-14 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-13, ING-14 |
| Outputs | Error handling + envelopes for all Ingestion paths; throttle→503+Retry-After; retries safe by idempotency — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-19; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ING-19 |
| Parallelizable | Yes — within-track order only |

## ING-20

| Field | Value |
|---|---|
| Task ID | ING-20 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Instrument Ingestion: pg_hash_failures, idempotency hits, ACK p95, transact-write throttle; alerts. |
| Est (min) | 45 |
| Dependencies | X-14, ING-13 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-14, ING-13 |
| Outputs | Instrument Ingestion: pg_hash_failures, idempotency hits, ACK p95, transact-write throttle; alerts — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-20; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Emit in dev; assert metric/trace/log present; fire the alert with a synthetic breach. |
| Review Checklist | RED + named domain metrics; No PII in labels; Alert links a runbook; Trace propagated via Kafka headers; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Config/code revert; dashboards + alerts are versioned in git. |
| Checkpoint ID | CP-ING-20 |
| Parallelizable | Yes — within-track order only |

## ING-21

| Field | Value |
|---|---|
| Task ID | ING-21 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Ingestion unit + property tests: at-most-one FACTS per key under concurrent replay; all validation branches. |
| Est (min) | 90 |
| Dependencies | ING-14, ING-16 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-14, ING-16 |
| Outputs | Ingestion unit + property tests: at-most-one FACTS per key under concurrent replay; all validation branches — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-21; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-ING-21 |
| Parallelizable | Yes — within-track order only |

## ING-22

| Field | Value |
|---|---|
| Task ID | ING-22 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Money-path floor on credit notes (happy/retry/partial/concurrent/reconciles) via the harness. |
| Est (min) | 60 |
| Dependencies | X-16, ING-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-16, ING-12 |
| Outputs | Money-path floor on credit notes (happy/retry/partial/concurrent/reconciles) via the harness — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-22; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | Money-path floor: happy / retry / partial / concurrent / reconciles; seeded drift must page. |
| Review Checklist | Detects each seeded discrepancy class; Nonzero drift pages + opens ticket; Idempotent rerun; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Read-only job: disable schedule; no writes to undo. |
| Checkpoint ID | CP-ING-22 |
| Parallelizable | Yes — within-track order only |

## ING-23

| Field | Value |
|---|---|
| Task ID | ING-23 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Contract tests: PG fixtures (stub), direct-API schema, bill.requested event; AC-1..5,18,19,23,24 mapped. |
| Est (min) | 60 |
| Dependencies | X-18, ING-13, ING-14 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-18, ING-13, ING-14 |
| Outputs | Contract tests: PG fixtures (stub), direct-API schema, bill.requested event; AC-1..5,18,19,23,24 mapped — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-23; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-ING-23 |
| Parallelizable | Yes — within-track order only |

## ING-24

| Field | Value |
|---|---|
| Task ID | ING-24 |
| Phase | P2 Module Build |
| Track | ING · Ingestion + Event Relay |
| Objective | Ingestion vertical slice demo against fakes: callback + direct call → FACTS + event, idempotent. |
| Est (min) | 60 |
| Dependencies | ING-18, ING-21, ING-23 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-18, ING-21, ING-23 |
| Outputs | Ingestion vertical slice demo against fakes: callback + direct call → FACTS + event, idempotent — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ING-24; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/ingestion/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-ING-24 |
| Parallelizable | Yes — within-track order only |

## ORCH-01

| Field | Value |
|---|---|
| Task ID | ORCH-01 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Confirm STATUS + artifact_ver write shapes; S3 key convention bills/{url_hash}/v{n}/ (TDS §4). |
| Est (min) | 30 |
| Dependencies | F-11, F-19 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-11, F-19 |
| Outputs | Confirm STATUS + artifact_ver write shapes; S3 key convention bills/{url_hash}/v{n}/ (TDS §4) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-01; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Run up + down on an ephemeral DB; assert constraints from TDS §2; seed + query round-trip. |
| Review Checklist | Additive + reversible; Constraints match TDS §2; Indexed for stated access path; No PII in non-vault store unencrypted; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Expand–contract: down-migration drops only newly added objects; never destructive in the same release as code that stops using a column. |
| Checkpoint ID | CP-ORCH-01 |
| Parallelizable | Yes — within-track order only |

## ORCH-02

| Field | Value |
|---|---|
| Task ID | ORCH-02 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Orchestration read/write layer: FACTS point-read, conditional STATUS append, artifact_ver bump. |
| Est (min) | 45 |
| Dependencies | ORCH-01, X-07 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ORCH-01, X-07 |
| Outputs | Orchestration read/write layer: FACTS point-read, conditional STATUS append, artifact_ver bump — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-02; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Unit tests against local store: conditional-put/idempotency, point-read, query-by-partition. |
| Review Checklist | Store abstraction leak-free (lock-in escape §18.1); merchant_id scoping; No cross-partition scans; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Pure code: revert commit; store interface unchanged so callers unaffected. |
| Checkpoint ID | CP-ORCH-02 |
| Parallelizable | Yes — within-track order only |

## ORCH-03

| Field | Value |
|---|---|
| Task ID | ORCH-03 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Consume bill.requested (partition-ordered); idempotent handler skips if STATUS≥GENERATED. |
| Est (min) | 45 |
| Dependencies | X-09, ORCH-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-09, ORCH-02 |
| Outputs | Consume bill.requested (partition-ordered); idempotent handler skips if STATUS≥GENERATED — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-03; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Schema contract test; at-least-once duplicate-delivery test proves handler idempotency. |
| Review Checklist | No PII in payload; Schema registered + versioned; Keyed by merchant_id; Handler idempotent (bill_id,step); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Additive schema; consumer can be disabled with events retained (7d) and replayed. |
| Checkpoint ID | CP-ORCH-03 |
| Parallelizable | Yes — within-track order only |

## ORCH-04

| Field | Value |
|---|---|
| Task ID | ORCH-04 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Resolve merchant config via cache (branding/labels/layout/widgets/default template); replica fallback. |
| Est (min) | 45 |
| Dependencies | X-08, ORCH-03 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-08, ORCH-03 |
| Outputs | Resolve merchant config via cache (branding/labels/layout/widgets/default template); replica fallback — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-04; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ORCH-04 |
| Parallelizable | Yes — within-track order only |

## ORCH-05

| Field | Value |
|---|---|
| Task ID | ORCH-05 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Template selection: requested→owned-check→default→skeleton; record template_id_used (FSD 5.4). |
| Est (min) | 45 |
| Dependencies | ORCH-04 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ORCH-04 |
| Outputs | Template selection: requested→owned-check→default→skeleton; record template_id_used (FSD 5.4) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-05; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ORCH-05 |
| Parallelizable | Yes — within-track order only |

## ORCH-06

| Field | Value |
|---|---|
| Task ID | ORCH-06 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Logic-less template engine subset (no expressions, no external fetch); block registry. |
| Est (min) | 90 |
| Dependencies | ORCH-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ORCH-05 |
| Outputs | Logic-less template engine subset (no expressions, no external fetch); block registry — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-06; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ORCH-06 |
| Parallelizable | Yes — within-track order only |

## ORCH-07

| Field | Value |
|---|---|
| Task ID | ORCH-07 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Render block layout in order; skip widget blocks with missing data (BR-14); output-encode merchant strings. |
| Est (min) | 60 |
| Dependencies | ORCH-06 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ORCH-06 |
| Outputs | Render block layout in order; skip widget blocks with missing data (BR-14); output-encode merchant strings — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-07; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ORCH-07 |
| Parallelizable | Yes — within-track order only |

## ORCH-08

| Field | Value |
|---|---|
| Task ID | ORCH-08 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Receipt bill model: amount/mode/date/txn-ids/branding, no line-item or GST block (BR-23). |
| Est (min) | 45 |
| Dependencies | ORCH-06 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ORCH-06 |
| Outputs | Receipt bill model: amount/mode/date/txn-ids/branding, no line-item or GST block (BR-23) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-08; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ORCH-08 |
| Parallelizable | Yes — within-track order only |

## ORCH-09

| Field | Value |
|---|---|
| Task ID | ORCH-09 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Tax-invoice bill model: line items, tax block, HSN, GSTIN, place of supply. |
| Est (min) | 45 |
| Dependencies | ORCH-06 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ORCH-06 |
| Outputs | Tax-invoice bill model: line items, tax block, HSN, GSTIN, place of supply — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-09; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ORCH-09 |
| Parallelizable | Yes — within-track order only |

## ORCH-10

| Field | Value |
|---|---|
| Task ID | ORCH-10 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Write HTML artifact to S3 (versioned); referrer-policy + noopener on external links (F-11). |
| Est (min) | 45 |
| Dependencies | ORCH-07, F-19 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ORCH-07, F-19 |
| Outputs | Write HTML artifact to S3 (versioned); referrer-policy + noopener on external links (F-11) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-10; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ORCH-10 |
| Parallelizable | Yes — within-track order only |

## ORCH-11

| Field | Value |
|---|---|
| Task ID | ORCH-11 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Append STATUS=GENERATED / NO_CONTACT via conditional transition; emit via Relay. |
| Est (min) | 45 |
| Dependencies | ORCH-02, X-11 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ORCH-02, X-11 |
| Outputs | Append STATUS=GENERATED / NO_CONTACT via conditional transition; emit via Relay — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-11; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Schema contract test; at-least-once duplicate-delivery test proves handler idempotency. |
| Review Checklist | No PII in payload; Schema registered + versioned; Keyed by merchant_id; Handler idempotent (bill_id,step); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Additive schema; consumer can be disabled with events retained (7d) and replayed. |
| Checkpoint ID | CP-ORCH-11 |
| Parallelizable | Yes — within-track order only |

## ORCH-12

| Field | Value |
|---|---|
| Task ID | ORCH-12 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Lazy PDF endpoint GET /bills/{hash}/pdf: render on first hit via Chromium pool, cache to S3, 302 thereafter. |
| Est (min) | 60 |
| Dependencies | ORCH-10 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ORCH-10 |
| Outputs | Lazy PDF endpoint GET /bills/{hash}/pdf: render on first hit via Chromium pool, cache to S3, 302 thereafter — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-12; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-ORCH-12 |
| Parallelizable | Yes — within-track order only |

## ORCH-13

| Field | Value |
|---|---|
| Task ID | ORCH-13 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Chromium render pool: warm pool, network-isolated (our S3 only), per-render CPU/mem/time caps. |
| Est (min) | 60 |
| Dependencies | F-06, ORCH-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-06, ORCH-12 |
| Outputs | Chromium render pool: warm pool, network-isolated (our S3 only), per-render CPU/mem/time caps — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-13; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-ORCH-13 |
| Parallelizable | Yes — within-track order only |

## ORCH-14

| Field | Value |
|---|---|
| Task ID | ORCH-14 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Render resource caps + template quarantine: breach→fallback skeleton + auto-disable + merchant notice (FSD 5.4). |
| Est (min) | 60 |
| Dependencies | ORCH-06, ORCH-11 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ORCH-06, ORCH-11 |
| Outputs | Render resource caps + template quarantine: breach→fallback skeleton + auto-disable + merchant notice (FSD 5.4) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-14; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ORCH-14 |
| Parallelizable | Yes — within-track order only |

## ORCH-15

| Field | Value |
|---|---|
| Task ID | ORCH-15 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Re-render worker: consume compliance/CN triggers → anonymised or CN-linked artifact version. |
| Est (min) | 60 |
| Dependencies | X-09, ORCH-10 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-09, ORCH-10 |
| Outputs | Re-render worker: consume compliance/CN triggers → anonymised or CN-linked artifact version — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-15; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Schema contract test; at-least-once duplicate-delivery test proves handler idempotency. |
| Review Checklist | No PII in payload; Schema registered + versioned; Keyed by merchant_id; Handler idempotent (bill_id,step); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Additive schema; consumer can be disabled with events retained (7d) and replayed. |
| Checkpoint ID | CP-ORCH-15 |
| Parallelizable | Yes — within-track order only |

## ORCH-16

| Field | Value |
|---|---|
| Task ID | ORCH-16 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Error handling: S3/store transient→retry then uncommitted offset; PDF fail→retry, HTML source of truth. |
| Est (min) | 45 |
| Dependencies | ORCH-10, ORCH-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ORCH-10, ORCH-12 |
| Outputs | Error handling: S3/store transient→retry then uncommitted offset; PDF fail→retry, HTML source of truth — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-16; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ORCH-16 |
| Parallelizable | Yes — within-track order only |

## ORCH-17

| Field | Value |
|---|---|
| Task ID | ORCH-17 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Instrument: render p95, consumer lag (30s alarm), fallback rate, PDF render time; dashboards. |
| Est (min) | 45 |
| Dependencies | X-14, ORCH-11 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-14, ORCH-11 |
| Outputs | Instrument: render p95, consumer lag (30s alarm), fallback rate, PDF render time; dashboards — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-17; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Emit in dev; assert metric/trace/log present; fire the alert with a synthetic breach. |
| Review Checklist | RED + named domain metrics; No PII in labels; Alert links a runbook; Trace propagated via Kafka headers; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Config/code revert; dashboards + alerts are versioned in git. |
| Checkpoint ID | CP-ORCH-17 |
| Parallelizable | Yes — within-track order only |

## ORCH-18

| Field | Value |
|---|---|
| Task ID | ORCH-18 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Golden-file render tests: skeletons × block permutations; widget-missing omission (AC-6). |
| Est (min) | 90 |
| Dependencies | ORCH-07, ORCH-08, ORCH-09 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ORCH-07, ORCH-08, ORCH-09 |
| Outputs | Golden-file render tests: skeletons × block permutations; widget-missing omission (AC-6) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-18; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-ORCH-18 |
| Parallelizable | Yes — within-track order only |

## ORCH-19

| Field | Value |
|---|---|
| Task ID | ORCH-19 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Fallback tests: unknown template, resource-bomb template, oversized item list pagination. |
| Est (min) | 60 |
| Dependencies | ORCH-14 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ORCH-14 |
| Outputs | Fallback tests: unknown template, resource-bomb template, oversized item list pagination — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-19; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-ORCH-19 |
| Parallelizable | Yes — within-track order only |

## ORCH-20

| Field | Value |
|---|---|
| Task ID | ORCH-20 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Idempotent-consumer test: duplicate bill.requested → one GENERATED, one artifact version. |
| Est (min) | 45 |
| Dependencies | ORCH-11 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ORCH-11 |
| Outputs | Idempotent-consumer test: duplicate bill.requested → one GENERATED, one artifact version — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-20; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-ORCH-20 |
| Parallelizable | Yes — within-track order only |

## ORCH-21

| Field | Value |
|---|---|
| Task ID | ORCH-21 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | PDF tests: first-render + cache-hit + failure-retry; content mirrors HTML (AC-16). |
| Est (min) | 45 |
| Dependencies | ORCH-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ORCH-12 |
| Outputs | PDF tests: first-render + cache-hit + failure-retry; content mirrors HTML (AC-16) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-21; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-ORCH-21 |
| Parallelizable | Yes — within-track order only |

## ORCH-22

| Field | Value |
|---|---|
| Task ID | ORCH-22 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Render perf test at T1: HTML p95<400ms; confirm lazy PDF keeps Chromium off per-bill path. |
| Est (min) | 60 |
| Dependencies | F-25, ORCH-18 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-25, ORCH-18 |
| Outputs | Render perf test at T1: HTML p95<400ms; confirm lazy PDF keeps Chromium off per-bill path — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-22; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | Load test at the tier target; assert p95 within the TDS budget; record numbers. |
| Review Checklist | Budget from TDS met; Hot path unblocked; Results recorded in the perf log; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Measurement/tuning task: revert tuning params; no behavioural change. |
| Checkpoint ID | CP-ORCH-22 |
| Parallelizable | Yes — within-track order only |

## ORCH-23

| Field | Value |
|---|---|
| Task ID | ORCH-23 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Security: template-injection + XSS + SSRF (logo) deny-tests; encoding verified. |
| Est (min) | 60 |
| Dependencies | X-17, ORCH-06, ORCH-10 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-17, ORCH-06, ORCH-10 |
| Outputs | Security: template-injection + XSS + SSRF (logo) deny-tests; encoding verified — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-23; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | IDOR/authz/abuse suite; deny-tests; fuzz foreign ids; verify fail-closed. |
| Review Checklist | Cross-tenant denied; Fail-closed; Secrets from manager; Threat-model row (§9.1) covered; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind flag / config; revert commit; no data migration. |
| Checkpoint ID | CP-ORCH-23 |
| Parallelizable | Yes — within-track order only |

## ORCH-24

| Field | Value |
|---|---|
| Task ID | ORCH-24 |
| Phase | P2 Module Build |
| Track | ORCH · Orchestration & Rendering |
| Objective | Orchestration slice demo: fixture bill.requested → hosted HTML on S3 + GENERATED; lazy PDF on demand. |
| Est (min) | 60 |
| Dependencies | ORCH-11, ORCH-18, ORCH-21 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ORCH-11, ORCH-18, ORCH-21 |
| Outputs | Orchestration slice demo: fixture bill.requested → hosted HTML on S3 + GENERATED; lazy PDF on demand — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ORCH-24; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/orchestration/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-ORCH-24 |
| Parallelizable | Yes — within-track order only |

## DISP-01

| Field | Value |
|---|---|
| Task ID | DISP-01 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Confirm STATUS dispatch shapes + Metering Ledger keys (bill#channel#attempt) (TDS §2.2). |
| Est (min) | 30 |
| Dependencies | F-11, F-15 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-11, F-15 |
| Outputs | Confirm STATUS dispatch shapes + Metering Ledger keys (bill#channel#attempt) (TDS §2.2) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-01; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Run up + down on an ephemeral DB; assert constraints from TDS §2; seed + query round-trip. |
| Review Checklist | Additive + reversible; Constraints match TDS §2; Indexed for stated access path; No PII in non-vault store unencrypted; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Expand–contract: down-migration drops only newly added objects; never destructive in the same release as code that stops using a column. |
| Checkpoint ID | CP-DISP-01 |
| Parallelizable | Yes — within-track order only |

## DISP-02

| Field | Value |
|---|---|
| Task ID | DISP-02 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Dispatch write layer: conditional STATUS append + Metering conditional put; FACTS contact read+decrypt. |
| Est (min) | 60 |
| Dependencies | DISP-01, X-07, X-06 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-01, X-07, X-06 |
| Outputs | Dispatch write layer: conditional STATUS append + Metering conditional put; FACTS contact read+decrypt — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-02; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Unit tests against local store: conditional-put/idempotency, point-read, query-by-partition. |
| Review Checklist | Store abstraction leak-free (lock-in escape §18.1); merchant_id scoping; No cross-partition scans; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Pure code: revert commit; store interface unchanged so callers unaffected. |
| Checkpoint ID | CP-DISP-02 |
| Parallelizable | Yes — within-track order only |

## DISP-03

| Field | Value |
|---|---|
| Task ID | DISP-03 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Consume bill.generated; idempotent handler keyed (bill_id, channel, attempt). |
| Est (min) | 45 |
| Dependencies | X-09, DISP-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-09, DISP-02 |
| Outputs | Consume bill.generated; idempotent handler keyed (bill_id, channel, attempt) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-03; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Schema contract test; at-least-once duplicate-delivery test proves handler idempotency. |
| Review Checklist | No PII in payload; Schema registered + versioned; Keyed by merchant_id; Handler idempotent (bill_id,step); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Additive schema; consumer can be disabled with events retained (7d) and replayed. |
| Checkpoint ID | CP-DISP-03 |
| Parallelizable | Yes — within-track order only |

## DISP-04

| Field | Value |
|---|---|
| Task ID | DISP-04 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Provider port abstraction (send, status-poll) with a common contract across channels. |
| Est (min) | 45 |
| Dependencies | DISP-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-02 |
| Outputs | Provider port abstraction (send, status-poll) with a common contract across channels — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-04; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Unit tests over all branches; property tests where noted; deny-tests for PII-in-logs. |
| Review Checklist | Public API stable; Conventions §1 honoured; No PII in logs/errors; Documented; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Versioned library: pin previous version; new behaviour behind a flag. |
| Checkpoint ID | CP-DISP-04 |
| Parallelizable | Yes — within-track order only |

## DISP-05

| Field | Value |
|---|---|
| Task ID | DISP-05 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | WhatsApp BSP adapter behind the port (stubbed to fixtures until provider contracted). |
| Est (min) | 60 |
| Dependencies | DISP-04, X-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-04, X-12 |
| Outputs | WhatsApp BSP adapter behind the port (stubbed to fixtures until provider contracted) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-05; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-DISP-05 |
| Parallelizable | Yes — within-track order only |

## DISP-06

| Field | Value |
|---|---|
| Task ID | DISP-06 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | SMS gateway adapter (short-link send). |
| Est (min) | 45 |
| Dependencies | DISP-04, X-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-04, X-12 |
| Outputs | SMS gateway adapter (short-link send) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-06; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-DISP-06 |
| Parallelizable | Yes — within-track order only |

## DISP-07

| Field | Value |
|---|---|
| Task ID | DISP-07 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Email provider adapter (HTML/link/PDF). |
| Est (min) | 45 |
| Dependencies | DISP-04, X-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-04, X-12 |
| Outputs | Email provider adapter (HTML/link/PDF) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-07; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-DISP-07 |
| Parallelizable | Yes — within-track order only |

## DISP-08

| Field | Value |
|---|---|
| Task ID | DISP-08 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Channel resolution: override else default; validate channel contact; NO_CONTACT never reaches here (assert). |
| Est (min) | 45 |
| Dependencies | DISP-02, CFG-08 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-02, CFG-08 |
| Outputs | Channel resolution: override else default; validate channel contact; NO_CONTACT never reaches here (assert) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-08; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-DISP-08 |
| Parallelizable | Yes — within-track order only |

## DISP-09

| Field | Value |
|---|---|
| Task ID | DISP-09 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Meter-then-send ordering: conditional Metering put BEFORE provider call; failed send reconciles, never reverse. |
| Est (min) | 60 |
| Dependencies | DISP-02, DISP-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-02, DISP-05 |
| Outputs | Meter-then-send ordering: conditional Metering put BEFORE provider call; failed send reconciles, never reverse — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-09; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-DISP-09 |
| Parallelizable | Yes — within-track order only |

## DISP-10

| Field | Value |
|---|---|
| Task ID | DISP-10 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Send-dedup marker (bill_id,channel,attempt) before provider call → duplicate event = no-op (kills double-send). |
| Est (min) | 45 |
| Dependencies | DISP-09 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-09 |
| Outputs | Send-dedup marker (bill_id,channel,attempt) before provider call → duplicate event = no-op (kills double-send) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-10; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-DISP-10 |
| Parallelizable | Yes — within-track order only |

## DISP-11

| Field | Value |
|---|---|
| Task ID | DISP-11 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | SQS-class retry queue: 1m/5m/30m backoff, max 5, then failover; every attempt a new message. |
| Est (min) | 60 |
| Dependencies | DISP-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-05 |
| Outputs | SQS-class retry queue: 1m/5m/30m backoff, max 5, then failover; every attempt a new message — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-11; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-DISP-11 |
| Parallelizable | Yes — within-track order only |

## DISP-12

| Field | Value |
|---|---|
| Task ID | DISP-12 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Failover chain: WhatsApp exhausted→SMS; all exhausted→DELIVERY_FAILED+Ops alert; URL stays live (BR-9). |
| Est (min) | 60 |
| Dependencies | DISP-11, DISP-06 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-11, DISP-06 |
| Outputs | Failover chain: WhatsApp exhausted→SMS; all exhausted→DELIVERY_FAILED+Ops alert; URL stays live (BR-9) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-12; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-DISP-12 |
| Parallelizable | Yes — within-track order only |

## DISP-13

| Field | Value |
|---|---|
| Task ID | DISP-13 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Provider status callbacks: per-provider signature/token verify (Review F-4); map to DELIVERED/attempt-fail. |
| Est (min) | 60 |
| Dependencies | DISP-05, DISP-06, DISP-07 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-05, DISP-06, DISP-07 |
| Outputs | Provider status callbacks: per-provider signature/token verify (Review F-4); map to DELIVERED/attempt-fail — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-13; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-DISP-13 |
| Parallelizable | Yes — within-track order only |

## DISP-14

| Field | Value |
|---|---|
| Task ID | DISP-14 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Callback idempotency on provider_msg_id; replayed callback → no-op. |
| Est (min) | 30 |
| Dependencies | DISP-13 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-13 |
| Outputs | Callback idempotency on provider_msg_id; replayed callback → no-op — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-14; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-DISP-14 |
| Parallelizable | Yes — within-track order only |

## DISP-15

| Field | Value |
|---|---|
| Task ID | DISP-15 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Append DISPATCHED/DELIVERED/DELIVERY_FAILED via conditional transition; emit via Relay. |
| Est (min) | 45 |
| Dependencies | DISP-02, X-11 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-02, X-11 |
| Outputs | Append DISPATCHED/DELIVERED/DELIVERY_FAILED via conditional transition; emit via Relay — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-15; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Schema contract test; at-least-once duplicate-delivery test proves handler idempotency. |
| Review Checklist | No PII in payload; Schema registered + versioned; Keyed by merchant_id; Handler idempotent (bill_id,step); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Additive schema; consumer can be disabled with events retained (7d) and replayed. |
| Checkpoint ID | CP-DISP-15 |
| Parallelizable | Yes — within-track order only |

## DISP-16

| Field | Value |
|---|---|
| Task ID | DISP-16 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | POST /v1/bills/{id}/resend (Ops/Admin): legal only from DELIVERED/FAILED; attempt-series 100+; audited. |
| Est (min) | 45 |
| Dependencies | DISP-12, F-23, X-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-12, F-23, X-05 |
| Outputs | POST /v1/bills/{id}/resend (Ops/Admin): legal only from DELIVERED/FAILED; attempt-series 100+; audited — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-16; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-DISP-16 |
| Parallelizable | Yes — within-track order only |

## DISP-17

| Field | Value |
|---|---|
| Task ID | DISP-17 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Per-provider circuit breaker: OPEN→skip to failover channel (Blueprint §17). |
| Est (min) | 45 |
| Dependencies | DISP-05, X-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-05, X-12 |
| Outputs | Per-provider circuit breaker: OPEN→skip to failover channel (Blueprint §17) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-17; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-DISP-17 |
| Parallelizable | Yes — within-track order only |

## DISP-18

| Field | Value |
|---|---|
| Task ID | DISP-18 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Error handling: provider 5xx/timeout→SQS backoff; meter-fail→no send; unverifiable callback→401. |
| Est (min) | 45 |
| Dependencies | DISP-11, DISP-13 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-11, DISP-13 |
| Outputs | Error handling: provider 5xx/timeout→SQS backoff; meter-fail→no send; unverifiable callback→401 — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-18; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-DISP-18 |
| Parallelizable | Yes — within-track order only |

## DISP-19

| Field | Value |
|---|---|
| Task ID | DISP-19 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Instrument: per-channel delivery rate, failover rate, breaker state, per-merchant send anomaly (phishing tell). |
| Est (min) | 45 |
| Dependencies | X-14, DISP-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-14, DISP-12 |
| Outputs | Instrument: per-channel delivery rate, failover rate, breaker state, per-merchant send anomaly (phishing tell) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-19; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Emit in dev; assert metric/trace/log present; fire the alert with a synthetic breach. |
| Review Checklist | RED + named domain metrics; No PII in labels; Alert links a runbook; Trace propagated via Kafka headers; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Config/code revert; dashboards + alerts are versioned in git. |
| Checkpoint ID | CP-DISP-19 |
| Parallelizable | Yes — within-track order only |

## DISP-20

| Field | Value |
|---|---|
| Task ID | DISP-20 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Money-path floor on metering (happy/retry/partial/concurrent/reconciles) via harness. |
| Est (min) | 60 |
| Dependencies | X-16, DISP-09 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-16, DISP-09 |
| Outputs | Money-path floor on metering (happy/retry/partial/concurrent/reconciles) via harness — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-20; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | Money-path floor: happy / retry / partial / concurrent / reconciles; seeded drift must page. |
| Review Checklist | Detects each seeded discrepancy class; Nonzero drift pages + opens ticket; Idempotent rerun; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Read-only job: disable schedule; no writes to undo. |
| Checkpoint ID | CP-DISP-20 |
| Parallelizable | Yes — within-track order only |

## DISP-21

| Field | Value |
|---|---|
| Task ID | DISP-21 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Failover tests incl. breaker-open path (AC-7, AC-8); URL-live-after-fail assertion. |
| Est (min) | 60 |
| Dependencies | DISP-12, DISP-17 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-12, DISP-17 |
| Outputs | Failover tests incl. breaker-open path (AC-7, AC-8); URL-live-after-fail assertion — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-21; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-DISP-21 |
| Parallelizable | Yes — within-track order only |

## DISP-22

| Field | Value |
|---|---|
| Task ID | DISP-22 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Provider adapter contract tests (success/fail/timeout scripts) per channel. |
| Est (min) | 45 |
| Dependencies | DISP-05, DISP-06, DISP-07 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-05, DISP-06, DISP-07 |
| Outputs | Provider adapter contract tests (success/fail/timeout scripts) per channel — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-22; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-DISP-22 |
| Parallelizable | Yes — within-track order only |

## DISP-23

| Field | Value |
|---|---|
| Task ID | DISP-23 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Resend legality tests across states; audit-entry assertion. |
| Est (min) | 30 |
| Dependencies | DISP-16 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-16 |
| Outputs | Resend legality tests across states; audit-entry assertion — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-23; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-DISP-23 |
| Parallelizable | Yes — within-track order only |

## DISP-24

| Field | Value |
|---|---|
| Task ID | DISP-24 |
| Phase | P2 Module Build |
| Track | DISP · Dispatch |
| Objective | Dispatch slice demo: bill.generated → WA(fail)→SMS delivered, metered once, status emitted. |
| Est (min) | 60 |
| Dependencies | DISP-15, DISP-20, DISP-21 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-15, DISP-20, DISP-21 |
| Outputs | Dispatch slice demo: bill.generated → WA(fail)→SMS delivered, metered once, status emitted — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-DISP-24; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/dispatch/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-DISP-24 |
| Parallelizable | Yes — within-track order only |

## CFG-01

| Field | Value |
|---|---|
| Task ID | CFG-01 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Migrate Config DB tables (merchants, branding, labels, templates, defaults, widgets, delivery, users/roles) (§2.3). |
| Est (min) | 60 |
| Dependencies | F-13, X-20 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-13, X-20 |
| Outputs | Migrate Config DB tables (merchants, branding, labels, templates, defaults, widgets, delivery, users/roles) (§2.3) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-01; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | Run up + down on an ephemeral DB; assert constraints from TDS §2; seed + query round-trip. |
| Review Checklist | Additive + reversible; Constraints match TDS §2; Indexed for stated access path; No PII in non-vault store unencrypted; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Expand–contract: down-migration drops only newly added objects; never destructive in the same release as code that stops using a column. |
| Checkpoint ID | CP-CFG-01 |
| Parallelizable | Yes — within-track order only |

## CFG-02

| Field | Value |
|---|---|
| Task ID | CFG-02 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Config data-access layer with the one-default invariant (BR-18) enforced as a constraint. |
| Est (min) | 45 |
| Dependencies | CFG-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CFG-01 |
| Outputs | Config data-access layer with the one-default invariant (BR-18) enforced as a constraint — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-02; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | Unit tests against local store: conditional-put/idempotency, point-read, query-by-partition. |
| Review Checklist | Store abstraction leak-free (lock-in escape §18.1); merchant_id scoping; No cross-partition scans; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Pure code: revert commit; store interface unchanged so callers unaffected. |
| Checkpoint ID | CP-CFG-02 |
| Parallelizable | Yes — within-track order only |

## CFG-03

| Field | Value |
|---|---|
| Task ID | CFG-03 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Register config/template API contracts + config.changed event schema. |
| Est (min) | 30 |
| Dependencies | X-03, X-18 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-03, X-18 |
| Outputs | Register config/template API contracts + config.changed event schema — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-03; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | Schema contract test; at-least-once duplicate-delivery test proves handler idempotency. |
| Review Checklist | No PII in payload; Schema registered + versioned; Keyed by merchant_id; Handler idempotent (bill_id,step); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Additive schema; consumer can be disabled with events retained (7d) and replayed. |
| Checkpoint ID | CP-CFG-03 |
| Parallelizable | Yes — within-track order only |

## CFG-04

| Field | Value |
|---|---|
| Task ID | CFG-04 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Branding/labels CRUD API: HEX/GSTIN validation, logo constraints; scope-checked. |
| Est (min) | 60 |
| Dependencies | CFG-02, X-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CFG-02, X-05 |
| Outputs | Branding/labels CRUD API: HEX/GSTIN validation, logo constraints; scope-checked — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-04; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-CFG-04 |
| Parallelizable | Yes — within-track order only |

## CFG-05

| Field | Value |
|---|---|
| Task ID | CFG-05 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Layout-schema validator: Header+Items mandatory, known blocks only, widget data present (FSD 5.5). |
| Est (min) | 60 |
| Dependencies | CFG-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CFG-02 |
| Outputs | Layout-schema validator: Header+Items mandatory, known blocks only, widget data present (FSD 5.5) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-05; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | Table-driven valid/invalid cases incl. FSD edge cases; field-level error assertions. |
| Review Checklist | Every mandatory field checked; Error envelope §1; Rejects unknown/oversized input; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind flag; revert commit. |
| Checkpoint ID | CP-CFG-05 |
| Parallelizable | Yes — within-track order only |

## CFG-06

| Field | Value |
|---|---|
| Task ID | CFG-06 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Template CRUD API (PUT/DELETE) with LAYOUT_INVALID + IS_DEFAULT(409) paths. |
| Est (min) | 60 |
| Dependencies | CFG-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CFG-05 |
| Outputs | Template CRUD API (PUT/DELETE) with LAYOUT_INVALID + IS_DEFAULT(409) paths — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-06; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-CFG-06 |
| Parallelizable | Yes — within-track order only |

## CFG-07

| Field | Value |
|---|---|
| Task ID | CFG-07 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Clone-and-edit: deep-copy library template→merchant-owned; library rows role-guarded immutable. |
| Est (min) | 45 |
| Dependencies | CFG-06 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CFG-06 |
| Outputs | Clone-and-edit: deep-copy library template→merchant-owned; library rows role-guarded immutable — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-07; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-CFG-07 |
| Parallelizable | Yes — within-track order only |

## CFG-08

| Field | Value |
|---|---|
| Task ID | CFG-08 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Set-default transaction (validate→upsert); block delete of current default (FSD 5.5 edge). |
| Est (min) | 45 |
| Dependencies | CFG-02, CFG-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CFG-02, CFG-05 |
| Outputs | Set-default transaction (validate→upsert); block delete of current default (FSD 5.5 edge) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-08; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-CFG-08 |
| Parallelizable | Yes — within-track order only |

## CFG-09

| Field | Value |
|---|---|
| Task ID | CFG-09 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Widget config CRUD (survey/coupon/marketing) with per-type payload schemas. |
| Est (min) | 45 |
| Dependencies | CFG-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CFG-02 |
| Outputs | Widget config CRUD (survey/coupon/marketing) with per-type payload schemas — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-09; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-CFG-09 |
| Parallelizable | Yes — within-track order only |

## CFG-10

| Field | Value |
|---|---|
| Task ID | CFG-10 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Delivery-preferences CRUD (default channel, failover, senders). |
| Est (min) | 30 |
| Dependencies | CFG-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CFG-02 |
| Outputs | Delivery-preferences CRUD (default channel, failover, senders) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-10; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-CFG-10 |
| Parallelizable | Yes — within-track order only |

## CFG-11

| Field | Value |
|---|---|
| Task ID | CFG-11 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Seed the default industry template library (Retail/QSR/Corporate/D2C/Salon) — pending final set (§12). |
| Est (min) | 60 |
| Dependencies | CFG-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CFG-05 |
| Outputs | Seed the default industry template library (Retail/QSR/Corporate/D2C/Salon) — pending final set (§12) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-11; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-CFG-11 |
| Parallelizable | Yes — within-track order only |

## CFG-12

| Field | Value |
|---|---|
| Task ID | CFG-12 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Write-through to config Redis + config.changed publish on every save. |
| Est (min) | 45 |
| Dependencies | X-08, CFG-02, X-10 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-08, CFG-02, X-10 |
| Outputs | Write-through to config Redis + config.changed publish on every save — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-12; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | Schema contract test; at-least-once duplicate-delivery test proves handler idempotency. |
| Review Checklist | No PII in payload; Schema registered + versioned; Keyed by merchant_id; Handler idempotent (bill_id,step); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Additive schema; consumer can be disabled with events retained (7d) and replayed. |
| Checkpoint ID | CP-CFG-12 |
| Parallelizable | Yes — within-track order only |

## CFG-13

| Field | Value |
|---|---|
| Task ID | CFG-13 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Role model + enforcement per FSD §2 (Admin/Staff/Ops/Platform) as token claims. |
| Est (min) | 45 |
| Dependencies | X-05, CFG-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-05, CFG-01 |
| Outputs | Role model + enforcement per FSD §2 (Admin/Staff/Ops/Platform) as token claims — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-13; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-CFG-13 |
| Parallelizable | Yes — within-track order only |

## CFG-14

| Field | Value |
|---|---|
| Task ID | CFG-14 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Error handling: serialization conflict on default-swap→retry-once→409; write-through fail→commit+alert. |
| Est (min) | 30 |
| Dependencies | CFG-08, CFG-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CFG-08, CFG-12 |
| Outputs | Error handling: serialization conflict on default-swap→retry-once→409; write-through fail→commit+alert — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-14; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-CFG-14 |
| Parallelizable | Yes — within-track order only |

## CFG-15

| Field | Value |
|---|---|
| Task ID | CFG-15 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Instrument: config write rate, cache write-through error rate, default-swap conflicts. |
| Est (min) | 30 |
| Dependencies | X-14, CFG-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-14, CFG-12 |
| Outputs | Instrument: config write rate, cache write-through error rate, default-swap conflicts — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-15; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | Emit in dev; assert metric/trace/log present; fire the alert with a synthetic breach. |
| Review Checklist | RED + named domain metrics; No PII in labels; Alert links a runbook; Trace propagated via Kafka headers; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Config/code revert; dashboards + alerts are versioned in git. |
| Checkpoint ID | CP-CFG-15 |
| Parallelizable | Yes — within-track order only |

## CFG-16

| Field | Value |
|---|---|
| Task ID | CFG-16 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Constraint tests: one-default race, library immutability by role, delete-default block (AC-21,22). |
| Est (min) | 60 |
| Dependencies | CFG-07, CFG-08 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CFG-07, CFG-08 |
| Outputs | Constraint tests: one-default race, library immutability by role, delete-default block (AC-21,22) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-16; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-CFG-16 |
| Parallelizable | Yes — within-track order only |

## CFG-17

| Field | Value |
|---|---|
| Task ID | CFG-17 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Layout-validator property tests: any non-conforming schema rejected. |
| Est (min) | 45 |
| Dependencies | CFG-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CFG-05 |
| Outputs | Layout-validator property tests: any non-conforming schema rejected — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-17; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-CFG-17 |
| Parallelizable | Yes — within-track order only |

## CFG-18

| Field | Value |
|---|---|
| Task ID | CFG-18 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Cache-coherence test: save→config.changed→bounded stale window. |
| Est (min) | 30 |
| Dependencies | CFG-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CFG-12 |
| Outputs | Cache-coherence test: save→config.changed→bounded stale window — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-18; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-CFG-18 |
| Parallelizable | Yes — within-track order only |

## CFG-19

| Field | Value |
|---|---|
| Task ID | CFG-19 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Security: IDOR on template ids; logo upload sniff/size/re-encode (SSRF closure). |
| Est (min) | 60 |
| Dependencies | X-17, CFG-04, CFG-06 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-17, CFG-04, CFG-06 |
| Outputs | Security: IDOR on template ids; logo upload sniff/size/re-encode (SSRF closure) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-19; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | IDOR/authz/abuse suite; deny-tests; fuzz foreign ids; verify fail-closed. |
| Review Checklist | Cross-tenant denied; Fail-closed; Secrets from manager; Threat-model row (§9.1) covered; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind flag / config; revert commit; no data migration. |
| Checkpoint ID | CP-CFG-19 |
| Parallelizable | Yes — within-track order only |

## CFG-20

| Field | Value |
|---|---|
| Task ID | CFG-20 |
| Phase | P2 Module Build |
| Track | CFG · Merchant Config & Templates |
| Objective | Config slice demo: build+clone template, set default, save branding → cache + event emitted. |
| Est (min) | 45 |
| Dependencies | CFG-07, CFG-12, CFG-16 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CFG-07, CFG-12, CFG-16 |
| Outputs | Config slice demo: build+clone template, set default, save branding → cache + event emitted — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CFG-20; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/config/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-CFG-20 |
| Parallelizable | Yes — within-track order only |

## CRM-01

| Field | Value |
|---|---|
| Task ID | CRM-01 |
| Phase | P2 Module Build |
| Track | CRM · CRM |
| Objective | Migrate PII Vault tables (contacts, contact_bills) partitioned by hash(phone_hash) (§2.4). |
| Est (min) | 45 |
| Dependencies | F-14, X-20 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-14, X-20 |
| Outputs | Migrate PII Vault tables (contacts, contact_bills) partitioned by hash(phone_hash) (§2.4) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CRM-01; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/crm/ |
| Testing Requirements | Run up + down on an ephemeral DB; assert constraints from TDS §2; seed + query round-trip. |
| Review Checklist | Additive + reversible; Constraints match TDS §2; Indexed for stated access path; No PII in non-vault store unencrypted; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Expand–contract: down-migration drops only newly added objects; never destructive in the same release as code that stops using a column. |
| Checkpoint ID | CP-CRM-01 |
| Parallelizable | Yes — within-track order only |

## CRM-02

| Field | Value |
|---|---|
| Task ID | CRM-02 |
| Phase | P2 Module Build |
| Track | CRM · CRM |
| Objective | CRM Vault data-access: natural-key upsert (merchant_id,phone_hash), link insert, indexed lookups. |
| Est (min) | 45 |
| Dependencies | CRM-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CRM-01 |
| Outputs | CRM Vault data-access: natural-key upsert (merchant_id,phone_hash), link insert, indexed lookups — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CRM-02; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/crm/ |
| Testing Requirements | Unit tests against local store: conditional-put/idempotency, point-read, query-by-partition. |
| Review Checklist | Store abstraction leak-free (lock-in escape §18.1); merchant_id scoping; No cross-partition scans; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Pure code: revert commit; store interface unchanged so callers unaffected. |
| Checkpoint ID | CP-CRM-02 |
| Parallelizable | Yes — within-track order only |

## CRM-03

| Field | Value |
|---|---|
| Task ID | CRM-03 |
| Phase | P2 Module Build |
| Track | CRM · CRM |
| Objective | Consume bill.requested where contact_present; point-read FACTS; decrypt contact. |
| Est (min) | 45 |
| Dependencies | X-09, X-06, CRM-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-09, X-06, CRM-02 |
| Outputs | Consume bill.requested where contact_present; point-read FACTS; decrypt contact — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CRM-03; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/crm/ |
| Testing Requirements | Schema contract test; at-least-once duplicate-delivery test proves handler idempotency. |
| Review Checklist | No PII in payload; Schema registered + versioned; Keyed by merchant_id; Handler idempotent (bill_id,step); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Additive schema; consumer can be disabled with events retained (7d) and replayed. |
| Checkpoint ID | CP-CRM-03 |
| Parallelizable | Yes — within-track order only |

## CRM-04

| Field | Value |
|---|---|
| Task ID | CRM-04 |
| Phase | P2 Module Build |
| Track | CRM · CRM |
| Objective | Idempotent contact upsert + contact_bills link; single profile across stores (FSD 5.7 edge). |
| Est (min) | 45 |
| Dependencies | CRM-03 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CRM-03 |
| Outputs | Idempotent contact upsert + contact_bills link; single profile across stores (FSD 5.7 edge) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CRM-04; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/crm/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-CRM-04 |
| Parallelizable | Yes — within-track order only |

## CRM-05

| Field | Value |
|---|---|
| Task ID | CRM-05 |
| Phase | P2 Module Build |
| Track | CRM · CRM |
| Objective | Consent recording (default false for marketing, BR-12); withdrawal API → early-scrub trigger. |
| Est (min) | 45 |
| Dependencies | CRM-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CRM-02 |
| Outputs | Consent recording (default false for marketing, BR-12); withdrawal API → early-scrub trigger — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CRM-05; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/crm/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-CRM-05 |
| Parallelizable | Yes — within-track order only |

## CRM-06

| Field | Value |
|---|---|
| Task ID | CRM-06 |
| Phase | P2 Module Build |
| Track | CRM · CRM |
| Objective | Contact syntactic validation before storage; invalid→drop+metric, bill unaffected. |
| Est (min) | 30 |
| Dependencies | CRM-04 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CRM-04 |
| Outputs | Contact syntactic validation before storage; invalid→drop+metric, bill unaffected — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CRM-06; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/crm/ |
| Testing Requirements | Table-driven valid/invalid cases incl. FSD edge cases; field-level error assertions. |
| Review Checklist | Every mandatory field checked; Error envelope §1; Rejects unknown/oversized input; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind flag; revert commit. |
| Checkpoint ID | CP-CRM-06 |
| Parallelizable | Yes — within-track order only |

## CRM-07

| Field | Value |
|---|---|
| Task ID | CRM-07 |
| Phase | P2 Module Build |
| Track | CRM · CRM |
| Objective | Internal lookups (contacts-by-phone, bills-for-contact) for BFF/Compliance; mTLS + scope. |
| Est (min) | 45 |
| Dependencies | CRM-02, F-07 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CRM-02, F-07 |
| Outputs | Internal lookups (contacts-by-phone, bills-for-contact) for BFF/Compliance; mTLS + scope — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CRM-07; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/crm/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-CRM-07 |
| Parallelizable | Yes — within-track order only |

## CRM-08

| Field | Value |
|---|---|
| Task ID | CRM-08 |
| Phase | P2 Module Build |
| Track | CRM · CRM |
| Objective | Error handling: Vault conflict→upsert-wins/retry; decrypt-fail→DLQ+page (key incident); backfill-safe replay. |
| Est (min) | 45 |
| Dependencies | CRM-04, X-06 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CRM-04, X-06 |
| Outputs | Error handling: Vault conflict→upsert-wins/retry; decrypt-fail→DLQ+page (key incident); backfill-safe replay — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CRM-08; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/crm/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-CRM-08 |
| Parallelizable | Yes — within-track order only |

## CRM-09

| Field | Value |
|---|---|
| Task ID | CRM-09 |
| Phase | P2 Module Build |
| Track | CRM · CRM |
| Objective | Instrument: CRM consumer lag (15-min alarm, never 30s — never blocks bills), upsert rate, decrypt failures. |
| Est (min) | 30 |
| Dependencies | X-14, CRM-03 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-14, CRM-03 |
| Outputs | Instrument: CRM consumer lag (15-min alarm, never 30s — never blocks bills), upsert rate, decrypt failures — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CRM-09; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/crm/ |
| Testing Requirements | Emit in dev; assert metric/trace/log present; fire the alert with a synthetic breach. |
| Review Checklist | RED + named domain metrics; No PII in labels; Alert links a runbook; Trace propagated via Kafka headers; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Config/code revert; dashboards + alerts are versioned in git. |
| Checkpoint ID | CP-CRM-09 |
| Parallelizable | Yes — within-track order only |

## CRM-10

| Field | Value |
|---|---|
| Task ID | CRM-10 |
| Phase | P2 Module Build |
| Track | CRM · CRM |
| Objective | Idempotent-upsert + concurrent same-customer race tests; consent default/withdrawal (AC-9, BR-12). |
| Est (min) | 60 |
| Dependencies | CRM-04, CRM-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CRM-04, CRM-05 |
| Outputs | Idempotent-upsert + concurrent same-customer race tests; consent default/withdrawal (AC-9, BR-12) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CRM-10; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/crm/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-CRM-10 |
| Parallelizable | Yes — within-track order only |

## CRM-11

| Field | Value |
|---|---|
| Task ID | CRM-11 |
| Phase | P2 Module Build |
| Track | CRM · CRM |
| Objective | Replay test: consume stream twice → identical Vault state. |
| Est (min) | 30 |
| Dependencies | CRM-04 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CRM-04 |
| Outputs | Replay test: consume stream twice → identical Vault state — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CRM-11; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/crm/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-CRM-11 |
| Parallelizable | Yes — within-track order only |

## CRM-12

| Field | Value |
|---|---|
| Task ID | CRM-12 |
| Phase | P2 Module Build |
| Track | CRM · CRM |
| Objective | Partition-pruning test on phone_hash (portal latency dependency). |
| Est (min) | 30 |
| Dependencies | CRM-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CRM-02 |
| Outputs | Partition-pruning test on phone_hash (portal latency dependency) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CRM-12; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/crm/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-CRM-12 |
| Parallelizable | Yes — within-track order only |

## CRM-13

| Field | Value |
|---|---|
| Task ID | CRM-13 |
| Phase | P2 Module Build |
| Track | CRM · CRM |
| Objective | Security: Vault reachable only from CRM/BFF/Compliance; merchant-scoped/phone-verified queries; no PII in telemetry. |
| Est (min) | 45 |
| Dependencies | X-17, CRM-07 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-17, CRM-07 |
| Outputs | Security: Vault reachable only from CRM/BFF/Compliance; merchant-scoped/phone-verified queries; no PII in telemetry — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CRM-13; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/crm/ |
| Testing Requirements | IDOR/authz/abuse suite; deny-tests; fuzz foreign ids; verify fail-closed. |
| Review Checklist | Cross-tenant denied; Fail-closed; Secrets from manager; Threat-model row (§9.1) covered; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind flag / config; revert commit; no data migration. |
| Checkpoint ID | CP-CRM-13 |
| Parallelizable | Yes — within-track order only |

## CRM-14

| Field | Value |
|---|---|
| Task ID | CRM-14 |
| Phase | P2 Module Build |
| Track | CRM · CRM |
| Objective | CRM slice demo: fixture bill.requested(contact) → Vault contact + link, consent stored, lag-tolerant. |
| Est (min) | 45 |
| Dependencies | CRM-04, CRM-10, CRM-13 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CRM-04, CRM-10, CRM-13 |
| Outputs | CRM slice demo: fixture bill.requested(contact) → Vault contact + link, consent stored, lag-tolerant — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CRM-14; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/crm/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-CRM-14 |
| Parallelizable | Yes — within-track order only |

## ANL-01

| Field | Value |
|---|---|
| Task ID | ANL-01 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Migrate T1 analytics aggregates + feedback + event-archive tables (Postgres-first, Review F-8) (§2.5,§8). |
| Est (min) | 45 |
| Dependencies | F-13, X-20 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-13, X-20 |
| Outputs | Migrate T1 analytics aggregates + feedback + event-archive tables (Postgres-first, Review F-8) (§2.5,§8) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-01; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | Run up + down on an ephemeral DB; assert constraints from TDS §2; seed + query round-trip. |
| Review Checklist | Additive + reversible; Constraints match TDS §2; Indexed for stated access path; No PII in non-vault store unencrypted; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Expand–contract: down-migration drops only newly added objects; never destructive in the same release as code that stops using a column. |
| Checkpoint ID | CP-ANL-01 |
| Parallelizable | Yes — within-track order only |

## ANL-02

| Field | Value |
|---|---|
| Task ID | ANL-02 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Beacon Collector endpoint POST /b/{url_hash}: bloom-check→publish engagement.events→204 always. |
| Est (min) | 60 |
| Dependencies | X-10, F-08 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-10, F-08 |
| Outputs | Beacon Collector endpoint POST /b/{url_hash}: bloom-check→publish engagement.events→204 always — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-02; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-ANL-02 |
| Parallelizable | Yes — within-track order only |

## ANL-03

| Field | Value |
|---|---|
| Task ID | ANL-03 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Live-url_hash bloom filter refreshed from bill.generated; garbage dropped before Kafka. |
| Est (min) | 45 |
| Dependencies | X-09, ANL-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-09, ANL-02 |
| Outputs | Live-url_hash bloom filter refreshed from bill.generated; garbage dropped before Kafka — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-03; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ANL-03 |
| Parallelizable | Yes — within-track order only |

## ANL-04

| Field | Value |
|---|---|
| Task ID | ANL-04 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Pipeline consumers: engagement.events + bill.delivery → idempotent daily aggregate upserts (on event_id). |
| Est (min) | 60 |
| Dependencies | X-09, ANL-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-09, ANL-01 |
| Outputs | Pipeline consumers: engagement.events + bill.delivery → idempotent daily aggregate upserts (on event_id) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-04; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | Schema contract test; at-least-once duplicate-delivery test proves handler idempotency. |
| Review Checklist | No PII in payload; Schema registered + versioned; Keyed by merchant_id; Handler idempotent (bill_id,step); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Additive schema; consumer can be disabled with events retained (7d) and replayed. |
| Checkpoint ID | CP-ANL-04 |
| Parallelizable | Yes — within-track order only |

## ANL-05

| Field | Value |
|---|---|
| Task ID | ANL-05 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Aggregate computation: sent/delivered/failed/opens; unique customers via HLL; CTR; survey scores; top customers. |
| Est (min) | 60 |
| Dependencies | ANL-04 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ANL-04 |
| Outputs | Aggregate computation: sent/delivered/failed/opens; unique customers via HLL; CTR; survey scores; top customers — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-05; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ANL-05 |
| Parallelizable | Yes — within-track order only |

## ANL-06

| Field | Value |
|---|---|
| Task ID | ANL-06 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Survey once-per-(bill,surrogate) store with unique index; duplicate→success-ignored (FSD 5.10, AC-13). |
| Est (min) | 45 |
| Dependencies | ANL-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ANL-01 |
| Outputs | Survey once-per-(bill,surrogate) store with unique index; duplicate→success-ignored (FSD 5.10, AC-13) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-06; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ANL-06 |
| Parallelizable | Yes — within-track order only |

## ANL-07

| Field | Value |
|---|---|
| Task ID | ANL-07 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Internal aggregates/feedback query API for the BFF (no PII, surrogate ids only). |
| Est (min) | 45 |
| Dependencies | ANL-05, F-07 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ANL-05, F-07 |
| Outputs | Internal aggregates/feedback query API for the BFF (no PII, surrogate ids only) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-07; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-ANL-07 |
| Parallelizable | Yes — within-track order only |

## ANL-08

| Field | Value |
|---|---|
| Task ID | ANL-08 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Derive delivery aggregates only from bill.delivery events (single source, never provider callbacks). |
| Est (min) | 30 |
| Dependencies | ANL-04 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ANL-04 |
| Outputs | Derive delivery aggregates only from bill.delivery events (single source, never provider callbacks) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-08; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ANL-08 |
| Parallelizable | Yes — within-track order only |

## ANL-09

| Field | Value |
|---|---|
| Task ID | ANL-09 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Event archive to object store (3d topic + cold archive); rebuild-from-archive runbook. |
| Est (min) | 45 |
| Dependencies | F-19, ANL-04 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-19, ANL-04 |
| Outputs | Event archive to object store (3d topic + cold archive); rebuild-from-archive runbook — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-09; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-ANL-09 |
| Parallelizable | Yes — within-track order only |

## ANL-10

| Field | Value |
|---|---|
| Task ID | ANL-10 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Error handling: collector 204-on-error (lossy-tolerable, agreed); aggregate idempotent; rebuild runbook. |
| Est (min) | 30 |
| Dependencies | ANL-02, ANL-04 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ANL-02, ANL-04 |
| Outputs | Error handling: collector 204-on-error (lossy-tolerable, agreed); aggregate idempotent; rebuild runbook — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-10; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ANL-10 |
| Parallelizable | Yes — within-track order only |

## ANL-11

| Field | Value |
|---|---|
| Task ID | ANL-11 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Instrument: beacon RPS (highest in system), collector p95<5ms, consumer lag, aggregate freshness. |
| Est (min) | 45 |
| Dependencies | X-14, ANL-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-14, ANL-02 |
| Outputs | Instrument: beacon RPS (highest in system), collector p95<5ms, consumer lag, aggregate freshness — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-11; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | Emit in dev; assert metric/trace/log present; fire the alert with a synthetic breach. |
| Review Checklist | RED + named domain metrics; No PII in labels; Alert links a runbook; Trace propagated via Kafka headers; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Config/code revert; dashboards + alerts are versioned in git. |
| Checkpoint ID | CP-ANL-11 |
| Parallelizable | Yes — within-track order only |

## ANL-12

| Field | Value |
|---|---|
| Task ID | ANL-12 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Idempotent-aggregate + survey-once race tests (AC-13); bloom false-positive tolerance test. |
| Est (min) | 60 |
| Dependencies | ANL-05, ANL-06 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ANL-05, ANL-06 |
| Outputs | Idempotent-aggregate + survey-once race tests (AC-13); bloom false-positive tolerance test — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-12; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-ANL-12 |
| Parallelizable | Yes — within-track order only |

## ANL-13

| Field | Value |
|---|---|
| Task ID | ANL-13 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Rebuild-from-archive test (CI monthly): truncate range→replay→counts match bill.delivery. |
| Est (min) | 45 |
| Dependencies | ANL-09 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ANL-09 |
| Outputs | Rebuild-from-archive test (CI monthly): truncate range→replay→counts match bill.delivery — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-13; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-ANL-13 |
| Parallelizable | Yes — within-track order only |

## ANL-14

| Field | Value |
|---|---|
| Task ID | ANL-14 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Collector perf: 5ms p95 at opens≈0.7×sends target; no request-path I/O beyond async produce. |
| Est (min) | 60 |
| Dependencies | F-25, ANL-11 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-25, ANL-11 |
| Outputs | Collector perf: 5ms p95 at opens≈0.7×sends target; no request-path I/O beyond async produce — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-14; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | Load test at the tier target; assert p95 within the TDS budget; record numbers. |
| Review Checklist | Budget from TDS met; Hot path unblocked; Results recorded in the perf log; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Measurement/tuning task: revert tuning params; no behavioural change. |
| Checkpoint ID | CP-ANL-14 |
| Parallelizable | Yes — within-track order only |

## ANL-15

| Field | Value |
|---|---|
| Task ID | ANL-15 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Security: url_hash-as-capability, per-hash rate limits; surrogate id irreversible; no PII path. |
| Est (min) | 45 |
| Dependencies | X-17, ANL-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-17, ANL-02 |
| Outputs | Security: url_hash-as-capability, per-hash rate limits; surrogate id irreversible; no PII path — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-15; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | IDOR/authz/abuse suite; deny-tests; fuzz foreign ids; verify fail-closed. |
| Review Checklist | Cross-tenant denied; Fail-closed; Secrets from manager; Threat-model row (§9.1) covered; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind flag / config; revert commit; no data migration. |
| Checkpoint ID | CP-ANL-15 |
| Parallelizable | Yes — within-track order only |

## ANL-16

| Field | Value |
|---|---|
| Task ID | ANL-16 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Analytics slice demo: beacon+delivery events → aggregates queryable; survey counted once. |
| Est (min) | 45 |
| Dependencies | ANL-05, ANL-12, ANL-14 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ANL-05, ANL-12, ANL-14 |
| Outputs | Analytics slice demo: beacon+delivery events → aggregates queryable; survey counted once — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-16; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-ANL-16 |
| Parallelizable | Yes — within-track order only |

## ANL-17

| Field | Value |
|---|---|
| Task ID | ANL-17 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Wire aggregates to the shared business-observability dashboards (Ops + merchant, one pipeline). |
| Est (min) | 30 |
| Dependencies | ANL-07 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ANL-07 |
| Outputs | Wire aggregates to the shared business-observability dashboards (Ops + merchant, one pipeline) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-17; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | Emit in dev; assert metric/trace/log present; fire the alert with a synthetic breach. |
| Review Checklist | RED + named domain metrics; No PII in labels; Alert links a runbook; Trace propagated via Kafka headers; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Config/code revert; dashboards + alerts are versioned in git. |
| Checkpoint ID | CP-ANL-17 |
| Parallelizable | Yes — within-track order only |

## ANL-18

| Field | Value |
|---|---|
| Task ID | ANL-18 |
| Phase | P2 Module Build |
| Track | ANL · Analytics + Beacon Collector |
| Objective | Marketing-click passthrough logging (tracking_id CTR) to engagement.events. |
| Est (min) | 30 |
| Dependencies | ANL-04 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ANL-04 |
| Outputs | Marketing-click passthrough logging (tracking_id CTR) to engagement.events — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-ANL-18; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/analytics/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-ANL-18 |
| Parallelizable | Yes — within-track order only |

## BFF-01

| Field | Value |
|---|---|
| Task ID | BFF-01 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | BFF service scaffold: OIDC session middleware, role-claim gate, per-downstream circuit breakers + bulkheads. |
| Est (min) | 60 |
| Dependencies | F-07, X-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-07, X-05 |
| Outputs | BFF service scaffold: OIDC session middleware, role-claim gate, per-downstream circuit breakers + bulkheads — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-01; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-BFF-01 |
| Parallelizable | Yes — within-track order only |

## BFF-02

| Field | Value |
|---|---|
| Task ID | BFF-02 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Downstream clients (Config, CRM, Analytics, Bill Store GSI, Dispatch) behind contract fakes for solo build. |
| Est (min) | 60 |
| Dependencies | BFF-01, X-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-01, X-12 |
| Outputs | Downstream clients (Config, CRM, Analytics, Bill Store GSI, Dispatch) behind contract fakes for solo build — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-02; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Unit tests over all branches; property tests where noted; deny-tests for PII-in-logs. |
| Review Checklist | Public API stable; Conventions §1 honoured; No PII in logs/errors; Documented; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Versioned library: pin previous version; new behaviour behind a flag. |
| Checkpoint ID | CP-BFF-02 |
| Parallelizable | Yes — within-track order only |

## BFF-03

| Field | Value |
|---|---|
| Task ID | BFF-03 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Dashboard bills list: GSI-1 queries with date/type/state/channel filters (FSD 6.5). |
| Est (min) | 60 |
| Dependencies | BFF-02, X-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-02, X-05 |
| Outputs | Dashboard bills list: GSI-1 queries with date/type/state/channel filters (FSD 6.5) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-03; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-BFF-03 |
| Parallelizable | Yes — within-track order only |

## BFF-04

| Field | Value |
|---|---|
| Task ID | BFF-04 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Bill detail view (status timeline + urls); scope-checked. |
| Est (min) | 30 |
| Dependencies | BFF-03 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-03 |
| Outputs | Bill detail view (status timeline + urls); scope-checked — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-04; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-BFF-04 |
| Parallelizable | Yes — within-track order only |

## BFF-05

| Field | Value |
|---|---|
| Task ID | BFF-05 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Resend action delegating to Dispatch (audited); legal-state gate mirrored client-side + debounce. |
| Est (min) | 45 |
| Dependencies | BFF-02, DISP-16 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-02, DISP-16 |
| Outputs | Resend action delegating to Dispatch (audited); legal-state gate mirrored client-side + debounce — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-05; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-BFF-05 |
| Parallelizable | Yes — within-track order only |

## BFF-06

| Field | Value |
|---|---|
| Task ID | BFF-06 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Dashboard analytics views from the Analytics query API; 30s per-merchant aggregate cache. |
| Est (min) | 45 |
| Dependencies | BFF-02, ANL-07 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-02, ANL-07 |
| Outputs | Dashboard analytics views from the Analytics query API; 30s per-merchant aggregate cache — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-06; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-BFF-06 |
| Parallelizable | Yes — within-track order only |

## BFF-07

| Field | Value |
|---|---|
| Task ID | BFF-07 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Customer list from CRM lookup API; scope-checked; no raw PII beyond display need. |
| Est (min) | 45 |
| Dependencies | BFF-02, CRM-07 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-02, CRM-07 |
| Outputs | Customer list from CRM lookup API; scope-checked; no raw PII beyond display need — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-07; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-BFF-07 |
| Parallelizable | Yes — within-track order only |

## BFF-08

| Field | Value |
|---|---|
| Task ID | BFF-08 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Config/template UI backing endpoints proxying the Config service; test-generate cache-bypass (F-10). |
| Est (min) | 45 |
| Dependencies | BFF-02, CFG-04 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-02, CFG-04 |
| Outputs | Config/template UI backing endpoints proxying the Config service; test-generate cache-bypass (F-10) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-08; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-BFF-08 |
| Parallelizable | Yes — within-track order only |

## BFF-09

| Field | Value |
|---|---|
| Task ID | BFF-09 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Portal POST /otp: uniform 202 (no enumeration); per-phone + per-IP rate limits (auth Redis). |
| Est (min) | 45 |
| Dependencies | F-18, BFF-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-18, BFF-01 |
| Outputs | Portal POST /otp: uniform 202 (no enumeration); per-phone + per-IP rate limits (auth Redis) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-09; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-BFF-09 |
| Parallelizable | Yes — within-track order only |

## BFF-10

| Field | Value |
|---|---|
| Task ID | BFF-10 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Portal POST /verify: OTP check, attempts cap→lockout; issue single-use session (AC-15). |
| Est (min) | 45 |
| Dependencies | BFF-09 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-09 |
| Outputs | Portal POST /verify: OTP check, attempts cap→lockout; issue single-use session (AC-15) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-10; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-BFF-10 |
| Parallelizable | Yes — within-track order only |

## BFF-11

| Field | Value |
|---|---|
| Task ID | BFF-11 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Portal GET /bills: CRM bills-for-verified-phone; scrubbed entries excluded (410). |
| Est (min) | 45 |
| Dependencies | BFF-10, CRM-07 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-10, CRM-07 |
| Outputs | Portal GET /bills: CRM bills-for-verified-phone; scrubbed entries excluded (410) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-11; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-BFF-11 |
| Parallelizable | Yes — within-track order only |

## BFF-12

| Field | Value |
|---|---|
| Task ID | BFF-12 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Mint surrogate_customer_id (keyed hash of verified phone) for Analytics; key from secrets manager. |
| Est (min) | 30 |
| Dependencies | X-13, BFF-10 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-13, BFF-10 |
| Outputs | Mint surrogate_customer_id (keyed hash of verified phone) for Analytics; key from secrets manager — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-12; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-BFF-12 |
| Parallelizable | Yes — within-track order only |

## BFF-13

| Field | Value |
|---|---|
| Task ID | BFF-13 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Widget survey-submit API → Analytics check-and-record; url_hash capability + per-bill limit. |
| Est (min) | 45 |
| Dependencies | ANL-06, BFF-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ANL-06, BFF-12 |
| Outputs | Widget survey-submit API → Analytics check-and-record; url_hash capability + per-bill limit — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-13; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-BFF-13 |
| Parallelizable | Yes — within-track order only |

## BFF-14

| Field | Value |
|---|---|
| Task ID | BFF-14 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Coupon view-state + marketing click passthrough endpoints. |
| Est (min) | 30 |
| Dependencies | BFF-01, ANL-18 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-01, ANL-18 |
| Outputs | Coupon view-state + marketing click passthrough endpoints — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-14; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Contract tests vs registered schema; auth + merchant-scope tests; error-envelope + idempotency (409) tests. |
| Review Checklist | merchant_id from token only (IDOR); Error envelope §1; Rate-limited; Idempotent where stated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Route behind /v1 + flag: disable the route; contract unchanged so clients see 404-not-500. |
| Checkpoint ID | CP-BFF-14 |
| Parallelizable | Yes — within-track order only |

## BFF-15

| Field | Value |
|---|---|
| Task ID | BFF-15 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Graceful degradation: per-panel error markers on downstream timeout; app never wholly down (bulkheads). |
| Est (min) | 45 |
| Dependencies | BFF-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-02 |
| Outputs | Graceful degradation: per-panel error markers on downstream timeout; app never wholly down (bulkheads) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-15; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-BFF-15 |
| Parallelizable | Yes — within-track order only |

## BFF-16

| Field | Value |
|---|---|
| Task ID | BFF-16 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Error handling: OTP fail-closed honesty; resend race debounce; no lockout-state leak. |
| Est (min) | 30 |
| Dependencies | BFF-10, BFF-15 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-10, BFF-15 |
| Outputs | Error handling: OTP fail-closed honesty; resend race debounce; no lockout-state leak — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-16; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-BFF-16 |
| Parallelizable | Yes — within-track order only |

## BFF-17

| Field | Value |
|---|---|
| Task ID | BFF-17 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Instrument: dashboard p95, portal OTP funnel, per-downstream breaker state, panel-degradation rate. |
| Est (min) | 45 |
| Dependencies | X-14, BFF-03, BFF-10 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-14, BFF-03, BFF-10 |
| Outputs | Instrument: dashboard p95, portal OTP funnel, per-downstream breaker state, panel-degradation rate — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-17; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | Emit in dev; assert metric/trace/log present; fire the alert with a synthetic breach. |
| Review Checklist | RED + named domain metrics; No PII in labels; Alert links a runbook; Trace propagated via Kafka headers; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Config/code revert; dashboards + alerts are versioned in git. |
| Checkpoint ID | CP-BFF-17 |
| Parallelizable | Yes — within-track order only |

## BFF-18

| Field | Value |
|---|---|
| Task ID | BFF-18 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | IDOR suite (centrepiece): every endpoint fuzzed with foreign merchant/bill/contact ids. |
| Est (min) | 90 |
| Dependencies | X-17, BFF-03, BFF-11 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-17, BFF-03, BFF-11 |
| Outputs | IDOR suite (centrepiece): every endpoint fuzzed with foreign merchant/bill/contact ids — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-18; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-BFF-18 |
| Parallelizable | Yes — within-track order only |

## BFF-19

| Field | Value |
|---|---|
| Task ID | BFF-19 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | OTP brute-force + enumeration tests (uniform 202); lockout behaviour (AC-15). |
| Est (min) | 45 |
| Dependencies | BFF-09, BFF-10 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-09, BFF-10 |
| Outputs | OTP brute-force + enumeration tests (uniform 202); lockout behaviour (AC-15) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-19; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-BFF-19 |
| Parallelizable | Yes — within-track order only |

## BFF-20

| Field | Value |
|---|---|
| Task ID | BFF-20 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Role-matrix tests generated from FSD §2 (Staff no analytics/config; Ops read-across audited). |
| Est (min) | 45 |
| Dependencies | BFF-01, CFG-13 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-01, CFG-13 |
| Outputs | Role-matrix tests generated from FSD §2 (Staff no analytics/config; Ops read-across audited) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-20; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-BFF-20 |
| Parallelizable | Yes — within-track order only |

## BFF-21

| Field | Value |
|---|---|
| Task ID | BFF-21 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | Security: session flags (httpOnly/secure/SameSite), CSRF on state-changers, surrogate-key handling. |
| Est (min) | 45 |
| Dependencies | BFF-01, BFF-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-01, BFF-12 |
| Outputs | Security: session flags (httpOnly/secure/SameSite), CSRF on state-changers, surrogate-key handling — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-21; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | IDOR/authz/abuse suite; deny-tests; fuzz foreign ids; verify fail-closed. |
| Review Checklist | Cross-tenant denied; Fail-closed; Secrets from manager; Threat-model row (§9.1) covered; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind flag / config; revert commit; no data migration. |
| Checkpoint ID | CP-BFF-21 |
| Parallelizable | Yes — within-track order only |

## BFF-22

| Field | Value |
|---|---|
| Task ID | BFF-22 |
| Phase | P2 Module Build |
| Track | BFF · Experience BFF |
| Objective | BFF slice demo: dashboard bills+analytics render; portal OTP→bill history; survey submit once. |
| Est (min) | 60 |
| Dependencies | BFF-03, BFF-11, BFF-13, BFF-18 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-03, BFF-11, BFF-13, BFF-18 |
| Outputs | BFF slice demo: dashboard bills+analytics render; portal OTP→bill history; survey submit once — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-BFF-22; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/bff/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-BFF-22 |
| Parallelizable | Yes — within-track order only |

## CMP-01

| Field | Value |
|---|---|
| Task ID | CMP-01 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Compliance service scaffold in the async-workers deployable on isolated schedules/quotas. |
| Est (min) | 45 |
| Dependencies | F-06, X-15 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-06, X-15 |
| Outputs | Compliance service scaffold in the async-workers deployable on isolated schedules/quotas — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-01; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | Provision in dev; smoke-check resource reachable; re-apply is idempotent (no drift). |
| Review Checklist | IaC only (no console changes); Least-privilege IAM; Tagged + cost noted; Multi-AZ where stateful; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Infra is IaC: destroy the scoped module / revert the manifest. No data yet, so teardown is clean. |
| Checkpoint ID | CP-CMP-01 |
| Parallelizable | Yes — within-track order only |

## CMP-02

| Field | Value |
|---|---|
| Task ID | CMP-02 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Scrub scheduler: daily T-90 scan (received_at GSI) → compliance.scrub_due. |
| Est (min) | 45 |
| Dependencies | CMP-01, F-11 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CMP-01, F-11 |
| Outputs | Scrub scheduler: daily T-90 scan (received_at GSI) → compliance.scrub_due — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-02; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | Schema contract test; at-least-once duplicate-delivery test proves handler idempotency. |
| Review Checklist | No PII in payload; Schema registered + versioned; Keyed by merchant_id; Handler idempotent (bill_id,step); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Additive schema; consumer can be disabled with events retained (7d) and replayed. |
| Checkpoint ID | CP-CMP-02 |
| Parallelizable | Yes — within-track order only |

## CMP-03

| Field | Value |
|---|---|
| Task ID | CMP-03 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Scrub executor: null contact_enc + scrubbed_at (FACTS); delete contact_bills + orphan contacts (Vault). |
| Est (min) | 60 |
| Dependencies | CMP-02, ING-02, CRM-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CMP-02, ING-02, CRM-02 |
| Outputs | Scrub executor: null contact_enc + scrubbed_at (FACTS); delete contact_bills + orphan contacts (Vault) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-03; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-CMP-03 |
| Parallelizable | Yes — within-track order only |

## CMP-04

| Field | Value |
|---|---|
| Task ID | CMP-04 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Trigger anonymised re-render (Orchestration re-render worker) + verify across all three surfaces. |
| Est (min) | 45 |
| Dependencies | CMP-03, ORCH-15 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CMP-03, ORCH-15 |
| Outputs | Trigger anonymised re-render (Orchestration re-render worker) + verify across all three surfaces — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-04; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | Schema contract test; at-least-once duplicate-delivery test proves handler idempotency. |
| Review Checklist | No PII in payload; Schema registered + versioned; Keyed by merchant_id; Handler idempotent (bill_id,step); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Additive schema; consumer can be disabled with events retained (7d) and replayed. |
| Checkpoint ID | CP-CMP-04 |
| Parallelizable | Yes — within-track order only |

## CMP-05

| Field | Value |
|---|---|
| Task ID | CMP-05 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Verification step reads Store+Vault+S3 before marking SCRUBBED; else stays DUE for next run. |
| Est (min) | 45 |
| Dependencies | CMP-04 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CMP-04 |
| Outputs | Verification step reads Store+Vault+S3 before marking SCRUBBED; else stays DUE for next run — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-05; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-CMP-05 |
| Parallelizable | Yes — within-track order only |

## CMP-06

| Field | Value |
|---|---|
| Task ID | CMP-06 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Legal-hold list exemption (FSD 5.13 edge) with audited reason; consent-withdrawal early path. |
| Est (min) | 45 |
| Dependencies | CMP-03, CRM-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CMP-03, CRM-05 |
| Outputs | Legal-hold list exemption (FSD 5.13 edge) with audited reason; consent-withdrawal early path — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-06; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-CMP-06 |
| Parallelizable | Yes — within-track order only |

## CMP-07

| Field | Value |
|---|---|
| Task ID | CMP-07 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Reconciliation: metering ledger vs provider reports; drift pages + postmortem ticket. |
| Est (min) | 60 |
| Dependencies | X-15, DISP-09 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-15, DISP-09 |
| Outputs | Reconciliation: metering ledger vs provider reports; drift pages + postmortem ticket — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-07; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | Money-path floor: happy / retry / partial / concurrent / reconciles; seeded drift must page. |
| Review Checklist | Detects each seeded discrepancy class; Nonzero drift pages + opens ticket; Idempotent rerun; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Read-only job: disable schedule; no writes to undo. |
| Checkpoint ID | CP-CMP-07 |
| Parallelizable | Yes — within-track order only |

## CMP-08

| Field | Value |
|---|---|
| Task ID | CMP-08 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Reconciliation: bills vs PG settlement extract (STUBBED until feed confirmed — §12). |
| Est (min) | 45 |
| Dependencies | X-15, ING-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-15, ING-02 |
| Outputs | Reconciliation: bills vs PG settlement extract (STUBBED until feed confirmed — §12) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-08; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | Money-path floor: happy / retry / partial / concurrent / reconciles; seeded drift must page. |
| Review Checklist | Detects each seeded discrepancy class; Nonzero drift pages + opens ticket; Idempotent rerun; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Read-only job: disable schedule; no writes to undo. |
| Checkpoint ID | CP-CMP-08 |
| Parallelizable | Yes — within-track order only |

## CMP-09

| Field | Value |
|---|---|
| Task ID | CMP-09 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Reconciliation: ΣCN≤total, event-vs-STATUS counts, scrub completeness = the T-90+1d SLO. |
| Est (min) | 60 |
| Dependencies | X-15, CMP-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-15, CMP-05 |
| Outputs | Reconciliation: ΣCN≤total, event-vs-STATUS counts, scrub completeness = the T-90+1d SLO — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-09; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | Money-path floor: happy / retry / partial / concurrent / reconciles; seeded drift must page. |
| Review Checklist | Detects each seeded discrepancy class; Nonzero drift pages + opens ticket; Idempotent rerun; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Read-only job: disable schedule; no writes to undo. |
| Checkpoint ID | CP-CMP-09 |
| Parallelizable | Yes — within-track order only |

## CMP-10

| Field | Value |
|---|---|
| Task ID | CMP-10 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Backup-retention enforcement (Review F-4): assert PII-store backup age+90 ≤ ceiling; drift alarms. |
| Est (min) | 45 |
| Dependencies | F-09, CMP-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-09, CMP-01 |
| Outputs | Backup-retention enforcement (Review F-4): assert PII-store backup age+90 ≤ ceiling; drift alarms — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-10; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-CMP-10 |
| Parallelizable | Yes — within-track order only |

## CMP-11

| Field | Value |
|---|---|
| Task ID | CMP-11 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Cold-tiering job: FACTS past hot window → object storage (Blueprint §4.2). |
| Est (min) | 45 |
| Dependencies | F-19, CMP-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-19, CMP-01 |
| Outputs | Cold-tiering job: FACTS past hot window → object storage (Blueprint §4.2) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-11; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-CMP-11 |
| Parallelizable | Yes — within-track order only |

## CMP-12

| Field | Value |
|---|---|
| Task ID | CMP-12 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Ship job runs + scrub.completed + recon results to the audit stream. |
| Est (min) | 30 |
| Dependencies | F-23, CMP-03, CMP-07 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-23, CMP-03, CMP-07 |
| Outputs | Ship job runs + scrub.completed + recon results to the audit stream — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-12; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-CMP-12 |
| Parallelizable | Yes — within-track order only |

## CMP-13

| Field | Value |
|---|---|
| Task ID | CMP-13 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Error handling: partial scrub converges on rerun (idempotent); late provider report→UNRECONCILED+alert. |
| Est (min) | 30 |
| Dependencies | CMP-03, CMP-07 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CMP-03, CMP-07 |
| Outputs | Error handling: partial scrub converges on rerun (idempotent); late provider report→UNRECONCILED+alert — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-13; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-CMP-13 |
| Parallelizable | Yes — within-track order only |

## CMP-14

| Field | Value |
|---|---|
| Task ID | CMP-14 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Instrument: scrub cohort completion, unscrubbed-past-deadline (SLO), recon drift counters. |
| Est (min) | 45 |
| Dependencies | X-14, CMP-05, CMP-09 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-14, CMP-05, CMP-09 |
| Outputs | Instrument: scrub cohort completion, unscrubbed-past-deadline (SLO), recon drift counters — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-14; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | Emit in dev; assert metric/trace/log present; fire the alert with a synthetic breach. |
| Review Checklist | RED + named domain metrics; No PII in labels; Alert links a runbook; Trace propagated via Kafka headers; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Config/code revert; dashboards + alerts are versioned in git. |
| Checkpoint ID | CP-CMP-14 |
| Parallelizable | Yes — within-track order only |

## CMP-15

| Field | Value |
|---|---|
| Task ID | CMP-15 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Scrub idempotence + partial-failure tests (kill mid-bill→rerun converges) (AC-14); legal-hold exemption. |
| Est (min) | 60 |
| Dependencies | CMP-05, CMP-06 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CMP-05, CMP-06 |
| Outputs | Scrub idempotence + partial-failure tests (kill mid-bill→rerun converges) (AC-14); legal-hold exemption — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-15; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-CMP-15 |
| Parallelizable | Yes — within-track order only |

## CMP-16

| Field | Value |
|---|---|
| Task ID | CMP-16 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Reconciliation property tests: seeded discrepancy of each class is detected. |
| Est (min) | 60 |
| Dependencies | CMP-07, CMP-09 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CMP-07, CMP-09 |
| Outputs | Reconciliation property tests: seeded discrepancy of each class is detected — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-16; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-CMP-16 |
| Parallelizable | Yes — within-track order only |

## CMP-17

| Field | Value |
|---|---|
| Task ID | CMP-17 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Security: unique workload identity holds the only Vault-delete/FACTS-mutate grants; 100% audit coverage. |
| Est (min) | 45 |
| Dependencies | CMP-03, CMP-12 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CMP-03, CMP-12 |
| Outputs | Security: unique workload identity holds the only Vault-delete/FACTS-mutate grants; 100% audit coverage — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-17; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | IDOR/authz/abuse suite; deny-tests; fuzz foreign ids; verify fail-closed. |
| Review Checklist | Cross-tenant denied; Fail-closed; Secrets from manager; Threat-model row (§9.1) covered; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind flag / config; revert commit; no data migration. |
| Checkpoint ID | CP-CMP-17 |
| Parallelizable | Yes — within-track order only |

## CMP-18

| Field | Value |
|---|---|
| Task ID | CMP-18 |
| Phase | P2 Module Build |
| Track | CMP · Compliance Jobs |
| Objective | Compliance slice demo: seed T-90 bill → scrub (null+delete+anonymise+verify) → audit; recon pages on seeded drift. |
| Est (min) | 60 |
| Dependencies | CMP-05, CMP-15, CMP-16 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CMP-05, CMP-15, CMP-16 |
| Outputs | Compliance slice demo: seed T-90 bill → scrub (null+delete+anonymise+verify) → audit; recon pages on seeded drift — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-CMP-18; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | services/compliance/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-CMP-18 |
| Parallelizable | Yes — within-track order only |

# Phase: P3 Integration

## INT-01

| Field | Value |
|---|---|
| Task ID | INT-01 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | Wire the real Event Relay across Ingestion/Orchestration/Dispatch (replace fakes). |
| Est (min) | 60 |
| Dependencies | ING-24, ORCH-24, DISP-24 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-24, ORCH-24, DISP-24 |
| Outputs | Wire the real Event Relay across Ingestion/Orchestration/Dispatch (replace fakes) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-01; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-INT-01 |
| Parallelizable | Sequential-ish |

## INT-02

| Field | Value |
|---|---|
| Task ID | INT-02 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | E2E: PG callback (stub hash) → receipt generated → delivered; trace spans whole path. |
| Est (min) | 60 |
| Dependencies | INT-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: INT-01 |
| Outputs | E2E: PG callback (stub hash) → receipt generated → delivered; trace spans whole path — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-02; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-INT-02 |
| Parallelizable | Sequential-ish |

## INT-03

| Field | Value |
|---|---|
| Task ID | INT-03 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | E2E: direct API → tax invoice (calc+GST) → delivered; line-items-required reject path. |
| Est (min) | 60 |
| Dependencies | INT-01, CFG-20 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: INT-01, CFG-20 |
| Outputs | E2E: direct API → tax invoice (calc+GST) → delivered; line-items-required reject path — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-03; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-INT-03 |
| Parallelizable | Sequential-ish |

## INT-04

| Field | Value |
|---|---|
| Task ID | INT-04 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | E2E: duplicate callback → one bill, one send, one meter (AC-2). |
| Est (min) | 45 |
| Dependencies | INT-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: INT-02 |
| Outputs | E2E: duplicate callback → one bill, one send, one meter (AC-2) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-04; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-INT-04 |
| Parallelizable | Sequential-ish |

## INT-05

| Field | Value |
|---|---|
| Task ID | INT-05 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | E2E: WhatsApp-down → SMS failover → dashboard note (AC-7). |
| Est (min) | 45 |
| Dependencies | INT-02, DISP-24 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: INT-02, DISP-24 |
| Outputs | E2E: WhatsApp-down → SMS failover → dashboard note (AC-7) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-05; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-INT-05 |
| Parallelizable | Sequential-ish |

## INT-06

| Field | Value |
|---|---|
| Task ID | INT-06 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | E2E: all channels fail → Failed status, URL still live (AC-8). |
| Est (min) | 30 |
| Dependencies | INT-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: INT-05 |
| Outputs | E2E: all channels fail → Failed status, URL still live (AC-8) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-06; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-INT-06 |
| Parallelizable | Sequential-ish |

## INT-07

| Field | Value |
|---|---|
| Task ID | INT-07 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | E2E: bill view via CDN + lazy PDF + engagement beacon → aggregate (AC-16). |
| Est (min) | 45 |
| Dependencies | INT-02, ANL-16, ORCH-24 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: INT-02, ANL-16, ORCH-24 |
| Outputs | E2E: bill view via CDN + lazy PDF + engagement beacon → aggregate (AC-16) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-07; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-INT-07 |
| Parallelizable | Sequential-ish |

## INT-08

| Field | Value |
|---|---|
| Task ID | INT-08 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | E2E: OTP portal → bill history → open bill (AC-15). |
| Est (min) | 45 |
| Dependencies | BFF-22, CRM-14 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: BFF-22, CRM-14 |
| Outputs | E2E: OTP portal → bill history → open bill (AC-15) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-08; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-INT-08 |
| Parallelizable | Sequential-ish |

## INT-09

| Field | Value |
|---|---|
| Task ID | INT-09 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | E2E: consented contact → CRM profile + link (AC-9); withdrawal → early scrub. |
| Est (min) | 45 |
| Dependencies | CRM-14, CMP-18 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CRM-14, CMP-18 |
| Outputs | E2E: consented contact → CRM profile + link (AC-9); withdrawal → early scrub — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-09; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-INT-09 |
| Parallelizable | Sequential-ish |

## INT-10

| Field | Value |
|---|---|
| Task ID | INT-10 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | E2E: refund → linked credit note, original immutable, cap enforced (AC-11,12). |
| Est (min) | 45 |
| Dependencies | INT-03 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: INT-03 |
| Outputs | E2E: refund → linked credit note, original immutable, cap enforced (AC-11,12) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-10; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-INT-10 |
| Parallelizable | Sequential-ish |

## INT-11

| Field | Value |
|---|---|
| Task ID | INT-11 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | E2E: age a bill to T-90 → scrub → PII unrecoverable in active stores, URL anonymised (AC-14). |
| Est (min) | 45 |
| Dependencies | CMP-18, INT-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CMP-18, INT-02 |
| Outputs | E2E: age a bill to T-90 → scrub → PII unrecoverable in active stores, URL anonymised (AC-14) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-11; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-INT-11 |
| Parallelizable | Sequential-ish |

## INT-12

| Field | Value |
|---|---|
| Task ID | INT-12 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | E2E: offline batch flush → exactly-once, sale-time timestamps (AC-10). |
| Est (min) | 45 |
| Dependencies | ING-15, INT-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-15, INT-01 |
| Outputs | E2E: offline batch flush → exactly-once, sale-time timestamps (AC-10) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-12; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-INT-12 |
| Parallelizable | Sequential-ish |

## INT-13

| Field | Value |
|---|---|
| Task ID | INT-13 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | E2E: per-transaction template_id override renders on chosen template (AC-20). |
| Est (min) | 30 |
| Dependencies | INT-03, CFG-20 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: INT-03, CFG-20 |
| Outputs | E2E: per-transaction template_id override renders on chosen template (AC-20) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-13; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-INT-13 |
| Parallelizable | Sequential-ish |

## INT-14

| Field | Value |
|---|---|
| Task ID | INT-14 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | Wire the synthetic canary merchant to the real path; 1-min whole-path probe green in staging. |
| Est (min) | 45 |
| Dependencies | INT-02, F-24 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: INT-02, F-24 |
| Outputs | Wire the synthetic canary merchant to the real path; 1-min whole-path probe green in staging — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-14; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-INT-14 |
| Parallelizable | Sequential-ish |

## INT-15

| Field | Value |
|---|---|
| Task ID | INT-15 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | Bring reconciliation jobs live in staging against fixtures; confirm they page on seeded drift. |
| Est (min) | 45 |
| Dependencies | CMP-16, INT-02 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CMP-16, INT-02 |
| Outputs | Bring reconciliation jobs live in staging against fixtures; confirm they page on seeded drift — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-15; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-INT-15 |
| Parallelizable | Sequential-ish |

## INT-16

| Field | Value |
|---|---|
| Task ID | INT-16 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | Run the full FSD AC suite (AC-1..24) in staging; close the AC→test coverage report to 100%. |
| Est (min) | 90 |
| Dependencies | X-19, INT-02, INT-03, INT-08 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-19, INT-02, INT-03, INT-08 |
| Outputs | Run the full FSD AC suite (AC-1..24) in staging; close the AC→test coverage report to 100% — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-16; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | This task IS tests: they must fail on a seeded regression before they pass clean. |
| Review Checklist | Covers the ACs listed; Negative + concurrency cases; Deterministic (no flakes); Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Tests only: revert commit. |
| Checkpoint ID | CP-INT-16 |
| Parallelizable | Sequential-ish |

## INT-17

| Field | Value |
|---|---|
| Task ID | INT-17 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | Freeze v1 API + event schemas; publish deprecation policy (ADR-6); tag registry. |
| Est (min) | 45 |
| Dependencies | INT-16 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: INT-16 |
| Outputs | Freeze v1 API + event schemas; publish deprecation policy (ADR-6); tag registry — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-17; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-INT-17 |
| Parallelizable | Sequential-ish |

## INT-18

| Field | Value |
|---|---|
| Task ID | INT-18 |
| Phase | P3 Integration |
| Track | INT · Integration & E2E |
| Objective | Integration milestone: every FSD AC green end-to-end in staging; canary + recon live. |
| Est (min) | 60 |
| Dependencies | INT-14, INT-15, INT-16 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: INT-14, INT-15, INT-16 |
| Outputs | Integration milestone: every FSD AC green end-to-end in staging; canary + recon live — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-INT-18; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | e2e/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-INT-18 |
| Parallelizable | Sequential-ish |

# Phase: P4 Hardening

## HRD-01

| Field | Value |
|---|---|
| Task ID | HRD-01 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | Load test at T1 (500 peak): ACK<200ms, gen p95<2s; record baseline. |
| Est (min) | 90 |
| Dependencies | INT-18, F-25 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: INT-18, F-25 |
| Outputs | Load test at T1 (500 peak): ACK<200ms, gen p95<2s; record baseline — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-01; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Load test at the tier target; assert p95 within the TDS budget; record numbers. |
| Review Checklist | Budget from TDS met; Hot path unblocked; Results recorded in the perf log; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Measurement/tuning task: revert tuning params; no behavioural change. |
| Checkpoint ID | CP-HRD-01 |
| Parallelizable | Yes |

## HRD-02

| Field | Value |
|---|---|
| Task ID | HRD-02 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | Hot-merchant load test: one merchant's rush cannot starve others (per-merchant limits verified). |
| Est (min) | 60 |
| Dependencies | HRD-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: HRD-01 |
| Outputs | Hot-merchant load test: one merchant's rush cannot starve others (per-merchant limits verified) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-02; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Load test at the tier target; assert p95 within the TDS budget; record numbers. |
| Review Checklist | Budget from TDS met; Hot path unblocked; Results recorded in the perf log; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Measurement/tuning task: revert tuning params; no behavioural change. |
| Checkpoint ID | CP-HRD-02 |
| Parallelizable | Yes |

## HRD-03

| Field | Value |
|---|---|
| Task ID | HRD-03 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | Duplicate-callback-storm test: idempotency + rate-limit absorb it with no dupes. |
| Est (min) | 60 |
| Dependencies | HRD-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: HRD-01 |
| Outputs | Duplicate-callback-storm test: idempotency + rate-limit absorb it with no dupes — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-03; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Load test at the tier target; assert p95 within the TDS budget; record numbers. |
| Review Checklist | Budget from TDS met; Hot path unblocked; Results recorded in the perf log; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Measurement/tuning task: revert tuning params; no behavioural change. |
| Checkpoint ID | CP-HRD-03 |
| Parallelizable | Yes |

## HRD-04

| Field | Value |
|---|---|
| Task ID | HRD-04 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | Beacon firehose test at opens≈0.7×sends; collector holds 5ms p95. |
| Est (min) | 45 |
| Dependencies | HRD-01, ANL-14 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: HRD-01, ANL-14 |
| Outputs | Beacon firehose test at opens≈0.7×sends; collector holds 5ms p95 — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-04; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Load test at the tier target; assert p95 within the TDS budget; record numbers. |
| Review Checklist | Budget from TDS met; Hot path unblocked; Results recorded in the perf log; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Measurement/tuning task: revert tuning params; no behavioural change. |
| Checkpoint ID | CP-HRD-04 |
| Parallelizable | Yes |

## HRD-05

| Field | Value |
|---|---|
| Task ID | HRD-05 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | Scale test at 2× T1 to validate the tier-promotion path (partitions/replicas) without repartition pain. |
| Est (min) | 60 |
| Dependencies | HRD-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: HRD-01 |
| Outputs | Scale test at 2× T1 to validate the tier-promotion path (partitions/replicas) without repartition pain — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-05; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Load test at the tier target; assert p95 within the TDS budget; record numbers. |
| Review Checklist | Budget from TDS met; Hot path unblocked; Results recorded in the perf log; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Measurement/tuning task: revert tuning params; no behavioural change. |
| Checkpoint ID | CP-HRD-05 |
| Parallelizable | Yes |

## HRD-06

| Field | Value |
|---|---|
| Task ID | HRD-06 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | Chaos: kill render pods under load → lag recovers, no bill lost. |
| Est (min) | 45 |
| Dependencies | F-26, INT-18 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-26, INT-18 |
| Outputs | Chaos: kill render pods under load → lag recovers, no bill lost — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-06; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Load test at the tier target; assert p95 within the TDS budget; record numbers. |
| Review Checklist | Budget from TDS met; Hot path unblocked; Results recorded in the perf log; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Measurement/tuning task: revert tuning params; no behavioural change. |
| Checkpoint ID | CP-HRD-06 |
| Parallelizable | Yes |

## HRD-07

| Field | Value |
|---|---|
| Task ID | HRD-07 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | Chaos: drop a Kafka broker → RF=3 self-heals; outbox fallback holds ACK path. |
| Est (min) | 45 |
| Dependencies | F-26, INT-18 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-26, INT-18 |
| Outputs | Chaos: drop a Kafka broker → RF=3 self-heals; outbox fallback holds ACK path — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-07; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Load test at the tier target; assert p95 within the TDS budget; record numbers. |
| Review Checklist | Budget from TDS met; Hot path unblocked; Results recorded in the perf log; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Measurement/tuning task: revert tuning params; no behavioural change. |
| Checkpoint ID | CP-HRD-07 |
| Parallelizable | Yes |

## HRD-08

| Field | Value |
|---|---|
| Task ID | HRD-08 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | Chaos: throttle Bill Store → backpressure via queue, ACK path unaffected until buffer limits. |
| Est (min) | 45 |
| Dependencies | F-26, INT-18 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-26, INT-18 |
| Outputs | Chaos: throttle Bill Store → backpressure via queue, ACK path unaffected until buffer limits — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-08; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Load test at the tier target; assert p95 within the TDS budget; record numbers. |
| Review Checklist | Budget from TDS met; Hot path unblocked; Results recorded in the perf log; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Measurement/tuning task: revert tuning params; no behavioural change. |
| Checkpoint ID | CP-HRD-08 |
| Parallelizable | Yes |

## HRD-09

| Field | Value |
|---|---|
| Task ID | HRD-09 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | Chaos: kill cache Redis → replica fallback (renders slower, correct); auth Redis isolated (OTP unaffected-scope). |
| Est (min) | 45 |
| Dependencies | F-26, INT-18 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-26, INT-18 |
| Outputs | Chaos: kill cache Redis → replica fallback (renders slower, correct); auth Redis isolated (OTP unaffected-scope) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-09; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Load test at the tier target; assert p95 within the TDS budget; record numbers. |
| Review Checklist | Budget from TDS met; Hot path unblocked; Results recorded in the perf log; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Measurement/tuning task: revert tuning params; no behavioural change. |
| Checkpoint ID | CP-HRD-09 |
| Parallelizable | Yes |

## HRD-10

| Field | Value |
|---|---|
| Task ID | HRD-10 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | Chaos: BSP brownout → breaker→SMS failover; cost delta surfaced. |
| Est (min) | 45 |
| Dependencies | F-26, DISP-24 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-26, DISP-24 |
| Outputs | Chaos: BSP brownout → breaker→SMS failover; cost delta surfaced — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-10; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Load test at the tier target; assert p95 within the TDS budget; record numbers. |
| Review Checklist | Budget from TDS met; Hot path unblocked; Results recorded in the perf log; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Measurement/tuning task: revert tuning params; no behavioural change. |
| Checkpoint ID | CP-HRD-10 |
| Parallelizable | Yes |

## HRD-11

| Field | Value |
|---|---|
| Task ID | HRD-11 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | Execute the §9.1 threat model as a test pass: PII exfil, template injection, SSRF, OTP abuse, enumeration. |
| Est (min) | 90 |
| Dependencies | X-17, INT-18 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-17, INT-18 |
| Outputs | Execute the §9.1 threat model as a test pass: PII exfil, template injection, SSRF, OTP abuse, enumeration — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-11; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | IDOR/authz/abuse suite; deny-tests; fuzz foreign ids; verify fail-closed. |
| Review Checklist | Cross-tenant denied; Fail-closed; Secrets from manager; Threat-model row (§9.1) covered; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind flag / config; revert commit; no data migration. |
| Checkpoint ID | CP-HRD-11 |
| Parallelizable | Yes |

## HRD-12

| Field | Value |
|---|---|
| Task ID | HRD-12 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | External-style pen-test pass on gateway/portal/callback surfaces; triage + fix. |
| Est (min) | 90 |
| Dependencies | HRD-11 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: HRD-11 |
| Outputs | External-style pen-test pass on gateway/portal/callback surfaces; triage + fix — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-12; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | IDOR/authz/abuse suite; deny-tests; fuzz foreign ids; verify fail-closed. |
| Review Checklist | Cross-tenant denied; Fail-closed; Secrets from manager; Threat-model row (§9.1) covered; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind flag / config; revert commit; no data migration. |
| Checkpoint ID | CP-HRD-12 |
| Parallelizable | Yes |

## HRD-13

| Field | Value |
|---|---|
| Task ID | HRD-13 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | PII-in-logs/traces/events audit: seeded-violation CI gate demonstrably fails; fix any real leak. |
| Est (min) | 60 |
| Dependencies | F-22, INT-18 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-22, INT-18 |
| Outputs | PII-in-logs/traces/events audit: seeded-violation CI gate demonstrably fails; fix any real leak — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-13; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | IDOR/authz/abuse suite; deny-tests; fuzz foreign ids; verify fail-closed. |
| Review Checklist | Cross-tenant denied; Fail-closed; Secrets from manager; Threat-model row (§9.1) covered; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind flag / config; revert commit; no data migration. |
| Checkpoint ID | CP-HRD-13 |
| Parallelizable | Yes |

## HRD-14

| Field | Value |
|---|---|
| Task ID | HRD-14 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | Secret-rotation drill (dual-secret window, zero downtime) for PG HMAC + provider keys + DB creds. |
| Est (min) | 60 |
| Dependencies | X-13, INT-18 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-13, INT-18 |
| Outputs | Secret-rotation drill (dual-secret window, zero downtime) for PG HMAC + provider keys + DB creds — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-14; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-HRD-14 |
| Parallelizable | Yes |

## HRD-15

| Field | Value |
|---|---|
| Task ID | HRD-15 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | DR game-day: promote the warm-standby region against synthetic traffic; measure RTO≤1h/RPO≤5m. |
| Est (min) | 90 |
| Dependencies | F-05, INT-14 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-05, INT-14 |
| Outputs | DR game-day: promote the warm-standby region against synthetic traffic; measure RTO≤1h/RPO≤5m — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-15; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-HRD-15 |
| Parallelizable | Yes |

## HRD-16

| Field | Value |
|---|---|
| Task ID | HRD-16 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | DR drill: PITR restore of Config DB + Vault to a point; verify integrity. |
| Est (min) | 60 |
| Dependencies | F-13, F-14 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: F-13, F-14 |
| Outputs | DR drill: PITR restore of Config DB + Vault to a point; verify integrity — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-16; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-HRD-16 |
| Parallelizable | Yes |

## HRD-17

| Field | Value |
|---|---|
| Task ID | HRD-17 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | Verify deterministic bill_id converges duplicates across a simulated cross-region failover window (Review F-3). |
| Est (min) | 45 |
| Dependencies | X-02, HRD-15 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: X-02, HRD-15 |
| Outputs | Verify deterministic bill_id converges duplicates across a simulated cross-region failover window (Review F-3) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-17; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Load test at the tier target; assert p95 within the TDS budget; record numbers. |
| Review Checklist | Budget from TDS met; Hot path unblocked; Results recorded in the perf log; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Measurement/tuning task: revert tuning params; no behavioural change. |
| Checkpoint ID | CP-HRD-17 |
| Parallelizable | Yes |

## HRD-18

| Field | Value |
|---|---|
| Task ID | HRD-18 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | Build the per-tier cost model incl. WhatsApp unit economics vs ₹0.50/bill; flag margin risk (Review F-9). |
| Est (min) | 60 |
| Dependencies | DISP-20 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: DISP-20 |
| Outputs | Build the per-tier cost model incl. WhatsApp unit economics vs ₹0.50/bill; flag margin risk (Review F-9) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-18; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-HRD-18 |
| Parallelizable | Yes |

## HRD-19

| Field | Value |
|---|---|
| Task ID | HRD-19 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | Author on-call runbooks for every paged alert; verify each is stranger-executable (methodology Card 8). |
| Est (min) | 90 |
| Dependencies | HRD-06, HRD-11 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: HRD-06, HRD-11 |
| Outputs | Author on-call runbooks for every paged alert; verify each is stranger-executable (methodology Card 8) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-19; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-HRD-19 |
| Parallelizable | Yes |

## HRD-20

| Field | Value |
|---|---|
| Task ID | HRD-20 |
| Phase | P4 Hardening |
| Track | HRD · Hardening (perf/sec/chaos/DR) |
| Objective | Hardening milestone: load+chaos+security+DR all passed and recorded; cost model approved. |
| Est (min) | 60 |
| Dependencies | HRD-05, HRD-11, HRD-15, HRD-18 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: HRD-05, HRD-11, HRD-15, HRD-18 |
| Outputs | Hardening milestone: load+chaos+security+DR all passed and recorded; cost model approved — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-HRD-20; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | (cross-cutting) |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-HRD-20 |
| Parallelizable | Yes |

# Phase: P5 Launch

## LNCH-01

| Field | Value |
|---|---|
| Task ID | LNCH-01 |
| Phase | P5 Launch |
| Track | LNCH · Launch Readiness |
| Objective | Close build-time blocker: integrate real PG secureHash spec; remove hash-stub flag (release gate). |
| Est (min) | 60 |
| Dependencies | ING-04, HRD-14 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: ING-04, HRD-14 |
| Outputs | Close build-time blocker: integrate real PG secureHash spec; remove hash-stub flag (release gate) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-LNCH-01; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | ops/, docs/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-LNCH-01 |
| Parallelizable | Sequential-ish |

## LNCH-02

| Field | Value |
|---|---|
| Task ID | LNCH-02 |
| Phase | P5 Launch |
| Track | LNCH · Launch Readiness |
| Objective | Close blocker: wire the real PG settlement extract into bills-vs-PG recon. |
| Est (min) | 45 |
| Dependencies | CMP-08 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CMP-08 |
| Outputs | Close blocker: wire the real PG settlement extract into bills-vs-PG recon — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-LNCH-02; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | ops/, docs/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-LNCH-02 |
| Parallelizable | Sequential-ish |

## LNCH-03

| Field | Value |
|---|---|
| Task ID | LNCH-03 |
| Phase | P5 Launch |
| Track | LNCH · Launch Readiness |
| Objective | Close blocker: apply Legal's DPDP backup-retention ceiling to the enforcement job. |
| Est (min) | 30 |
| Dependencies | CMP-10 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CMP-10 |
| Outputs | Close blocker: apply Legal's DPDP backup-retention ceiling to the enforcement job — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-LNCH-03; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | ops/, docs/ |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-LNCH-03 |
| Parallelizable | Sequential-ish |

## LNCH-04

| Field | Value |
|---|---|
| Task ID | LNCH-04 |
| Phase | P5 Launch |
| Track | LNCH · Launch Readiness |
| Objective | Apply ratified peak-TPS target to fleet sizing + autoscaler bounds per tier. |
| Est (min) | 45 |
| Dependencies | HRD-05 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: HRD-05 |
| Outputs | Apply ratified peak-TPS target to fleet sizing + autoscaler bounds per tier — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-LNCH-04; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | ops/, docs/ |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-LNCH-04 |
| Parallelizable | Sequential-ish |

## LNCH-05

| Field | Value |
|---|---|
| Task ID | LNCH-05 |
| Phase | P5 Launch |
| Track | LNCH · Launch Readiness |
| Objective | Apply the ratified permanent-URL-vs-scrub ruling; adjust Compliance executor + PDF 410 if changed. |
| Est (min) | 45 |
| Dependencies | CMP-04 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CMP-04 |
| Outputs | Apply the ratified permanent-URL-vs-scrub ruling; adjust Compliance executor + PDF 410 if changed — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-LNCH-05; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | ops/, docs/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-LNCH-05 |
| Parallelizable | Sequential-ish |

## LNCH-06

| Field | Value |
|---|---|
| Task ID | LNCH-06 |
| Phase | P5 Launch |
| Track | LNCH · Launch Readiness |
| Objective | Finalise the default industry template set with Design; replace the seed. |
| Est (min) | 60 |
| Dependencies | CFG-11 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: CFG-11 |
| Outputs | Finalise the default industry template set with Design; replace the seed — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-LNCH-06; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | ops/, docs/ |
| Testing Requirements | Unit tests incl. every FSD edge case cited; branch coverage on decision points. |
| Review Checklist | Matches cited FSD rule; Invariants held; Money as integer paise; Deterministic; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Behind a feature flag; revert commit; no schema change to undo. |
| Checkpoint ID | CP-LNCH-06 |
| Parallelizable | Sequential-ish |

## LNCH-07

| Field | Value |
|---|---|
| Task ID | LNCH-07 |
| Phase | P5 Launch |
| Track | LNCH · Launch Readiness |
| Objective | Merchant onboarding flow validated end-to-end (config→first bill) for a pilot cohort. |
| Est (min) | 60 |
| Dependencies | INT-18, CFG-20 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: INT-18, CFG-20 |
| Outputs | Merchant onboarding flow validated end-to-end (config→first bill) for a pilot cohort — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-LNCH-07; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | ops/, docs/ |
| Testing Requirements | End-to-end slice against real deps; assert the named ACs; exercise one failure path. |
| Review Checklist | Contracts honoured both sides; Failure path exercised; Trace spans whole slice; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Wiring behind a flag: revert to fakes/stubs; module code unchanged. |
| Checkpoint ID | CP-LNCH-07 |
| Parallelizable | Sequential-ish |

## LNCH-08

| Field | Value |
|---|---|
| Task ID | LNCH-08 |
| Phase | P5 Launch |
| Track | LNCH · Launch Readiness |
| Objective | Walk the Blueprint §22 review checklist to sign-off; close items 1–14. |
| Est (min) | 60 |
| Dependencies | HRD-20, LNCH-01 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: HRD-20, LNCH-01 |
| Outputs | Walk the Blueprint §22 review checklist to sign-off; close items 1–14 — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-LNCH-08; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | ops/, docs/ |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-LNCH-08 |
| Parallelizable | Sequential-ish |

## LNCH-09

| Field | Value |
|---|---|
| Task ID | LNCH-09 |
| Phase | P5 Launch |
| Track | LNCH · Launch Readiness |
| Objective | Enable the synthetic canary in prod; alerting on the whole-path probe. |
| Est (min) | 30 |
| Dependencies | INT-14, LNCH-08 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: INT-14, LNCH-08 |
| Outputs | Enable the synthetic canary in prod; alerting on the whole-path probe — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-LNCH-09; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | ops/, docs/ |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-LNCH-09 |
| Parallelizable | Sequential-ish |

## LNCH-10

| Field | Value |
|---|---|
| Task ID | LNCH-10 |
| Phase | P5 Launch |
| Track | LNCH · Launch Readiness |
| Objective | Reconciliation jobs live in prod BEFORE the first paying merchant (checklist #13). |
| Est (min) | 45 |
| Dependencies | INT-15, LNCH-08 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: INT-15, LNCH-08 |
| Outputs | Reconciliation jobs live in prod BEFORE the first paying merchant (checklist #13) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-LNCH-10; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | ops/, docs/ |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-LNCH-10 |
| Parallelizable | Sequential-ish |

## LNCH-11

| Field | Value |
|---|---|
| Task ID | LNCH-11 |
| Phase | P5 Launch |
| Track | LNCH · Launch Readiness |
| Objective | Progressive rollout: pilot merchants → 5% → 25% → 100% keyed on SLO burn. |
| Est (min) | 60 |
| Dependencies | LNCH-09, LNCH-10 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: LNCH-09, LNCH-10 |
| Outputs | Progressive rollout: pilot merchants → 5% → 25% → 100% keyed on SLO burn — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-LNCH-11; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | ops/, docs/ |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-LNCH-11 |
| Parallelizable | Sequential-ish |

## LNCH-12

| Field | Value |
|---|---|
| Task ID | LNCH-12 |
| Phase | P5 Launch |
| Track | LNCH · Launch Readiness |
| Objective | Publish prod SLO dashboards + error-budget policy; on-call rotation live. |
| Est (min) | 45 |
| Dependencies | HRD-19, LNCH-09 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: HRD-19, LNCH-09 |
| Outputs | Publish prod SLO dashboards + error-budget policy; on-call rotation live — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-LNCH-12; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | ops/, docs/ |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-LNCH-12 |
| Parallelizable | Sequential-ish |

## LNCH-13

| Field | Value |
|---|---|
| Task ID | LNCH-13 |
| Phase | P5 Launch |
| Track | LNCH · Launch Readiness |
| Objective | First prod game-day (chaos-lite + DR check) within the launch window. |
| Est (min) | 60 |
| Dependencies | LNCH-11 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: LNCH-11 |
| Outputs | First prod game-day (chaos-lite + DR check) within the launch window — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-LNCH-13; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | ops/, docs/ |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-LNCH-13 |
| Parallelizable | Sequential-ish |

## LNCH-14

| Field | Value |
|---|---|
| Task ID | LNCH-14 |
| Phase | P5 Launch |
| Track | LNCH · Launch Readiness |
| Objective | Launch retrospective + decision record; open a fast-follow register (itemized/tax enrichment, warehouse T2). |
| Est (min) | 45 |
| Dependencies | LNCH-11 |
| Inputs | FSD v1.0, Architecture Blueprint v1.1+review, TDS v1.0; outputs of: LNCH-11 |
| Outputs | Launch retrospective + decision record; open a fast-follow register (itemized/tax enrichment, warehouse T2) — committed, tested, reviewed. |
| Definition of Done | Objective met and demonstrated at checkpoint CP-LNCH-14; tests in 'Testing' green in CI; review checklist passed; merged behind flag where applicable; observability emitting. |
| Files Affected | ops/, docs/ |
| Testing Requirements | Dry-run / game-day executes end-to-end from the written steps by someone who didn't write them. |
| Review Checklist | Stranger-executable (no tribal knowledge); Failure recovery included; Volatile specifics dated; Conventions §1 honoured; observability present; checkpoint demoable; no secrets in code. |
| Rollback Strategy | Doc/runbook: git revert. |
| Checkpoint ID | CP-LNCH-14 |
| Parallelizable | Sequential-ish |

---

# Tracks & Parallelism

| Phase | Track Code | Track | Depends On | Feeds | Parallelism | Task Count |
|---|---|---|---|---|---|---|
| P0 | F | Foundation & Platform | — (starts first) | Blocks everything | Internally sequential-ish | 26 |
| P1 | X | Cross-Cutting Shared Libraries | F | Blocks all module tracks | Some parallel | 20 |
| P2 | ING | Ingestion + Event Relay | X | INT | Parallel with other P2 tracks | 24 |
| P2 | ORCH | Orchestration & Rendering | X | INT | Parallel with other P2 tracks | 24 |
| P2 | DISP | Dispatch | X | INT | Parallel with other P2 tracks | 24 |
| P2 | CFG | Merchant Config & Templates | X | INT; ING (GST read) | Parallel; ING waits on CFG-02 only | 20 |
| P2 | CRM | CRM | X | INT | Parallel with other P2 tracks | 14 |
| P2 | ANL | Analytics + Beacon Collector | X | INT | Parallel with other P2 tracks | 18 |
| P2 | BFF | Experience BFF | X (+ fakes for others) | INT | Parallel; builds on fakes then integrates | 22 |
| P2 | CMP | Compliance Jobs | X, ING, CRM, ORCH refs | INT | Parallel; wires at INT | 18 |
| P3 | INT | Integration & E2E | All P2 tracks | HRD | Sequential milestones | 18 |
| P4 | HRD | Hardening (perf/sec/chaos/DR) | INT | LNCH | Mostly parallel sub-streams | 20 |
| P5 | LNCH | Launch Readiness | HRD | — | Sequential gates | 14 |
|  |  |  |  |  | TOTAL | 262 |

---

# Milestones

| Milestone | Name | Gate Task | Definition |
|---|---|---|---|
| M0 | Platform ready | F-26 | All infra + CI/CD + observability + local dev stack up; any module can build alone. |
| M1 | Shared libs ready | X-20 | Money/id/envelope/auth/kms/repos/kafka wrappers + test harnesses done; module tracks unblock. |
| M2 | Ingestion slice | ING-24 | Callback + direct → FACTS + event, idempotent, against fakes. |
| M3 | Generation slice | ORCH-24 | bill.requested → hosted HTML + lazy PDF + GENERATED. |
| M4 | Delivery slice | DISP-24 | bill.generated → failover delivery, metered once, status emitted. |
| M5 | Config slice | CFG-20 | Template build/clone/default + branding → cache + event. |
| M6 | CRM slice | CRM-14 | Contact → Vault profile + link + consent, lag-tolerant. |
| M7 | Analytics slice | ANL-16 | Beacon + delivery → aggregates; survey once. |
| M8 | BFF slice | BFF-22 | Dashboard + OTP portal + widget submit. |
| M9 | Compliance slice | CMP-18 | T-90 scrub verified + audited; recon pages on drift. |
| M10 | Integrated in staging | INT-18 | Every FSD AC (1–24) green E2E; canary + recon live; v1 contracts frozen. |
| M11 | Hardened | HRD-20 | Load+chaos+security+DR passed & recorded; cost model approved. |
| M12 | Launched | LNCH-14 | Blockers closed; progressive rollout to 100%; prod SLOs + recon live; retro recorded. |

---

# How to Use

Engineering Execution Roadmap — Digital Billing Core

262 tasks, each scoped to a 30–90 minute checkpoint. Built from FSD v1.0 (frozen), Architecture Blueprint v1.1 + all review findings (F-1..F-11), and TDS v1.0.

Reading the Roadmap sheet
• Task IDs are TRACK-NN. The track prefix tells you the module/phase; NN is order within the track.
• Dependencies list Task IDs. A task is startable when all its dependencies are done.
• Filter by Phase or Track (header dropdowns) to hand one track to one engineer/agent.
• Every task names its own Rollback and Checkpoint, so a task can be shipped or reverted independently.

Parallelism (see Tracks & Parallelism sheet)
• P0 Foundation runs first and blocks everything. P1 Shared libs block the module tracks.
• The eight P2 module tracks run in PARALLEL — they share only registered event/API contracts, so each builds against fakes (see TDS §11.1) and integrates at P3.
• The one cross-track edge inside P2: Ingestion's GST validation reads Config (CFG-02). Everything else in P2 is independent.
• P3 Integration wires the real contracts and runs the FSD acceptance suite. P4 Hardening and P5 Launch are gates.

Context-switching minimisation
• One engineer/agent should take a whole track: shared conventions (§1 of the TDS) are learned once and reused across that track's tasks.
• Task types repeat within a track (entities→repo→logic→api→event→tests→obs→checkpoint), so the mental model is stable.

Definition of Done is uniform
• Checkpoint demoable + Testing green in CI + Review checklist passed + behind a flag where applicable + observability emitting.
• The Review Checklist column lists task-type-specific items plus the universal footer (conventions, no secrets, observability, demoable).

Build-time blockers (carried, not invented)
• PG secureHash spec, PG settlement extract, DPDP backup ceiling, peak-TPS ratification, URL-vs-scrub ruling.
• Tasks touching them ship behind stubs/flags (marked) and are closed in the LNCH track before launch. No requirement was invented to fill these gaps.

