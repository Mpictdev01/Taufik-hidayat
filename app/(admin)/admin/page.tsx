'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        projects: 0,
        tech: 0,
        views: 12543, // Mock for now as we don't track views
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            const { count: projectCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
            const { count: techCount } = await supabase.from('tech_stacks').select('*', { count: 'exact', head: true });
            
            setStats(prev => ({
                ...prev,
                projects: projectCount || 0,
                tech: techCount || 0
            }));
            setLoading(false);
        };
        fetchStats();
    }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Welcome back, Admin. Here is your portfolio overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
            title="Total Projects" 
            value={loading ? '...' : stats.projects.toString()} 
            icon="dataset" 
            trend="+2 this month" 
            color="text-primary"
            bg="bg-primary/10"
        />
        <StatCard 
            title="Tech Stack Items" 
            value={loading ? '...' : stats.tech.toString()} 
            icon="code" 
            trend="Updated recently" 
            color="text-purple-400"
            bg="bg-purple-500/10"
        />
        <StatCard 
            title="Total Views" 
            value={stats.views.toLocaleString()} 
            icon="visibility" 
            trend="+12% vs last week" 
            color="text-emerald-400"
            bg="bg-emerald-500/10"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-glass-bg border border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
                <Link href="/admin/projects/new" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                    <span className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                        <span className="material-symbols-outlined text-primary">add_circle</span>
                        Add New Project
                    </span>
                    <span className="material-symbols-outlined text-slate-500 group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                </Link>
                <Link href="/admin/profile" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                    <span className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                        <span className="material-symbols-outlined text-purple-400">edit_square</span>
                        Update Profile
                    </span>
                    <span className="material-symbols-outlined text-slate-500 group-hover:translate-x-1 transition-transform">arrow_forward_ios</span>
                </Link>
            </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-glass-bg border border-white/5 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-white text-3xl">rocket_launch</span>
            </div>
            <div>
                <h3 className="text-lg font-bold text-white">System Status</h3>
                <p className="text-emerald-400 text-sm font-medium flex items-center justify-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    All Systems Operational
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, color, bg }: any) {
    return (
        <div className="p-6 rounded-2xl bg-glass-bg border border-white/5 flex flex-col gap-4 hover:border-white/10 transition-colors">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{title}</p>
                    <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${bg} ${color}`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-emerald-400 font-medium">{trend}</span>
            </div>
        </div>
    );
}
