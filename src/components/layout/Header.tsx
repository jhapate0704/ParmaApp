'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { navigationData } from '@/data/navigation'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll Spy Logic
      const sections = ['about', 'worlds', 'inn', 'spa', 'health', 'meditation', 'team', 'footer'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section's top is above the middle of the screen, or taking up the screen
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClass = `fixed top-0 left-0 right-0 w-full z-40 transition-all duration-500 ease-out ${
    scrolled 
      ? 'bg-ivory/40 backdrop-blur-lg border-b border-charcoal/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)]  py-4' 
      : 'bg-transparent text-ivory py-6'
  }`

  return (
    <>
      <header className={headerClass}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Left: Logo */}
          <Link href="/" className="flex items-center space-x-0 hover:scale-[1.05] transition-transform duration-300">
            <img src="/parma-official-crest.png" alt="Parma Crest" className={`shrink-0 object-contain transition-all duration-500 ${scrolled ? "h-14 w-14" : "h-24 w-24"}`} />
            <div className="flex flex-col">
              <span className="font-display text-2xl tracking-wide uppercase">Parma</span>
              
            </div>
          </Link>

          {/* Center: Desktop Nav */}
          <nav className="hidden lg:flex relative bg-white/5 rounded-full p-1 items-center border border-transparent transition-all duration-300">
            {navigationData.map((item: any) => {
              const isActive = item.dropdown 
                ? item.dropdown.some((sub: any) => sub.href.includes(activeSection) && activeSection !== '')
                : item.href?.includes(activeSection) && activeSection !== '';

              return item.dropdown ? (
                <div key={item.label} className="relative group hover:scale-[1.05] transition-transform duration-300">
                  <div className="relative px-6 py-2 cursor-pointer z-10 flex items-center gap-1">
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavIndicator"
                        className={`absolute inset-0 rounded-full shadow-sm backdrop-blur-md ${scrolled ? 'bg-dark/10 border border-dark/40' : 'bg-white/20 border border-white/60'}`}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 font-body text-sm uppercase tracking-[0.12em] font-medium transition-colors duration-300 ${isActive ? (scrolled ? 'text-dark font-bold' : 'text-ivory font-bold') : (scrolled ? 'text-charcoal group-hover:text-dark' : 'text-ivory group-hover:text-ivory')}`}>
                      {item.label}
                    </span>
                    <svg className={`relative z-10 w-3 h-3 transition-transform duration-300 group-hover:rotate-180 ${isActive ? (scrolled ? 'text-dark font-bold' : 'text-ivory') : (scrolled ? 'text-charcoal' : 'text-ivory')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                  
                  <div className="absolute top-full left-0 pt-4 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className={`shadow-lg rounded-xl overflow-hidden py-2 ${scrolled ? "bg-ivory/40 backdrop-blur-lg border border-charcoal/20" : "bg-transparent border border-white/60"}`}>
                      {item.dropdown.map((sub: any) => (
                        <Link key={sub.label} href={sub.href} onClick={(e) => {
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
                          }} className={`block mx-1 my-1 px-2 py-2 text-center text-xs md:text-sm uppercase tracking-[0.12em] font-medium font-body transition-all duration-300 rounded-lg hover:scale-[1.05] ${sub.href.includes(activeSection) && activeSection !== '' ? (scrolled ? 'bg-sage/10 text-dark font-bold' : 'bg-white/10 text-ivory font-bold') : (scrolled ? 'text-charcoal hover:bg-sage/10 hover:text-dark' : 'text-ivory hover:bg-white/10 hover:text-ivory')}`}>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link 
                  key={item.label} 
                  href={item.href!}
                  className="relative px-6 py-2 z-10 group hover:scale-[1.05] transition-transform duration-300"
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      className={`absolute inset-0 rounded-full shadow-sm backdrop-blur-md ${scrolled ? 'bg-dark/10 border border-dark/40' : 'bg-white/20 border border-white/60'}`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 font-body text-sm uppercase tracking-[0.12em] font-medium transition-colors duration-300 ${isActive ? (scrolled ? 'text-dark font-bold' : 'text-ivory font-bold') : (scrolled ? 'text-charcoal group-hover:text-dark' : 'text-ivory group-hover:text-ivory')}`}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* Right: Reserve Button & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:block">
              <Button href="/reserve" variant={scrolled ? 'primary' : 'dark'} size="sm" className="rounded-full hover:!bg-sage hover:!text-white transition-all">
                Reserve
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button 
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50 relative"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              <span className={`w-7 h-[2px] bg-current transform transition duration-300 ease-out ${mobileOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
              <span className={`w-7 h-[2px] bg-current transition duration-300 ease-out ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-7 h-[2px] bg-current transform transition duration-300 ease-out ${mobileOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} navItems={navigationData} />
    </>
  )
}

export default Header;
