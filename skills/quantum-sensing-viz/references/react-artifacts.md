# Building the interactive artifact

Read this before writing code. Several of these constraints fail *silently* — the artifact renders,
looks nearly right, and the interactive part quietly does nothing.

## Sandbox constraints

- **One file.** No imports from sibling files. Everything, including the snippets in `assets/`, gets
  inlined. Use a default export and give every prop a default so the component renders with none.
- **Tailwind is core utilities only** — there is no JIT compiler, so arbitrary values like
  `w-[437px]` or `text-[#58A6FF]` do nothing at all. For exact geometry and exact colors use inline
  `style={{ }}`. This is the constraint most likely to produce a subtly broken layout.
- **No `localStorage` or `sessionStorage`.** They are unavailable and will throw. Simulation state
  lives in `useState`/`useRef`.
- **No HTML `<form>` elements.** Use `onClick` and `onChange` handlers directly.
- **three.js is r128.** `THREE.OrbitControls` does not exist — camera rotation must be hand-rolled
  from pointer events (`assets/bloch_sphere_three.jsx` has a working implementation). `CapsuleGeometry`
  is also absent; build from `CylinderGeometry` plus `SphereGeometry`.
- **Available libraries:** `three`, `recharts`, `d3`, `plotly`, `mathjs`, `lodash`, `chart.js`,
  `papaparse`. External scripts load only from `https://cdnjs.cloudflare.com`.

Import syntax that trips people up:

```jsx
import { useState, useRef, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, ReferenceLine } from "recharts";
import * as THREE from "three";
import * as math from "mathjs";
```

## Palette

Colorblind-safe by construction: the primary distinction is blue versus orange, never red versus
green. Third and fourth series use hue *and* dash pattern together so the encoding survives
grayscale printing.

```js
const C = {
  bg:       "#0D1117",  // canvas / 3D background
  panel:    "#161B22",  // control surfaces
  grid:     "#30363D",  // axes, sphere wireframe, rules
  text:     "#E6EDF3",
  muted:    "#8B949E",  // secondary labels, units
  primary:  "#58A6FF",  // blue   — state A, |0>, the "ideal" trace
  accent:   "#FFA657",  // orange — state B, |1>, the "with noise" trace
  third:    "#7EE787",  // green  — pair with a dash pattern
  fourth:   "#D2A8FF",  // purple — pair with a dot pattern
  envelope: "#F85149",  // reserved for decay envelopes and limits only
};
```

Dark background for anything with a Bloch sphere, phase space, or glowing trajectory — vectors and
trails read far better against it. Light background (`#FAFAF8` with `#1C2128` text) for data-heavy
multi-panel plots that someone might print or drop into a paper.

Use opacity, not hue, for time: a trajectory trail fading from `1.0` to `0.15` over the last 200
samples reads as motion without adding a color to the legend.

For aesthetic direction beyond this palette — typography personality, layout concept — the general
`frontend-design` skill applies. This palette exists because scientific figures have accessibility and
convention constraints that general design guidance does not cover, so keep the palette and take the
rest from there.

## The synchronized two-panel layout

This is the workhorse. Left panel geometric (Bloch sphere, phase space, spacetime diagram), right
panel a trace (population, fringe, coherence) with a cursor at the current time. Both driven by one
piece of state.

```jsx
const [t, setT] = useState(0);          // simulation time, single source of truth
const trajectory = useRef([]);          // accumulated history

// both panels read from the same t; the cursor and the vector can never disagree
```

Below them, a compact control row. Above them, a one-line statement of what the user is looking at.
Resist a header, a subtitle, a description paragraph, and a legend — pick the two that earn it.

On a narrow screen the two panels stack vertically, geometry on top and trace below. Keep that order:
the trace is the thing you can shrink without losing meaning, and it belongs nearer the controls.
`flex-wrap` with a `min-width` on each panel handles this without a breakpoint:

```jsx
<div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
  <div style={{ flex: "1 1 300px", minWidth: 260 }}>{/* Bloch sphere */}</div>
  <div style={{ flex: "1 1 320px", minWidth: 260 }}>{/* trace */}</div>
</div>
```

## Animation loop

Use `requestAnimationFrame` with time-based stepping so playback speed does not depend on the user's
refresh rate:

```jsx
useEffect(() => {
  if (!playing) return;
  let raf, last = performance.now();
  const tick = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05); // clamp after tab-switch
    last = now;
    setT(prev => prev + dt * speed);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}, [playing, speed]);
```

The clamp matters: without it, returning to a backgrounded tab jumps `dt` to several seconds and the
integrator explodes.

**Performance.** Driving a few dozen SVG elements from React state at 60 fps is fine. Once you are
past roughly 200 moving elements — an ensemble of Bloch vectors, a dense trajectory — switch that
panel to `<canvas>` and draw imperatively in the rAF callback, keeping React state only for the
controls. Re-rendering hundreds of nodes every frame is what makes an otherwise good demo feel
sluggish, and sluggishness reads as *the physics is complicated* rather than *the code is slow*.

## LaTeX with KaTeX

`assets/tex_component.jsx` has the full component. The essentials: load CSS and JS from cdnjs in an
effect, gate rendering on a `ready` flag, and always pass a plain-text fallback so a CDN hiccup
degrades to readable text rather than a blank label.

```jsx
<Tex tex="\Delta\omega/2\pi" fallback="dw/2pi" />
```

Use it for axis labels, slider labels, state kets, and any inline symbol. `$\pi/2$ pulse` set in
proper math type is a small thing that signals the tool was built by someone who knows the field.

Two caveats: KaTeX inside SVG needs a `<foreignObject>` wrapper, and KaTeX strings in JSX need
doubled backslashes (`"\\Omega_R"`).

## Controls

- Sliders for continuous physical parameters, with the current value shown in units next to the label.
- Toggles for discrete choices (echo on/off, ensemble on/off) — these are usually the highest-value
  control, since the *comparison* is the lesson.
- Play/pause plus a reset. A scrubber if the user is likely to want to inspect a specific moment.
- Give slider ranges physical sense: let $T_2$ go far enough that decoherence visibly dominates, and
  let detuning reach zero exactly so the flat-fringe limit is reachable.

Every control should change something visible. A slider whose effect is invisible at default settings
is worse than no slider — it teaches that the parameter does not matter.

## Phone view

Assume 380 px wide and touch-only. These demos get opened on phones constantly — passed to a
colleague at the bench, opened by a student on the bus — and a simulation that is technically present
but unreadable at that width has failed at its one job.

**Size from the container, not from a prop.** A hardcoded `size={360}` overflows a phone and produces
horizontal scroll, which on touch feels like the page is broken. Measure the parent instead:

```jsx
function useWidth(ref, fallback = 320) {
  const [w, setW] = useState(fallback);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return w;
}

const size = Math.max(240, Math.min(width, 420));   // floor keeps it legible, ceiling keeps it sane
```

For SVG, the cheaper route is a fixed `viewBox` with `width="100%"` and `height="auto"` — it scales
perfectly and the stroke widths scale with it.

**No hover, no wheel.** Tooltips that only appear on hover are invisible on touch; put the value in a
persistent readout next to the slider instead. Wheel-zoom has no touch equivalent, so any zoom needs
either pinch handling or a pair of buttons. Drag-to-rotate does work, but see the scroll conflict below.

**Touch targets around 44 px.** Native `<input type="range">` has a thumb far smaller than that. Give
sliders `height: 44px` on the input with a custom thumb, or add vertical padding so the hit area is
generous even if the track looks thin. Buttons the same. Cramped controls turn a good demo into a
frustrating one faster than any physics error.

**The scroll conflict.** `touchAction: "none"` on a drag-rotatable Bloch sphere means a vertical swipe
that starts on the sphere rotates it instead of scrolling the page. That is correct behaviour, but
only if the user can still scroll somewhere — so never let an interactive canvas span the full
viewport height on mobile. Leave visible margin above or below.

**Pinch to zoom** needs two-pointer tracking, since there is no `wheel` event:

```jsx
const ptrs = useRef(new Map());
const onDown = (e) => { ptrs.current.set(e.pointerId, e); /* ... */ };
const onMove = (e) => {
  ptrs.current.set(e.pointerId, e);
  if (ptrs.current.size === 2) {
    const [a, b] = [...ptrs.current.values()];
    const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    if (pinchRef.current) setDist(clamp(startDist * pinchRef.current / d));
    else pinchRef.current = d;
    return;                        // two fingers means zoom, never rotate
  }
  /* single-pointer rotate */
};
const onUp = (e) => { ptrs.current.delete(e.pointerId); if (ptrs.current.size < 2) pinchRef.current = null; };
```

**Typography and performance.** LaTeX labels below about 11 px stop being readable — drop the least
important labels on narrow screens rather than shrinking everything uniformly. And mobile GPUs are
much weaker: cap `devicePixelRatio` at 2, cut ensemble vector counts (20 on a phone versus 100 on
desktop is usually indistinguishable pedagogically), and shorten trail lengths.

## Before shipping

- Does it render with no props?
- Do the sanity-check limits in the physics reference hold on screen?
- Any arbitrary-value Tailwind classes left in?
- Does every control produce a visible change?
- **Narrow the window to phone width: do the panels stack, does the geometry stay legible, can every
  control still be hit with a thumb, is there no horizontal scroll?**
- Is there anything on screen you could delete without losing the lesson? Delete it.
