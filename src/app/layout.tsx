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
  title: 'Parma in Little Washington | A Private Wellness Sanctuary',
  description: 'A private wellness sanctuary in the Virginia countryside offering Ayurvedic treatments, spa therapies, and restorative retreats.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${marcellus.variable} ${jost.variable} antialiased scroll-smooth`}>
      <body className="bg-ivory text-charcoal font-body min-h-screen">
        {children}
      </body>
    </html>
  );
}
