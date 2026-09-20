# quantum-sensing-viz

**Created:** 26 July 2026

A skill for building visualisations, simulations and Manim animation scripts that make quantum sensing and metrology intuitive: Bloch sphere dynamics, Rabi and Ramsey sequences, spin echo and dynamical decoupling, T1/T2 decoherence, NV-centre magnetometry, ODMR spectra, atom interferometry, spin squeezing, and standard-quantum-limit vs. Heisenberg scaling.

## What it does

- **Three design principles:** radical minimalism (show only what is needed to grasp the effect), rigorous physics behind a simple interface (the dynamics come from the real equations), and going beyond what a chalkboard can show.
- **Plan first:** Claude opens with a short plan of what will be shown and why before building anything.
- **Format choice:** an interactive React visualisation by default, a lightweight inline widget for a quick sketch, or a runnable Manim script (plus render command) for animations and lecture material.
- **Broad triggering:** fires on descriptions such as "make this intuitive" or "I need a figure for this magnetometry result", not only on the word "visualisation".

## Structure

| File | Purpose |
|---|---|
| `SKILL.md` | Principles, workflow, output-format choice, physics checks, interface standards |

`SKILL.md` also refers to bundled assets (`assets/bloch_sphere_svg.jsx`, `assets/tex_component.jsx`, `assets/manim_scene_template.py`) and reference files (`references/quantum-sensing-physics.md`, `references/manim.md`) that are not part of this upload yet.

## How it was built

I defined the scope, the design principles and the physics standards; Claude drafted the instructions, which I reviewed and refined.
