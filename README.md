# Claude Agent Skills

Custom [Agent Skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) I designed for Claude. Each skill packages instructions, domain knowledge and workflows into a folder that Claude loads only when a task needs it.

The common thread is **turning unstructured expert knowledge into something an AI agent can use reliably**: course material, exam structures, physics conventions and coding standards become structured instructions, reference files and clear trigger conditions.

| Skill | Created | Purpose |
|---|---|---|
| [`physics-tutor`](skills/physics-tutor) | 07.06.2026 | Socratic, hint-first tutor for Electrodynamics and Field Theory |
| [`tp4-ekf-exam-coach`](skills/tp4-ekf-exam-coach) | 08.07.2026 | Exam coach for the TP4 Electrodynamics exam (Universität Leipzig) |
| [`ti2-exam-coach`](skills/ti2-exam-coach) | 11.07.2026 | Exam coach for Technische Informatik 2 (digital logic) |
| [`quantum-sensing-viz`](skills/quantum-sensing-viz) | 26.07.2026 | Visualisations and Manim animations for quantum sensing |
| [`scpi-sim-comms`](skills/scpi-sim-comms) | 14.09.2026 | Code-review and explanation formats for my [`scpi-sim`](https://github.com/osama-sab/scpi-sim) project |

## Design patterns used

- **Progressive disclosure:** a short `SKILL.md` with the core rules; larger knowledge (topic maps, glossaries, code patterns) lives in `references/` and is loaded only when needed.
- **Precise trigger descriptions:** each skill's description lists the phrases and situations that should activate it, so the agent picks the right skill reliably.
- **Session modes:** the agent detects what the user wants (plan, practise, mock exam, grading, explanation) and switches behaviour accordingly.
- **Guardrails:** rules the agent must keep regardless of format, e.g. hints before solutions, or not writing code the user wants to write themselves.

## How I build skills

I define the scope, the rules and the behaviour, and collect the source material. Claude (using its skill-creator) drafts the files from that specification. I then review, test in real sessions and refine. In areas that are new to me, I let the AI propose the details and check them against my goals.

## Using a skill

Copy a skill folder into `~/.claude/skills/` (personal) or `.claude/skills/` in a project for Claude Code, or upload it as a skill in Claude.ai.

## Note on course material

Exercise banks derived from past exam papers are kept private and are not included here.
