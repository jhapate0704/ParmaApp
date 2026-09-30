'use client' // Marks this component as a Client Component in Next.js (required for hooks like useState/useEffect and Framer Motion)

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { navigationData } from '@/data/navigation'
import { MobileMenu } from './MobileMenu'

const HoverLetter = ({ char }: { char: string }) => {
  const [color, setColor] = useState<string | undefined>(undefined);
  
  return (
    <motion.span
      onHoverStart={() => setColor(`hsl(${Math.floor(Math.random() * 360)}, 80%, 75%)`)}
      onHoverEnd={() => setColor(undefined)}
      animate={{ color: color || "currentColor" }}
      whileHover={{ scale: 1.2, zIndex: 10, y: -2 }}
      transition={{ duration: 0.05 }}
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
  
  // Tracks if the user has scrolled down past 50px. Used to trigger the dark glass pill styling.
  const [scrolled, setScrolled] = useState(false)
  
  // Tracks if the mobile hamburger menu drawer is open or closed. For mobile users only.
  const [mobileOpen, setMobileOpen] = useState(false)

  // Tracks which section of the homepage is currently in the viewport (Scroll Spy).
  // Used to highlight the "active" link in the navigation menu automatically.
  const [activeSection, setActiveSection] = useState<string>('');

  // =========================================
  // EFFECT: Scroll Listener & Scroll Spy Logic
  // Who is this for? The browser window. It continuously monitors where the user is looking.
  // =========================================
  useEffect(() => {
    const handleScroll = () => {
      // Trigger the 'scrolled' visual state when the user reaches the #about section
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        setScrolled(window.scrollY >= aboutSection.offsetTop - 100);
      } else {
        setScrolled(window.scrollY > 50);
      }

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
      setActiveSection(current); // Update the state so the nav links can re-render their active styles
    }
    
    // Attach the scroll listener when the component mounts
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Run it once immediately to set the correct initial state on page load
    handleScroll()
    
    // Cleanup function: Removes the listener when the component unmounts to prevent memory leaks
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Main header styling logic: perfectly static size, no shrinking on scroll.
  const headerClass = `fixed top-0 left-0 right-0 w-full z-40 transition-colors duration-500 ease-out bg-transparent text-ivory py-6`

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
          <Link href="/" className="flex items-center space-x-0 group">
            {/* The crest size remains completely static so the header doesn't jump or shrink */}
            <img src="/icon.png" alt="Parma Crest" className="shrink-0 object-contain h-16 w-16 md:h-20 md:w-20 drop-shadow-[0_2px_12px_rgba(197,160,89,0.3)]" />
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
          <nav className={`hidden lg:flex relative rounded-full p-1 items-center border transition-all duration-300 backdrop-blur-md ${
            scrolled ? 'bg-black/70 border-white/10 shadow-sm backdrop-blur-xl' : 'bg-white/10 border-white/20'
          }`}>
            {/* Dynamically render all navigation links from the data file */}
            {navigationData.map((item: any) => {
              
              // Determine if THIS specific link is active by checking the URL or Scroll Spy state
              const isActive = item.dropdown 
                ? item.dropdown.some((sub: any) => sub.href.includes(activeSection) && activeSection !== '')
                : item.href?.includes(activeSection) && activeSection !== '';

              return item.dropdown ? (
                // DROPDOWN MENU WRAPPER
                // Who is this for? Desktop users hovering over a link that contains sub-pages.
                <div key={item.label} className="relative group hover:scale-[1.05] transition-transform duration-300">
                  
                  {/* Dropdown Trigger Button */}
                  <div className={`relative px-6 py-2 rounded-full cursor-pointer z-10 flex items-center gap-1 transition-all duration-300 ${
                    scrolled ? 'group-hover:bg-white/10' : 'group-hover:bg-white/20'
                  }`}>
                    
                    {/* Active Indicator (Framer Motion Pill) */}
                    {/* Gives visual feedback with luxury gold styling */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className={`absolute inset-0 rounded-full shadow-sm backdrop-blur-md ${scrolled ? 'bg-[#C5A059]/20 border border-[#C5A059]/40' : 'bg-[#C5A059]/25 border border-[#C5A059]/50'}`}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    {/* Dropdown Text Label */}
                    <span className={`relative z-10 font-body text-sm uppercase tracking-[0.12em] font-medium transition-colors duration-300 ${isActive ? 'text-[#C5A059] font-bold' : (scrolled ? 'text-ivory/70 group-hover:text-[#C5A059]' : 'text-ivory/80 group-hover:text-[#C5A059]')}`}>
                      {item.label}
                    </span>
                    
                    {/* Chevron Arrow Icon (Rotates 180deg on hover to show interaction) */}
                    <svg className={`relative z-10 w-3 h-3 transition-transform duration-300 group-hover:rotate-180 ${isActive ? 'text-[#C5A059]' : (scrolled ? 'text-ivory/70 group-hover:text-[#C5A059]' : 'text-ivory group-hover:text-[#C5A059]')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                  
                  {/* DROPDOWN BOX CONTENT */}
                  {/* Displays sub-links when hovering over trigger with luxury styling aligned with theme */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 pointer-events-none group-hover:pointer-events-auto">
                    <div className="relative rounded-2xl overflow-hidden p-2 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-[#C5A059]/40 shadow-[0_16px_40px_rgba(0,0,0,0.9),0_0_20px_rgba(197,160,89,0.15)] transition-all duration-300">
                      {/* Top gold accent line */}
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-70" />

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
                              className={`group/sub flex items-center justify-between px-4 py-2.5 rounded-xl text-xs md:text-sm uppercase tracking-[0.14em] font-medium font-body transition-all duration-300 ${
                                isSubActive
                                  ? 'bg-[#C5A059]/20 text-[#C5A059] font-semibold border-l-2 border-[#C5A059]'
                                  : 'text-ivory/80 hover:bg-[#C5A059]/10 hover:text-[#C5A059] hover:translate-x-1'
                              }`}
                            >
                              <span>{sub.label}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // STANDARD NAVIGATION LINK (No Dropdown)
                // Who is this for? Standard top-level pages directly accessible from the nav pill.
                <Link 
                  key={item.label} 
                  href={item.href!}
                  onClick={(e) => {
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
                  className={`relative px-6 py-2 z-10 rounded-full group hover:scale-[1.05] transition-all duration-300 ${
                    scrolled ? 'hover:bg-white/10' : 'hover:bg-white/20'
                  }`}
                >
                  {/* Active Indicator (Framer Motion Pill) */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      className={`absolute inset-0 rounded-full shadow-sm backdrop-blur-md ${scrolled ? 'bg-[#C5A059]/20 border border-[#C5A059]/40' : 'bg-[#C5A059]/25 border border-[#C5A059]/50'}`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Link Text Label */}
                  <span className={`relative z-10 font-body text-sm uppercase tracking-[0.12em] font-medium transition-colors duration-300 ${isActive ? 'text-[#C5A059] font-bold' : (scrolled ? 'text-ivory/70 group-hover:text-[#C5A059]' : 'text-ivory/80 group-hover:text-[#C5A059]')}`}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* =========================================
              RIGHT SECTION: ACTIONS & MOBILE TOGGLE
              Who is this for? Global actions (Booking) and Mobile Menu access.
              ========================================= */}
          <div className={`group flex items-center space-x-2 rounded-full p-1 border transition-all duration-300 backdrop-blur-md hover:scale-[1.05] ${
            scrolled ? 'bg-black/70 hover:bg-black/80 border-white/10 hover:border-[#C5A059]/40 shadow-sm backdrop-blur-xl' : 'bg-white/10 hover:bg-[#C5A059]/10 border-white/20 hover:border-[#C5A059]/40'
          }`}>
            
            {/* DESKTOP RESERVE BUTTON */}
            {/* Who is this for? Desktop users. It is hidden on small mobile screens (hidden lg:block). */}
            <div className="hidden lg:block">
              <Link 
                href="/reserve" 
                className="relative px-6 py-2 block z-10 rounded-full transition-all duration-300 font-body text-sm uppercase tracking-[0.12em] font-medium text-ivory group-hover:text-[#C5A059]"
              >
                Reserve
              </Link>
            </div>

            {/* MOBILE HAMBURGER MENU TOGGLE */}
            {/* Who is this for? Mobile/Tablet users only (lg:hidden). Opens the MobileMenu drawer. */}
            <button 
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 mx-2 space-y-1.5 z-50 relative text-ivory"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              {/* Top Bar (Rotates into an 'X' when open) */}
              <span className={`w-7 h-[2px] bg-current transform transition duration-300 ease-out ${mobileOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
              {/* Middle Bar (Fades out completely when open) */}
              <span className={`w-7 h-[2px] bg-current transition duration-300 ease-out ${mobileOpen ? 'opacity-0' : ''}`} />
              {/* Bottom Bar (Rotates backwards into an 'X' when open) */}
              <span className={`w-7 h-[2px] bg-current transform transition duration-300 ease-out ${mobileOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================
          EXTERNAL COMPONENTS
          ========================================= */}
      {/* Mobile Navigation Drawer Component */}
      {/* Who is this for? Renders the full-screen menu overlay when mobile users click the hamburger icon above. */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} navItems={navigationData} />
    </>
  )
}

export default Header;

