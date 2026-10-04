'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GestureHint } from '@/components/ui/GestureHint';

// FIX P4: Curated on-brand hover palette — replaces the off-brand random HSL rainbow
const BRAND_HOVER_COLORS = [
  '#FFE0D2', // Peach accent
  '#E08E74', // Light ember
  '#FAF7F2', // Ivory
  '#D87555', // Light terracotta
  '#F0ECE4', // Stone
  '#C86D51', // Primary terracotta
];

/**
 * HeroHoverLetter Component
 * Uses curated brand color palette instead of random full-spectrum HSL.
 */
const HeroHoverLetter = ({ char }: { char: string }) => {
  const [hoverColor, setHoverColor] = useState<string | undefined>(undefined);
  
  return (
    <motion.span
      variants={{
        hidden: { rotateX: -90, y: 20, opacity: 0 },
        visible: { 
          rotateX: 0, 
          y: 0, 
          opacity: 1, 
          transition: { duration: 0.8, type: "spring", bounce: 0.4 } 
        }
      }}
      onHoverStart={() =>
        setHoverColor(BRAND_HOVER_COLORS[Math.floor(Math.random() * BRAND_HOVER_COLORS.length)])
      }
      onHoverEnd={() => setHoverColor(undefined)}
      whileHover={{ scale: 1.2, zIndex: 10 }}
      style={{ 
        transformOrigin: "bottom",
        color: hoverColor || "inherit",
        transition: "color 0.1s ease-out" 
      }}
      transition={{ duration: 0.05 }}
      className="inline-block transform-gpu cursor-default"
    >
      {char}
    </motion.span>
  );
};

/**
 * SplitText Component
 * Breaks strings into words → characters for staggered entrance animation.
 */
function SplitText({ children, delay = 0, className = "" }: { children: string, delay?: number, className?: string }) {
  const words = children.split(" ");
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.03, delayChildren: delay } },
        hidden: {}
      }}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-flex mr-[0.25em]">
          {word.split("").map((char, j) => (
            <span 
              key={j} 
              className="inline-flex py-[0.05em] px-[0.02em]" 
              style={{ perspective: "400px" }} 
            >
              <HeroHoverLetter char={char} />
            </span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}

function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [ripples, setRipples] = useState<{ id: number, x: number, y: number }[]>([]);
  const lastRippleTime = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const rawScale  = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.25, 0.25]);
  const rawYNum   = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0, -150]);

  const cardScale = useSpring(rawScale, { stiffness: 120, damping: 20, mass: 0.5 });
  const cardYNum  = useSpring(rawYNum,  { stiffness: 120, damping: 20, mass: 0.5 });
  const cardY     = useTransform(cardYNum, (v) => `${v}%`);

  const handleMouseMove = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastRippleTime.current > 50) {
      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) {
        const scaleX = rect.width / window.innerWidth;
        const scaleY = rect.height / window.innerHeight;
        setRipples(prev => [
          ...prev.slice(-8),
          { id: now, x: (e.clientX - rect.left) / scaleX, y: (e.clientY - rect.top) / scaleY }
        ]);
        lastRippleTime.current = now;
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] w-full"
    >
      {/* STICKY WRAPPER */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">

        {/* Physical Projected Cast Shadow */}
        <motion.div
          style={{
            scale: cardScale,
            y: cardY,
            willChange: "transform",
          }}
          className="absolute inset-0 w-full h-full pointer-events-none -z-10 flex items-center justify-center"
        >
          <div 
            className="w-full h-full rounded-2xl transform translate-x-6 md:translate-x-14 translate-y-8 md:translate-y-20 skew-x-[-8deg] skew-y-[3deg] scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, rgba(42, 13, 7, 0.85) 0%, rgba(55, 17, 9, 0.65) 30%, rgba(74, 25, 14, 0.38) 65%, rgba(92, 32, 18, 0.12) 88%, transparent 100%)",
              filter: "blur(14px)",
            }}
          />
        </motion.div>

        {/* Foreground Layer: The Shrinking Video Card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          style={{
            scale: cardScale,
            y: cardY,
            boxShadow: "0 2px 4px rgba(40,12,6,0.70), 4px 8px 16px -2px rgba(48,15,8,0.60), 12px 20px 36px -4px rgba(60,19,10,0.48), 26px 44px 68px -6px rgba(74,25,14,0.32), 48px 76px 105px -10px rgba(90,30,17,0.18)",
            willChange: "transform",
            borderRadius: 0,
          }}
          className="relative w-full h-full overflow-hidden bg-dark transform-gpu pointer-events-auto"
        >
          
          {/* Interactive Fluid Wave Wake */}
          <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
            <AnimatePresence>
              {ripples.map(r => (
                <motion.div
                  key={r.id}
                  initial={{ scale: 0.2, opacity: 0.5 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute rounded-full border border-white/20 bg-white/5"
                  style={{ 
                    left: r.x, 
                    top: r.y, 
                    width: 120, 
                    height: 120, 
                    transform: 'translate(-50%, -50%)',
                  }}
                />
            ))}
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="https://res.cloudinary.com/ohelitbr/video/upload/v1790771745/gemini_generated_video_c842168e_fsxavr.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark/90 via-dark/40 to-dark/10" />

        <motion.div 
          style={{ opacity: textOpacity }}
          className="absolute bottom-0 left-0 right-0 z-20 pb-24 px-5 md:px-8 lg:px-16 flex flex-col justify-end h-full pointer-events-none"
        >
          <div className="w-full">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // FIX P1: Reduced from delay 4.5 to 0.8 — location appears promptly
              transition={{ duration: 1, delay: 0.8 }}
            >
              <p className="flex items-center text-ivory uppercase tracking-[0.24em] text-sm md:text-base font-body font-medium mb-6">
                RAPPAHANNOCK COUNTY | VIRGINIA <MapPin className="ml-2 w-4 h-4 text-[#FFE0D2]" />
              </p>
            </motion.div>

            {/* FIX P1: Reduced from delay={6} to delay={1.2} — headline appears promptly */}
            {/* This is an h1 semantically wrapped in motion — added aria-label for screen readers */}
            <h1 className="sr-only">A private sanctuary for living well.</h1>
            <SplitText 
              delay={1.2}
              className="font-display text-[clamp(2.5rem,1.5rem+6vw,5.5rem)] text-ivory font-medium leading-[1.05] max-w-4xl"
            >
              A private sanctuary for living well.
            </SplitText>

            {/* FIX P1: Reduced from delay={6.3} to delay={1.5} */}
            <SplitText 
              delay={1.5}
              className="text-ivory font-body text-xl md:text-2xl max-w-2xl mt-6 leading-relaxed"
            >
              Where nature, Ayurveda, and modern medicine come together in the Blue Ridge foothills of Virginia.
            </SplitText>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // FIX P1: Reduced from delay={6.0} to delay={1.8}
              transition={{ duration: 1, delay: 1.8 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              {/* FIX P13: hover color unified to #C86D51 (was #C65A3A — different shade) */}
              <Button
                href="/reserve"
                variant="secondary"
                className="text-ivory border-ivory/30 hover:bg-[#C86D51] hover:border-[#C86D51] hover:text-white transition-all duration-300 pointer-events-auto terracotta-btn-shadow"
              >
                Reserve Your Stay
              </Button>
            </motion.div>
            
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        >
          <GestureHint type="scroll" text="Scroll to explore" delaySeconds={1.5} durationSeconds={12} />
        </motion.div>

        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
