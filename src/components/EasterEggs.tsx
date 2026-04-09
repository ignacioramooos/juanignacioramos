/**
 * EasterEggs.tsx
 *
 * ═══════════════════════════════════════════════════════════
 *  SETUP — add these data attributes in your other components:
 *
 *  Header name element:
 *    <span data-easter-egg="header-name">Juan Ignacio Ramos</span>
 *
 *  Investment Research service card:
 *    <div data-easter-egg="investment-card"> ... </div>
 *
 * ═══════════════════════════════════════════════════════════
 *
 *  FULL LIST OF EASTER EGGS:
 *
 *  1. Konami Code (↑↑↓↓←→←→BA)
 *     → 80 rockets fly up the screen (pure visual, no text)
 *
 *  2. Footer year — click 5×
 *     → entire page does a 360° spin
 *
 *  3. Type "bear" or "red" anywhere
 *     → Investment Research card crashes down then bounces back
 *
 *  4. Hover over your name in the header for 3 seconds
 *     → A rocket launches from bottom to top with smoke trail
 *
 *  5. Console Easter Egg (passive — always active)
 *     → Opening DevTools reveals ASCII art + challenge
 *
 * ═══════════════════════════════════════════════════════════
 */

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const CONSOLE_ART = `
%c
 Holaaa, veo que echas un ojo por aca!
  ─────────────────────────────────────────────
  Esta muy bien. Otro fellow dev.
  Aca te dejo el url del repo: 👇
  https://github.com/ignacioramooos/juanignacioramos.git
  ─────────────────────────────────────────────
  De paso te propongo un reto: ¿podes encontrar todos los easter eggs?
`;

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Single rocket for the Konami storm */
const KonamiRocket = ({ delay }: { delay: number }) => {
  const x = Math.random() * 100;
  const size = Math.random() * 4 + 8; // 8–12px

  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{ left: `${x}%`, bottom: -20 }}
      initial={{ y: 0, opacity: 0, rotate: 0 }}
      animate={{ y: "-130vh", opacity: [0, 1, 1, 0], rotate: [0, 360] }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay: delay * 2,
        ease: "easeOut",
      }}
    >
      <Rocket size={size} className="text-foreground -rotate-45" />
    </motion.div>
  );
};

/** Smoke puff for the name-hover rocket trail */
const SmokePuff = ({ index }: { index: number }) => (
  <motion.div
    className="absolute left-1/2 -translate-x-1/2 rounded-full bg-muted-foreground/40 pointer-events-none"
    style={{ width: 8 + index * 4, height: 8 + index * 4, bottom: -index * 14 }}
    initial={{ opacity: 0.7, scale: 1 }}
    animate={{ opacity: 0, scale: 2.5, y: 20 }}
    transition={{ duration: 1.2, delay: index * 0.08, ease: "easeOut" }}
  />
);

// ─── Main component ───────────────────────────────────────────────────────────

export const EasterEggs = () => {
  // 1. Konami
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [showKonami, setShowKonami] = useState(false);

  // 2. Footer click counter
  const [clickCount, setClickCount] = useState(0);
  const [spin, setSpin] = useState(false);

  // 3. Market crash
  const [showCrash, setShowCrash] = useState(false);
  const crashLocked = useRef(false);

  // 4. Name hover rocket
  const [showNameRocket, setShowNameRocket] = useState(false);
  const nameHoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── 5. Console Easter Egg ────────────────────────────────────────────────
  useEffect(() => {
    console.log(
      CONSOLE_ART,
      "color: #7c3aed; font-size: 13px; font-weight: bold; font-family: monospace;"
    );
  }, []);

  // ── 1. Konami code ────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const pressed = e.key.toLowerCase();
      const target = KONAMI[konamiProgress].toLowerCase();

      if (pressed === target) {
        const next = konamiProgress + 1;
        if (next === KONAMI.length) {
          setShowKonami(true);
          setTimeout(() => setShowKonami(false), 15000);
          setKonamiProgress(0);
          return;
        }
        setKonamiProgress(next);
      } else {
        setKonamiProgress(pressed === KONAMI[0].toLowerCase() ? 1 : 0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [konamiProgress]);

  // ── 3. Typed word detection ("bear" / "red") ──────────────────────────────
  const triggerMarketCrash = useCallback(() => {
    const card = document.querySelector<HTMLElement>('[data-easter-egg="investment-card"]');
    if (!card) return;

    crashLocked.current = true;
    setShowCrash(true);

    card.style.transition = "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.3s";
    card.style.transform = "translateY(220px) rotate(-6deg) scale(0.95)";
    card.style.filter = "brightness(0.7) saturate(2)";

    setTimeout(() => {
      card.style.transition = "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.6s";
      card.style.transform = "translateY(0px) rotate(0deg) scale(1)";
      card.style.filter = "";
    }, 1300);

    setTimeout(() => {
      card.style.transition = "";
      setShowCrash(false);
      crashLocked.current = false;
    }, 2600);
  }, []);

  useEffect(() => {
    let buffer = "";
    const handler = (e: KeyboardEvent) => {
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-6);
      if (!crashLocked.current && (buffer.includes("bear") || buffer.includes("red"))) {
        buffer = "";
        triggerMarketCrash();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [triggerMarketCrash]);

  // ── 4. Name hover — wire up listener ──────────────────────────────────────
  const handleNameEnter = useCallback(() => {
    nameHoverTimer.current = setTimeout(() => {
      setShowNameRocket(true);
      setTimeout(() => setShowNameRocket(false), 4000);
    }, 3000);
  }, []);

  const handleNameLeave = useCallback(() => {
    if (nameHoverTimer.current) clearTimeout(nameHoverTimer.current);
  }, []);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>('[data-easter-egg="header-name"]');
    if (!el) return;
    el.addEventListener("mouseenter", handleNameEnter);
    el.addEventListener("mouseleave", handleNameLeave);
    return () => {
      el.removeEventListener("mouseenter", handleNameEnter);
      el.removeEventListener("mouseleave", handleNameLeave);
    };
  }, [handleNameEnter, handleNameLeave]);

  // ── 2. Footer year click ──────────────────────────────────────────────────
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

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Easter Egg 1: Konami rocket storm (pure visual) ───────────────── */}
      <AnimatePresence>
        {showKonami && (
          <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
            {[...Array(80)].map((_, i) => (
              <KonamiRocket key={i} delay={i * 0.15} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* ── Easter Egg 4: Name-hover rocket launch ────────────────────────── */}
      <AnimatePresence>
        {showNameRocket && (
          <motion.div
            className="fixed left-1/2 z-[9999] pointer-events-none select-none"
            style={{ bottom: 0, x: "-50%" }}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: "-115vh", opacity: [1, 1, 1, 0] }}
            transition={{ duration: 3.2, ease: [0.2, 0, 0.8, 1] }}
          >
            <Rocket size={24} className="text-foreground -rotate-45" />
            {[...Array(10)].map((_, i) => (
              <SmokePuff key={i} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Footer (Easter Egg 2 trigger) ─────────────────────────────────── */}
      <footer className={`py-8 px-6 border-t border-border mt-auto transition-transform duration-1000 ${spin ? "rotate-[360deg]" : ""}`}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            ©{" "}
            <span
              onClick={handleFooterClick}
              className="cursor-default select-none font-medium hover:text-foreground transition-colors"
            >
              2026
            </span>{" "}
            Juan Ignacio Ramos
          </p>
          <p className="text-xs">Built with passion · Montevideo, Uruguay</p>
        </div>
      </footer>
    </>
  );
};
