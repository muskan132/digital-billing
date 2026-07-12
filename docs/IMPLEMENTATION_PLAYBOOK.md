# IMPLEMENTATION_PLAYBOOK.md — Digital Billing Core

<!-- MANDATORY OPERATING MANUAL for every Claude Code implementation session.
     Companion to 00_Project_Brain.md. Consistent with FSD v1.0, Blueprint v1.2, TDS v1.0, Roadmap (262 tasks).
     This playbook is process; the Brain is knowledge. Neither overrides the design set. -->

---

## 0. The one rule

**One session = one roadmap task, executed through the pipeline below, ended cleanly.** Everything else in this document exists to make that rule safe and repeatable across hundreds of independent sessions.

```
Read Brain → Read Roadmap Task → Read linked documents → Identify assumptions
→ Explain implementation plan → WAIT FOR APPROVAL
→ Implement ONLY that task → Run build → Run tests → Verify acceptance criteria
→ Update checkpoint → Update implementation progress → Suggest commit message → STOP
```

No step may be skipped, reordered, or merged. If any step cannot complete, stop at that step and report — a stated limitation always beats confident improvisation.

---

## 0.1 Execution environment

This repository is developed on **Windows 11, PowerShell as the primary shell.** Every command run during an implementation session — locally, for verification, for scaffolding — must be PowerShell-compatible.

- Do not generate or run Bash-specific syntax: `find`, `grep`, `sed`, `awk`, `2>/dev/null`, POSIX `if [ ]`/`&&` chains, or Linux-only shell scripts.
- Use PowerShell equivalents instead (`Get-ChildItem`/`Where-Object` for `find`, `Select-String` for `grep`, etc.), or the dedicated tool for the job (file search, content search, file read/edit) rather than a shelled-out Unix command.
- **Exception:** CI workflow YAML (`.github/workflows/*.yml`) runs on `runs-on: ubuntu-latest` GitHub-hosted runners — bash is the correct and expected shell *inside those jobs*. This rule governs the developer's local/session shell, not the Linux CI runner's own steps.

## 1. The pipeline, step by step

### Step 1 — Read Brain
Load `00_Project_Brain.md` and `context/STATE.md` (in that order if cold; STATE first if warm). Verify STATE against the repo: run the active module's tests, confirm the newest `CP-*.md` per track has matching commits. **The repo is authoritative; STATE can be stale.** Reconcile drift before anything else — a session that builds on unverified state compounds the drift.

### Step 2 — Read Roadmap Task
Load exactly one task row from `docs/ROADMAP.xlsx` — the one named in STATE's "next action," or the one the user names. Confirm every listed dependency has a completed checkpoint. Confirm none of the carried blockers (Brain §21) gates it; if one does, the task ships behind its named stub/flag or does not start. If the task is not startable, say so and name the first task that is.

### Step 3 — Read linked documents
Load the **T1 slice only** (CONTEXT_SYSTEM.md §7): TDS §1 (conventions) + TDS §2 (data dictionary) + the active module's TDS section + dependency modules' *interface* subsections. Escalate to T2 (Blueprint section + DECISIONS.md) only if the task is architectural; T3 (FSD section) only if product behaviour is genuinely unclear. Section, never whole document. **Boot integrity:** if the plan is about to rely on a section not actually in context, load it or stop — never reconstruct design from partial memory.

### Step 4 — Identify assumptions
Write out, explicitly: (a) assumptions the task forces (unratified specs, stubbed dependencies), (b) interpretation choices where the docs allow more than one reading, (c) which invariant enforces each rule this task touches and where (schema constraint / conditional write / unique index), (d) the failure legs (crash mid-flow, partial write, duplicate delivery) and why rerun converges. An assumption not written down is a hallucination waiting for a bad day.

### Step 5 — Explain implementation plan
Present: files to create/change, contracts touched (with the registered-schema check), tests to be written (mapped to the task's Definition of Done, line by line), migration plan if any, flag if any, rollback path, and the assumption list from Step 4. Name the runner-up approach and why it lost — an approach chosen with no alternative considered wasn't chosen.

### Step 6 — Wait for approval
Full stop. Do not "start on the obvious parts." If the user amends the plan, update it and re-confirm. Approval covers this plan for this task only.

### Step 7 — Implement ONLY that roadmap task
Scope discipline is absolute: no drive-by refactors, no "while I'm here," no preparing for future tasks, no touching files outside the task's `Files Affected` column without flagging it in-plan. Adjacent problems discovered mid-task are **reported as findings**, not fixed. The smallest change that satisfies the DoD.

### Step 8 — Run build
Monorepo build for the touched packages must be green: compile, typecheck (strict), lint (including the money-float lint and the module-boundary lint). A build warning introduced by this task is treated as a failure.

### Step 9 — Run tests
Full test suite for the touched module(s), not just new tests. New tests required per Brain §24: DoD mapped test-by-test; T1 money floor where money or record-creating state is touched (happy / retry / partial / concurrent / reconciles); idempotent-consumer replay test where a consumer changed; IDOR + role-matrix where a human-facing endpoint changed; PII-redaction deny-test always green. A flaky test is a broken test — fix or quarantine with a ticket, never ignore.

### Step 10 — Verify acceptance criteria
Walk the task's Definition of Done and Review Checklist columns item by item, stating the evidence for each (test name, command output, screenshot-equivalent). "Probably fine" is not evidence. Observability check: traces propagate, metrics emit, alerts link runbooks. Anything demoable at the checkpoint gets demoed (command + expected output written into the checkpoint).

### Step 11 — Update checkpoint
Write `context/checkpoints/CP-<TASKID>.md` from the template: **what changed / how to verify / how to roll back** — three lines, a diff not a story. Immutable once written.

### Step 12 — Update implementation progress
Regenerate `context/STATE.md` (new high-water mark, next action, blocker changes — ≤400 tokens, rewritten to truth, never appended) and `context/progress/PROGRESS.md` (regenerated from checkpoints). Append the session END template to `context/sessions/log/`. Stamp doc versions in footers. Any decision made during the task → append to `DECISIONS.md` now, not "later."

### Step 13 — Suggest commit message
Format below (§3). Include the Checkpoint ID — it is the grep key linking code ↔ roadmap ↔ context.

### Step 14 — Stop
Do not start the next task, "quickly also" fix something, or summarize the whole project. If context feels heavy after ≥1 checkpoint, ending here IS the compaction strategy: the next session reboots from the 400-token kernel.

---

## 2. Branching strategy

- **Trunk-based with short-lived task branches.** `main` is always releasable; every merge to `main` passed CI and review gates.
- Branch per roadmap task: `<track>/<task-id>-<slug>` (e.g. `ing/ING-04-pg-hmac-verify`). One task, one branch, one PR, one checkpoint.
- Branches live hours-to-days, never weeks. A task too big for one branch is a roadmap problem — report it, don't split silently.
- Parallel P2 tracks are parallel branches; they share only registered contracts and `libs/`, so merge conflicts across tracks signal a boundary violation — investigate, don't just resolve.
- No long-lived develop/release branches. Environments are promoted by CD (canary 5/25/100 per F-03), not by branch.
- Rebase task branches on `main` before merge; merge via PR only (even solo) so the review checklist and CI gates always run.

## 3. Commit strategy

- **Checkpoint = commit/PR.** The unit of history is the roadmap task.
- Message format:
  ```
  [<TASK-ID>] <imperative summary ≤72 chars>

  <what changed and why, 2–5 lines; contracts/migrations/flags named>

  Checkpoint: CP-<TASK-ID>
  Refs: TDS §<x>, ADR-<n> (as applicable)
  ```
- Intermediate WIP commits on the branch are fine; squash to the checkpoint commit on merge so `main` history reads as the roadmap.
- Schema, migration SQL, and regenerated Prisma client ship in the same commit. Contract changes ship with their registered schema and contract tests in the same commit.
- Never commit: secrets, `.env` values, PII fixtures with real-looking data, commented-out code, unregistered flags.

## 4. Rollback strategy

- **Every task's rollback is designed before merge** — it is a roadmap column and a checkpoint line, not an afterthought.
- Code: revert the checkpoint commit. Because tasks are scoped and flags gate incomplete behaviour, a revert must always be safe; if a task's revert would not be safe, the plan (Step 5) must say so and explain the compensating mechanism.
- Flags: behaviour-gating flags are the first rollback lever — disable before reverting. Flags carry owner + expiry; removal is release-gated.
- Migrations: expand–contract makes rollback = "don't run the contract step." Destructive steps live in a separate, later-release migration with a named owner and verification query, so code rollback never races a dropped column.
- Infra (F-track): IaC only — rollback = destroy/reapply the scoped module. No console changes, ever, so there is nothing unreproducible to roll back.
- Data: bills, ledger rows, and audit are append-only — there is no data rollback, only corrective new records (credit notes, superseding entries). A "fix the data" migration is forbidden (prisma.md); it is an incident with a reconciliation, not a rollback.
- Deploys: canary gates auto-halt promotion; rollback of a released deployable = redeploy previous artifact. Runbook link required on every alert that could trigger this.

## 5. Testing philosophy

- **Tests buy freedom, not virtue. Allocation follows risk, not coverage dogma.** Test invariants and money paths hard; never test boilerplate. Coverage % is a smell detector, not a goal.
- The portfolio: unit tests on real branching logic; contract tests against registered schemas (both sides of every event/API); thin E2E on the flows that pay the bills (deferred to INT track); **property/invariant tests** on core invariants (≤1 record per idempotency key under concurrent replay; Σ credit notes ≤ bill value under racing writers; invalid layouts always rejected).
- **T1 money floor** — five cases minimum wherever money or record-creating state is touched: happy / retry-same-key / partial failure / concurrent race / reconciles. No reconciliation query = not done.
- Idempotency is proven by test, never asserted by comment: replay the same event/request twice, diff the durable state, expect no change.
- Security floor: IDOR fuzz (foreign merchant/bill/contact ids) on every human-facing endpoint; role-matrix tests generated from the FSD role table (a role change without a regenerated matrix does not merge); PII-in-logs deny-test covering app and Prisma output.
- Every fixed bug gets a pinning test — the incident→test loop is the compounding mechanism.
- Tests are code: readable, isolated, deterministic, fast enough to run habitually. Pre-merge tier under minutes; heavier tiers in CI.
- Modules build and test alone against documented fakes/stubs of registered contracts (TDS §11.1); production-gated stubs are flagged and their removal is a release gate.

## 6. Debugging workflow

1. **Reproduce first.** A bug that can't be reproduced deterministically (test, script, or replayed event) is not yet understood. For consumers, replay is the tool — consumers are built to be safely re-runnable.
2. **Read before changing.** Trace the actual path (trace_id end-to-end, structured logs, DLQ contents) — never PII; surrogate ids are what logs carry by design.
3. **Form a hypothesis, test it minimally.** One variable at a time. If two fast checks disagree, escalate depth rather than guessing.
4. **Check the invariant layer before the code layer.** Most "bugs" in this system are a signal arriving out of order (dropped-as-stale by design), a duplicate (no-op by design), or a reconciliation catching real drift. Confirm which before writing a fix.
5. **Fix at the enforcement point.** If an invariant was violated, the fix is in the schema/conditional-write layer, not a patch in app code above it.
6. **Pin it.** The fix ships with the reproducing test. Money-path bugs also re-run the reconciliation over affected history and record the result.
7. **Write it forward.** Root cause + fix + pinning test noted in the session log; if the bug revealed a design gap, that is a finding for an ADR or doc fix, reported not improvised.
8. Never debug by adding logging that violates PII rules, by widening a grant, by disabling an invariant "temporarily," or by editing data.

## 7. Documentation update workflow

- **Volatile truth (regenerated, never grown):** `STATE.md` and `PROGRESS.md` rewritten to current truth at every session end. Token caps enforced (~400 / ~1,200).
- **Append-only (superseded, never edited):** `DECISIONS.md`, `checkpoints/`, `sessions/log/`. Correct by superseding entry, always cross-referencing what it supersedes.
- **Design set (FSD/Blueprint/TDS):** FSD is frozen — behaviour change requires explicit unfreeze + version bump + propagation checklist across Blueprint/TDS/Roadmap. Blueprint/TDS changes are version-bumped and logged as DECISIONS entries naming the sections touched. Claude Code proposes these changes; it never applies a design-set edit without explicit user approval.
- **Rule files** (`architecture.md`, `backend.md`, etc.): permanent; changed only via ADR-logged proposals.
- Every context file stamps the doc versions it assumes; on a doc bump, stamp mismatches must be reconciled before the older file is trusted.
- Never document infrastructure or features as implemented before their roadmap task ships.

## 8. ADR creation rules

- **ADR before code** for any change to: a service boundary, a store choice, a sync exception, event-contract semantics, an auth mechanism, a T1 invariant's enforcement point, a new dependency/ORM/store/portal/role/decrypt grant, soft delete anywhere.
- Shape: context · decision · why · trade-off · revisit-when · **runner-up and why it lost**. Under ~200 words; deliberation is disposable, the decision is durable.
- Append to `DECISIONS.md` with the next id; immutable once written; supersede with a new entry citing the old id.
- Settled ADRs bind. Disagreement with an ADR = a proposed superseding ADR with *new information*, presented to the user — never a silent divergence in code.
- Task-level implementation choices that fit entirely within existing rules do NOT get ADRs — ceremony on small questions is a failure too. The checkpoint records them.

## 9. When to stop

Stop immediately (end cleanly at the current step, write what's true, report) when:

- The active task's checkpoint is written — the pipeline ends at Step 14 by design.
- A dependency, spec, or blocker (Brain §21) the task needs is not actually resolved.
- The implementation would require violating any Brain §22 "never," any rule file, or a settled ADR.
- Two loaded documents genuinely conflict (precedence: repo > DECISIONS > FSD > STATE; but design-set-internal conflicts are reported, not auto-resolved).
- The task turns out to be materially bigger than its roadmap scoping — report the split needed.
- A needed document section is unavailable and the work can't proceed honestly without it.
- ≥1 checkpoint done and context is heavy — the END template is the save point; a clean handoff beats a long session.
- Build or tests are red and the fix would exceed the task's scope.

## 10. When to ask the user

Ask (one focused question, with your recommended answer) when:

- Approval gates: Step 6 always; any design-set edit; any destructive migration; any new flag; anything touching the Vault schema.
- An assumption from Step 4 materially changes the implementation and the docs don't settle it.
- A carried blocker's status may have changed (specs arrive out-of-band; never assume resolution).
- Choosing between two valid readings of the FSD/TDS where the choice is externally visible (contract shape, error semantics, user-facing behaviour).
- Anything requires credentials, secrets, or environment access the session doesn't have.

Do NOT ask about things the documents already settle, style questions the linters own, or task-internal choices within existing rules — decide, state the assumption inline, and proceed.

## 11. Forbidden behaviours

The full list is Brain §22 (binding here by reference). Process-specific additions:

- Implementing before approval, or implementing beyond the approved plan.
- Batching multiple roadmap tasks into one session/branch/commit.
- Marking a DoD item done without named evidence; skipping the review checklist "because it obviously passes."
- Writing STATE/PROGRESS as diaries or essays; editing append-only files; leaving a session without the END template.
- Inventing an API signature, schema field, config key, task, or document section to satisfy the shape of the code. If it isn't in a loaded document or the repo, it doesn't exist — say so.
- Resolving a document conflict silently, in either direction.
- "Temporary" hacks without a flag, an owner, and an expiry — undocumented temporary is permanent.
- Loading whole documents when a section suffices; acting on sections not loaded.
- Debug logging or test fixtures that touch real-shaped PII.

## 12. Quality gates

A task is DONE only when every gate below is green. A gate that cannot be evaluated is a failing gate.

| # | Gate | Evidence |
|---|---|---|
| G1 | Scope | Diff touches only the task's Files Affected (or the plan flagged and approved the exception) |
| G2 | Build | Compile + strict typecheck + lint (money-float, module-boundary, log-redaction) green |
| G3 | Tests | Module suite green; DoD→test mapping shown; T1 money floor where applicable; idempotency replay test where applicable |
| G4 | Security | IDOR/role-matrix updated if endpoints changed; PII deny-test green; no new grant/scope widening; signatures over raw bytes preserved |
| G5 | Contracts | Any schema change registered + additive; contract tests green on both sides |
| G6 | Data | Migration expand–contract, named constraints, EXPLAIN evidence for new query shapes; one writer per table preserved |
| G7 | Observability | Traces propagate (incl. Kafka headers); RED + domain metrics emit; alerts runbook-linked |
| G8 | Flags & stubs | Incomplete behaviour flagged with owner + expiry; stubs marked and release-gated |
| G9 | Rollback | Checkpoint's rollback line is executable as written |
| G10 | Records | CP-*.md written; STATE + PROGRESS regenerated; DECISIONS appended if any; END template logged; commit message with Checkpoint ID suggested |

---

## Appendix — Session boot card (copy at every cold start)

```
1. Load STATE.md.                       4. Read last session log + last CP for the track.
2. Verify repo vs STATE (run tests).    5. Load T1 slice for the active task.
3. Reconcile any drift FIRST.           6. Pipeline Step 2 onward. One task. Stop clean.
If STATE.md is missing: rebuild it from newest CP-* per track + DECISIONS tail + first unblocked roadmap task.
```

*Consistent with FSD v1.0, Blueprint v1.2, TDS v1.0, Roadmap (262 tasks). Changes to this playbook are ADR-logged.*
## Development Environment

Operating System
- Windows 11

Primary Shell
- PowerShell

Editor
- VS Code

Package Manager
- npm

Git
- Git for Windows

Docker
- Docker Desktop

When generating commands:

- Always generate PowerShell commands unless explicitly asked for Bash.
- Never assume Linux utilities such as grep, sed, awk or find are available.
- Do not use /dev/null.
- Use PowerShell equivalents.

## Session Recovery

If a previous Claude Code session has ended:

- Never attempt to recover temporary extracted files.
- Never search /tmp or OS temp directories.
- Re-read canonical files from the repository.
- Assume temporary analysis artifacts are lost.
- The repository is always the source of truth.
