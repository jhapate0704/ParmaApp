'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Sparkles, Shield, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Footer from '@/components/layout/Footer'

function ReserveContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultService = searchParams?.get('service');
  
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    if (defaultService) {
      if (defaultService === 'stay') setSelectedServices(['Parma Inn Stay']);
      else if (defaultService === 'spa') setSelectedServices(['Spa Treatment']);
      else if (defaultService === 'healthcare') setSelectedServices(['Healthcare Consultation']);
      else if (defaultService === 'meditation') setSelectedServices(['Meditation Session']);
    }
  }, [defaultService]);

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Auto redirect after 3.5 seconds
    setTimeout(() => {
      router.push('/');
    }, 3500);
  };

  return (
    <div className="min-h-screen text-ivory flex flex-col relative overflow-hidden bg-[#050505]">
      {/* Background Video with Rich Midnight Overlays */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40">
          <source src="https://res.cloudinary.com/ohelitbr/video/upload/v1783843486/samples/sea-turtle.mp4" type="video/mp4" />
        </video>
        {/* Midnight Theme Gradient Grids */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,#000000_90%)]" />
      </div>
      
      {/* Main Content wrapper above video */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Luxury Header */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-transparent">
          <div>
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-body font-medium uppercase tracking-[0.14em] text-ivory/80 bg-black/60 backdrop-blur-xl border border-white/10 hover:border-[#C5A059]/60 hover:text-[#C5A059] transition-all duration-300 shadow-lg group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> 
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <img src="/parma-official-crest.png" alt="Parma Crest" className="w-8 h-8 object-contain" />
            <span className="font-display text-xl md:text-2xl uppercase tracking-[0.2em] text-[#C5A059]">Parma</span>
          </div>
          
          {/* Spacer for balance */}
          <div className="w-24 hidden md:block" />
        </header>

        {/* Main Section */}
        <main className="flex-1 flex items-center justify-center pt-32 pb-24 px-6 md:px-12 relative">
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left: Copy & Sanctuary Pillars */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col space-y-6"
            >
              <h1 className="font-display text-[clamp(2.5rem,2rem+3vw,4.5rem)] leading-[1.08] text-ivory tracking-tight">
                Begin your journey.
              </h1>
              
              <p className="font-body text-base md:text-lg text-ivory/80 max-w-lg leading-relaxed font-light">
                Reserve your retreat, customized medical consultation, or holistic spa ritual. Our concierge team will connect with you directly to tailor every nuance of your sanctuary experience.
              </p>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 max-w-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#C5A059]/10 text-[#C5A059] shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-body font-semibold text-ivory">Bespoke</h4>
                    <p className="text-[11px] text-ivory/60 font-body">Tailored itineraries</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#C5A059]/10 text-[#C5A059] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-body font-semibold text-ivory">Rapid</h4>
                    <p className="text-[11px] text-ivory/60 font-body">24-hour confirmation</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#C5A059]/10 text-[#C5A059] shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-body font-semibold text-ivory">Private</h4>
                    <p className="text-[11px] text-ivory/60 font-body">Discreet & serene</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Luxury Form Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="bg-[#0a0a0a]/90 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-[#C5A059]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(197,160,89,0.1)] relative overflow-hidden"
            >
              {/* Top ambient gold shimmer line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-80" />

              {submitted ? (
                <div className="text-center py-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(197,160,89,0.3)]">
                    <Check className="w-8 h-8 text-[#C5A059]" />
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-ivory mb-3">Request Received</h3>
                  <p className="font-body text-ivory/70 max-w-sm mb-6 leading-relaxed">
                    Thank you. Our sanctuary concierge will contact you within 24 hours to confirm your dates and preferences.
                  </p>
                  <p className="font-body text-xs text-[#C5A059] tracking-widest uppercase animate-pulse mb-8">
                    Redirecting to homepage...
                  </p>
                  <Button variant="secondary" onClick={() => setSubmitted(false)}>
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-[0.18em] font-body text-ivory/70 font-medium">
                        Full Name
                      </label>
                      <input 
                        required 
                        type="text" 
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 font-body text-sm text-ivory focus:outline-none focus:border-[#C5A059] focus:bg-[#C5A059]/5 transition-all duration-300 placeholder:text-ivory/30" 
                        placeholder="Jane Doe" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-[0.18em] font-body text-ivory/70 font-medium">
                        Phone Number
                      </label>
                      <input 
                        required 
                        type="tel" 
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 font-body text-sm text-ivory focus:outline-none focus:border-[#C5A059] focus:bg-[#C5A059]/5 transition-all duration-300 placeholder:text-ivory/30" 
                        placeholder="+1 (555) 000-0000" 
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.18em] font-body text-ivory/70 font-medium">
                      Email Address
                    </label>
                    <input 
                      required 
                      type="email" 
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 font-body text-sm text-ivory focus:outline-none focus:border-[#C5A059] focus:bg-[#C5A059]/5 transition-all duration-300 placeholder:text-ivory/30" 
                      placeholder="jane@example.com" 
                    />
                  </div>

                  {/* Services Multi-Select */}
                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-[0.18em] font-body text-ivory/70 font-medium flex items-center justify-between">
                      <span>Experiences Requested</span>
                      <span className="text-[10px] text-[#C5A059] lowercase">(select all that apply)</span>
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {['Parma Inn Stay', 'Spa Treatment', 'Healthcare Consultation', 'Meditation Session'].map(service => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <button 
                            type="button" 
                            key={service}
                            onClick={() => toggleService(service)}
                            className={`px-4 py-2.5 rounded-full text-xs uppercase tracking-[0.12em] font-body font-medium transition-all duration-300 border ${
                              isSelected 
                                ? 'bg-[#C5A059] border-[#C5A059] text-black font-semibold shadow-[0_0_15px_rgba(197,160,89,0.35)] scale-[1.02]' 
                                : 'bg-white/[0.03] border-white/15 text-ivory/70 hover:border-[#C5A059]/50 hover:text-ivory'
                            }`}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                    <input type="hidden" required={selectedServices.length === 0} value={selectedServices.join(',')} />
                  </div>

                  {/* Message Queries */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.18em] font-body text-ivory/70 font-medium flex justify-between">
                      <span>Special Inquiries & Dietary Needs</span> 
                      <span className="text-ivory/40 lowercase text-[10px]">(optional)</span>
                    </label>
                    <textarea 
                      rows={3} 
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 font-body text-sm text-ivory focus:outline-none focus:border-[#C5A059] focus:bg-[#C5A059]/5 transition-all duration-300 placeholder:text-ivory/30 resize-none" 
                      placeholder="Preferred dates, health objectives, or personalized requests..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button variant="primary" size="lg" className="w-full justify-center shadow-[0_0_20px_rgba(197,160,89,0.25)]">
                      Submit Reservation Request
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>

          </div>
        </main>
        
        {/* Cohesive Full Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default function ReservePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex bg-[#050505] text-[#C5A059] items-center justify-center font-display text-2xl">Loading...</div>}>
      <ReserveContent />
    </Suspense>
  );
}
