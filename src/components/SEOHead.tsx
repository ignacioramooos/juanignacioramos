import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

interface SEOHeadProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
  keywords?: string;
  image?: string;
  jsonLd?: { [key: string]: JsonLdValue };
}

export const SEOHead = ({
  title = "Juan Ignacio Ramos - Portfolio",
  description = "Juan Ignacio Ramos is an aspiring aerospace engineer from Montevideo, Uruguay. Portfolio highlights include French BAC Mention Très Bien, Advanced Space Academy Scholar, and MUN Secretary General.",
  path,
  type = "website",
  keywords,
  image = "https://juanignacioramos.com/favicon.png",
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
    setMeta("og:image", image, true);
    setMeta("twitter:card", "summary");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
    setMeta("author", "Juan Ignacio Ramos");
    setMeta("application-name", "Juan Ignacio Ramos");
    if (keywords) setMeta("keywords", keywords);

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
  }, [title, description, canonicalUrl, type, keywords, image, jsonLd]);

  return null;
};
