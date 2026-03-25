

## Fix: Remove inconsistent background color from 3 sections

### Problem
Experience, Volunteering, and Awards sections use `bg-card/50` as their background, while every other section on the landing page uses no background class (inheriting the default `bg-background`). This creates visible bands of a different shade that break the smooth visual flow.

### Solution
Remove `bg-card/50` from the `<section>` element in these 3 files:

1. **`src/components/sections/Experience.tsx`** (line 100): Change `className="py-28 px-6 bg-card/50"` → `className="py-28 px-6"`
2. **`src/components/sections/Volunteering.tsx`** (line 35): Same change
3. **`src/components/sections/Awards.tsx`** (line 31): Same change

No other files are touched. This is a 3-line change across 3 files.

