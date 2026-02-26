import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/sections/Contact";

const ContactPage = () => (
  <main className="min-h-screen bg-background text-foreground">
    <Navbar />
    <div className="pt-16">
      <Contact />
    </div>
  </main>
);

export default ContactPage;
