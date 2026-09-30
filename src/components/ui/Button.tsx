'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  icon?: boolean
  className?: string
  children: React.ReactNode
}

const MotionLink = motion.create(Link as any);

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  icon,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center uppercase tracking-[0.15em] font-medium font-body transition-colors duration-300'
  
  const variants = {
    primary: 'bg-[#C5A059] text-[#0a0a0a] hover:bg-white',
    secondary: 'bg-transparent border border-ivory/20 text-ivory hover:bg-white hover:text-[#0a0a0a]',
    ghost: 'bg-transparent text-ivory hover:text-[#C5A059]',
    dark: 'bg-white text-[#0a0a0a] hover:bg-[#C5A059]'
  }
  
  const sizes = {
    sm: 'px-5 py-2 text-xs',
    md: 'px-8 py-3.5 text-sm',
    lg: 'px-10 py-4 text-sm'
  }
  
  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  const innerContent = (
    <>
      {children}
      {icon && <ArrowRight className="ml-2 w-4 h-4 shrink-0" />}
    </>
  )

  if (href) {
    return (
      <MotionLink href={href}
        
          className={combinedClassName}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {innerContent}
        </MotionLink>
    )
  }

  return (
    <motion.button
      className={combinedClassName}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(props as any)}
    >
      {innerContent}
    </motion.button>
  )
}

export default Button;







