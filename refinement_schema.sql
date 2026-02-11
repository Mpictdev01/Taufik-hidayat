-- Alter Projects Table
alter table public.projects 
add column if not exists client text,
add column if not exists role text,
add column if not exists year text,
add column if not exists demo_url text,
add column if not exists repo_url text,
add column if not exists overview text,
add column if not exists challenge text,
add column if not exists solution text,
add column if not exists features jsonb default '[]'::jsonb, -- Array of {title, description}
add column if not exists detail_images jsonb default '[]'::jsonb; -- Array of image urls

-- Alter Profile Settings Table
alter table public.profile_settings
add column if not exists maps_url text,
add column if not exists social_links jsonb default '{"twitter": "#", "linkedin": "#", "github": "#", "email": "#"}'::jsonb;
