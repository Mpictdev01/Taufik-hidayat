'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Project {
  id: string; // Database ID is UUID
  title: string;
  year: string;
  image_url: string; // from DB
  description: string;
  tech_stack: string[]; // from DB
  category?: string;
  created_at: string;
}

// Categories we want to filter by, hardcoded for UI structure
const categories = ['All_Units', 'Web_Apps', 'Mobile_OS', 'Web3_Core', 'Automation'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All_Units');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setProjects(data as unknown as Project[]);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'All_Units' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-12 pt-32">
      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-emerald-highlight">
            <span className="h-px w-8 bg-emerald-highlight"></span>
            <span className="text-xs font-mono uppercase tracking-widest">Repository / archive_2024</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
            Project Grid<span className="text-sky-blue">.</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-base font-light font-display leading-relaxed">
            Exploring the intersection of <span className="text-white font-medium">Web Architecture</span> and <span className="text-white font-medium">Automation Logic</span>.
          </p>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded mb-2">
            <p className="text-primary font-mono text-[10px] tracking-tighter uppercase">Status: {filteredProjects.length} Projects Active</p>
          </div>
          <p className="text-slate-500 font-mono text-[10px]">TIMESTAMP: 2024.10.24.0800</p>
        </div>
      </div>

      {/* Filter & Search Section */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start lg:items-center justify-between">
        <div className="w-full lg:w-[450px] group relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-500 text-xl group-focus-within:text-primary transition-colors">search</span>
          </div>
          <input 
            type="text" 
            className="block w-full pl-12 pr-4 py-3 border border-white/10 rounded-lg bg-white/5 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 focus:bg-white/[0.07] transition-all font-mono text-sm"
            placeholder="Query archive..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-[10px] text-slate-600 font-mono bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">F1</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded text-xs font-mono transition-all uppercase tracking-tighter ${
                activeCategory === cat ? 'filter-chip-active bg-primary/20 text-primary border border-primary/50' : 'filter-chip-inactive bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-emerald-highlight font-mono text-sm animate-pulse">
              <span className="material-symbols-outlined mb-2 text-3xl">hourglass_empty</span>
              FETCHING_DATA_FROM_SUPABASE_NODE...
          </div>
      ) : (
        <>
          {filteredProjects.length === 0 ? (
             <div className="py-20 text-center text-slate-500 font-mono text-sm border border-dashed border-white/10 rounded-xl">
               NO_PROJECTS_FOUND_MATCHING_QUERY
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
          <article key={project.id} className="glass-card rounded-xl overflow-hidden group flex flex-col h-full">
            <div className="px-5 py-3.5 flex justify-between items-center border-b border-white/10 bg-white/5">
              <h3 className="text-white text-sm font-bold tracking-tight font-mono uppercase truncate">{project.title}</h3>
              <span className="text-[10px] font-mono text-emerald-highlight whitespace-nowrap">{project.year || new Date(project.created_at).getFullYear()}</span>
            </div>
            {/* Image Container */}
            <div className="w-full aspect-[16/10] overflow-hidden relative group/img cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent opacity-80 z-10 group-hover/img:opacity-40 transition-opacity duration-500"></div>
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover/img:scale-110" 
                style={{backgroundImage: `url('${project.image_url || 'https://via.placeholder.com/600x400/111/444?text=NO_IMAGE'}')`}}
              ></div>
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                <Link href={`/projects/${project.id}`} className="bg-primary text-deep-navy font-bold rounded px-4 py-2 text-xs font-mono flex items-center gap-2 transform translate-y-4 group-hover/img:translate-y-0 transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                  VIEW_DATA <span className="material-symbols-outlined text-sm">open_in_new</span>
                </Link>
              </div>
            </div>
            {/* Content */}
            <div className="p-6 flex flex-col flex-grow bg-background-dark/50">
              <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 min-h-[40px]">
                {project.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                {project.tech_stack?.length > 0 ? project.tech_stack.slice(0, 4).map((t, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-slate-300">{t}</span>
                )) : <span className="text-[10px] font-mono px-2 py-1 text-slate-500">Unspecified stack</span>}
              </div>
            </div>
          </article>
        ))}
      </div>
          )}
        </>
      )}

      {/* Footer Visual Button */}
      <div className="mt-20 flex flex-col items-center">
        <div className="w-full h-px bg-white/10 mb-8"></div>
        <button className="group relative px-10 py-4 font-mono text-xs font-bold text-primary border border-primary/20 hover:border-primary/60 transition-all rounded overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative flex items-center gap-3">
            <span className="material-symbols-outlined text-lg">sync</span>
            FETCH_ADDITIONAL_MODULES
          </span>
        </button>
      </div>

      {/* Simple Footer for this page */}
      <footer className="border-t border-white/10 mt-auto pt-10 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-2">
                <p className="text-slate-500 font-mono text-[10px] tracking-widest uppercase">© 2024 Taufik Hidayat // ARCHIVE_CORE</p>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-highlight"></span>
                    <span className="text-emerald-highlight font-mono text-[9px] uppercase tracking-tighter">System Status: Operational</span>
                </div>
            </div>
            {/* Social icons if needed */}
        </div>
      </footer>
    </main>
  );
}
