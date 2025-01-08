import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTerminalCommands } from '../hooks/useTerminalCommands';

export const Loading = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const { commands, currentCommand } = useTerminalCommands();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center font-mono"
    >
      <div className="w-[600px] h-[400px] bg-black border border-cyan-500/50 rounded-lg p-4 overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-cyan-500 space-y-1 h-[300px] overflow-y-auto">
          {commands.map((cmd, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-green-500">root@blackarch</span>
              <span className="text-white">:</span>
              <span className="text-blue-500">~#</span> {cmd}
            </motion.div>
          ))}
          {currentCommand && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-cyan-500"
            >
              <span className="text-green-500">root@blackarch</span>
              <span className="text-white">:</span>
              <span className="text-blue-500">~#</span> {currentCommand}
              <span className="ml-1">_</span>
            </motion.div>
          )}
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-900 rounded-full h-2">
            <motion.div
              className="bg-cyan-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-cyan-500 text-sm mt-2">
            System Loading: {progress}%
          </div>
        </div>
      </div>
    </motion.div>
  );
};