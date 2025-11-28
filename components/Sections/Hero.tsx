import React from 'react';
import { motion } from 'framer-motion';
import { DecryptionText } from '../UI/DecryptionText';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const [replayAnimation, setReplayAnimation] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        // Trigger replay when back at top
        setReplayAnimation(prev => !prev);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-transparent">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyber-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyber-secondary/20 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-4">

        <div className="relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-cyber-primary tracking-[0.3em] text-sm md:text-base font-space font-bold uppercase mb-8">
              System Online // Architect's Nexus
            </h2>
          </motion.div>

          {/* Decryption Text Animation - Glowing Cyan */}
          <div className="mb-8 relative">
            {/* Text Glow Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyber-primary/20 blur-[60px] rounded-full pointer-events-none" />

            <DecryptionText
              text="LAKSHIT SONI"
              className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 to-cyber-primary drop-shadow-[0_0_25px_rgba(0,255,255,0.4)]"
              replay={replayAnimation}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-2xl mx-auto mb-12 w-full"
          >
            <p className="text-gray-300 font-space text-lg md:text-xl leading-relaxed text-center">
              Decentralized Systems Architect building the backbone of the <span className="text-white font-bold">New Web</span>.
              Specializing in High-Fidelity Infrastructure & Smart Contract Security.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col md:flex-row justify-center gap-6 w-full md:w-auto"
          >
            <a href="#uplink" className="px-8 py-4 bg-cyber-primary text-cyber-black font-orbitron font-bold text-sm tracking-wider hover:bg-cyan-300 transition-colors clip-path-polygon w-full md:w-auto shadow-[0_0_20px_rgba(0,255,255,0.3)]">
              INITIATE PROTOCOL
            </a>
            <a href="#projects" className="px-8 py-4 border border-white/20 text-white font-orbitron font-bold text-sm tracking-wider hover:border-cyber-primary hover:text-cyber-primary transition-colors bg-transparent w-full md:w-auto">
              ACCESS ARSENAL
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};
