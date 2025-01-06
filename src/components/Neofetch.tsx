import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface NeofetchProps {
  title: string;
  info: Record<string, string | string[]>;
}

export const Neofetch = ({ title, info }: NeofetchProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="font-mono text-sm bg-black/50 rounded-lg p-6 border border-cyan-500/20"
    >
      <div className="flex gap-4">
        <Terminal className="w-24 h-24 text-cyan-500" />
        <div className="flex-1">
          <h3 className="text-cyan-500 text-xl mb-4">{title}</h3>
          {Object.entries(info).map(([key, value]) => (
            <div key={key} className="flex gap-4 mb-1">
              <span className="text-green-500 min-w-[120px]">{key}</span>
              <span className="text-gray-400">
                {Array.isArray(value) ? value.join(', ') : value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};