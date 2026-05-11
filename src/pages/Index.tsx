import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HighlightReel } from "@/components/sections/HighlightReel";
import { About } from "@/components/sections/About";
import { WhatDrivesMe } from "@/components/sections/WhatDrivesMe";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ProBono } from "@/components/sections/ProBono";
import { Volunteering } from "@/components/sections/Volunteering";
import { Athletics } from "@/components/sections/Athletics";
import { Awards } from "@/components/sections/Awards";
import { FeaturedIn } from "@/components/sections/FeaturedIn";
import { DailyQuotes } from "@/components/sections/DailyQuotes";
import { Contact } from "@/components/sections/Contact";
import { EasterEggs } from "@/components/EasterEggs";
import { SEOHead } from "@/components/SEOHead";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Juan Ignacio Ramos - Portfolio"
        description="Juan Ignacio Ramos is an aspiring aerospace engineer from Montevideo, Uruguay. Explore his portfolio, aerospace projects, leadership experience, French BAC Mention Très Bien, and Advanced Space Academy scholarship."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Juan Ignacio Ramos",
          jobTitle: "Aspiring Aerospace Engineer",
          description: "Juan Ignacio Ramos is an aspiring aerospace engineer from Montevideo, Uruguay.",
          url: "https://juanignacioramos.com",
          sameAs: [
            "https://www.linkedin.com/in/juanignacioramos1/",
            "https://instagram.com/ignacio.ramooos",
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Montevideo",
            addressCountry: "UY",
          },
          knowsAbout: [
            "Aerospace engineering",
            "Leadership",
            "Model United Nations",
            "Engineering simulations",
            "Web development",
          ],
          knowsLanguage: ["Spanish", "French", "English", "Portuguese"],
        }}
      />
      <Navbar />
      <Hero />
      <HighlightReel />
      <About />
      <WhatDrivesMe />
      <Experience />
      <Education />
      <Skills />
      <ServicesPreview />
      <ProBono />
      <Volunteering />
      <Athletics />
      <Awards />
      <FeaturedIn />
      <DailyQuotes />
      <Contact />
      <EasterEggs />
    </main>
  );
};

export default Index;
