import { useState, useRef, useEffect, ReactNode } from 'react';

interface XPWindowProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  initialPosition: { x: number; y: number };
  initialSize?: { width: number; height: number };
  isOpen: boolean;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
  isActive: boolean;
}

const XPWindow = ({
  title,
  icon,
  children,
  initialPosition,
  initialSize = { width: 400, height: 300 },
  isOpen,
  onClose,
  onFocus,
  zIndex,
  isActive,
}: XPWindowProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<'right' | 'bottom' | 'corner' | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        
        if (isResizing === 'right' || isResizing === 'corner') {
          setSize(prev => ({
            ...prev,
            width: Math.max(200, resizeStart.width + deltaX),
          }));
        }
        if (isResizing === 'bottom' || isResizing === 'corner') {
          setSize(prev => ({
            ...prev,
            height: Math.max(150, resizeStart.height + deltaY),
          }));
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart]);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleResizeStart = (e: React.MouseEvent, direction: 'right' | 'bottom' | 'corner') => {
    e.stopPropagation();
    onFocus();
    setIsResizing(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className="xp-window fixed"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        zIndex,
      }}
      onMouseDown={onFocus}
    >
      <div
        className={`xp-title-bar ${!isActive ? 'xp-title-bar-inactive' : ''}`}
        onMouseDown={handleMouseDown}
      >
        <div className="xp-title-text">
          {icon}
          <span>{title}</span>
        </div>
        <div className="flex gap-1">
          <button className="xp-window-button xp-minimize-button">
            <span className="mb-1">_</span>
          </button>
          <button className="xp-window-button xp-maximize-button">
            <span>□</span>
          </button>
          <button className="xp-window-button xp-close-button" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>
      <div 
        className="xp-window-content overflow-auto" 
        style={{ height: size.height }}
      >
        {children}
      </div>
      
      {/* Resize handles */}
      <div 
        className="resize-handle resize-handle-right"
        onMouseDown={(e) => handleResizeStart(e, 'right')}
      />
      <div 
        className="resize-handle resize-handle-bottom"
        onMouseDown={(e) => handleResizeStart(e, 'bottom')}
      />
      <div 
        className="resize-handle resize-handle-corner"
        onMouseDown={(e) => handleResizeStart(e, 'corner')}
      />
    </div>
  );
};

export default XPWindow;
