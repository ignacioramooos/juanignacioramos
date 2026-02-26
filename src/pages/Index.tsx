import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Volunteering } from "@/components/sections/Volunteering";
import { Athletics } from "@/components/sections/Athletics";
import { Awards } from "@/components/sections/Awards";
import { EasterEggs } from "@/components/EasterEggs";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Skills />
      <Volunteering />
      <Athletics />
      <Awards />

      {/* Brief contact snippet */}
      <section className="py-16 px-6 text-center">
        <p className="text-muted-foreground mb-4">Want to get in touch?</p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          Contact Me <ArrowRight size={14} />
        </Link>
      </section>

      <EasterEggs />
    </main>
  );
};

export default Index;
