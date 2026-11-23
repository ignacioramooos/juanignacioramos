DROP POLICY IF EXISTS "Anyone can submit service request" ON public.service_requests;
DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.contact_messages;
GRANT ALL ON public.service_requests TO service_role;
GRANT ALL ON public.contact_messages TO service_role;