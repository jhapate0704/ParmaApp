import ServiceHero from '@/components/sections/ServiceHero';
import ParmaInn from '@/components/sections/ParmaInn';

export default function InnPage() {
  return (
    <>
      {/* Bespoke Hearth Amber & Tuscan Sandstone Retreat Background */}
      <div 
        className="fixed inset-0 z-[-10] w-full h-full pointer-events-none bg-service-inn" 
        aria-hidden="true"
      />
      <ServiceHero 
        title="The Parma Inn"
        subtitle="A restorative retreat offering luxurious comfort, peace, and unparalleled hospitality in the Virginia countryside."
        mediaUrl="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop"
        mediaType="image"
      />
      <ParmaInn />
    </>
  );
}
