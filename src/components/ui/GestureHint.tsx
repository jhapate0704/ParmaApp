'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

export interface GestureHintProps {
  type: 'scroll' | 'drag-tap' | 'slide';
  text?: string;
  durationSeconds?: number;
  delaySeconds?: number;
  className?: string;
  showOnMobileOnly?: boolean;
}

export function GestureHint({
  type,
  text = '',
  durationSeconds = 8,
  delaySeconds = 0.4,
  className = '',
  showOnMobileOnly = false,
}: GestureHintProps) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Triggers ONLY when THIS specific section scrolls into view
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    // Show after delay once section enters the screen
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, delaySeconds * 1000);

    // Auto-dismiss after duration in view
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, (delaySeconds + durationSeconds) * 1000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isInView, delaySeconds, durationSeconds]);

  return (
    <div ref={containerRef} className={`pointer-events-none select-none z-40 ${className}`}>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.5, ease: 'easeOut' } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col items-center justify-center ${
              showOnMobileOnly ? 'flex md:hidden' : 'flex'
            }`}
          >
            {/* Gesture Graphic Container */}
            <div className="relative flex items-center justify-center">
              
              {/* 1. SCROLL GESTURE (For Hero & About) */}
              {type === 'scroll' && (
                <div className="relative w-12 h-16 flex items-center justify-center">
                  {/* Directional Downward Line */}
                  <div className="absolute top-2 w-[1.5px] h-10 bg-gradient-to-b from-white/10 via-white/60 to-white" />
                  
                  {/* Animated Hand gliding downward */}
                  <motion.div
                    animate={{ y: [-4, 20, -4] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10"
                  >
                    <HandIcon />
                  </motion.div>
                </div>
              )}

              {/* 2. DRAG & TAP GESTURE (For 3D Circular Archive) */}
              {type === 'drag-tap' && (
                <div className="relative w-28 h-14 flex items-center justify-center">
                  {/* Horizontal swipe guide line */}
                  <div className="absolute w-20 h-[1.5px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

                  {/* Hand that taps and sweeps left/right */}
                  <motion.div
                    animate={{
                      x: [-24, 24, 0, 0],
                      scale: [1, 1, 0.9, 1],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10"
                  >
                    {/* Expanding tap ripple */}
                    <motion.div
                      animate={{ scale: [0.4, 2.2], opacity: [0.9, 0] }}
                      transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 1.1, ease: 'easeOut' }}
                      className="absolute -top-1 left-2 w-4 h-4 rounded-full border border-white bg-white/20"
                    />
                    <HandIcon />
                  </motion.div>
                </div>
              )}

              {/* 3. SLIDE GESTURE (For Team Accordion) */}
              {type === 'slide' && (
                <div className="relative w-24 h-12 flex items-center justify-center">
                  {/* Subtle horizontal track */}
                  <div className="absolute w-20 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                  {/* Hand sliding across cards */}
                  <motion.div
                    animate={{ x: [-20, 20, -20] }}
                    transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10"
                  >
                    <HandIcon />
                  </motion.div>
                </div>
              )}

            </div>

            {/* Simple, unboxed pure white text in small elegant font */}
            {text && (
              <span className="mt-2.5 text-[10px] md:text-xs font-body uppercase tracking-[0.22em] text-white/85 font-light drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] select-none">
                {text}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Minimalist vector outline hand silhouette in crisp pure white
function HandIcon() {
  return (
    <svg 
      width="28" 
      height="28" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#FFFFFF" 
      strokeWidth="1.6" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
    >
      <path d="M12 3v9" />
      <path d="M12 3a1.5 1.5 0 0 0-3 0v9.5" />
      <path d="M9 10.5V8a1.5 1.5 0 0 0-3 0v6.5a6 6 0 0 0 12 0V11a1.5 1.5 0 0 0-3 0v-.5a1.5 1.5 0 0 0-3 0V3z" />
    </svg>
  );
}

export default GestureHint;
