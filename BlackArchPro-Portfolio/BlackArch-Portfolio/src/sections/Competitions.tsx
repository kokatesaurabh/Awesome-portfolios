import { motion } from 'framer-motion';
import { Trophy, Calendar } from 'lucide-react';

export const Competitions = () => {
  const competitions = [
    {
      name: "Smart India Hackathon (SIH'24)",
      result: "Finalist",
      team: "Team",
      date: "11-12 December 2024",
      venue: "IIT Jammu",
      description: "Showcased innovative problem-solving skills on a national platform."
    },
    {
      name: "Pentathon (CTF)",
      result: "Participated",
      team: "Solo",
      date: "15/03/2024",
      description: "Demonstrated advanced penetration testing and vulnerability assessment skills."
    }
  ];

  return (
    <section className="py-20 bg-black/90 relative">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            Competitions & Achievements
          </span>
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {competitions.map((comp, index) => (
            <motion.div
              key={comp.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="mb-8 bg-gray-900/50 rounded-lg p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
            >
              <div className="flex items-start gap-4">
                <Trophy className="w-8 h-8 text-cyan-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{comp.name}</h3>
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{comp.date}</span>
                  </div>
                  <p className="text-gray-400 mb-2">{comp.description}</p>
                  <div className="flex gap-4">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 rounded-full text-sm">
                      {comp.result}
                    </span>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 rounded-full text-sm">
                      {comp.team}
                    </span>
                    {comp.venue && (
                      <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 rounded-full text-sm">
                        {comp.venue}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};