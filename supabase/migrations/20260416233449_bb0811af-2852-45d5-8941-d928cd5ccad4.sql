-- Gallery images table
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  taken_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  width INTEGER,
  height INTEGER,
  display_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published gallery images"
  ON public.gallery_images FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can view all gallery images"
  ON public.gallery_images FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert gallery images"
  ON public.gallery_images FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update gallery images"
  ON public.gallery_images FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete gallery images"
  ON public.gallery_images FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_gallery_images_published_at ON public.gallery_images(published_at DESC);

-- Storage bucket for gallery (public read, admin write)
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view gallery files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

CREATE POLICY "Admins can upload gallery files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'gallery' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update gallery files"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'gallery' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete gallery files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'gallery' AND has_role(auth.uid(), 'admin'::app_role));