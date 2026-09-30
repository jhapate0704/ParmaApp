'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GestureHint } from '@/components/ui/GestureHint';

/**
 * HeroHoverLetter Component
 * WHY: This component exists to wrap a single letter in state. By keeping the color state locally 
 * scoped to the letter, we force a new random color to be generated *every single time* the user 
 * hovers over it. If we generated the color at the parent level, it would stay the same color forever!
 */
const HeroHoverLetter = ({ char }: { char: string }) => {
  const [hoverColor, setHoverColor] = useState<string | undefined>(undefined);
  
  return (
    <motion.span
      variants={{
        // WHY: rotateX(-90) makes the letter fold perfectly flat backward into the screen. 
        // y: 20 drops it down slightly so it looks like it is rising out of a physical slot.
        hidden: { rotateX: -90, y: 20, opacity: 0 },
        visible: { 
          rotateX: 0, 
          y: 0, 
          opacity: 1, 
          transition: { duration: 0.8, type: "spring", bounce: 0.4 } 
        }
      }}
      // Generate the fresh color precisely when the mouse touches the bounding box.
      onHoverStart={() => setHoverColor(`hsl(${Math.floor(Math.random() * 360)}, 80%, 75%)`)}
      onHoverEnd={() => setHoverColor(undefined)}
      whileHover={{ scale: 1.2, zIndex: 10 }}
      style={{ 
        transformOrigin: "bottom", // Critical for 3D effect: makes it fold like a hinge rather than spinning in place
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
 * WHY: We need to break strings into individual words, and then words into individual characters, 
 * so that we can stagger their entrance animation sequentially (like a typewriter or wave).
 */
function SplitText({ children, delay = 0, className = "" }: { children: string, delay?: number, className?: string }) {
  const words = children.split(" ");
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        // WHY: staggerChildren ensures each letter waits for the previous one before animating.
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
              // WHY: Perspective MUST be on the direct parent of the 3D transformed element. 
              // If placed on a higher wrapper, the 3D effect flattens into a 2D scale.
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
  // Ref for the specific video card to track mouse movements correctly when scaled
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [ripples, setRipples] = useState<{ id: number, x: number, y: number }[]>([]);
  const lastRippleTime = useRef(0);

  // Track the scroll progress through this 200vh tall section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Raw scroll-driven values (numeric for spring compatibility)
  const rawScale  = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.25, 0.25]);
  const rawYNum   = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0, -150]);

  // ── PERFORMANCE FIX 1: useSpring as a low-pass filter ───────────────────
  // Raw scroll events fire erratically (not at 60fps). useSpring smooths
  // every raw value into a silky 60fps interpolated output, eliminating jank.
  const cardScale = useSpring(rawScale, { stiffness: 120, damping: 20, mass: 0.5 });
  const cardYNum  = useSpring(rawYNum,  { stiffness: 120, damping: 20, mass: 0.5 });
  const cardY     = useTransform(cardYNum, (v) => `${v}%`);

  const handleMouseMove = (e: React.MouseEvent) => {
    const now = Date.now();
    // ── PERFORMANCE FIX 2: 50ms throttle (was 25ms) ──
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

        {/* Foreground Layer: The Shrinking Video Card */}
        {/* 
          PERFORMANCE FIX 3: will-change: transform
          Pre-promotes this element to its own GPU compositing layer before scroll
          starts. Without this, the browser promotes/demotes it mid-animation
          which causes the visible jank flash.

          PERFORMANCE FIX 4: Static borderRadius via CSS transition
          Animating borderRadius via Framer Motion forces GPU layer re-rasterization
          every frame. Instead we use a CSS transition on a data-attribute toggle.
        */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          style={{
            scale: cardScale,
            y: cardY,
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)",
            willChange: "transform",
            borderRadius: 0,
          }}
          className="relative w-full h-full overflow-hidden bg-dark transform-gpu pointer-events-auto"
        >
          
          {/* 
            Interactive Fluid Wave Wake 
            WHY Z-5?: It must sit above the video (z-0) so it can blur it, but below the 
            gradient overlay (z-10) and text (z-20) so the ripples don't blur the readable text!
          */}
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
              transition={{ duration: 1, delay: 4.5 }}
            >
              <p className="flex items-center text-ivory uppercase tracking-[0.25em] text-sm md:text-base font-body font-medium mb-6">
                RAPPAHANNOCK COUNTY | VIRGINIA <MapPin className="ml-2 w-4 h-4 text-sage" />
              </p>
            </motion.div>

            <SplitText 
              delay={6}
              className="font-display text-[clamp(2.5rem,1.5rem+6vw,5.5rem)] text-ivory font-medium leading-[1.05] max-w-4xl"
            >
              A private sanctuary for living well.
            </SplitText>

            <SplitText 
              delay={6.3}
              className="text-ivory font-body text-xl md:text-2xl max-w-2xl mt-6 leading-relaxed"
            >
              Where nature, Ayurveda, and modern medicine come together in the Blue Ridge foothills of Virginia.
            </SplitText>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 6.0 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <Button
                href="/reserve"
                variant="secondary"
                className="text-ivory border-ivory/30 hover:bg-sage hover:border-sage hover:text-dark transition-all duration-300 pointer-events-auto"
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
