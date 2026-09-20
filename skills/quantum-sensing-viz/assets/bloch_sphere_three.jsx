// three.js Bloch sphere for artifacts. Use this only when the user genuinely needs to inspect a
// trajectory from arbitrary angles — otherwise bloch_sphere_svg.jsx is lighter and sharper.
//
// The artifact sandbox ships three.js r128, which has NO OrbitControls. The drag-to-rotate below
// is hand-rolled from pointer events; do not try to import OrbitControls, it does not exist and
// the failure is silent.
//
// Pass r = [x, y, z] and an optional trail (array of [x, y, z], oldest first).
// Convention: |0> at +z (north pole).

import { useRef, useEffect } from "react";
import * as THREE from "three";

function BlochSphereThree({ r = [0, 0, 1], trail = [], size = 360, vectorColor = 0x58a6ff }) {
  const mountRef = useRef(null);
  const stateRef = useRef({ r, trail });
  stateRef.current = { r, trail };   // latest values without re-running the effect

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // Size from the container, capped by `size`, so a 380px phone viewport never overflows.
    // devicePixelRatio is capped at 2 — mobile GPUs choke on 3x for little visible gain.
    const fit = () => {
      const w = Math.max(240, Math.min(mount.clientWidth || size, size));
      renderer.setSize(w, w);
      mount.style.height = `${w}px`;
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(mount);

    // --- Sphere: low opacity so it never competes with the vector -------------
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(1, 48, 32),
      new THREE.MeshBasicMaterial({ color: 0x30363d, transparent: true, opacity: 0.09 })
    ));
    scene.add(new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(1, 16, 10)),
      new THREE.LineBasicMaterial({ color: 0x30363d, transparent: true, opacity: 0.22 })
    ));

    // --- Equator and meridian -------------------------------------------------
    const ring = (rotX) => {
      const pts = [];
      for (let i = 0; i <= 128; i++) {
        const t = (i / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(t), Math.sin(t), 0));
      }
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: 0x8b949e, transparent: true, opacity: 0.45 })
      );
      line.rotation.x = rotX;
      return line;
    };
    scene.add(ring(0), ring(Math.PI / 2));

    // --- Axes ------------------------------------------------------------------
    const axisMat = new THREE.LineBasicMaterial({ color: 0x8b949e, transparent: true, opacity: 0.5 });
    [[1.25, 0, 0], [0, 1.25, 0], [0, 0, 1.25]].forEach((a) => {
      scene.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-a[0], -a[1], -a[2]),
          new THREE.Vector3(a[0], a[1], a[2]),
        ]),
        axisMat
      ));
    });

    // --- State vector ----------------------------------------------------------
    const arrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 1, vectorColor, 0.16, 0.09
    );
    scene.add(arrow);

    // Preallocate the trail buffer — reallocating geometry every frame is what makes
    // three.js artifacts stutter.
    const MAX_TRAIL = 2000;
    const trailPos = new Float32Array(MAX_TRAIL * 3);
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPos, 3));
    const trailLine = new THREE.Line(
      trailGeo,
      new THREE.LineBasicMaterial({ color: vectorColor, transparent: true, opacity: 0.55 })
    );
    scene.add(trailLine);

    // --- Hand-rolled orbit -----------------------------------------------------
    const cam = { az: -0.8, el: 0.35, dist: 3.6 };
    const applyCamera = () => {
      camera.position.set(
        cam.dist * Math.cos(cam.el) * Math.cos(cam.az),
        cam.dist * Math.cos(cam.el) * Math.sin(cam.az),
        cam.dist * Math.sin(cam.el)
      );
      camera.up.set(0, 0, 1);          // z is "up" on a Bloch sphere, not three.js's default y
      camera.lookAt(0, 0, 0);
    };
    applyCamera();

    let dragging = null;
    let pinch = null;
    const ptrs = new Map();          // multi-pointer tracking: touch has no wheel event
    const el = renderer.domElement;
    el.style.touchAction = "none";   // required for drag-rotate; leave scrollable margin around this
    el.style.cursor = "grab";

    const spread = () => {
      const [a, b] = [...ptrs.values()];
      return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    };

    const onDown = (e) => {
      ptrs.set(e.pointerId, e);
      el.setPointerCapture(e.pointerId);
      if (ptrs.size === 2) {
        pinch = { d0: spread(), dist0: cam.dist };
        dragging = null;             // second finger cancels rotation cleanly
      } else if (ptrs.size === 1) {
        dragging = { x: e.clientX, y: e.clientY, az: cam.az, el: cam.el };
        el.style.cursor = "grabbing";
      }
    };

    const onMove = (e) => {
      if (!ptrs.has(e.pointerId)) return;
      ptrs.set(e.pointerId, e);

      if (ptrs.size >= 2 && pinch) {
        const d = spread();
        if (d > 0) cam.dist = Math.max(2.2, Math.min(7, (pinch.dist0 * pinch.d0) / d));
        applyCamera();
        return;                      // two fingers means zoom, never rotate
      }
      if (!dragging) return;
      cam.az = dragging.az - (e.clientX - dragging.x) * 0.008;
      cam.el = Math.max(-1.45, Math.min(1.45, dragging.el + (e.clientY - dragging.y) * 0.008));
      applyCamera();
    };

    const onUp = (e) => {
      ptrs.delete(e.pointerId);
      if (ptrs.size < 2) pinch = null;
      if (ptrs.size === 0) { dragging = null; el.style.cursor = "grab"; }
    };

    const onWheel = (e) => {
      e.preventDefault();
      cam.dist = Math.max(2.2, Math.min(7, cam.dist + e.deltaY * 0.002));
      applyCamera();
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("wheel", onWheel, { passive: false });

    // --- Render loop -----------------------------------------------------------
    let raf;
    const tick = () => {
      const { r: rv, trail: tr } = stateRef.current;
      const len = Math.hypot(rv[0], rv[1], rv[2]);
      if (len > 1e-6) {
        arrow.setDirection(new THREE.Vector3(rv[0], rv[1], rv[2]).normalize());
        arrow.setLength(len, Math.min(0.16, len * 0.3), Math.min(0.09, len * 0.17));
      }
      const n = Math.min(tr.length, MAX_TRAIL);
      for (let i = 0; i < n; i++) {
        const p = tr[tr.length - n + i];
        trailPos[i * 3] = p[0]; trailPos[i * 3 + 1] = p[1]; trailPos[i * 3 + 2] = p[2];
      }
      trailGeo.setDrawRange(0, n);
      trailGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("wheel", onWheel);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
      });
      renderer.dispose();
      if (el.parentNode) el.parentNode.removeChild(el);
    };
  }, [size, vectorColor]);

  // width:100% lets the ResizeObserver above pick up the real available width.
  return <div ref={mountRef} style={{ width: "100%", maxWidth: size, margin: "0 auto" }} />;
}
