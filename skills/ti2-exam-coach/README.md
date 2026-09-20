# ti2-exam-coach

**Created:** 11 July 2026

An exam-preparation coach for *Grundlagen der Technischen Informatik 2* (digital logic and computer engineering). It turns a general-purpose assistant into a coach that knows the structure of this specific exam.

## What it does

- **Exam model:** the recurring six-block shape of the exam (Boolean algebra, Shannon expansion and ROBDDs, KV and Quine-McCluskey minimisation, hazards and flip-flops, state machines, number representation).
- **Session modes:** detects whether the user wants a study plan, problem coaching, a mock exam, grading, a concept explanation or cheat-sheet help, and acts accordingly.
- **Hint-first coaching:** problems are presented one at a time; solutions are held back until asked for.
- **Exam-style grading:** partial credit for method, not just the final answer.
- **Cheat-sheet coaching:** builds the sheet from the user's own recurring mistakes plus high-density reference items.

## Structure

| File | Purpose |
|---|---|
| `SKILL.md` | Teaching stance, exam model, session modes, grading, exam-day tactics |
| `references/exam-blueprint.md` | Topic map rated by how often each topic appears in past papers, generation recipes per block, cheat-sheet essentials, study-plan flow |

## Knowledge preparation

The core work was turning unstructured course material (lecture slides, past papers, exercise sheets) into a structured knowledge base the agent can navigate: topics were rated by frequency across past papers, anchored to lecture slides, and paired with recipes for generating new practice problems in the same style.

The exercise bank derived from past exam papers is kept private and is not part of this repository.

## How it was built

I collected and organised the course material and defined how the coach should behave; Claude drafted the files; I reviewed and refined them.
