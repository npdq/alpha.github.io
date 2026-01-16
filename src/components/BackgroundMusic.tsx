import { useState, useRef, useEffect } from 'react';

interface BackgroundMusicProps {
  src: https://files.catbox.moe/3ojecp.mp4; // URL to the music file
  autoPlay?: boolean;
}

const BackgroundMusic = ({ src, autoPlay = false }: BackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          console.log('Autoplay blocked - user interaction required');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      
      {/* Music control in system tray area */}
      <div 
        className="relative"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <button
          onClick={togglePlay}
          className="text-white/80 hover:text-white text-sm flex items-center gap-1 px-1"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? '🔊' : '🔇'}
        </button>

        {/* Volume popup */}
        {showControls && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#d4d0c8] border border-gray-500 rounded p-2 shadow-lg">
            <div className="flex flex-col items-center gap-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-2 accent-[#316ac5]"
                style={{ writingMode: 'horizontal-tb' }}
              />
              <span className="text-xs text-gray-700">{Math.round(volume * 100)}%</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BackgroundMusic;
