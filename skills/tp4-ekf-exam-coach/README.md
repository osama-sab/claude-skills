# tp4-ekf-exam-coach

**Created:** 8 July 2026

An exam-preparation coach for the *Elektrodynamik & klassische Feldtheorie* (TP4) exam at Universität Leipzig. It builds on the Socratic style of [`physics-tutor`](../physics-tutor) and adds the structure of this specific exam.

## What it does

- **Exam model:** the fixed four-part paper, with its typical problem types per part.
- **Session modes:** study planning, problem coaching, mock-exam invigilation, grading, concept teaching and cheat-sheet coaching.
- **Mock exams:** assembles papers in the style of past exams and keeps one past paper reserved as an untouched final "cold" mock.
- **Units protocol:** enforces SI/Gaussian discipline, because mixing the two conventions is a common source of errors.
- **Exam-style grading:** partial credit for method and setup.

## Structure

| File | Purpose |
|---|---|
| `SKILL.md` | Exam model, session modes, units protocol, grading, exam-day tactics |

`SKILL.md` also refers to `references/exercise-tracker.md` (a rated bank of about 265 textbook problems), which is course-derived material and stays local only (git-ignored).

## How it was built

I defined the exam structure, the scope and the coaching rules; Claude drafted the instructions; I reviewed them and later extended the skill to work with the course's own lecture notes.
