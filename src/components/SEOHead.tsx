import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
  jsonLd?: Record<string, any>;
}

export const SEOHead = ({
  title = "Juan Ignacio Ramos — Aspiring Aerospace Engineer",
  description = "Portfolio of Juan Ignacio Ramos — Aspiring Aerospace Engineer from Montevideo, Uruguay. French BAC Mention Très Bien, Space Academy Scholar, MUN Secretary General.",
  path,
  type = "website",
  jsonLd,
}: SEOHeadProps) => {
  const location = useLocation();
  const currentPath = path || location.pathname;
  const canonicalUrl = `https://juanignacioramos.com${currentPath}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", type, true);
    setMeta("og:url", canonicalUrl, true);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // JSON-LD structured data
    const existingLd = document.querySelector('script[data-seo-ld]');
    if (existingLd) existingLd.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-ld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const ld = document.querySelector('script[data-seo-ld]');
      if (ld) ld.remove();
    };
  }, [title, description, canonicalUrl, type, jsonLd]);

  return null;
};
