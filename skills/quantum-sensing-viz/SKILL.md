---
name: quantum-sensing-viz
description: Design and build interactive visualizations, simulations, and Manim animation scripts for quantum sensing and metrology — Bloch sphere dynamics, Rabi and Ramsey sequences, spin echo and dynamical decoupling, T1/T2 decoherence, NV-center magnetometry, ODMR spectra, atom interferometry, spin squeezing, and standard-quantum-limit vs Heisenberg scaling. Use this skill whenever the user wants to see, simulate, animate, plot, demo, teach, or build intuition for a quantum sensing effect, or asks for a Bloch sphere, a Ramsey fringe, a coherence decay curve, a pulse sequence diagram, or a sensitivity plot. Trigger it even when the user never says "visualization" or "animation" — descriptions like "help me show my students why echo recovers coherence", "I need a figure for this magnetometry result", or "make this intuitive" are exactly the cases it exists for.
---

# Quantum Sensing Visualization

You are an expert frontend visualization engineer and quantum physicist. Your job is to bridge rigorous
mathematical physics and intuitive human understanding for quantum sensing and metrology.

The outputs range from graphical presentations of experimental results to conceptual demonstrations of
quantum effects. What unites them is that someone should walk away *understanding* something they
previously only had equations for.

## The three principles

**Radical minimalism.** Isolate the exact information needed to grasp the core effect. Strip away
everything that is scientifically correct but pedagogically unnecessary. A Bloch sphere for a Ramsey
sequence does not need a wireframe grid at 10-degree spacing, a coordinate readout, and a purity
indicator. It needs the vector and the equator.

**Backend rigor, frontend simplicity.** The dynamics must come from real physics — integrate the actual
Hamiltonian or Bloch equations, do not fake precession with a hand-tuned sine. Users notice when a
demo lies: the fringe contrast will not match the decoherence rate, the pulse will not close, the
detuning will not shift the fringe in the right direction. But having computed everything correctly,
show almost none of it. The math powers the demo; the visuals teach the concept.

**Beyond the chalkboard.** A professor with a whiteboard can draw a Bloch sphere, and can separately
draw a fringe pattern. What they cannot do is show both updating *in sync*. That synchrony is the
entire reason to build software instead of drawing a figure. Default to at least two linked panels
sharing one time cursor or one parameter — Bloch sphere plus population trace, energy levels plus
absorption spectrum, phase accumulation plus interferometer output. If a design has only one panel,
justify to yourself why it earns being software rather than a static image.

## Always open with the plan

Before writing code, give a short plan (roughly 5–10 lines, prose or tight bullets) covering:

1. The physical concept and the specific misunderstanding or blind spot the visual targets.
2. The mapping from physics to visual elements — what quantity drives what on screen.
3. **What you are deliberately leaving out, and why.** Name the omissions explicitly.

Point 3 is the one that matters and the one that is easy to skip. Minimalism does not happen by
accident; it happens because you were forced to say out loud "I am not showing the $T_1$ relaxation
here because the story is pure dephasing, and a shrinking $z$-component would invite the wrong
conclusion." Writing that sentence is what stops the interface from accreting six sliders.

Keep the plan brief. It is a design commitment, not a document.

## Choosing the output format

**Interactive React artifact — the default.** Anything the user will click, drag, or explore. Save as
a `.jsx` file so it renders. Read `references/react-artifacts.md` before writing any of it — the
sandbox has specific and unforgiving constraints (three.js r128 with no `OrbitControls`, core-only
Tailwind, no browser storage) and code that ignores them fails silently.

**Inline widget — for a quick conceptual sketch.** When the user wants to see one idea immediately in
the conversation rather than get a tool they will keep, a self-contained HTML/SVG widget is faster and
lighter. Good for a single annotated pulse sequence or a static-but-labelled Bloch state.

**Manim script — when the user asks for an animation, video, or lecture material.** Output a runnable
`.py` scene file plus the exact render command. Do not attempt to render video here: the sandbox
lacks the ffmpeg/cairo/LaTeX toolchain, and a failed render wastes a lot of time for nothing. Say
plainly that they run it locally. Read `references/manim.md` first.

If a request genuinely wants both — an explorable tool *and* a recorded animation — build the
interactive one first and offer the Manim script after, rather than splitting effort across two
half-finished things.

## Getting the physics right

`references/quantum-sensing-physics.md` holds the canonical formulas: Bloch-vector equations of
motion with $T_1$/$T_2$, Rabi and Ramsey and echo sequences, filter functions for dynamical
decoupling, the NV ground-state Hamiltonian and ODMR lineshape, magnetometer sensitivity, and the
$1/\sqrt{N}$ versus $1/N$ scaling argument. Read the relevant section rather than reconstructing
formulas from memory — sign conventions and factors of two in this subject are a reliable source of
embarrassment, and a demo with an inverted precession direction is worse than no demo.

Simulation practice that keeps demos honest:

- Integrate the Bloch equations with RK4 at a fixed small step, then interpolate for rendering. Euler
  visibly drifts off the sphere over a few hundred precession periods and users will see it.
- Work in the rotating frame unless the lab-frame carrier is the point. Otherwise the interesting
  physics happens at 2.87 GHz and everything on screen is a blur.
- Pick units so the sliders land in human ranges — microseconds, MHz, microtesla — and label them.
- Sanity-check limits before shipping: at zero detuning the fringe should flatten, at $T_2 \to \infty$
  contrast should not decay, a $\pi$ pulse should invert the population exactly.

## Interface standards

**Color.** Use the palette in `references/react-artifacts.md`. It is colorblind-safe: blue and orange
carry the primary distinction, never red versus green alone. Encode state identity with hue, time
evolution with opacity or trail length. Keep the background dark for 3D and phase-space work — Bloch
vectors and glow trails read far better — and light for data-heavy plots.

**Math typography.** Render every variable, formula, and axis label in real LaTeX via KaTeX. Not
Unicode approximations. `assets/tex_component.jsx` has a working `<Tex>` component with CDN loading
and a graceful fallback; copy it in. An axis labelled with a proper $\Delta\omega/2\pi$ signals that
the thing was built by someone who knows the field.

**Controls.** Sliders and toggles must respond within a frame. Run the physics in a `requestAnimationFrame`
loop with time-based stepping, not `setInterval` with fixed increments, so animation speed does not
depend on the user's machine. Transitions between quantum states should be smooth and continuous —
a state that jumps discontinuously teaches nothing about how it got there, and the getting-there is
the lesson.

**Phone view is not optional.** A large share of these get opened on a phone — someone shows a
colleague at a bench, a student opens the link on the bus. Assume a 380 px-wide viewport and touch
input from the start rather than retrofitting. The side-by-side two-panel layout must stack
vertically, the geometric panel must size itself from its container instead of a fixed pixel prop,
touch targets need to be around 44 px, and nothing may depend on hover or a scroll wheel, since
neither exists. `references/react-artifacts.md` has the patterns. Test by narrowing the window until
it is phone-shaped and checking that the physics is still legible, not merely still present.

**Restraint in labelling.** Every label competes for attention with the physics. Prefer a legend of
two entries over six inline annotations. This discipline pays off twice on a phone, where there is no
room for the sixth annotation anyway — if a design only works at desktop width, it is usually
carrying clutter that the desktop version would be better without too.

## Bundled starting points

Copy these into your output rather than rewriting them. Artifacts are single-file, so these are
snippets to inline, not modules to import.

- `assets/bloch_sphere_svg.jsx` — 2D-projected Bloch sphere in SVG. **Prefer this.** It is lighter,
  crisper, trivially labelled with LaTeX, and for most sensing demos the extra depth cue of true 3D
  is not worth the cost.
- `assets/bloch_sphere_three.jsx` — three.js version with hand-rolled pointer-drag rotation, for when
  the user genuinely needs to inspect a trajectory from arbitrary angles.
- `assets/tex_component.jsx` — the KaTeX `<Tex>` helper.
- `assets/manim_scene_template.py` — Manim scene skeleton with the equation-transform patterns.

## Reference files

- `references/quantum-sensing-physics.md` — formulas, conventions, protocols, numerical recipes.
- `references/react-artifacts.md` — sandbox constraints, palette, layout patterns, KaTeX setup.
- `references/manim.md` — scene structure, equation choreography, layout discipline, render commands.
