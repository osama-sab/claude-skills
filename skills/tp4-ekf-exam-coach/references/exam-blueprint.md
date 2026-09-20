# TP4 EKF — Exam Blueprint

Static intelligence for coaching the course's exam. The companion `exercise-tracker.md` holds the rated problem bank; this file holds the *structure* the coach reasons from.

---

## 1. Fixed architecture (every year 2022–2025)

3 h · one double-sided A4 sheet · no calculator · no phone. Four parts × 20 pts.

- **Part 1** — 10 conceptual short-answer questions (2 pts each), whole syllabus. All-or-nothing per question → breadth matters more than depth.
- **Part 2** — electrostatics / dielectric **boundary-value problem** (images, multipoles, or dielectric capacitor).
- **Part 3** — **magnetostatics in matter** ($\vec M, \vec B, \vec H$; solenoid or magnetized body; energy; force).
- **Part 4** — **radiation** (oscillating source; total power and/or far-field angular pattern).

**Grading rule #8:** state the governing law first, show all steps, circle the answer; partial credit for a clearly-presented wrong answer. The papers are *Gedächtnisprotokolle* (memory protocols) — exact numbers vary, the structure and problem *types* recur.

---

## 2. Topic tiers (by frequency)

**Tier 1 — every year.**
- **1.1 Magnetostatics in matter** — Part 3 staple.
- **1.2 Dipole radiation** — Part 4 staple (power $P$, pattern $dP/d\Omega\propto\sin^2\Theta$).
- **1.3 Multipole expansion** — quadrupole tensor $Q_{ij}$, dipole fields.
- **1.4 Images / uniqueness / Green's functions** — Part 2 staple.
- **1.5 Gauge freedom** — $\vec A\to\vec A+\nabla\chi$; gauge of the action.

**Tier 2 — most years.**
- **2.1 Dielectrics** — force on charge near dielectric, dielectric/cylindrical capacitor, $\sigma_P$.
- **2.2 Special relativity** — velocity addition, collisions→$M$, field transformation.
- **2.3 Magnetic moment, torque, force on a loop** — $\vec N=\vec m\times\vec B$, $\vec F=\nabla(\vec m\cdot\vec B)$.
- **2.4 Faraday / EMF / inductance.**
- **2.5 Gauss-law freebies & curl/divergence** — $\oint\vec B\cdot d\vec S=0$, $\nabla\times\vec E=0$, flux of a dipole $=0$.

**Tier 3 — covariant / field-theory layer (one or two per paper).**
- **3.1 Liénard–Wiechert / retarded potentials.**
- **3.2 EM waves** — $\vec B$ from a given $\vec E$, polarization, Poynting.
- **3.3 Field-theory formalism** — EM action, gauge of the action, particle Lagrangian, wave-equation Green's function.
- **3.4 Conservation laws** — Poynting, field momentum, stress tensor.

---

## 3. Past-paper anchors — the Probeprüfung 2025, decoded

The most representative paper. Each item, what it tests, and the anchor problem(s).

**Part 1**
1. $\nabla\times\vec F=0$ — $\vec F$ is the electrostatic field of a uniform ball → curl-free.
2. Force on a charge **inside a neutral conducting shell** — image charge, toward the nearest wall. *(J 2.2 / P 3.13 / P 3.6)*
3. Conductors at given $\Phi_i$ — uniqueness; the $\Phi_i$ are the Dirichlet data. *(G 3.4)*
4. Charge between two antiparallel wires at angle $\alpha$ — $q\vec v\times\vec B$ geometry. *(P 5.13 / J 11.11)*
5. Flux of a magnetic dipole's $\vec B$ through a sphere $=0$. *(freebie)*
6. Compare torques $N_i=|\vec m\times\vec B|$. *(J 5.5 / P 11.4)*
7. $m_y$ of a non-planar loop: $\vec m = I\!\int \tfrac12\,\vec r\times d\vec\ell$.
8. $\vec A'=\vec A+a(\vec r\cdot\hat x)\hat x = \vec A+\nabla(\tfrac a2 x^2)$ → same $\vec B$. *(J 12.2 / G 5.24)*
9. Wave-equation Green's function depends only on the operator, not the source. *(§6.6)*
10. Two particles at $c/2$ opposite → $u=\tfrac45 c$. *(P 5.9)*

**Part 2** — dipole a distance $a$ from a grounded plane: force + induced $\sigma$ → **image dipole** (differentiate the point-charge image). *(J 2.1 / P 3.13)*
**Part 3** — uniformly magnetized plate, $\vec M\perp$ and $\vec M\parallel$ → magnetic-charge method. *(J 5.12–14 / P 11.8)*. Target: $\vec M\perp$ slab → $\vec H=-\vec M$, $\vec B_{\text{in}}=0$.
**Part 4** — derive $\vec E_\omega$ from $\vec H_\omega$ via $\vec E_\omega=\tfrac{i}{k}\tfrac{1}{\varepsilon_0 c}\nabla\times\vec H_\omega$ → curl of $e^{ikr}/r$ and $\hat n$. *(re-derive J §9.2–9.3)*

**Recurring across 2022–2024** (problem types to expect again):
- Part 2: quadrupole tensor + field + flux (2023); cylindrical dielectric capacitor + $\sigma_P$ (2024); dipole–charge force (2022).
- Part 3: infinite/finite solenoid with $\mu$ — $\vec M,\vec B,\vec H$, energy, half-filled force (2022, 2023); small solenoid as a dipole + force (2024).
- Part 4: radiating charged pendulum (2023); charged rod on a spring (2024); oscillating parallel-plate capacitor (2022).
- Part 1 favourites: gauge tests, velocity addition / collisions→$M$, dipole flux $=0$, para/diamagnet force, induced EMF, $\vec B$ from a given $\vec E$, retarded-potential form for $v\approx c$, relativistic invariance of the Coulomb gauge (no).

---

## 4. Per-Part signatures & generation recipes (for mock assembly)

Build fresh Fine-style problems calculator-free, ★3 (≤ one ★4).

**Part 1 (×10).** One or two per tier; lean on freebies. Templates: "is [gauge/quantity] X invariant/possible? why?"; "what is the flux of [field] through [closed surface]?"; "which system radiates more / has larger torque, and why?"; "compute the velocity / mass after this relativistic process"; "can $\nabla\cdot\vec H\neq0$ at this interface?"; "give $\vec B$ for this plane-wave $\vec E$."

**Part 2 — electrostatics/dielectric BVP.** Pick one motif:
- *Images:* point charge or dipole near a grounded plane/sphere → force + induced $\sigma$.
- *Multipoles:* a few point charges → quadrupole tensor, far field to order $(l/a)^2$, total flux.
- *Dielectrics:* cylindrical/spherical/parallel-plate capacitor, partly filled → capacitance, $\sigma_P$, force on the dielectric.

**Part 3 — magnetostatics in matter.** Pick one:
- Long/finite solenoid filled (or half-filled) with $\mu$ → $\vec M,\vec B,\vec H$, magnetic energy, force on the material.
- Uniformly magnetized body (slab/cylinder/sphere) → $\vec B,\vec H$ via $\rho_M,\sigma_M$ at stated points.
- Small solenoid as a dipole + a loop → magnetic moment and force.

**Part 4 — radiation.** A localized oscillating source (oscillating dipole, charge on a spring/pendulum, rotating charges, oscillating capacitor) → $\vec p(t)\to\ddot{\vec p}\to P=\dfrac{\ddot p^{\,2}}{6\pi\varepsilon_0 c^3}$ and $\dfrac{dP}{d\Omega}\propto\sin^2\Theta$; ask for the energy current at specific points by their angle to the axis. Far-field assumption stated.

---

## 5. Difficulty calibration

★1 one-step/concept · ★2 routine · ★3 moderate (the exam's working level) · ★4 hard/combined · ★5 special functions or deep subtlety. The Part 2/3/4 problems sit at ★3 with the occasional ★4; Part 1 is mostly ★1–2. If a student's own rating runs a notch above this for a tier, that tier needs another pass.

---

## 6. Cheat-sheet essentials (the A4)

High-density machinery to fit first; then fill remaining space from the student's error log.

- **Multipoles:** $Q_{ij}=\sum_k q_k(3x_ix_kx_j-r_k^2\delta_{ij})$; $\Phi=\tfrac{1}{4\pi\varepsilon_0}\big[\tfrac{q}{r}+\tfrac{\vec p\cdot\hat r}{r^2}+\dots\big]$; dipole field $\vec E=\tfrac{1}{4\pi\varepsilon_0 r^3}[3(\vec p\cdot\hat r)\hat r-\vec p]$.
- **Images:** charge–plane (image $-q$); charge–grounded sphere (image $q'=-qR/d$ at $R^2/d$).
- **Boundary conditions:** $E_\parallel, D_\perp$ continuous (free $\sigma$); $H_\parallel, B_\perp$ continuous; bound $\sigma_b=\vec P\cdot\hat n$, $\sigma_M=\vec M\cdot\hat n$.
- **Matter:** $\vec D=\varepsilon_0\vec E+\vec P$; $\vec B=\mu_0(\vec H+\vec M)$; $\rho_M=-\nabla\cdot\vec M$. Solenoid: $\vec B=\mu n I$ inside; energy $\tfrac12\int\vec H\cdot\vec B\,dV$; force $F=-\partial U/\partial x$.
- **Radiation:** Larmor $P=\dfrac{q^2 a^2}{6\pi\varepsilon_0 c^3}$ (dipole $\to \ddot p^{\,2}$); $\dfrac{dP}{d\Omega}=\dfrac{\ddot p^{\,2}\sin^2\Theta}{16\pi^2\varepsilon_0 c^3}$; far fields $\vec E=\tfrac1c\hat n\times(\hat n\times\dots)$; the $\nabla(e^{ikr}/r)$ identity.
- **Relativity:** velocity addition $u'=\dfrac{u_1+u_2}{1+u_1u_2/c^2}$; $\vec E'_\parallel=\vec E_\parallel$, $\vec E'_\perp=\gamma(\vec E+\vec v\times\vec B)_\perp$ (and dual for $\vec B$); invariants $\vec E\cdot\vec B$, $E^2-c^2B^2$; $p^\mu p_\mu=-m^2c^2$.
- **Potentials/gauge:** $\vec E=-\nabla\Phi-\partial_t\vec A$, $\vec B=\nabla\times\vec A$; gauge $\vec A\to\vec A+\nabla\chi$, $\Phi\to\Phi-\partial_t\chi$; Lorenz vs. Coulomb. Liénard–Wiechert $\Phi=\tfrac{1}{4\pi\varepsilon_0}\tfrac{q}{(1-\hat n\cdot\vec\beta)R}\big|_{\text{ret}}$.
- **Green's functions:** Laplace $G=-\tfrac{1}{4\pi|\vec r-\vec r'|}$; retarded $G=\tfrac{\delta(t'-(t-|\vec r-\vec r'|/c))}{4\pi|\vec r-\vec r'|}$ — depends only on the operator.

---

## 7. Five-week flow (default; compress for shorter runways)

Reserve the **2022 Altklausur** as the untouched cold mock.

- **W1 — Electrostatics & images:** Tiers 1.4 + 2.5 → redo Probe Part 2, Probe Q2.
- **W2 — Multipoles & dielectrics:** Tiers 1.3 + 2.1 → redo 2023 A2, 2024 A2.
- **W3 — Magnetostatics, moments & induction:** Tiers 1.1 + 2.3 + 2.4 → redo 2023 A3, 2024 A3, Probe Part 3. *(densest week)*
- **W4 — Radiation, retarded fields & conservation:** Tiers 1.2 + 3.1 + 3.4 → re-derive J §9.2–9.3, redo Probe Part 4, 2023/2024 A4; **Mock 1** = timed re-sit of Probe 2025.
- **W5 — Relativity, gauge, waves, field theory + final mock:** Tiers 2.2 + 1.5 + 3.2 + 3.3 → **Mock 2** = cold 2022 Altklausur; finalize the A4 sheet from mistakes.

If only days remain: the Part 2/3/4 engines (Tiers 1.1, 1.2, 1.4, 2.1) plus Part-1 freebies (Tier 2.5) are the rescue set.

---

## 8. Exam-day tactics

Part 1 first and fast; bank the freebies. Lead Parts 2–4 with the governing law (rule #8). Keep $\vec M\to\vec H\to\vec B$ explicit. Sketch the radiation pattern even when only a number is asked. Circle answers. A4 sheet built last, from mock mistakes.
