-- Work Flow: candidate applications table + Row Level Security
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  job_title text not null,
  status text not null default 'Applied' check (status in ('Applied','Under Review','Shortlisted','Selected','Rejected')),
  created_at timestamptz not null default now()
);

alter table public.applications enable row level security;

create policy "Candidates can view their own applications"
on public.applications for select
to authenticated
using (auth.uid() = user_id);

create policy "Candidates can create their own applications"
on public.applications for insert
to authenticated
with check (auth.uid() = user_id);

create index if not exists applications_user_id_idx on public.applications(user_id);
create index if not exists applications_created_at_idx on public.applications(created_at desc);
