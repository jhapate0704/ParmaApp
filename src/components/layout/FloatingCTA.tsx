'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ShareButton } from '@/components/ui/ShareButton'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  // P25: Track hover state to pause the heartbeat animation while hovering
  const [isHovered, setIsHovered] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        setIsVisible(window.scrollY >= aboutSection.offsetTop - window.innerHeight / 2);
      } else {
        setIsVisible(window.scrollY > window.innerHeight);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (pathname === '/reserve') return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          // FIX P16: gap-3.5 → gap-4 (14px → 16px, back on 4px grid)
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex flex-col items-center gap-4"
        >
          {/* Upper Side: Floating Share Button with SVG */}
          <ShareButton variant="floating" />

          {/* Lower Side: Floating Reserve Button */}
          {/* FIX P25: Heartbeat animation pauses cleanly on hover — isHovered stops the pulse sequence */}
          <Link href="/reserve" passHref>
            <motion.button
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              animate={
                isHovered
                  ? { scale: 1.08 }
                  : { scale: [1, 1.07, 1, 1.07, 1] }
              }
              transition={
                isHovered
                  ? { duration: 0.2, ease: 'easeOut' }
                  : { 
                      repeat: Infinity, 
                      duration: 2, 
                      times: [0, 0.12, 0.24, 0.36, 1],
                      ease: "easeInOut"
                    }
              }
              whileTap={{ scale: 0.95 }}
              className="relative z-10 bg-[#C86D51] hover:bg-[#A7533A] text-ivory px-6 py-3 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(200,109,81,0.35)] uppercase tracking-wider text-xs font-body font-semibold transition-colors duration-300 block cursor-pointer"
            >
              Reserve
            </motion.button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatingCTA;
