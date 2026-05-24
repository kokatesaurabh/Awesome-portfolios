import { useEffect, useRef } from "react";
import {
  SiPython,
  SiJavascript,
  SiCplusplus,
  SiMysql,
  SiAndroid,
  SiLinux,
  SiWireshark,
  SiOwasp,
} from "react-icons/si";
import {
  Code2,
  Shield,
  Lock,
  Terminal,
  Database,
  Network,
  Bug,
  Layers,
  BookOpen,
  ShieldAlert,
  Eye,
  FileSearch,
  Activity,
  Cpu,
  Zap,
  ScanSearch,
} from "lucide-react";

interface StripItem {
  icon: React.ReactNode;
  label: string;
}

const STRIPS: { label: string; items: StripItem[] }[] = [
  {
    label: "PROGRAMMING",
    items: [
      { icon: <Code2 size={18} />, label: "C" },
      { icon: <SiCplusplus size={18} />, label: "C++" },
      { icon: <SiPython size={18} />, label: "Python" },
      { icon: <Code2 size={18} />, label: "Java" },
      { icon: <SiJavascript size={18} />, label: "JavaScript" },
      { icon: <SiMysql size={18} />, label: "SQL" },
    ],
  },
  {
    label: "CYBERSECURITY",
    items: [
      { icon: <SiOwasp size={18} />, label: "OWASP Top 10" },
      { icon: <FileSearch size={18} />, label: "Static Analysis" },
      { icon: <Activity size={18} />, label: "Dynamic Analysis" },
      { icon: <Lock size={18} />, label: "Secure Coding" },
      { icon: <SiAndroid size={18} />, label: "Android Security" },
      { icon: <Bug size={18} />, label: "Malware Analysis" },
    ],
  },
  {
    label: "SECURITY TOOLS",
    items: [
      { icon: <ShieldAlert size={18} />, label: "MobSF" },
      { icon: <SiWireshark size={18} />, label: "Wireshark" },
      { icon: <Shield size={18} />, label: "Burp Suite" },
      { icon: <Terminal size={18} />, label: "Nmap" },
      { icon: <Zap size={18} />, label: "Metasploit" },
      { icon: <Eye size={18} />, label: "ProcMon" },
      { icon: <Eye size={18} />, label: "Regshot" },
      { icon: <ScanSearch size={18} />, label: "PeStudio" },
      { icon: <Terminal size={18} />, label: "Nikto" },
      { icon: <SiOwasp size={18} />, label: "OWASP ZAP" },
    ],
  },
  {
    label: "CORE CS",
    items: [
      { icon: <BookOpen size={18} />, label: "DSA" },
      { icon: <Layers size={18} />, label: "OOP" },
      { icon: <SiLinux size={18} />, label: "Operating Systems" },
      { icon: <Database size={18} />, label: "DBMS" },
      { icon: <Network size={18} />, label: "Computer Networks" },
      { icon: <Code2 size={18} />, label: "Software Engineering" },
      { icon: <Cpu size={18} />, label: "Computer Architecture" },
    ],
  },
];

interface InfiniteStripProps {
  items: StripItem[];
  direction: "left" | "right";
  baseSpeed?: number;
}

function InfiniteStrip({ items, direction, baseSpeed = 0.55 }: InfiniteStripProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const scrollVelRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollYRef.current);
      scrollVelRef.current = Math.min(delta * 0.25, 10);
      lastScrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let animId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = Math.min(time - lastTime, 50);
      lastTime = time;

      const el = innerRef.current;
      if (el) {
        const halfWidth = el.scrollWidth / 2;

        if (!initializedRef.current) {
          posRef.current = direction === "right" ? -halfWidth : 0;
          initializedRef.current = true;
        }

        const speed = baseSpeed + scrollVelRef.current;
        const step = (speed * dt) / 16;

        posRef.current += direction === "left" ? -step : step;

        if (posRef.current <= -halfWidth) posRef.current += halfWidth;
        if (posRef.current >= 0) posRef.current -= halfWidth;

        el.style.transform = `translateX(${posRef.current}px)`;
      }

      scrollVelRef.current *= 0.87;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [direction, baseSpeed]);

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      <div
        ref={innerRef}
        className="flex gap-3 w-max py-1"
        style={{ willChange: "transform" }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-5 py-2.5 bg-card border border-card-border rounded-full whitespace-nowrap text-sm font-semibold text-card-foreground hover:border-primary/70 hover:text-primary transition-colors cursor-default select-none"
          >
            <span className="text-primary">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkillStrips() {
  return (
    <div className="space-y-6">
      {STRIPS.map((strip, i) => (
        <div key={i} className="space-y-2">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2 px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            {strip.label}
          </p>
          <InfiniteStrip
            items={strip.items}
            direction={i % 2 === 0 ? "left" : "right"}
            baseSpeed={0.5 + i * 0.05}
          />
        </div>
      ))}
    </div>
  );
}
