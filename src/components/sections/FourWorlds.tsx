'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const panels = [
  {
    id: '01',
    title: 'PARMA INN',
    description: 'Stay in a place designed for stillness.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    link: '#inn',
  },
  {
    id: '02',
    title: 'PARMA SPA',
    description: 'Restore your rhythm with ancient therapies.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    link: '#spa',
  },
  {
    id: '03',
    title: 'PARMA HEALTHCARE',
    description: 'Integrative medicine for lasting vitality.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
    link: '#health',
  },
  {
    id: '04',
    title: 'MEDITATION',
    description: 'Find clarity in our serene sanctuary.',
    image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&q=80',
    link: '#meditation',
  },
];

export function FourWorlds() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-stone py-24 lg:py-32 px-6 lg:px-16" id="worlds">
      <SectionHeading
        eyebrow="Four worlds, one estate"
        heading="Choose how you arrive."
        description="Parma is an oasis just an hour from Washington D.C., offering distinct spaces tailored to your path to wellness."
        align="center"
      />

      <div className="max-w-[1400px] mx-auto mt-16">
        <div className="flex flex-col lg:flex-row h-auto lg:h-[600px] gap-3">
          {panels.map((panel, index) => {
            const isHovered = hoveredIndex === index;
            const flexValue =
              hoveredIndex === null
                ? '1'
                : isHovered
                ? '2.5'
                : '0.8';

            return (
              <Link
                key={panel.id}
                href={panel.link}
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = panel.link.replace('#', '');
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    const headerOffset = 85; 
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                  }
                }}
                className="group relative overflow-hidden rounded-lg min-h-[12rem] lg:min-h-0 flex items-end p-6 lg:p-8 cursor-pointer transition-[flex] duration-600 ease-out block"
                style={{ flex: flexValue }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url('${panel.image}')` }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-dark/20 transition-opacity duration-500 group-hover:opacity-90" />

                {/* Content */}
                <div className="relative z-10 w-full flex flex-col justify-end h-full">
                  <div className="flex justify-between items-end w-full">
                    <div className="flex flex-col">
                      <span className="font-body text-xs text-ivory/50 tracking-wider mb-2">
                        {panel.id}
                      </span>
                      <h3 className="font-display text-xl lg:text-2xl text-ivory whitespace-nowrap">
                        {panel.title}
                      </h3>
                      
                      <div className="overflow-hidden">
                        <motion.p
                          initial={false}
                          animate={{ 
                            opacity: isHovered ? 1 : 0,
                            height: isHovered ? 'auto' : 0,
                            marginTop: isHovered ? '0.75rem' : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className={cn(
                            "text-ivory/70 font-body text-sm max-w-xs",
                            "lg:block hidden"
                          )}
                        >
                          {panel.description}
                        </motion.p>
                        
                        {/* Always visible description on mobile */}
                        <p className="text-ivory/70 font-body text-sm max-w-xs mt-2 lg:hidden">
                          {panel.description}
                        </p>
                      </div>
                    </div>

                    <motion.div
                      animate={{ x: isHovered ? 10 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="hidden lg:block bg-ivory/10 p-3 rounded-full backdrop-blur-sm"
                    >
                      <ArrowRight className="w-5 h-5 text-ivory" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FourWorlds;
