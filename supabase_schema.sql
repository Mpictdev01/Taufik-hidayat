-- Create Projects Table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text not null,
  tech_stack text[] default '{}'::text[],
  image_url text,
  user_id uuid references auth.users not null
);

-- Enable RLS
alter table public.projects enable row level security;

-- Policies
create policy "Public projects are viewable by everyone."
  on projects for select
  using ( true );

create policy "Users can insert their own projects."
  on projects for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own projects."
  on projects for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own projects."
  on projects for delete
  using ( auth.uid() = user_id );

-- Storage Bucket for Project Images
insert into storage.buckets (id, name, public) 
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

create policy "Project Images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'project-images' );

create policy "Authenticated users can upload project images."
  on storage.objects for insert
  with check ( bucket_id = 'project-images' and auth.role() = 'authenticated' );
