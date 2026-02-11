import React from 'react';
import { supabase } from '@/lib/supabase';

export const revalidate = 0;

async function getTechs() {
    const { data } = await supabase.from('tech_stacks').select('*').order('sort_order', { ascending: true });
    return data || [];
}

export default async function Stack() {
    const techs = await getTechs();

    // Group by Category
    const categories = {
        'Frontend Ecosystem': { icon: 'code', description: 'Building immersive and responsive user interfaces.', items: [] as any[] },
        'Backend & Infrastructure': { icon: 'dns', description: 'Robust server-side logic and scalable deployments.', items: [] as any[] },
        'DevOps & Tools': { icon: 'settings_suggest', description: 'Streamlining workflows and ensuring reliability.', items: [] as any[] }
    };

    techs.forEach(t => {
        if (categories[t.category as keyof typeof categories]) {
            categories[t.category as keyof typeof categories].items.push({
                name: t.name,
                icon: t.icon_name,
                color: t.color_class
            });
        }
    });

    const categoryList = Object.entries(categories).map(([title, data]) => ({
        title,
        ...data
    }));

  return (
    <main className="relative z-10 flex flex-col items-center w-full pt-32 pb-20 px-4 md:px-8">
      
      {/* Header Section */}
      <section className="w-full max-w-5xl mb-20 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 mb-6">
          TECHNOLOGY STACK
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
          The arsenal of tools and technologies I use to craft high-performance digital experiences.
        </p>
      </section>

      {/* Tech Categories Grid */}
      <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryList.map((category, index) => (
          <div 
            key={index}
            className="glass-card rounded-3xl p-8 relative overflow-hidden group hover:border-primary/30 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-8xl">{category.icon}</span>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <span className="material-symbols-outlined">{category.icon}</span>
                </span>
                <h2 className="text-xl font-bold text-white tracking-wide">{category.title}</h2>
              </div>
              
              <p className="text-slate-400 text-sm mb-8 h-10">{category.description}</p>
              
              <div className="space-y-4">
                {category.items.length > 0 ? category.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group/item">
                    <div className={`p-2 rounded-lg bg-white/5 border border-white/5 ${item.color} group-hover/item:bg-white/10 transition-colors`}>
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    </div>
                    <span className="text-slate-300 font-medium group-hover/item:text-white transition-colors">
                      {item.name}
                    </span>
                  </div>
                )) : (
                    <div className="text-slate-500 text-xs italic">No tools listed yet.</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]"></div>
      </div>
    </main>
  );
}
