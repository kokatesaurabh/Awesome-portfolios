import { motion } from 'framer-motion';
import { Code2, Brain, Cpu } from 'lucide-react';
import { Neofetch } from '../components/Neofetch';
import { BinaryFigure } from '../components/BinaryFigure';

export const About = () => {
  const neofetchInfo = {
    'OS': 'BlackArch Linux',
    'Host': 'Cybersecurity Expert',
    'Kernel': 'Advanced Red Teaming',
    'Uptime': '5+ years in security',
    'Packages': ['Python', 'C++', 'JavaScript'],
    'Shell': 'Zero-Day Research',
    'Resolution': 'High-Impact Solutions',
    'DE': 'Custom Exploitation',
    'WM': 'AI Development',
    'Terminal': 'Security Innovation'
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            About Me
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="h-[600px] relative">
            <BinaryFigure />
          </div>
          
          <div>
            <Neofetch title="saurabh@blackarch" info={neofetchInfo} />
          </div>
        </div>
      </div>
    </section>
  );
};