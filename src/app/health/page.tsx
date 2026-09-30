import ServiceHero from '@/components/sections/ServiceHero';
import Healthcare from '@/components/sections/Healthcare';

export default function HealthcarePage() {
  return (
    <>
      <ServiceHero 
        title="Healthcare"
        subtitle="Integrative and proactive medicine led by world-class physicians."
        mediaUrl="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
        mediaType="image"
      />
      <Healthcare />
    </>
  );
}
