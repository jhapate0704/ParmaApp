'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedReveal } from '@/components/ui/AnimatedReveal';
import { Button } from '@/components/ui/Button';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { rooms } from '@/data/rooms';

export function ParmaInn() {
  return (
    <section className="py-16 md:py-16 md:py-24 lg:py-32 px-5 md:px-8 lg:px-16 bg-sand/30" >
      <div className="max-w-7xl mx-auto">
        <AnimatedReveal>
          <SectionHeading
            eyebrow="Parma Inn"
            heading="Stay differently."
            description="Old-world character. Contemporary comfort. An hour from the city."
            align="center"
          />
        </AnimatedReveal>

        <div className="mt-16 md:mt-24 space-y-20 md:space-y-32 lg:space-y-40">
          {rooms.map((room, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={room.id} 
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-12 lg:gap-24 items-center`}
              >
                {/* Image Side - Animated from the side it appears */}
                <div className="w-full lg:w-1/2">
                  <AnimatedReveal direction={isEven ? 'left' : 'right'} threshold={0.2}>
                    <div className="relative aspect-[4/3] w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-lg group">
                      <ImageCarousel images={room.gallery || [room.image]} alt={room.name} />
                    </div>
                  </AnimatedReveal>
                </div>

                {/* Info Side - Animated from the opposite side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
                  <AnimatedReveal direction={isEven ? 'right' : 'left'} delay={0.2} threshold={0.2}>
                    <span className="text-xs text-sage tracking-wider uppercase font-body font-semibold mb-3 block">
                      Room 0{index + 1}
                    </span>
                    <h3 className="font-display text-3xl lg:text-4xl text-charcoal mb-4">
                      {room.name}
                    </h3>
                    {room.subtitle && (
                      <p className="font-body text-charcoal text-lg mb-6">
                        {room.subtitle}
                      </p>
                    )}
                    
                    <p className="font-body text-lg text-charcoal leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                      {room.description}
                    </p>

                    {room.features && (
                      <div className="mb-10 max-w-xl mx-auto lg:mx-0">
                        <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                          {room.features.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-center text-sm text-charcoal font-body justify-center lg:justify-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-forest mr-3 shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex justify-center lg:justify-start">
                      <Button href="/reserve?service=stay" variant="secondary" className="px-8 border-charcoal/20 hover:!bg-sage hover:!border-sage hover:!text-white transition-all duration-300">
                        Reserve Room
                      </Button>
                    </div>
                  </AnimatedReveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ParmaInn;
