import { NavItem } from "@/types";

export const navigationData: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Sanctuary', href: '#worlds' },
  { 
    label: 'Experiences', 
    dropdown: [
      { label: 'Parma Inn', href: '#inn' },
      { label: 'Parma Spa', href: '#spa' },
      { label: 'Healthcare', href: '#health' },
      { label: 'Meditation', href: '#meditation' }
    ]
  },
  { label: 'Team', href: '#team' },
  { label: 'Contact Us', href: '#footer' },
];
