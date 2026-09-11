# Resume section + password-protected space

## What you get

1. **A new Resume page** at `/resume`, styled like the rest of the site but laid out as a Harvard-style CV (single column, clear section headings, dates aligned right, no icons or cards).
2. **A button at the top of that page** — "Access further info" — that leads to a locked area.
3. **A password screen** at `/resume/private`. Entering the password opens the protected space.
4. **A shareable link** — `/resume/private?k=juanignacio110108` — which opens the password screen with the password already filled in, so the person just presses Enter.
5. **The protected space itself** starts as an empty, styled shell with a title and a placeholder line. We build the material and presentation into it in the next step.

## Resume content

The CV layout ships with clearly marked placeholder blocks (Education, Experience, Leadership, Skills, Honors, Languages). You paste your own text after, and I drop it in.

## How the lock works

The password is checked on the server, not in the page, so it can't be found by inspecting the site. It's stored as a backend secret. The unlocked state is remembered for the browser session, so refreshing inside the protected space doesn't ask again.

## Technical details

- New route `/resume` (`src/pages/ResumePage.tsx`) and `/resume/private` (`src/pages/ResumePrivatePage.tsx`), registered in `src/App.tsx` inside the non-gallery route tree (excluded from the gallery subdomain).
- New edge function `resume-access`: POST `{ password }`, compares against secret `RESUME_ACCESS_PASSWORD` (`juanignacio110108`) with a constant-time comparison, returns `{ ok: true }` or 401. CORS handled, input validated.
- On success the page stores a flag in `sessionStorage` and renders the protected content; on reload the flag alone shows content (nothing sensitive lives in the page bundle yet — when we add real material later it will be fetched only after a successful check).
- `?k=` query param prefills the password field only; it never auto-submits.
- SEO: `/resume` gets its own title, description, and self-referencing canonical via `SEOHead`; `/resume/private` is `noindex`.
- Both EN and ES strings added to `src/i18n/translations/en.ts` and `es.ts`.
- Sitemap gains `/resume`; the private route stays out.
- Navigation: "Resume" added to the desktop Portfolio dropdown and the mobile Explore menu (say the word if you'd rather keep it off the menus).
