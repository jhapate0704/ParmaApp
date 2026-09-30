'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import { treatmentCategories } from '@/data/treatments';

export function Spa() {
 const categories = treatmentCategories && treatmentCategories.length > 0 ? treatmentCategories : [];
 const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id);
 const [isAutoPlaying, setIsAutoPlaying] = useState(true);

 const activeCategory = categories.find((c: any) => c.id === activeCategoryId) || categories[0];

 useEffect(() => {
  if (!isAutoPlaying) return;
  
  // Stagger time is 0.5s per item. 
  // Total items = 2 images + number of treatments.
  // Calculate total time needed to show everything + 2 seconds to read.
  const staggerTimeMs = 500;
  const totalItems = 2 + activeCategory.treatments.length;
  const displayTime = (totalItems * staggerTimeMs) + 2000;
  
  const timeout = setTimeout(() => {
   setActiveCategoryId((currentId) => {
    const currentIndex = categories.findIndex((c: any) => c.id === currentId);
    const nextIndex = (currentIndex + 1) % categories.length;
    return categories[nextIndex].id;
   });
  }, displayTime);

  return () => clearTimeout(timeout);
 }, [isAutoPlaying, activeCategoryId, categories]);

 const handleTabClick = (id: string) => {
  setActiveCategoryId(id);
  setIsAutoPlaying(false);
 };

 const topImage = 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80&auto=format&fit=crop';
 const bottomImage = 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=1200&q=80&auto=format&fit=crop';

 const containerVariants = {
  hidden: { opacity: 0 },
  show: {
   opacity: 1,
   transition: {
    staggerChildren: 0.5
   }
  },
  exit: {
   opacity: 0,
   transition: { duration: 0.3 }
  }
 };

 const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
   opacity: 1, 
   y: 0,
   transition: { duration: 0.6, ease: "easeOut" as any }
  }
 };

 return (
  <section className="bg-dark/40 backdrop-blur-lg py-16 md:py-16 md:py-24 lg:py-32 px-5 md:px-8 lg:px-16 overflow-hidden">
   <SectionHeading
    eyebrow="Parma Spa &middot; Tysons Corner"
    heading="Restore your rhythm."
    description="Rooted in the 5,000-year-old wisdom of Ayurveda, our therapies are designed to realign your body and spirit."
    align="center"
   />

   <div className="mt-16">
    {/* Stationary Tab Bar */}
    <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto mb-16">
     {categories.map((category: any) => {
      const isActive = category.id === activeCategoryId;
      return (
       <button
        key={category.id}
        onClick={() => handleTabClick(category.id)}
        className={cn(
         "px-8 py-3 rounded-full text-sm uppercase tracking-[0.15em] font-body font-medium transition-all duration-300",
         isActive
          ? "bg-sage text-ivory"
          : "bg-dark/50 text-muted hover:text-ivory hover:bg-dark/40 backdrop-blur-lg border border-ivory/10"
        )}
       >
        {category.label}
       </button>
      );
     })}
    </div>

    {/* Content Area */}
    <div className="max-w-6xl mx-auto overflow-hidden">
     <AnimatePresence mode="wait">
      <motion.div
       key={activeCategory.id}
       variants={containerVariants}
       initial="hidden"
       animate="show"
       exit="exit"
       className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
      >
       {/* Left: Two Images Stacked Vertically */}
       <div className="w-full flex flex-col gap-6 lg:gap-8">
        <motion.div variants={itemVariants} className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm">
         <img 
          src={topImage} 
          alt="Spa Detail 1"
          className="w-full h-full object-cover"
         />
        </motion.div>
        <motion.div variants={itemVariants} className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm">
         <img 
          src={bottomImage} 
          alt="Spa Detail 2"
          className="w-full h-full object-cover"
         />
        </motion.div>
       </div>

       {/* Right: Treatments List */}
       <div className="flex flex-col justify-start">
        <div className="space-y-0">
         {activeCategory.treatments.map((treatment: any, idx: number) => (
          <motion.div 
           key={idx}
           variants={itemVariants}
           className="group border-b border-ivory/10 py-6 last:border-0 hover:bg-dark/50 transition-colors duration-300 rounded-lg px-4 -mx-4 cursor-pointer"
          >
           <div className="flex justify-between items-baseline mb-2">
            <h4 className="font-display text-xl text-ivory group-hover:text-sage transition-colors duration-300">
             {treatment.name}
            </h4>
            <span className="text-xs text-sage uppercase tracking-wider font-body font-medium whitespace-nowrap ml-4">
             {treatment.duration}
            </span>
           </div>
           
           <p className="text-muted font-body text-sm leading-relaxed mb-4">
            {treatment.description}
           </p>
           
           <div className="overflow-hidden">
            <span className="text-xs text-ivory uppercase tracking-wider font-medium font-body inline-flex items-center transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
             Explore Treatment 
             <span className="ml-1">&rarr;</span>
            </span>
           </div>
          </motion.div>
         ))}
        </div>
       </div>
      </motion.div>
     </AnimatePresence>
    </div>
   </div>
  </section>
 );
}

export default Spa;






