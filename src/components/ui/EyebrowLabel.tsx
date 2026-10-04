import React from 'react'

interface EyebrowLabelProps {
  text: string
  dark?: boolean
  className?: string
}

export function EyebrowLabel({ text, dark = false, className = '' }: EyebrowLabelProps) {
  return (
    <span className={`uppercase tracking-[0.24em] text-xs font-body font-semibold drop-shadow-sm ${dark ? 'text-charcoal' : 'text-[#FFE0D2]'} ${className}`}>
      {text}
    </span>
  )
}

export default EyebrowLabel;
