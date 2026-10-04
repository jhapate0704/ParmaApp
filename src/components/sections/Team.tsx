'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { team } from '@/data/team';
import { SectionHeading } from '@/components/ui';
import { GestureHint } from '@/components/ui/GestureHint';

export function Team() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="pt-0 -mt-2 md:mt-0 pb-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 bg-transparent" id="team">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-4">
          <SectionHeading 
            heading="Our Experts" 
            eyebrow="THE MINDS BEHIND PARMA"
            className="mb-0" 
          />
          <div className="self-center md:self-end">
            <GestureHint type="slide" text="Hover or tap to reveal" delaySeconds={0.4} durationSeconds={8} />
          </div>
        </div>

        {/* TOP: Horizontal Row of Expanding Images with soft ambient ground shadow */}
        <div className="relative">
          <div 
            className="absolute inset-x-8 -bottom-6 h-16 rounded-full bg-black/60 blur-3xl pointer-events-none -z-10 shadow-[0_25px_60px_15px_rgba(0,0,0,0.8)]" 
            aria-hidden="true" 
          />

          <div className="flex h-[40vh] md:h-[50vh] lg:h-[60vh] gap-2 md:gap-4 w-full cursor-pointer">
            {team.map((member, idx) => {
              const isActive = activeIndex === idx;

              return (
                <motion.div
                  key={member.id}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  // Animate flex-grow to make the active image wide and inactive images narrow
                  animate={{
                    flex: isActive ? 3 : 1,
                    filter: isActive ? 'grayscale(0%) brightness(100%)' : 'grayscale(80%) brightness(50%)',
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className={`relative h-full rounded-2xl md:rounded-3xl overflow-hidden group transition-shadow duration-200 ${
                    isActive 
                      ? 'shadow-[0_2px_4px_rgba(40,12,6,0.65),4px_8px_16px_-2px_rgba(48,15,8,0.55),12px_22px_36px_-4px_rgba(60,19,10,0.42),24px_42px_65px_-6px_rgba(74,25,14,0.25)] ring-1 ring-[#C86D51]/50' 
                      : 'shadow-[0_1px_2px_rgba(40,12,6,0.50),2px_4px_10px_-1px_rgba(48,15,8,0.40),6px_12px_20px_-2px_rgba(60,19,10,0.25)]'
                  }`}
                >
                  <Image
                    src={member.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80'}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx === 0}
                  />
                  
                  {/* Optional overlay gradient on narrow slices for style */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM: Dynamic Info Section */}
        <div className="mt-8 md:mt-12 h-auto min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col md:flex-row gap-6 md:gap-12 items-start justify-between pt-8 rounded-2xl p-6 md:p-8 bg-[#160E0B]/85 backdrop-blur-md shadow-[0_2px_4px_rgba(40,12,6,0.55),4px_8px_18px_-2px_rgba(48,15,8,0.45),14px_24px_45px_-4px_rgba(60,19,10,0.30)] border border-[#C86D51]/30"
            >
              {/* Left Side: Name and Role */}
              <div className="md:w-1/3 shrink-0">
                <h3 className="font-display text-3xl md:text-4xl text-ivory mb-2">
                  {team[activeIndex].name}
                </h3>
                <p className="font-body text-xs md:text-sm tracking-[0.2em] uppercase text-[#FFE0D2] font-medium">
                  {team[activeIndex].role}
                </p>
                {team[activeIndex].specialty && (
                  <p className="font-body text-xs tracking-wider uppercase text-ivory/80 mt-4 border border-white/20 inline-block px-3 py-1 rounded-full">
                    {team[activeIndex].specialty}
                  </p>
                )}
              </div>

              {/* Right Side: Detailed Bio */}
              <div className="md:w-2/3">
                <p className="font-body text-base md:text-lg text-ivory/90 leading-relaxed max-w-2xl">
                  {team[activeIndex].bio}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

export default Team;
