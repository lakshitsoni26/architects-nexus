import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface HoloCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const HoloCard: React.FC<HoloCardProps> = ({ children, className = "", onClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-1000 ${className}`}
      onClick={onClick}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative h-full w-full bg-cyber-glass border border-white/10 rounded-xl p-6 shadow-2xl backdrop-blur-md overflow-hidden group hover:border-cyber-primary/50 transition-colors duration-300"
      >
        {/* Shine Effect */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 h-full">
            {children}
        </div>

        {/* Corner Decors */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyber-primary opacity-50" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyber-primary opacity-50" />
      </div>
    </motion.div>
  );
};