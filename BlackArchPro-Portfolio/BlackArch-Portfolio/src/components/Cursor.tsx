import { motion } from 'framer-motion';
import { useCursor } from '../hooks/useCursor';

export const Cursor = () => {
  const { position, isPointer } = useCursor();

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-50 w-4 h-4 rounded-full border-2 border-cyan-500"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
      <motion.div
        className="fixed pointer-events-none z-50 w-2 h-2 bg-cyan-500 rounded-full"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isPointer ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
    </>
  );
};