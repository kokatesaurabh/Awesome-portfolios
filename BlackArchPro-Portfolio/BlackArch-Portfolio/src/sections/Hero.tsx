import { motion } from 'framer-motion';
import { Terminal, Github, Linkedin, Twitter, Facebook, Instagram, ChevronDown } from 'lucide-react';
import { Globe } from '../components/Globe';

export const Hero = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/kokatesaurabh', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/saurabh-kokate-b839b921a', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/SaurabhKokate20', label: 'Twitter' },
    { icon: Facebook, href: 'https://www.facebook.com/share/A8tKsYm5D3DDvP1V', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/0day.xploit_101', label: 'Instagram' }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?q=80&w=2832&auto=format&fit=crop')] opacity-5 bg-cover bg-center" />
      
      <div className="container mx-auto px-4 h-screen flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Terminal className="w-16 h-16 text-cyan-500 mb-8 animate-float" />
            <motion.h1 
              className="text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                Saurabh Kokate
              </span>
            </motion.h1>
            <motion.div
              className="space-y-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xl text-gray-400">Cybersecurity Enthusiast & Zero-Day Explorer</p>
              <p className="text-gray-400">Specialized in advanced red teaming, AI development, and zero-day research. Currently focused on building innovative security solutions and custom exploitation frameworks.</p>
            </motion.div>
            
            <motion.div 
              className="flex gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-cyan-500 hover:text-cyan-400 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <link.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-cyan-500 text-black rounded-lg font-medium hover:bg-cyan-400 transition-colors"
              >
                View Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-cyan-500 text-cyan-500 rounded-lg font-medium hover:bg-cyan-500/10 transition-colors"
              >
                Download CV
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative h-[600px]"
          >
            <Globe />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cyan-500"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </motion.section>
  );
};