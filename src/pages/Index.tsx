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
import { personJsonLd, websiteJsonLd } from "@/data/profile";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Juan Ignacio Ramos - Portfolio"
        description="Juan Ignacio Ramos is an aspiring aerospace engineer from Montevideo, Uruguay. Explore his portfolio, aerospace projects, leadership experience, French BAC Mention Très Bien, and Advanced Space Academy scholarship."
        keywords="Juan Ignacio Ramos, aspiring aerospace engineer, aerospace engineering student Uruguay, Advanced Space Academy Scholar, French BAC Mention Tres Bien, MUN Secretary General, Cor Ad Cor peer support, Foro Agora, rocketry simulation, Montevideo engineering student"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            personJsonLd,
            websiteJsonLd,
            {
              "@type": "ProfilePage",
              "@id": "https://juanignacioramos.com/#profile-page",
              url: "https://juanignacioramos.com/",
              name: "Juan Ignacio Ramos - Portfolio",
              mainEntity: { "@id": "https://juanignacioramos.com/#person" },
            },
          ],
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
