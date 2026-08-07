import { useEffect, useRef } from "react";

import { isLand } from "./land-mask";

type Dot = { x: number; y: number; z: number };

/** Points terre en coordonnées cartésiennes unitaires (échantillonnage égal-aire). */
function buildDots() {
  const dots: Dot[] = [];
  const step = 1.25; // degrés de latitude
  for (let lat = -88; lat <= 88; lat += step) {
    const rad = (lat * Math.PI) / 180;
    const circumference = Math.cos(rad);
    const count = Math.max(6, Math.round((360 / step) * circumference));
    for (let i = 0; i < count; i++) {
      const lon = -180 + (360 / count) * i;
      if (!isLand(lon, lat)) continue;
      const lonRad = (lon * Math.PI) / 180;
      dots.push({
        x: Math.cos(rad) * Math.sin(lonRad),
        y: Math.sin(rad),
        z: Math.cos(rad) * Math.cos(lonRad),
      });
    }
  }
  return dots;
}

/**
 * Globe orthographique en points (2D, ligne fine, aucun volume ni ombre).
 * L'accent suit le fond : bleu en clair, or en sombre (--color-blue).
 */
export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dots = buildDots();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const styles = () => {
      const root = getComputedStyle(document.documentElement);
      return {
        accent: root.getPropertyValue("--color-blue").trim() || "#2c63c0",
        grid: root.getPropertyValue("--color-light-gray").trim() || "#d8d8d8",
      };
    };

    const draw = (t: number) => {
      const { accent, grid } = styles();
      const cx = width / 2;
      const cy = height / 2;
      const r = Math.min(width, height) / 2 - 6;

      ctx.clearRect(0, 0, width, height);

      // Rotation continue autour de l'axe polaire + légère inclinaison fixe.
      const spin = reduced ? -0.6 : (t / 1000) * 0.09 - 0.6;
      const tilt = (-16 * Math.PI) / 180;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      const project = (x: number, y: number, z: number) => {
        const rx = x * Math.cos(spin) + z * Math.sin(spin);
        const rz = -x * Math.sin(spin) + z * Math.cos(spin);
        const ry2 = y * cosT - rz * sinT;
        const rz2 = y * sinT + rz * cosT;
        return { sx: cx + rx * r, sy: cy - ry2 * r, z: rz2 };
      };

      // Graticule : méridiens et parallèles, trait fin.
      ctx.strokeStyle = grid;
      ctx.lineWidth = 0.6;
      ctx.globalAlpha = 0.85;
      for (let lon = -180; lon < 180; lon += 20) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 3) {
          const la = (lat * Math.PI) / 180;
          const lo = (lon * Math.PI) / 180;
          const p = project(
            Math.cos(la) * Math.sin(lo),
            Math.sin(la),
            Math.cos(la) * Math.cos(lo),
          );
          if (p.z < 0) {
            started = false;
            continue;
          }
          if (started) ctx.lineTo(p.sx, p.sy);
          else ctx.moveTo(p.sx, p.sy);
          started = true;
        }
        ctx.stroke();
      }
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 3) {
          const la = (lat * Math.PI) / 180;
          const lo = (lon * Math.PI) / 180;
          const p = project(
            Math.cos(la) * Math.sin(lo),
            Math.sin(la),
            Math.cos(la) * Math.cos(lo),
          );
          if (p.z < 0) {
            started = false;
            continue;
          }
          if (started) ctx.lineTo(p.sx, p.sy);
          else ctx.moveTo(p.sx, p.sy);
          started = true;
        }
        ctx.stroke();
      }

      // Points continents.
      ctx.fillStyle = accent;
      const size = Math.max(1.05, r / 140);
      for (const d of dots) {
        const p = project(d.x, d.y, d.z);
        if (p.z <= 0.02) continue;
        ctx.globalAlpha = 0.18 + p.z * 0.8;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size * (0.55 + p.z * 0.55), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) draw(0);
    else raf = requestAnimationFrame(loop);

    const onResize = () => {
      resize();
      if (reduced) draw(0);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
