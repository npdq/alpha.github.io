// Start menu icon configuration - replace with your own image URLs
const startMenuIcons = {
  user: '/placeholder.svg',
  about: '/placeholder.svg',
  projects: '/placeholder.svg',
  contact: '/placeholder.svg',
  notepad: '/placeholder.svg',
  allPrograms: '/placeholder.svg',
  documents: '/placeholder.svg',
  pictures: '/placeholder.svg',
  music: '/placeholder.svg',
  logoff: '/placeholder.svg',
  shutdown: '/placeholder.svg',
};

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (id: string) => void;
}

const StartMenu = ({ isOpen, onClose, onOpenWindow }: StartMenuProps) => {
  if (!isOpen) return null;

  const handleItemClick = (id: string) => {
    onOpenWindow(id);
    onClose();
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      <div 
        className="fixed bottom-[30px] left-0 z-50 w-[380px] bg-[#808080] rounded-tr-lg shadow-2xl overflow-hidden"
        style={{
          border: '2px solid #606060',
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#606060] to-[#909090] p-3 flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
            <img src={startMenuIcons.user} alt="User" className="w-10 h-10 object-contain" />
          </div>
          <span className="text-white font-bold text-lg">User</span>
        </div>

        {/* Content */}
        <div className="flex">
          {/* Left side - Programs */}
          <div className="flex-1 bg-white p-2">
            <div 
              className="flex items-center gap-2 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer"
              onClick={() => handleItemClick('about')}
            >
              <img src={startMenuIcons.about} alt="About" className="w-5 h-5 object-contain" />
              <span className="text-sm">About Me</span>
            </div>
            <div 
              className="flex items-center gap-2 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer"
              onClick={() => handleItemClick('projects')}
            >
              <img src={startMenuIcons.projects} alt="Projects" className="w-5 h-5 object-contain" />
              <span className="text-sm">My Projects</span>
            </div>
            <div 
              className="flex items-center gap-2 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer"
              onClick={() => handleItemClick('contact')}
            >
              <img src={startMenuIcons.contact} alt="Contact" className="w-5 h-5 object-contain" />
              <span className="text-sm">Contact</span>
            </div>
            <div 
              className="flex items-center gap-2 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer"
              onClick={() => handleItemClick('notepad')}
            >
              <img src={startMenuIcons.notepad} alt="Notepad" className="w-5 h-5 object-contain" />
              <span className="text-sm">Notepad</span>
            </div>
            <div className="border-t my-2" />
            <div className="flex items-center gap-2 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer text-gray-500">
              <img src={startMenuIcons.allPrograms} alt="Programs" className="w-5 h-5 object-contain" />
              <span className="text-sm">All Programs</span>
              <span className="ml-auto">▶</span>
            </div>
          </div>

          {/* Right side - Places */}
          <div className="w-[160px] bg-[#c0c0c0] p-2">
            <div className="text-[#404040] font-bold text-sm mb-2">My Places</div>
            <div 
              className="flex items-center gap-2 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer text-sm"
              onClick={() => handleItemClick('about')}
            >
              <img src={startMenuIcons.documents} alt="Documents" className="w-4 h-4 object-contain" />
              <span>My Documents</span>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer text-sm">
              <img src={startMenuIcons.pictures} alt="Pictures" className="w-4 h-4 object-contain" />
              <span>My Pictures</span>
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer text-sm">
              <img src={startMenuIcons.music} alt="Music" className="w-4 h-4 object-contain" />
              <span>My Music</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-[#707070] to-[#505050] p-2 flex justify-end gap-2">
          <button className="text-white text-xs flex items-center gap-1 hover:underline">
            <img src={startMenuIcons.logoff} alt="Log Off" className="w-4 h-4 object-contain" />
            Log Off
          </button>
          <button className="text-white text-xs flex items-center gap-1 hover:underline ml-4">
            <img src={startMenuIcons.shutdown} alt="Shutdown" className="w-4 h-4 object-contain" />
            Turn Off Computer
          </button>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
