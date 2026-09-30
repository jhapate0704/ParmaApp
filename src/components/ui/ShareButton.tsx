'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonProps {
  variant?: 'pill' | 'icon-only' | 'drawer' | 'floating';
  direction?: 'up' | 'down';
  className?: string;
}

export function ShareButton({
  variant = 'pill',
  direction,
  className = '',
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Default direction: 'up' for floating, 'down' for header
  const isUp = direction ? direction === 'up' : variant === 'floating';

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return 'https://parma-wellness.com';
  };

  const shareTitle = 'Parma | A Private Wellness Sanctuary';
  const shareText = 'Experience restorative retreats, Ayurvedic therapies, and luxury wellness at Parma.';

  const handleCopyLink = async () => {
    try {
      const url = getShareUrl();
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleNativeShare = async () => {
    const url = getShareUrl();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url,
        });
        return;
      } catch (err) {
        // User cancelled or fallback to dropdown
      }
    }
    setIsOpen(!isOpen);
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' — ' + getShareUrl())}`,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c.969.586 1.761.854 2.806.854 3.191 0 5.769-2.587 5.77-5.766.001-3.187-2.575-5.77-5.77-5.772zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.176L2 22l4.958-1.401C8.423 21.492 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.636 0-3.155-.494-4.431-1.341l-.317-.21-2.946.832.812-2.962-.229-.333C4.947 14.887 4.4 13.487 4.4 12c0-4.191 3.409-7.6 7.6-7.6s7.6 3.409 7.6 7.6-3.409 7.6-7.6 7.6z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(getShareUrl())}`,
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`,
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`,
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={handleNativeShare}
        aria-label="Share Parma Sanctuary"
        title="Share Parma"
        className={`group flex items-center justify-center transition-all duration-300 ${
          variant === 'floating'
            ? 'w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#0a0a0a]/90 hover:bg-black backdrop-blur-xl border border-[#C5A059]/50 hover:border-[#C5A059] text-[#C5A059] shadow-[0_8px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(197,160,89,0.25)] hover:shadow-[0_8px_30px_rgba(197,160,89,0.4)] hover:scale-110 active:scale-95'
            : variant === 'pill'
            ? 'px-3.5 py-2 rounded-full text-ivory/80 hover:text-[#C5A059] hover:bg-white/10 gap-1.5 text-xs md:text-sm tracking-[0.12em] uppercase font-medium font-body'
            : variant === 'drawer'
            ? 'w-full py-3 px-4 rounded-xl border border-white/10 hover:border-[#C5A059]/40 bg-white/5 hover:bg-[#C5A059]/10 text-ivory hover:text-[#C5A059] gap-3 text-sm tracking-wider uppercase font-body flex items-center justify-center'
            : 'w-8 h-8 rounded-full text-ivory/80 hover:text-[#C5A059] hover:bg-white/10'
        }`}
      >
        {/* Luxury Share SVG Icon */}
        <svg
          className={`transition-transform duration-300 group-hover:scale-110 ${
            variant === 'floating' ? 'w-5 h-5 text-[#C5A059]' : 'w-4 h-4'
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        {variant === 'pill' && <span>Share</span>}
        {variant === 'drawer' && <span className="font-medium">Share Sanctuary</span>}
      </button>

      {/* Share Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isUp ? 8 : -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isUp ? 8 : -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute right-0 w-72 md:w-80 rounded-2xl bg-[#0a0a0a]/95 backdrop-blur-2xl border border-[#C5A059]/40 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(197,160,89,0.25)] p-4 z-50 overflow-hidden text-left ${
              isUp ? 'bottom-full mb-3' : 'top-full mt-3'
            }`}
          >
            {/* Top gold line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-80" />

            {/* Crest & Title Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <img
                src="/parma-official-crest.png"
                alt="Parma Crest"
                className="w-8 h-10 object-contain shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-display text-sm tracking-widest text-[#C5A059] uppercase">
                  Parma Sanctuary
                </span>
                <span className="font-body text-[11px] text-ivory/60 line-clamp-1">
                  Share this private wellness haven
                </span>
              </div>
            </div>

            {/* Social Share Icons Grid */}
            <div className="grid grid-cols-4 gap-2 my-3">
              {shareLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-white/5 hover:bg-[#C5A059]/15 border border-white/5 hover:border-[#C5A059]/30 text-ivory/80 hover:text-[#C5A059] transition-all duration-300 group"
                  title={`Share on ${item.name}`}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <span className="text-[10px] tracking-wider uppercase font-body mt-1 text-ivory/60 group-hover:text-[#C5A059]">
                    {item.name.split(' ')[0]}
                  </span>
                </a>
              ))}
            </div>

            {/* Copy Link Row */}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-[#C5A059]/15 border border-white/10 hover:border-[#C5A059]/40 text-ivory text-xs font-body tracking-wider transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  {copied ? (
                    <svg
                      className="w-4 h-4 text-[#C5A059] shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-ivory/60 group-hover:text-[#C5A059] shrink-0 transition-colors"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  )}
                  <span className={copied ? 'text-[#C5A059] font-semibold' : 'text-ivory/80 group-hover:text-white'}>
                    {copied ? 'Link Copied to Clipboard!' : 'Copy Website Link'}
                  </span>
                </div>
                <span className="text-[10px] uppercase font-semibold text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded-full border border-[#C5A059]/30">
                  {copied ? 'Done' : 'Copy'}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default ShareButton;
