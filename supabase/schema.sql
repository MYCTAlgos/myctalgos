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

-- Client status tracking: lets the admin dashboard track project stage and
-- internal notes per discovery submission (i.e. per client). Restricted to
-- the "status" and "status_notes" columns via column-level grant, so
-- authenticated admins can update progress without being able to touch the
-- client's original submitted answers.
alter table discovery_submissions add column if not exists status text not null default 'idea';
alter table discovery_submissions add column if not exists status_notes text;

alter table discovery_submissions drop constraint if exists discovery_status_check;
alter table discovery_submissions add constraint discovery_status_check
  check (status in ('idea', 'learning', 'building', 'teaching', 'delivered'));

drop policy if exists "Allow authenticated update status" on discovery_submissions;
create policy "Allow authenticated update status" on discovery_submissions
  for update
  to authenticated
  using (true)
  with check (true);

grant update (status, status_notes) on discovery_submissions to authenticated;

-- Day-after Calendly follow-up: a cron job (using the service_role key,
-- which bypasses RLS) checks for submissions from ~24-48 hours ago that
-- haven't been followed up on yet, and marks them once the email sends.
alter table contact_submissions add column if not exists followup_sent_at timestamptz;
alter table discovery_submissions add column if not exists followup_sent_at timestamptz;

-- Backfill: mark all existing rows (test submissions and your actual first
-- client) as already followed-up, so the cron only ever acts on submissions
-- from this point forward. Without this, the very first cron run could
-- email a confusing "please schedule" note to someone you're already
-- talking to.
update contact_submissions set followup_sent_at = now() where followup_sent_at is null;
update discovery_submissions set followup_sent_at = now() where followup_sent_at is null;
