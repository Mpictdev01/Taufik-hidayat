import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function Footer() {
    const { data: profile } = await supabase.from('profile_settings').select('social_links').single();
    const links = profile?.social_links || { twitter: '#', linkedin: '#', github: '#', email: '#' };

    return (
        <footer className="mt-20 pt-8 border-t border-white/5 pb-8">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-sm text-center md:text-left">
                    © {new Date().getFullYear()} Taufik Hidayat. All rights reserved.
                </p>
                
                <div className="flex items-center gap-6 font-mono text-xs tracking-widest uppercase">
                    {links.github && <a href={links.github} target="_blank" className="text-slate-500 hover:text-white transition-colors">GitHub</a>}
                    {links.linkedin && <a href={links.linkedin} target="_blank" className="text-slate-500 hover:text-white transition-colors">LinkedIn</a>}
                    {links.twitter && <a href={links.twitter} target="_blank" className="text-slate-500 hover:text-white transition-colors">Twitter</a>}
                    {links.email && <a href={`mailto:${links.email}`} className="text-slate-500 hover:text-white transition-colors">Email</a>}
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-4">
                <Link href="/admin/login" className="opacity-0 hover:opacity-100 transition-opacity text-[10px] text-slate-700">
                    Admin
                </Link>
            </div>
        </footer>
    );
}
