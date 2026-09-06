-- Allows anonymous (unauthenticated) uploads to the Jersey_2026 bucket.
-- Needed because the /product_jersey page has no login — buyers upload
-- their payment screenshot as the Supabase "anon" role.
-- Run this in Supabase Dashboard → SQL Editor.

create policy "Allow anon uploads to Jersey_2026"
on storage.objects
for insert
to anon
with check (bucket_id = 'Jersey_2026');
