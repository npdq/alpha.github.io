import { useState, useEffect } from 'react';

interface TaskbarProps {
  openWindows: { id: string; title: string; icon: string | React.ReactNode }[];
  activeWindow: string | null;
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  isStartOpen: boolean;
  musicPlayer?: React.ReactNode;
}

const Taskbar = ({ 
  openWindows, 
  activeWindow, 
  onWindowClick, 
  onStartClick,
  isStartOpen,
  musicPlayer
}: TaskbarProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="xp-taskbar fixed bottom-0 left-0 right-0 h-[30px] flex items-center justify-between">
      <div className="flex items-center h-full">
        <button 
          className={`xp-start-button h-full ${isStartOpen ? 'brightness-110' : ''}`}
          onClick={onStartClick}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="1" y="1" width="8" height="8" fill="#FF0000" rx="1"/>
            <rect x="11" y="1" width="8" height="8" fill="#00FF00" rx="1"/>
            <rect x="1" y="11" width="8" height="8" fill="#0000FF" rx="1"/>
            <rect x="11" y="11" width="8" height="8" fill="#FFFF00" rx="1"/>
          </svg>
          <span>start</span>
        </button>
        
        <div className="flex items-center h-full ml-2 gap-1">
          {openWindows.map((window) => (
            <button
              key={window.id}
              onClick={() => onWindowClick(window.id)}
              className={`h-[22px] px-2 flex items-center gap-1 text-white text-[11px] border border-transparent rounded min-w-[120px] max-w-[160px] ${
                activeWindow === window.id 
                  ? 'bg-[rgba(255,255,255,0.3)] border-[rgba(255,255,255,0.5)]' 
                  : 'bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)]'
              }`}
            >
              <span className="w-4 h-4 flex items-center justify-center shrink-0">
                {typeof window.icon === 'string' ? (
                  <img src={window.icon} alt={window.title} className="w-4 h-4 object-contain" />
                ) : (
                  window.icon
                )}
              </span>
              <span className="truncate">{window.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="system-tray h-full">
        {musicPlayer}
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        <span className="text-white text-[11px]">{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default Taskbar;
