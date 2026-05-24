import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface BlurRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}

export function BlurReveal({ lines, className = "", lineClassName = "", delay = 0, stagger = 0.18 }: BlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={`space-y-3 ${className}`}>
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, filter: "blur(14px)", y: 14 }}
          animate={
            inView
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(14px)", y: 14 }
          }
          transition={{
            duration: 0.75,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={lineClassName || "text-lg leading-relaxed text-foreground/90"}
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}
