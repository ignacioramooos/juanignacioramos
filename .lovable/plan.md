

# Portfolio Updates Plan

## 1. Fix Rocket Simulator

**Problem**: The `MiniChart` component triggers a React ref warning, and the simulator may not render properly after launch. The console shows "Function components cannot be given refs" errors.

**Fix**:
- Remove the incorrect ref usage in `MiniChart` (it's being passed a ref from `useScrollReveal` that it shouldn't use)
- Ensure the simulation runs and charts render correctly on "Launch" click
- Add the **Eiffel Tower Easter Egg**: When apogee exceeds 330m, show an animated Eiffel Tower icon/illustration with a congratulatory message for the model rocket surpassing the Eiffel Tower's height
- Add a note about the **Grand Oral** context: "Originally developed for the French Baccalaureate Grand Oral -- though the jury selected the other topic, I continued developing the simulator after the exam"

## 2. Update Skills Section

**Remove**: Python and React (user doesn't feel confident listing those)

**Replace with skills inferred from the PDF/essays**:
- Technical: Excel Modeling, AutoCAD, Blender, 3D Printing, Drone Piloting, Simulation/Modeling, Photography
- Soft Skills: Emphasize **Problem Solving** and **Leadership** more prominently, plus add Crisis Management, Cross-cultural Communication, and Perseverance
- Pull quotes/citations from the college application essays to enrich soft skills descriptions

## 3. Add Inspirational Quotes from College Essays

Integrate select quotes from the application essays into relevant sections (About or a dedicated quotes area):
- *"True growth begins when we stop working for a grade and start reaching for a height we once thought impossible."*
- *"Every interaction is an opportunity to learn from and contribute to those around me."*
- *"Perseverance -- I guarantee you, that's my favorite word in the world."*

These will appear as subtle, elegant pull-quotes within the About or Skills sections.

## 4. Fix Athletics Section

- Change Open Water Swimming distance from "1,250m-5,000m" to approximately "~1,500m" range
- Keep the 3 podium finishes

## 5. Enable Working Contact Form via Lovable Cloud

- Connect to Lovable Cloud backend
- Create a Supabase edge function to receive and store contact form submissions
- Create a `contact_messages` database table to store submissions
- Wire the existing form UI to call the edge function
- Keep validation and toast feedback

## 6. Grand Oral Context in Rocket Project

Update the 6-DOF Rocketry Simulation project card description to mention:
- The Grand Oral exam didn't select this topic, but Ignacio continued developing the project after the exam
- This shows perseverance and genuine passion beyond grades

---

## Technical Details

**Files to modify**:
- `src/components/sections/Projects.tsx` -- Fix MiniChart ref, add Eiffel Tower easter egg, update project description
- `src/components/sections/Skills.tsx` -- Remove Python/React, add problem solving + leadership emphasis, add quotes
- `src/components/sections/Athletics.tsx` -- Fix swimming distance
- `src/components/sections/About.tsx` -- Optionally add a pull-quote
- `src/components/sections/Contact.tsx` -- Wire to Lovable Cloud edge function

**New files**:
- `supabase/functions/contact/index.ts` -- Edge function for contact form
- Database migration for `contact_messages` table

