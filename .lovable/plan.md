

## New "Featured In" Section

### What
A clean, editorial-style section showcasing external publications where Ignacio has been featured. Placed **after Awards & Honors** and **before Daily Quotes** on the homepage.

### Design
- Section label: "Press" / "Prensa"
- Title: "Featured In" / "Publicado En"
- Card layout with:
  - Publication logo/name ("U.S. Space & Rocket Center Foundation")
  - Article title as a clickable link ("Now I Know With Certainty I Am Going to Be an Aerospace Engineer")
  - Brief description (1 line)
  - External link icon indicating it opens in a new tab
- Framer Motion reveal animations matching existing sections
- Responsive: single column on mobile, expandable to multi-column as more articles are added

### Files
1. **Create `src/components/sections/FeaturedIn.tsx`** — New section component with the article card linking to `https://rocketcenterfoundation.org/now-i-know-with-certainty-i-am-going-to-be-an-aerospace-engineer/`
2. **Edit `src/i18n/translations/en.ts`** — Add `featuredIn` translations (label, title)
3. **Edit `src/i18n/translations/es.ts`** — Add Spanish translations
4. **Edit `src/pages/Index.tsx`** — Import and place `<FeaturedIn />` between `<Awards />` and `<DailyQuotes />`

The data array inside the component makes it easy to add more publications later.

