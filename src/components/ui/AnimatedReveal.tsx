'use client'

import React, { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface AnimatedRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  className?: string
  threshold?: number
}

export function AnimatedReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  threshold = 0.15
}: AnimatedRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  const prefersReducedMotion = useReducedMotion()

  const getOffset = () => {
    if (prefersReducedMotion || direction === 'none') return { x: 0, y: 0 }
    switch (direction) {
      case 'up': return { y: 40, x: 0 }
      case 'down': return { y: -40, x: 0 }
      case 'left': return { x: 40, y: 0 }
      case 'right': return { x: -40, y: 0 }
      default: return { y: 40, x: 0 }
    }
  }

  const offset = getOffset()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedReveal;
