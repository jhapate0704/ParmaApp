'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

const healthcareData = [
 {
  id: 'concierge',
  title: 'Concierge Medicine',
  description: 'Personalized, unhurried care focused on your comprehensive well-being.',
  image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
  details: [
   { name: 'Comprehensive Health Assessment', duration: '90min' },
   { name: 'Direct Physician Access', duration: 'Ongoing' },
   { name: 'Personalized Care Plan', duration: 'Ongoing' }
  ]
 },
 {
  id: 'integrative',
  title: 'Integrative Medicine',
  description: 'Blending conventional therapies with evidence-based alternative approaches.',
  image: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=800&q=80',
  details: [
   { name: 'Ayurvedic Medical Consultation', duration: '60min' },
   { name: 'Nutritional Medicine', duration: '60min' },
   { name: 'Mind-Body Integration', duration: 'Ongoing' }
  ]
 },
 {
  id: 'expert',
  title: 'Expert Consultation',
  description: 'Access to world-class specialists tailored to your specific health needs.',
  image: 'https://images.unsplash.com/photo-1584982751601-97d8cb0f66fc?w=800&q=80',
  details: [
   { name: 'Specialist Referral', duration: 'Variable' },
   { name: 'Second Opinion Service', duration: 'Variable' }
  ]
 },
 {
  id: 'wellness',
  title: 'Wellness Planning',
  description: 'Proactive strategies designed for longevity and vitality.',
  image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
  details: [
   { name: 'Longevity Roadmap', duration: '90min' },
   { name: 'Preventative Screening Plan', duration: 'Variable' }
  ]
 }
];

export default function Healthcare() {
 const [activeTab, setActiveTab] = useState(healthcareData[0].id);
 const [isAutoPlaying, setIsAutoPlaying] = useState(true);
 
 const activeItem = healthcareData.find(item => item.id === activeTab) || healthcareData[0];

 useEffect(() => {
  if (!isAutoPlaying) return;
  
  // Display each tab for 4 seconds
  const timeout = setTimeout(() => {
   setActiveTab((currentId) => {
    const currentIndex = healthcareData.findIndex((c) => c.id === currentId);
    const nextIndex = (currentIndex + 1) % healthcareData.length;
    return healthcareData[nextIndex].id;
   });
  }, 4000);

  return () => clearTimeout(timeout);
 }, [isAutoPlaying, activeTab]);

 const handleTabClick = (id: string) => {
  setActiveTab(id);
  setIsAutoPlaying(false);
 };

 return (
  <div className="bg-transparent py-16 md:py-24 lg:py-32 px-5 md:px-8 lg:px-16" >
   <SectionHeading
    eyebrow="Parma Healthcare"
    heading="Healthcare, reimagined."
    description="A proactive, deeply personal approach to your longevity and vitality."
    align="center"
   />

   <div className="mt-16 flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
    {healthcareData.map((item) => (
     <button
      key={item.id}
      onClick={() => handleTabClick(item.id)}
      className={cn(
       "px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] font-body font-medium transition-all duration-300",
       activeTab === item.id
        ? "bg-[#C65A3A] text-white border border-[#FFE0D2]/40 shadow-[0_4px_14px_rgba(198,90,58,0.45)] scale-105 terracotta-btn-shadow"
        : "bg-black/40 text-ivory/80 hover:text-white hover:bg-black/60 backdrop-blur-lg border border-white/10"
      )}
     >
      {item.title}
     </button>
    ))}
   </div>

   <div className="mt-16 max-w-6xl mx-auto">
    <AnimatePresence mode="wait">
     <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center"
     >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_2px_4px_rgba(40,12,6,0.65),4px_8px_16px_-2px_rgba(48,15,8,0.55),12px_20px_36px_-4px_rgba(60,19,10,0.40),24px_38px_55px_-6px_rgba(74,25,14,0.25)] w-full">
       <Image
        src={activeItem.image}
        alt={activeItem.title}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
       />
      </div>

      <div className="flex flex-col justify-center">
       <h3 className="font-display text-4xl text-ivory mb-4">
        {activeItem.title}
       </h3>
       <p className="font-body text-ivory/85 text-lg leading-relaxed mb-10">
        {activeItem.description}
       </p>
       
       <div className="space-y-6">
        {activeItem.details.map((detail, idx) => (
         <div key={idx} className="flex justify-between items-end border-b border-ivory/10 pb-4 group cursor-pointer hover:border-[#C65A3A]/60 transition-colors">
          <span className="font-display text-xl text-ivory group-hover:text-[#FFE0D2] transition-colors">{detail.name}</span>
          <span className="font-body text-xs uppercase tracking-widest text-[#FFE0D2] font-semibold">{detail.duration}</span>
         </div>
        ))}
       </div>
       
       <div className="mt-10">
        <Button href="/reserve?service=healthcare" variant="secondary" className="px-8 border-ivory/20 hover:!bg-[#C65A3A] hover:!border-[#C65A3A] hover:!text-white transition-all duration-300 terracotta-btn-shadow">
         Reserve Consultation
        </Button>
       </div>
      </div>
     </motion.div>
    </AnimatePresence>
   </div>
  </div>
 );
}






