import ServiceHero from '@/components/sections/ServiceHero';
import Spa from '@/components/sections/Spa';

export default function SpaPage() {
  return (
    <>
      {/* Parma Inn Terracotta Theme Background */}
      <div 
        className="fixed inset-0 z-[-10] w-full h-full pointer-events-none bg-service-inn" 
        aria-hidden="true"
      />
      <ServiceHero 
        title="The Spa"
        subtitle="Experience rejuvenating therapies rooted in ancient Ayurvedic wisdom and modern wellness practices."
        mediaUrl="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
        mediaType="image"
      />
      <Spa />
    </>
  );
}
