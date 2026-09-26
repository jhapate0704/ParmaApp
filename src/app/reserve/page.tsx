'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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
    
    // Auto redirect after 3 seconds
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  return (
    <div className="min-h-screen text-charcoal flex flex-col relative overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="https://res.cloudinary.com/ohelitbr/video/upload/v1783843486/samples/sea-turtle.mp4" type="video/mp4" />
        </video>
        
      </div>
      
      {/* Ensure main content sits above video */}
      <div className="relative z-10 flex flex-col min-h-screen">
      {/* Simple Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6 bg-transparent border-none">
        <div className="absolute left-6">
          <Link href="/" className="flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-5 md:py-2.5 rounded-full text-base font-body font-medium text-charcoal bg-white/80 md:bg-white/60 backdrop-blur-md border border-white/50 hover:bg-sage hover:border-sage hover:text-white transition-all duration-300 shadow-sm">
            <ArrowLeft className="w-5 h-5 md:w-4 md:h-4 md:mr-2" /> 
            <span className="hidden md:inline">Back to Home</span>
          </Link>
        </div>
        <div className="font-display text-2xl uppercase tracking-widest text-charcoal">Parma</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-24 px-6 relative">
        {/* Background Accent */}
        

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Copy */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-[clamp(2.5rem,2rem+3vw,4rem)] leading-[1.1] mb-6 text-white drop-shadow-lg">
              Begin your journey.
            </h1>
            <p className="font-body text-lg text-white/90 max-w-md leading-relaxed drop-shadow-md">
              Reserve your stay or treatment at our private sanctuary. Fill out the form below, and our concierge will contact you shortly to confirm your booking and curate your experience.
            </p>
          </motion.div>

          {/* Right: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/70 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 relative overflow-hidden"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="font-display text-3xl mb-4">Request Received</h3>
                <p className="font-body text-muted mb-4">We will be in touch within 24 hours to confirm your reservation.</p>
                <p className="font-body text-sm text-muted/60 mb-8 animate-pulse">Redirecting to homepage...</p>
                <Button variant="secondary" onClick={() => setSubmitted(false)}>Make Another Request</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-body text-muted">Full Name</label>
                    <input required type="text" className="w-full bg-ivory/50 border border-charcoal/10 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-sage transition-colors" placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-body text-muted">Phone Number</label>
                    <input required type="tel" className="w-full bg-ivory/50 border border-charcoal/10 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-sage transition-colors" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-body text-muted">Email Address</label>
                  <input required type="email" className="w-full bg-ivory/50 border border-charcoal/10 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-sage transition-colors" placeholder="jane@example.com" />
                </div>

                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-wider font-body text-muted">Service Types (Select Multiple)</label>
                  <div className="flex flex-wrap gap-2">
                    {['Parma Inn Stay', 'Spa Treatment', 'Healthcare Consultation', 'Meditation Session'].map(service => (
                      <button 
                        type="button" 
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`px-4 py-2 rounded-full text-sm font-body transition-colors border ${selectedServices.includes(service) ? 'bg-sage border-sage text-white' : 'bg-transparent border-charcoal/20 text-charcoal hover:border-sage'}`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                  {/* Hidden input to make sure it is technically submitted or validated if needed */}
                  <input type="hidden" required={selectedServices.length === 0} value={selectedServices.join(',')} />
                </div>

                
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-body text-muted flex justify-between"><span>Any other queries?</span> <span className="text-subtle lowercase">(optional)</span></label>
                  <textarea rows={3} className="w-full bg-ivory/50 border border-charcoal/10 rounded-lg px-4 py-3 font-body focus:outline-none focus:border-sage transition-colors resize-none" placeholder="Let us know if you have any special requests..."></textarea>
                </div>

                <div className="pt-4">
                  <Button variant="primary" className="w-full justify-center">
                    Submit Request
                  </Button>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </main>
      <Footer />
      </div>
    </div>
  )
}

export default function ReservePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex bg-ivory items-center justify-center font-display text-2xl">Loading...</div>}>
      <ReserveContent />
    </Suspense>
  );
}
