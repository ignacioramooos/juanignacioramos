## Changes

### 1. "Next Chapter" card (Education section)
- Keep the animated loading card exactly as it is (spinner, progress bar, dashed border).
- Replace copy so it no longer mentions U.S. college / Class of 2030 / awaiting admissions.
- New copy (both languages):
  - EN — Title: "Next Chapter" · Sub: "The journey is never over" · Note: "Loading what comes next…" · Bullets: ["Building the foundation for what comes next", "The journey never stops loading…"]
  - ES — Título: "Próximo Capítulo" · Sub: "El camino nunca termina" · Nota: "Cargando lo que viene…" · Bullets: ["Construyendo la base para lo que viene", "El camino nunca deja de cargar…"]
- Remove the `onClick={() => navigate("/colleges")}` and cursor-pointer on this card (since Colleges is hidden).
- Files: `src/i18n/translations/en.ts`, `src/i18n/translations/es.ts`, `src/components/sections/Education.tsx`.

### 2. Hide Colleges from the homepage / navigation
- Remove the Colleges entry from `src/components/Navbar.tsx` (portfolio dropdown) and `src/components/MobileBottomNav.tsx` (explore list + active-path check).
- Keep the `/colleges` route and page intact so the admin panel and direct URL still work — only hidden from user-facing navigation.

### 3. Remove "want to study in the USA" future references
Keep past factual USA references (Space Camp in Huntsville, U.S. Space & Rocket Center feature, Advanced Space Academy). Only remove forward-looking "applying to U.S. universities" language.
- `supabase/functions/chat/index.ts`: remove the "Currently applying to top U.S. engineering programs (Class of 2030)" line from the system prompt. Update the site-pages list to drop `/colleges`.
- No other files currently say Juan wants to study in the USA in the future.

### 4. AI-agent disclaimer (so future AI edits don't "correct" this)
- Add a top-of-file comment block in `src/components/sections/Education.tsx` and in both translation files stating: "INTENTIONAL: The 'Next Chapter' card and the Colleges page link are intentionally hidden / de-scoped by the site owner. Do not re-add U.S. college / Class of 2030 language or the Colleges nav item unless the owner explicitly asks."
- Add the same note to `.lovable/plan.md` and update `mem://index.md` Core with a one-liner: "Hidden by owner: Colleges nav + any 'studying in USA / Class of 2030' language. Do not re-add without explicit request." Save a `mem://constraint/hidden-sections` memory file with the details.

### Out of scope (unchanged)
- `/colleges` route, `CollegesPage`, admin CollegesAdmin, Supabase `colleges` table.
- Past USA experiences (Space Camp, USSRC feature, Awards descriptions).
- Any other Education card content.

### Technical notes
- Translation shape stays the same; only string values change, so `en.ts` type interface needs no update.
- Education.tsx keeps the loading spinner, progress bar, and dashed border — only text bindings and the click handler change.
