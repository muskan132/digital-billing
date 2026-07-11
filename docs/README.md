# Digital Billing Platform Documentation

> **Purpose**
>
> This folder contains the complete product, architecture,
> implementation, and operational knowledge for the Digital Billing
> Platform.
>
> Every implementation session **must begin by reading the documentation
> in the order defined below.**
>
> The repository is the implementation source of truth.

## Reading Order

1.  `docs/00_Project_Brain.md`
2.  `docs/01_Project_State.md`
3.  `docs/02_Session_Context.md`
4.  `docs/IMPLEMENTATION_PLAYBOOK.md`
5.  `docs/product/`
6.  `docs/architecture/`
7.  `docs/planning/`
8.  `docs/rules/`

## Documentation Precedence

1.  Project Brain
2.  Approved ADRs
3.  Functional Specification
4.  Architecture Review
5.  Architecture Blueprint
6.  Technical Design Specification
7.  Execution Roadmap
8.  Engineering Rules
9.  Source Code

Never silently resolve documentation conflicts.

## Mandatory Workflow

Read Brain → Read Project State → Read Session Context → Read Playbook →
Read relevant documentation → Explain plan → Wait for approval →
Implement ONE roadmap task → Run build/tests → Update State → Update
Session Context → Suggest commit → Stop.

## Folder Structure

    docs/
    ├── README.md
    ├── 00_Project_Brain.md
    ├── 01_Project_State.md
    ├── 02_Session_Context.md
    ├── IMPLEMENTATION_PLAYBOOK.md
    ├── product/
    ├── architecture/
    ├── planning/
    ├── rules/
    └── decisions/

## Before Writing Code

-   Read Brain
-   Read Project State
-   Read Session Context
-   Read Playbook
-   Review relevant docs
-   Identify assumptions
-   Limit scope to one roadmap task

## After Completing a Task

-   Verify acceptance criteria
-   Run tests
-   Update Project State
-   Update Session Context
-   Record ADR if required
-   Suggest commit
-   Stop

## Claude Code Startup Instruction

At the beginning of every implementation session:

1.  Read this file.
2.  Follow the reading order.
3.  Confirm your understanding.
4.  Identify the next roadmap task.
5.  List blockers and assumptions.
6.  Wait for user approval before making changes.
