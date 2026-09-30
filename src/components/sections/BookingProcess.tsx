'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue, useSpring } from 'framer-motion';
import { Check, Rocket } from 'lucide-react';
import { EyebrowLabel } from '@/components/ui';
import { TwistingRibbon } from '@/components/ui/TwistingRibbon';

const steps = [
 {
  num: "01",
  title: "The Request",
  desc: "Submit your inquiry through our digital reservation portal. Select your desired dates, preferred accommodations, and initial service interests.",
 },
 {
  num: "02",
  title: "The Consultation",
  desc: "Our wellness concierge will personally contact you to discuss your health goals, dietary preferences, and curate a bespoke itinerary for your stay.",
 },
 {
  num: "03",
  title: "The Confirmation",
  desc: "Once your personalized schedule of spa treatments, medical consultations, and dining is perfected, your reservation is secured.",
 },
 {
  num: "04",
  title: "The Experience",
  desc: "Arrive at Parma in Little Washington. From the moment you step onto the grounds, every detail has been anticipated for your restorative journey.",
 }
];

function StepCard({ step, idx, scrollYProgress, totalSteps }: { step: any, idx: number, scrollYProgress: MotionValue<number>, totalSteps: number }) {
 const centerProgress = idx / (totalSteps - 1);
 const stepSize = 1 / (totalSteps - 1);

 let scaleInput: number[];
 let scaleOutput: number[];
 let opacityOutput: number[];
 let yOutput: number[];
 let rotateYOutput: number[];

 if (idx === 0) {
  scaleInput = [0, stepSize];
  scaleOutput = [1, 0.65];
  opacityOutput = [1, 0.3];
  yOutput = [0, 80];
  rotateYOutput = [0, 25];
 } else if (idx === totalSteps - 1) {
  scaleInput = [1 - stepSize, 1];
  scaleOutput = [0.65, 1];
  opacityOutput = [0.3, 1];
  yOutput = [80, 0];
  rotateYOutput = [-25, 0];
 } else {
  scaleInput = [centerProgress - stepSize, centerProgress, centerProgress + stepSize];
  scaleOutput = [0.65, 1, 0.65];
  opacityOutput = [0.3, 1, 0.3];
  yOutput = [80, 0, 80];
  rotateYOutput = [-25, 0, 25];
 }

 const scale = useTransform(scrollYProgress, scaleInput, scaleOutput);
 const opacity = useTransform(scrollYProgress, scaleInput, opacityOutput);
 const y = useTransform(scrollYProgress, scaleInput, yOutput);
 const rotateY = useTransform(scrollYProgress, scaleInput, rotateYOutput);

 const nodeInput = idx === 0 ? [0, 1] : [centerProgress - 0.1, centerProgress];
 const nodeBgOutput = idx === 0 ? ["#C5A059", "#C5A059"] : ["#E5E5E5", "#C5A059"];
 const nodeTextOutput = idx === 0 ? ["#000000", "#000000"] : ["#4A4A4A", "#000000"];

 const nodeBg = useTransform(scrollYProgress, nodeInput, nodeBgOutput);
 const nodeText = useTransform(scrollYProgress, nodeInput, nodeTextOutput);

 return (
  <div className="w-screen shrink-0 flex flex-col items-center justify-center px-6 relative" style={{ perspective: '1200px' }}>
   <motion.div 
    style={{ scale, opacity, y, rotateY }}
    className="w-full max-w-2xl bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 shadow-lg text-center relative z-10"
   >
    <h3 className="font-display text-3xl md:text-4xl text-ivory mb-4">{step.title}</h3>
    <p className="font-body text-base md:text-lg text-muted leading-relaxed max-w-lg mx-auto">
     {step.desc}
    </p>
   </motion.div>

   <div className="mt-16 md:mt-24 relative flex items-center justify-center w-full max-w-2xl">
     <motion.div 
      style={{ backgroundColor: nodeBg }}
      className="w-16 h-16 rounded-full flex items-center justify-center font-display text-2xl shadow-[0_0_15px_rgba(197,160,89,0.3)] relative z-10 border-4 border-2 border-white/10"
     >
      <motion.span style={{ color: nodeText }} className="absolute">
       {step.num}
      </motion.span>
     </motion.div>
   </div>
  </div>
 );
}

 export default function BookingProcess() {
 const targetRef = useRef<HTMLDivElement>(null);
 const [vw, setVw] = useState(1000); // fallback

 // Interactive Rocket State
 const [isFlying, setIsFlying] = useState(false);
 const [flightPath, setFlightPath] = useState<{ x: (string | number)[]; y: (string | number)[]; rotate: number[]; scale: number[]; }>({ x: [0], y: [0], rotate: [0], scale: [1] });

 const handleRocketClick = () => {
   if (isFlying) return;
   setIsFlying(true);
   
   // A massive cosmic journey: Fly UP to the fixed Solar System background, 
   // orbit around it (shrinking as it goes behind), and fly back down to the track!
   setFlightPath({
     x: [0, "-30vw", "-10vw", "20vw", "30vw", 0],
     y: [0, "-20vh", "-50vh", "-50vh", "-20vh", 0],
     rotate: [0, -45, -90, -180, -270, -360],
     scale: [1, 0.8, 0.2, 0.2, 0.8, 1]
   });

   // Reset after 3 seconds for a smooth, epic orbit
   setTimeout(() => setIsFlying(false), 3000);
 };

 useEffect(() => {
   setVw(window.innerWidth);
   const handleResize = () => setVw(window.innerWidth);
   window.addEventListener('resize', handleResize);
   return () => window.removeEventListener('resize', handleResize);
 }, []);

 const { scrollYProgress } = useScroll({
  target: targetRef,
  offset: ["start start", "end end"]
 });

 const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-300vw"]);

 // Smooth SVG Path drawing
 const pathLength = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

 // Rocket Cinematic Physics!
 // The rocket accelerates right, curves up/down, then falls back to center!
 const rocketX = useTransform(
   scrollYProgress, 
   [0, 0.166, 0.333, 0.5, 0.666, 0.833, 1], 
   ["50vw", "60vw", "50vw", "60vw", "50vw", "60vw", "50vw"]
 );
 
 const rocketY = useTransform(
   scrollYProgress, 
   [0, 0.166, 0.333, 0.5, 0.666, 0.833, 1], 
   ["0px", "-80px", "0px", "80px", "0px", "-80px", "0px"]
 );
 
 // Rotate to face the direction of the curve
 const rocketRotate = useTransform(
   scrollYProgress, 
   [0, 0.166, 0.333, 0.5, 0.666, 0.833, 1], 
   [45, 15, 45, 75, 45, 15, 45]
 );

 // Smooth out the rocket so it feels like a heavy ship flying
 const smoothRocketX = useSpring(rocketX, { stiffness: 60, damping: 15 });
 const smoothRocketY = useSpring(rocketY, { stiffness: 60, damping: 15 });
 const smoothRocketRotate = useSpring(rocketRotate, { stiffness: 60, damping: 15 });

 // Colorful Cosmic Journey Mapping
 const rocketColor = useTransform(
  scrollYProgress,
  [0, 0.33, 0.66, 1],
  ["#00F0FF", "#8A2BE2", "#FF007F", "#C5A059"]
 );

 return (
  <section ref={targetRef} className="relative h-[400vh] bg-transparent">
   {/* Sticky Container */}
   <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-20 pb-10">
    
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
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

    <div className="w-full text-center shrink-0 mb-8 md:mb-16 z-20">
     <EyebrowLabel text="How to Reserve" />
     <h2 className="font-display text-[clamp(2.5rem,2rem+3vw,4.5rem)] text-ivory mt-4 leading-tight">
      The journey begins here.
     </h2>
    </div>

    {/* Sliding Track Viewport */}
    <div className="w-full flex-1 flex items-center relative z-10">
     
     {/* The Global Wavy SVG Line (Moves with the track) */}
     <motion.div style={{ x }} className="absolute top-1/2 left-0 w-[400vw] h-0 mt-[4rem] md:mt-[6rem] z-0">
        <svg className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[300px] overflow-visible" preserveAspectRatio="none">
           <defs>
             <linearGradient id="cosmic-path" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#00F0FF" />
               <stop offset="33%" stopColor="#8A2BE2" />
               <stop offset="66%" stopColor="#FF007F" />
               <stop offset="100%" stopColor="#C5A059" />
             </linearGradient>
           </defs>
           
           {/* Faint background track */}
           <path 
             d={`M ${vw*0.5} 150 Q ${vw*1.0} 0, ${vw*1.5} 150 Q ${vw*2.0} 300, ${vw*2.5} 150 Q ${vw*3.0} 0, ${vw*3.5} 150`}
             fill="none" 
             stroke="rgba(255,255,255,0.05)" 
             strokeWidth="2" 
           />
           {/* Glowing Cosmic animated line */}
           <motion.path 
             d={`M ${vw*0.5} 150 Q ${vw*1.0} 0, ${vw*1.5} 150 Q ${vw*2.0} 300, ${vw*2.5} 150 Q ${vw*3.0} 0, ${vw*3.5} 150`}
             fill="none" 
             stroke="url(#cosmic-path)" 
             strokeWidth="3"
             style={{ pathLength }}
             className="drop-shadow-[0_0_8px_rgba(255,0,127,0.5)]"
           />
        </svg>
     </motion.div>

     <motion.div 
      style={{ x }}
      className="flex w-[400vw] items-center"
     >
      {steps.map((step, idx) => (
       <StepCard 
        key={idx} 
        step={step} 
        idx={idx} 
        scrollYProgress={scrollYProgress} 
        totalSteps={steps.length} 
       />
      ))}
     </motion.div>
    </div>

    {/* The Viewport-Fixed Rocket Ship! */}
    <motion.div 
      className="absolute top-1/2 -translate-y-1/2 z-30 pointer-events-none mt-[4rem] md:mt-[6rem]"
      style={{ 
        left: smoothRocketX, 
        y: smoothRocketY,
        rotate: smoothRocketRotate,
        x: '-50%', // Center on itself
        color: rocketColor,
      }}
    >
      <motion.div 
        onClick={handleRocketClick}
        animate={isFlying ? flightPath : { x: 0, y: 0, rotate: 0, scale: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="relative flex items-center justify-center pointer-events-auto cursor-pointer"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Dynamic drop shadow matching the text color by using currentColor in a filter, or just white for universal glow */}
        <Rocket className="w-8 h-8 md:w-10 md:h-10 fill-current drop-shadow-[0_0_12px_currentColor] relative z-10" />
      </motion.div>
    </motion.div>

   </div>
  </section>
 );
}
