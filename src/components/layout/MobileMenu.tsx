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
          className="fixed inset-0 z-30 bg-dark text-ivory flex flex-col justify-center px-8 md:px-16"
        >
          <nav className="flex flex-col space-y-4 md:space-y-6 mt-16 max-h-[70vh] overflow-y-auto pr-4">
            {navItems.flatMap((item: any) => item.dropdown ? [item, ...item.dropdown.map((d: any) => ({...d, isSub: true}))] : [item]).map((item: any, i) => (
              <motion.div key={item.label} custom={i} variants={itemVariants}>
                {item.dropdown ? (
                  <div className="flex items-baseline space-x-6 opacity-50 mb-2 mt-4">
                    <span className="text-xs font-body text-transparent font-medium">--</span>
                    <span className="font-body text-sm uppercase tracking-[0.2em]">{item.label}</span>
                  </div>
                ) : (
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
                            }, 300); // Wait for modal to close
                          }
                        }
                      }}
                    className={`flex items-baseline space-x-6 group ${item.isSub ? 'ml-8' : ''}`}
                  >
                    <span className="text-xs font-body text-subtle font-medium">
                      {!item.isSub ? (i + 1).toString().padStart(2, '0') : ''}
                    </span>
                    <span className={`font-display group-hover:text-sage transition-colors duration-300 ${item.isSub ? 'text-3xl text-ivory/80' : 'text-4xl md:text-5xl'}`}>
                      {item.label}
                    </span>
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          <motion.div 
            className="mt-16 md:mt-24 w-full max-w-sm"
            custom={navItems.length} 
            variants={itemVariants}
          >
            <Button variant="dark" size="lg" className="w-full" onClick={onClose}>
              Reserve Your Stay
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu;



