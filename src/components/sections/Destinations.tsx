'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { destinations } from '@/data/destinations';
import { SectionHeading, AnimatedReveal } from '@/components/ui';

export function Destinations() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="py-16 md:py-16 md:py-24 lg:py-32 pl-6 lg:pl-16 bg-ivory overflow-hidden" ref={containerRef}>
      <AnimatedReveal>
        <div className="pr-6 lg:pr-16 mb-12">
          <SectionHeading heading="Beyond the gates." description="Discover curated experiences in our surroundings." />
        </div>
      </AnimatedReveal>

      <div className="flex overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar gap-6 pr-6 lg:pr-16">
        {destinations.map((dest, index) => (
          <div key={dest.id} className="flex-none w-[85vw] md:w-[60vw] lg:w-[40vw] snap-center group cursor-pointer">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
              <Image
                src={dest.image || `https://images.unsplash.com/photo-1542314831-c5a42a1f8c8e?w=800&q=80`}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {dest.tags.map((tag, i) => (
                <span key={i} className="text-xs font-body tracking-wider uppercase bg-stone px-3 py-1 rounded-full text-charcoal">
                  {tag}
                </span>
              ))}
            </div>
            
            <h3 className="font-display text-2xl lg:text-3xl text-charcoal mb-2">
              {dest.name}
            </h3>
            <p className="font-body text-muted line-clamp-2">
              {dest.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Destinations;

