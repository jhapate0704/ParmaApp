'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function GlobalFooter() {
  const pathname = usePathname();
  
  // Hide the global footer on the reserve page because the reserve page renders its own footer inside a specific z-index wrapper
  if (pathname === '/reserve') return null;
  
  return <Footer />;
}
