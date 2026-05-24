import { useState, useEffect } from "react";

const ROLES = [
  "IT ENGINEER",
  "SECURITY RESEARCHER",
  "OPEN SOURCE CONTRIBUTOR",
  "MERN DEVELOPER",
  "ETHICAL HACKER",
];

type Phase = "typing" | "pausing" | "erasing";

export function TypingText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        const t = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          72
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pausing"), 1600);
      return () => clearTimeout(t);
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("erasing"), 300);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          36
        );
        return () => clearTimeout(t);
      }
      setRoleIndex((i) => (i + 1) % ROLES.length);
      setPhase("typing");
    }
  }, [displayed, phase, roleIndex]);

  return (
    <span className="inline-flex items-center gap-0">
      <span>{displayed}</span>
      <span
        className="inline-block w-0.5 h-[1em] bg-primary ml-0.5 align-middle"
        style={{
          animation: "blink 1s step-end infinite",
        }}
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}
