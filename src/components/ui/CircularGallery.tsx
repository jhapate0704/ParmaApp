"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

/**
 * Circular Gallery
 *
 * A relaxing 3D ring of images: many small cards are laid out around a giant
 * tilted circle, the whole ring drifts with a gentle auto-rotation you can
 * grab and spin, and the cursor parallaxes the tilt. Hovering or tapping a card
 * lifts it and mirrors it in a large centre preview.
 */

export interface CircularGalleryProps {
  /** Image URLs, cycled around the ring. When omitted, neutral placeholder cards are shown. */
  images?: string[];
  /** Number of cards in the ring. Defaults to 50. */
  count?: number;
  /** Base tilt of the ring in degrees (rotateX). Defaults to 55. */
  tilt?: number;
  /** Ring radius in px (card distance from centre). Defaults to 400. */
  radius?: number;
  /** Card width in px. Defaults to 45. */
  itemWidth?: number;
  /** Card height in px. Defaults to 60. */
  itemHeight?: number;
  /** Slowly spin the ring on its own. Defaults to true. */
  autoRotate?: boolean;
  /** Auto-rotation speed in degrees per second. Defaults to 3. */
  autoRotateSpeed?: number;
  /** Show the large centre preview that follows the hovered/tapped card. Defaults to true. */
  showPreview?: boolean;
  /** Parallax the ring's tilt toward the cursor. Defaults to true. */
  parallax?: boolean;
  /** Content to display in the center when no preview is shown. */
  centerContent?: React.ReactNode;
  /** Extra classes for the root element. */
  className?: string;
}

export function CircularGallery({
  images,
  count = 50,
  tilt = 55,
  radius = 400,
  itemWidth = 45,
  itemHeight = 60,
  autoRotate = true,
  autoRotateSpeed = 3,
  showPreview = true,
  parallax = true,
  centerContent,
  className,
}: CircularGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);
  const previewWrapRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);

  const srcOf = (i: number) =>
    images && images.length > 0 ? images[i % images.length] : undefined;
  const defaultPreview = srcOf(0);

  // Live-tunable knobs read inside the ticker/handlers without rebuilding.
  const optsRef = useRef({ autoRotate, autoRotateSpeed, parallax, tilt });
  useEffect(() => {
    optsRef.current = { autoRotate, autoRotateSpeed, parallax, tilt };
  }, [autoRotate, autoRotateSpeed, parallax, tilt]);

  // Reveal the centre preview with the hovered or tapped card's image
  const showPreviewImage = (src?: string) => {
    const img = previewRef.current;
    const wrap = previewWrapRef.current;
    if (!img || !wrap || !src) return;
    if (!img.src.endsWith(src)) img.src = src;
    wrap.style.pointerEvents = "auto";
    gsap.to(wrap, { opacity: 1, duration: 0.2, ease: "power2.out", overwrite: true });
    if (centerContentRef.current) {
      gsap.to(centerContentRef.current, { opacity: 0, duration: 0.15, ease: "power2.out", overwrite: true });
    }
  };

  // Hide the preview and restore center text
  const hidePreviewImage = () => {
    const wrap = previewWrapRef.current;
    if (!wrap) return;
    wrap.style.pointerEvents = "none";
    gsap.to(wrap, { opacity: 0, duration: 0.25, ease: "power1.out", overwrite: true });
    if (centerContentRef.current) {
      gsap.to(centerContentRef.current, { opacity: 1, duration: 0.25, ease: "power1.out", overwrite: true });
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    const gallery = galleryRef.current;
    if (!root || !gallery) return;

    const items = gsap.utils.toArray<HTMLElement>(gallery.querySelectorAll("[data-ring-item]"));
    if (items.length === 0) return;

    const angleIncrement = 360 / items.length;
    const baseAngles = items.map((_, i) => i * angleIncrement - 90);

    // Seat each card on the ring
    items.forEach((item, i) => {
      gsap.set(item, {
        rotationY: 50,
        rotationZ: baseAngles[i],
        transformOrigin: `50% ${radius}px`,
      });
    });
    gsap.set(gallery, { rotationY: 0 });

    const fitRing = () => {
      const { width, height } = root.getBoundingClientRect();
      if (!width || !height) return;
      const scale = Math.min(1, (width - 48) / (radius * 2.2), (height - 48) / (radius * 1.7));
      gsap.set(gallery, { scale: Math.max(0.1, scale) });
    };
    const resizeObserver = new ResizeObserver(fitRing);
    resizeObserver.observe(root);
    fitRing();

    if (previewWrapRef.current) {
      gsap.set(previewWrapRef.current, { opacity: 0 });
      previewWrapRef.current.style.pointerEvents = "none";
    }

    const setZ = items.map((item) => gsap.quickSetter(item, "rotationZ", "deg"));

    gsap.fromTo(
      gallery,
      { rotationX: optsRef.current.tilt + 16, opacity: 0 },
      { rotationX: optsRef.current.tilt, opacity: 1, duration: 1.4, ease: "power3.out" },
    );
    gsap.from(items, {
      opacity: 0,
      duration: 0.7,
      ease: "power1.out",
      stagger: { amount: 1, from: "random" },
    });

    // ── Rotation: eased current chasing a target, nudged by auto-spin + drag ──
    let current = 0;
    let target = 0;
    let isInViewport = true;
    let isPageVisible = !document.hidden;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reducedMotionQuery.matches;

    let dragging = false;
    let isActivelyDragging = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;

    const tick = () => {
      if (!isInViewport || !isPageVisible) return;
      const { autoRotate: auto, autoRotateSpeed: speed } = optsRef.current;
      if (auto && !reducedMotion && !dragging) target += (speed / 60) * gsap.ticker.deltaRatio();
      current += (target - current) * 0.05;
      for (let i = 0; i < setZ.length; i++) setZ[i](baseAngles[i] + current);
    };
    gsap.ticker.add(tick);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry.isIntersecting;
      },
      { rootMargin: "160px" },
    );
    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
    };
    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
    };
    visibilityObserver.observe(root);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotionQuery.addEventListener("change", onReducedMotionChange);

    // ── Drag / Tap Handlers (Mobile-friendly: distinguishes taps from drags) ──
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      isActivelyDragging = false;
      startX = e.clientX;
      startY = e.clientY;
      lastX = e.clientX;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (optsRef.current.parallax) {
        const rect = root.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(gallery, {
          rotationX: optsRef.current.tilt + py * 3,
          rotationY: px * 3,
          duration: 1.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (dragging) {
        const deltaX = Math.abs(e.clientX - startX);
        const deltaY = Math.abs(e.clientY - startY);
        // Only treat as drag when movement exceeds threshold
        if (deltaX > 6 || deltaY > 6) {
          if (!isActivelyDragging) {
            isActivelyDragging = true;
            try {
              root.setPointerCapture?.(e.pointerId);
            } catch {}
            root.style.cursor = "grabbing";
          }
        }
        if (isActivelyDragging) {
          target += (e.clientX - lastX) * 0.3;
          lastX = e.clientX;
        }
      }
    };

    const endDrag = (e: PointerEvent) => {
      if (isActivelyDragging) {
        try {
          root.releasePointerCapture?.(e.pointerId);
        } catch {}
      } else if (dragging) {
        // It was a TAP (< 6px movement)
        const targetEl = document.elementFromPoint(e.clientX, e.clientY);
        const ringCard = targetEl?.closest("[data-ring-src]");
        if (ringCard) {
          const src = ringCard.getAttribute("data-ring-src");
          if (src) {
            showPreviewImage(src);
          }
        }
      }
      dragging = false;
      isActivelyDragging = false;
      root.style.cursor = "grab";
    };

    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", endDrag);
    root.addEventListener("pointerleave", endDrag);

    return () => {
      gsap.ticker.remove(tick);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotionQuery.removeEventListener("change", onReducedMotionChange);
      root.removeEventListener("pointerdown", onPointerDown);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerup", endDrag);
      root.removeEventListener("pointerleave", endDrag);
      gsap.killTweensOf(gallery);
    };
  }, [count, radius, images]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative h-full w-full touch-none select-none overflow-hidden [perspective:1500px]",
        "bg-transparent",
        className,
      )}
      style={{ cursor: "grab" }}
    >
      {/* Center Content (Title/Text) */}
      {centerContent && (
        <div 
          ref={centerContentRef} 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none w-full flex flex-col items-center justify-center px-4"
        >
          {centerContent}
        </div>
      )}

      {/* Centre preview — shows on hover AND tap */}
      {showPreview && defaultPreview ? (
        <div
          ref={previewWrapRef}
          onClick={hidePreviewImage}
          className="absolute left-1/2 top-1/2 z-30 h-[240px] w-[88vw] sm:h-[280px] sm:w-[380px] md:h-[320px] md:w-[480px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl opacity-0 shadow-[0_0_50px_rgba(197,160,89,0.35),0_20px_50px_rgba(0,0,0,0.9)] border border-[#C5A059]/40 cursor-pointer pointer-events-none transition-transform duration-300 hover:scale-[1.02]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={previewRef} src={defaultPreview} alt="" className="h-full w-full object-cover" />
          
          {/* Soft gradient vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Close hint button on mobile/touch */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-[#C5A059]/40 text-[10px] uppercase tracking-widest text-[#C5A059] font-body pointer-events-none">
            <span>Tap to close</span>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      ) : null}

      {/* The ring */}
      <div
        ref={galleryRef}
        className="absolute left-1/2 top-[14%] z-10 -translate-x-1/2 [transform-style:preserve-3d]"
      >
        {Array.from({ length: count }).map((_, i) => {
          const src = srcOf(i);
          return (
            <div
              key={i}
              data-ring-item
              data-ring-src={src}
              onClick={(e) => {
                e.stopPropagation();
                if (src) showPreviewImage(src);
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[3px] bg-neutral-900 shadow-md shadow-black/20 ring-1 ring-white/20 [transform-style:preserve-3d] cursor-pointer group"
              style={{ width: itemWidth, height: itemHeight, margin: 10, willChange: 'transform' }}
            >
              {/* Invisible touch-target expander for mobile tapping */}
              <div className="absolute -inset-3 z-10 pointer-events-auto" />

              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt=""
                  onMouseEnter={() => showPreviewImage(src)}
                  onMouseLeave={hidePreviewImage}
                  onClick={(e) => {
                    e.stopPropagation();
                    showPreviewImage(src);
                  }}
                  className="h-full w-full object-cover rounded-[3px] transition-[transform,filter] duration-300 hover:scale-110 hover:brightness-110 active:scale-95"
                />
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Edge vignette so the ring fades softly at the periphery */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_45%,transparent_40%,rgba(5,5,5,0.85))]"
      />
    </div>
  );
}

export default CircularGallery;
