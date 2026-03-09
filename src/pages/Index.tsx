import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HighlightReel } from "@/components/sections/HighlightReel";
import { About } from "@/components/sections/About";
import { WhatDrivesMe } from "@/components/sections/WhatDrivesMe";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { InteractiveTimeline } from "@/components/sections/InteractiveTimeline";
import { Volunteering } from "@/components/sections/Volunteering";
import { Athletics } from "@/components/sections/Athletics";
import { Awards } from "@/components/sections/Awards";
import { DailyQuotes } from "@/components/sections/DailyQuotes";
import { Contact } from "@/components/sections/Contact";
import { EasterEggs } from "@/components/EasterEggs";
import { SEOHead } from "@/components/SEOHead";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Juan Ignacio Ramos — Aspiring Aerospace Engineer"
        description="Portfolio of Juan Ignacio Ramos — Aspiring Aerospace Engineer from Montevideo, Uruguay. French BAC Mention Très Bien, Space Academy Scholar, MUN Secretary General."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Juan Ignacio Ramos",
          jobTitle: "Aspiring Aerospace Engineer",
          url: "https://juanignacioramos.lovable.app",
          sameAs: [
            "https://www.linkedin.com/in/ignacio-ramos-8361a52b6/",
            "https://instagram.com/ignacio.ramooos",
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Montevideo",
            addressCountry: "UY",
          },
          knowsLanguage: ["Spanish", "French", "English", "Portuguese"],
        }}
      />
      <Navbar />
      <Hero />
      <HighlightReel />
      <About />
      <WhatDrivesMe />
      <InteractiveTimeline />
      <Experience />
      <Education />
      <Skills />
      <ServicesPreview />
      <Volunteering />
      <Athletics />
      <Awards />
      <DailyQuotes />
      <Contact />
      <EasterEggs />
    </main>
  );
};

export default Index;
