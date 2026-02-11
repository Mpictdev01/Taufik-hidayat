'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type TechStack = {
    id: string;
    name: string;
    icon_name: string;
    category: string;
    color_class: string;
};

export default function TechStackPage() {
    const [techs, setTechs] = useState<TechStack[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Add/Edit Form State
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        icon_name: '', // material icon name
        category: 'Frontend', // Default
        color_class: 'text-blue-400'
    });

    useEffect(() => {
        fetchTechs();
    }, []);

    const fetchTechs = async () => {
        const { data } = await supabase.from('tech_stacks').select('*').order('created_at');
        setTechs(data || []);
        setLoading(false);
    };

    const handleEdit = (tech: TechStack) => {
        setFormData(tech);
        setFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if(!confirm('Delete this tech?')) return;
        await supabase.from('tech_stacks').delete().eq('id', id);
        fetchTechs();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const payload = {
                name: formData.name,
                icon_name: formData.icon_name,
                category: formData.category,
                color_class: formData.color_class
            };

            if (formData.id) {
                 await supabase.from('tech_stacks').update(payload).eq('id', formData.id);
            } else {
                 await supabase.from('tech_stacks').insert(payload);
            }
            
            setFormOpen(false);
            setFormData({id: '', name: '', icon_name: '', category: 'Frontend', color_class: 'text-blue-400'});
            fetchTechs();
        } catch (error) {
            console.error(error);
            alert('Error saving');
        }
    };

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Tech Stack</h1>
                    <p className="text-slate-400">Manage icons and technologies displayed</p>
                </div>
                <button 
                    onClick={() => {
                        setFormData({id: '', name: '', icon_name: '', category: 'Frontend', color_class: 'text-blue-400'});
                        setFormOpen(true);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-background-dark font-bold rounded-xl hover:bg-primary-dark transition-all"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    <span>Add Tech</span>
                </button>
            </div>

            {/* Tech Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {techs.map(tech => (
                    <div key={tech.id} className="p-4 rounded-xl border border-glass-border bg-glass-bg backdrop-blur-md flex flex-col items-center gap-3 relative group">
                        <div className={`p-3 rounded-xl bg-white/5 ${tech.color_class.replace('text-', 'bg-').replace('400', '500')}/20 ${tech.color_class}`}>
                            <span className="material-symbols-outlined text-[32px]">{tech.icon_name}</span>
                        </div>
                        <div className="text-center">
                            <div className="font-bold text-white text-sm">{tech.name}</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider">{tech.category}</div>
                        </div>
                        
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={() => handleEdit(tech)} className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white">
                                <span className="material-symbols-outlined text-[16px]">edit</span>
                             </button>
                             <button onClick={() => handleDelete(tech.id)} className="p-1 hover:bg-red-500/20 rounded text-slate-400 hover:text-red-400">
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                             </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal / Form Overlay */}
            {formOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md bg-[#161b22] border border-white/10 rounded-2xl p-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-4">{formData.id ? 'Edit Tech' : 'Add New Tech'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">Name</label>
                                <input className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" 
                                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="React" required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">Icon Name (Material Symbols)</label>
                                <input className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white" 
                                    value={formData.icon_name} onChange={e => setFormData({...formData, icon_name: e.target.value})} placeholder="code, dataset, terminal..." required />
                                <a href="https://fonts.google.com/icons" target="_blank" className="text-[10px] text-primary hover:underline">Find icons here</a>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 mb-1">Category</label>
                                <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white"
                                     value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                     <option value="Frontend Ecosystem">Frontend Ecosystem</option>
                                     <option value="Backend & Infrastructure">Backend & Infrastructure</option>
                                     <option value="DevOps & Tools">DevOps & Tools</option>
                                </select>
                            </div>
                             <div>
                                <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white"
                                     value={formData.color_class} onChange={e => setFormData({...formData, color_class: e.target.value})}>
                                     <option value="text-blue-400">Blue</option>
                                     <option value="text-yellow-400">Yellow</option>
                                     <option value="text-green-400">Green</option>
                                     <option value="text-red-400">Red</option>
                                     <option value="text-purple-400">Purple</option>
                                     <option value="text-cyan-400">Cyan</option>
                                     <option value="text-orange-400">Orange</option>
                                     <option value="text-pink-400">Pink</option>
                                     <option value="text-slate-400">Slate (Gray)</option>
                                </select>
                            </div>
                            
                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setFormOpen(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary-dark">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
