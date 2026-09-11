# Resume section + password-protected space

## What you get

1. **A new Resume page** at `/resume`, styled like the rest of the site but laid out as a Harvard-style CV: single column, name and contact line at the top, clear section headings, dates aligned right, bullet points, no cards or icons.
2. **A button at the top of that page** — "Access further info" — leading to the locked area.
3. **A password screen** at `/resume/private`. Entering the password opens the protected space.
4. **A shareable link** — `/resume/private?k=juanignacio110108` — opens the password screen with the password already filled in, so the person just presses Enter.
5. **The protected space** starts as an empty styled shell with a title and placeholder line. We build the material and presentation into it next.

## Resume content

Taken directly from the PDF you uploaded, in the same order: Profile, Education, Experience, Technical Projects, Leadership/Service/Athletics, Awards and Honors, Skills. Accents restored (Université/Lycée, Mention Très Bien) since the PDF stripped them.

Two notes:
- The PDF lists AutoCAD under technical skills, but you previously asked to keep AutoCAD off the site. I'll leave it out unless you say otherwise.
- The PDF mentions the U.S. Space & Rocket Center as a past award/experience only — no forward-looking "study in the USA" language — so it fits your existing rule.

## How the lock works

The password is checked on the server, not in the page, so it can't be found by inspecting the site. It's stored as a backend secret. The unlock is remembered for the browser session, so refreshing inside the protected space doesn't ask again.

## Technical details

- New routes `/resume` (`src/pages/ResumePage.tsx`) and `/resume/private` (`src/pages/ResumePrivatePage.tsx`), registered in `src/App.tsx` in the non-gallery route tree.
- Resume data lives in `src/data/resume.ts` as structured sections so it's easy to edit later.
- New edge function `resume-access`: POST `{ password }`, constant-time compare against secret `RESUME_ACCESS_PASSWORD` (`juanignacio110108`), returns `{ ok: true }` or 401. CORS + zod validation.
- On success the page sets a `sessionStorage` flag and renders the protected shell.
- `?k=` prefills the password field only; never auto-submits.
- SEO: `/resume` gets its own title, description, self-referencing canonical via `SEOHead`; `/resume/private` is `noindex`.
- EN and ES strings added to `src/i18n/translations/en.ts` and `es.ts`.
- Sitemap gains `/resume`; the private route stays out.
- Navigation: "Resume" added to the desktop Portfolio dropdown and the mobile Explore menu.
