'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ShareButton } from '@/components/ui/ShareButton'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
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
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex flex-col items-center gap-3.5"
        >
          {/* Upper Side: Floating Share Button with SVG */}
          <ShareButton variant="floating" />

          {/* Lower Side: Floating Reserve Button (Heartbeat / Beating Animation Only) */}
          <Link href="/reserve" passHref>
            <motion.button
              animate={{ scale: [1, 1.07, 1, 1.07, 1] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                times: [0, 0.12, 0.24, 0.36, 1],
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 bg-[#C5A059] hover:bg-[#8B6D45] text-ivory px-6 py-3 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(197,160,89,0.3)] uppercase tracking-wider text-xs font-body font-semibold transition-colors duration-300 block cursor-pointer"
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
