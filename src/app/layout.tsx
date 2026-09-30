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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || 'https://parma-wellness.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Parma | A Private Wellness Sanctuary',
  description: 'A private wellness sanctuary in the Virginia countryside offering Ayurvedic treatments, spa therapies, and restorative retreats.',
  applicationName: 'Parma Sanctuary',
  keywords: ['Parma', 'Wellness Sanctuary', 'Ayurveda', 'Luxury Spa', 'Retreat', 'Virginia Countryside'],
  icons: {
    icon: [
      { url: '/icon.png' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: ['/icon.png'],
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Parma | A Private Wellness Sanctuary',
    description: 'A private wellness sanctuary in the Virginia countryside offering Ayurvedic treatments, spa therapies, and restorative retreats.',
    url: siteUrl,
    siteName: 'Parma Sanctuary',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Parma — A Private Wellness Sanctuary',
      },
      {
        url: '/parma-logo.png',
        width: 512,
        height: 512,
        alt: 'Parma Official Logo',
      },
      {
        url: '/parma-official-crest.png',
        width: 344,
        height: 656,
        alt: 'Parma Official Crest',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parma | A Private Wellness Sanctuary',
    description: 'A private wellness sanctuary in the Virginia countryside offering Ayurvedic treatments, spa therapies, and restorative retreats.',
    images: ['/og-image.png'],
  },
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
