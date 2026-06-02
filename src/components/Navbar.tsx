import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X, ChevronDown, Languages } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

export const Navbar = () => {
  const { theme, toggle } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const portfolioItems = [
    { label: t.about.label, href: "/#about" },
    { label: t.drives.title, href: "/#what-drives-me" },
    { label: t.experience.title, href: "/#experience" },
    { label: t.education.title, href: "/#education" },
    { label: t.skills.title, href: "/#skills" },
    { label: t.volunteering.title, href: "/#volunteering" },
    { label: t.athletics.title, href: "/#athletics" },
    { label: t.awards.title, href: "/#awards" },
    { label: "Profile", href: "/profile" },
  ];

  const projectsGroup = [
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.services, href: "/services" },
  ];

  const contentGroup = [
    { label: t.nav.colleges, href: "/colleges" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.documents, href: "/documents" },
    { label: t.nav.lab, href: "/lab" },
    { label: t.nav.ideas, href: "/ideas" },
  ];

  const ungroupedAfter = [
    { label: t.nav.contact, href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      className="text-[13px] lg:text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
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
        <Link to="/" className="font-display text-lg font-bold tracking-tight relative">
          JIR
          <svg
            className="absolute -right-3 top-1/2 -translate-y-1/2 opacity-20"
            width="12" height="12" viewBox="0 0 12 12"
          >
            <path d="M2 10 Q6 2 10 6" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <circle cx="10" cy="6" r="1.5" fill="currentColor" />
          </svg>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-4 xl:gap-6">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setPortfolioOpen(!portfolioOpen)}
              className="text-[13px] lg:text-[15px] font-semibold text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              {t.nav.portfolio}
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

          <div className="glass-pill flex items-center gap-1.5 lg:gap-2">
            {projectsGroup.map(renderLink)}
          </div>

          <div className="glass-pill flex items-center gap-1.5 lg:gap-2">
            {contentGroup.map(renderLink)}
          </div>

          {ungroupedAfter.map(renderLink)}

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="p-2 rounded-full hover:bg-muted transition-colors flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
            title={t.common.language}
          >
            <Languages size={16} />
            <span className="uppercase">{lang === "en" ? "ES" : "EN"}</span>
          </button>

          <button
            onClick={toggle}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            title={t.nav.toggleTheme}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="p-2 rounded-full hover:bg-muted transition-colors text-xs font-medium text-muted-foreground"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
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
              <button
                onClick={() => setMobilePortfolioOpen(!mobilePortfolioOpen)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2 flex items-center justify-between"
              >
                {t.nav.portfolio}
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

              <div className="glass-pill my-1 py-2 px-3 flex flex-col gap-1">
                {projectsGroup.map((l) => (
                  <Link key={l.href} to={l.href} onClick={() => handleClick(l.href)} className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                    {l.label}
                  </Link>
                ))}
              </div>

              <div className="glass-pill my-1 py-2 px-3 flex flex-col gap-1">
                {contentGroup.map((l) => (
                  <Link key={l.href} to={l.href} onClick={() => handleClick(l.href)} className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                    {l.label}
                  </Link>
                ))}
              </div>

              {ungroupedAfter.map((l) => (
                <Link key={l.href} to={l.href} onClick={() => handleClick(l.href)} className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
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
