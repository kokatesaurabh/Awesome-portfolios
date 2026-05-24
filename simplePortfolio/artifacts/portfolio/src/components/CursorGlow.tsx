import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });
  const dotX = useSpring(x, { stiffness: 500, damping: 30 });
  const dotY = useSpring(y, { stiffness: 500, damping: 30 });
  const visible = useRef(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      visible.current = true;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full"
        style={{
          width: 520,
          height: 520,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(255,102,0,0.055) 0%, rgba(130,241,244,0.025) 50%, transparent 70%)",
          filter: "blur(1px)",
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full border border-primary/30 mix-blend-difference"
        style={{
          width: 10,
          height: 10,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "rgba(255,102,0,0.7)",
        }}
      />
    </>
  );
}
