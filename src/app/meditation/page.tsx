import ServiceHero from '@/components/sections/ServiceHero';
import Meditation from '@/components/sections/Meditation';

export default function MeditationPage() {
  return (
    <>
      <ServiceHero 
        title="Meditation"
        subtitle="Find stillness and reconnect with your inner self in our serene meditation spaces."
        mediaUrl="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop"
        mediaType="image"
      />
      <Meditation />
    </>
  );
}
