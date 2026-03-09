import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { PrintQuoteEstimator } from "@/components/PrintQuoteEstimator";
import { SEOHead } from "@/components/SEOHead";
import { ArrowLeft, CheckCircle2, Users, Lightbulb, Package } from "lucide-react";
import NotFound from "./NotFound";

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <NotFound />;

  const isWebDesign = slug === "web-design";
  const is3DPrinting = slug === "3d-printing";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `https://juanignacioramos.lovable.app/services/${service.slug}`,
    provider: {
      "@type": "Person",
      name: "Juan Ignacio Ramos",
      url: "https://juanignacioramos.lovable.app",
    },
    areaServed: "Worldwide",
    ...(service.priceGuidance && { priceRange: service.priceGuidance }),
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={`${service.title} — Juan Ignacio Ramos`}
        description={service.shortDescription}
        jsonLd={jsonLd}
      />
      <Navbar />
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            <ArrowLeft size={14} aria-hidden="true" /> All Services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-muted border border-border flex items-center justify-center" aria-hidden="true">
                <service.icon size={24} className="text-muted-foreground" />
              </div>
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold">{service.title}</h1>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-12 text-lg">{service.description}</p>
          </motion.div>

          {/* Web Design: Business features section */}
          {isWebDesign && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-12 p-6 rounded-2xl bg-card border border-border space-y-4"
            >
              <h2 className="font-display font-semibold text-lg">Business Features Included</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Booking / appointment integration",
                  "Pricing & quote blocks",
                  "Lead capture forms",
                  "Google Sheets integration for leads",
                  "Stripe / invoicing triggers",
                  "Basic SEO & structured data",
                  "Lighthouse performance optimization",
                  "Responsive design (mobile-first)",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={14} className="text-foreground/60 flex-shrink-0" aria-hidden="true" />
                    {f}
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-border">
                <h3 className="font-display font-semibold text-sm mb-2">📦 Website + Automation Bundle</h3>
                <p className="text-sm text-muted-foreground">
                  Get a website with fully wired automations: forms → Google Sheets/CRM → email/WhatsApp notifications via Zapier, Make, or Google Apps Script. Perfect for lead-generating businesses.
                </p>
              </div>
              <div className="pt-4 border-t border-border">
                <h3 className="font-display font-semibold text-sm mb-2">⏱️ Typical Timelines</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Single-page site: 3–5 business days</li>
                  <li>• Multi-page with CMS: 1–2 weeks</li>
                  <li>• Website + Automation bundle: 2–3 weeks</li>
                </ul>
              </div>
            </motion.div>
          )}

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="p-5 rounded-2xl bg-card border border-border"
            >
              <Users size={18} className="text-muted-foreground mb-3" aria-hidden="true" />
              <h3 className="font-display font-semibold text-sm mb-3">Who It's For</h3>
              <ul className="space-y-2">
                {service.whoItsFor.map((w) => (
                  <li key={w} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" aria-hidden="true" />
                    {w}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-5 rounded-2xl bg-card border border-border"
            >
              <Lightbulb size={18} className="text-muted-foreground mb-3" aria-hidden="true" />
              <h3 className="font-display font-semibold text-sm mb-3">Example Use Cases</h3>
              <ul className="space-y-2">
                {service.useCases.map((u) => (
                  <li key={u} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" aria-hidden="true" />
                    {u}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="p-5 rounded-2xl bg-card border border-border"
            >
              <Package size={18} className="text-muted-foreground mb-3" aria-hidden="true" />
              <h3 className="font-display font-semibold text-sm mb-3">Deliverables</h3>
              <ul className="space-y-2">
                {service.deliverables.map((d) => (
                  <li key={d} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-foreground/50 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {service.priceGuidance && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-12 p-5 rounded-2xl bg-muted/50 border border-border"
            >
              <h3 className="font-display font-semibold text-sm mb-2">💰 Pricing Guidance</h3>
              <p className="text-sm text-muted-foreground">{service.priceGuidance}</p>
            </motion.div>
          )}

          {is3DPrinting && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-12"
            >
              <PrintQuoteEstimator />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <ServiceRequestForm
              service={service.title}
              showIndustry={isWebDesign}
              budgetOptions={
                is3DPrinting
                  ? ["< $50", "$50 – $150", "$150 – $500", "$500+", "Need a quote"]
                  : undefined
              }
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetailPage;
