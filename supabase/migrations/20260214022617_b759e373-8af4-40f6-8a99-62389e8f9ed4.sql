
-- Prevent all updates to contact messages
CREATE POLICY "No one can update contact messages"
ON public.contact_messages
FOR UPDATE
USING (false);

-- Prevent all deletions of contact messages
CREATE POLICY "No one can delete contact messages"
ON public.contact_messages
FOR DELETE
USING (false);
