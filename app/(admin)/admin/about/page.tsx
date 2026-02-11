'use client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AboutAdminPage() {
    const [sections, setSections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeSection, setActiveSection] = useState('profile');

    useEffect(() => {
        const fetchAbout = async () => {
            const { data, error } = await supabase
                .from('about_page')
                .select('*')
                .order('section');
            
            if (error) console.error(error);
            else setSections(data || []);
            setLoading(false);
        };
        fetchAbout();
    }, []);

    const handleUpdate = async (section: string, field: string, value: any) => {
        setSections(prev => prev.map(s => s.section === section ? { ...s, [field]: value } : s));
    };

    const handleSave = async (sectionId: string) => {
        setSaving(true);
        const sectionData = sections.find(s => s.id === sectionId);
        if (!sectionData) return;

        try {
            const { error } = await supabase
                .from('about_page')
                .update({
                    title: sectionData.title,
                    subtitle: sectionData.subtitle,
                    description: sectionData.description,
                    image_url: sectionData.image_url,
                    stats: sectionData.stats
                })
                .eq('id', sectionId);
            
            if (error) throw error;
            alert('Section updated successfully!');
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-slate-400">Loading content...</div>;

    const currentData = sections.find(s => s.section === activeSection);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">About Page Content</h1>
                <p className="text-slate-400">Manage your bio, philosophy, and stats.</p>
            </div>

            <div className="flex gap-4 border-b border-white/10 overflow-x-auto pb-1">
                {sections.map(s => (
                    <button
                        key={s.section}
                        onClick={() => setActiveSection(s.section)}
                        className={`px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-t-lg transition-colors whitespace-nowrap ${
                            activeSection === s.section 
                            ? 'bg-white/10 text-primary border-b-2 border-primary' 
                            : 'text-slate-500 hover:text-white'
                        }`}
                    >
                        {s.section.replace('_', ' ')}
                    </button>
                ))}
            </div>

            {currentData && (
                <div className="bg-glass-bg border border-glass-border p-6 rounded-2xl backdrop-blur-md animate-fadeIn">
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSave(currentData.id); }}>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title</label>
                                <input 
                                    className="input-glass w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50"
                                    value={currentData.title || ''}
                                    onChange={(e) => handleUpdate(activeSection, 'title', e.target.value)}
                                />
                            </div>
                            {activeSection === 'profile' && (
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subtitle</label>
                                    <input 
                                        className="input-glass w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50"
                                        value={currentData.subtitle || ''}
                                        onChange={(e) => handleUpdate(activeSection, 'subtitle', e.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                            <textarea 
                                className="input-glass w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50 h-32"
                                value={currentData.description || ''}
                                onChange={(e) => handleUpdate(activeSection, 'description', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Image URL</label>
                            <input 
                                className="input-glass w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50"
                                value={currentData.image_url || ''}
                                onChange={(e) => handleUpdate(activeSection, 'image_url', e.target.value)}
                            />
                            {currentData.image_url && (
                                <div className="mt-4 w-32 h-32 rounded-lg overflow-hidden border border-white/10">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={currentData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-white/10 text-right">
                             <button 
                                type="submit" 
                                disabled={saving}
                                className="px-6 py-3 bg-primary text-background-dark font-bold rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center gap-2 ml-auto"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                                {!saving && <span className="material-symbols-outlined text-[18px]">check</span>}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
