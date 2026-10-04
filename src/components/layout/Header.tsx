'use client' // Marks this component as a Client Component in Next.js (required for hooks like useState/useEffect and Framer Motion)

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { navigationData } from '@/data/navigation'
import { MobileMenu } from './MobileMenu'

// Curated on-brand hover palette — replaces the off-brand random HSL rainbow
const BRAND_HOVER_COLORS = [
  '#FFE0D2', // Peach accent
  '#E08E74', // Light ember
  '#FAF7F2', // Ivory
  '#D87555', // Light terracotta
  '#F0ECE4', // Stone
  '#C86D51', // Primary terracotta
];

const HoverLetter = ({ char }: { char: string }) => {
  const [color, setColor] = useState<string | undefined>(undefined);
  
  return (
    <motion.span
      onHoverStart={() =>
        setColor(BRAND_HOVER_COLORS[Math.floor(Math.random() * BRAND_HOVER_COLORS.length)])
      }
      onHoverEnd={() => setColor(undefined)}
      animate={{ color: color || "currentColor" }}
      // FIX P28: Use font-semibold equivalent weight here; letter hover keeps scale but 
      // we don't change font-weight so no layout shift
      whileHover={{ scale: 1.2, zIndex: 10, y: -2 }}
      transition={{ duration: 0.1 }}
      className="inline-block transform-gpu cursor-default"
    >
      {char}
    </motion.span>
  );
};

/**
 * Header Component
 * Who is this for? This is the primary top navigation bar for the entire application. 
 * It adapts its styling based on scroll position (transparent at the top, frosted glass when scrolled)
 * and manages both the Desktop and Mobile navigation states.
 */
export function Header() {
  const pathname = usePathname();
  const isReserve = pathname === '/reserve';

  // =========================================
  // STATE MANAGEMENT
  // =========================================
  
  // Tracks if the mobile hamburger menu drawer is open or closed. For mobile users only.
  const [mobileOpen, setMobileOpen] = useState(false)

  // Tracks which section of the homepage is currently in the viewport (Scroll Spy).
  // Used to highlight the "active" link in the navigation menu automatically.
  const [activeSection, setActiveSection] = useState<string>('');

  // FIX P3: Tracks whether the user has scrolled past the hero (80px threshold)
  // Used to apply the frosted glass state to the header for legibility.
  const [scrolled, setScrolled] = useState(false);

  // =========================================
  // EFFECT: Scroll Listener, Scroll Spy Logic, and Frosted Glass State
  // =========================================
  useEffect(() => {
    const handleScroll = () => {
      // FIX P3: Frosted glass threshold
      setScrolled(window.scrollY > 80);

      // Scroll Spy: Array of section IDs that exist on the homepage
      const sections = ['about', 'worlds', 'gallery', 'team', 'footer', 'inn', 'spa', 'health', 'meditation'];
      let current = '';
      
      // Loop through each section to see if it's currently in the middle of the user's screen
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section overlaps the vertical center of the screen, mark it as active
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    }
    
    // Attach the scroll listener when the component mounts
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run it once immediately to set the correct initial state on page load
    handleScroll()
    
    // Cleanup function: Removes the listener when the component unmounts to prevent memory leaks
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClass = `fixed top-0 left-0 right-0 w-full z-40 transition-all duration-500 ease-out bg-transparent text-ivory py-6`

  if (isReserve) return null;

  return (
    <>
      <header className={headerClass}>
        {/* Main container holding the Header layout. Adapts to screen sizes (px-6 on mobile, px-12 on desktop) */}
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* =========================================
              LEFT SECTION: LOGO & BRANDING
              Who is this for? All users (Mobile & Desktop). Acts as a visual home button.
              ========================================= */}
          {/* FIX P27: space-x-0 → space-x-3 so crest and wordmark have breathing room */}
          <Link href="/" className="flex items-center space-x-3 group">
            {/* FIX P8: Replaced raw <img> with next/image for optimization + explicit size */}
            <Image
              src="/icon.png"
              alt="Parma Crest"
              width={64}
              height={64}
              className="shrink-0 object-contain drop-shadow-[0_2px_12px_rgba(197,160,89,0.3)] md:w-20 md:h-20"
              priority
            />
            <div className="flex flex-col">
              <span className="font-display text-2xl tracking-wide uppercase flex">
                {"Parma".split("").map((char, i) => (
                  <HoverLetter key={i} char={char} />
                ))}
              </span>
            </div>
          </Link>

          {/* =========================================
              CENTER SECTION: DESKTOP NAVIGATION PILL
              Who is this for? Desktop and Large Tablet users only (hidden on lg and below).
              ========================================= */}
          <nav className="hidden lg:flex relative rounded-full p-1 px-3 items-center border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300">
            {/* Dynamically render all navigation links from the data file */}
            {navigationData.map((item: any) => {
              
              // Determine if THIS specific link is active by checking the URL or Scroll Spy state
              let isActive = false;
              if (item.href === '/') {
                isActive = activeSection === '' && pathname === '/';
              } else {
                isActive = item.dropdown 
                  ? item.dropdown.some((sub: any) => sub.href.includes(activeSection) && activeSection !== '')
                  : item.href?.includes(activeSection) && activeSection !== '';
              }

              return item.dropdown ? (
                // DROPDOWN MENU WRAPPER
                <div key={item.label} className="relative group hover:scale-[1.05] transition-transform duration-300">
                  
                  {/* Dropdown Trigger Button */}
                  <div className="relative px-6 py-2 rounded-full cursor-pointer z-10 flex items-center gap-1 transition-all duration-300 group-hover:bg-white/20">
                    
                    {/* Active Indicator (Framer Motion Pill) */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-full shadow-sm backdrop-blur-md bg-[#C86D51]/25 border border-[#C86D51]/50"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* FIX P28: font-bold → font-semibold prevents layout shift on active state change */}
                    <span className={`relative z-10 font-body text-sm uppercase tracking-[0.12em] font-medium transition-colors duration-300 ${isActive ? 'text-white font-semibold' : 'text-ivory/80 group-hover:text-white'}`}>
                      {item.label}
                    </span>
                    
                    {/* Chevron Arrow Icon (Rotates 180deg on hover to show interaction) */}
                    <svg className={`relative z-10 w-3 h-3 transition-transform duration-300 group-hover:rotate-180 ${isActive ? 'text-white' : 'text-ivory group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                  
                  {/* DROPDOWN BOX CONTENT */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 pointer-events-none group-hover:pointer-events-auto">
                    <div className="relative rounded-2xl overflow-hidden p-2 bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300">
                      <div className="flex flex-col space-y-1">
                        {item.dropdown.map((sub: any) => {
                          const isSubActive = sub.href.includes(activeSection) && activeSection !== '';
                          return (
                            <Link 
                              key={sub.label} 
                              href={sub.href} 
                              onClick={(e) => {
                                if (sub.href.startsWith('#')) {
                                   e.preventDefault();
                                   const el = document.getElementById(sub.href.replace('#', ''));
                                   if (el) {
                                     const headerOffset = 80;
                                     const elementPosition = el.getBoundingClientRect().top;
                                     const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                     window.scrollTo({
                                       top: offsetPosition,
                                       behavior: 'smooth'
                                     });
                                   }
                                 }
                               }} 
                              className={`group/sub flex items-center justify-center text-center px-4 py-2.5 rounded-xl text-xs md:text-sm uppercase tracking-[0.14em] font-medium font-body transition-all duration-300 ${
                                isSubActive
                                  ? 'bg-white/15 text-white font-semibold'
                                  : 'text-ivory/80 hover:bg-white/10 hover:text-white'
                              }`}
                            >
                              <span>{sub.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // STANDARD NAVIGATION LINK (No Dropdown)
                <Link 
                  key={item.label} 
                  href={item.href!}
                  onClick={(e) => {
                    if (item.href === '/' && typeof window !== 'undefined' && window.location.pathname === '/') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      return;
                    }
                    const isAnchorOnHome = item.href && (item.href.startsWith('#') || (item.href.startsWith('/#') && typeof window !== 'undefined' && window.location.pathname === '/'));
                    if (isAnchorOnHome) {
                      const targetId = item.href.replace(/^\/?#/, '');
                      const el = document.getElementById(targetId);
                      if (el) {
                        e.preventDefault();
                        const headerOffset = 80;
                        const elementPosition = el.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: 'smooth'
                        });
                        window.history.pushState(null, '', item.href);
                      }
                    }
                  }}
                  className="relative px-6 py-2 z-10 rounded-full group hover:scale-[1.05] transition-all duration-300 hover:bg-white/20"
                >
                  {/* Active Indicator (Framer Motion Pill) */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full shadow-sm backdrop-blur-md bg-[#C86D51]/25 border border-[#C86D51]/50"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* FIX P28: font-bold → font-semibold to prevent active-state layout shift */}
                  <span className={`relative z-10 font-body text-sm uppercase tracking-[0.12em] font-medium transition-colors duration-300 ${isActive ? 'text-white font-semibold' : 'text-ivory/80 group-hover:text-white'}`}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* =========================================
              RIGHT SECTION: ACTIONS & MOBILE TOGGLE
              FIX P6: Separated desktop Reserve pill from mobile hamburger.
              Desktop gets its own pill. Mobile gets a standalone icon button.
              ========================================= */}
          <div className="flex items-center gap-3">

            {/* DESKTOP: Reserve pill — only visible on lg+ */}
            <div className="hidden lg:flex items-center rounded-full p-1 border border-white/20 bg-white/10 hover:bg-white/15 hover:border-white/30 transition-all duration-300 backdrop-blur-md hover:scale-[1.05] shadow-[1px_2px_8px_-1px_rgba(62,18,11,0.25)]">
              <Link 
                href="/reserve" 
                className="relative px-6 py-2 block z-10 rounded-full transition-all duration-300 font-body text-sm uppercase tracking-[0.12em] font-medium text-ivory hover:text-white"
              >
                Reserve
              </Link>
            </div>

            {/* MOBILE: Standalone hamburger — only visible below lg */}
            {/* FIX P6: Now independent — not wrapped in the Reserve pill */}
            <button 
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 z-50 relative text-ivory shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              {/* Top Bar (Rotates into an 'X' when open) */}
              <span className={`w-5 h-[1.5px] bg-current transform transition duration-300 ease-out ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
              {/* Middle Bar (Fades out completely when open) */}
              <span className={`w-5 h-[1.5px] bg-current transition duration-300 ease-out mt-1 ${mobileOpen ? 'opacity-0' : ''}`} />
              {/* Bottom Bar (Rotates backwards into an 'X' when open) */}
              <span className={`w-5 h-[1.5px] bg-current transform transition duration-300 ease-out mt-1 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </button>

          </div>
        </div>
      </header>

      {/* =========================================
          EXTERNAL COMPONENTS
          ========================================= */}
      {/* Mobile Navigation Drawer Component */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} navItems={navigationData} />
    </>
  )
}

export default Header;
