'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="https://res.cloudinary.com/ohelitbr/video/upload/v1790382484/1188-143842652_medium_fggkpr.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark/70 via-dark/30 to-dark/10" />

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pb-24 px-6 lg:px-16 flex flex-col justify-end">
        <div className="w-full">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <p className="flex items-center text-ivory/90 uppercase tracking-[0.25em] text-sm md:text-base font-body font-medium mb-6">
              RAPPAHANNOCK COUNTY | VIRGINIA <MapPin className="ml-2 w-4 h-4 text-sage" />
            </p>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          >
            <h1 className="font-display text-[clamp(2.5rem,2rem+4vw,5.5rem)] text-ivory leading-[1.05] max-w-4xl">
              A private sanctuary for living well.
            </h1>
          </motion.div>

          {/* Supporting Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
          >
            <p className="text-ivory/90 font-body font-light text-xl md:text-2xl max-w-2xl mt-6 leading-relaxed">
              Where nature, Ayurveda, and modern medicine come together in the Blue Ridge foothills of Virginia.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <Button
              href="/reserve"
              variant="secondary"
              className="text-ivory border-ivory/30 hover:bg-sage hover:border-sage hover:text-dark transition-all duration-300"
            >
              Reserve Your Stay
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-ivory/50 tracking-[0.2em] uppercase font-body">
          SCROLL TO DISCOVER
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-ivory/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
