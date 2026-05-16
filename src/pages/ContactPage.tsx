import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/sections/Contact";
import { SEOHead } from "@/components/SEOHead";

const ContactPage = () => (
  <main className="min-h-screen bg-background text-foreground">
    <SEOHead
      title="Contact — Juan Ignacio Ramos"
      description="Get in touch with Juan Ignacio Ramos for collaborations, mentorship, speaking, or engineering project requests."
    />
    <Navbar />
    <div className="pt-16">
      <Contact />
    </div>
  </main>
);

export default ContactPage;
