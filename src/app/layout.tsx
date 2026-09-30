import type { Metadata } from 'next';
import { Marcellus, Jost } from 'next/font/google';
import './globals.css';

const marcellus = Marcellus({
  weight: '400',
  variable: '--font-display',
  subsets: ['latin'],
});

const jost = Jost({
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Parma | A Private Wellness Sanctuary',
  description: 'A private wellness sanctuary in the Virginia countryside offering Ayurvedic treatments, spa therapies, and restorative retreats.',
};

import Header from '@/components/layout/Header';
import GlobalFooter from '@/components/layout/GlobalFooter';
import FloatingCTA from '@/components/layout/FloatingCTA';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${marcellus.variable} ${jost.variable} antialiased scroll-smooth`}>
      <body className="bg-dark text-ivory font-body min-h-screen overflow-x-clip">
        <div className="relative w-full overflow-x-clip flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>
          <GlobalFooter />
          <FloatingCTA />
        </div>
      </body>
    </html>
  );
}
