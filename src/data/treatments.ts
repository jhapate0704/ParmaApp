import { TreatmentCategory } from '@/types';

export const treatmentCategories: TreatmentCategory[] = [
  {
    id: 'ayurvedic',
    label: 'Ayurvedic',
    image: 'https://images.unsplash.com/photo-1600334089648-524e77218684?w=1200&q=80&auto=format&fit=crop',
    treatments: [
      {
        id: 'abhyanga',
        name: 'Abhyanga',
        duration: '1hr 20min',
        description: 'A traditional synchronized full-body massage using warm herbal oils to balance the doshas, improve circulation, and promote deep relaxation.',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80&auto=format&fit=crop',
        category: 'ayurvedic'
      },
      {
        id: 'kathi-basti',
        name: 'Kathi Basti',
        duration: '1hr 20min',
        description: 'A specialized treatment for lower back pain where warm medicated oil is pooled in a dough ring on the back.',
        image: 'https://images.unsplash.com/photo-1519823551278-120fb36fecdc?w=1200&q=80&auto=format&fit=crop',
        category: 'ayurvedic'
      },
      {
        id: 'oshadhi-wrap',
        name: 'Oshadhi / Oshadi Wrap',
        duration: '1hr 20min/30min',
        description: 'A therapeutic body wrap using specific healing herbs designed to detoxify and rejuvenate the skin and deeper tissues.',
        image: 'https://images.unsplash.com/photo-1560523423-48866164d60d?w=1200&q=80&auto=format&fit=crop',
        category: 'ayurvedic'
      },
      {
        id: 'vishesh',
        name: 'Vishesh / Vishesh Scrub',
        duration: '1hr 20min/30min',
        description: 'A deep tissue Ayurvedic massage followed by an invigorating scrub to stimulate the lymphatic system and remove toxins.',
        image: 'https://images.unsplash.com/photo-1506126613632-4e0c54157140?w=1200&q=80&auto=format&fit=crop',
        category: 'ayurvedic'
      },
      {
        id: 'mardanam',
        name: 'Mardanam',
        duration: '1hr 20min',
        description: 'A vigorous deep tissue massage without oil, using pressure points to relieve muscle tension and improve flexibility.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&auto=format&fit=crop',
        category: 'ayurvedic'
      },
      {
        id: 'sheetala',
        name: 'Sheetala',
        duration: '50min',
        description: 'A cooling treatment specifically designed to calm the Pitta dosha and soothe the nervous system.',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80&auto=format&fit=crop',
        category: 'ayurvedic'
      }
    ]
  },
  {
    id: 'heat',
    label: 'Heat',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80&auto=format&fit=crop',
    treatments: [
      {
        id: 'hammam',
        name: 'Hammam',
        duration: '30min',
        description: 'Traditional Middle Eastern cleansing ritual in a heated marble room, purifying the body and spirit.',
        image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=1200&q=80&auto=format&fit=crop',
        category: 'heat'
      },
      {
        id: 'kuti-swedhana',
        name: 'Kuti Swedhana',
        duration: '30min',
        description: 'Ayurvedic herbal steam therapy that opens pores and removes toxins while maintaining a cool head.',
        image: 'https://images.unsplash.com/photo-1519823551278-120fb36fecdc?w=1200&q=80&auto=format&fit=crop',
        category: 'heat'
      },
      {
        id: 'calming-radiance',
        name: 'Calming Radiance',
        duration: '2hr 20min',
        description: 'A comprehensive heat and relaxation journey designed to bring inner peace and outward glow.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80&auto=format&fit=crop',
        category: 'heat'
      }
    ]
  },
  {
    id: 'traditional',
    label: 'Traditional',
    image: 'https://images.unsplash.com/photo-1519823551278-120fb36fecdc?w=1200&q=80&auto=format&fit=crop',
    treatments: [
      {
        id: 'royal-thai',
        name: 'Royal Thai Massage',
        duration: '1hr 20-50min',
        description: 'An ancient healing system combining acupressure, Indian Ayurvedic principles, and assisted yoga postures.',
        image: 'https://images.unsplash.com/photo-1560523423-48866164d60d?w=1200&q=80&auto=format&fit=crop',
        category: 'traditional'
      },
      {
        id: 'tok-sen',
        name: 'Traditional Thai / Lanna Tok Sen',
        duration: '1hr 20-50min',
        description: 'An ancient northern Thai massage using a wooden mallet and wedge to clear energy blockages.',
        image: 'https://images.unsplash.com/photo-1506126613632-4e0c54157140?w=1200&q=80&auto=format&fit=crop',
        category: 'traditional'
      },
      {
        id: 'swedish',
        name: 'Swedish & Lymphatic Drainage',
        duration: '1hr 20min/2hr',
        description: 'Gentle, flowing massage techniques combined with precise strokes to stimulate the lymphatic system.',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80&auto=format&fit=crop',
        category: 'traditional'
      },
      {
        id: 'aromatherapy',
        name: 'Aromatherapy & Reflexology',
        duration: '1hr 20min',
        description: 'Custom-blended essential oils combined with targeted pressure on foot reflexes to balance the entire body.',
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71c9?w=1200&q=80&auto=format&fit=crop',
        category: 'traditional'
      },
      {
        id: 'lanna-ceremony',
        name: 'Lanna/Indian Ceremony',
        duration: '3hr 20min',
        description: 'A luxurious half-day ritual combining the best of Northern Thai and traditional Indian healing practices.',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80&auto=format&fit=crop',
        category: 'traditional'
      }
    ]
  },
  {
    id: 'aqua',
    label: 'Aqua',
    image: 'https://images.unsplash.com/photo-1560523423-48866164d60d?w=1200&q=80&auto=format&fit=crop',
    treatments: [
      {
        id: 'vichy-shower',
        name: 'Vichy Shower',
        duration: '45min',
        description: 'A warm cascade of water from multiple shower heads while lying down, often combined with body scrubs.',
        image: 'https://images.unsplash.com/photo-1600334089648-524e77218684?w=1200&q=80&auto=format&fit=crop',
        category: 'aqua'
      },
      {
        id: 'hydrotherapy',
        name: 'Hydrotherapy',
        duration: '30min',
        description: 'Therapeutic use of water temperatures and pressures to relieve pain and promote physical well-being.',
        image: 'https://images.unsplash.com/photo-1537672238479-7f394af1e67f?w=1200&q=80&auto=format&fit=crop',
        category: 'aqua'
      },
      {
        id: 'aquatic-yoga',
        name: 'Aquatic Yoga',
        duration: '60min',
        description: 'Gentle yoga postures performed in warm water, offering joint relief and deeper stretching capabilities.',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80&auto=format&fit=crop',
        category: 'aqua'
      }
    ]
  },
  {
    id: 'yoga',
    label: 'Yoga',
    image: 'https://images.unsplash.com/photo-1506126613632-4e0c54157140?w=1200&q=80&auto=format&fit=crop',
    treatments: [
      {
        id: 'general-yoga',
        name: 'General / Dynamic / Advanced',
        duration: '90min',
        description: 'Tailored yoga sessions ranging from foundational alignment to dynamic vinyasa flow or advanced asana practice.',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80&auto=format&fit=crop',
        category: 'yoga'
      },
      {
        id: 'surya-namaskar',
        name: 'Surya Namaskar',
        duration: '90min',
        description: 'A focused practice on Sun Salutations to build heat, strength, and cardiovascular health.',
        image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=1200&q=80&auto=format&fit=crop',
        category: 'yoga'
      },
      {
        id: 'gentle-yoga',
        name: 'Gentle / Relaxation / Pranayama',
        duration: '60min',
        description: 'Restorative postures and breathwork designed to calm the nervous system and reduce stress.',
        image: 'https://images.unsplash.com/photo-1519823551278-120fb36fecdc?w=1200&q=80&auto=format&fit=crop',
        category: 'yoga'
      },
      {
        id: 'meditation',
        name: 'Meditation',
        duration: 'By arrangement',
        description: 'Guided practices to cultivate mindfulness, emotional balance, and spiritual insight.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80&auto=format&fit=crop',
        category: 'yoga'
      }
    ]
  },
  {
    id: 'beauty',
    label: 'Beauty',
    image: 'https://images.unsplash.com/photo-1560523423-48866164d60d?w=1200&q=80&auto=format&fit=crop',
    treatments: [
      {
        id: 'jewel-facial',
        name: 'Jewel Facial',
        duration: 'Signature',
        description: 'Our signature radiant facial using premium botanicals and precious minerals for an unparalleled glow.',
        image: 'https://images.unsplash.com/photo-1506126613632-4e0c54157140?w=1200&q=80&auto=format&fit=crop',
        category: 'beauty'
      },
      {
        id: 'custom-facial',
        name: 'Fire and Ice / Vitamin C / Acne',
        duration: 'Custom',
        description: 'Targeted facial treatments addressing specific skin concerns with clinical-grade active ingredients.',
        image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80&auto=format&fit=crop',
        category: 'beauty'
      },
      {
        id: 'specialty-facial',
        name: 'Epicurean / Men\'s / Teen',
        duration: 'Custom',
        description: 'Specialized skincare protocols designed for unique skin types and hormonal phases.',
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71c9?w=1200&q=80&auto=format&fit=crop',
        category: 'beauty'
      },
      {
        id: 'peels',
        name: 'Peels / Obagi / Forest Essentials',
        duration: 'Series',
        description: 'Advanced resurfacing treatments to improve texture, tone, and overall skin health.',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80&auto=format&fit=crop',
        category: 'beauty'
      },
      {
        id: 'injectables',
        name: 'Botox / Dysport / Restylane / Juvederm',
        duration: 'Physician',
        description: 'Medical aesthetic treatments administered exclusively by our experienced physician staff.',
        image: 'https://images.unsplash.com/photo-1600334089648-524e77218684?w=1200&q=80&auto=format&fit=crop',
        category: 'beauty'
      }
    ]
  }
];
