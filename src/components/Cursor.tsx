import { motion } from 'framer-motion';
import { useCursor } from '../hooks/useCursor';

export const Cursor = () => {
  const { position, isPointer } = useCursor();

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-50 w-6 h-6 rounded-full border-2 border-cyan-500"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25,
          mass: 0.1
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-50 w-2 h-2 bg-cyan-500 rounded-full"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isPointer ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 750,
          damping: 25,
          mass: 0.05
        }}
      />
    </>
  );
};