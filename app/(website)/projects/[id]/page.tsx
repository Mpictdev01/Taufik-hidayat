import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ProjectSlider from '@/components/ProjectSlider';

export const revalidate = 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProjectDetail({ params }: any) {
    const { id } = await params;
    
    // Fetch Project
    const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error || !project) {
        notFound();
    }
    
    // Find Next/Prev logic would require client side or complex query, simpler to just use ID +/- 1 logic if sequential, 
    // but since IDs are UUIDs, we can't do math.
    // For now, let's just query a list to find neighbors or omit standard prev/next for MVP if UUID.
    // Actually, let's fetch ALL IDs ordered by date to find neighbors.
    const { data: allProjects } = await supabase.from('projects').select('id').order('created_at', { ascending: false });
    const currentIndex = allProjects?.findIndex(p => p.id === id) || 0;
    const prevId = currentIndex > 0 ? allProjects?.[currentIndex - 1].id : null;
    const nextId = currentIndex < (allProjects?.length || 0) - 1 ? allProjects?.[currentIndex + 1].id : null;

    // Combine Cover Image + Gallery Images
    const allImages = [project.image_url, ...(project.gallery_urls || [])].filter(Boolean);

  return (
    <div className="flex-1 max-w-[1440px] mx-auto w-full px-6 lg:px-12 py-12 lg:py-20 lg:pt-32">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
            {/* Sidebar */}
            <aside className="w-full lg:w-[340px] xl:w-[380px] flex-shrink-0">
                <div className="lg:sticky lg:top-32 space-y-10">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] border border-primary/20">Case Study</span>
                            <span className="px-3 py-1 rounded-md bg-white/5 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] border border-white/5">{project.year || '2024'}</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold leading-[1.1] mb-6 text-white tracking-tight">
                            {project.title}
                        </h1>
                        <p className="text-slate-400 leading-relaxed font-light text-lg">
                            {project.description}
                        </p>
                    </div>

                    <div className="glass-panel neon-border rounded-2xl p-8 space-y-8 shadow-glass">
                        <div className="space-y-2">
                            <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Client</p>
                            <p className="text-white font-medium flex items-center gap-2 text-lg">
                                <span className="material-symbols-outlined text-primary/60 text-xl">business</span>
                                {project.client || 'Self-Initiated'}
                            </p>
                        </div>
                        <div className="w-full h-px bg-white/5"></div>
                        <div className="space-y-2">
                            <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Role</p>
                            <p className="text-white font-medium text-lg">{project.role || 'Full Stack Developer'}</p>
                        </div>
                        <div className="w-full h-px bg-white/5"></div>
                        <div className="space-y-3">
                            <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">Tech Stack</p>
                            <div className="flex flex-wrap gap-2 pt-1 font-mono">
                                {project.tech_stack?.map((tech: string, i: number) => (
                                    <span key={i} className="px-2 py-1 bg-white/5 rounded text-[11px] text-slate-300 border border-white/10">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {project.demo_url && (
                            <a href={project.demo_url} target="_blank" className="group flex items-center justify-center gap-3 w-full h-14 rounded-xl bg-primary text-background-dark font-bold hover:shadow-neon-strong hover:-translate-y-1 transition-all duration-300">
                                <span>Visit Live Site</span>
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[20px]">arrow_outward</span>
                            </a>
                        )}
                        {project.repo_url && (
                            <a href={project.repo_url} target="_blank" className="group flex items-center justify-center gap-3 w-full h-14 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all">
                                <span className="material-symbols-outlined text-xl">code</span>
                                <span className="font-mono text-sm tracking-wide">View GitHub Repo</span>
                            </a>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col gap-20 lg:pt-2">
                {/* Image Slider */}
                <ProjectSlider images={allImages} />

                {/* Overview */}
                <section className="max-w-3xl">
                    <h3 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                        <span className="w-8 h-px bg-primary/30"></span>
                        Overview
                    </h3>
                    <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-light whitespace-pre-wrap">
                        <p>{project.overview || project.description}</p>
                    </div>
                </section>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-2xl bg-surface-dark border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <span className="material-symbols-outlined text-8xl">error</span>
                        </div>
                        <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                            <span className="material-symbols-outlined text-red-400">warning</span>
                            The Challenge
                        </h4>
                        <div className="text-slate-400 text-base leading-relaxed mb-6 font-light whitespace-pre-wrap">
                            {project.challenge || 'No challenge description provided.'}
                        </div>
                    </div>

                    <div className="p-10 rounded-2xl bg-surface-dark neon-border relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <span className="material-symbols-outlined text-8xl text-primary">verified</span>
                        </div>
                        <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            The Solution
                        </h4>
                        <div className="text-slate-400 text-base leading-relaxed mb-6 font-light whitespace-pre-wrap">
                            {project.solution || 'No solution description provided.'}
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation */}
                <nav className="pt-16 mt-8 border-t border-white/5">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
                         {prevId ? (
                             <Link href={`./${prevId}`} className="group text-left flex items-center gap-5">
                                <div className="size-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">arrow_back</span>
                                </div>
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Previous Project</p>
                                    <p className="text-white font-bold text-lg group-hover:text-primary transition-colors">View Previous</p>
                                </div>
                            </Link>
                         ) : <div></div>}
                        
                        {nextId ? (
                            <Link href={`./${nextId}`} className="group text-right flex items-center gap-5">
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Next Project</p>
                                    <p className="text-white font-bold text-lg group-hover:text-primary transition-colors">View Next</p>
                                </div>
                                <div className="size-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
                                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">arrow_forward</span>
                                </div>
                            </Link>
                        ) : <div></div>}
                    </div>
                </nav>
            </main>
        </div>
    </div>
  );
}
