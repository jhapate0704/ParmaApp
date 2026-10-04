'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { ShareButton } from '@/components/ui/ShareButton'

interface NavItem {
  label: string
  href?: string
  dropdown?: { label: string; href: string }[]
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  // FIX P17: Track current pathname to show active indicator
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const menuVariants = {
    closed: {
      x: '100%',
      opacity: 0,
      transition: { duration: 0.4 }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  }

  const itemVariants = {
    closed: { x: 30, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.15 + (i * 0.07),
        duration: 0.4,
      }
    })
  }

  // Flatten nav items: expand dropdowns into flat list
  const flatNavItems = navItems.flatMap((item: any) =>
    item.dropdown ? item.dropdown : [item]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-50 bg-[#0a0a0a]/98 backdrop-blur-3xl text-ivory flex flex-col justify-between px-6 md:px-12 py-6 overflow-y-auto"
        >
          {/* Subtle terracotta ambient glow — positioned top-left to match global light direction */}
          <div className="absolute top-[15%] left-[20%] w-80 h-80 bg-[#C86D51]/8 rounded-full blur-3xl pointer-events-none" />

          {/* TOP BAR: BRANDING & CLOSE (X) BUTTON */}
          <div className="relative z-20 flex items-center justify-between w-full pt-1 pb-4 border-b border-white/10 shrink-0">
            {/* FIX P8: Replaced raw <img> with next/image */}
            <Link href="/" onClick={onClose} className="flex items-center space-x-2">
              <Image src="/icon.png" alt="Parma Crest" width={48} height={48} className="object-contain" />
              <span className="font-display text-xl tracking-wide uppercase text-ivory">Parma</span>
            </Link>

            {/* Prominent Close (X) Button */}
            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 flex items-center justify-center text-ivory hover:text-white transition-all duration-300 cursor-pointer group active:scale-95"
            >
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90 text-ivory group-hover:text-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* NAVIGATION LINKS */}
          {/* FIX P16: space-y-3.5 → space-y-4 (14px → 16px, back on 4px grid) */}
          <nav className="relative z-10 flex flex-col space-y-4 my-auto py-6 max-h-[60vh] overflow-y-auto pr-2">
            {flatNavItems.map((item: any, i: number) => {
              // FIX P17: Determine if this item is the current active page
              const isActive = item.href && (
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href.split('#')[0]))
              );

              return (
                <motion.div key={item.label} custom={i} variants={itemVariants}>
                  <Link 
                    href={item.href || '#'} 
                    onClick={(e) => {
                      onClose();
                      const isAnchorOnHome = item.href && (item.href.startsWith('#') || (item.href.startsWith('/#') && typeof window !== 'undefined' && window.location.pathname === '/'));
                      if (isAnchorOnHome) {
                        e.preventDefault();
                        const targetId = item.href.replace(/^\/?#/, '');
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                          const headerOffset = 85; 
                          const elementPosition = targetElement.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                          setTimeout(() => {
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }, 250);
                        }
                      }
                    }} 
                    className="flex items-baseline space-x-5 group py-1"
                  >
                    <span className={`text-xs font-body font-semibold tracking-widest ${isActive ? 'text-[#C86D51]' : 'text-[#FFE0D2]'}`}>
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                    {/* FIX P17: Active page gets terracotta color highlight */}
                    <span className={`font-display group-hover:translate-x-2 transition-all duration-300 text-3xl sm:text-4xl ${isActive ? 'text-[#C86D51]' : 'text-ivory group-hover:text-white'}`}>
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* BOTTOM ACTIONS */}
          {/* FIX P16: gap-3 (not gap-3.5) for 4px grid alignment — but keeping max-w-sm removed for full-width */}
          <motion.div 
            className="relative z-10 pt-4 border-t border-white/10 w-full flex flex-col gap-3 shrink-0"
            custom={navItems.length} 
            variants={itemVariants}
          >
            <ShareButton variant="drawer" />
            <Button variant="primary" size="lg" className="w-full text-center" onClick={onClose} href="/reserve">
              Reserve Your Stay
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu;
