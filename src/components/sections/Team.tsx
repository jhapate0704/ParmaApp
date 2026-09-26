'use client';

import { useState } from 'react';
import Image from 'next/image';
import { team } from '@/data/team';
import { SectionHeading, AnimatedReveal } from '@/components/ui';

export function Team() {
  return (
    <section className="py-16 md:py-16 md:py-24 lg:py-32 px-5 md:px-8 lg:px-16 bg-stone" id="team">
      <div className="max-w-7xl mx-auto">
        <AnimatedReveal>
          <SectionHeading heading="An international team, chosen with care." align="center" />
        </AnimatedReveal>

        <div className="mt-16 md:mt-24 space-y-20 md:space-y-32 lg:space-y-40">
          {team.map((member, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={member.id} 
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-12 lg:gap-24 items-center`}
              >
                {/* Image Side - Animated from the side it appears */}
                <div className="w-full lg:w-1/2">
                  <AnimatedReveal direction={isEven ? 'left' : 'right'} threshold={0.2}>
                    <div className="relative aspect-[3/4] w-full max-w-lg mx-auto rounded-2xl overflow-hidden shadow-lg group">
                      <Image
                        src={member.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80'}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </AnimatedReveal>
                </div>

                {/* Info Side - Animated from the opposite side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
                  <AnimatedReveal direction={isEven ? 'right' : 'left'} delay={0.2} threshold={0.2}>
                    <h3 className="font-display text-4xl lg:text-5xl text-charcoal mb-4">
                      {member.name}
                    </h3>
                    <p className="font-body text-sage uppercase tracking-[0.2em] font-medium text-sm mb-8">
                      {member.role}
                    </p>
                    
                    {member.bio && (
                      <p className="font-body text-lg text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
                        {member.bio}
                      </p>
                    )}
                    
                    {member.specialty && !member.bio && (
                      <p className="font-body text-lg text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
                        Specializes in {member.specialty}.
                      </p>
                    )}
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

export default Team;
