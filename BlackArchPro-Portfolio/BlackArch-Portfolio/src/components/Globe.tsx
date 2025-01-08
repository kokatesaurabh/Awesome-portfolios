import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{x: number; y: number; z: number; speed: number}> = [];
    const PARTICLE_COUNT = 1000;
    const PARTICLE_BASE_RADIUS = 0.5;
    const CONNECTION_DISTANCE = 50;

    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 150;

      particles.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        speed: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle, i) => {
        // Rotate particles
        const rotationZ = 0.003;
        const x = particle.x * Math.cos(rotationZ) - particle.y * Math.sin(rotationZ);
        const y = particle.x * Math.sin(rotationZ) + particle.y * Math.cos(rotationZ);
        particle.x = x;
        particle.y = y;

        // Project 3D coordinates to 2D
        const scale = 300 / (300 + particle.z);
        const x2d = particle.x * scale + canvas.width / 2;
        const y2d = particle.y * scale + canvas.height / 2;

        // Draw particle
        const radius = PARTICLE_BASE_RADIUS * scale;
        ctx.beginPath();
        ctx.arc(x2d, y2d, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${scale * 0.5})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach(particle2 => {
          const scale2 = 300 / (300 + particle2.z);
          const x2d2 = particle2.x * scale2 + canvas.width / 2;
          const y2d2 = particle2.y * scale2 + canvas.height / 2;

          const distance = Math.sqrt(
            Math.pow(x2d - x2d2, 2) + Math.pow(y2d - y2d2, 2)
          );

          if (distance < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(x2d2, y2d2);
            ctx.strokeStyle = `rgba(6, 182, 212, ${
              (1 - distance / CONNECTION_DISTANCE) * 0.15
            })`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
};