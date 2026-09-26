import { WellnessGoal } from '@/types';

export const wellnessGoals: WellnessGoal[] = [
  {
    id: 'rest',
    label: 'REST',
    description: 'Focus on sleep, deep relaxation, and resetting your nervous system for profound physical and mental recovery.',
    journey: [
      { step: 'Arrival', description: 'Settle into your sanctuary with a calming herbal tea and digital detox.' },
      { step: 'Gentle Yoga', description: 'Restorative postures to release physical tension built up from travel.' },
      { step: 'Sheetala Treatment', description: 'Cooling therapy to calm the mind and soothe the nervous system.' },
      { step: 'Yoga Nidra', description: 'Guided yogic sleep to promote deep, conscious relaxation.' },
      { step: 'Evening Routine', description: 'Warm bath and sleep-promoting herbal infusion before resting.' }
    ]
  },
  {
    id: 'restore',
    label: 'RESTORE',
    description: 'A holistic approach to replenishing depleted energy through ancient Ayurvedic wisdom and mindful movement.',
    journey: [
      { step: 'Ayurvedic Consultation', description: 'Determine your unique mind-body constitution (dosha).' },
      { step: 'Abhyanga', description: 'Warm herbal oil massage tailored to balance your specific dosha.' },
      { step: 'Mindful Yoga', description: 'Movement practices focusing on steady, restoring energy flow.' },
      { step: 'Meditation', description: 'Cultivating inner stillness and mental clarity.' },
      { step: 'Nature Walk', description: 'Grounding connection with the Virginia countryside.' }
    ]
  },
  {
    id: 'rebalance',
    label: 'REBALANCE',
    description: 'Realign your physical, mental, and emotional states through targeted therapies and lifestyle adjustments.',
    journey: [
      { step: 'Dosha Assessment', description: 'In-depth evaluation to identify current imbalances.' },
      { step: 'Vishesh', description: 'Deep tissue therapy to stimulate circulation and clear blockages.' },
      { step: 'Pranayama', description: 'Breathwork techniques to balance the nervous system.' },
      { step: 'Dietary Consult', description: 'Personalized nutritional guidance for sustainable wellness.' },
      { step: 'Forest Bathing', description: 'Immersive nature experience to lower stress hormones.' }
    ]
  },
  {
    id: 'rejuvenate',
    label: 'REJUVENATE',
    description: 'Revitalize your body and spirit with an uplifting combination of beauty, bodywork, and sensory experiences.',
    journey: [
      { step: 'Jewel Facial', description: 'Our signature radiant skin treatment with premium botanicals.' },
      { step: 'Hammam', description: 'Purifying heat ritual to cleanse and invigorate the skin.' },
      { step: 'Swedish Massage', description: 'Flowing bodywork to improve circulation and vitality.' },
      { step: 'Aquatic Yoga', description: 'Buoyant movement in warm water to free the joints.' },
      { step: 'Farm-to-Table Dining', description: 'Nourishing, vital meals prepared with local ingredients.' }
    ]
  },
  {
    id: 'heal',
    label: 'HEAL',
    description: 'A medically supervised path combining traditional wisdom and modern integrative care for specific health concerns.',
    journey: [
      { step: 'Medical Consultation', description: 'Comprehensive review with our medical director.' },
      { step: 'Integrative Assessment', description: 'Bridging modern diagnostics with holistic insights.' },
      { step: 'Kathi Basti', description: 'Targeted therapeutic treatment for physical pain or tension.' },
      { step: 'Yoga Nidra', description: 'Deep healing rest to support the body\'s natural recovery.' },
      { step: 'Wellness Planning', description: 'Creating a sustainable strategy for ongoing health.' }
    ]
  },
  {
    id: 'reflect',
    label: 'REFLECT',
    description: 'Turn inward to find clarity, process life transitions, and cultivate a deeper understanding of self.',
    journey: [
      { step: 'Meditation Retreat', description: 'Extended periods of guided and silent practice.' },
      { step: 'Antar Mouna', description: 'Advanced practice of inner silence and witnessing thoughts.' },
      { step: 'Journaling', description: 'Structured time for personal reflection and insight capture.' },
      { step: 'Nature Walk', description: 'Walking meditation in the serene surroundings.' },
      { step: 'Contemplative Yoga', description: 'Slow, introspective physical practice.' }
    ]
  }
];
