'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  { id: '01', title: 'PARMA INN', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80' },
  { id: '02', title: 'PARMA SPA', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80' },
  { id: '03', title: 'HEALTHCARE', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1600&q=80' },
  { id: '04', title: 'MEDITATION', image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=1600&q=80' },
];

export function Preloader() {
  const [stage, setStage] = useState<'logo' | 'services' | 'done'>('logo');
  const [serviceIndex, setServiceIndex] = useState(0);

  // Lock body scroll while preloader is active
  useEffect(() => {
    if (stage !== 'done') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [stage]);

  // Stage 1: Logo display
  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setStage('services');
    }, 1800); // Show logo for 1.8 seconds
    return () => clearTimeout(logoTimer);
  }, []);

  // Stage 2: Cycle through services
  useEffect(() => {
    if (stage === 'services') {
      const interval = setInterval(() => {
        setServiceIndex((prev) => {
          if (prev >= services.length - 1) {
            clearInterval(interval);
            // Wait slightly on the last image before finishing
            setTimeout(() => setStage('done'), 600);
            return prev;
          }
          return prev + 1;
        });
      }, 600); // 0.6 seconds per image
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div 
          className="fixed inset-0 z-[100] pointer-events-auto"
          exit={{ opacity: 1 }} // Keeps wrapper alive while children exit
        >
          
          {/* Double Stairs Background Wipe */}
          <div className="absolute inset-0 flex w-full h-full z-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="h-full w-1/5 bg-dark"
                initial={{ y: "0%" }}
                exit={{ y: i % 2 === 0 ? "-100%" : "100%" }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.08 * i }}
              />
            ))}
          </div>

          {/* Preloader Content */}
          <motion.div 
            className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              
              {/* LOGO STAGE */}
              {stage === 'logo' && (
                <motion.div
                  key="logo"
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="text-center"
                >
                  <h1 className="font-display text-5xl md:text-7xl lg:text-9xl text-ivory tracking-widest uppercase">
                    Parma
                  </h1>
                  <p className="font-body text-ivory/60 tracking-[0.3em] uppercase mt-4 text-xs md:text-sm">
                    A sanctuary for living well
                  </p>
                </motion.div>
              )}

              {/* SERVICES IMAGES STAGE */}
              {stage === 'services' && (
                <motion.div
                  key="services"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={serviceIndex}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img 
                        src={services[serviceIndex].image} 
                        alt={services[serviceIndex].title} 
                        className="w-full h-full object-cover opacity-50" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="font-display text-4xl md:text-6xl lg:text-8xl text-white uppercase drop-shadow-2xl tracking-widest">
                          {services[serviceIndex].title}
                        </h2>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
