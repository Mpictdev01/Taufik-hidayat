'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tech_stack: string[];
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) throw error;
        setProjects(data || []);
    } catch (error) {
        console.error('Error fetching projects:', error);
    } finally {
        setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
      if(!confirm('Are you sure you want to delete this project?')) return;
      
      try {
          const { error } = await supabase.from('projects').delete().eq('id', id);
          if(error) throw error;
          // Refresh list
          fetchProjects();
      } catch (error) {
          alert('Error deleting project');
          console.error(error);
      }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
          <p className="text-slate-400">Manage your portfolio projects</p>
        </div>
        
        <Link 
            href="/admin/projects/new" 
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-background-dark font-bold rounded-xl hover:bg-primary-dark transition-all self-start md:self-auto"
        >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>Add Project</span>
        </Link>
      </div>

      <div className="rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/5 bg-white/5">
                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Image</th>
                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Project</th>
                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Tech Stack</th>
                        <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {/* Empty State */}
                    {projects.length === 0 && !loading && (
                        <tr>
                            <td colSpan={4} className="p-8 text-center text-slate-500">
                                No projects found. Start by creating one.
                            </td>
                        </tr>
                    )}
                    
                    {/* Loading State */}
                    {loading && (
                        <tr>
                             <td colSpan={4} className="p-8 text-center text-slate-500">
                                Loading projects...
                            </td>
                        </tr>
                    )}

                    {/* Data Rows */}
                    {projects.map((project) => (
                        <tr key={project.id} className="group hover:bg-white/5 transition-colors">
                            <td className="p-4 w-24">
                                {project.image_url && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img 
                                        src={project.image_url} 
                                        alt={project.title} 
                                        className="w-16 h-12 object-cover rounded-lg border border-white/10"
                                    />
                                )}
                            </td>
                            <td className="p-4">
                                <div className="font-bold text-white">{project.title}</div>
                                <div className="text-sm text-slate-400 line-clamp-1">{project.description}</div>
                            </td>
                            <td className="p-4">
                                <div className="flex flex-wrap gap-1">
                                    {project.tech_stack?.map((tech, i) => (
                                        <span key={i} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="p-4 text-right">
                                <Link 
                                    href={`/admin/projects/${project.id}`}
                                    className="p-2 mr-2 rounded-lg hover:bg-blue-500/10 hover:text-blue-400 text-slate-500 transition-colors inline-flex"
                                >
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                </Link>
                                <button 
                                    onClick={() => handleDelete(project.id)}
                                    className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-slate-500 transition-colors inline-flex"
                                >
                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
