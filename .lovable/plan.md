

# Multi-Page Site with Blog, Colleges Page, and Admin Panel

## Overview

Transform the current single-page portfolio into a multi-page site with proper routing, add a Colleges showcase page, a Blog with hybrid content (built-in CMS + Google Drive for documents), and a password-protected admin panel to manage everything.

---

## 1. Multi-Page Routing

Convert the app from a single scrollable page to proper routes:

| Route | Purpose |
|---|---|
| `/` | Home -- keeps Hero, About, Experience, Education, Skills, Volunteering, Athletics, Awards. A brief "Contact" snippet stays at the bottom with a link to the full page |
| `/contact` | Full contact page (form + chatbot + info) |
| `/projects` | Dedicated projects page with the rocket simulator and project cards |
| `/colleges` | College acceptances showcase |
| `/blog` | Blog listing page |
| `/blog/:slug` | Individual blog post |
| `/admin` | Password-protected admin panel |

The Navbar will be updated to use `react-router-dom` Links pointing to these routes instead of anchor scrolls.

---

## 2. Colleges Page (`/colleges`)

A clean page displaying college acceptances with:
- College name, location, acceptance status
- Financial aid offered vs. cost of attendance
- A visual comparison (progress bars or cards showing the gap)
- Optional notes per college

Data stored in a new `colleges` database table, managed through the admin panel.

---

## 3. Blog System (Hybrid)

### Built-in CMS (primary)
- New `blog_posts` database table (title, slug, content as Markdown, cover image URL, published flag, created/updated timestamps)
- New `blog-images` storage bucket for uploaded images
- Posts written and managed via the admin panel
- Blog listing page with cards, individual post pages rendered with `react-markdown`

### Google Drive Integration (for documents)
- Connect the Google Drive connector to pull files (acceptance letters, financial aid documents, PDFs) from a specific folder
- Display these as downloadable document cards on the Colleges page or embedded in blog posts
- Uses the connector gateway for authenticated access

---

## 4. Admin Panel (`/admin`)

A simple password-protected area (using authentication with email/password login) where you can:
- **Colleges**: Add, edit, delete college entries
- **Blog**: Create, edit, publish/unpublish posts with a Markdown editor and image uploads
- Clean tabbed interface

---

## Technical Details

### Database Changes (migrations)

**`colleges` table:**
```
- id (uuid, PK)
- name (text)
- location (text)
- status (text: accepted, waitlisted, rejected)
- cost_of_attendance (numeric, nullable)
- financial_aid (numeric, nullable)
- notes (text, nullable)
- display_order (integer)
- created_at (timestamptz)
```

**`blog_posts` table:**
```
- id (uuid, PK)
- title (text)
- slug (text, unique)
- content (text -- Markdown)
- cover_image_url (text, nullable)
- published (boolean, default false)
- created_at (timestamptz)
- updated_at (timestamptz)
```

**`profiles` table** for admin auth:
```
- id (uuid, PK, references auth.users)
- email (text)
- created_at (timestamptz)
```

**`user_roles` table** for admin role:
```
- id (uuid, PK)
- user_id (uuid, references auth.users)
- role (app_role enum: admin, user)
```

**Storage bucket:** `blog-images` (public)

**RLS policies:**
- Colleges: public SELECT, admin-only INSERT/UPDATE/DELETE
- Blog posts: public SELECT (where published = true), admin-only all operations
- Profiles and user_roles: standard user-own-data policies

### New Files

- `src/pages/ContactPage.tsx` -- full contact page
- `src/pages/ProjectsPage.tsx` -- dedicated projects page
- `src/pages/CollegesPage.tsx` -- college showcase
- `src/pages/BlogPage.tsx` -- blog listing
- `src/pages/BlogPostPage.tsx` -- individual post
- `src/pages/AdminPage.tsx` -- admin panel with tabs
- `src/pages/LoginPage.tsx` -- admin login
- `src/components/admin/CollegesAdmin.tsx` -- CRUD for colleges
- `src/components/admin/BlogAdmin.tsx` -- CRUD for blog posts
- `src/components/ProtectedRoute.tsx` -- auth guard

### Modified Files

- `src/App.tsx` -- add all new routes
- `src/components/Navbar.tsx` -- convert to router Links, add Colleges and Blog nav items
- `src/pages/Index.tsx` -- remove Projects and Contact sections, add brief contact snippet with link
- `src/components/sections/Contact.tsx` -- keep as-is, just used in ContactPage

### Google Drive Setup

- Use the `connect` tool to link the Google Drive connector
- Create an edge function `drive-files` to fetch folder contents via the connector gateway
- Display documents as cards with download links on the Colleges page

---

## Implementation Order

1. Database migrations (tables, RLS, storage bucket)
2. Authentication setup (login page, protected route)
3. Multi-page routing refactor (App.tsx, Navbar, Index)
4. Colleges page + admin CRUD
5. Blog system + admin CRUD
6. Google Drive connector integration
