const ContactWindow = () => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <span className="text-4xl">✉️</span>
        <h2 className="font-bold text-lg text-[#003399]">Get in Touch</h2>
        <p className="text-xs text-gray-600">
          Feel free to reach out through any of these channels
        </p>
      </div>

      <div className="bg-white border border-gray-300 p-3 rounded space-y-3">
        <a 
          href="mailto:hello@example.com"
          className="flex items-center gap-3 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer"
        >
          <span className="text-xl">📧</span>
          <div>
            <div className="font-bold text-sm">Email</div>
            <div className="text-xs">hello@example.com</div>
          </div>
        </a>

        <a 
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer"
        >
          <span className="text-xl">💻</span>
          <div>
            <div className="font-bold text-sm">GitHub</div>
            <div className="text-xs">github.com/yourusername</div>
          </div>
        </a>

        <a 
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer"
        >
          <span className="text-xl">🐦</span>
          <div>
            <div className="font-bold text-sm">Twitter</div>
            <div className="text-xs">@yourusername</div>
          </div>
        </a>

        <a 
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-2 hover:bg-[#316ac5] hover:text-white rounded cursor-pointer"
        >
          <span className="text-xl">💼</span>
          <div>
            <div className="font-bold text-sm">LinkedIn</div>
            <div className="text-xs">linkedin.com/in/yourprofile</div>
          </div>
        </a>
      </div>

      <div className="flex justify-center gap-2">
        <button className="xp-button">Send Message</button>
      </div>
    </div>
  );
};

export default ContactWindow;
