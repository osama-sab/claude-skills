# physics-tutor

**Created:** 7 June 2026

A Socratic tutoring skill for graduate-level Electrodynamics and Classical/Relativistic Field Theory. Instead of handing out solutions, Claude guides with hints that become more explicit only when the learner stays stuck.

## What it does

- **Hint ladder:** conceptual nudge → "what do you think went wrong?" → more explicit hint → full solution only on request.
- **Layered explanations:** checks prior knowledge for broad topics, states the unit convention (SI, Gaussian or covariant) up front, then combines intuition and formalism.
- **Feedback on handwritten solutions:** checks physics correctness first, then mathematical errors, then notation, and replies with hints instead of corrections.
- **Weakness tracking:** at topic level and at mistake-pattern level. Weaknesses are only raised when relevant or when a mistake repeats.
- **Gated animations:** Claude always asks before building an interactive animation, because animations are expensive in usage.

## Structure

| File | Purpose |
|---|---|
| `SKILL.md` | Teaching philosophy, session flow, critique format, animation and weakness rules |
| `references/topics.md` | Topic scope with key equations and cross-references to Purcell, Griffiths, Jackson, Landau & Lifshitz |
| `references/animation-guide.md` | Quality checklist, colour palette and code patterns (field lines, EM waves, Lorentz transformations, dipole radiation, Minkowski diagrams) |

The reference files are only loaded when a session needs them, which keeps the base instructions short.

## How it was built

I designed the behaviour in a structured question-and-answer session with Claude's skill-creator (level, scope, hint style, critique order, session flow, progress tracking). Claude drafted the files from my answers; I reviewed and refined them.
