-- Work Flow reviews: run this once in Supabase SQL Editor if needed.
alter table public.reviews enable row level security;

drop policy if exists public_insert_reviews on public.reviews;
create policy public_insert_reviews on public.reviews
for insert to anon, authenticated
with check (true);

drop policy if exists public_read_reviews on public.reviews;
create policy public_read_reviews on public.reviews
for select to anon, authenticated
using (status = 'approved');

-- Optional: only use this if you want browser-side deletion from an admin page.
-- Do NOT enable this for a public admin page without real authentication.
-- create policy public_delete_reviews on public.reviews
-- for delete to authenticated using (true);
