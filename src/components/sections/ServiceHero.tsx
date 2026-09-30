'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  mediaUrl: string;
  mediaType?: 'video' | 'image';
}

export default function ServiceHero({ title, subtitle, mediaUrl, mediaType = 'image' }: ServiceHeroProps) {
  return (
    <section className="relative min-h-screen h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* Background Media with subtle cinematic scale */}
      <motion.div 
        initial={{ scale: 1 }}
        animate={{ scale: 1.06 }}
        transition={{ duration: 16, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        {mediaType === 'video' ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-55"
          >
            <source src={mediaUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src={mediaUrl}
            alt={title}
            className="h-full w-full object-cover opacity-55"
          />
        )}
      </motion.div>

      {/* Multi-tier Gradient Overlays for Theme Consistency */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-black/60" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_85%)] opacity-70 pointer-events-none" />

      {/* Hero Center Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center pt-16">
        

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ivory mb-6 tracking-tight leading-[1.05]"
        >
          {title}
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          className="font-body text-base md:text-xl text-ivory/80 leading-relaxed max-w-2xl mx-auto font-light"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Bottom Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[10px] md:text-xs text-ivory/50 tracking-[0.25em] uppercase font-body font-medium">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-[#C5A059]/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
