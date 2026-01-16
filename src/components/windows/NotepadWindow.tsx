import { useState } from 'react';

const NotepadWindow = () => {
  const [text, setText] = useState(`Welcome to my personal website!
=====================================

This site is styled after Windows XP,
one of the most beloved operating systems
ever made.

Feel free to explore the desktop icons
and windows to learn more about me.

Thanks for visiting! 🎉

- Double-click icons to open windows
- Drag windows by their title bars
- Click the Start button for more options
`);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#ece9d8] border-b border-gray-400 px-2 py-1 text-xs flex gap-4">
        <span className="hover:underline cursor-pointer">File</span>
        <span className="hover:underline cursor-pointer">Edit</span>
        <span className="hover:underline cursor-pointer">Format</span>
        <span className="hover:underline cursor-pointer">View</span>
        <span className="hover:underline cursor-pointer">Help</span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 w-full p-2 font-mono text-sm resize-none focus:outline-none bg-white border-none"
        style={{ minHeight: '200px' }}
      />
    </div>
  );
};

export default NotepadWindow;
