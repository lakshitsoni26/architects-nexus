import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ArrowRight } from 'lucide-react';

export const BioData: React.FC = () => {
  return (
    <section id="bio" className="py-32 px-4 bg-black/20 backdrop-blur-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Visual Side (Left) */}
        <div className="relative group">
          {/* Decorative Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-cyber-primary/20 to-cyber-secondary/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 bg-cyber-black/50 backdrop-blur-sm shadow-2xl">
              <div className="absolute inset-0 bg-cyber-primary/10 mix-blend-overlay z-20 pointer-events-none" />
              <img
                src="/profile.jpg"
                alt="Lakshit Soni"
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-cyber-black border border-cyber-primary/30 p-4 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-3 z-30">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white font-space text-sm font-bold">Open to Work</span>
            </div>
          </motion.div>
        </div>

        {/* Content Side (Right) */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-cyber-primary font-space font-bold tracking-[0.2em] text-sm">MY BIO</h3>
              <div className="h-[1px] w-20 bg-cyber-primary/50" />
            </div>

            <h2 className="text-5xl md:text-6xl font-orbitron font-bold text-white mb-8 leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary">Me</span>
            </h2>

            <h4 className="text-2xl text-white font-space font-bold mb-6">
              Hey, I'm Lakshit.
            </h4>

            <p className="text-gray-400 font-space text-lg leading-relaxed mb-8">
              I'm a digital architect operating at the intersection of <span className="text-white font-bold">cryptography</span> and <span className="text-white font-bold">user experience</span>. My mission is to construct resilient decentralized systems that feel indistinguishable from magic.
              <br /><br />
              With expertise in EVM chains, Rust-based environments, and immersive frontend engineering, I bridge the gap between complex backend logic and fluid visual storytelling.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <a
                href="#uplink"
                className="group flex items-center gap-3 px-8 py-4 bg-cyber-primary/10 border border-cyber-primary/50 rounded-full text-cyber-primary font-orbitron font-bold tracking-wider hover:bg-cyber-primary hover:text-black transition-all duration-300"
              >
                Let's connect
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <div className="flex items-center gap-6">
                <a href="https://github.com/lakshitsoni26" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/lakshit-soni26/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-colors transform hover:scale-110 duration-300">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://x.com/Lakshit_sonii" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-300">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="mailto:lakshitsoni26@gmail.com" className="text-gray-400 hover:text-red-500 transition-colors transform hover:scale-110 duration-300">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="mt-12 flex items-center gap-3 text-cyber-secondary font-mono text-sm">
              <Mail className="w-4 h-4" />
              <span>lakshitsoni26@gmail.com</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};