<<<<<<< HEAD
import { motion } from 'framer-motion';
import { Terminal, Github, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { Globe } from './Globe';

export const Hero = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/kokatesaurabh', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/saurabh-kokate-b839b921a', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/SaurabhKokate20', label: 'Twitter' },
    { icon: Facebook, href: 'https://www.facebook.com/share/A8tKsYm5D3DDvP1V', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/0day.xploit_101', label: 'Instagram' }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-theme-surface relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?q=80&w=2832&auto=format&fit=crop')] opacity-5 bg-cover bg-center" />
      
      <div className="container mx-auto px-4 h-screen flex items-center relative z-10">
        <div className="grid grid-cols-12 gap-12 items-center">
          {/* Left Content - 7 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-7"
          >
            <Terminal className="w-16 h-16 text-theme-primary mb-8 animate-float" />
            <motion.h1 
              className="text-6xl font-bold mb-6 glitch-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Saurabh Kokate
              </span>
            </motion.h1>
            <motion.div
              className="space-y-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xl text-theme-secondary">Cybersecurity Enthusiast & Zero-Day Explorer</p>
              <p className="text-theme-text">Specialized in advanced red teaming, AI development, and zero-day research.</p>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              className="flex gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-theme-primary hover:text-theme-secondary transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <link.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-theme-primary text-background rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              >
                View Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-theme-primary text-theme-primary rounded-lg font-medium hover:bg-theme-primary/10 transition-colors"
              >
                Download CV
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Globe (5 columns) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="col-span-5 relative h-[600px]"
          >
            <Globe />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
=======
import { motion, useAnimation } from 'framer-motion';
import { Terminal as TerminalIcon, Shield, Code2, ChevronDown, FileText } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Howl } from 'howler';
import Terminal from './Terminal';
import { gsap } from 'gsap';

// Sound effects with more professional tones
const hoverSound = new Howl({
  src: ['https://assets.codepen.io/439000/hover.mp3'],
  volume: 0.08
});

const clickSound = new Howl({
  src: ['https://assets.codepen.io/439000/click.mp3'],
  volume: 0.15
});

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    // Enhanced particle system with more sophisticated behavior
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 3000; // Increased particle count
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      // Enhanced color variations for more visual depth
      colors[i] = 0.5 + Math.random() * 0.5;     // Red
      colors[i + 1] = 0.2 + Math.random() * 0.3; // Green
      colors[i + 2] = 0.8 + Math.random() * 0.2; // Blue

      // Dynamic particle sizes
      sizes[i / 3] = Math.random() * 3;

      // Add velocity for each particle
      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for more advanced particle effects
    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          gl_FragColor = vec4(vColor, smoothstep(0.5, 0.2, dist));
        }
      `,
      transparent: true,
      vertexColors: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Enhanced mouse interaction with smooth transitions
    const mouse = new THREE.Vector2();
    const targetMouse = new THREE.Vector2();
    const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

    const onMouseMove = (event: MouseEvent) => {
      targetMouse.x = (event.clientX - windowHalf.x) * 0.0003;
      targetMouse.y = (event.clientY - windowHalf.y) * 0.0003;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth mouse movement
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Update particle positions with velocities
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Boundary check and reset
        if (Math.abs(positions[i]) > 10) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 10) velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 10) velocities[i + 2] *= -1;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Rotate particles based on mouse position
      particles.rotation.x += 0.0001 + mouse.y * 0.02;
      particles.rotation.y += 0.0002 + mouse.x * 0.02;

      // Smooth camera movement
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      windowHalf.set(window.innerWidth / 2, window.innerHeight / 2);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black pointer-events-none" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 max-w-4xl mx-auto"
        >
          <Terminal />
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-300"
            onMouseEnter={() => {
              hoverSound.play();
              controls.start({ scale: 1.05 });
            }}
            onMouseLeave={() => controls.start({ scale: 1 })}
            animate={controls}
          >
            Saurabh Subhash Kokate
          </motion.h1>

          {/* Enhanced icon animations */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 360 }} 
              transition={{ duration: 0.5 }}
              className="p-3 bg-purple-900/20 rounded-lg backdrop-blur-sm"
            >
              <TerminalIcon className="w-8 h-8 text-purple-400" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 360 }} 
              transition={{ duration: 0.5 }}
              className="p-3 bg-purple-900/20 rounded-lg backdrop-blur-sm"
            >
              <Shield className="w-8 h-8 text-purple-400" />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 360 }} 
              transition={{ duration: 0.5 }}
              className="p-3 bg-purple-900/20 rounded-lg backdrop-blur-sm"
            >
              <Code2 className="w-8 h-8 text-purple-400" />
            </motion.div>
          </div>

          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Cybersecurity Enthusiast | AI Innovator | Red Team Specialist
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(147, 51, 234, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => {
                setIsHovering(true);
                hoverSound.play();
              }}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => {
                clickSound.play();
                scrollToNext();
              }}
              className={`px-8 py-4 bg-purple-600 rounded-lg font-semibold transition-all duration-300
                ${isHovering ? 'bg-purple-700 shadow-lg shadow-purple-500/50' : 'hover:bg-purple-700'}
                backdrop-blur-sm border border-purple-500/20`}
            >
              Explore My Work
            </motion.button>

            <motion.a
              href="https://drive.google.com/file/d/1NZ17gYQopgoQMTNSHoJhJ5vilG8vUEwm/view"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(147, 51, 234, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent rounded-lg font-semibold transition-all duration-300
                hover:bg-purple-900/30 backdrop-blur-sm border border-purple-500/50 flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              <span>Resume</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={scrollToNext}
        >
          <ChevronDown className="w-8 h-8 text-purple-400 animate-bounce cursor-pointer" />
        </motion.div>
      </div>
    </div>
  );
}
>>>>>>> 2a8cb33 (Initial commit for my project)
