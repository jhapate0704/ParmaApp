import React from 'react'
import { AnimatedReveal } from './AnimatedReveal'
import { EyebrowLabel } from './EyebrowLabel'

interface SectionHeadingProps {
  eyebrow?: string
  heading: string
  description?: string
  align?: 'left' | 'center'
  dark?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  heading,
  description,
  align = 'left',
  dark = false,
  className = ''
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'
  const headingColor = 'text-ivory'
  const descColor = 'text-ivory/85'

  return (
    <AnimatedReveal direction="up" className={`flex flex-col ${alignClass} ${className}`}>
      {eyebrow && <EyebrowLabel text={eyebrow} dark={dark} className="mb-4" />}
      
      <h2 className={`font-display text-[clamp(2rem,1.5rem+2vw,3.5rem)] leading-[1.1] ${headingColor} mb-6 drop-shadow-sm`}>
        {heading}
      </h2>
      
      {description && (
        <p className={`font-body text-lg max-w-2xl ${descColor} leading-relaxed`}>
          {description}
        </p>
      )}
    </AnimatedReveal>
  )
}

export default SectionHeading;
