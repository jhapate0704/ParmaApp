'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import MobileMenu from '@/components/layout/MobileMenu';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/layout/FloatingCTA';

import Hero from '@/components/sections/Hero';
import Introduction from '@/components/sections/Introduction';
import FourWorlds from '@/components/sections/FourWorlds';
import ParmaStory from '@/components/sections/ParmaStory';
import ParmaInn from '@/components/sections/ParmaInn';
import Spa from '@/components/sections/Spa';
import WellnessJourney from '@/components/sections/WellnessJourney';
import Healthcare from '@/components/sections/Healthcare';
import Meditation from '@/components/sections/Meditation';
import Destinations from '@/components/sections/Destinations';
import FAQ from '@/components/sections/FAQ';
import Team from '@/components/sections/Team';
import Philosophy from '@/components/sections/Philosophy';

import ReservationModal from '@/components/reservation/ReservationModal';
import { navigationData as navItems } from '@/data/navigation';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  

  const router = useRouter();
  const openReservation = () => router.push("/reserve");
  

  return (
    <>
      <Header 
         
         
         
      />
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        navItems={navItems}
        
      />

      <main className="flex-1 w-full flex flex-col">
        <section id="top">
          <Hero />
        </section>

        

        

        <section id="about">
          <Philosophy />
          <Introduction />
          <ParmaStory />
        </section>

        <section id="worlds">
          <FourWorlds />
        </section>

        <section id="inn">
          <ParmaInn />
        </section>

        <section id="spa">
          <Spa />
        </section>

        <section id="health">
          <Healthcare  />
        </section>

        <section id="meditation">
          <Meditation />
        </section>

                        <section id="team">
          <Team />
        </section>

        <section id="wellness">
          <WellnessJourney  />
        </section>

        <section id="faq">
          <FAQ />
        </section>

        <section id="explore">
          <Destinations />
        </section>

        


      </main>

      <Footer  />
      
      <FloatingCTA onReserveClick={openReservation} />
      
      
    </>
  );
}


