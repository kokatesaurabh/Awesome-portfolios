import { motion } from 'framer-motion';

export const Skills = () => {
  const categories = [
    {
      title: "Languages",
      skills: ["Python3", "C", "JavaScript", "Solidity", "GO", "C++", "Shell Script", "Rust"]
    },
    {
      title: "Frameworks & Libraries",
      skills: ["PyTorch", "Selenium", "NumPy", "Pandas", "Scikit-learn", "OpenCV"]
    },
    {
      title: "Operating Systems",
      skills: ["Ubuntu", "Kali", "Parrot", "BlackArch", "Tails OS", "Windows", "Garuda"]
    },
    {
      title: "CTF Tools",
      skills: ["Metasploit", "Wireshark", "Burpsuite", "Netcat", "Nmap"]
    }
  ];

  return (
    <section className="py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            Skills & Technologies
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm border border-cyan-500/20"
            >
              <h3 className="text-xl font-semibold text-white mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="px-4 py-2 bg-cyan-500/10 text-cyan-500 rounded-lg text-sm hover:bg-cyan-500/20 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};