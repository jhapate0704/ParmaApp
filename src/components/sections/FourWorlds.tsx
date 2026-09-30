'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, animate, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const panels = [
 {
  id: '01',
  title: 'PARMA INN',
  description: 'Stay in a place designed for stillness. An immersive experience where nature meets unparalleled luxury.',
  image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80',
  link: '/inn',
 },
 {
  id: '02',
  title: 'PARMA SPA',
  description: 'Restore your rhythm with ancient therapies. Bespoke treatments curated to rejuvenate your body and mind.',
  image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80',
  link: '/spa',
 },
 {
  id: '03',
  title: 'HEALTHCARE',
  description: 'Integrative medicine for lasting vitality. Expert consultations seamlessly blended into your sanctuary stay.',
  image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&q=80',
  link: '/health',
 },
 {
  id: '04',
  title: 'MEDITATION',
  description: 'Find clarity in our serene sanctuary. Guided practices surrounded by breathtaking natural beauty.',
  image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=1600&q=80',
  link: '/meditation',
 },
];

export default function FourWorlds() {
 const [index, setIndex] = useState(0);
 const [isAnimating, setIsAnimating] = useState(false);
 const scaleValue = useMotionValue(0);
 const router = useRouter();

 const goToSlide = async (newIndex: number) => {
  if (isAnimating || newIndex === index) return;
  setIsAnimating(true);
  
  // Distort up (liquid ripple effect in)
  await animate(scaleValue, 200, { duration: 0.5, ease: "easeIn" });
  
  setIndex(newIndex);
  
  // Distort down (liquid ripple effect out)
  await animate(scaleValue, 0, { duration: 0.7, ease: "easeOut" });
  setIsAnimating(false);
 };

 const nextSlide = () => goToSlide((index + 1) % panels.length);
 const prevSlide = () => goToSlide((index - 1 + panels.length) % panels.length);

 // Auto-play interval: Advances the slide every 2.5 seconds automatically
 useEffect(() => {
  if (isAnimating) return;
  const timer = setTimeout(() => {
   nextSlide();
  }, 2500);
  return () => clearTimeout(timer);
 }, [index, isAnimating]);

 // Handle route click: Plays a massive cinematic ripple before navigating
 const handleRouteClick = async (e: React.MouseEvent, href: string) => {
  e.preventDefault();
  if (isAnimating) return;
  setIsAnimating(true); // Locks the slider from auto-playing
  
  // Cinematic massive ripple that swallows the screen
  await animate(scaleValue, 500, { duration: 0.8, ease: "easeIn" });
  
  router.push(href);
  // Note: We don't animate the ripple back down because the page changes here!
 };

 return (
  <section className="bg-black/20 py-16 md:py-24 lg:py-32 px-5 md:px-8 lg:px-16" id="worlds">
   <motion.div 
    initial={{ opacity: 0, filter: "blur(15px)", y: 40, scale: 0.95 }}
    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
   >
    <SectionHeading
     eyebrow="Four worlds, one estate"
     heading="Choose how you arrive."
     description="Parma is an oasis just an hour from Washington D.C., offering distinct spaces tailored to your path to wellness."
     align="center"
    />
   </motion.div>

   {/* SVG Filter Definition for the Liquid Displacement */}
   <svg className="hidden">
    <filter id="liquid-ripple">
     {/* Base frequency controls the size of the ripples. NumOctaves adds detail. */}
     <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
     <motion.feDisplacementMap 
      in="SourceGraphic" 
      in2="noise" 
      scale={scaleValue} 
      xChannelSelector="R" 
      yChannelSelector="G" 
     />
    </filter>
   </svg>

   <div className="max-w-[1400px] mx-auto mt-16 relative h-[70vh] lg:h-[80vh] rounded-3xl overflow-hidden shadow-2xl bg-charcoal group">
    
    {/* Distorted Image Container - Clickable to advance slide */}
    <div 
     className="absolute inset-0 w-full h-full cursor-pointer"
     style={{ filter: "url(#liquid-ripple)" }}
     onClick={nextSlide}
    >
     <img 
      src={panels[index].image} 
      alt={panels[index].title}
      // Scaled slightly up so the displacement edges don't show the background
      className="w-full h-full object-cover transform scale-110" 
     />
    </div>

    {/* Dark Overlay for text legibility */}
    <div className="absolute inset-0 bg-dark/40 pointer-events-none" />

    {/* Content Overlays */}
    <div className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-between pointer-events-none">
     
     {/* Top: Navigation Dots */}
     <div className="flex items-center space-x-4 z-20 pointer-events-auto">
      {panels.map((p, i) => (
       <button
        key={p.id}
        onClick={() => goToSlide(i)}
        className={`h-1.5 transition-all duration-300 rounded-full ${i === index ? 'w-16 bg-white' : 'w-6 bg-white/30 hover:bg-white/60'}`}
        aria-label={`Go to slide ${i + 1}`}
       />
      ))}
     </div>

     {/* Center/Bottom Left: Title and Description */}
     <div className="max-w-2xl z-20 pb-20 md:pb-0">
      <AnimatePresence mode="wait">
       <motion.div
        key={index}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
       >
        <span className="font-body text-sm text-muted tracking-[0.2em] uppercase mb-4 block">
         {panels[index].id} / 04
        </span>
        <h3 className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-md">
         {panels[index].title}
        </h3>
        <p className="font-body text-lg md:text-xl text-white/90 leading-relaxed max-w-lg drop-shadow-md">
         {panels[index].description}
        </p>
       </motion.div>
      </AnimatePresence>
     </div>
    </div>

    {/* Slider Controls (Hidden on very small screens, integrated into sides) */}
    <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button 
       onClick={prevSlide} 
       className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-ivory transition-all hover:scale-105"
      >
       <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      <button 
       onClick={nextSlide} 
       className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-ivory transition-all hover:scale-105"
      >
       <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>
    </div>

    {/* Bottom Right: Interactive Route Card Button */}
    <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-30 max-w-[calc(100vw-4rem)]">
      <AnimatePresence mode="wait">
       <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9, x: 20 }}
        transition={{ duration: 0.4, delay: 0.1 }}
       >
        <Link 
         href={panels[index].link}
         onClick={(e) => handleRouteClick(e, panels[index].link)}
         className="flex items-center bg-white/10 hover:bg-white/20 border border-white/30 rounded-3xl p-4 md:p-6 transition-all duration-300 group shadow-2xl"
        >
         <div className="mr-4 md:mr-8">
          <span className="block text-white/70 font-body text-xs tracking-[0.2em] uppercase mb-1 drop-shadow-sm">Explore World</span>
          <span className="block text-white font-display text-xl md:text-2xl drop-shadow-sm">{panels[index].title}</span>
         </div>
         <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white text-dark flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shrink-0">
          <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
         </div>
        </Link>
       </motion.div>
      </AnimatePresence>
    </div>

   </div>
  </section>
 );
}







