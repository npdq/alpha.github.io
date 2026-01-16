const AboutWindow = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-4xl shadow-lg">
          👋
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#003399]">Welcome!</h2>
          <p className="text-sm mt-1">
            I'm a developer who loves creating unique experiences on the web.
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-300 p-3 rounded">
        <h3 className="font-bold text-sm text-[#003399] border-b pb-1 mb-2">
          System Information
        </h3>
        <div className="text-xs space-y-1">
          <p><strong>Name:</strong> Your Name Here</p>
          <p><strong>Location:</strong> The Internet</p>
          <p><strong>Occupation:</strong> Web Developer</p>
          <p><strong>Interests:</strong> Coding, Design, Retro Tech</p>
        </div>
      </div>

      <div className="bg-white border border-gray-300 p-3 rounded">
        <h3 className="font-bold text-sm text-[#003399] border-b pb-1 mb-2">
          Skills & Technologies
        </h3>
        <div className="flex flex-wrap gap-1">
          {['React', 'TypeScript', 'Node.js', 'CSS', 'Git', 'Figma'].map((skill) => (
            <span 
              key={skill}
              className="bg-[#316ac5] text-white px-2 py-0.5 rounded text-xs"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="xp-button">Learn More</button>
      </div>
    </div>
  );
};

export default AboutWindow;
