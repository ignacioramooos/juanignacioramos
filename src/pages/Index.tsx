import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { HighlightReel } from "@/components/sections/HighlightReel";
import { About } from "@/components/sections/About";
import { WhatDrivesMe } from "@/components/sections/WhatDrivesMe";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Volunteering } from "@/components/sections/Volunteering";
import { Athletics } from "@/components/sections/Athletics";
import { Awards } from "@/components/sections/Awards";
import { DailyQuotes } from "@/components/sections/DailyQuotes";
import { Contact } from "@/components/sections/Contact";
import { EasterEggs } from "@/components/EasterEggs";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <HighlightReel />
      <About />
      <WhatDrivesMe />
      <Experience />
      <Education />
      <Skills />
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
