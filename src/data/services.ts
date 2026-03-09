import {
  Globe, Camera, TrendingUp, CalendarDays, Users, Sheet,
  Bot, Printer
} from "lucide-react";

export interface ServiceData {
  slug: string;
  title: string;
  shortDescription: string;
  icon: any;
  description: string;
  whoItsFor: string[];
  useCases: string[];
  deliverables: string[];
  priceGuidance?: string;
}

export const services: ServiceData[] = [
  {
    slug: "web-design",
    title: "Web Design",
    shortDescription: "Business-integrated websites for startups, portfolios, and events with booking, lead capture, SEO, and automation bundles.",
    icon: Globe,
    description: "I build modern, fast, and conversion-focused websites tailored to your business needs. Every site includes lead capture, SEO basics, performance optimization, and optional integrations with Google Sheets, email, WhatsApp, and payment tools.",
    whoItsFor: ["Startups & small businesses", "Freelancers & creatives needing a portfolio", "Event organizers needing landing pages", "Anyone who needs a professional web presence"],
    useCases: [
      "Business website with booking/appointment integration",
      "Portfolio site with CMS for easy content updates",
      "Event landing page with RSVP and ticketing",
      "Lead capture site wired to Google Sheets or CRM",
    ],
    deliverables: [
      "Fully responsive website (mobile + desktop)",
      "SEO setup (meta tags, structured data, sitemap)",
      "Performance optimization (Lighthouse 90+)",
      "Lead capture forms with email notifications",
      "Google Sheets integration for leads (optional)",
      "Stripe/invoicing trigger options (optional)",
      "Training docs & handover session",
      "30-day post-launch support",
    ],
    priceGuidance: "Starting from $500 for a single-page site. Multi-page sites with automations from $1,000+. Website + Automation bundles from $1,500+.",
  },
  {
    slug: "drone-videography",
    title: "Drone Videography",
    shortDescription: "Aerial footage for events, real estate, construction surveys, and creative projects.",
    icon: Camera,
    description: "Professional drone videography and photography services. From event coverage to construction site surveys, I deliver high-quality aerial content with proper planning and safety protocols.",
    whoItsFor: ["Event organizers", "Real estate agencies", "Construction companies", "Content creators & filmmakers"],
    useCases: [
      "Aerial event documentation",
      "Real estate property tours",
      "Construction site progress monitoring",
      "Land surveying for logistics planning",
    ],
    deliverables: [
      "Pre-flight planning & shot list",
      "4K aerial footage (edited)",
      "High-resolution aerial photos",
      "Post-production editing",
      "Delivery in multiple formats",
    ],
    priceGuidance: "From $200 per session. Contact for custom packages.",
  },
  {
    slug: "investment-research",
    title: "Investment Research",
    shortDescription: "Data-driven research reports, market analysis, and financial modeling for informed investment decisions.",
    icon: TrendingUp,
    description: "Quantitative research and analysis to help you make data-driven investment decisions. Leveraging my background in mathematical engineering and Excel modeling expertise.",
    whoItsFor: ["Individual investors", "Small funds & family offices", "Students studying finance", "Startups evaluating markets"],
    useCases: [
      "Company or sector research reports",
      "Financial model building in Excel",
      "Market opportunity analysis",
      "Risk assessment frameworks",
    ],
    deliverables: [
      "Detailed research report (PDF)",
      "Excel financial model (if applicable)",
      "Executive summary with key findings",
      "Follow-up Q&A session",
    ],
  },
  {
    slug: "event-organization",
    title: "Event Organization",
    shortDescription: "End-to-end event planning and logistics for conferences, school events, and community gatherings.",
    icon: CalendarDays,
    description: "With experience managing events for 1,350+ participants and budgets of $35,000+, I offer comprehensive event planning — from logistics and budgeting to digital access systems and vendor coordination.",
    whoItsFor: ["Schools & universities", "Community organizations", "Corporate teams", "Private event hosts"],
    useCases: [
      "Large-scale school or community events",
      "Conference & MUN logistics",
      "Graduation ceremonies & fundraisers",
      "Digital ticketing & access control setup",
    ],
    deliverables: [
      "Event plan & timeline document",
      "Budget management & tracking",
      "Vendor coordination",
      "Digital access control system (QR-code based)",
      "Post-event report with metrics",
    ],
  },
  {
    slug: "collaborative-research",
    title: "Collaborative Research",
    shortDescription: "Team-based technical research on engineering, sustainability, and aerospace topics.",
    icon: Users,
    description: "I collaborate on technical research projects — from engineering prototypes to sustainability studies. My background in physics, simulation, and cross-cultural teamwork makes me a strong research partner.",
    whoItsFor: ["Student research teams", "Academic groups", "NGOs working on sustainability", "Engineering startups"],
    useCases: [
      "Sustainability & environmental engineering research",
      "Aerospace concept studies",
      "Technical literature reviews",
      "Prototype development & testing",
    ],
    deliverables: [
      "Research report or paper draft",
      "Technical analysis & data",
      "Prototype (if applicable)",
      "Presentation-ready slides",
    ],
  },
  {
    slug: "spreadsheet-systems",
    title: "Advanced Google Sheets / Excel Systems",
    shortDescription: "Custom spreadsheet solutions for data management, financial tracking, dashboards, and automation.",
    icon: Sheet,
    description: "I build powerful spreadsheet systems — from financial trackers to automated dashboards and data pipelines. With expertise in Excel modeling and Google Apps Script, I create tools that replace expensive software.",
    whoItsFor: ["Small businesses tracking finances", "Teams needing data dashboards", "Anyone drowning in manual data entry", "Educators & administrators"],
    useCases: [
      "Financial tracking & budget management",
      "Automated reporting dashboards",
      "CRM / lead tracking in Google Sheets",
      "Inventory & logistics management",
    ],
    deliverables: [
      "Custom spreadsheet system",
      "Documentation & user guide",
      "Google Apps Script automations (if needed)",
      "Training session",
    ],
    priceGuidance: "Simple systems from $150. Complex multi-sheet systems with automations from $500+.",
  },
  {
    slug: "ai-automation",
    title: "AI Automation for Businesses",
    shortDescription: "Smart automations using AI, Zapier, Make, and Google Apps Script to streamline your workflows.",
    icon: Bot,
    description: "I set up AI-powered automations that save you hours every week. From chatbots and form-to-CRM pipelines to email sequences and WhatsApp auto-replies — I wire your tools together so they work for you.",
    whoItsFor: ["Small businesses with repetitive tasks", "Service providers managing leads", "E-commerce stores", "Anyone wanting to automate workflows"],
    useCases: [
      "Form submissions → Google Sheets → Email/WhatsApp notification",
      "AI chatbot for customer support",
      "Automated lead nurturing sequences",
      "Data extraction and report generation",
    ],
    deliverables: [
      "Automation workflow design & implementation",
      "Integration setup (Zapier/Make/Apps Script)",
      "AI tool configuration (if applicable)",
      "Documentation & maintenance guide",
      "30-day support period",
    ],
    priceGuidance: "Simple automations from $200. Complex multi-tool workflows from $800+.",
  },
  {
    slug: "3d-printing",
    title: "3D Printing",
    shortDescription: "Custom prototypes, engineering components, functional parts, and small-batch prints with automated quote estimation.",
    icon: Printer,
    description: "From rapid prototyping to custom objects and engineering components, I offer 3D printing services using PLA, PETG, and ABS materials. Upload your STL file and get an instant estimate.",
    whoItsFor: ["Engineers & designers needing prototypes", "Students with school/uni projects", "Hobbyists & makers", "Small businesses needing custom parts"],
    useCases: [
      "Rapid prototyping for product development",
      "Custom enclosures & housings",
      "Replacement parts & functional components",
      "Awards, trophies, and decorative items",
      "Small-batch production runs",
    ],
    deliverables: [
      "3D-printed part(s) in chosen material",
      "Post-processing (sanding, painting on request)",
      "Quality inspection",
      "Design feedback (if STL provided)",
    ],
    priceGuidance: "Estimates based on volume, material, and print time. Use the quote estimator below or contact for custom jobs.",
  },
];
