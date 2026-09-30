'use client';

import React from 'react';
import { CircularGallery } from '@/components/ui/CircularGallery';
import { SectionHeading } from '@/components/ui/SectionHeading';

const galleryImages = [
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80",
];

export default function GallerySection() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center bg-transparent py-24" id="gallery">
      <div className="w-full h-full absolute inset-0 z-10">
        <CircularGallery 
          images={galleryImages} 
          count={50}
          tilt={60}
          radius={500}
          itemWidth={60}
          itemHeight={80}
          autoRotate={true}
          parallax={true}
          centerContent={
            <div className="flex flex-col items-center text-center pointer-events-none">
              <SectionHeading 
                heading="The Archive." 
                description="Glimpses of a sanctuary designed for lasting vitality." 
                align="center"
              />
              <span className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-[#C5A059]/30 text-[11px] md:text-xs uppercase tracking-[0.2em] text-[#C5A059] font-body backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                Tap card to view
              </span>
            </div>
          }
        />
      </div>
    </section>
  );
}
