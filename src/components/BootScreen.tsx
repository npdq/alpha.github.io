import { useState, useEffect } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Show logo after a brief delay
    const logoTimer = setTimeout(() => setShowLogo(true), 200);
    
    // Progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center">
      {/* Logo Area */}
      <div className={`transition-opacity duration-700 ${showLogo ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-12">
          <div className="text-5xl font-bold mb-2">
            <span className="text-[#ff6600]">ARGUE</span>
            <span className="text-[#00aa00] ml-2">OS</span>
          </div>
          <div className="text-white/60 text-sm tracking-widest">Mossad Edition</div>
        </div>
      </div>

      {/* Loading Bar */}
      <div className="w-[300px]">
        <div className="h-4 bg-[#1a1a1a] border border-[#333] rounded overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#0055cc] via-[#0077ff] to-[#0055cc] transition-all duration-200"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            {/* Animated shine effect */}
            <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 text-white/50 text-sm">
        {progress < 100 ? 'Loading israeli intelligence...' : 'Welcome!'}
      </div>

      {/* Copyright */}
      <div className="absolute bottom-8 text-white/30 text-xs">
        © argue | 762.lol
      </div>
    </div>
  );
};

export default BootScreen;
