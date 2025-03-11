import { Github, Linkedin, Twitter, Mail, FileText } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="py-10 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/10 to-black pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-purple-300">Saurabh Kokate</h3>
            <p className="text-gray-400 mt-2">Cybersecurity Enthusiast & AI Innovator</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://github.com/kokatesaurabh/kokatesaurabh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/saurabh-kokate-b839b921a" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://x.com/SaurabhKokate20" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="mailto:contact@example.com" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
            <a href="https://drive.google.com/file/d/1NZ17gYQopgoQMTNSHoJhJ5vilG8vUEwm/view" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
              <FileText className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-purple-900/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h4 className="text-purple-300 font-semibold mb-3">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#projects" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#skills" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-purple-400 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Add additional footer columns here if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
}