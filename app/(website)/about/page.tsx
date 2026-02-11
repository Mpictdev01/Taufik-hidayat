'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type AboutSection = {
    section: string;
    title: string;
    subtitle: string;
    description: string;
    image_url: string;
    stats: any;
};

export default function About() {
  const [data, setData] = useState<Record<string, AboutSection>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        const { data: sections, error } = await supabase.from('about_page').select('*');
        if (!error && sections) {
            const mapped = sections.reduce((acc, curr) => ({ ...acc, [curr.section]: curr }), {});
            setData(mapped);
        }
        setLoading(false);
    };
    fetchData();
  }, []);

  const profile = data['profile'] || {};
  const philosophyPeak = data['philosophy_peak'] || {};
  const philosophyMech = data['philosophy_mech'] || {};

  // Default fallbacks if DB empty
  const defaultImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuDnpj1mffyWXPbzyzPk3iZ9JCGjDApQj6dq6nMkhPAY2v9RLzW7JbVCOo3zAXxLDf44VKOaOaA0d1fkobtzYq1TVB57axrNJAcoNKF-WlleDcQKx56qTXantbFDFTTAO_dKU_KWXGTsC4-DZVaidkJomFd5LytZSCajJEVLmYZ7Pi45dGKjD4SPPttBTok3lH-StNglGXmA8TPJmRI-9iY9ubaRVFB7o1oq6EQLAopxv7a0ZiBcU_CjnrRI7rqAtsbyhngssIsfAaRs";

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading profile...</div>;

  return (
    <main className="relative z-10 flex flex-col items-center w-full pt-32 pb-20 px-4 md:px-8">
      {/* Dev Profile Section */}
      <section className="w-full max-w-5xl mb-32 scroll-mt-28" id="dev">
        <div className="glass-card rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="relative group shrink-0 mx-auto md:mx-0">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border border-white/10 relative z-10 shadow-2xl">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                    src={profile.image_url || defaultImage} 
                    alt="Portrait" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
              </div>
              <div className="absolute -bottom-4 -right-4 z-20 bg-background-dark border border-white/10 rounded-xl p-3 flex items-center gap-2 shadow-2xl">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-accent"></span>
                </span>
                <span className="text-xs font-bold text-white whitespace-nowrap">Available for work</span>
              </div>
            </div>
            <div className="flex-1 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-accent/10 text-emerald-accent border border-emerald-accent/20">System Optimized</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">{profile.title || 'Building Digital Systems'}</h2>
                <p className="text-xl text-primary font-medium">{profile.subtitle || 'Web Developer'}</p>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                {profile.description || 'Loading bio...'}
              </p>
              
              {/* Dynamic Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                {Array.isArray(profile.stats) && profile.stats.map((stat: any, idx: number) => (
                    <div key={idx} className="flex flex-col gap-1">
                        <span className="text-slate-500 text-xs uppercase tracking-widest font-semibold">{stat.label}</span>
                        <div className="flex items-center gap-2 text-white text-2xl font-bold">
                            <span className={`material-symbols-outlined ${stat.icon_color || 'text-white'}`}>{stat.icon || 'star'}</span> 
                            {stat.value}<span className="text-slate-600 text-base font-normal">{stat.sub}</span>
                        </div>
                    </div>
                ))}
              </div>

              <div className="pt-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Core Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-medium hover:border-primary/50 hover:text-primary transition-all cursor-default">React.js</span>
                  <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-medium hover:border-primary/50 hover:text-primary transition-all cursor-default">Node.js</span>
                  <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-medium hover:border-primary/50 hover:text-primary transition-all cursor-default">Python Automation</span>
                  <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-medium hover:border-primary/50 hover:text-primary transition-all cursor-default">Smart Contracts</span>
                  <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-medium hover:border-primary/50 hover:text-primary transition-all cursor-default">Tailwind CSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="w-full max-w-5xl mb-32 scroll-mt-28" id="human">
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3 shrink-0">
            <span className="material-symbols-outlined text-emerald-accent text-3xl">fluid</span> Beyond The Code
          </h2>
          <div className="h-px bg-white/5 flex-1"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Card 1 */}
          <div className="glass-card rounded-3xl overflow-hidden group hover:border-emerald-accent/40 transition-all duration-500">
            <div className="h-56 bg-cover bg-center relative" style={{backgroundImage: `url('${philosophyPeak.image_url || defaultImage}')`}}>
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
              <div className="absolute bottom-6 left-8">
                <span className="p-3 rounded-xl bg-emerald-accent/10 text-emerald-accent mb-3 inline-flex backdrop-blur-md border border-emerald-accent/20">
                  <span className="material-symbols-outlined">landscape</span>
                </span>
                <h3 className="text-2xl font-bold text-white">{philosophyPeak.title || 'Peak Performance'}</h3>
              </div>
            </div>
            <div className="p-8">
              <p className="text-slate-400 leading-relaxed">
                {philosophyPeak.description || 'Loading...'}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-3xl overflow-hidden group hover:border-primary/40 transition-all duration-500">
            <div className="h-56 bg-cover bg-center relative" style={{backgroundImage: `url('${philosophyMech.image_url || defaultImage}')`}}>
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
              <div className="absolute bottom-6 left-8">
                <span className="p-3 rounded-xl bg-primary/10 text-primary mb-3 inline-flex backdrop-blur-md border border-primary/20">
                  <span className="material-symbols-outlined">settings_input_component</span>
                </span>
                <h3 className="text-2xl font-bold text-white">{philosophyMech.title || 'Mechanical Precision'}</h3>
              </div>
            </div>
            <div className="p-8">
              <p className="text-slate-400 leading-relaxed">
                {philosophyMech.description || 'Loading...'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Section - Static for now */}
      <section className="w-full max-w-4xl scroll-mt-28" id="contact">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-primary/10 text-primary mb-6 border border-primary/20">
            <span className="material-symbols-outlined text-3xl">sensors</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Initialize Connection</h2>
          <p className="text-slate-400 text-lg">Ready to upgrade your infrastructure? Submit your parameters below.</p>
        </div>
        <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
          <form className="space-y-10 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="group relative">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 group-focus-within:text-primary transition-colors" htmlFor="name">Identifier</label>
                <input className="input-glass neon-focus block w-full px-4 py-4 text-white rounded-xl focus:outline-none focus:ring-0 border-transparent placeholder:text-slate-600" id="name" placeholder="Your Name" required type="text"/>
              </div>
              <div className="group relative">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 group-focus-within:text-primary transition-colors" htmlFor="email">Return Channel</label>
                <input className="input-glass neon-focus block w-full px-4 py-4 text-white rounded-xl focus:outline-none focus:ring-0 border-transparent placeholder:text-slate-600" id="email" placeholder="Email Address" required type="email"/>
              </div>
            </div>
            {/* ... rest of existing form ... */}
             <div className="group relative">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 group-focus-within:text-primary transition-colors" htmlFor="subject">Project Category</label>
              <div className="relative">
                <select className="input-glass neon-focus block w-full px-4 py-4 text-slate-300 rounded-xl focus:outline-none focus:ring-0 border-transparent cursor-pointer appearance-none" id="subject" defaultValue="">
                  <option className="bg-slate-900" disabled value="">Select Inquiry Type</option>
                  <option className="bg-slate-900" value="freelance">Freelance Development</option>
                  <option className="bg-slate-900" value="automation">Process Automation</option>
                  <option className="bg-slate-900" value="web3">Web3/Crypto Integration</option>
                  <option className="bg-slate-900" value="other">General Protocol</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </div>
            <div className="group relative">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 group-focus-within:text-primary transition-colors" htmlFor="message">Transmission Data</label>
              <textarea className="input-glass neon-focus block w-full px-4 py-4 text-white rounded-xl focus:outline-none focus:ring-0 border-transparent resize-none placeholder:text-slate-600" id="message" placeholder="Describe your project requirements..." required rows={5}></textarea>
            </div>
            <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex gap-6">
                <Link className="text-slate-500 hover:text-white transition-all transform hover:scale-110" href="#">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
                </Link>
                <Link className="text-slate-500 hover:text-primary transition-all transform hover:scale-110" href="#">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                </Link>
              </div>
              <button className="w-full md:w-auto px-10 py-4 bg-primary text-background-dark text-base font-bold rounded-xl shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 group" type="submit">
                <span>Transmit Message</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="mt-32 text-slate-600 text-xs font-mono uppercase tracking-widest">
        <p>© 2024 Taufik Hidayat // Secure Connection Established // v1.0.4</p>
      </footer>
    </main>
  );
}
