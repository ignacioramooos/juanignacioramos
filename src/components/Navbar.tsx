import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const portfolioItems = [
  { label: "About Me", href: "/#about" },
  { label: "What Drives Me", href: "/#what-drives-me" },
  { label: "Experience", href: "/#experience" },
  { label: "Education", href: "/#education" },
  { label: "Skills", href: "/#skills" },
  { label: "Volunteering & Leadership", href: "/#volunteering" },
  { label: "Athletics", href: "/#athletics" },
  { label: "Awards & Honors", href: "/#awards" },
];

const projectsGroup = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
];

const contentGroup = [
  { label: "Colleges", href: "/colleges" },
  { label: "Blog", href: "/blog" },
  { label: "Documents", href: "/documents" },
  { label: "Lab", href: "/lab" },
  { label: "Ideas", href: "/ideas" },
];

const ungroupedAfter = [
  { label: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPortfolioOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    setPortfolioOpen(false);
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
        {/* Logo with subtle trail accent */}
        <Link to="/" className="font-display text-lg font-bold tracking-tight relative">
          JIR
          <svg
            className="absolute -right-3 top-1/2 -translate-y-1/2 opacity-20"
            width="12" height="12" viewBox="0 0 12 12"
          >
            <path
              d="M2 10 Q6 2 10 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <circle cx="10" cy="6" r="1.5" fill="currentColor" />
          </svg>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {/* Portfolio dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setPortfolioOpen(!portfolioOpen)}
              className="text-[15px] font-semibold text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"
            >
              Portfolio
              <ChevronDown size={14} className={`transition-transform duration-200 ${portfolioOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {portfolioOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 left-0 glass-pill !rounded-xl !px-0 !py-1 min-w-[200px]"
                >
                  {portfolioItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => handleClick(item.href)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
              {/* Portfolio accordion */}
              <button
                onClick={() => setMobilePortfolioOpen(!mobilePortfolioOpen)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 flex items-center justify-between"
              >
                Portfolio
                <ChevronDown size={14} className={`transition-transform duration-200 ${mobilePortfolioOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobilePortfolioOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pl-4 flex flex-col gap-0.5 overflow-hidden"
                  >
                    {portfolioItems.map((l) => (
                      <Link
                        key={l.href}
                        to={l.href}
                        onClick={() => handleClick(l.href)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

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
