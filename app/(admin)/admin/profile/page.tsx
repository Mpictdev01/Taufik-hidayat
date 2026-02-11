'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProfilePage() {
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    
    // Form Data
    const [formData, setFormData] = useState({
        id: '',
        full_name: '',
        hero_title: '',
        status_text: '',
        hero_description: '',
        location: '',
        location_coords: '', // Keep if needed, but we focus on maps_url now
        maps_url: '',
        hero_image_url: ''
    });

    const [socialLinks, setSocialLinks] = useState({
        twitter: '',
        linkedin: '',
        github: '',
        email: ''
    });
    
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data, error } = await supabase
                .from('profile_settings')
                .select('*')
                .single();
            
            if (data) {
                setFormData(data);
                if (data.social_links) {
                    setSocialLinks(data.social_links);
                }
            }
        } catch (error) {
            console.log('No profile found or error fetching', error);
        } finally {
            setInitialLoad(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Upload Image if changed
            let imageUrl = formData.hero_image_url;
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `hero-${Math.random()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('profile-assets')
                    .upload(`${fileName}`, imageFile);
                
                if (uploadError) throw uploadError;
                
                const { data: { publicUrl } } = supabase.storage
                    .from('profile-assets')
                    .getPublicUrl(`${fileName}`);
                
                imageUrl = publicUrl;
            }

            // 2. Upsert Data
            const { data: { user } } = await supabase.auth.getUser();
            if(!user) throw new Error('Not authenticated');

            const payload = { 
                ...formData, 
                hero_image_url: imageUrl,
                social_links: socialLinks
            };

            if (!payload.id) {
                const { error } = await supabase.from('profile_settings').insert(payload);
                 if (error) throw error;
            } else {
                 const { error } = await supabase.from('profile_settings').update(payload).eq('id', payload.id);
                 if (error) throw error;
            }

            alert('Profile updated successfully!');
            fetchProfile();

        } catch (error: any) {
             console.error('Error saving profile:', error);
             alert(`Error: ${error.message || 'Check console'}`);
        } finally {
            setLoading(false);
        }
    };

    if (initialLoad) return <div className="p-10 text-center text-slate-500">Loading profile settings...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
             <div>
                <h1 className="text-3xl font-bold text-white mb-2">Profile & Socials</h1>
                <p className="text-slate-400">Manage your identity, location links, and social media.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Hero Info */}
                <div className="space-y-6">
                    <div className="bg-glass-bg border border-glass-border p-6 rounded-2xl backdrop-blur-md space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Hero Text</h3>
                        
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hero Title (Giant Text)</label>
                            <input 
                                type="text"
                                name="hero_title"
                                value={formData.hero_title}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                            />
                        </div>

                         <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Status Text</label>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                <input 
                                    type="text"
                                    name="status_text"
                                    value={formData.status_text}
                                    onChange={handleChange}
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Short Description</label>
                            <textarea 
                                name="hero_description"
                                value={formData.hero_description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 resize-none"
                            />
                        </div>
                    </div>

                    <div className="bg-glass-bg border border-glass-border p-6 rounded-2xl backdrop-blur-md space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Personal Info</h3>
                         <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                            <input 
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location text</label>
                            <input 
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                placeholder="Magelang, ID"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Google Maps Embed URL</label>
                            <input 
                                type="text"
                                name="maps_url"
                                value={formData.maps_url}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                                placeholder="https://www.google.com/maps/embed?..."
                            />
                            <p className="text-[10px] text-slate-500 mt-1">Paste the full 'src' from Google Maps Embed code</p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Images & Socials */}
                <div className="space-y-6">
                    <div className="bg-glass-bg border border-glass-border p-6 rounded-2xl backdrop-blur-md space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Hero Image</h3>
                         
                         <div className="aspect-[3/4] bg-black/50 rounded-xl overflow-hidden relative border border-white/10 mb-4 group">
                            {formData.hero_image_url || imageFile ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img 
                                    src={imageFile ? URL.createObjectURL(imageFile) : formData.hero_image_url} 
                                    alt="Hero Preview" 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-slate-500">No Image</div>
                            )}
                            
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-sm">Preview</span>
                            </div>
                         </div>

                         <div>
                            <input 
                                type="file" 
                                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                            />
                        </div>
                    </div>

                    <div className="bg-glass-bg border border-glass-border p-6 rounded-2xl backdrop-blur-md space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4 border-b border-white/5 pb-2">Social Links</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Twitter / X</label>
                                <input name="twitter" value={socialLinks.twitter} onChange={handleSocialChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" />
                            </div>
                             <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">LinkedIn</label>
                                <input name="linkedin" value={socialLinks.linkedin} onChange={handleSocialChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" />
                            </div>
                             <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">GitHub</label>
                                <input name="github" value={socialLinks.github} onChange={handleSocialChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Email</label>
                                <input name="email" value={socialLinks.email} onChange={handleSocialChange} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white" />
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4 bg-primary text-background-dark font-bold rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-lg shadow-lg shadow-primary/20"
                    >
                        {loading ? 'Saving Changes...' : 'Save Profile Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
}
