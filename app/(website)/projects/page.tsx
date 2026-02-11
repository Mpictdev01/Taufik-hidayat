'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Project {
  id: number;
  title: string;
  year: string;
  image: string;
  description: string;
  tech: string[];
  category: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Solana NFT Marketplace',
    year: '2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVQ1QaZ5YYuERreNMm-68egdd8c2TWVZr7KNT2WT64IOTkp6L0uolKe-R5hMsBr9DuqlIMkw9hrEAE8xFBNM9P0qDZtk82VplPCfdRaTXPkchzX53fanrouApwyhQqkDOJNViLnMxrQEK-LWElgU0lcz4FJJt5bHRxwEc9QaVM2Zuw4zfqOus4iwx1A3t6Cf0rpwXooEk5bMuSNlTjoymdijMiJbvsza44aQHZVYLqmZscbWwmHosC4Y0hXUqAC19SnNPHYnkRDuii',
    description: 'High-performance NFT exchange architecture built for sub-second finality and zero-congestion trades.',
    tech: ['Solana', 'Rust', 'Next.js'],
    category: 'Web3_Core'
  },
  {
    id: 2,
    title: 'E-Com Automation Bot',
    year: '2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMuhkED198fUTGamocbiChNB9jPG3LhpMmU31Dm19tAl41daoHUJ2ucKd9FudO6Wx6AJkgm67mrxqS7VtDYou_6BO-rePOQ7H4d4lNHtN8VJY1dbr75aMg3fRFBT6G8X3mQHEA1ljP5ED0SYV2U07nr9T5hQek4TPmN6P8AeLZra_3D9L-rM1KT663jpusLPLdHPrLSSTbD0fZB5RU77EevVivM65f20NIUMy_j2MbY0O1TYtPvWp-0GJbX5hqwvG47SSRksrRrykp',
    description: 'Scaleable inventory synchronization engine with automated price discovery and multi-channel deployment.',
    tech: ['Python', 'Selenium', 'Docker'],
    category: 'Automation'
  },
  {
    id: 3,
    title: 'SaaS Dashboard',
    year: '2023',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf7t9UnKfy4NGjmNDbk6dXjrCssDROnfBh7zXq2RTYhwpK1fuMRm0NTxDXGPlnEhtrjrwYpOOum4nvEfJlQwYr5e41LPK0kSL-iMe3NLqh5Y21ef8w9BH67Z2XC11uRLodOmkvo73z6Vgiij0V5_gk5zVllz-yingepLHkOXSIIaO6_-ZTI6WnguWEBKgJOBvFllqD1CLuV-TfWzU4ouCYOex27K_DIEdisvPhWI0AXe6R8HbuifJYp8kuo0FjYlOrU9BO03rAJPRJ',
    description: 'Enterprise-grade analytics visualizer featuring real-time telemetry and predictive usage modeling.',
    tech: ['React', 'Tailwind', 'Firebase'],
    category: 'Web_Apps'
  },
  {
    id: 4,
    title: 'DeFi Swap Interface',
    year: '2022',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxjfXvGi5eqkYljDPwjCoacUlzcZj7W09zJXxDFVqHq7B2fHpqzuW9F4RlJKJagAgORXhsVYJtZ7xPgzeL1PYvGpOIk2f9-TxT3pF4MMjJ0jITFUo4ZdqzisRdIz0uQfzBfZjF05WLjF6DVrtFEf7sjDeEs7VYHPmKKk6nTIO7t2hT_b4-4DvpfXgYXiu5t4jRyAFcBnVAdVctq_GOInV1WqVJxPDOx3ONA9gSPeyIrZBA7CsWPoCsUODC670BBzALdcTZi-CFAihL',
    description: 'Multi-chain liquidity aggregator with gas-optimized routing and slippage protection protocols.',
    tech: ['Web3', 'Solidity', 'Vue'],
    category: 'Web3_Core'
  },
  {
    id: 5,
    title: 'Telegram Trading Bot',
    year: '2024',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-utmcuhc_gQJmxTmo4rIcWh7R_vxVDrojnQzE21N2AaJsdv-g3V0wq8XraFaafYKVqTDi8WzzLxq0TFCPdUdfGXtxNbBKiUJfZuYB2h6G3erDsR93oada5er1B-g-uq7nc2fIfScreqGIyxCrp8vdAEv9D0hGkH0LmRQcVUpcErZKPFcaBovVmfHtrPr06I0j1Ykr4_b9KxgQHS81FEK7qBsij0qDzb4E21Bxvp9e3K17w9PYTmSZEXd3AI4bbwbkTMRqOn2-DGBT',
    description: 'Automated trading assistant with web-hook alerts, technical analysis integration, and instant execution.',
    tech: ['Node.js', 'Telegraf', 'Mongo'],
    category: 'Automation'
  },
  {
    id: 6,
    title: 'Portfolio V1',
    year: '2021',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-CEtAgzPV4gDDco0Yvl7q6ubg08y2utpNfWBC69LZaJZzeghDrSJiC5oR4QRn8Fx-mmpumPmILtMgsfsEgTMWunfsJ65zpfSWYjDllmVQ2-HVkb9Fza8U9XCoAWfTat1QRlncCyO_Kv7_1TRqMOieBvmOVN8TfX_eDWfErvssJXQ5SH-B-O-SPWxrcSAqFNjCBq3sSToPdWOG98HDxvOk_Zum2U5v6ncWGSrFBYwEHllntKvjA8o4_mPXF6kUe0USMbal5vVyZ52x',
    description: 'Initial experiment in minimalist digital identity, focusing on performance and core web vitals.',
    tech: ['HTML', 'SCSS', 'JS'],
    category: 'Web_Apps'
  }
];

const categories = ['All_Units', 'Web_Apps', 'Mobile_OS', 'Web3_Core', 'Automation'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All_Units');
  const [searchQuery, setSearchQuery] = useState('');

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
                activeCategory === cat ? 'filter-chip-active' : 'filter-chip-inactive'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <article key={project.id} className="glass-card rounded-xl overflow-hidden group flex flex-col h-full">
            <div className="px-5 py-3.5 flex justify-between items-center border-b border-white/10 bg-white/5">
              <h3 className="text-white text-sm font-bold tracking-tight font-mono uppercase">{project.title}</h3>
              <span className="text-[10px] font-mono text-emerald-highlight">{project.year}</span>
            </div>
            {/* Image Container */}
            <div className="w-full aspect-[16/10] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent opacity-80 z-10 group-hover:opacity-40 transition-opacity"></div>
              <div 
                className="w-full h-full bg-cover bg-center image-hover-zoom" 
                style={{backgroundImage: `url('${project.image}')`}}
              ></div>
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/projects/${project.id}`} className="bg-primary text-deep-navy font-bold rounded px-4 py-2 text-xs font-mono flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  VIEW_DATA <span className="material-symbols-outlined text-sm">open_in_new</span>
                </Link>
              </div>
            </div>
            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                {project.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span key={i} className="tech-badge">{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

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
