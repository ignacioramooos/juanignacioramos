export interface Translations {
  nav: { portfolio: string; projects: string; services: string; colleges: string; blog: string; documents: string; lab: string; ideas: string; contact: string; toggleTheme: string };
  mobileNav: { home: string; projects: string; services: string; explore: string; contact: string };
  hero: { location: string; tagline: string; subtitle: string; exploreWork: string; servicesOffer: string; getInTouch: string; pills: string[] };
  highlights: { spaceAcademy: string; spaceAcademyDetail: string; bac: string; bacDetail: string; mun: string; munDetail: string; waterPolo: string; waterPoloDetail: string };
  about: { label: string; title: string; motto: string; p1: string; p2: string; p3: string; stats: { languages: string; languagesDesc: string; usdManaged: string; usdManagedDesc: string; attendeesLed: string; attendeesLedDesc: string; keyHonors: string; keyHonorsDesc: string } };
  drives: { label: string; title: string; items: { title: string; desc: string }[] };
  timeline: { label: string; title: string; ariaLabel: string; scrubberLabel: string };
  experience: { label: string; title: string };
  education: { label: string; title: string; nextChapter: string; nextChapterSub: string; nextChapterNote: string; nextChapterBullets: string[]; quote: string };
  skills: { label: string; title: string };
  servicesPreview: { label: string; title: string; viewAll: string; viewAllServices: string };
  volunteering: { label: string; title: string };
  athletics: { label: string; title: string };
  awards: { label: string; title: string };
  quotes: { title: string; prev: string; next: string };
  contact: { label: string; title: string; namePlaceholder: string; emailPlaceholder: string; messagePlaceholder: string; send: string; sending: string; sent: string; error: string; contactInfo: string; social: string; askAI: string; closeChat: string; aiTitle: string; aiWelcome: string; aiPlaceholder: string; aiThinking: string };
  servicesPage: { label: string; title: string; description: string; learnMore: string };
  serviceDetail: { allServices: string; whoItsFor: string; useCases: string; deliverables: string; pricing: string; businessFeatures: string; bundleTitle: string; bundleDesc: string; timelinesTitle: string; timelines: string[] };
  serviceForm: { title: string; subtitle: string; name: string; email: string; description: string; budget: string; selectBudget: string; deadline: string; industry: string; industryPlaceholder: string; submit: string; submitting: string; success: string; error: string };
  printQuote: { title: string; subtitle: string; material: string; weight: string; printTime: string; estimatedTotal: string; estPrintTime: string; materialCost: string; note: string };
  proBono: { label: string; title: string; p1: string; p2: string; areas: string[]; cta: string; ctaLink: string };
  notFound: { title: string; back: string };
  common: { language: string };
}

export const en: Translations = {
  nav: { portfolio: "Portfolio", projects: "Projects", services: "Services", colleges: "Colleges", blog: "Blog", documents: "Documents", lab: "Lab", ideas: "Ideas", contact: "Contact", toggleTheme: "Toggle theme (Ctrl+D)" },
  mobileNav: { home: "Home", projects: "Projects", services: "Services", explore: "Explore", contact: "Contact" },
  hero: { location: "Montevideo, Uruguay", tagline: "Building the path to aerospace engineering in Uruguay", subtitle: "Aspiring Aerospace Engineer · Learner · Problem Solver", exploreWork: "Explore My Work", servicesOffer: "Services I Offer", getInTouch: "Get in Touch", pills: ["Aerospace", "Systems Thinking", "Leadership", "Real-world Impact"] },
  highlights: { spaceAcademy: "Advanced Space Academy Scholar", spaceAcademyDetail: "Huntsville, Alabama", bac: 'French BAC "Mention Très Bien"', bacDetail: "Top 10–15%", mun: "MUN Secretary General", munDetail: "International leadership", waterPolo: "National Water Polo Pre-selection", waterPoloDetail: "Elite discipline" },
  about: {
    label: "About Me", title: "Mind & Hand", motto: "Mens et Manus",
    p1: "I'm an aspiring Aerospace Engineer from Montevideo, Uruguay, with a documented record of managing high-stakes logistical projects and developing complex technical simulations. I graduated with the French Baccalaureate \"Mention Très Bien\" (Highest Honors — top 10-15%) and received the Advanced Space Academy Scholarship in Huntsville, Alabama.",
    p2: "My expertise spans fiduciary management of 1,380,000+ UYU (~$35,000 USD), technical modeling with Python and 6-DOF simulations, and international leadership as Model UN Secretary General. I'm fluent in four languages and guided by the \"Mens et Manus\" principle — applying both mind and hand to solve structural challenges in aerospace and sustainable infrastructure.",
    p3: "Currently enrolled in Physical & Mathematical Engineering at Universidad de la República (UdelaR), I'm building a rigorous quantitative foundation for my goal: to promote an aerospace industry in Uruguay and design space vehicles.",
    stats: { languages: "Languages", languagesDesc: "Spanish · French · English · Portuguese", usdManaged: "USD Managed", usdManagedDesc: "Event operations & logistics", attendeesLed: "Attendees Led", attendeesLedDesc: "Across events I organized", keyHonors: "Key Honors", keyHonorsDesc: "BAC Honors · Space Academy · MUN SG" },
  },
  drives: { label: "Purpose", title: "What Drives Me", items: [
    { title: "Building an aerospace future in South America", desc: "Pioneering the path where none exists yet." },
    { title: "Applying engineering to humanitarian challenges", desc: "From drone surveys for housing to infrastructure solutions." },
    { title: "Designing systems that combine sustainability and performance", desc: "Waste-to-filament, circular economy, real impact." },
    { title: "Leading teams under pressure and uncertainty", desc: "MUN delegations, event logistics, competitive sports." },
  ]},
  timeline: { label: "Journey", title: "The Path So Far", ariaLabel: "Interactive timeline of Juan's journey", scrubberLabel: "Timeline scrubber" },
  experience: { label: "Career Path", title: "Experience" },
  education: { label: "Foundation", title: "Education", nextChapter: "Next Chapter", nextChapterSub: "U.S. College — Class of 2030", nextChapterNote: "Awaiting admissions decisions", nextChapterBullets: ["Applying to top engineering programs", "The journey never stops loading..."], quote: '"The educational journey is never over."' },
  skills: { label: "Capabilities", title: "Skills" },
  servicesPreview: { label: "Professional", title: "Services I Offer", viewAll: "View all", viewAllServices: "View all services" },
  volunteering: { label: "Impact", title: "Volunteering & Leadership" },
  athletics: { label: "Discipline", title: "Athletics" },
  awards: { label: "Recognition", title: "Awards & Honors" },
  quotes: { title: "In My Own Words — Today's Quote", prev: "Previous quote", next: "Next quote" },
  contact: { label: "Connect", title: "Get in Touch", namePlaceholder: "Your name", emailPlaceholder: "Your email", messagePlaceholder: "Your message", send: "Send Message", sending: "Sending...", sent: "Message sent! I'll get back to you soon.", error: "Failed to send message. Please try again.", contactInfo: "Contact Info", social: "Social", askAI: "Ask my AI Assistant", closeChat: "Close Chat", aiTitle: "AI Assistant", aiWelcome: "👋 Hi! Ask me anything about Ignacio — his skills, projects, experience, or education.", aiPlaceholder: "Type a question...", aiThinking: "Thinking..." },
  servicesPage: { label: "Professional", title: "Services", description: "From web design to drone videography, 3D printing to AI automation — I offer professional services grounded in engineering rigor and creative problem-solving.", learnMore: "Learn more" },
  serviceDetail: { allServices: "All Services", whoItsFor: "Who It's For", useCases: "Example Use Cases", deliverables: "Deliverables", pricing: "💰 Pricing Guidance", businessFeatures: "Business Features Included", bundleTitle: "📦 Website + Automation Bundle", bundleDesc: "Get a website with fully wired automations: forms → Google Sheets/CRM → email/WhatsApp notifications via Zapier, Make, or Google Apps Script. Perfect for lead-generating businesses.", timelinesTitle: "⏱️ Typical Timelines", timelines: ["Single-page site: 3–5 business days", "Multi-page with CMS: 1–2 weeks", "Website + Automation bundle: 2–3 weeks"] },
  serviceForm: { title: "Request This Service", subtitle: "Fill out the form below and I'll get back to you within 24 hours.", name: "Name", email: "Email", description: "Describe your project", budget: "Budget Range", selectBudget: "Select range", deadline: "Deadline (optional)", industry: "Industry", industryPlaceholder: "e.g. Real Estate, Education", submit: "Submit Request", submitting: "Submitting...", success: "Request submitted! I'll be in touch within 24 hours.", error: "Something went wrong. Please try again." },
  printQuote: { title: "Quick Quote Estimator", subtitle: "Rough estimate based on weight, material, and print time. Final price may vary.", material: "Material", weight: "Part Weight", printTime: "Estimated Print Time", estimatedTotal: "Estimated Total", estPrintTime: "Est. Print Time", materialCost: "Material Cost", note: "* This is a rough estimate. Upload your STL file in the request form below for a precise quote." },
  proBono: { label: "Pro Bono", title: "Engineering for Impact", p1: "I provide my professional services free of charge to non-profit organizations driving measurable change. This is not about goodwill — it's about deploying real skills where they create the most impact.", p2: "If your organization operates in one of the areas below and needs web design, drone mapping, 3D prototyping, or automation support, I want to hear from you.", areas: ["Education & Access", "Environmental Sustainability", "Innovation & Technology", "Community Development"], cta: "Non-profit organizations can request services through the standard project intake process.", ctaLink: "Explore Services" },
  notFound: { title: "Page not found", back: "Go back home" },
  common: { language: "Language" },
};
