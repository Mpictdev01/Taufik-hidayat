-- Existing Projects Table (If not already created)
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text not null,
  tech_stack text[] default '{}'::text[],
  image_url text,
  user_id uuid references auth.users not null
);

-- Profile Settings Table (Single Row expected)
create table public.profile_settings (
    id uuid default gen_random_uuid() primary key,
    full_name text not null default 'Taufik Hidayat',
    hero_title text not null default 'TAUFIK HIDAYAT',
    status_text text default 'Available for work',
    hero_description text,
    hero_image_url text,
    location text default 'Magelang, ID',
    location_coords text default '7.4797° S, 110.2177° E',
    email text,
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Tech Stacks Table
create table public.tech_stacks (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    icon_name text not null, -- Material Symbols name or custom
    category text, -- 'Frontend', 'Backend', 'Tools'
    color_class text default 'text-slate-400',
    sort_order int default 0,
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS Policies

-- Projects (Already defined, but ensuring)
alter table public.projects enable row level security;
create policy "Public projects view" on projects for select using (true);
create policy "Auth insert projects" on projects for insert with check (auth.role() = 'authenticated');
create policy "Auth update projects" on projects for update using (auth.role() = 'authenticated');
create policy "Auth delete projects" on projects for delete using (auth.role() = 'authenticated');

-- Profile Settings
alter table public.profile_settings enable row level security;
create policy "Public profile view" on profile_settings for select using (true);
create policy "Auth update profile" on profile_settings for update using (auth.role() = 'authenticated');
create policy "Auth insert profile" on profile_settings for insert with check (auth.role() = 'authenticated');

-- Tech Stacks
alter table public.tech_stacks enable row level security;
create policy "Public tech view" on tech_stacks for select using (true);
create policy "Auth all tech" on tech_stacks for all using (auth.role() = 'authenticated');

-- Storage Buckets
-- Ensure 'project-images' exists
insert into storage.buckets (id, name, public) values ('project-images', 'project-images', true) on conflict (id) do nothing;
-- Bucket for Hero/Profile images
insert into storage.buckets (id, name, public) values ('profile-assets', 'profile-assets', true) on conflict (id) do nothing;

create policy "Public profile assets" on storage.objects for select using ( bucket_id = 'profile-assets' );
create policy "Auth upload profile assets" on storage.objects for insert with check ( bucket_id = 'profile-assets' and auth.role() = 'authenticated' );
