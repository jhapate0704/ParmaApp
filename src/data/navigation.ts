import { NavItem } from "@/lib/types";

export const navigationData: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Sanctuary', href: '/#worlds' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Team', href: '/#team' },
  { 
    label: 'Experiences', 
    dropdown: [
      { label: 'Parma Inn', href: '/inn' },
      { label: 'Parma Spa', href: '/spa' },
      { label: 'Healthcare', href: '/health' },
      { label: 'Meditation', href: '/meditation' }
    ]
  },
];
