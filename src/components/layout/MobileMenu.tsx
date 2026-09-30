'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ShareButton } from '@/components/ui/ShareButton'

interface NavItem {
  label: string
  href?: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
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
          {/* Subtle gold ambient glow in mobile menu background */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

          {/* TOP BAR: BRANDING & CLOSE (X) BUTTON */}
          <div className="relative z-20 flex items-center justify-between w-full pt-1 pb-4 border-b border-white/10 shrink-0">
            <Link href="/" onClick={onClose} className="flex items-center space-x-2">
              <img src="/icon.png" alt="Parma Crest" className="h-12 w-12 object-contain" />
              <span className="font-display text-xl tracking-wide uppercase text-ivory">Parma</span>
            </Link>

            {/* Prominent Close (X) Button */}
            <button
              onClick={onClose}
              aria-label="Close navigation menu"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#C5A059]/20 border border-white/20 hover:border-[#C5A059]/60 flex items-center justify-center text-ivory hover:text-[#C5A059] transition-all duration-300 cursor-pointer group active:scale-95"
            >
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90 text-ivory group-hover:text-[#C5A059]" 
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
          <nav className="relative z-10 flex flex-col space-y-3.5 my-auto py-6 max-h-[60vh] overflow-y-auto pr-2">
            {navItems.flatMap((item: any) => item.dropdown ? item.dropdown : [item]).map((item: any, i) => (
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
                  <span className="text-xs font-body text-[#C5A059]/80 font-semibold tracking-widest">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="font-display text-ivory group-hover:text-[#C5A059] group-hover:translate-x-2 transition-all duration-300 text-3xl sm:text-4xl">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* BOTTOM ACTIONS */}
          <motion.div 
            className="relative z-10 pt-4 border-t border-white/10 w-full max-w-sm mx-auto flex flex-col gap-3 shrink-0"
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
