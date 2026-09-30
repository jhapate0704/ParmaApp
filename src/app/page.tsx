'use client';

import Hero from '@/components/sections/Hero';
import FourWorlds from '@/components/sections/FourWorlds';
import GallerySection from '@/components/sections/GallerySection';
import FAQ from '@/components/sections/FAQ';
import Team from '@/components/sections/Team';
import Philosophy from '@/components/sections/Philosophy';
import WellnessJourney from '@/components/sections/WellnessJourney';
import BookingProcess from '@/components/sections/BookingProcess';
import AboutJourney from '@/components/sections/AboutJourney';
import SolarSystem from '@/components/ui/SolarSystem';
import { Preloader } from '@/components/ui/Preloader';

export default function Home() {
  return (
    <>
      <Preloader />
      
      {/* Global Interactive Background */}
      <div className="fixed inset-0 z-[-10] w-full h-full pointer-events-auto">
        <SolarSystem />
      </div>

      <section id="top">
        <Hero />
      </section>

      <section id="about">
        <AboutJourney />
        <Philosophy />
      </section>

      <section id="worlds">
        <FourWorlds />
      </section>

      <GallerySection />

      <section id="team">
        <Team />
      </section>

      <section id="booking-process">
        <BookingProcess />
      </section>

      <section id="wellness">
        <WellnessJourney />
      </section>

      <section id="faq">
        <FAQ />
      </section>
    </>
  );
}


