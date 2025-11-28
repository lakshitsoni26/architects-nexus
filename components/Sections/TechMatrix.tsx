import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '../../constants';
import {
    Cpu, Code2, Globe, ShieldCheck, Database, Layers, Terminal, Server, Wifi, Box,
    FileCode, Palette, FileJson, Coffee, Binary, Brain, Puzzle, Clock, GitBranch, Github, Container
} from 'lucide-react';

const iconMap: Record<string, React.FC<any>> = {
    Cpu, Code2, Globe, ShieldCheck, Database, Layers, Terminal, Server, Wifi, Box,
    FileCode, Palette, FileJson, Coffee, Binary, Brain, Puzzle, Clock, GitBranch, Github, Container
};

export const TechMatrix: React.FC = () => {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    return (
        <section className="py-32 px-4 relative overflow-hidden min-h-[80vh] flex items-center justify-center">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyber-secondary/10 via-transparent to-transparent opacity-50" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h3 className="text-cyber-primary font-space font-bold tracking-[0.2em] text-sm mb-4">SYSTEM_CORE // MODULE_02</h3>
                    <h2 className="text-5xl md:text-7xl font-orbitron font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyber-primary to-cyber-secondary">
                        TECH_NEXUS
                    </h2>
                </motion.div>

                <div className="relative h-[600px] w-full flex items-center justify-center">
                    {/* Central Core */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyber-primary/5 rounded-full border border-cyber-primary/20 backdrop-blur-sm flex items-center justify-center z-20">
                        <AnimatePresence mode="wait">
                            {hoveredSkill ? (
                                <motion.div
                                    key="skill-info"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="text-center"
                                >
                                    <div className="text-cyber-primary font-orbitron font-bold text-lg">{hoveredSkill}</div>
                                    <div className="text-[10px] text-cyber-secondary font-space tracking-widest">DETECTED</div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="core-idle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <Cpu className="w-12 h-12 text-cyber-primary/50 animate-pulse" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Orbiting Skills */}
                    <div className="absolute inset-0">
                        {SKILLS.map((skill, idx) => {
                            const Icon = iconMap[skill.icon] || Code2;
                            // Calculate random but distributed positions
                            const angle = (idx / SKILLS.length) * 2 * Math.PI;
                            const radius = 150 + (idx % 3) * 60; // Varying orbital distances
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;

                            return (
                                <motion.div
                                    key={skill.name}
                                    className="absolute left-1/2 top-1/2"
                                    initial={{ x: 0, y: 0, opacity: 0 }}
                                    whileInView={{
                                        x: x,
                                        y: y,
                                        opacity: 1,
                                        transition: { duration: 1, delay: idx * 0.1 }
                                    }}
                                    viewport={{ once: true }}
                                >
                                    <motion.div
                                        animate={{
                                            y: [0, -10, 0],
                                            scale: [1, 1.1, 1],
                                            filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
                                        }}
                                        transition={{
                                            duration: 3 + (idx % 2),
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: idx * 0.2
                                        }}
                                        className="relative group cursor-pointer"
                                        onMouseEnter={() => setHoveredSkill(skill.name)}
                                        onMouseLeave={() => setHoveredSkill(null)}
                                    >
                                        <div className="w-16 h-16 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center group-hover:border-cyber-primary/50 group-hover:bg-cyber-primary/10 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]">
                                            <Icon className="w-8 h-8 text-gray-400 group-hover:text-cyber-primary transition-colors duration-300" />
                                        </div>

                                        {/* Connecting Line to Center (Visual only) */}
                                        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] -z-10 pointer-events-none opacity-20" style={{ transform: `translate(-50%, -50%) rotate(${angle * (180 / Math.PI) + 180}deg)` }}>
                                            <line x1="250" y1="250" x2="250" y2="250" stroke="currentColor" className="text-cyber-primary" />
                                        </svg>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};