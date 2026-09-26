'use client';

import React from 'react';
import { AnimatedReveal } from '@/components/ui/AnimatedReveal';

export function Introduction() {
  return (
    <section className="pt-24 lg:pt-40 pb-0 px-5 md:px-8 lg:px-16 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          {/* Left Column */}
          <AnimatedReveal direction="up" threshold={0.2}>
            <div className="flex flex-col">
              <h2 className="font-display text-[clamp(2rem,1.5rem+2vw,3.5rem)] leading-[1.15] text-charcoal mb-8">
                Where ancient wisdom meets modern wellness.
              </h2>
              <p className="font-body text-lg text-muted leading-relaxed mb-8">
                Parma is a space dedicated to cultivating inner peace and physical vitality. 
                We believe true wellness is achieved by harmonizing the mind, body, and spirit 
                in an environment that reflects the beauty of nature.
              </p>

              <ul className="space-y-6">
                {[
                  'Modern innovation alongside Ayurveda and acupuncture',
                  'Healing energies where nature, spa, and spirit inspire one another',
                  'Therapies given amidst real birdsong, herbal teas, and mountain light'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="h-2 w-2 rounded-full bg-sage mt-2.5 mr-4 flex-shrink-0" />
                    <span className="font-body text-charcoal leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12 pt-8 border-t border-charcoal/10">
                <p className="text-xs text-subtle uppercase tracking-wider font-body">
                  Washington, Virginia · founded 1769 · Blue Ridge foothills
                </p>
              </div>
            </div>
          </AnimatedReveal>
        {/* Right Column */}
          <AnimatedReveal direction="left" delay={0.3} threshold={0.2}>
            <div className="relative aspect-[4/3] lg:aspect-square w-full rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop" 
                alt="Parma Wellness Sanctuary" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
          </AnimatedReveal>

          </div>
      </div>
    </section>
  );
}

export default Introduction;
