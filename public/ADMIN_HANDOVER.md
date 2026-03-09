# Admin Handover Document

## Site Overview
Juan Ignacio Ramos' personal portfolio website — a multi-page React application with backend powered by Lovable Cloud.

**Live URL:** https://juanignacioramos.lovable.app  
**Admin Panel:** /admin (requires authentication)

---

## Changelog — New Features Added

### New Pages
| Page | Route | Description |
|------|-------|-------------|
| Services Hub | `/services` | Grid of all 8 professional services |
| Service Detail | `/services/:slug` | Individual service landing page with request form |
| Lab | `/lab` | Digital laboratory — experiments, notes, prototypes |
| Ideas | `/ideas` | Ideas index with status tracking |

### New Features
- **AI Assistant upgraded** — System prompt now auto-populated with real portfolio data. No more hallucinated facts.
- **Service Request Forms** — Each service page has a lead capture form that stores submissions in the database.
- **3D Printing Quote Estimator** — Interactive calculator with material, volume, and infill sliders.
- **Interactive Timeline** — Scrubbable journey timeline on the homepage (keyboard accessible).
- **Services Preview Grid** — Homepage section showcasing top 4 services.
- **Page Transitions** — Framer Motion fade/slide transitions on all pages.
- **SEO & Structured Data** — JSON-LD for services, canonical tags, meta descriptions per page.
- **Accessibility** — ARIA labels, focus outlines, keyboard navigation on interactive elements.

### Services Offered
1. Web Design (business-integrated)
2. Drone Videography
3. Investment Research
4. Event Organization
5. Collaborative Research
6. Advanced Google Sheets / Excel Systems
7. AI Automation for Businesses
8. 3D Printing

---

## How to Edit Service Pages & Pricing

Service data is stored in `src/data/services.ts`. Each service has:
- `slug` — URL path (e.g., "web-design" → `/services/web-design`)
- `title`, `shortDescription`, `description` — Content
- `whoItsFor`, `useCases`, `deliverables` — Lists
- `priceGuidance` — Optional pricing text

**To update pricing:** Edit the `priceGuidance` field for the relevant service in `src/data/services.ts`.

**To add a new service:** Add a new object to the `services` array following the same structure.

---

## How to Change 3D Printing Materials/Prices

The quote estimator lives in `src/components/PrintQuoteEstimator.tsx`.

Edit the `materials` array at the top:
```typescript
const materials = [
  { name: "PLA", pricePerCm3: 0.05, description: "Standard, biodegradable" },
  { name: "PETG", pricePerCm3: 0.07, description: "Durable, weather-resistant" },
  { name: "ABS", pricePerCm3: 0.06, description: "Strong, heat-resistant" },
];
```
- Change `pricePerCm3` to update pricing
- Add/remove materials as needed

---

## How to Access Form Submissions

### Contact Messages
Stored in the `contact_messages` database table. View via the admin panel at `/admin`.

### Service Requests
Stored in the `service_requests` database table with fields:
- `service` — Which service was requested
- `name`, `email` — Contact info
- `description` — Project description
- `budget_range`, `deadline`, `industry` — Optional metadata
- `status` — "new" by default
- `created_at` — Timestamp

Access via the Lovable Cloud backend panel.

---

## How to Edit Lab & Ideas Content

### Lab Entries
Edit `src/pages/LabPage.tsx` — modify the `labEntries` array. Each entry has:
- `date`, `title`, `status` (idea/research/prototype), `tags`, `content`

### Ideas
Edit `src/pages/IdeasPage.tsx` — modify the `ideas` array. Each idea has:
- `icon`, `title`, `status` (idea/research/prototype), `description`

---

## Email Notifications

Currently, form submissions are stored in the database and logged server-side. To enable email notifications:

1. **Option A — Connect an email service** (e.g., Resend): Add the API key as a secret, update the edge functions to send emails.
2. **Option B — Use Slack notifications**: Connect the Slack connector to receive real-time notifications.

The edge function `supabase/functions/notify-service-request/index.ts` is ready to be extended with email sending logic once an email service is configured.

---

## Interactive Features

### Interactive Timeline
Located in `src/components/sections/InteractiveTimeline.tsx`. Edit the `milestones` array to add/update timeline events.

### Starfield Background
Already present and functional. No changes needed.

### Easter Eggs
Konami code (↑↑↓↓←→←→BA) triggers "Aerospace Mode". Managed in `src/components/EasterEggs.tsx`.

---

## Analytics Recommendations

For lightweight analytics, consider:
- **Plausible Analytics** — Privacy-friendly, no cookies, simple dashboard
- **Google Analytics 4** — Full-featured, free

To add: Insert the tracking script in `index.html` inside `<head>`.

For CTA/form tracking, add event calls in form submission handlers.

---

## New Dependencies Added
- No new npm dependencies were added. All features use existing libraries (React, Framer Motion, Supabase, Recharts, etc.).

---

## Database Tables Added
| Table | Purpose |
|-------|---------|
| `service_requests` | Stores service request form submissions |

---

## Missing Content (to be supplied by site owner)
- Service page images/screenshots
- Lab entries with real experiment data (placeholder data currently used)
- Ideas page with real idea descriptions (placeholder data currently used)
- Detailed pricing for each service
- Portfolio project images from the database
