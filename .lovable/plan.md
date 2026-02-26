

# Northern Sky Background + Liquid Glass Nav Badges

## Overview

Three visual enhancements: (1) "liquid glass" pill badges in the navbar to group and highlight certain links, (2) a subtle animated starfield background across the entire site showing the real northern hemisphere sky, symbolizing going north/forward.

---

## 1. Northern Night Sky Background

A new `StarfieldBackground` component rendered at the app root level (in `App.tsx`), behind all content. It will:

- Use a full-viewport `<canvas>` element with `position: fixed`, `z-index: -1`, and very low opacity
- Render real northern hemisphere constellations (Ursa Major, Ursa Minor/Polaris, Cassiopeia, Orion, Cygnus) using actual star positions mapped to screen coordinates
- Apply a very slow parallax drift tied to scroll position -- stars shift slightly as you scroll, creating depth without being distracting
- Add a gentle twinkle animation (opacity oscillation) to each star
- Use white/warm-white dots of varying sizes (1-3px) based on star magnitude
- In light mode, reduce opacity significantly so it's barely visible; in dark mode, make it more prominent
- The background is purely decorative and non-interactive (pointer-events: none)

## 2. Liquid Glass Nav Badges

In the `Navbar.tsx`, visually group certain links with a frosted-glass pill container:

- **Group 1**: "Colleges", "Blog", "Documents" -- wrapped in a rounded pill with `backdrop-blur`, semi-transparent background, and a subtle glowing border (the "liquid glass" effect)
- **Group 2**: "Projects" -- wrapped in its own smaller glass pill to call attention to it separately

The effect is achieved with CSS: `backdrop-blur-md`, `bg-white/5` (dark) / `bg-black/5` (light), `border border-white/10`, `rounded-full`, and a faint `shadow` with a slight glow. This keeps the minimal aesthetic while clearly differentiating these links.

The mobile menu will also reflect these groupings with subtle dividers or background highlights.

---

## Technical Details

### New Files

- `src/components/StarfieldBackground.tsx` -- Canvas-based starfield with real northern star positions, scroll-based parallax, and twinkle animation. Uses `useEffect` for the animation loop and scroll listener. No external dependencies needed -- pure canvas API.

### Modified Files

- **`src/App.tsx`** -- Add `<StarfieldBackground />` as the first child inside the ThemeProvider, before all routes
- **`src/components/Navbar.tsx`** -- Restructure the desktop nav links to wrap "Projects" in one glass pill and "Colleges/Blog/Documents" in another. The rest (About, Experience, Contact) remain unstyled. Mobile menu gets equivalent visual grouping.
- **`src/index.css`** -- Add a `.glass-pill` utility class for the liquid glass effect:
  ```css
  .glass-pill {
    backdrop-filter: blur(12px);
    background: hsl(var(--foreground) / 0.05);
    border: 1px solid hsl(var(--foreground) / 0.08);
    border-radius: 9999px;
    padding: 4px 6px;
    box-shadow: 0 0 12px hsl(var(--foreground) / 0.03);
  }
  ```

### Star Data

The component will include hardcoded positions for approximately 50-80 notable northern hemisphere stars (Polaris, Dubhe, Merak, Schedar, Deneb, Vega, Altair, Betelgeuse, Rigel, etc.) with their approximate right ascension and declination mapped to x/y screen coordinates. The projection will place Polaris near the top-center of the viewport, reinforcing the "going north" symbolism.

### Parallax Behavior

- On scroll, stars shift vertically by a small factor (e.g., `scrollY * 0.03`), creating a subtle depth effect
- A very slow continuous rotation (~0.001 rad/s) simulates Earth's rotation, making the sky feel alive without being distracting

