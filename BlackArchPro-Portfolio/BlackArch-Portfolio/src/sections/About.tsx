import { motion } from 'framer-motion';
import { Code2, Brain, Cpu } from 'lucide-react';

export const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Advanced Red Teaming",
      description: "Specialized in creating custom exploitation frameworks and innovative cybersecurity solutions."
    },
    {
      icon: Brain,
      title: "AI Development",
      description: "Building AI systems from scratch to assist hackers without relying on existing tools."
    },
    {
      icon: Cpu,
      title: "Zero-Day Research",
      description: "Focused on discovering and developing zero-day exploits and security vulnerabilities."
    }
  ];

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

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-400 text-lg max-w-3xl mx-auto mb-16 text-center"
        >
          I'm passionate about pushing the boundaries of cybersecurity, focusing on advanced exploitation techniques
          and innovative security solutions. Currently diving deep into AI development for security applications.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
            >
              <item.icon className="w-12 h-12 text-cyan-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};