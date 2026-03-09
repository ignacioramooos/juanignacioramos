
-- Lab entries table
CREATE TABLE public.lab_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'idea',
  tags text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  date text NOT NULL DEFAULT to_char(now(), 'YYYY-MM-DD')
);

ALTER TABLE public.lab_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published lab entries" ON public.lab_entries FOR SELECT USING (published = true);
CREATE POLICY "Admins can view all lab entries" ON public.lab_entries FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert lab entries" ON public.lab_entries FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update lab entries" ON public.lab_entries FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete lab entries" ON public.lab_entries FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Ideas table
CREATE TABLE public.ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'idea',
  icon text NOT NULL DEFAULT 'Lightbulb',
  published boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published ideas" ON public.ideas FOR SELECT USING (published = true);
CREATE POLICY "Admins can view all ideas" ON public.ideas FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert ideas" ON public.ideas FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update ideas" ON public.ideas FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete ideas" ON public.ideas FOR DELETE USING (has_role(auth.uid(), 'admin'));
