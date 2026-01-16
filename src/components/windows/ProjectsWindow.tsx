// Project icon configuration - replace these with your own image URLs
const projectIconConfig = {
  projectAlpha: '/placeholder.svg', // Replace with your image
  portfolio: '/placeholder.svg',
  mobileApp: '/placeholder.svg',
  gameProject: '/placeholder.svg',
};

const projects = [
  {
    name: "Project Alpha",
    description: "A cool web application",
    icon: projectIconConfig.projectAlpha,
    status: "Complete"
  },
  {
    name: "Portfolio Site",
    description: "This Windows XP themed site!",
    icon: projectIconConfig.portfolio,
    status: "In Progress"
  },
  {
    name: "Mobile App",
    description: "Cross-platform mobile experience",
    icon: projectIconConfig.mobileApp,
    status: "Planning"
  },
  {
    name: "Game Project",
    description: "Retro-style indie game",
    icon: projectIconConfig.gameProject,
    status: "On Hold"
  }
];

const ProjectsWindow = () => {
  return (
    <div className="space-y-3">
      <div className="bg-white border border-gray-300 rounded">
        <div className="bg-gradient-to-r from-[#f0f0f0] to-[#e0e0e0] px-2 py-1 border-b text-xs flex">
          <span className="flex-1">Name</span>
          <span className="w-32">Description</span>
          <span className="w-20">Status</span>
        </div>
        
        {projects.map((project, index) => (
          <div 
            key={project.name}
            className={`px-2 py-2 flex items-center text-xs cursor-pointer hover:bg-[#316ac5] hover:text-white ${
              index % 2 === 0 ? 'bg-white' : 'bg-[#f5f5f5]'
            }`}
          >
            <span className="flex-1 flex items-center gap-2">
              <img 
                src={project.icon} 
                alt={project.name} 
                className="w-5 h-5 object-contain"
              />
              {project.name}
            </span>
            <span className="w-32 truncate">{project.description}</span>
            <span className="w-20">{project.status}</span>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-600">
        {projects.length} item(s)
      </div>

      <div className="flex gap-2 justify-end">
        <button className="xp-button">Open</button>
        <button className="xp-button">View on GitHub</button>
      </div>
    </div>
  );
};

export default ProjectsWindow;
