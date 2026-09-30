'use client';

import React, { useRef, useEffect } from 'react';

const planets = [
  { id: 1, size: 800, duration: 40, nodeSize: 12, color: '#A23B27', label: 'Mars - Action' },
  { id: 2, size: 600, duration: 30, nodeSize: 16, color: '#2E86AB', label: 'Earth - Life' },
  { id: 3, size: 400, duration: 20, nodeSize: 10, color: '#F3A712', label: 'Venus - Harmony' },
  { id: 4, size: 250, duration: 15, nodeSize: 8,  color: '#8B7D6B', label: 'Mercury - Focus' },
];

// ─── OPTIMIZED: Single <canvas> replaces 80 individual motion.div elements ───
// All twinkling stars are drawn in one requestAnimationFrame loop, one draw call.
const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Generate stars once
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      radius: Math.random() * 1.5 + 0.5,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.6 + 0.3,
    }));

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let rafId: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;
      for (const s of stars) {
        const opacity = 0.15 + Math.abs(Math.sin(s.phase + t * s.speed)) * 0.85;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity.toFixed(2)})`;
        ctx.shadowColor = 'rgba(255,255,255,0.8)';
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none w-full h-full"
    />
  );
};

export function SolarSystem() {
  return (
    <>
      {/*
        ─── CSS @keyframes for orbits ───
        Runs entirely on the compositor thread — ZERO JS overhead vs Framer Motion.
        Visual result is identical: continuous linear rotation.
      */}
      <style>{`
        @keyframes orbit-cw  { from { transform: rotateX(65deg) rotateZ(0deg);   } to { transform: rotateX(65deg) rotateZ(360deg);  } }
        @keyframes orbit-ccw { from { transform: rotateX(65deg) rotateZ(0deg);   } to { transform: rotateX(65deg) rotateZ(-360deg); } }
        @keyframes spin-ring-cw  { from { transform: rotateZ(0deg);   } to { transform: rotateZ(360deg);  } }
        @keyframes spin-ring-ccw { from { transform: rotateZ(0deg);   } to { transform: rotateZ(-360deg); } }
        @keyframes spin-moon { from { transform: translate(-50%,-50%) rotateZ(0deg); } to { transform: translate(-50%,-50%) rotateZ(360deg); } }
        .solar-orbit-wrapper {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          transform-style: preserve-3d;
          animation: orbit-cw 200s linear infinite;
          will-change: transform;
        }
        .planet-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .planet-ring-cw  { animation: spin-ring-cw  var(--dur) linear infinite; }
        .planet-ring-ccw { animation: spin-ring-ccw var(--dur) linear infinite; }
        .moon-orbit {
          position: absolute;
          top: 50%; left: 50%;
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          transform-style: preserve-3d;
          animation: spin-moon 4s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div className="absolute inset-0 overflow-hidden bg-dark flex items-center justify-center pointer-events-auto">

        {/* Deep Space Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#000000_80%)] z-0 pointer-events-none" />

        {/* ─── OPTIMIZED: Canvas star field ─── */}
        <StarField />

        {/* 3D System Container */}
        <div className="relative flex items-center justify-center z-10 w-full h-full" style={{ perspective: '1200px' }}>

          {/* The Sun / Center Anchor (Parma Logo) */}
          <div className="absolute z-50 flex items-center justify-center pointer-events-auto">
            <div className="relative group cursor-pointer flex items-center justify-center">
              <div className="absolute inset-0 bg-[#C5A059] rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-700 scale-[1.5]" />
              <div className="absolute inset-0 bg-[#E8D3A2] rounded-full blur-lg opacity-60 scale-110" />
              <img
                src="/parma-official-crest.png"
                alt="Parma Center"
                className="w-12 h-12 md:w-16 md:h-16 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              />
            </div>
          </div>

          {/* ─── OPTIMIZED: CSS animation wrapper replaces Framer Motion outer spinner ─── */}
          <div className="solar-orbit-wrapper">
            {planets.map((planet, index) => (
              <div
                key={planet.id}
                className={`planet-ring ${index % 2 === 0 ? 'planet-ring-cw' : 'planet-ring-ccw'}`}
                style={{
                  width: planet.size,
                  height: planet.size,
                  ['--dur' as any]: `${planet.duration}s`,
                }}
              >
                {/* Planet Node */}
                <div
                  className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 group cursor-pointer pointer-events-auto"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="rounded-full relative z-10"
                    style={{
                      width: planet.nodeSize,
                      height: planet.nodeSize,
                      backgroundColor: planet.color,
                      boxShadow: `0 0 15px ${planet.color}`,
                    }}
                  />

                  {/* Moon (Earth only) — CSS animated */}
                  {planet.id === 2 && (
                    <div className="moon-orbit">
                      <div
                        className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ivory"
                        style={{ width: 4, height: 4, boxShadow: '0 0 8px #fff' }}
                      />
                    </div>
                  )}

                  {/* Tooltip */}
                  <div
                    className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
                    style={{ transform: 'rotateX(-65deg)' }}
                  >
                    <div className="bg-black/90 border border-white/20 px-3 py-1.5 rounded-md text-xs font-body tracking-wider text-ivory">
                      {planet.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default SolarSystem;
