import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export const NeuralHUD: React.FC = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [time, setTime] = useState(new Date());
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Placeholder Audio URL - User should replace this
    const AUDIO_URL = "/background-music.mp3";

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        const timer = setInterval(() => setTime(new Date()), 100); // Faster update for ms
        window.addEventListener('mousemove', handleMouseMove);

        // Auto-play attempt
        if (audioRef.current) {
            audioRef.current.volume = 0.3; // Low volume start
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(() => {
                console.log("Autoplay blocked - waiting for user interaction");
            });
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(timer);
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
            <audio ref={audioRef} src={AUDIO_URL} loop />

            {/* Corner Brackets - Hidden on Mobile */}
            <div className="hidden md:block absolute top-24 left-8 w-32 h-32 border-l-2 border-t-2 border-cyber-primary/30 rounded-tl-3xl" />
            <div className="hidden md:block absolute top-24 right-8 w-32 h-32 border-r-2 border-t-2 border-cyber-primary/30 rounded-tr-3xl" />
            <div className="hidden md:block absolute bottom-8 left-8 w-32 h-32 border-l-2 border-b-2 border-cyber-primary/30 rounded-bl-3xl" />
            <div className="hidden md:block absolute bottom-8 right-8 w-32 h-32 border-r-2 border-b-2 border-cyber-primary/30 rounded-br-3xl" />

            {/* Top Right: System Time - Hidden on Mobile */}
            <div className="hidden md:flex absolute top-36 right-12 flex-col items-end gap-1 pointer-events-auto">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyber-primary rounded-full animate-pulse" />
                    <span className="font-mono text-xs text-cyber-primary/70">SYS.TIME</span>
                </div>
                <div className="bg-black/40 backdrop-blur-md border-r-2 border-cyber-primary/50 pr-4 py-1">
                    <span className="font-orbitron text-xl text-white tracking-widest">
                        {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        <span className="text-xs text-cyber-primary/50 ml-1">.{Math.floor(time.getMilliseconds() / 100)}</span>
                    </span>
                </div>
            </div>

            {/* Side Data Streams (Decorative - Left Side now) - Hidden on Mobile */}
            <div className="hidden md:flex absolute top-1/2 left-8 -translate-y-1/2 flex-col gap-2 items-start opacity-30 pointer-events-none">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className={`w-1 h-${Math.floor(Math.random() * 8) + 2} bg-cyber-secondary/50`} />
                        <span className="text-[8px] font-mono text-cyber-secondary">
                            {Math.random().toString(16).substring(2, 8).toUpperCase()}
                        </span>
                    </div>
                ))}
            </div>

            {/* Bottom Left: Music Player Widget - Hidden on Mobile */}
            <div className="hidden md:block absolute bottom-12 left-12 pointer-events-auto">
                <div className="flex items-end gap-4">
                    {/* Visualizer Column */}
                    <div className="flex gap-1 h-12 items-end opacity-80">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className={`w-1.5 ${isPlaying ? 'bg-cyber-primary' : 'bg-gray-800'}`}
                                animate={isPlaying ? { height: [8, Math.random() * 40 + 8, 8] } : { height: 8 }}
                                transition={{ repeat: Infinity, duration: 0.4 + Math.random() * 0.5, ease: "easeInOut" }}
                            />
                        ))}
                    </div>

                    {/* Controls Container */}
                    <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg p-3 flex flex-col gap-2 min-w-[180px] shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-1">
                            <span className="text-[10px] font-mono text-cyber-primary/70 tracking-widest">
                                {isPlaying ? "AUDIO_UPLINK_ACTIVE" : "AUDIO_OFFLINE"}
                            </span>
                            <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <button
                                onClick={togglePlay}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-cyber-primary/20 text-white hover:text-cyber-primary transition-all border border-white/5 hover:border-cyber-primary/50"
                            >
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                            </button>

                            <div className="h-8 w-[1px] bg-white/10" />

                            <button
                                onClick={toggleMute}
                                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${isMuted ? 'text-red-400 bg-red-500/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
