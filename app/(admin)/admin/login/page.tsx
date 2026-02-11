'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'error' | 'success' } | null>(null);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (isSignUp) {
        // Sign Up Logic
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            setMessage({ text: error.message, type: 'error' });
        } else {
            setMessage({ text: 'Success! Please check your email to confirm registration, or if email confirmation is disabled, you can log in now.', type: 'success' });
            setIsSignUp(false);
        }
    } else {
        // Login Logic
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setMessage({ text: error.message, type: 'error' });
        } else {
            router.push('/admin');
            router.refresh();
        }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>

      <div className="w-full max-w-md p-8 rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">{isSignUp ? 'Create Admin Account' : 'Admin Access'}</h1>
          <p className="text-slate-400 text-sm mt-2">{isSignUp ? 'Register a new admin user' : 'Enter your credentials to continue'}</p>
        </div>

        {message && (
            <div className={`mb-6 p-3 rounded-lg border text-sm text-center ${message.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}>
                {message.text}
            </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="admin@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-background-dark font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
                <span className="w-5 h-5 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin"></span>
            ) : (
                <>
                <span>{isSignUp ? 'Sign Up' : 'Login'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
            <button 
                onClick={() => { setMessage(null); setIsSignUp(!isSignUp); }}
                className="text-xs text-slate-500 hover:text-white transition-colors"
            >
                {isSignUp ? 'Already have an account? Login' : 'Need an account? Register'}
            </button>
        </div>
      </div>
    </div>
  );
}
