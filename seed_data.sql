-- Script Seed Data dengan Pengecekan User
-- Masukkan script ini ke SQL Editor Supabase dan Run.

DO $$
DECLARE
    v_user_id uuid;
BEGIN
    -- 1. Cek apakah ada user?
    SELECT id INTO v_user_id FROM auth.users LIMIT 1;

    -- 2. Jika tidak ada user, STOP dan beri peringatan
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION '❌ ERROR: Belum ada User terdaftar! Harap Sign Up/Register akun baru di website Anda terlebih dahulu, lalu jalankan script ini lagi.';
    END IF;

    -- 3. Mulai Seed Data (Aman karena user sudah ada)
    
    -- Bersihkan data lama
    DELETE FROM public.profile_settings;
    DELETE FROM public.tech_stacks;
    DELETE FROM public.projects;

    -- Insert Profile
    INSERT INTO public.profile_settings (
        full_name, hero_title, status_text, hero_description, hero_image_url, location, location_coords, maps_url, social_links
    ) VALUES (
        'Taufik Hidayat', 'TAUFIK HIDAYAT', 'Available for work', 
        'Crafting digital experiences with a focus on automation, performance, and minimalistic aesthetics. Based in Indonesia.',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBXnx2Tx10nWun9jgtUQimDVPjRiiFNSH2qSVplo5mUO-ousoWq_dRnOdBUijcWL8Rrm5BFZp7EMITDazdJRuWKqzpwp-Qr-UUWZOHXZ6GT_IRlFE_i73p5cSNxF6v8D00YrHVZ4QGhNvmhFAcMHf4E2w3R7A-wKnfRa_1Fgerspwkb99vV5JHKUC1RITe0zoE_eU-RoKljNTjvbfgZ-fM8RZszcBos5hOf83cdH7FSjSn4zjfPclUGij70z_C0DoC6p9e8mInqqblb',
        'Magelang, ID', '7.4797° S, 110.2177° E',
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126646.20912170884!2d110.14494326938997!3d-7.481525046200259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a8f7c9e120157%3A0xc07ce3078a63240!2sMagelang%2C%20Magelang%20City%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1716538000000!5m2!1sen!2sid',
        '{"twitter": "https://twitter.com", "linkedin": "https://linkedin.com", "github": "https://github.com", "email": "me@example.com"}'::jsonb
    );

    -- Insert Tech Stack
    INSERT INTO public.tech_stacks (name, icon_name, category, color_class, sort_order) VALUES
    ('React.js', 'data_object', 'Frontend Ecosystem', 'text-blue-400', 1),
    ('Next.js', 'layers', 'Frontend Ecosystem', 'text-white', 2),
    ('TypeScript', 'code_blocks', 'Frontend Ecosystem', 'text-blue-500', 3),
    ('Tailwind CSS', 'style', 'Frontend Ecosystem', 'text-teal-400', 4),
    ('Framer Motion', 'animation', 'Frontend Ecosystem', 'text-fuchsia-400', 5),
    ('Node.js', 'terminal', 'Backend & Infrastructure', 'text-green-500', 6),
    ('Python', 'terminal', 'Backend & Infrastructure', 'text-amber-300', 7),
    ('Go', 'data_array', 'Backend & Infrastructure', 'text-cyan-400', 8),
    ('PostgreSQL', 'database', 'Backend & Infrastructure', 'text-blue-300', 9),
    ('Redis', 'bolt', 'Backend & Infrastructure', 'text-red-500', 10),
    ('Docker', 'directions_boat', 'DevOps & Tools', 'text-blue-400', 11),
    ('AWS', 'cloud', 'DevOps & Tools', 'text-orange-400', 12),
    ('Git', 'commit', 'DevOps & Tools', 'text-orange-600', 13),
    ('Figma', 'palette', 'DevOps & Tools', 'text-purple-400', 14),
    ('VS Code', 'code', 'DevOps & Tools', 'text-blue-500', 15);

    -- Insert Projects (Menggunakan v_user_id yang ditemukan)
    INSERT INTO public.projects (
        title, description, tech_stack, image_url, user_id, client, role, year, overview, challenge, solution, demo_url, repo_url
    ) VALUES 
    (
        'E-Commerce Automation Dashboard',
        'A centralized command center streamlining inventory synchronization and analytics for global retailers.',
        '{React, Node.js, Tailwind, GraphQL, AWS}',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDB9A9VyUZoOOaMSAfN5C_OMgWr9w8Dy-uugxHqstP39wNvZ5T1conVIh_97A2qaI9EJRNEmBhKJclYTsxZOjXb2WhZSwKkaVqGpI0CYfwqByHkgdYRyWXDN5sZGN_OeElOW4JEGSB3DJ-UVSzQmELF31UvfbzmPIlW54NoxP6zIYsSBYJ4WskTG6qHAdoTXP3m4iAYaRc9gUoT5Y-dVArvjbwTPIIuZQNTpBIY4cUxHHE_MXjQLAaTwwIH51aIh1Jd6U6woDt7VVi7',
        v_user_id,
        'Acme Corp Global',
        'Lead Developer & UI Designer',
        '2023',
        'The client, a rapidly expanding e-commerce leader, faced significant bottlenecks...',
        'Operational inefficiency was peaking. The team spent over 40 hours weekly on manual CSV uploads.',
        'I architected a serverless event-driven architecture. Using AWS Lambda triggers, we automated the synchronization process entirely.',
        'https://example.com/demo',
        'https://github.com/example/repo'
    ),
    (
        'FinTech Dashboard',
        'Real-time financial data visualization with React and D3.js. High-performance rendering for massive datasets.',
        '{React, D3, TypeScript}',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBDAHkabheUGD0Vb7kkiFrBF94H4ly2GOpkzpqpjyzOtMHodC7gsPrhC9v6qaBuEvhOSEK8fonoCAufJ-G7seNUVhavXoKIopSsKdWEiw-MfIy3u1tsLVZjRrt5cCjXdeWomIWBPuRB9AbTflseo0k02kmXdAnzF_KVOFS1WVm0j_GE7cq7qqK6eEIIolrPU8Zt89UHd_V9vBM6bQPuzyp5ejKkTfWWW1ThiIgNsIRlMyBbz6vFnmNO1JvVJIftpPYfeVPEZKsk-02h',
        v_user_id, 'FinTech Solutions', 'Frontend Dev', '2022', 'Overview...', 'Challenge...', 'Solution...', null, null
    ),
    (
        'Auto-Bot CLI',
        'A command-line tool for automating daily devops tasks and deployment pipelines.',
        '{Python, CLI, Docker}',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuARJ8gr9AdbS-JsDoYoaG5zatctVv-JduixpbBJ9cIQLgPPr7XIMQ0Sk_fcvvPlpqMpnSOnVjtIsvBSCRo-ly43KmRcTVkfQ8-ds8InxqJm2COzblCehjnw-NNtBbLuFAsyawdVWOVczMYllRBmh1ELRgSo_-Yw14inUcTiwexeJuk02NszQG95zHeo4B6veaZVuTKAbMguk9NRSMCp8rtec3pk9NYj8LzW9u4jguKvNtPla7qfElXnqB_9FbClDrRLH0npHumjXpyY',
        v_user_id, 'Internal', 'DevOps', '2023', 'Overview...', 'Challenge...', 'Solution...', null, null
    ),
    (
        'Team Flow',
        'Collaborative task management platform designed for remote teams with real-time updates.',
        '{Vue, Firebase, Tailwind}',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAoTr-tAJ4S2HnLggYfOG5CxbLX2jZuCBhAqQ9uLpBcvcCCn2a7-fpAv0deAToC-wQ-3BLSzO3uYdxHwkC807GOzcEIn3pu1aVtyTpQzxB_syQ7DSat8TbSvSFBttz202yzfBGzchIYaedtEp7GMdrzwlr49tKBOmabgsIwgHlFXVv2BTeARCQz_cpiU6MiMngNUMGLHknYeoRhSuu86sTSnXNlfUZZs8r0IuKkH1JlEiPgfcbzTpXgjKyzF39KWS6-_RBcmAFhY0Dq',
        v_user_id, 'Startup', 'Full Stack', '2023', 'Overview...', 'Challenge...', 'Solution...', null, null
    );

    RAISE NOTICE '✅ SUCCESS: Data berhasil di-seed ke user ID: %', v_user_id;
END $$;
