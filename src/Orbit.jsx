import { useEffect, useRef } from "react";

/*
  The hero's orbital system, drawn on a plain 2D canvas (no 3D library).
  MNGM Group is the particle core; each venture is a lit node on its own orbit.
  Particles assemble from a scattered cloud on load, and the cursor tilts the camera.
*/

const TAU = Math.PI * 2;

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// Deterministic random so the scatter looks the same on every load
function rng(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function buildScene(ventures, mobile) {
  const rand = rng(7);
  const count = mobile ? 650 : 1250;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const tints = ventures.map((v) => hexToRgb(v.accent));

  const core = Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const tint = tints[Math.floor(((theta % TAU) / TAU) * tints.length)];
    const mix = 0.18 + rand() * 0.3;
    return {
      x: Math.cos(theta) * r,
      y,
      z: Math.sin(theta) * r,
      sx: (rand() - 0.5) * 9,
      sy: (rand() - 0.5) * 6,
      sz: (rand() - 0.5) * 9,
      delay: rand() * 0.45,
      color: [0, 1, 2].map((k) => Math.round(238 * (1 - mix) + tint[k] * mix)),
    };
  });

  const orbits = ventures.map((venture, i) => ({
    name: venture.name,
    rgb: tints[i],
    radius: 1.45 + i * 0.24,
    tiltX: [0.42, -0.3, 0.22, -0.4][i % 4],
    tiltZ: [0.2, 0.5, -0.38, -0.12][i % 4],
    speed: [0.22, -0.16, 0.12, -0.09][i % 4],
    phase: i * 1.7,
  }));

  const stars = Array.from({ length: mobile ? 90 : 180 }, () => ({
    x: rand(),
    y: rand(),
    size: rand() * 1.2 + 0.3,
    twinkle: rand() * TAU,
  }));

  return { core, orbits, stars };
}

function rotate(p, yaw, pitch) {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const x = p.x * cy - p.z * sy;
  const z = p.x * sy + p.z * cy;
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  return { x, y: p.y * cp - z * sp, z: p.y * sp + z * cp };
}

// A point on a ring of radius r, tilted around the X and Z axes
function ringPoint(angle, orbit) {
  let x = Math.cos(angle) * orbit.radius;
  let y = 0;
  let z = Math.sin(angle) * orbit.radius;
  const ca = Math.cos(orbit.tiltX);
  const sa = Math.sin(orbit.tiltX);
  [y, z] = [y * ca - z * sa, y * sa + z * ca];
  const cb = Math.cos(orbit.tiltZ);
  const sb = Math.sin(orbit.tiltZ);
  [x, y] = [x * cb - y * sb, x * sb + y * cb];
  return { x, y, z };
}

const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function Orbit({ ventures }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const scene = buildScene(ventures, mobile);

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let visible = true;
    const start = performance.now();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(now) {
      const time = reduced ? 8 : (now - start) / 1000;
      const assemble = reduced ? 1 : Math.min(time / 2.6, 1);

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      const narrow = width < 760;
      const cx = narrow ? width * 0.5 : width * 0.68;
      const cy = narrow ? height * 0.29 : height * 0.47;
      const scale = Math.min(width, height) * (narrow ? 0.19 : 0.2);
      const yaw = time * 0.12 + pointer.x * 0.5;
      const pitch = 0.18 + pointer.y * 0.3;
      const camera = 6.5;

      const project = (p) => {
        const r = rotate(p, yaw, pitch);
        const k = camera / (camera + r.z);
        return { x: cx + r.x * scale * k, y: cy + r.y * scale * k, z: r.z, k };
      };

      ctx.clearRect(0, 0, width, height);

      // Background stars
      for (const s of scene.stars) {
        const a = 0.25 + 0.25 * Math.sin(time * 0.8 + s.twinkle);
        ctx.fillStyle = `rgba(220,226,255,${a.toFixed(3)})`;
        ctx.fillRect(s.x * width, s.y * height, s.size, s.size);
      }

      ctx.globalCompositeOperation = "lighter";

      // Soft core glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 1.9);
      glow.addColorStop(0, `rgba(150,140,255,${(0.16 * assemble).toFixed(3)})`);
      glow.addColorStop(0.5, `rgba(255,120,79,${(0.04 * assemble).toFixed(3)})`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(cx - scale * 2, cy - scale * 2, scale * 4, scale * 4);

      // Orbit rings and venture nodes
      const labels = [];
      for (const orbit of scene.orbits) {
        const [r, g, b] = orbit.rgb;
        const ringAlpha = 0.75 * Math.max(0, (assemble - 0.35) / 0.65);
        const steps = 420;
        for (let i = 0; i < steps; i++) {
          const p = project(ringPoint((i / steps) * TAU, orbit));
          const a = ringAlpha * (0.3 + 0.45 * (1 - (p.z + 3) / 6));
          ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`;
          ctx.fillRect(p.x, p.y, 1.1, 1.1);
        }

        const angle = orbit.phase + time * orbit.speed;
        // Comet tail behind the node
        for (let i = 1; i < 26; i++) {
          const p = project(ringPoint(angle - Math.sign(orbit.speed) * i * 0.022, orbit));
          const a = ringAlpha * 1.6 * (1 - i / 26);
          ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.8 * p.k * (1 - i / 30), 0, TAU);
          ctx.fill();
        }

        const node = project(ringPoint(angle, orbit));
        const size = 3.2 * node.k;
        const halo = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 9);
        halo.addColorStop(0, `rgba(${r},${g},${b},${(0.55 * ringAlpha * 2).toFixed(3)})`);
        halo.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = halo;
        ctx.fillRect(node.x - size * 9, node.y - size * 9, size * 18, size * 18);
        ctx.fillStyle = `rgba(255,255,255,${(ringAlpha * 2).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, TAU);
        ctx.fill();

        labels.push({ ...node, name: orbit.name, alpha: ringAlpha * 2 * (node.z < 0 ? 1 : 0.45) });
      }

      // Particle core
      for (const pt of scene.core) {
        const t = easeOutExpo(Math.max(0, Math.min((assemble - pt.delay) / (1 - pt.delay * 0.6), 1)));
        const breathe = 1 + 0.045 * Math.sin(time * 1.3 + pt.y * 4 + pt.x * 2);
        const p = project({
          x: pt.sx + (pt.x * breathe - pt.sx) * t,
          y: pt.sy + (pt.y * breathe - pt.sy) * t,
          z: pt.sz + (pt.z * breathe - pt.sz) * t,
        });
        const depth = 1 - (p.z + 1.2) / 2.4;
        const a = Math.max(0.06, Math.min(1, 0.15 + depth * 0.85)) * (0.4 + 0.6 * t);
        const [r, g, b] = pt.color;
        ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`;
        const s = 1.6 * p.k;
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      }

      ctx.globalCompositeOperation = "source-over";

      ctx.font = "500 12px 'Instrument Sans', sans-serif";
      ctx.textBaseline = "middle";
      for (const label of labels) {
        if (label.alpha <= 0.02) continue;
        ctx.fillStyle = `rgba(238,240,248,${Math.min(label.alpha, 0.9).toFixed(3)})`;
        ctx.fillText(label.name, label.x + 12, label.y);
      }
    }

    function loop(now) {
      draw(now);
      frame = requestAnimationFrame(loop);
    }

    function play() {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    }

    function pause() {
      running = false;
      cancelAnimationFrame(frame);
    }

    const onResize = () => {
      resize();
      if (!running) draw(performance.now());
    };

    const onPointer = (event) => {
      if (event.pointerType !== "mouse") return;
      pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const onVisibility = () => (document.hidden ? pause() : play());

    // Stop drawing once the hero is scrolled away
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });

    resize();
    draw(performance.now());
    observer.observe(canvas);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    // Redraw once the label font arrives (matters for the static reduced-motion frame)
    document.fonts?.ready.then(() => !running && draw(performance.now()));
    play();

    return () => {
      pause();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ventures]);

  return <canvas ref={canvasRef} className="orbit-canvas" aria-hidden="true" />;
}
