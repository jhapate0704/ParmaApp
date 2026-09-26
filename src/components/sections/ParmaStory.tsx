'use client';

import React from 'react';
import Image from 'next/image';
import { AnimatedReveal } from '@/components/ui/AnimatedReveal';

export function ParmaStory() {
  return (
    <section className="pt-0 pb-24 lg:pb-40 px-5 md:px-8 lg:px-16 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column - Image */}
        <div className="lg:col-span-7">
          <AnimatedReveal direction="left" threshold={0.2}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-sage/10 mix-blend-multiply z-10 transition-opacity duration-500 group-hover:opacity-0" />
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80")' }}
              />
            </div>
          </AnimatedReveal>
        </div>

        {/* Right Column - Text */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <AnimatedReveal direction="right" delay={0.3} threshold={0.2}>
            <blockquote className="font-display text-[clamp(1.5rem,1.2rem+1.5vw,2.5rem)] text-charcoal leading-snug mb-8 relative">
              <span className="text-bronze/30 text-6xl absolute -top-4 -left-6 font-display -z-10 select-none">"</span>
              A different kind of wellness begins with slowing down.
              <span className="text-bronze/30 text-6xl absolute -bottom-8 -right-2 font-display -z-10 select-none">"</span>
            </blockquote>

            <p className="text-muted font-body text-base leading-relaxed mb-10">
              Parma was born from a vision to create a sanctuary where the rapid pace of modern 
              life dissolves into the timeless rhythms of nature. Here, the wisdom of Ayurveda 
              and traditional holistic practices merge seamlessly with contemporary comforts, 
              fostering profound healing and revitalization.
            </p>

            <div className="border-t border-charcoal/10 pt-6">
              <p className="text-xs text-charcoal font-body font-medium uppercase tracking-wider">
                Dr. Sadhna Nicky Singh, Founder
              </p>
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
}

export default ParmaStory;
