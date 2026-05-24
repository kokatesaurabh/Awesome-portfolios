import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useEffect } from "react";

export interface ModalData {
  title: string;
  subtitle?: string;
  badge?: { text: string; color: string };
  meta?: string;
  bullets: string[];
  tags?: string[];
  link?: string;
  linkLabel?: string;
  stars?: string;
}

interface DetailsModalProps {
  data: ModalData | null;
  onClose: () => void;
}

export function DetailsModal({ data, onClose }: DetailsModalProps) {
  useEffect(() => {
    if (!data) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [data, onClose]);

  return (
    <AnimatePresence>
      {data && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-md"
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[201] w-auto md:w-full md:max-w-xl"
          >
            <div className="relative bg-card rounded-2xl overflow-hidden shadow-2xl border border-border/60">
              {/* Top accent bar */}
              <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              {/* Header */}
              <div className="flex items-start justify-between gap-4 p-6 pb-4">
                <div className="space-y-1 flex-1 min-w-0">
                  {data.badge && (
                    <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-0.5 rounded-full border mb-2 ${data.badge.color}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                      {data.badge.text}
                    </span>
                  )}
                  <h2 className="font-display font-bold text-xl md:text-2xl leading-tight">{data.title}</h2>
                  {data.subtitle && (
                    <p className="text-sm font-semibold text-primary">{data.subtitle}</p>
                  )}
                  {data.meta && (
                    <p className="text-xs font-mono text-muted-foreground">{data.meta}</p>
                  )}
                </div>
                {data.stars && (
                  <div className="text-right shrink-0">
                    <p className="text-xs font-mono text-muted-foreground uppercase">Stars</p>
                    <p className="font-display font-bold text-lg text-primary">{data.stars}</p>
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground shrink-0"
                >
                  <X size={18} />
                </button>
              </div>
              {/* Bullets */}
              <div className="px-6 pb-4">
                <ul className="space-y-2.5 border-l-2 border-primary/25 pl-4">
                  {data.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm text-card-foreground/80 leading-relaxed">
                      <span className="text-primary mt-1 text-xs shrink-0">▹</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Tags */}
              {data.tags && data.tags.length > 0 && (
                <div className="px-6 pb-4 flex flex-wrap gap-2">
                  {data.tags.map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded bg-primary/8 border border-primary/20 text-primary/80">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {/* Footer link */}
              {data.link && (
                <div className="px-6 pb-6">
                  <a
                    href={data.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline underline-offset-4"
                  >
                    <SiGithub size={15} /> {data.linkLabel ?? "View on GitHub"} <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
