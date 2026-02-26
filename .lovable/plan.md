# Portfolio Narrative Transformation

## The Problem

The site reads like a great CV but doesn't tell a story. A recruiter or admissions officer decides in 7-10 seconds. We need immediate impact, a clear narrative arc, and a "wow factor" that makes Juan Ignacio unforgettable.

---

## 1. Hero Section -- Immediate Impact

**Current**: Generic subtitle "Aspiring Aerospace Engineer . Learner . Problem Solver"

**New structure**:

- Keep "Montevideo, Uruguay" location tag
- Keep the big "Juan Ignacio / Ramos" name
- Replace subtitle with a mission statement: **"Building the path to aerospace engineering in Uruguay"**
- Add a row of 4-5 keyword pills below: `Aerospace` `Systems Thinking` `Leadership` `Real-world Impact`
- Keep the two CTA buttons
- Keep Aspiring Aerospace Engineer · Learner · Problem Solver

**File**: `src/components/sections/Hero.tsx`

---

## 2. New Section: "What Drives Me" (after About, before Experience)

A short, punchy narrative section that answers "why aerospace, why Uruguay, what problem do you want to solve." This is what universities fall in love with.

Content (3-4 short statements with icons):

- "Building an aerospace future in South America"
- "Applying engineering to humanitarian and infrastructure challenges"
- "Designing systems that combine sustainability and performance"
- "Leading teams under pressure and uncertainty"

Styled as a minimal grid with subtle icons, no heavy text blocks.

**File**: Create `src/components/sections/WhatDrivesMe.tsx`
**Modify**: `src/pages/Index.tsx` -- insert between `<About />` and `<Experience />`

---

## 3. Improve About Section -- More Impact, more authenticity

**Current**: Three dense paragraphs + 4 stat cards

**Changes**:

- Punchier paragraphs 
- Authenticity
- Rewrite stat descriptions for human impact:
  - "USD Managed" becomes "Managed $35,000 in event operations"
- Keep the "Mind & Hand / Mens et Manus" title -- it's strong

**File**: `src/components/sections/About.tsx`

---

## 4. Add "Highlight Reel" strip between Hero and About

A horizontally scrolling or static row of the most impressive achievements, visible within the first scroll. These are the "gold" moments that should hit in seconds:

- Advanced Space Academy Scholar (USA)
- French BAC "Mention Tres Bien"
- MUN Secretary General
- National Water Polo Pre-selection

Styled as small, elegant badges/chips with subtle icons, acting as a quick proof-of-credibility strip before the reader dives into details.

**File**: Create `src/components/sections/HighlightReel.tsx`
**Modify**: `src/pages/Index.tsx` -- insert between `<Hero />` and `<About />`

---

## 5. Updated Page Order

```text
Hero
HighlightReel (NEW -- instant credibility)
About (shortened, punchier)
WhatDrivesMe (NEW -- narrative/mission)
Experience
Education
Skills
Volunteering
Athletics
Awards
DailyQuotes
Contact
```

---

## Technical Summary

### New Files

- `src/components/sections/HighlightReel.tsx` -- achievement badges strip
- `src/components/sections/WhatDrivesMe.tsx` -- mission/narrative section

### Modified Files

- `src/components/sections/Hero.tsx` -- new subtitle + keyword pills
- `src/components/sections/About.tsx` -- shorter text, better stat descriptions
- `src/pages/Index.tsx` -- updated section order with two new sections