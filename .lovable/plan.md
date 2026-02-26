

# Fix Admin Access, RLS Policies, and Add Documents Page

## Problems Found

1. **Your account exists but has no admin role** -- you signed up but were never granted the `admin` role in the `user_roles` table, so the admin panel blocks you.

2. **All RLS policies are RESTRICTIVE** -- they were created as RESTRICTIVE instead of PERMISSIVE. This means multiple SELECT policies on the same table require ALL conditions to be true simultaneously (AND logic), which blocks everyone. For example, on `blog_posts`, you'd need to be both an admin AND have the post be published -- impossible for public visitors.

3. **No Google Drive connector available** -- the Google Drive connector isn't set up in the workspace. Since the folder is publicly shared, we can embed it directly using Google Drive's embed/iframe URL or link to files.

## Plan

### Step 1: Grant Admin Role

Insert your user ID (`617d43cd-2d78-4320-b506-664d7fb8b1c2`) into the `user_roles` table with the `admin` role.

### Step 2: Fix All RLS Policies

Drop all existing RESTRICTIVE policies and recreate them as PERMISSIVE (the default). Tables affected:

- **colleges**: Public SELECT (permissive), admin INSERT/UPDATE/DELETE (permissive)
- **blog_posts**: Public SELECT where published=true (permissive), admin full access (permissive)
- **contact_messages**: Public INSERT (permissive), no read/update/delete
- **profiles**: User own-data SELECT/UPDATE (permissive)
- **user_roles**: User own-data SELECT (permissive)

### Step 3: Create Documents Page

- New file: `src/pages/DocumentsPage.tsx`
- Embeds the Google Drive folder (`1RNm8bZ4qnAcvEVkHUpI-YkyGlgkhcwob`) using an iframe with Google Drive's embed view
- Clean page layout matching the existing site style
- Add `/documents` route in `App.tsx`
- Add "Documents" link in `Navbar.tsx`

### Files to Create
- `src/pages/DocumentsPage.tsx` -- iframe embed of the shared Drive folder

### Files to Modify
- `src/App.tsx` -- add `/documents` route
- `src/components/Navbar.tsx` -- add "Documents" nav link

### Database Changes
- 1 data insert: admin role for your account
- 1 migration: drop and recreate all RLS policies as PERMISSIVE

