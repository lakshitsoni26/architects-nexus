import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/10 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src="/nexus-logo.svg" alt="Nexus Logo" className="w-8 h-8" />
                    <span className="text-white font-orbitron font-bold tracking-widest text-lg">NEXUS</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {['Bio', 'Projects', 'Arsenal', 'Uplink'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-gray-400 hover:text-cyber-primary font-space text-sm tracking-wider uppercase transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Resume Button */}
                <div className="hidden md:block">
                    <a
                        href="/Lakshit_Soni_CV.txt"
                        download="Lakshit_Soni_CV.txt"
                        className="flex items-center gap-2 px-4 py-2 border border-cyber-secondary text-cyber-secondary hover:bg-cyber-secondary hover:text-white transition-all font-mono text-xs rounded"
                    >
                        <Download className="w-4 h-4" /> HARD_COPY
                    </a>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:hidden bg-cyber-black border-b border-white/10"
                >
                    <div className="flex flex-col p-6 space-y-4">
                        {['Bio', 'Projects', 'Arsenal', 'Uplink'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                                className="text-white font-orbitron text-xl"
                            >
                                {item}
                            </a>
                        ))}
                        <button className="flex items-center gap-2 text-cyber-secondary mt-4">
                            <Download className="w-4 h-4" /> Download Resume
                        </button>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};