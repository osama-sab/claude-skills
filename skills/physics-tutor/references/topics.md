# Physics Tutor — Topic Scope Reference

Full breakdown of topics covered by the physics-tutor skill.
Read this when you need to assess whether a topic is in scope or to find the right sub-area to teach.

---

## Electrostatics

- Coulomb's law, superposition principle
- Electric field $\mathbf{E}$, electric potential $\phi$
- Gauss's law in integral and differential form: $\nabla \cdot \mathbf{E} = \rho/\varepsilon_0$
- Poisson's equation $\nabla^2 \phi = -\rho/\varepsilon_0$ and Laplace's equation $\nabla^2 \phi = 0$
- Boundary value problems:
  - Separation of variables (Cartesian, spherical, cylindrical)
  - Green's functions and Green's theorem
  - Method of images
- Multipole expansion: monopole, dipole $\mathbf{p}$, quadrupole $Q_{ij}$
- Energy of the field: $u = \frac{\varepsilon_0}{2}|\mathbf{E}|^2$
- Conductors, capacitance, energy storage
- Dielectrics: polarization $\mathbf{P}$, displacement field $\mathbf{D}$, boundary conditions

---

## Magnetostatics

- Biot–Savart law, Ampère's law: $\nabla \times \mathbf{B} = \mu_0 \mathbf{J}$
- Vector potential $\mathbf{A}$, $\mathbf{B} = \nabla \times \mathbf{A}$
- Gauge freedom in magnetostatics (Coulomb gauge $\nabla \cdot \mathbf{A} = 0$)
- Magnetic multipole expansion
- Magnetization $\mathbf{M}$, $\mathbf{H}$ field, boundary conditions
- Magnetic energy: $u = \frac{1}{2\mu_0}|\mathbf{B}|^2$

---

## Maxwell's Equations & EM Waves

- Full Maxwell's equations (integral and differential form, SI and Gaussian)
- Displacement current, consistency with charge conservation
- Electromagnetic waves in vacuum: wave equation, speed $c = 1/\sqrt{\mu_0 \varepsilon_0}$
- Polarization states: linear, circular, elliptical
- Energy transport: Poynting vector $\mathbf{S} = \frac{1}{\mu_0}\mathbf{E}\times\mathbf{B}$
- Momentum density, radiation pressure
- EM waves in matter: dispersion, absorption, reflection/transmission (Fresnel equations)
- Waveguides and cavities: TE, TM, TEM modes, cutoff frequency
- Optical fibers (brief)

---

## Potentials and Gauges

- Scalar and vector potentials $(\phi, \mathbf{A})$
- Gauge transformations: $\mathbf{A} \to \mathbf{A} + \nabla\chi$, $\phi \to \phi - \partial_t \chi$
- Coulomb gauge: $\nabla \cdot \mathbf{A} = 0$
- Lorenz gauge: $\nabla \cdot \mathbf{A} + \frac{1}{c^2}\partial_t \phi = 0$
- Wave equations for potentials in Lorenz gauge
- Physical vs gauge degrees of freedom

---

## Radiation

- Fields of a moving charge: Liénard–Wiechert potentials
  $$\phi = \frac{q}{4\pi\varepsilon_0}\frac{1}{(1 - \hat{\mathbf{n}}\cdot\boldsymbol{\beta})R}\bigg|_{\text{ret}}$$
- Radiation from accelerating charges: Larmor formula
  $$P = \frac{q^2 a^2}{6\pi\varepsilon_0 c^3}$$
- Electric dipole radiation, magnetic dipole radiation
- Quadrupole radiation and beyond
- Synchrotron radiation, cyclotron radiation
- Relativistic generalization: Liénard formula
- Radiation reaction, Abraham–Lorentz force (and its problems)
- Scattering: Thomson scattering, Rayleigh scattering

---

## Special Relativity & Covariant Formulation

- Lorentz transformations, spacetime interval $ds^2 = -c^2 dt^2 + d\mathbf{x}^2$
- 4-vectors: $x^\mu = (ct, \mathbf{x})$, $p^\mu = (E/c, \mathbf{p})$, $J^\mu = (c\rho, \mathbf{J})$
- Metric tensor $\eta_{\mu\nu}$, raising/lowering indices
- Electromagnetic field tensor:
  $$F^{\mu\nu} = \partial^\mu A^\nu - \partial^\nu A^\mu$$
- Maxwell's equations in covariant form:
  $$\partial_\mu F^{\mu\nu} = \mu_0 J^\nu, \quad \partial_{[\mu}F_{\nu\lambda]} = 0$$
- Dual tensor $\tilde{F}^{\mu\nu} = \frac{1}{2}\varepsilon^{\mu\nu\lambda\sigma}F_{\lambda\sigma}$
- Lorentz transformation of $\mathbf{E}$ and $\mathbf{B}$ fields
- Invariants: $F_{\mu\nu}F^{\mu\nu} = 2(B^2 - E^2/c^2)$, $F_{\mu\nu}\tilde{F}^{\mu\nu} \propto \mathbf{E}\cdot\mathbf{B}$
- 4-potential $A^\mu = (\phi/c, \mathbf{A})$, Lorenz gauge as $\partial_\mu A^\mu = 0$

---

## Classical Field Theory

- Action principle for fields: $S = \int \mathcal{L}(\phi, \partial_\mu \phi)\, d^4x$
- Euler–Lagrange equations for fields:
  $$\partial_\mu \frac{\partial \mathcal{L}}{\partial(\partial_\mu \phi)} - \frac{\partial \mathcal{L}}{\partial \phi} = 0$$
- Lagrangian density for the EM field:
  $$\mathcal{L} = -\frac{1}{4\mu_0}F_{\mu\nu}F^{\mu\nu} - J^\mu A_\mu$$
- Noether's theorem: every continuous symmetry → conserved current
  - Translation symmetry → stress-energy tensor $T^{\mu\nu}$
  - $U(1)$ phase symmetry → charge conservation
  - Lorentz symmetry → angular momentum tensor
- Canonical stress-energy tensor $T^{\mu\nu}$ and its symmetrization (Belinfante tensor)
- Gauge invariance as a local $U(1)$ symmetry, minimal coupling
- Complex scalar field + EM field as prototype of gauge theory

---

## Intro to Relativistic Field Theory / QFT Adjacent

*(Conceptual level only — no full QFT)*

- From classical field theory to quantum: canonical quantization sketch
- Normal modes of the EM field as harmonic oscillators
- Photons as quanta of the EM field (conceptual)
- Path integral idea: $Z = \int \mathcal{D}A\, e^{iS[A]/\hbar}$ — what it means, not how to compute
- Gauge fixing in the path integral (Faddeev-Popov, conceptual)
- Running coupling, vacuum polarization (qualitative)

---

## Key Textbook Cross-References

| Topic | Purcell & Morin | Griffiths | Jackson | Landau & Lifshitz |
|---|---|---|---|---|
| Electrostatics | Ch. 1–3 | Ch. 2–3 | Ch. 1–3 | §1–§6 |
| Magnetostatics | Ch. 6 | Ch. 5 | Ch. 5–6 | §28–§33 |
| Maxwell / Waves | Ch. 7, 9 | Ch. 7–9 | Ch. 6–8 | §46–§59 |
| Potentials/Gauge | Ch. 10 | Ch. 10 | Ch. 6 | §18–§19 |
| Radiation | Ch. 11 | Ch. 11 | Ch. 9–10, 14 | §66–§74 |
| Covariant EM | Ch. 5 (relativity) | Ch. 12 | Ch. 11–12 | §23–§26, §30–§34 |
| Field Theory | — | — | Ch. 12 | §27, §32–§34 |
