import { Home, Rocket, Compass, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const exploreLinks = [
  { label: "Colleges", href: "/colleges" },
  { label: "Blog", href: "/blog" },
  { label: "Documents", href: "/documents" },
];

export const MobileBottomNav = () => {
  const location = useLocation();
  const [exploreOpen, setExploreOpen] = useState(false);

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Explore popup */}
      <AnimatePresence>
        {exploreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setExploreOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-20 left-0 right-0 z-50 md:hidden flex justify-center px-4"
            >
              {exploreLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setExploreOpen(false)}
                  className={`text-sm px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    isActive(l.href) ? "text-foreground font-medium bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom nav bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden pb-safe">
        <div className="mx-4 mb-3 glass-pill flex items-center justify-around py-2 px-2">
          <Link
            to="/"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
              isActive("/") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <Home size={18} />
            <span className="text-[10px]">Home</span>
          </Link>

          <Link
            to="/projects"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
              isActive("/projects") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <Rocket size={18} />
            <span className="text-[10px]">Projects</span>
          </Link>

          <button
            onClick={() => setExploreOpen(!exploreOpen)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
              exploreOpen || ["/colleges", "/blog", "/documents"].includes(location.pathname)
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            <Compass size={18} />
            <span className="text-[10px]">Explore</span>
          </button>

          <Link
            to="/contact"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
              isActive("/contact") ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <Mail size={18} />
            <span className="text-[10px]">Contact</span>
          </Link>
        </div>
      </nav>
    </>
  );
};
