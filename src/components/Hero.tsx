import { motion } from 'framer-motion';
import { Terminal, Github, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { Globe } from './Globe';

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
      className="min-h-screen bg-theme-surface relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?q=80&w=2832&auto=format&fit=crop')] opacity-5 bg-cover bg-center" />
      
      <div className="container mx-auto px-4 h-screen flex items-center relative z-10">
        <div className="grid grid-cols-12 gap-12 items-center">
          {/* Left Content - 7 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-7"
          >
            <Terminal className="w-16 h-16 text-theme-primary mb-8 animate-float" />
            <motion.h1 
              className="text-6xl font-bold mb-6 glitch-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Saurabh Kokate
              </span>
            </motion.h1>
            <motion.div
              className="space-y-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xl text-theme-secondary">Cybersecurity Enthusiast & Zero-Day Explorer</p>
              <p className="text-theme-text">Specialized in advanced red teaming, AI development, and zero-day research.</p>
            </motion.div>
            
            {/* Social Links */}
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
                  className="text-theme-primary hover:text-theme-secondary transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <link.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-theme-primary text-background rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                View Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-theme-primary text-theme-primary rounded-lg font-medium hover:bg-theme-primary/10 transition-colors"
              >
                Download CV
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Globe (5 columns) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="col-span-5 relative h-[600px]"
          >
            <Globe />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};