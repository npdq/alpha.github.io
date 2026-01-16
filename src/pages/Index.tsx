import { useState, useCallback } from 'react';
import StarryBackground from '@/components/StarryBackground';
import DesktopIcon from '@/components/DesktopIcon';
import XPWindow from '@/components/XPWindow';
import Taskbar from '@/components/Taskbar';
import StartMenu from '@/components/StartMenu';
import BootScreen from '@/components/BootScreen';
import BackgroundMusic from '@/components/BackgroundMusic';
import AboutWindow from '@/components/windows/AboutWindow';
import ProjectsWindow from '@/components/windows/ProjectsWindow';
import ContactWindow from '@/components/windows/ContactWindow';
import NotepadWindow from '@/components/windows/NotepadWindow';

interface WindowState {
  id: string;
  title: string;
  icon: string; // Image URL
  isOpen: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

// Icon configuration - replace these with your own image URLs
const iconConfig: Record<string, { icon: string; desktopIcon: string }> = {
  about: {
    icon: '/placeholder.svg', // Replace with your image URL
    desktopIcon: '/placeholder.svg',
  },
  projects: {
    icon: '/placeholder.svg', // Replace with your image URL
    desktopIcon: '/placeholder.svg',
  },
  contact: {
    icon: '/placeholder.svg', // Replace with your image URL
    desktopIcon: '/placeholder.svg',
  },
  notepad: {
    icon: '/placeholder.svg', // Replace with your image URL
    desktopIcon: '/placeholder.svg',
  },
};

// Background music configuration - replace with your music URL
const BACKGROUND_MUSIC_URL = ''; // Add your music URL here (e.g., 'https://example.com/music.mp3')

const Index = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'about', title: 'About Me', icon: iconConfig.about.icon, isOpen: false, zIndex: 1, position: { x: 150, y: 80 }, size: { width: 450, height: 350 } },
    { id: 'projects', title: 'My Projects', icon: iconConfig.projects.icon, isOpen: false, zIndex: 1, position: { x: 200, y: 120 }, size: { width: 500, height: 320 } },
    { id: 'contact', title: 'Contact', icon: iconConfig.contact.icon, isOpen: false, zIndex: 1, position: { x: 250, y: 100 }, size: { width: 380, height: 380 } },
    { id: 'notepad', title: 'Notepad', icon: iconConfig.notepad.icon, isOpen: false, zIndex: 1, position: { x: 300, y: 140 }, size: { width: 450, height: 350 } },
  ]);

  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [maxZIndex, setMaxZIndex] = useState(1);
  const [isStartOpen, setIsStartOpen] = useState(false);

  const openWindow = useCallback((id: string) => {
    setMaxZIndex((prev) => prev + 1);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, isOpen: true, zIndex: maxZIndex + 1 }
          : w
      )
    );
    setActiveWindow(id);
  }, [maxZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w))
    );
    if (activeWindow === id) {
      setActiveWindow(null);
    }
  }, [activeWindow]);

  const focusWindow = useCallback((id: string) => {
    setMaxZIndex((prev) => prev + 1);
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w
      )
    );
    setActiveWindow(id);
  }, [maxZIndex]);

  const openWindows = windows.filter((w) => w.isOpen);

  const renderWindowContent = (id: string) => {
    switch (id) {
      case 'about':
        return <AboutWindow />;
      case 'projects':
        return <ProjectsWindow />;
      case 'contact':
        return <ContactWindow />;
      case 'notepad':
        return <NotepadWindow />;
      default:
        return null;
    }
  };

  const desktopIcons = [
    { id: 'about', icon: iconConfig.about.desktopIcon, label: 'About Me' },
    { id: 'projects', icon: iconConfig.projects.desktopIcon, label: 'My Projects' },
    { id: 'contact', icon: iconConfig.contact.desktopIcon, label: 'Contact' },
    { id: 'notepad', icon: iconConfig.notepad.desktopIcon, label: 'Notepad' },
  ];

  // Show boot screen
  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <StarryBackground />

      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        {desktopIcons.map((desktopIcon) => (
          <DesktopIcon
            key={desktopIcon.id}
            icon={<img src={desktopIcon.icon} alt={desktopIcon.label} className="w-10 h-10 object-contain" />}
            label={desktopIcon.label}
            onClick={() => openWindow(desktopIcon.id)}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map((window) => (
        <XPWindow
          key={window.id}
          title={window.title}
          icon={<img src={window.icon} alt={window.title} className="w-4 h-4 object-contain" />}
          initialPosition={window.position}
          initialSize={window.size}
          isOpen={window.isOpen}
          onClose={() => closeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          zIndex={window.zIndex}
          isActive={activeWindow === window.id}
        >
          {renderWindowContent(window.id)}
        </XPWindow>
      ))}

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        onOpenWindow={openWindow}
      />

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows.map((w) => ({ id: w.id, title: w.title, icon: w.icon }))}
        activeWindow={activeWindow}
        onWindowClick={focusWindow}
        onStartClick={() => setIsStartOpen(!isStartOpen)}
        isStartOpen={isStartOpen}
        musicPlayer={BACKGROUND_MUSIC_URL ? <BackgroundMusic src={BACKGROUND_MUSIC_URL} /> : undefined}
      />
    </div>
  );
};

export default Index;
