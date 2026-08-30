-- Work Flow reviews RLS
alter table public.reviews enable row level security;

drop policy if exists public_insert_reviews on public.reviews;
create policy public_insert_reviews on public.reviews
for insert to anon, authenticated
with check (status = 'pending');

drop policy if exists public_read_reviews on public.reviews;
create policy public_read_reviews on public.reviews
for select to anon, authenticated
using (status = 'approved');

drop policy if exists authenticated_manage_reviews on public.reviews;
create policy authenticated_manage_reviews on public.reviews
for select to authenticated
using (true);

drop policy if exists authenticated_update_reviews on public.reviews;
create policy authenticated_update_reviews on public.reviews
for update to authenticated
using (true)
with check (status in ('approved','rejected','pending'));
