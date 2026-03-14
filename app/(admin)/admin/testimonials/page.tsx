'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (!error && data) {
            setTestimonials(data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
        
        await supabase.from('testimonials').delete().match({ id });
        fetchTestimonials();
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-glass-bg border border-glass-border p-6 rounded-2xl">
                <div>
                    <h1 className="text-2xl font-black text-white tracking-tight">Testimonials</h1>
                    <p className="text-sm text-slate-400 mt-1">Manage client reviews and social proof.</p>
                </div>
                <Link 
                    href="/admin/testimonials/new"
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-xl hover:bg-primary hover:text-background-dark font-bold transition-all gap-2"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Add Testimonial
                </Link>
            </div>

            {/* Content Area */}
            <div className="bg-glass-bg border border-glass-border rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-400">Loading testimonials...</div>
                ) : testimonials.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center">
                        <span className="material-symbols-outlined text-4xl text-slate-600 mb-4">forum</span>
                        <h3 className="text-xl font-bold text-white mb-2">No Testimonials Yet</h3>
                        <p className="text-slate-400 mb-6">Start building trust by adding client reviews.</p>
                        <Link 
                            href="/admin/testimonials/new"
                            className="text-primary hover:text-white transition-colors text-sm font-semibold"
                        >
                            + Create the first one
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                        {testimonials.map((testi) => (
                            <div key={testi.id} className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col group hover:border-primary/30 transition-all">
                                {/* Top: Header */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div 
                                        className="w-12 h-12 rounded-full bg-slate-800 bg-cover bg-center shrink-0 border border-white/10"
                                        style={{ backgroundImage: testi.avatar_url ? `url('${testi.avatar_url}')` : 'none' }}
                                    >
                                        {!testi.avatar_url && (
                                            <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold">
                                                {testi.client_name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm line-clamp-1">{testi.client_name}</h4>
                                        <p className="text-xs text-slate-400 line-clamp-1">{testi.client_role}</p>
                                        <div className="flex text-amber-400 text-[10px] mt-1 space-x-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1", fontSize: '12px'}}>
                                                    {i < (testi.rating || 5) ? 'star' : 'star_border'}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Content Body */}
                                <p className="text-sm text-slate-400 line-clamp-3 mb-4 flex-grow italic">
                                    "{testi.content}"
                                </p>
                                
                                {/* Actions */}
                                <div className="pt-4 border-t border-white/10 flex justify-between items-center mt-auto">
                                    <div className="flex gap-2">
                                        <Link 
                                            href={`/admin/testimonials/${testi.id}`}
                                            className="p-1.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors"
                                            title="Edit"
                                        >
                                            <span className="material-symbols-outlined text-[18px] block">edit</span>
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(testi.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded transition-colors"
                                            title="Delete"
                                        >
                                            <span className="material-symbols-outlined text-[18px] block">delete</span>
                                        </button>
                                    </div>
                                    <div className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded ${testi.is_active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
                                        {testi.is_active ? 'Active' : 'Hidden'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
