import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { en } from "./translations/en";
import { es } from "./translations/es";

export type Language = "en" | "es";

// Helper type for nested access
type NestedObj = { [key: string]: string | string[] | NestedObj | NestedObj[] };
type Translations = typeof en;

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = { en, es };

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "es") return stored;
    return navigator.language.startsWith("es") ? "es" : "en";
  });

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
