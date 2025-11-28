import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const bootLogs = [
      "INITIALIZING_KERNEL...",
      "LOADING_MODULES: [PHYSICS, GFX, AUDIO]...",
      "VERIFYING_INTEGRITY...",
      "ALLOCATING_VRAM...",
      "MOUNTING_FILE_SYSTEM...",
      "ESTABLISHING_SECURE_UPLINK...",
      "DECRYPTING_USER_DATA...",
      "ACCESS_GRANTED."
    ];

    let logIndex = 0;
    
    // Log interval
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs(prev => {
           // Keep only last 5 logs to prevent overflow/clutter
           const newLogs = [...prev, bootLogs[logIndex]];
           return newLogs.slice(-6);
        });
        logIndex++;
      }
    }, 250);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          setTimeout(onComplete, 500); // Short delay before unmounting
          return 100;
        }
        // Random increment for realistic "loading" feel
        return Math.min(prev + Math.random() * 15, 100);
      });
    }, 150);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono text-cyber-primary cursor-wait"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-96 max-w-[85%] space-y-6">
        {/* Terminal Window for Logs */}
        <div className="h-32 bg-gray-900/50 border border-gray-800 rounded p-4 overflow-hidden flex flex-col justify-end shadow-[0_0_20px_rgba(0,240,255,0.1)]">
          {logs.map((log, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs md:text-sm text-green-500/90 font-mono tracking-wide"
            >
              {`> ${log}`}
            </motion.div>
          ))}
          <motion.div 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-4 bg-green-500 mt-1"
          />
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
            <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden border border-gray-800">
            <motion.div 
                className="h-full bg-cyber-primary shadow-[0_0_10px_#00f0ff]"
                style={{ width: `${progress}%` }}
            />
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-bold tracking-widest">
                <span>SYSTEM_BOOT</span>
                <span>{Math.floor(progress)}%</span>
            </div>
        </div>
      </div>
    </motion.div>
  );
};