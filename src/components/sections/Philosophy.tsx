'use client';

import { AnimatedReveal, EyebrowLabel } from '@/components/ui';

export function Philosophy() {
  return (
    <section className="py-24 lg:py-40 px-6 lg:px-16 bg-stone text-center flex flex-col items-center justify-center">
      <AnimatedReveal>
        <EyebrowLabel text="The Parma Philosophy" />
      </AnimatedReveal>
      
      <AnimatedReveal delay={0.2}>
        <blockquote className="mt-8 font-display text-3xl lg:text-5xl max-w-4xl mx-auto leading-tight text-charcoal">
          "Wellness is not something you add to life. It is how you choose to live it."
        </blockquote>
      </AnimatedReveal>
    </section>
  );
}

export default Philosophy;

