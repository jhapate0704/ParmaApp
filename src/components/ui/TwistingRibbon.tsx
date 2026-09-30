"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface RibbonColors {
  face?: string;
  foldA?: string;
  foldB?: string;
  foldC?: string;
}

export interface TwistingRibbonProps extends React.HTMLAttributes<HTMLDivElement> {
  segments?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  twistCycles?: number;
  lightColors?: RibbonColors;
  darkColors?: RibbonColors;
}

function hexToRgb(hex: string): [number, number, number] {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const num = parseInt(hex, 16);
  return [num >> 16, (num >> 8) & 255, num & 255];
}

export function TwistingRibbon({
  className,
  segments = 400,
  waveSpeed = 0.018,
  waveAmplitude = 1,
  twistCycles = 6,
  lightColors,
  darkColors,
  ...props
}: TwistingRibbonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Ribbon geometry
    const RIBBON_HALF_W = 14;
    const RIBBON_X_SCALE = 1.4;
    const RIBBON_X_OFFSET = 0.2;

    // Wave params
    const WAVE1_FREQ = 3.5;
    const WAVE1_TIME_SPEED = 0.7;
    const WAVE1_AMP = 110 * waveAmplitude;
    const WAVE2_FREQ = 7.0;
    const WAVE2_TIME_SPEED = 1.1;
    const WAVE2_AMP = 30 * waveAmplitude;
    const TWIST_TIME_SPEED = 0.5;

    // Light mode colors
    const L_FACE  = lightColors?.face  ? hexToRgb(lightColors.face)  : [255, 60, 10]   as [number,number,number];
    const L_FOLD_A = lightColors?.foldA ? hexToRgb(lightColors.foldA) : [255, 140, 0]  as [number,number,number];
    const L_FOLD_B = lightColors?.foldB ? hexToRgb(lightColors.foldB) : [200, 30, 80]  as [number,number,number];
    const L_FOLD_C = lightColors?.foldC ? hexToRgb(lightColors.foldC) : [255, 200, 50] as [number,number,number];

    // Dark mode colors
    const D_FACE  = darkColors?.face  ? hexToRgb(darkColors.face)  : [120, 80, 255]  as [number,number,number];
    const D_FOLD_A = darkColors?.foldA ? hexToRgb(darkColors.foldA) : [60, 160, 255]  as [number,number,number];
    const D_FOLD_B = darkColors?.foldB ? hexToRgb(darkColors.foldB) : [200, 60, 255]  as [number,number,number];
    const D_FOLD_C = darkColors?.foldC ? hexToRgb(darkColors.foldC) : [80, 220, 200]  as [number,number,number];

    function isDark() {
      return document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    function resize() {
      width = container!.clientWidth;
      height = container!.clientHeight;
      canvas!.width = width;
      canvas!.height = height;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let t = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      const dark = isDark();
      const FACE   = dark ? D_FACE   : L_FACE;
      const FOLD_A = dark ? D_FOLD_A : L_FOLD_A;
      const FOLD_B = dark ? D_FOLD_B : L_FOLD_B;
      const FOLD_C = dark ? D_FOLD_C : L_FOLD_C;

      // Build ribbon points
      const pts: { x: number; y: number; tw: number }[] = [];
      for (let i = 0; i <= segments; i++) {
        const u = i / segments; // 0..1
        // X: span full width with slight overshoot
        const x = (u * (1 + RIBBON_X_OFFSET * 2) - RIBBON_X_OFFSET) * width * RIBBON_X_SCALE
                  - (RIBBON_X_SCALE - 1) * width / 2;
        // Y: two overlapping sine waves
        const wave1 = Math.sin(u * Math.PI * 2 * WAVE1_FREQ + t * WAVE1_TIME_SPEED) * WAVE1_AMP;
        const wave2 = Math.sin(u * Math.PI * 2 * WAVE2_FREQ - t * WAVE2_TIME_SPEED * 0.7) * WAVE2_AMP;
        const y = height / 2 + wave1 + wave2;
        // Twist angle
        const tw = u * Math.PI * 2 * twistCycles + t * TWIST_TIME_SPEED;
        pts.push({ x, y, tw });
      }

      // Draw each segment as a quad
      for (let i = 0; i < segments; i++) {
        const a = pts[i];
        const b = pts[i + 1];

        // Tangent direction (perpendicular to ribbon direction)
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        // Ribbon half-width varies with twist (cosine gives the "folding" look)
        const twA = Math.cos(a.tw) * RIBBON_HALF_W;
        const twB = Math.cos(b.tw) * RIBBON_HALF_W;

        // Four corners of the ribbon segment quad
        const x0 = a.x + nx * twA, y0 = a.y + ny * twA;
        const x1 = a.x - nx * twA, y1 = a.y - ny * twA;
        const x2 = b.x - nx * twB, y2 = b.y - ny * twB;
        const x3 = b.x + nx * twB, y3 = b.y + ny * twB;

        // Pick color based on twist angle (gives neon faceted look)
        const phase = ((a.tw % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        let col: [number, number, number];
        if (phase < Math.PI * 0.5)       col = FACE;
        else if (phase < Math.PI)        col = FOLD_A;
        else if (phase < Math.PI * 1.5)  col = FOLD_B;
        else                              col = FOLD_C;

        // Vary alpha for depth
        const alpha = 0.55 + 0.45 * Math.abs(Math.cos(a.tw));

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x1, y1);
        ctx.closePath();
        ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha.toFixed(2)})`;
        ctx.fill();
      }

      t += waveSpeed;
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      ro.disconnect();
    };
  }, [segments, waveSpeed, waveAmplitude, twistCycles, lightColors, darkColors]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden", className)}
      {...props}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

export default TwistingRibbon;
