import './globals.css';
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SkipLink from '@/components/SkipLink';
import CookieConsent from '@/components/CookieConsent';

export const metadata = {
  title: 'The Green Finance Project',
  description: 'Financing sustainable initiatives with measurable impact.',
  metadataBase: new URL(process.env.SITE_URL || 'https://tgf.example.org'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SkipLink />
        <Navbar />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}

