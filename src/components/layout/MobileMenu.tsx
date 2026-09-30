'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

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
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const menuVariants = {
    closed: {
      x: '100%',
      opacity: 0,
      transition: { duration: 0.5,  }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5,  }
    }
  }

  const itemVariants = {
    closed: { x: 40, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.2 + (i * 0.1),
        duration: 0.5,
        
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
          className="fixed inset-0 z-50 bg-[#0a0a0a]/98 backdrop-blur-2xl text-ivory flex flex-col justify-center px-8 md:px-16"
        >
          {/* Subtle gold ambient glow in mobile menu background */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

          <nav className="relative z-10 flex flex-col space-y-4 md:space-y-6 mt-16 max-h-[70vh] overflow-y-auto pr-4">
            {navItems.flatMap((item: any) => item.dropdown ? item.dropdown : [item]).map((item: any, i) => (
                <motion.div key={item.label} custom={i} variants={itemVariants}>
                  <Link 
                      href={item.href || '#'} 
                      onClick={(e) => {
                        onClose();
                        if (item.href && item.href.startsWith('#')) {
                          e.preventDefault();
                          const targetId = item.href.replace('#', '');
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
                            }, 300);
                          }
                        }
                      }} 
                      className="flex items-baseline space-x-6 group"
                    >
                      <span className="text-xs font-body text-[#C5A059]/70 font-semibold tracking-widest">
                        {(i + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="font-display text-ivory group-hover:text-[#C5A059] group-hover:translate-x-2 transition-all duration-300 text-4xl md:text-5xl">
                        {item.label}
                      </span>
                    </Link>
                </motion.div>
              ))}
          </nav>

          <motion.div 
            className="relative z-10 mt-16 md:mt-24 w-full max-w-sm"
            custom={navItems.length} 
            variants={itemVariants}
          >
            <Button variant="primary" size="lg" className="w-full" onClick={onClose} href="/reserve">
              Reserve Your Stay
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu;



