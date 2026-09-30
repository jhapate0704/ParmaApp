'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EyebrowLabel } from '@/components/ui';
import { TwistingRibbon } from '@/components/ui/TwistingRibbon';
import { FlipText } from '@/components/ui/FlipText';

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Track scroll progress as this section enters the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Start tracking when the top of the section enters the bottom of the viewport
    // Stop tracking when the center of the section reaches the center of the viewport
    offset: ['start end', 'center center']
  });

  // Scale the entire section content up from 0.8 (tiny) to 1 (full size)
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  // Fade it in smoothly
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    // WHY min-h-[50vh]?: Unlike the Hero section (which is 100vh to fill the screen), 
    // this is a transitional quote section. Forcing 100vh here would create too much dead space. 
    // 50vh gives it breathing room while keeping the flow of the page moving.
    <section ref={sectionRef} className="relative py-24 md:py-32 lg:py-40 text-center flex flex-col items-center justify-center min-h-[50vh] bg-transparent overflow-hidden">
      
      {/* 
        Edge-to-Edge Ribbon Background 
        Tied to the scroll opacity so it fades in, but spans the full screen width.
      */}
      <motion.div style={{ opacity }} className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
        {/* Inner wrapper ensures it stays dim even when scroll opacity reaches 100% */}
        <div className="absolute inset-0 opacity-35">
          <TwistingRibbon
            segments={300}
            waveSpeed={0.015}
            waveAmplitude={0.8}
            twistCycles={4}
            lightColors={{
              face:  '#A3B19B',
              foldA: '#8A9E74',
              foldB: '#D8C3A5',
              foldC: '#C4A484',
            }}
          />
        </div>
      </motion.div>

      {/* Text Content Wrapper - Scales up, no background box! */}
      <motion.div 
        style={{ scale, opacity }} 
        className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center z-10 px-5 md:px-8 lg:px-16"
      >
        <motion.div 
          initial={{ opacity: 0, filter: "blur(15px)", y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
        <EyebrowLabel text="The Parma Philosophy" />
        
        {/* 
          WHY drop-shadow-xl on the blockquote?: Instead of putting shadows on the individual 
          3D flipping letters (which can cause rendering glitches with preserve-3d), we place 
          the shadow on the parent wrapper. This casts a large, soft ambient shadow behind the 
          entire quote block, separating the text visually from the twisting ribbon behind it.
        */}
        <blockquote className="mt-8 font-display text-3xl lg:text-5xl max-w-4xl mx-auto leading-tight text-ivory drop-shadow-xl">
          <FlipText delay={6} duration={5}>
            Wellness is not something you add to life. It is how you choose to live it.
          </FlipText>
        </blockquote>
      </motion.div>
      </motion.div>
    </section>
  );
}

export default Philosophy;
