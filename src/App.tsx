import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { StatsMarquee } from '@/components/sections/StatsMarquee';
import { Features } from '@/components/sections/Features';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Showcase } from '@/components/sections/Showcase';
import { Testimonials } from '@/components/sections/Testimonials';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { DemoModal } from '@/components/shared/DemoModal';

export default function App() {
  const [demoOpen, setDemoOpen] = useState(false);

  const openDemo = () => setDemoOpen(true);
  const closeDemo = () => setDemoOpen(false);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar onDemoClick={openDemo} />

      <main>
        <Hero onDemoClick={openDemo} />
        <StatsMarquee />
        <Features />
        <HowItWorks />
        <Showcase />
        <Testimonials />
        <Pricing onDemoClick={openDemo} />
        <FAQ />
        <FinalCTA onDemoClick={openDemo} />
      </main>

      <Footer />

      <DemoModal open={demoOpen} onClose={closeDemo} />
    </div>
  );
}
