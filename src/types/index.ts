export interface Room {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  gallery: string[];
  features: string[];
}

export type TreatmentCategoryType = 'ayurvedic' | 'heat' | 'traditional' | 'aqua' | 'yoga' | 'beauty';

export interface Treatment {
  id: string;
  name: string;
  duration: string;
  description: string;
  image: string;
  category: TreatmentCategoryType;
}

export interface TreatmentCategory {
  id: string;
  label: string;
  image: string;
  treatments: Treatment[];
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty?: string;
  bio?: string;
  image: string;
  isLead?: boolean;
}

export interface JourneyStep {
  step: string;
  description: string;
}

export interface WellnessGoal {
  id: string;
  label: string;
  description: string;
  journey: JourneyStep[];
}

export interface NavItem {
  label: string;
  href?: string;
  isCtA?: boolean;
  dropdown?: { label: string; href: string; }[];
}

export interface ReservationData {
  experience: string;
  checkIn: string;
  checkOut: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  guests: number;
}
