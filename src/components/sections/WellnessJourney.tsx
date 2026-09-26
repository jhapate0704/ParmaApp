'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wellnessGoals } from '@/data/wellness-journeys';
import SectionHeading from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import AnimatedReveal from '@/components/ui/AnimatedReveal';

interface WellnessJourneyProps {
  onReserveClick?: () => void;
}

export function WellnessJourney({ onReserveClick }: WellnessJourneyProps) {
  const [selectedGoal, setSelectedGoal] = useState(wellnessGoals[0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    // Stagger time is 0.5s per item. 
    // Total items = title + description + number of journey steps.
    const staggerTimeMs = 500;
    const totalItems = 2 + (selectedGoal?.journey?.length || 0);
    const displayTime = (totalItems * staggerTimeMs) + 2000;
    
    const timeout = setTimeout(() => {
      setSelectedGoal((currentGoal) => {
        const currentIndex = wellnessGoals.findIndex((g: any) => g.id === currentGoal.id);
        const nextIndex = (currentIndex + 1) % wellnessGoals.length;
        return wellnessGoals[nextIndex];
      });
    }, displayTime);

    return () => clearTimeout(timeout);
  }, [isAutoPlaying, selectedGoal]);

  const handleGoalClick = (goal: any) => {
    setSelectedGoal(goal);
    setIsAutoPlaying(false);
  };

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
    <section className="py-24 lg:py-40 px-6 lg:px-16 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <AnimatedReveal>
          <SectionHeading eyebrow="WELLNESS JOURNEYS" heading="What brings you here?" description="A journey tailored to your specific intentions." />
        </AnimatedReveal>

        <div className="mt-12 flex flex-col lg:flex-row gap-16">
          {/* Left: Tab Options */}
          <div className="lg:w-1/3">
            <div className="flex flex-wrap lg:flex-col gap-4">
              {wellnessGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => handleGoalClick(goal)}
                  className={`text-left px-6 py-4 rounded-full border transition-all duration-300 font-body uppercase tracking-wider text-sm ${
                    selectedGoal.id === goal.id
                      ? 'bg-sage text-ivory border-sage'
                      : 'border-stone hover:border-sage text-charcoal bg-white/50'
                  }`}
                >
                  <span className="font-medium">{goal.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Journey Steps */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedGoal.id}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="bg-stone p-8 lg:p-12 rounded-3xl"
              >
                <motion.h3 variants={itemVariants} className="font-display text-2xl lg:text-3xl text-charcoal mb-4">
                  {selectedGoal.label}
                </motion.h3>
                
                <motion.p variants={itemVariants} className="font-body text-lg text-muted mb-12 max-w-2xl">
                  {selectedGoal.description}
                </motion.p>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-sage/30 before:to-transparent">
                  {selectedGoal.journey.map((step: any, index: number) => (
                    <motion.div variants={itemVariants} key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      {/* Step Number Circle */}
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-ivory bg-sage text-ivory shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                        <span className="text-sm font-body font-semibold">{index + 1}</span>
                      </div>
                      
                      {/* Step Content Card */}
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-charcoal/5 shadow-sm bg-ivory">
                        <div className="flex items-center justify-between space-x-2 mb-2">
                          <div className="font-display text-xl text-charcoal">{step.step}</div>
                        </div>
                        <div className="text-muted font-body text-sm leading-relaxed">{step.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={itemVariants} className="mt-12 text-center md:text-left flex justify-center md:justify-start">
                  <Button onClick={onReserveClick} variant="primary">
                    Explore My Journey
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WellnessJourney;
