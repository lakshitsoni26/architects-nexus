import React, { useState, useEffect } from 'react';

interface DecryptionTextProps {
  text: string;
  className?: string;
  replay?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/[]{}|;:";

export const DecryptionText: React.FC<DecryptionTextProps> = ({
  text,
  className = "text-cyber-primary",
  replay = false
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(true);

  useEffect(() => {
    setIsScrambling(true);
    // Start with a fully scrambled string immediately to avoid flash of original text
    setDisplayText(
      text.split('').map(char => char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
    );

    let interval: ReturnType<typeof setInterval>;
    const totalDuration = 2000; // 2 seconds
    const scrambleSpeed = 50; // 50ms per tick
    const totalSteps = totalDuration / scrambleSpeed;
    let currentStep = 0;

    interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;

      // Determine how many characters from the start should be "solved"
      const revealIndex = Math.floor(progress * text.length);

      const nextText = text.split('').map((char, index) => {
        // If the character is within the revealed portion, show the real character
        if (index < revealIndex) {
          return char;
        }
        // Keep spaces as spaces for layout stability
        if (char === ' ') return ' ';

        // Otherwise return a random character
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');

      setDisplayText(nextText);

      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setDisplayText(text); // Ensure final text is perfect
        setIsScrambling(false);
      }
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [text, replay]);

  return (
    <h1
      className={`font-orbitron tracking-wider text-cyber-primary ${className}`}
      style={{
        textShadow: isScrambling
          ? '0 0 10px rgba(0, 240, 255, 0.8)'
          : '0 0 20px rgba(0, 240, 255, 0.4)'
      }}
    >
      {displayText}
    </h1>
  );
};