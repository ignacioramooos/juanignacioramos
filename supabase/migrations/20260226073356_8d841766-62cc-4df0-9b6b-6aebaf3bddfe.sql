
-- Drop all existing RESTRICTIVE policies

-- blog_posts
DROP POLICY IF EXISTS "Admins can delete posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can insert posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can update posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can view all posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Public can view published posts" ON public.blog_posts;

-- colleges
DROP POLICY IF EXISTS "Admins can delete colleges" ON public.colleges;
DROP POLICY IF EXISTS "Admins can insert colleges" ON public.colleges;
DROP POLICY IF EXISTS "Admins can update colleges" ON public.colleges;
DROP POLICY IF EXISTS "Public can view colleges" ON public.colleges;

-- contact_messages
DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.contact_messages;
DROP POLICY IF EXISTS "No one can delete contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "No one can update contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "No public read access" ON public.contact_messages;

-- profiles
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- user_roles
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

-- Recreate all as PERMISSIVE

-- blog_posts
CREATE POLICY "Public can view published posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Admins can view all posts" ON public.blog_posts FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update posts" ON public.blog_posts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete posts" ON public.blog_posts FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- colleges
CREATE POLICY "Public can view colleges" ON public.colleges FOR SELECT USING (true);
CREATE POLICY "Admins can insert colleges" ON public.colleges FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update colleges" ON public.colleges FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete colleges" ON public.colleges FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- contact_messages
CREATE POLICY "Anyone can submit a contact message" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (id = auth.uid());

-- user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (user_id = auth.uid());
