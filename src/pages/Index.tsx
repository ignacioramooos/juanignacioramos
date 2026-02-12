import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Volunteering } from "@/components/sections/Volunteering";
import { Athletics } from "@/components/sections/Athletics";
import { Awards } from "@/components/sections/Awards";
import { Contact } from "@/components/sections/Contact";
import { EasterEggs } from "@/components/EasterEggs";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <Volunteering />
      <Athletics />
      <Awards />
      <Contact />
      <EasterEggs />
    </main>
  );
};

export default Index;
