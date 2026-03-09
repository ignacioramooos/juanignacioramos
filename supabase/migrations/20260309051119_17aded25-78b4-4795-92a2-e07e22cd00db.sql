
CREATE TABLE public.service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  service text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  description text NOT NULL DEFAULT '',
  budget_range text,
  deadline text,
  industry text,
  file_url text,
  status text NOT NULL DEFAULT 'new'
);

ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit service request"
  ON public.service_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view service requests"
  ON public.service_requests FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update service requests"
  ON public.service_requests FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete service requests"
  ON public.service_requests FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));
