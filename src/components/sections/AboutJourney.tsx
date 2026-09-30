'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

const aboutImages = [
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800",
    title: "Ayurvedic Heritage",
    points: [
      "Personalized dosha balancing and dietary mapping.",
      "Herbal remedies sourced from organic farms.",
      "Traditional Panchakarma therapy."
    ]
  },
  {
    src: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=800",
    title: "Mindful Meditation",
    points: [
      "Guided sunrise sessions overlooking the Blue Ridge.",
      "Vipassana silence retreats available year-round.",
      "Expert-led Breathwork and Pranayama."
    ]
  },
  {
    src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800",
    title: "Holistic Nutrition",
    points: [
      "Farm-to-table Michelin-starred dining.",
      "Menus tailored to your exact metabolic needs.",
      "Zero processed ingredients, 100% natural."
    ]
  },
  {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    title: "Thermal Hydrotherapy",
    points: [
      "Mineral-rich natural hot springs.",
      "Cold plunge protocols for cellular regeneration.",
      "Eucalyptus steam rooms and dry saunas."
    ]
  },
  {
    src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800",
    title: "Nature Immersion",
    points: [
      "Hundreds of acres of private forest trails.",
      "Shinrin-yoku (forest bathing) guided walks.",
      "Outdoor sleeping pavilions available."
    ]
  },
  {
    src: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&q=80&w=800",
    title: "Advanced Diagnostics",
    points: [
      "State-of-the-art longevity biomarkers.",
      "Comprehensive sleep and stress tracking.",
      "Integrative medicine consultations."
    ]
  },
  {
    src: "https://images.unsplash.com/photo-1596178060671-7a80fc807561?auto=format&fit=crop&q=80&w=800",
    title: "Movement & Flow",
    points: [
      "Vinyasa and Restorative yoga studios.",
      "Suspension training and Pilates reformers.",
      "Tai Chi classes in the garden pavilion."
    ]
  },
  {
    src: "https://images.unsplash.com/photo-1520697830682-8353683fbe98?auto=format&fit=crop&q=80&w=800",
    title: "Restorative Sleep",
    points: [
      "Circadian-aligned ambient room lighting.",
      "Customized organic mattresses and linens.",
      "Sound-proofed chambers for deep rest."
    ]
  }
];

const TOTAL = aboutImages.length;

function ScatteredImage({ item, index, scrollYProgress, isNearby }: {
  item: any;
  index: number;
  scrollYProgress: any;
  isNearby: boolean;
}) {
  const start    = index / TOTAL;
  const zoomEnd  = start + 0.03;
  const driftEnd = zoomEnd + 0.04;

  const isLeft  = index % 2 === 0;
  const xOffset = isLeft ? "-25vw" : "25vw";
  const yOffset = `${-15 + (index % 3) * 10}vh`;
  const finalYDrift = index % 2 === 0 ? "-150vh" : "150vh";

  const scale   = useTransform(scrollYProgress, [start, zoomEnd], [0.1, 1]);
  const opacity = useTransform(scrollYProgress, [start, start + 0.01], [0, 1]);
  const x       = useTransform(scrollYProgress, [zoomEnd, driftEnd], ["0vw", xOffset]);
  const y       = useTransform(scrollYProgress, [zoomEnd, driftEnd, 1], ["0vh", yOffset, finalYDrift]);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        x,
        y,
        // ── FIX 1: will-change pre-promotes this div to its own GPU layer ──
        // Without this the browser creates/destroys the layer mid-animation = jank
        willChange: 'transform, opacity',
      }}
      // ── FIX 2: visibility:hidden when far away ───────────────────────────
      // Cards whose opacity is 0 still get composited by the GPU.
      // Hidden cards are skipped entirely by the compositor.
      className={`absolute flex items-center justify-center pointer-events-none ${!isNearby ? 'invisible' : ''}`}
    >
      <div className="relative flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl max-w-xl">
        <div className="w-48 h-64 md:w-64 md:h-80 shrink-0 rounded-lg overflow-hidden relative">
          {/* ── FIX 3: loading="lazy" — only decode image when card is near active ── */}
          <img
            src={item.src}
            alt={item.title}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col text-left">
          <h3 className="font-display text-2xl md:text-3xl text-[#C5A059] mb-4">{item.title}</h3>
          <ul className="space-y-3">
            {item.points.map((point: string, i: number) => (
              <li key={i} className="flex items-start font-body text-sm text-ivory/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8D3A2] mt-1.5 mr-3 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export function AboutJourney() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── FIX 4: Single master spring (already in place) ──────────────────────
  // stiffness 80 / damping 18 — slightly softer than before for smoother feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 18, mass: 0.6 });

  // ── FIX 5: Track active index to gate which cards are composited ─────────
  // Only render cards within ±1 of the currently active card as "visible".
  // Cards outside that window are marked invisible so the GPU skips them.
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const idx = Math.min(Math.floor(latest * TOTAL), TOTAL - 1);
    setActiveIndex(idx);
  });

  return (
    <section ref={containerRef} className="relative h-[800vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        <div className="absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_80%)] opacity-50 pointer-events-none" />

        {aboutImages.map((item, index) => {
          // Allow ±1 neighbour so transitions feel gapless
          const isNearby = Math.abs(index - activeIndex) <= 1;
          return (
            <ScatteredImage
              key={index}
              item={item}
              index={index}
              scrollYProgress={smoothProgress}
              isNearby={isNearby}
            />
          );
        })}

      </div>
    </section>
  );
}

export default AboutJourney;
