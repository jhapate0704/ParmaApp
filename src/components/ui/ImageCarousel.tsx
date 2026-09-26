'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    if (swipe < -50) {
      // Swiped left, go to next
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsPaused(true); // Auto-pause on manual interaction
    } else if (swipe > 50) {
      // Swiped right, go to prev
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsPaused(true);
    }
  };

  return (
    <div 
      className="relative w-full h-full cursor-grab active:cursor-grabbing group overflow-hidden"
      onClick={() => setIsPaused(!isPaused)}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} - image ${currentIndex + 1}`}
            fill
            className="object-cover transition-transform duration-[10000ms] ease-linear group-hover:scale-105 pointer-events-none"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Pause indicator */}
      <AnimatePresence>
        {isPaused && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full z-20 pointer-events-none"
          >
            <span className="text-white text-xs tracking-wider uppercase font-body font-medium">Paused</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
        {images.map((_, i) => (
          <button 
            key={i} 
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(i);
              setIsPaused(true);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70 scale-100'}`} 
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
