# scpi-sim-comms

**Created:** 14 September 2026

Response formats and plain-language rules for my [`scpi-sim`](https://github.com/osama-sab/scpi-sim) project (a SCPI instrument simulator with a Python driver). It controls *how* Claude reviews code, explains concepts and helps with debugging in that repository, not *what* it is allowed to write.

## What it does

- **Always-on rules:** verdict in the first line, bullets over paragraphs, every criticism anchored to a file and line (`file.py:47`), one idea per bullet, no filler.
- **Severity-tagged findings:** `BUG` → `TRAP` → `MISSING` → `SMELL` → `NIT`, each with a concrete "why it bites" tied to real instrument behaviour (hung reads, stale error queues).
- **Separate formats** for code review, concept explanations, architecture discussions and debugging.
- **Guardrail:** a short format is explicitly not a licence to write the code for me; the project's `CLAUDE.md` still decides what the AI may implement.
- **Worked before/after example** so the model has a concrete target, not only rules.

## Structure

| File | Purpose |
|---|---|
| `SKILL.md` | Rules, formats, guardrails, pre-send checklist, worked example |
| `references/jargon.md` | Short glosses for testing, typing, packaging, Git, CI and networking terms, plus a list of jargon to avoid; loaded only when needed |

## How it was built

I specified the formats I wanted and the rules the skill must not weaken; Claude drafted the files; I reviewed and refined them.
