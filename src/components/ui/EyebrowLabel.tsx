import React from 'react'

interface EyebrowLabelProps {
  text: string
  dark?: boolean
  className?: string
}

export function EyebrowLabel({ text, dark = false, className = '' }: EyebrowLabelProps) {
  const colorClass = dark ? 'text-sage-light' : 'text-sage'
  
  return (
    <span className={`uppercase tracking-[0.2em] text-xs font-body font-semibold ${colorClass} ${className}`}>
      {text}
    </span>
  )
}

export default EyebrowLabel;
