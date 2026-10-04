'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimatedReveal } from '@/components/ui/AnimatedReveal';

const faqs = [
 {
  question: "What is the check-in and check-out time?",
  answer: "Check-in begins at 3:00 PM, and check-out is at 11:00 AM. If you require early arrival or late departure, please contact our concierge, and we will do our utmost to accommodate your request."
 },
 {
  question: "Are children permitted at Parma?",
  answer: "To maintain the serene and restorative atmosphere of our wellness sanctuary, Parma is exclusively designed for guests aged 16 and older."
 },
 {
  question: "Do I need to book spa and healthcare treatments in advance?",
  answer: "We highly recommend reserving your treatments and wellness consultations at the time of your room booking, or at least two weeks prior to arrival, to ensure your preferred times and specialists are available."
 },
 {
  question: "What should I pack for my stay?",
  answer: "Comfort is paramount. We recommend bringing relaxed, breathable clothing for meditation and treatments, comfortable walking shoes for exploring the grounds, and smart-casual attire for evening dining."
 },
 {
  question: "Is there a dress code for the dining room?",
  answer: "Our dining atmosphere is elegantly relaxed. While there is no strict formal dress code, we ask guests to kindly observe a smart-casual standard during dinner service."
 }
];

export default function FAQ() {
 const [openIndex, setOpenIndex] = useState<number | null>(0);

 const toggleFaq = (index: number) => {
  setOpenIndex(openIndex === index ? null : index);
 };

 return (
  <section className="py-16 md:py-24 lg:py-32 px-5 md:px-8 lg:px-16 bg-transparent" id="faq">
   <div className="max-w-4xl mx-auto">
    <AnimatedReveal>
     <SectionHeading
      eyebrow="Common Inquiries"
      heading="Frequently asked questions."
      description="Everything you need to know to prepare for your sanctuary experience."
      align="center"
     />
    </AnimatedReveal>

    <div className="mt-16 lg:mt-20 space-y-3">
     {faqs.map((faq, index) => {
      const isOpen = openIndex === index;

      return (
       <AnimatedReveal key={index} delay={index * 0.1}>
        <div
         className={`rounded-2xl overflow-hidden border transition-all duration-300 shadow-[2px_3px_8px_-1px_rgba(62,18,11,0.22)] ${
          isOpen
           ? 'border-[#FFE0D2]/50 bg-white/5'
           : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/5'
         }`}
        >
         <button
          onClick={() => toggleFaq(index)}
          className="w-full flex justify-between items-center p-6 lg:p-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C86D51]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-t-2xl group"
         >
          <span className={`font-display text-xl lg:text-2xl pr-8 transition-colors duration-300 ${isOpen ? 'text-[#FFE0D2]' : 'text-ivory group-hover:text-white'}`}>
           {faq.question}
          </span>
          {/* Animated +/- icon with gold color */}
          <span className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
           isOpen
            ? 'border-[#FFE0D2] text-[#FFE0D2] bg-[#FFE0D2]/15'
            : 'border-white/20 text-ivory/50 group-hover:border-white/40 group-hover:text-white'
          }`}>
           <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
           >
            <Plus className="w-4 h-4" />
           </motion.div>
          </span>
         </button>

         <AnimatePresence initial={false}>
          {isOpen && (
           <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
           >
            {/* Gold left-border accent line on the answer */}
            <div className="mx-6 lg:mx-8 mb-8 pt-2 border-l-2 border-[#C86D51]/40 pl-5">
             <p className="font-body text-ivory/70 text-base lg:text-lg leading-relaxed">
              {faq.answer}
             </p>
            </div>
           </motion.div>
          )}
         </AnimatePresence>
        </div>
       </AnimatedReveal>
      );
     })}
    </div>
   </div>
  </section>
 );
}






