import { motion } from 'framer-motion';

export const BinaryFigure = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="relative w-full h-full"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <pre className="text-[0.5rem] leading-none text-cyan-500 opacity-30 font-mono">
          {Array.from({ length: 50 }, () => 
            Array.from({ length: 100 }, () => 
              Math.random() > 0.5 ? '1' : '0'
            ).join('')
          ).join('\n')}
        </pre>
      </div>
      <motion.img
        src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
        alt="Hooded Figure"
        className="absolute inset-0 w-full h-full object-contain mix-blend-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1, duration: 2 }}
      />
    </motion.div>
  );
};