import { Home, Orbit, Briefcase, Constellation, Mail, ArrowRight } from "@/components/icons";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

const spring = { type: "spring", bounce: 0, duration: 0.35 } as const;

export const MobileBottomNav = () => {
  const location = useLocation();
  const [exploreOpen, setExploreOpen] = useState(false);
  const { t } = useLanguage();
  const reduce = useReducedMotion();

  useEffect(() => setExploreOpen(false), [location.pathname]);

  // INTENTIONAL: 'Colleges' link is hidden by owner request. Do NOT re-add without explicit owner ask.
  const exploreLinks = [
    { label: t.nav.resume, href: "/resume" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.documents, href: "/documents" },
    { label: t.nav.lab, href: "/lab" },
    { label: t.nav.ideas, href: "/ideas" },
  ];
  const explorePaths = exploreLinks.map((l) => l.href);
  const path = location.pathname;

  const activeKey = exploreOpen
    ? "explore"
    : path === "/" ? "home"
    : path.startsWith("/projects") ? "projects"
    : path.startsWith("/services") ? "services"
    : path.startsWith("/contact") ? "contact"
    : explorePaths.some((p) => path.startsWith(p)) ? "explore"
    : "";

  const items = [
    { key: "home", label: t.mobileNav.home, Icon: Home, to: "/" },
    { key: "projects", label: t.mobileNav.projects, Icon: Orbit, to: "/projects" },
    { key: "services", label: t.mobileNav.services, Icon: Briefcase, to: "/services" },
    { key: "explore", label: t.mobileNav.explore, Icon: Constellation },
    { key: "contact", label: t.mobileNav.contact, Icon: Mail, to: "/contact" },
  ];

  const itemClass = (active: boolean) =>
    `relative flex min-h-[48px] min-w-[56px] flex-1 flex-col items-center justify-center gap-1 rounded-2xl transition-[color,transform] duration-150 ease-out active:scale-[0.94] ${
      active ? "text-foreground" : "text-muted-foreground"
    }`;

  const Indicator = () => (
    <motion.span
      layoutId="mobile-nav-indicator"
      transition={reduce ? { duration: 0 } : spring}
      className="absolute -top-1 h-[2px] w-6 rounded-full bg-foreground"
      aria-hidden
    />
  );

  return (
    <>
      <AnimatePresence>
        {exploreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
              onClick={() => setExploreOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-label={t.mobileNav.explore}
              initial={reduce ? { opacity: 0 } : { y: "100%", opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { y: "100%", opacity: 0 }}
              transition={reduce ? { duration: 0.2 } : spring}
              className="fixed inset-x-3 z-50 md:hidden"
              style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 5.5rem)" }}
            >
              <ul className="glass-pill rounded-3xl p-2">
                {exploreLinks.map((l) => {
                  const active = path.startsWith(l.href);
                  return (
                    <li key={l.href}>
                      <Link
                        to={l.href}
                        onClick={() => setExploreOpen(false)}
                        className={`flex min-h-[48px] items-center justify-between rounded-2xl px-4 font-heading text-base tracking-tight transition-[background-color,transform] duration-150 ease-out active:scale-[0.98] ${
                          active ? "bg-muted text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {l.label}
                        <ArrowRight size={16} aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 md:hidden"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
      >
        <div className="mx-3 flex items-stretch justify-between gap-1 rounded-3xl px-1.5 py-1.5 glass-pill">
          {items.map(({ key, label, Icon, to }) => {
            const active = activeKey === key;
            const content = (
              <>
                {active && <Indicator />}
                <Icon size={22} weight={active ? "regular" : "light"} aria-hidden />
                <span className="font-heading text-[11px] leading-none tracking-tight">{label}</span>
              </>
            );
            return to ? (
              <Link key={key} to={to} aria-current={active ? "page" : undefined} className={itemClass(active)}>
                {content}
              </Link>
            ) : (
              <button
                key={key}
                type="button"
                onClick={() => setExploreOpen((o) => !o)}
                aria-expanded={exploreOpen}
                className={itemClass(active)}
              >
                {content}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
