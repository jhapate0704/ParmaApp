'use client';

import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedReveal } from '@/components/ui/AnimatedReveal';
import { Button } from '@/components/ui/Button';
import { ImageCarousel } from '@/components/ui/ImageCarousel';

const meditationData = [
 {
  id: 'meditation',
  name: 'Meditation',
  description: 'Guided and silent practices to calm the mind, improve focus, and cultivate deep inner peace.',
  gallery: [
   'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&q=80',
   'https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?w=800&q=80',
   'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&q=80'
  ],
 },
 {
  id: 'yoga',
  name: 'Yoga',
  description: 'Physical postures and movement synchronized with breath to build strength, flexibility, and harmony.',
  gallery: [
   'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
   'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800&q=80',
   'https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?w=800&q=80'
  ],
 },
 {
  id: 'pranayama',
  name: 'Pranayama',
  description: 'Ancient yogic breathing techniques designed to control energy, reduce stress, and balance the nervous system.',
  gallery: [
   'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
   'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=800&q=80',
   'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80'
  ],
 },
 {
  id: 'yoganidra',
  name: 'Yoga Nidra',
  description: 'A state of conscious deep sleep that promotes profound physical, mental, and emotional relaxation.',
  gallery: [
   'https://images.unsplash.com/photo-1528319725582-ddc096101511?w=800&q=80',
   'https://images.unsplash.com/photo-1517436073-3b1b1519fca9?w=800&q=80',
   'https://images.unsplash.com/photo-1515041219749-89347f83291a?w=800&q=80'
  ],
 }
];

export default function Meditation() {
 return (
  <section className="py-16 md:py-16 md:py-24 lg:py-32 px-5 md:px-8 lg:px-16 bg-dark/40 backdrop-blur-lg text-ivory">
   <div className="max-w-7xl mx-auto">
    <AnimatedReveal>
     <SectionHeading
      eyebrow="Meditation & Movement"
      heading="Return to stillness."
      description="Ancient practices to center the mind and awaken the spirit."
      align="center"
      dark={true}
     />
    </AnimatedReveal>

    <div className="mt-16 md:mt-24 space-y-20 md:space-y-32 lg:space-y-40">
     {meditationData.map((item, index) => {
      const isEven = index % 2 === 0;
      return (
       <div 
        key={item.id} 
        className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-12 lg:gap-24 items-center`}
       >
        {/* Image Side */}
        <div className="w-full lg:w-1/2">
         <AnimatedReveal direction={isEven ? 'left' : 'right'} threshold={0.2}>
          <div className="relative aspect-[4/3] w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl group">
           <ImageCarousel images={item.gallery} alt={item.name} />
          </div>
         </AnimatedReveal>
        </div>

        {/* Text Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
         <AnimatedReveal direction={isEven ? 'right' : 'left'} delay={0.2}>
          <div className="max-w-md">
           <span className="text-sage text-xs uppercase tracking-[0.2em] font-body mb-4 block">
            Practice 0{index + 1}
           </span>
           <h3 className="font-display text-4xl lg:text-5xl text-ivory mb-6 leading-tight">
            {item.name}
           </h3>
           <p className="font-body text-muted text-lg leading-relaxed mb-8">
            {item.description}
           </p>
           
           <Button variant="dark" className="border border-white/20 hover:border-sage">
            Explore {item.name}
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






