# Animation Guide for Physics Tutor

This reference covers implementation patterns and quality standards for physics animations.
Read this file before generating any animation artifact.

---

## Quality Checklist

Before finalizing any animation, verify:

- [ ] **Physically accurate**: field directions correct, magnitudes to scale where feasible
- [ ] **Interactive**: at least one user-adjustable parameter via slider or button
- [ ] **Labeled**: axes labeled, key quantities annotated (with units where applicable)
- [ ] **Smooth**: 60fps target, no jank; use `requestAnimationFrame`
- [ ] **Color scheme**: high contrast, colorblind-friendly where possible; avoid red/green only
- [ ] **Self-contained**: single HTML file, no external dependencies beyond standard Canvas/SVG/JS
- [ ] **Controls clearly labeled**: sliders show current value, buttons have clear purpose

---

## Implementation Stack

Use plain HTML + Canvas or SVG + vanilla JS. No frameworks needed.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Dark background for field visualizations */
    body { background: #0d1117; color: #e6edf3; font-family: sans-serif; }
    canvas { display: block; margin: auto; border-radius: 8px; }
    .controls { display: flex; gap: 16px; justify-content: center; padding: 12px; flex-wrap: wrap; }
    .control-group { display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 13px; }
    input[type=range] { accent-color: #58a6ff; }
  </style>
</head>
<body>
  <canvas id="canvas" width="800" height="600"></canvas>
  <div class="controls">
    <!-- sliders go here -->
  </div>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    // animation loop
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // draw physics here
      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>
```

---

## Pattern Library

### 1. Electric Field Lines (point charges)

**Method**: Runge-Kutta integration along $\mathbf{E}$ direction from seed points near each charge.

Key parameters to expose:
- Number and sign of charges
- Charge magnitudes $q_1, q_2$
- Field line density

Color: use gradient from charge (bright) to far field (dimmer). Positive charges → warm colors (red/orange), negative → cool (blue/purple).

```javascript
// Field from a point charge at (cx, cy)
function eField(x, y, charges) {
  let ex = 0, ey = 0;
  for (const c of charges) {
    const dx = x - c.x, dy = y - c.y;
    const r2 = dx*dx + dy*dy;
    const r = Math.sqrt(r2);
    if (r < 1e-3) continue;
    const mag = c.q / r2;
    ex += mag * dx / r;
    ey += mag * dy / r;
  }
  return { ex, ey };
}

// Trace a field line via RK4
function traceFieldLine(x0, y0, charges, steps=300, ds=2) {
  const pts = [[x0, y0]];
  let x = x0, y = y0;
  for (let i = 0; i < steps; i++) {
    const {ex, ey} = eField(x, y, charges);
    const mag = Math.sqrt(ex*ex + ey*ey);
    if (mag < 1e-6) break;
    x += ds * ex / mag;
    y += ds * ey / mag;
    pts.push([x, y]);
    if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) break;
  }
  return pts;
}
```

### 2. Electromagnetic Wave Propagation

Show $\mathbf{E}$ and $\mathbf{B}$ as 3D-projected oscillating vectors propagating in $\hat{z}$.

Parameters to expose:
- Frequency / wavelength $\lambda$
- Polarization angle $\phi$
- Amplitude
- Play/pause

```javascript
// Project 3D to 2D isometric
function project(x, y, z) {
  return {
    px: cx + x * cos30 - y * cos30,
    py: cy - z + (x + y) * sin30 * 0.5
  };
}
```

### 3. Relativistic Effects (Lorentz)

Show length contraction and time dilation interactively.

Parameters:
- $\beta = v/c$ slider from 0 to 0.999
- Display $\gamma = 1/\sqrt{1-\beta^2}$ live
- Animate a ruler contracting and a clock ticking slower

### 4. Radiation Pattern (Dipole)

Draw the Larmor radiation pattern $\propto \sin^2\theta$ as a polar plot.

Parameters:
- Dipole orientation
- Frequency
- Toggle near field vs far field

```javascript
// Radiation pattern intensity
function intensity(theta, phi) {
  return Math.pow(Math.sin(theta), 2); // dipole
}
```

### 5. Spacetime Diagrams (Minkowski)

Draw light cones, worldlines, simultaneity lines.

Parameters:
- Boost velocity $\beta$
- Events (add/drag)
- Show proper time along worldlines

---

## Color Palette (recommended)

```
Background:   #0d1117
Grid lines:   #21262d
E-field:      #ff7b72  (warm red)
B-field:      #58a6ff  (cool blue)
Positive charge: #f78166
Negative charge: #79c0ff
Wave front:   #ffa657  (orange)
Labels:       #e6edf3
Accent:       #3fb950  (green, for energy/power)
```

---

## Common Physics Pitfalls to Avoid

1. **Field line density ≠ field strength** unless you're careful about seeding — normalize seed points properly
2. **Near field vs far field** — radiation fields fall as $1/r$, static fields as $1/r^2$ — animate both if relevant
3. **Retardation** — for moving charge animations, remember fields propagate at $c$, not instantaneously
4. **Sign conventions** — be consistent with the convention stated at the start of the session
5. **Scale** — when showing $\mathbf{E}$ and $\mathbf{B}$ together, use $c\mathbf{B}$ so they're the same order of magnitude
