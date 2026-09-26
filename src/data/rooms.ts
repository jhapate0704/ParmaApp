import { Room } from '@/types';

export const rooms: Room[] = [
  {
    id: 'tapestry-room',
    name: 'The Tapestry Room',
    subtitle: 'A classical, collected atmosphere',
    description: 'Woven textiles, warm lamplight, and a quieter corner of the house for guests who prefer a classical, collected atmosphere.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
      'https://images.unsplash.com/photo-1616486028549-342c3327d428?w=1200&q=80',
      'https://images.unsplash.com/photo-1616486701797-0f33f61038ec?w=1200&q=80'
    ],
    features: ['King bed', 'Mountain view', 'Private bath', 'Antiques', 'Writing desk']
  },
  {
    id: 'red-room',
    name: 'The Red Room',
    subtitle: 'Warm crimson tones and elegant furnishings',
    description: 'Rich fabrics and elegant furnishings in warm crimson tones create an inviting and luxurious retreat.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd0b?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80'
    ],
    features: ['King bed', 'Sitting area', 'En-suite bath', 'Premium linens', 'Garden view']
  },
  {
    id: 'panther-suite',
    name: 'The Panther Suite',
    subtitle: 'Contemporary luxury',
    description: 'The signature suite offering expansive space and contemporary luxury with panoramic views.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80'
    ],
    features: ['King bed', 'Separate living area', 'Soaking tub', 'Balcony', 'Minibar']
  },
  {
    id: 'lounge',
    name: 'The Lounge',
    subtitle: 'A shared social space',
    description: 'A shared social space with mountain views, perfect for relaxing after a day of treatments or exploring the countryside.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
      'https://images.unsplash.com/photo-1616485890737-02fb28b49cc8?w=1200&q=80',
      'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=1200&q=80'
    ],
    features: ['Mountain views', 'Fireplace', 'Library', 'Tea service', 'Comfortable seating']
  }
];
