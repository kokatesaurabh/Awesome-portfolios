import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

export const Projects = () => {
  const projects = [
    {
      title: "MAK-75-Framework",
      description: "Advanced keylogger framework with real-time monitoring across multiple platforms.",
      tags: ["Python", "C++", "Networking"],
      github: "https://github.com/kokatesaurabh/MAK-75-Framework"
    },
    {
      title: "Cyber-Jarvis",
      description: "AI-based system providing real-time support for hackers, built from scratch.",
      tags: ["AI", "Python", "Machine Learning"],
      github: "https://github.com/kokatesaurabh/Cyber-Jarvis"
    },
    {
      title: "VulnHawk",
      description: "Advanced vulnerability scanner and exploitation tool with automated analysis.",
      tags: ["Security", "Python", "Automation"],
      github: "https://github.com/kokatesaurabh/VulnHawk-The-Ultimate-Static-Analysis-Framework.git"
    }
  ];

  return (
    <section className="py-20 bg-black/95 relative">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            Featured Projects
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-900/50 rounded-lg p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all group"
            >
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-cyan-500/10 text-cyan-500 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-500 hover:text-cyan-400 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <ExternalLink className="w-6 h-6 text-cyan-500 hover:text-cyan-400 transition-colors cursor-pointer" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};