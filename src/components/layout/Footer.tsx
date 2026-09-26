import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Footer() {
  return (
    <footer id="footer" className="bg-forest text-ivory">
      {/* Closing Statement Area */}
      <div className="py-16 md:py-24 px-6 md:px-12 text-center border-b border-white/10 flex flex-col items-center">
        <h2 className="font-display text-[clamp(2.5rem,2rem+3vw,5rem)] max-w-4xl mx-auto mb-12">
          Your private sanctuary awaits.
        </h2>
        <Button variant="dark" size="lg" icon>
          Reserve Your Stay
        </Button>
      </div>

      {/* 4-Column Grid */}
      <div className="py-12 md:py-16 px-6 md:px-12 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Col 1 */}
          <div className="flex items-center space-x-0">
            <img src="/parma-official-crest.png" alt="Parma Crest" className="w-28 h-28 md:w-32 md:h-32 object-contain shrink-0" />
            <div className="flex flex-col">
              <span className="font-display text-2xl md:text-3xl tracking-wide uppercase mb-1">Parma</span>
              <span className="text-base lg:text-lg font-body text-ivory/80 max-w-xs">A Private Wellness Sanctuary</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm uppercase tracking-[0.2em] font-body text-dark font-bold mb-2">Explore</h3>
            <Link href="/#worlds" className="relative group w-fit text-base font-body hover:text-white transition-colors pb-1">Sanctuary<span className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-300"></span></Link>
            <Link href="/#inn" className="relative group w-fit text-base font-body hover:text-white transition-colors pb-1">Stay<span className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-300"></span></Link>
            <Link href="/#spa" className="relative group w-fit text-base font-body hover:text-white transition-colors pb-1">Spa<span className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-300"></span></Link>
            <Link href="/#health" className="relative group w-fit text-base font-body hover:text-white transition-colors pb-1">Healthcare<span className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-300"></span></Link>
            <Link href="/#meditation" className="relative group w-fit text-base font-body hover:text-white transition-colors pb-1">Meditation<span className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-300"></span></Link>
            <Link href="/#explore" className="relative group w-fit text-base font-body hover:text-white transition-colors pb-1">Explore<span className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-300"></span></Link>
            
          </div>

                    {/* Col 3: Location */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm uppercase tracking-[0.2em] font-body text-dark font-bold mb-2">Location</h3>
            <p className="text-base font-body leading-relaxed max-w-xs text-ivory">
              105 Christmas Tree Lane<br />
              Washington VA 22747
            </p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="relative group w-fit flex items-center text-base font-body text-ivory/80 hover:text-white transition-colors mt-2 pb-1"><MapPin className="w-4 h-4 mr-2" /> View on Map<span className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-300"></span></a>
          </div>

          {/* Col 4: Contact */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm uppercase tracking-[0.2em] font-body text-dark font-bold mb-2">Contact</h3>
            
            <a href="tel:5409878588" className="relative group w-fit flex items-center text-base font-body hover:text-white transition-colors pb-1"><Phone className="w-4 h-4 mr-2 opacity-70" /> 540 987 8588
            <span className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-300"></span></a>
            <a href="mailto:info@parmainlittlewashington.com" className="relative group w-fit flex items-center text-base font-body hover:text-white transition-colors break-all pb-1"><Mail className="w-4 h-4 mr-2 opacity-70 shrink-0" /> info@parmainlittlewashington.com
            <span className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-300"></span></a>
          </div>

          {/* Col 5: Connect */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm uppercase tracking-[0.2em] font-body text-dark font-bold mb-2">Connect</h3>
            <a href="#" className="relative group w-fit flex items-center text-base font-body hover:text-white transition-colors pb-1">
                <svg className="w-4 h-4 mr-2 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                Instagram
            
                <span className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-300"></span>
              </a>
            <a href="#" className="relative group w-fit flex items-center text-base font-body hover:text-white transition-colors pb-1">
                <svg className="w-4 h-4 mr-2 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                Facebook
            
                <span className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-300"></span>
              </a>
            <a href="#" className="relative group w-fit flex items-center text-base font-body hover:text-white transition-colors pb-1">
                <svg className="w-4 h-4 mr-2 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
                X (Twitter)
            
                <span className="absolute bottom-0 left-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-300"></span>
              </a>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
        <div className="py-8 px-6 md:px-12 container mx-auto border-t border-white/10 flex justify-center items-center text-center">
          <p className="text-sm font-body text-subtle">
            &copy; 2026 Parma A Private Wellness Sanctuary. All rights reserved.
          </p>
        </div>
    </footer>
  )
}

export default Footer;
