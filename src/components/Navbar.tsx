import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const ungroupedBefore = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
];

const projectsGroup = [
  { label: "Projects", href: "/projects" },
];

const contentGroup = [
  { label: "Colleges", href: "/colleges" },
  { label: "Blog", href: "/blog" },
  { label: "Documents", href: "/documents" },
];

const ungroupedAfter = [
  { label: "Contact", href: "/contact" },
];

const allLinks = [...ungroupedBefore, ...projectsGroup, ...contentGroup, ...ungroupedAfter];

export const Navbar = () => {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#") && location.pathname === "/") {
      const el = document.querySelector(href.replace("/", ""));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderLink = (l: { label: string; href: string }) => (
    <Link
      key={l.href}
      to={l.href}
      onClick={() => handleClick(l.href)}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {l.label}
    </Link>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-lg font-bold tracking-tight">
          JIR
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {ungroupedBefore.map(renderLink)}

          {/* Projects glass pill */}
          <div className="glass-pill flex items-center gap-2">
            {projectsGroup.map(renderLink)}
          </div>

          {/* Colleges/Blog/Documents glass pill */}
          <div className="glass-pill flex items-center gap-3">
            {contentGroup.map(renderLink)}
          </div>

          {ungroupedAfter.map(renderLink)}

          <button
            onClick={toggle}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            title="Toggle theme (Ctrl+D)"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggle} className="p-2 rounded-full hover:bg-muted transition-colors">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {ungroupedBefore.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => handleClick(l.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {l.label}
                </Link>
              ))}

              {/* Projects group */}
              <div className="glass-pill my-1 py-2 px-3 flex flex-col gap-1">
                {projectsGroup.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => handleClick(l.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              {/* Content group */}
              <div className="glass-pill my-1 py-2 px-3 flex flex-col gap-1">
                {contentGroup.map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => handleClick(l.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              {ungroupedAfter.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => handleClick(l.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
