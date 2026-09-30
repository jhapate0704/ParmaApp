'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

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
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 flex items-center justify-center"
        >
          {/* Wave Ripple */}
          <motion.div
            animate={{ 
              scale: [1, 2, 2],
              opacity: [0.6, 0, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              times: [0, 0.5, 1],
              ease: "easeOut"
            }}
            className="absolute inset-0 bg-sage rounded-full z-0"
          />

          {/* Heartbeat Button */}
          <Link href="/reserve" passHref>
            <motion.button
              animate={{ scale: [1, 1.1, 1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, times: [0, 0.1, 0.2, 0.3, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 bg-sage hover:bg-forest text-ivory px-6 py-3 rounded-full shadow-lg uppercase tracking-wider text-xs font-body font-semibold transition-colors duration-300 block"
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
