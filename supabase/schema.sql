-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  interest text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table contact_submissions enable row level security;

-- Allow inserts from the anon key (used server-side by the /api/contact route).
-- No select/update/delete policy is defined, so submissions can't be read
-- back with the anon key -- only from the Supabase dashboard or a service key.
create policy "Allow anon insert" on contact_submissions
  for insert
  to anon
  with check (true);

-- RLS policies alone aren't enough -- with "Automatically expose new
-- tables" disabled, Postgres also needs an explicit table-level grant.
grant insert on contact_submissions to anon;

create table if not exists discovery_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  business_name text not null,
  industry text not null,
  business_type text not null,
  years_operating text not null,
  audience text not null,
  interests text[] not null,
  learn_topics text[],
  learn_other text,
  build_services text[],
  build_details text,
  budget text not null,
  timeline text not null,
  scale_features text[],
  scale_other text,
  referral_source text,
  message text,
  created_at timestamptz not null default now()
);

alter table discovery_submissions enable row level security;

create policy "Allow anon insert" on discovery_submissions
  for insert
  to anon
  with check (true);

grant insert on discovery_submissions to anon;

-- Migration: run this if discovery_submissions already exists without
-- these columns (e.g. it was created before this schema update).
alter table discovery_submissions add column if not exists phone text;
alter table discovery_submissions add column if not exists budget text;
alter table discovery_submissions add column if not exists timeline text;
alter table discovery_submissions add column if not exists referral_source text;

-- Admin dashboard access: anyone who successfully signs in through Supabase
-- Auth (only Mike and Yadley, since public sign-up is disabled) can read
-- submissions. The anon key still can't read anything, only insert.
create policy "Allow authenticated read" on contact_submissions
  for select
  to authenticated
  using (true);

grant select on contact_submissions to authenticated;

create policy "Allow authenticated read" on discovery_submissions
  for select
  to authenticated
  using (true);

grant select on discovery_submissions to authenticated;
