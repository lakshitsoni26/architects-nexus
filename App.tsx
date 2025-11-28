import React, { useState, useEffect, useLayoutEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Layout/Navbar';
import { Hero } from './components/Sections/Hero';
import { BioData } from './components/Sections/BioData';
import { TechMatrix } from './components/Sections/TechMatrix';
import { MissionLog } from './components/Sections/MissionLog';
import { SupplyDepot } from './components/Sections/SupplyDepot';
import { UplinkTerminal } from './components/Sections/UplinkTerminal';
import { Footer } from './components/Layout/Footer';
import { MailButton } from './components/UI/MailButton';
import { AIChatTerminal } from './components/UI/AIChatTerminal';
import { NeuralHUD } from './components/UI/NeuralHUD';
import { InteractiveBackground } from './components/UI/InteractiveBackground';
import { BootSequence } from './components/UI/BootSequence';
import { CustomCursor } from './components/UI/CustomCursor';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // AGGRESSIVE SCROLL CONTROL
  useLayoutEffect(() => {
    // 1. Disable browser's default scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // 2. Clear any URL hash to prevent browser jumping to sections like #uplink
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // 3. Force scroll to top immediately
    window.scrollTo(0, 0);
  }, []);

  // Handle Body Scroll Locking during Boot
  useEffect(() => {
    if (isLoading) {
      // Lock scrollbar while booting
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      window.scrollTo(0, 0);
    } else {
      // Unlock scrollbar after boot
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
      // Ensure we are still at top when unlocking
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-cyber-black text-white selection:bg-cyber-primary selection:text-black">
      {/* Global Grain/Noise Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[50] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <CustomCursor />

      <AnimatePresence mode="wait">
        {isLoading && (
          <BootSequence onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Only render main content structure once boot is complete to trigger animations correctly */}
      {!isLoading && (
        <>
          <InteractiveBackground />
          <NeuralHUD />
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <BioData />
            <TechMatrix />
            <MissionLog />
            <SupplyDepot />
            <UplinkTerminal />
          </main>
          <Footer />
          <MailButton />
          <AIChatTerminal />
        </>
      )}
    </div>
  );
}

export default App;