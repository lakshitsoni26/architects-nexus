import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Wifi, Activity, Battery } from 'lucide-react';

const ArchitectSeal: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState("DESIGNED & ENGINEERED BY LAKSHIT SONI");
  const originalText = "DESIGNED & ENGINEERED BY LAKSHIT SONI";
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/[]{}|;:";

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isHovered) {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText(prev =>
          prev
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return originalText[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iteration >= originalText.length) {
          clearInterval(interval);
        }

        iteration += 1 / 2; // Speed of decryption
      }, 30);
    } else {
      setDisplayText(originalText);
    }

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <motion.div
      className="relative group cursor-pointer flex items-center gap-3"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Status Dot */}
      <div className="relative flex h-2 w-2">
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${isHovered ? 'bg-cyber-primary' : 'bg-gray-500'}`}
        />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${isHovered ? 'bg-cyber-primary' : 'bg-gray-600'}`} />
      </div>

      {/* Text */}
      <div className="relative overflow-hidden">
        <motion.span
          className={`font-space text-xs tracking-[0.2em] font-medium transition-colors duration-300 ${isHovered ? 'text-cyber-primary' : 'text-white/30'
            }`}
          style={{
            textShadow: isHovered ? '0 0 10px rgba(0, 240, 255, 0.5)' : 'none'
          }}
        >
          {displayText}
        </motion.span>

        {/* Scanline effect on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "linear", repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-primary/20 to-transparent w-1/2 skew-x-12"
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const SystemStatus: React.FC = () => {
  const [latency, setLatency] = useState(24);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(12, Math.min(45, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-4 text-[10px] font-mono text-gray-600 tracking-wider">
      <div className="flex items-center space-x-1">
        <Wifi className="w-3 h-3 text-cyber-primary/50" />
        <span>NET: <span className="text-cyber-primary">ONLINE</span></span>
      </div>
      <div className="flex items-center space-x-1">
        <Activity className="w-3 h-3 text-green-500/50" />
        <span>LATENCY: <span className="text-green-500">{latency}ms</span></span>
      </div>
      <div className="flex items-center space-x-1">
        <Battery className="w-3 h-3 text-yellow-500/50" />
        <span>PWR: <span className="text-yellow-500">98%</span></span>
      </div>
    </div>
  );
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-cyber-black border-t border-white/5 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-24 bg-cyber-primary/5 blur-[100px] pointer-events-none" />

      {/* Top Border Gradient */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">

          {/* Left: Copyright & Status */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <div className="text-center md:text-left">
              <h4 className="font-orbitron font-bold text-white text-lg tracking-wider mb-1">ARCHITECT'S NEXUS</h4>
              <p className="text-gray-600 font-space text-xs tracking-wide">
                © {currentYear} LAKSHIT SONI. ALL SYSTEMS OPERATIONAL.
              </p>
            </div>
            <SystemStatus />
          </div>

          {/* Center: The Architect's Seal */}
          <div className="order-first md:order-none mb-8 md:mb-0">
            <ArchitectSeal />
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center space-x-6">
            {[
              { icon: Github, href: "https://github.com/lakshitsoni26", color: "hover:text-white" },
              { icon: Twitter, href: "https://x.com/Lakshit_sonii", color: "hover:text-cyber-primary" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/lakshit-soni26/", color: "hover:text-blue-500" },
              { icon: Mail, href: "mailto:lakshitsoni26@gmail.com", color: "hover:text-cyber-accent" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-500 transition-all duration-300 hover:scale-110 ${social.color}`}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-primary/20 to-transparent" />
    </footer>
  );
};