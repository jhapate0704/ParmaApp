'use client';

import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer id="footer" className="relative text-ivory z-50 overflow-hidden min-h-screen flex flex-col justify-between">

      {/* ── Background Image with dark overlay ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1800"
          alt="Blue Ridge Mountains"
          className="w-full h-full object-cover object-center"
        />
        {/* Multi-layer overlay: heavy dark so text stays readable, gold tint at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/92 via-black/85 to-black/95" />
        {/* Subtle gold shimmer at the very top edge */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent" />
      </div>

      {/* ── All content sits above the background ── */}
      <div className="relative z-10 flex flex-col flex-1 min-h-screen">

        {/* 4-Column Grid — higher up and slightly right */}
        <div className="pt-16 md:pt-24 pb-12 md:pb-16 px-10 md:px-20 lg:px-32 container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-16">

            {/* Col 1–2: Brand with vertical spinning logo — 2 spans so it doesn't crowd Explore */}
            <div className="flex items-center gap-5 lg:col-span-2">
              {/* Vertical spin (rotateY) — spins on its standing axis like a coin */}
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
                className="shrink-0"
              >
                <img
                  src="/icon.png"
                  alt="Parma Crest"
                  className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_16px_rgba(197,160,89,0.5)]"
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-display text-4xl md:text-5xl tracking-wide uppercase mb-2 text-[#C5A059]">Parma</span>
                <span className="text-sm md:text-base font-body text-ivory/60 leading-relaxed">A Private Wellness Sanctuary<br />Little Washington, Virginia</span>
              </div>
            </div>

            {/* Col 2: Explore */}
            <div className="flex flex-col space-y-5">
              <h3 className="text-sm uppercase tracking-[0.25em] font-body text-[#C5A059] font-semibold mb-1">Explore</h3>
              {[
                { label: 'Sanctuary', href: '/#worlds' },
                { label: 'Stay', href: '/inn' },
                { label: 'Spa', href: '/spa' },
                { label: 'Healthcare', href: '/health' },
                { label: 'Meditation', href: '/meditation' },
              ].map(({ label, href }) => (
                <Link key={label} href={href} className="relative group w-fit text-base md:text-lg font-body text-ivory/70 hover:text-[#C5A059] transition-colors duration-300 pb-0.5">
                  {label}
                  <span className="absolute bottom-0 left-0 h-px bg-[#C5A059] w-0 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Col 3: Location */}
            <div className="flex flex-col space-y-5">
              <h3 className="text-sm uppercase tracking-[0.25em] font-body text-[#C5A059] font-semibold mb-1">Location</h3>
              <p className="text-base md:text-lg font-body leading-relaxed text-ivory/70">
                105 Christmas Tree Lane<br />
                Washington VA 22747
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group w-fit flex items-center text-base md:text-lg font-body text-ivory/70 hover:text-[#C5A059] transition-colors pb-0.5"
              >
                <MapPin className="w-4 h-4 mr-2 shrink-0" /> View on Map
                <span className="absolute bottom-0 left-0 h-px bg-[#C5A059] w-0 group-hover:w-full transition-all duration-300" />
              </a>
            </div>

            {/* Col 4: Contact */}
            <div className="flex flex-col space-y-5">
              <h3 className="text-sm uppercase tracking-[0.25em] font-body text-[#C5A059] font-semibold mb-1">Contact</h3>
              <a href="tel:5409878588" className="relative group w-fit flex items-center text-base md:text-lg font-body text-ivory/70 hover:text-[#C5A059] transition-colors pb-0.5">
                <Phone className="w-4 h-4 mr-2 shrink-0 opacity-70" /> 540 987 8588
                <span className="absolute bottom-0 left-0 h-px bg-[#C5A059] w-0 group-hover:w-full transition-all duration-300" />
              </a>
              <a href="mailto:info@parmainlittlewashington.com" className="relative group w-fit flex items-center text-base md:text-lg font-body text-ivory/70 hover:text-[#C5A059] transition-colors break-all pb-0.5">
                <Mail className="w-4 h-4 mr-2 shrink-0 opacity-70" /> info@parmainlittlewashington.com
                <span className="absolute bottom-0 left-0 h-px bg-[#C5A059] w-0 group-hover:w-full transition-all duration-300" />
              </a>
            </div>

            {/* Col 5: Connect */}
            <div className="flex flex-col space-y-5">
              <h3 className="text-sm uppercase tracking-[0.25em] font-body text-[#C5A059] font-semibold mb-1">Connect</h3>
              {[
                {
                  label: 'Instagram',
                  icon: <svg className="w-4 h-4 mr-2 shrink-0 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                },
                {
                  label: 'Facebook',
                  icon: <svg className="w-4 h-4 mr-2 shrink-0 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                },
                {
                  label: 'X (Twitter)',
                  icon: <svg className="w-4 h-4 mr-2 shrink-0 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                },
              ].map(({ label, icon }) => (
                <a key={label} href="#" className="relative group w-fit flex items-center text-base md:text-lg font-body text-ivory/70 hover:text-[#C5A059] transition-colors pb-0.5">
                  {icon}{label}
                  <span className="absolute bottom-0 left-0 h-px bg-[#C5A059] w-0 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom Bar — pinned to bottom */}
        <div className="mt-auto py-6 px-6 md:px-12 container mx-auto border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-2 text-center">
          <p className="text-xs font-body text-ivory/30">
            © 2026 Parma — A Private Wellness Sanctuary. All rights reserved.
          </p>
          <p className="text-xs font-body text-ivory/20 tracking-wider uppercase">
            Little Washington · Virginia · USA
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
