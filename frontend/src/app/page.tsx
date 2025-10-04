import AppHero from '@/components/mvpblocks/app-hero';
import AboutUs1 from '@/components/mvpblocks/about-us-1';
import Faq2 from '@/components/mvpblocks/faq-2';
import Navbar from '@/components/navbar';

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="scroll-smooth">
        <section id="hero" className="min-h-screen">
          <AppHero />
        </section>
        <section id="about" className="min-h-screen">
          <AboutUs1 />
        </section>
        <section id="faq" className="min-h-screen">
          <Faq2 />
        </section>
      </main>
    </>
  );
}
