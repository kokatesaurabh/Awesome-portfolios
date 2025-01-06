import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false); // State to track hover

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{ x: number; y: number; z: number; speed: number }> =
      [];
    const PARTICLE_COUNT = 3000; // Increased particle count
    const PARTICLE_BASE_RADIUS = 0.8; // Increased particle size
    const CONNECTION_DISTANCE = 80; // Increased connection distance
    const GLOBE_RADIUS = 300; // Increased globe size

    let rotationZSpeed = 0.002; // Default rotation speed on Z-axis
    let rotationYSpeed = 0.001; // Default rotation speed on Y-axis

    const mouse = { x: 0, y: 0 }; // Mouse position for dynamic rotation

    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);

      particles.push({
        x: GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta),
        y: GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta),
        z: GLOBE_RADIUS * Math.cos(phi),
        speed: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Adjust rotation speed based on hover state
        const zSpeed = hovered ? rotationZSpeed * 3 : rotationZSpeed;
        const ySpeed = hovered ? rotationYSpeed * 3 : rotationYSpeed;

        // Apply rotation transformations
        const x =
          particle.x * Math.cos(zSpeed) - particle.y * Math.sin(zSpeed);
        const y =
          particle.x * Math.sin(zSpeed) + particle.y * Math.cos(zSpeed);
        const z = particle.z * Math.cos(ySpeed) - x * Math.sin(ySpeed);

        particle.x = x;
        particle.y = y;
        particle.z = z;

        // Project 3D coordinates to 2D with perspective
        const scale = 400 / (400 + particle.z);
        const x2d = particle.x * scale + canvas.width / 2;
        const y2d = particle.y * scale + canvas.height / 2;

        // Draw particle with glowing effect
        const radius = PARTICLE_BASE_RADIUS * scale;
        const gradient = ctx.createRadialGradient(
          x2d,
          y2d,
          0,
          x2d,
          y2d,
          radius * 2
        );
        gradient.addColorStop(0, `rgba(6, 182, 212, ${scale * 0.8})`);
        gradient.addColorStop(1, "rgba(6, 182, 212, 0)");

        ctx.beginPath();
        ctx.arc(x2d, y2d, radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((particle2) => {
          const scale2 = 400 / (400 + particle2.z);
          const x2d2 = particle2.x * scale2 + canvas.width / 2;
          const y2d2 = particle2.y * scale2 + canvas.height / 2;

          const distance = Math.sqrt(
            Math.pow(x2d - x2d2, 2) + Math.pow(y2d - y2d2, 2)
          );

          if (distance < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(x2d2, y2d2);

            const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.2;
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
            ctx.lineWidth = scale * 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;

      rotationZSpeed = ((mouse.x / canvas.width) - 0.5) * 0.01;
      rotationYSpeed = ((mouse.y / canvas.height) - 0.5) * 0.01;
    };

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hovered]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
};
