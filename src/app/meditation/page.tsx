import ServiceHero from '@/components/sections/ServiceHero';
import Meditation from '@/components/sections/Meditation';

export default function MeditationPage() {
  return (
    <>
      {/* Parma Inn Terracotta Theme Background */}
      <div 
        className="fixed inset-0 z-[-10] w-full h-full pointer-events-none bg-service-inn" 
        aria-hidden="true"
      />
      <ServiceHero 
        title="Meditation"
        subtitle="Find stillness and reconnect with your inner self in our serene meditation spaces."
        mediaUrl="/yoga-meditation-hero.jpg"
        mediaType="image"
        mediaOpacity="opacity-75"
      />
      <Meditation />
    </>
  );
}
