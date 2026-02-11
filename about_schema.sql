-- Create About Page Table
create table if not exists public.about_page (
    id uuid default gen_random_uuid() primary key,
    section text not null unique, -- 'profile', 'philosophy_peak', 'philosophy_mech'
    title text,
    subtitle text,
    description text,
    image_url text,
    stats jsonb default '{}'::jsonb, -- For profile stats
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS
alter table public.about_page enable row level security;
create policy "Public about view" on about_page for select using (true);
create policy "Auth update about" on about_page for all using (auth.role() = 'authenticated');

-- Seed Initial Data (Matches current hardcoded content)
insert into public.about_page (section, title, subtitle, description, image_url, stats) values
(
    'profile',
    'Building Digital Systems',
    'Web Developer & Automation Specialist',
    'Specializing in high-impact solutions, workflow automation, and Web3 integration. I bridge the gap between complex manual processes and streamlined digital performance with high-tech minimalist architecture.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDnpj1mffyWXPbzyzPk3iZ9JCGjDApQj6dq6nMkhPAY2v9RLzW7JbVCOo3zAXxLDf44VKOaOaA0d1fkobtzYq1TVB57axrNJAcoNKF-WlleDcQKx56qTXantbFDFTTAO_dKU_KWXGTsC4-DZVaidkJomFd5LytZSCajJEVLmYZ7Pi45dGKjD4SPPttBTok3lH-StNglGXmA8TPJmRI-9iY9ubaRVFB7o1oq6EQLAopxv7a0ZiBcU_CjnrRI7rqAtsbyhngssIsfAaRs',
    '[
        {"label": "Fastwork Rating", "value": "4.9", "sub": "/5.0", "icon": "grade", "icon_color": "text-yellow-500"},
        {"label": "Experience", "value": "5+", "sub": "Yrs", "icon": "history", "icon_color": "text-primary"},
        {"label": "Deployments", "value": "120+", "sub": "", "icon": "hub", "icon_color": "text-emerald-500"}
    ]'::jsonb
),
(
    'philosophy_peak',
    'Peak Performance',
    '',
    'When the screen goes dark, I find clarity in the clouds. An avid hiker with a deep connection to the silhouette of Mt. Merbabu. High-altitude trekking provides the perspective needed for complex problem-solving.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDhSxQ86iO_RvBgKHQqUHStQj_Aml73A5_T_6sZySkBEKrNtGh0Jxi12Mvww75CKSH0SZBD3S6rWRWS5_rB5eyWCdMcom_fT7Iu9-WRB2Mfbq0tcm732B2biCe5yGZG3y-7TgCxfn1V9a-GmerULglzgk0xXOxOVsWlrWQ8LfQHtTkr6vuU_H41LNl61izbHvfagBqguJ2GS4on1rHAzBewxyifdn22H49bBfaIk6wKHFf9D4ar3lpJKU26QTDHVqhbJbw9JV-BBFs5',
    '{}'::jsonb
),
(
    'philosophy_mech',
    'Mechanical Precision',
    '',
    'Precision isn''t limited to syntax. My passion for automotive engineering and the Toyota Vios reflects my obsession with tuning every component for maximum efficiency and aesthetic balance.',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBiUa8bYzc3-83olCvYN7mQf9aKMl6espe-CwGaLuMiNBjT1df5b9tn9rdf-5-UpjPZ3eYk4zmi8woZjS1fOfBg4nDPAeR0Vucgbk-gy5369RrnL_WHdie9WB-iD7jgnduqIYpu9Tr3XEF4CngkV0HIfV4uOVQPdjkge0rpZ_tlW-W6Bu9iJjeQE3XuKULr0gI3CTNj8mY1PqFUhTWkn4yO36IOzDnWb2ye3vp3FDfHY7ovnY9KKD_T-f_uK1V02RKGeISbbHPoEkGt',
    '{}'::jsonb
)
on conflict (section) do nothing;
