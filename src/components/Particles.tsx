"use client";

import { useEffect, useRef } from "react";

/**
 * Drifting gold light — a lightweight canvas (no libraries).
 * Pauses when off-screen or tab hidden; renders a still frame for reduced motion.
 */
export default function Particles({ density = 70, className = "" }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; t: number; s: number };
    let ps: P[] = [];

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(density * Math.min(1, (w * h) / (1440 * 900)) + 18);
      ps = Array.from({ length: n }, () => spawn(true));
    };
    const spawn = (anywhere = false): P => ({
      x: Math.random() * w,
      y: anywhere ? Math.random() * h : h + 10,
      r: Math.random() < 0.12 ? 1.6 + Math.random() * 2.2 : 0.4 + Math.random() * 1.1,
      vy: 0.08 + Math.random() * 0.32,
      vx: (Math.random() - 0.5) * 0.12,
      a: 0.25 + Math.random() * 0.65,
      t: Math.random() * Math.PI * 2,
      s: 0.005 + Math.random() * 0.02,
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        const tw = 0.55 + 0.45 * Math.sin(p.t);
        const alpha = p.a * tw;
        if (p.r > 1.5) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
          g.addColorStop(0, `rgba(255,232,170,${alpha * 0.55})`);
          g.addColorStop(1, "rgba(234,208,143,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = `rgba(250,226,160,${alpha})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    };
    const step = () => {
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.y -= p.vy; p.x += p.vx + Math.sin(p.t * 0.5) * 0.08; p.t += p.s;
        if (p.y < -10) ps[i] = spawn();
      }
      draw();
      if (visible) raf = requestAnimationFrame(step);
    };

    resize();
    if (reduce) { draw(); } else { raf = requestAnimationFrame(step); }

    const io = new IntersectionObserver(([e]) => {
      const was = visible; visible = e.isIntersecting && !document.hidden;
      if (!reduce && visible && !was) raf = requestAnimationFrame(step);
    });
    io.observe(canvas);
    const onVis = () => { const was = visible; visible = !document.hidden; if (!reduce && visible && !was) raf = requestAnimationFrame(step); };
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, [density]);

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden />;
}
