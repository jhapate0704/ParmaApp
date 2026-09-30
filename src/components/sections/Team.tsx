'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { team } from '@/data/team';
import { SectionHeading } from '@/components/ui';

export function Team() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-16 bg-transparent" id="team">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        <SectionHeading 
          heading="Our Experts" 
          eyebrow="THE MINDS BEHIND PARMA"
          className="mb-12 md:mb-16" 
        />

        {/* TOP: Horizontal Row of Expanding Images */}
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
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }} // smooth exponential ease
                className="relative h-full rounded-2xl md:rounded-3xl overflow-hidden group"
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

        {/* BOTTOM: Dynamic Info Section */}
        <div className="mt-8 md:mt-12 h-auto min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col md:flex-row gap-6 md:gap-12 items-start justify-between border-t border-white/10 pt-8"
            >
              {/* Left Side: Name and Role */}
              <div className="md:w-1/3 shrink-0">
                <h3 className="font-display text-3xl md:text-4xl text-[#C5A059] mb-2">
                  {team[activeIndex].name}
                </h3>
                <p className="font-body text-xs md:text-sm tracking-[0.2em] uppercase text-ivory/80">
                  {team[activeIndex].role}
                </p>
                {team[activeIndex].specialty && (
                  <p className="font-body text-xs tracking-wider uppercase text-white/50 mt-4 border border-white/10 inline-block px-3 py-1 rounded-full">
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
