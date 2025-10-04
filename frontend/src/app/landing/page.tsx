'use client';

import AppHero from '@/components/mvpblocks/app-hero';
import AboutUs1 from '@/components/mvpblocks/about-us-1';
import Faq2 from '@/components/mvpblocks/faq-2';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <AppHero />
      <AboutUs1 />
      <Faq2 />
    </main>
  );
}