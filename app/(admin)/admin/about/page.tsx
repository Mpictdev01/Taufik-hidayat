'use client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AboutAdminPage() {
    const [sections, setSections] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeSection, setActiveSection] = useState('profile');
    const [imageFile, setImageFile] = useState<File | null>(null);

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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
        } else {
            setImageFile(null);
        }
    };

    const handleSave = async (sectionId: string) => {
        setSaving(true);
        const sectionData = sections.find(s => s.id === sectionId);
        if (!sectionData) {
            setSaving(false);
            return;
        }

        try {
            let finalImageUrl = sectionData.image_url;

            // Upload Image if a new file is selected
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `about-${activeSection}-${Math.random()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('profile-assets')
                    .upload(`${fileName}`, imageFile);
                
                if (uploadError) throw uploadError;
                
                const { data: { publicUrl } } = supabase.storage
                    .from('profile-assets')
                    .getPublicUrl(`${fileName}`);
                
                finalImageUrl = publicUrl;
                
                // Update local state to reflect new URL
                handleUpdate(activeSection, 'image_url', finalImageUrl);
            }

            const { error } = await supabase
                .from('about_page')
                .update({
                    title: sectionData.title,
                    subtitle: sectionData.subtitle,
                    description: sectionData.description,
                    image_url: finalImageUrl,
                    stats: sectionData.stats
                })
                .eq('id', sectionId);
            
            if (error) throw error;
            alert('Section updated successfully!');
            setImageFile(null); // Reset file input after successful save
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
                        onClick={() => {
                            setActiveSection(s.section);
                            setImageFile(null); // Reset image selection on tab change
                        }}
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
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Image Upload</label>
                            
                            <div className="mb-4">
                                {currentData.image_url || imageFile ? (
                                    <div className="w-32 h-32 rounded-lg overflow-hidden border border-white/10 mb-3">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img 
                                            src={imageFile ? URL.createObjectURL(imageFile) : currentData.image_url} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                ) : (
                                    <div className="w-32 h-32 rounded-lg border border-dashed border-white/20 flex items-center justify-center text-slate-500 mb-3 text-xs">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                            />
                            <p className="text-[10px] text-slate-500 mt-2">Pilih gambar baru untuk menggantikan gambar saat ini.</p>
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
