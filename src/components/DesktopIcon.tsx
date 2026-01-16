import { ReactNode } from 'react';

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

const DesktopIcon = ({ icon, label, onClick }: DesktopIconProps) => {
  return (
    <div 
      className="desktop-icon" 
      onDoubleClick={onClick}
    >
      <div className="w-12 h-12 flex items-center justify-center">
        {icon}
      </div>
      <span className="desktop-icon-text">{label}</span>
    </div>
  );
};

export default DesktopIcon;
