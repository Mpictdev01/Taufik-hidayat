import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function Footer() {
    const { data: profile } = await supabase.from('profile_settings').select('social_links').single();
    const links = profile?.social_links || { twitter: '#', linkedin: '#', github: '#', email: '#' };

    return (
        <footer className="mt-20 pt-10 border-t border-white/5 bg-background-dark/50 backdrop-blur-sm pb-10">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <p className="text-slate-500 text-sm">© 2024 Taufik Hidayat. Built with <span className="text-primary/60">Modern Stack</span>.</p>
                     <Link href="/admin/login" className="opacity-0 hover:opacity-100 transition-opacity text-[10px] text-slate-700">Thinking about Admin?</Link>
                </div>
                
                <div className="flex gap-8 font-mono text-xs tracking-widest uppercase">
                    {links.twitter && <a href={links.twitter} target="_blank" className="text-slate-400 hover:text-primary transition-colors">Twitter</a>}
                    {links.linkedin && <a href={links.linkedin} target="_blank" className="text-slate-400 hover:text-primary transition-colors">LinkedIn</a>}
                    {links.github && <a href={links.github} target="_blank" className="text-slate-400 hover:text-primary transition-colors">GitHub</a>}
                    {links.email && <a href={`mailto:${links.email}`} className="text-slate-400 hover:text-primary transition-colors">Email</a>}
                </div>
            </div>
        </footer>
    );
}
