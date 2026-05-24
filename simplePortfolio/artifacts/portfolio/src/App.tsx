import React, { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import { Moon, Sun, Github, Linkedin, ExternalLink, ChevronRight, Terminal, Code2, Shield, Lock, ShieldAlert, Award, Star, Menu, X as XIcon } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { CyberScene } from "@/components/CyberScene";
import { SkillStrips } from "@/components/SkillStrips";
import { TypingText } from "@/components/TypingText";
import { Iridescence } from "@/components/Iridescence";
import { LaserFlow } from "@/components/LaserFlow";
import { BlurReveal } from "@/components/BlurReveal";
import { CursorGlow } from "@/components/CursorGlow";
import { ScrollProgress } from "@/components/ScrollProgress";
import { StatCounter } from "@/components/StatCounter";
import { SplineScene } from "@/components/SplineScene";
import { ContactTreeBg } from "@/components/ContactTreeBg";
import { DetailsModal, type ModalData } from "@/components/DetailsModal";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md hover:bg-muted/50 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp3D = {
  hidden: { opacity: 0, y: 50, rotateX: 18 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const sectionTitle3D = {
  hidden: { opacity: 0, x: -30, rotateY: 12 },
  show: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function HeroParallax() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <motion.div style={{ opacity }} className="relative z-10 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30 text-xs font-mono tracking-[0.25em] neon-card"
      >
        <ShieldAlert size={13} />
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        SECURITY ENGINEER · AVAILABLE
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-6xl md:text-8xl font-black tracking-tight leading-none glow-heading-white"
      >
        SAURABH<br />
        <span className="text-primary glow-heading">KOKATE</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="text-sm sm:text-base md:text-lg text-primary font-display tracking-widest min-h-[2em] flex items-center"
      >
        <TypingText />
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-base md:text-xl text-foreground/80 max-w-lg leading-relaxed border-l-2 border-primary pl-4 font-editorial italic"
      >
        Building secure systems and breaking them to make them stronger.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="flex flex-wrap items-center gap-4 pt-4"
      >
        <a
          href="https://linkedin.com/in/saurabh-kokate"
          target="_blank"
          rel="noreferrer"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/25"
        >
          LinkedIn <ChevronRight size={18} />
        </a>
        <a
          href="https://github.com/kokatesaurabh"
          target="_blank"
          rel="noreferrer"
          className="bg-transparent border border-border text-foreground hover:border-primary hover:text-primary px-6 py-3 rounded-md font-bold transition-all flex items-center gap-2"
        >
          GitHub <ExternalLink size={18} />
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="grid grid-cols-3 gap-6 pt-6 border-t border-border/40 max-w-xs"
      >
        <StatCounter end={400} suffix="+" label="LeetCode" />
        <StatCounter end={3} label="Projects" duration={800} />
        <StatCounter end={17} suffix="k+" label="OSS Stars" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="flex items-center gap-2 text-muted-foreground/40 text-xs font-mono"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="text-primary/60"
        >↓</motion.span>
        SCROLL TO EXPLORE
      </motion.div>
    </motion.div>
  );
}

const NAV_ITEMS = ["about", "open-source", "skills", "projects", "achievements", "contact"];

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  // Close menu on escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen w-full font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <CursorGlow />
      <ScrollProgress />
      <DetailsModal data={modalData} onClose={() => setModalData(null)} />

      {/* ── Full-screen menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[90] bg-background/90 backdrop-blur-2xl"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              key="menu-panel"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-[91] w-full max-w-sm bg-card border-l border-border/40 flex flex-col"
            >
              {/* Menu header */}
              <div className="flex items-center justify-between px-8 h-16 border-b border-border/30">
                <span className="font-display font-bold text-lg tracking-widest">
                  SAURABH<span className="text-primary">.</span>
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                >
                  <XIcon size={20} />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
                {NAV_ITEMS.map((id, i) => (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, type: "spring", stiffness: 300, damping: 30 }}
                    onClick={() => scrollTo(id)}
                    className="group flex items-center justify-between py-4 border-b border-border/20 last:border-0 text-left"
                  >
                    <span className="font-display font-bold text-2xl tracking-wide group-hover:text-primary transition-colors uppercase">
                      {id.replace("-", " ")}
                    </span>
                    <ChevronRight size={18} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </motion.button>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="px-8 pb-8">
                <a
                  href="https://linkedin.com/in/saurabh-kokate"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-all"
                >
                  <Linkedin size={16} /> HIRE ME
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div
            className="font-display font-bold text-xl tracking-wider cursor-pointer"
            onClick={() => scrollTo("hero")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            SAURABH<span className="text-primary glow-heading">.</span>
          </motion.div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2.5 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/8 transition-all text-foreground"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero — text left, 3D geometry right */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: info */}
            <HeroParallax />
            {/* Right: 3D scene */}
            <div className="relative hidden lg:flex items-center justify-center" style={{ height: "580px" }}>
              <CyberScene />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      </section>

      <main className="max-w-4xl mx-auto px-6 pb-24 space-y-32">
        {/* About */}
        <section id="about">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.h2
              variants={sectionTitle3D}
              style={{ transformPerspective: 900 }}
              className="font-display text-3xl font-bold flex items-center gap-4 glow-heading"
            >
              ABOUT <span className="h-px bg-border flex-1" />
            </motion.h2>
            <motion.div
              variants={fadeUp3D}
              style={{ transformPerspective: 1200 }}
              className="relative rounded-lg overflow-hidden border neon-card-purple shadow-xl"
            >
              <div className="absolute inset-0">
                <Iridescence color={[0.510, 0.945, 0.957]} speed={2} amplitude={0.2} mouseReact />
              </div>
              <div className="absolute inset-0 bg-background/48" />
              <div className="relative z-10 p-8 md:p-12 space-y-6">
                <p className="text-xs font-mono tracking-[0.35em] text-[#82f1f4] uppercase opacity-80">// WHO AM I</p>
                <BlurReveal
                  delay={0.1}
                  stagger={0.26}
                  className="space-y-5"
                  lines={[
                    "IT Engineer with a strong interest in Cybersecurity and a solid foundation in information security principles, vulnerability assessment, and secure coding practices.",
                    "Passionate about building secure and scalable applications, with hands-on experience in the MERN stack.",
                    "Continuously deepening expertise in security engineering, risk assessment, and DevSecOps workflows.",
                  ]}
                  lineClassName="font-editorial text-xl md:text-2xl leading-relaxed italic text-foreground tracking-wide"
                />
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="flex flex-wrap gap-3 pt-2"
                >
                  {["Cybersecurity", "MERN Stack", "DevSecOps", "Ethical Hacking", "Open Source"].map((tag) => (
                    <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full border border-[#82f1f4]/40 text-[#82f1f4] bg-[#82f1f4]/8 tracking-widest">
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Open Source */}
        <section id="open-source">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.h2
              variants={sectionTitle3D}
              style={{ transformPerspective: 900 }}
              className="font-display text-3xl font-bold flex items-center gap-4 glow-heading"
            >
              OPEN SOURCE <span className="h-px bg-border flex-1" />
            </motion.h2>
            <motion.button
              variants={fadeUp3D}
              style={{ transformPerspective: 1200 }}
              whileHover={{ scale: 1.01, x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={() => setModalData({
                title: "MobSF",
                subtitle: "Mobile-Security-Framework-MobSF",
                badge: { text: "PR #2555 MERGED", color: "text-green-400 bg-green-400/10 border-green-400/25" },
                meta: "github.com / MobSF / Mobile-Security-Framework-MobSF",
                stars: "17.5k+",
                bullets: [
                  "Enhanced MalwareDomainCheck module with granular exception handling (FileNotFoundError, PermissionError, IOError) to prevent runtime crashes",
                  "Added pre-flight database validation checks and URL/domain input validation for improved reliability",
                  "Improved logging with traceable progress tracking; ensured graceful degradation on failures",
                  "Passed lint, QA checks — merged into master branch after maintainer review",
                ],
                tags: ["Python", "Security", "Malware Analysis", "Open Source"],
                link: "https://github.com/MobSF/Mobile-Security-Framework-MobSF/pull/2555",
                linkLabel: "View Pull Request",
              })}
              className="w-full text-left bg-card border rounded-xl overflow-hidden neon-card group cursor-pointer"
            >
              <div className="h-px bg-gradient-to-r from-transparent via-green-400/60 to-transparent" />
              <div className="px-6 py-5 flex items-center gap-5">
                <div className="p-2.5 rounded-lg bg-green-400/10 border border-green-400/20 shrink-0">
                  <Terminal className="text-green-400" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-0.5">
                    <h3 className="font-display font-bold text-lg">MobSF</h3>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-green-400 bg-green-400/10 border border-green-400/25 px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />PR #2555 MERGED
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono truncate">Mobile Security Framework · Python · 17.5k+ Stars</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
                  <span className="text-xs font-mono hidden sm:block">TAP FOR DETAILS</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.button>
          </motion.div>
        </section>

        {/* Skills */}
        <section id="skills">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h2
              variants={sectionTitle3D}
              style={{ transformPerspective: 900 }}
              className="font-display text-3xl font-bold flex items-center gap-4 glow-heading"
            >
              SKILLS <span className="h-px bg-border flex-1" />
            </motion.h2>
            <motion.div variants={fadeUp3D} style={{ transformPerspective: 1200 }}>
              <SkillStrips />
            </motion.div>
          </motion.div>
        </section>

        {/* Projects */}
        <section id="projects">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.h2
              variants={sectionTitle3D}
              style={{ transformPerspective: 900 }}
              className="font-display text-3xl font-bold flex items-center gap-4 glow-heading"
            >
              PROJECTS <span className="h-px bg-border flex-1" />
            </motion.h2>
            <div className="space-y-3">
              {[
                {
                  name: "BlackHawk-75-Checkmate",
                  type: "Android Static Analysis Framework",
                  date: "Oct 2024 – Dec 2024",
                  icon: <ShieldAlert size={18} />,
                  iconBg: "bg-primary/10 border-primary/25 text-primary",
                  bullets: [
                    "Developed framework to detect vulnerabilities in Android apps pre-deployment",
                    "Integrated MobSF, SonarQube, Android Lint for automated scanning and CVE analysis",
                    "Applied ML models (SVM, Random Forest, Isolation Forest) for anomaly detection and code scoring",
                    "Automated PDF/JSON reports with CI/CD integration for DevSecOps workflows",
                  ],
                  tech: ["Python", "MobSF", "SonarQube", "Android", "ML/AI", "CI/CD"],
                  link: "https://github.com/kokatesaurabh/BlackHawk-75-Checkmate",
                },
                {
                  name: "D3scord",
                  type: "Decentralized Communication Platform",
                  date: "May 2024 – Aug 2024",
                  icon: <Lock size={18} />,
                  iconBg: "bg-purple-400/10 border-purple-400/25 text-purple-400",
                  bullets: [
                    "Architected Web3 messaging platform with OpenZeppelin ERC-721",
                    "Developed Solidity contracts with Ethers.js for blockchain identity and data management",
                    "Built React.js frontend with Socket.io for real-time P2P communication",
                    "Engineered scalable verification and transaction auditing architecture",
                  ],
                  tech: ["Solidity", "React.js", "Ethers.js", "Socket.io", "Web3", "Blockchain"],
                  link: "https://github.com/kokatesaurabh/D3scord",
                },
                {
                  name: "Cyber-Jarvis",
                  type: "AI Cybersecurity Assistant",
                  date: "Dec 2023 – Mar 2024",
                  icon: <Terminal size={18} />,
                  iconBg: "bg-[#82f1f4]/10 border-[#82f1f4]/25 text-[#82f1f4]",
                  bullets: [
                    "Developed modular AI assistant for cybersecurity automation integrating OSINT, vulnerability scanning, hash cracking, steganography, and AI jailbreak",
                    "Implemented text-to-speech, video playback, and object detection for enhanced interactivity",
                    "Designed scalable architecture for easy integration of new tools and modules",
                  ],
                  tech: ["Python", "AI/ML", "OSINT", "OpenCV", "TTS", "Cybersecurity"],
                  link: "https://github.com/kokatesaurabh/Cyber-Jarvis",
                },
              ].map((project, i) => (
                <motion.button
                  key={i}
                  variants={fadeUp3D}
                  style={{ transformPerspective: 1200 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  onClick={() => setModalData({
                    title: project.name,
                    subtitle: project.type,
                    meta: project.date,
                    bullets: project.bullets,
                    tags: project.tech,
                    link: project.link,
                    linkLabel: "View Repository",
                  })}
                  className="w-full text-left bg-card border rounded-xl neon-card group cursor-pointer overflow-hidden"
                >
                  <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                  <div className="px-5 py-4 flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg border shrink-0 ${project.iconBg}`}>
                      {project.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="text-xs font-mono text-muted-foreground/40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        <h3 className="font-display font-bold text-base md:text-lg group-hover:text-primary transition-colors">{project.name}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono truncate">{project.type}</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground/50 hidden sm:block shrink-0">{project.date}</span>
                    <ChevronRight size={15} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Achievements */}
        <section id="achievements">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.h2
              variants={sectionTitle3D}
              style={{ transformPerspective: 900 }}
              className="font-display text-3xl font-bold flex items-center gap-4 glow-heading"
            >
              ACHIEVEMENTS <span className="h-px bg-border flex-1" />
            </motion.h2>
            <div className="space-y-4">
              {[
                {
                  num: "01",
                  title: "Finalist — Smart India Hackathon 2024",
                  label: "National Hackathon · IIT Jammu",
                  desc: "Led ML-based anomaly detection for Android Applications; reached national finals with presentation at IIT Jammu.",
                  icon: <Award size={18} />,
                  color: "text-yellow-400",
                  bg: "bg-yellow-400/10 border-yellow-400/25",
                },
                {
                  num: "02",
                  title: "Project Presenter — Tantravihar 2025",
                  label: "Tech Exhibition · Security Track",
                  desc: "Presented KN-78 Knightmare — an LLVM obfuscation framework for hardening Windows/Linux binaries against reverse engineering.",
                  icon: <Star size={18} />,
                  color: "text-primary",
                  bg: "bg-primary/10 border-primary/25",
                },
                {
                  num: "03",
                  title: "Advent of Cyber 2025 — TryHackMe",
                  label: "Cybersecurity Challenge · Completed",
                  desc: "Completed all daily cybersecurity challenges covering ethical hacking, digital forensics, OSINT, and threat analysis.",
                  icon: <Shield size={18} />,
                  color: "text-[#82f1f4]",
                  bg: "bg-[#82f1f4]/10 border-[#82f1f4]/25",
                },
                {
                  num: "04",
                  title: "Competitive Programming",
                  label: "LeetCode · GeeksForGeeks",
                  desc: "Solved 400+ LeetCode problems, active in weekly contests, and completed GFG 160 Days DSA Challenge.",
                  icon: <Code2 size={18} />,
                  color: "text-green-400",
                  bg: "bg-green-400/10 border-green-400/25",
                },
              ].map((a, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp3D}
                  style={{ transformPerspective: 1200 }}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-card border rounded-lg p-5 md:p-6 flex gap-5 items-start neon-card group"
                >
                  <div className="flex-shrink-0 flex flex-col items-center gap-3 pt-0.5">
                    <span className="font-display font-black text-3xl md:text-4xl text-muted-foreground/15 leading-none tabular-nums select-none">
                      {a.num}
                    </span>
                    <div className={`p-2 rounded-md border ${a.bg}`}>
                      <span className={a.color}>{a.icon}</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1.5">
                      <h4 className="font-bold font-display text-base leading-snug group-hover:text-primary transition-colors">
                        {a.title}
                      </h4>
                      <span className={`text-xs font-mono ${a.color} opacity-75 shrink-0`}>{a.label}</span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      {/* Contact */}
      <section id="contact" className="relative overflow-hidden" style={{ minHeight: "720px" }}>
        {/* System design tree graph background */}
        <div className="absolute inset-0 z-0">
          <ContactTreeBg />
        </div>
        {/* LaserFlow animation layer */}
        <div className="absolute inset-0 z-[1] opacity-40">
          <LaserFlow
            color="#FF6600"
            wispDensity={0.8}
            verticalSizing={2.0}
            horizontalSizing={0.6}
            wispIntensity={5}
            fogIntensity={0.3}
            flowStrength={0.25}
            decay={1.2}
          />
        </div>
        <div className="absolute inset-0 z-[2] bg-background/72" />

        <div className="relative z-[13] max-w-6xl mx-auto px-6 py-24">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 space-y-3"
          >
            <p className="text-xs font-mono text-primary tracking-[0.35em] uppercase">// contact</p>
            <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight">
              LET'S <span className="text-primary glow-heading">CONNECT</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-sm mx-auto font-mono">
              Open to cybersecurity · security engineering · full-stack roles
            </p>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* LEFT — 3D robot card with laser border */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="laser-border-card">
                {/* Spline 3D robot */}
                <div style={{ height: "380px" }}>
                  <SplineScene
                    scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                    className="w-full h-full"
                  />
                </div>
                {/* Card footer inside the laser-border */}
                <div className="px-6 py-5 border-t border-border/50 flex items-center justify-between bg-card/60 backdrop-blur-sm">
                  <div>
                    <p className="text-xs font-mono text-primary tracking-[0.2em] uppercase">3D Interactive</p>
                    <p className="text-sm text-muted-foreground mt-0.5">Drag · Zoom · Interact</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://linkedin.com/in/saurabh-kokate"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-primary text-primary-foreground p-2.5 rounded-lg hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/30"
                    >
                      <Linkedin size={16} />
                    </a>
                    <a
                      href="https://github.com/kokatesaurabh"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-card border border-border text-foreground hover:border-primary hover:text-primary p-2.5 rounded-lg transition-all"
                    >
                      <SiGithub size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Connect info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <p className="font-display font-black text-3xl md:text-4xl leading-tight">
                  Building the next<br />
                  <span className="text-primary">layer of defence.</span>
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Whether it's hardening systems, hunting vulnerabilities, or shipping full-stack products—
                  I bring security-first thinking to every line of code.
                </p>
              </div>

              {/* Contact methods */}
              <div className="space-y-3">
                {[
                  {
                    icon: <Linkedin size={16} />,
                    label: "LinkedIn",
                    value: "saurabh-kokate",
                    href: "https://linkedin.com/in/saurabh-kokate",
                    color: "text-primary",
                  },
                  {
                    icon: <Github size={16} />,
                    label: "GitHub",
                    value: "kokatesaurabh",
                    href: "https://github.com/kokatesaurabh",
                    color: "text-purple-400",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-card/60 border border-border/50 hover:border-primary/50 hover:bg-card transition-all group backdrop-blur-sm"
                  >
                    <div className={`${item.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase">{item.label}</p>
                      <p className="text-sm font-medium text-foreground truncate">{item.value}</p>
                    </div>
                    <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="https://linkedin.com/in/saurabh-kokate"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold tracking-wide hover:opacity-90 transition-all shadow-xl shadow-primary/25"
              >
                <Linkedin size={18} />
                CONNECT ON LINKEDIN
                <ChevronRight size={16} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 mt-16">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center justify-center gap-6">
          <div className="font-display font-bold text-2xl tracking-widest">
            SAURABH<span className="text-primary">.</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/in/saurabh-kokate"
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/kokatesaurabh"
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-secondary rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <SiGithub size={20} />
            </a>
          </div>
          <p className="text-muted-foreground text-sm font-mono text-center">
            Saurabh Kokate · Built with code and caffeine
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="saurabh-portfolio-theme">
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
