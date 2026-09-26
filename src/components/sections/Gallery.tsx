'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedReveal } from '@/components/ui';

const galleryImages = [
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600334089648-524e77218684?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501622340570-5b584061a998?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519823551278-120fb36fecdc?w=1200&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1616394584738-fc6e612e71c9?w=1200&q=80&auto=format&fit=crop'
];

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? null : prev === 0 ? galleryImages.length - 1 : prev - 1));
  };
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === null ? null : prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 lg:py-40 px-6 lg:px-16 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <AnimatedReveal>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((src, index) => (
              <div 
                key={index} 
                className="relative break-inside-avoid overflow-hidden rounded-xl cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={src} 
                  alt={`Gallery image ${index + 1}`} 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </AnimatedReveal>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50">
              <X size={32} />
            </button>
            
            <button className="absolute left-6 text-white/70 hover:text-white transition-colors z-50" onClick={prevImage}>
              <ChevronLeft size={48} />
            </button>
            
            <button className="absolute right-6 text-white/70 hover:text-white transition-colors z-50" onClick={nextImage}>
              <ChevronRight size={48} />
            </button>

            <motion.div 
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90vw] h-[80vh] max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedIndex]}
                alt={`Gallery full view ${selectedIndex + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;
