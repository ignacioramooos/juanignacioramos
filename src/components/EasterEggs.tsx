import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

const Particle = ({ delay }: { delay: number }) => {
  const x = Math.random() * 100;
  const size = Math.random() * 3 + 1;

  return (
    <motion.div
      className="fixed rounded-full bg-foreground/30 pointer-events-none"
      style={{ width: size, height: size, left: `${x}%` }}
      initial={{ bottom: -10, opacity: 0 }}
      animate={{ bottom: "110%", opacity: [0, 1, 1, 0] }}
      transition={{ duration: 3 + Math.random() * 2, delay, ease: "easeOut" }}
    />
  );
};

export const EasterEggs = () => {
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Konami code listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setKonamiProgress((prev) => {
        if (e.key === KONAMI[prev]) {
          const next = prev + 1;
          if (next === KONAMI.length) {
            setShowParticles(true);
            setTimeout(() => setShowParticles(false), 5000);
            return 0;
          }
          return next;
        }
        return e.key === KONAMI[0] ? 1 : 0;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Secret click on footer year
  const [spin, setSpin] = useState(false);

  const handleFooterClick = useCallback(() => {
    if (spin) return;
    setClickCount((c) => {
      if (c + 1 >= 5) {
        setSpin(true);
        setTimeout(() => setSpin(false), 1000);
        return 0;
      }
      return c + 1;
    });
  }, [spin]);

  return (
    <>
      {/* Particle effect from Konami code */}
      <AnimatePresence>
        {showParticles && (
          <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <Particle key={i} delay={i * 0.08} />
            ))}
            <motion.p
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-2xl font-bold text-foreground"
            >
              🚀 Aerospace Mode Activated
            </motion.p>
          </div>
        )}
      </AnimatePresence>

      {/* Footer with secret click */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © <span onClick={handleFooterClick} className="cursor-default select-none">2026</span> Juan Ignacio Ramos
          </p>
          <p className="text-xs">
            Built with passion · Montevideo, Uruguay
          </p>
        </div>
      </footer>
    </>
  );
};
