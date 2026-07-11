# Context Management System — Digital Billing Core

Purpose: let independent Claude (or human) sessions build this project over months **without losing architectural consistency**, while **loading as few tokens as possible** per session.

The whole system rests on one idea: **a tiny always-loaded kernel of current truth, plus heavy reference documents that are loaded by section, only for the task at hand, and unloaded the moment they've done their job.** A session should boot on ~500–1,500 tokens of context files, never on the ~40k+ tokens of the five full design documents.

---

## 0. Golden rules (the whole system in six lines)

1. **The repo is the source of truth for *what is built*.** `DECISIONS.md` for *why*. `FSD` for *what it must do*. `STATE.md` for *where we are*. When any two disagree, that order wins and the loser gets fixed.
2. **Never load a whole document. Load a section.** Every doc is section-addressable (FSD §5.2, TDS §3, Blueprint §14). 
3. **Decisions are durable; deliberation is disposable.** Keep the decision + one-line why + what it killed. Discard the transcript.
4. **State is a high-water mark, not a history.** "ING done through ING-18" — not a diary.
5. **Append-only files are never edited — they are superseded.** Correct a decision by adding a newer one that says "supersedes ADR-x".
6. **Every session ends by writing the END template, or it didn't happen.** No end note = the next session cannot trust anything after the last checkpoint.

---

## 1. Project folder structure

```
digital-billing-core/
├── context/                     ← THIS SYSTEM. Small, volatile, always relevant.
│   ├── STATE.md                 ← TIER-0 KERNEL. Current truth. ≤ ~400 tokens. Loaded every session.
│   ├── CONTEXT_SYSTEM.md        ← This file. The rules. Loaded almost never (you already know them).
│   ├── DECISIONS.md             ← Append-only ADR/decision ledger. The project's long-term memory.
│   ├── GLOSSARY.md              ← Canonical terms + hard invariants. Cheap; load when a term is unsure.
│   ├── sessions/
│   │   ├── _START_TEMPLATE.md
│   │   ├── _END_TEMPLATE.md
│   │   └── log/                 ← One tiny append-only file per session. Never edited.
│   ├── checkpoints/
│   │   ├── _CHECKPOINT_TEMPLATE.md
│   │   └── CP-<TASKID>.md       ← One tiny file per completed roadmap checkpoint.
│   └── progress/
│       ├── _PROGRESS_TEMPLATE.md
│       └── PROGRESS.md          ← Rolled-up status. REGENERATED from checkpoints, never grown.
│
├── docs/                        ← HEAVY REFERENCE SET. Loaded by section, on demand only.
│   ├── FSD.md          (frozen behaviour — source of truth for WHAT)
│   ├── BLUEPRINT.md    (architecture, versioned)
│   ├── REVIEW.md       (review findings F-1..F-11, applied)
│   ├── TDS.md          (technical design — the working engineering reference)
│   └── ROADMAP.xlsx    (262 tasks; the state of these lives in STATE/PROGRESS, not here)
│
├── services/…  libs/common/…    ← The code. One track per roadmap prefix (ING, ORCH, …).
```

Why the split: `context/` is small and always-relevant; `docs/` is big and selectively relevant. Volatile truth (STATE, PROGRESS, logs, checkpoints) is physically separate from stable design (docs/), so a session never pays to load design it doesn't need.

---

## 2–5. The templates

Four fill-in templates live as files so they are copy-ready:

- **Session startup** → `sessions/_START_TEMPLATE.md`
- **Session ending** → `sessions/_END_TEMPLATE.md`
- **Checkpoint** → `checkpoints/_CHECKPOINT_TEMPLATE.md`
- **Progress summary** → `progress/_PROGRESS_TEMPLATE.md`

Each is designed to be **short by construction** — terse field prompts, hard length caps noted in the file. A template that invites an essay defeats the system.

---

## 6. Context compression strategy

The enemy is re-narration. Six moves keep context small without losing continuity:

1. **Pointers, never copies.** Context files cite `FSD §5.2`, `TDS §3`, `ADR-4` — they never paste the content. The reader loads the source only if the task needs it.
2. **Decisions over deliberation.** When a design choice is made, record the ADR shape (decision · why · what it killed · revisit-when) in `DECISIONS.md`. The chat that produced it is thrown away. Losing the transcript costs nothing; losing the decision costs a re-litigation.
3. **High-water marks, not diaries.** `STATE.md` records the furthest-done task per track and the next action — not the sequence of everything done.
4. **Checkpoints are diffs, not stories.** "What changed / how to verify / how to roll back." Three lines. The verify step is what makes the next session trust it without re-reading code.
5. **Regenerate the roll-ups.** `STATE.md` and `PROGRESS.md` are **rewritten to current truth** each time, so they never accrete. Only `DECISIONS.md`, `checkpoints/`, and `sessions/log/` are append-only — and each of those entries is tiny.
6. **Token budgets, enforced by smell.** `STATE.md` ≤ ~400 tokens (it is paid *every* session — every word here has recurring cost). `DECISIONS.md` and `PROGRESS.md` ≤ ~1,200 tokens each. If `STATE.md` won't fit, something that belongs in a checkpoint or decision has leaked into it — move it out.

**The math this buys:** a session boots on `STATE.md` (~400) + one task row (~150) + the relevant TDS module section + §1/§2 (~2–4k) ≈ **under 5k tokens** to be fully oriented and correct — versus ~40k+ to load all five documents. Continuity is preserved because the 400-token kernel plus the append-only ledgers *are* the memory.

---

## 7. Rules for loading documents (tiered)

Load the **minimum tier** that answers the task. Escalate only on a specific need.

| Tier | Load | When |
|---|---|---|
| **T0 — Kernel** | `STATE.md` | **Always, first thing.** Orients the whole session. |
| **T1 — Task slice** | The active **ROADMAP task row** + **TDS §1** (conventions) + **TDS §2** (data dictionary) + the **TDS section for the active module** + **dependency modules' *interface* subsections only** | Any coding task. This is the normal working set. |
| **T2 — Design reference** | The relevant **BLUEPRINT** section + `DECISIONS.md` + relevant **REVIEW** finding | Only when the task is architectural, cross-cutting, or a decision is in question. |
| **T3 — Frozen behaviour** | The specific **FSD** section | Only when *what the product should do* is genuinely unclear. Rare once the TDS exists — TDS is the working reference. |

Loading rules of thumb:
- **Section, not document.** Always. If you catch yourself loading a whole doc, stop and name the section you actually need.
- **Interfaces, not implementations, of dependencies.** To build ORCH you need DISP's *contract*, not DISP's internals.
- **`GLOSSARY.md` is cheap** — load it the moment a term or invariant is uncertain, rather than guessing.
- **Boot integrity (from the kernel philosophy):** if you reference a section you have *not* actually loaded, say so and operate from the kernel — never improvise a half-remembered design. A stated "I need to load TDS §5 before answering" beats a confident guess.

---

## 8. Rules for unloading documents

Context is a working set, not an archive. Drop things the moment they've done their job:

- **Drop a module's TDS section once its checkpoint is written.** The checkpoint captured what the next session needs.
- **Drop FSD sections immediately** after the behaviour question is answered.
- **Drop dependency-interface docs once your code compiles/typechecks against them.**
- **Keep resident only:** `STATE.md` + the active task slice + `DECISIONS.md` (if doing design work). Everything else is transient.
- **Compaction trigger:** once a session has completed **≥1 checkpoint** and context feels heavy, **write the END template and stop.** Treat the end note as a save point: a fresh session reloads from the ~400-token kernel instead of dragging a bloated transcript forward. A clean handoff is cheaper and safer than a long session.

---

## 9. Recovery procedure after context loss

If a session dies, is compacted, or starts cold — boot in this exact order:

1. **Load `STATE.md`.** It names the phase, the active task, per-track high-water marks, open blockers, and the next action.
2. **Load the T1 task slice** for the active task (roadmap row + TDS §1/§2 + module section).
3. **Read the last entry in `sessions/log/`** and the **last checkpoint for the active track**. Two tiny files; they tell you exactly where the previous session stopped and how to verify its work.
4. **Verify against the repo, not memory.** Run the active module's tests; check which `CP-*.md` files have matching code/commits. **STATE can be stale; the repo is authoritative.** Reconcile any drift before writing new code.
5. **If `STATE.md` is missing or corrupt:** rebuild it — per-track high-water marks come from the newest `CP-*.md` per prefix; recent decisions from the tail of `DECISIONS.md`; next action from the roadmap's first unblocked task. Then continue.
6. **Boot-integrity check before acting:** confirm the documents you're about to rely on are actually in context. If not, load the section or say you can't proceed on that point — do not reconstruct design from partial memory.

Recovery is designed to cost **two tiny files + the kernel** to re-orient. That is the payoff of keeping state small and append-only.

---

## 10. Versioning strategy

| Artifact | Versioning | Change rule |
|---|---|---|
| **FSD (frozen)** | Semantic `vX.Y`; currently **v1.0** | Behaviour changes require an explicit **unfreeze**, a version bump, and a **propagation checklist** across Blueprint/TDS/Roadmap (the consistency rule this project already follows). Never edit behaviour silently. |
| **Blueprint / TDS (living)** | Semantic; **Blueprint v1.1**, **TDS v1.0** | Every change logged as a `DECISIONS.md` entry naming the sections touched. Reviews bump the version (v1.0→v1.1 after the review pass). |
| **STATE.md / PROGRESS.md** | **Not** semantically versioned — always "current." | Git history *is* their version. Never keep stale copies inline; regenerate to truth. |
| **DECISIONS / checkpoints / session logs** | Identified by id/date; **immutable once written** | Append-only. Supersede, never edit. `ADR-12 supersedes ADR-4`. |
| **Code** | Git; each **checkpoint = a commit/PR** | The **Checkpoint ID goes in the commit message**, linking code ↔ roadmap ↔ context in one grep. |

**Compatibility check:** every context file stamps the doc versions it assumes (e.g. footer: *consistent with FSD v1.0, TDS v1.0, Blueprint v1.1*). On a doc bump, the loading step compares stamps; a mismatch means a session must reconcile before trusting the older file. This is how architectural consistency survives months: the version stamps make drift *visible* instead of silent.

---

*This file is loaded almost never — once you know these rules, `STATE.md` is all you need to start. Consistent with FSD v1.0, Blueprint v1.1, TDS v1.0, Roadmap (262 tasks).*
