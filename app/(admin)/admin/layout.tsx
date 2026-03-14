'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
        if (pathname === '/admin/login') {
            setLoading(false);
            return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push('/admin/login');
        } else {
            setLoading(false);
        }
    };
    
    checkUser();
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [router, pathname]);

  const handleSignOut = async () => {
      await supabase.auth.signOut();
      router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
      return <>{children}</>;
  }

  if (loading) {
      return <div className="min-h-screen bg-background-dark flex items-center justify-center text-slate-500">Loading Panel...</div>;
  }

  return (
		<div className="min-h-screen bg-background-dark text-slate-300 font-sans selection:bg-primary/30">
			{/* Mobile Header / Nav */}
			<div className="lg:hidden border-b border-white/5 bg-glass-bg backdrop-blur-md p-4 flex items-center justify-between sticky top-0 z-50">
				<Link href="/admin" className="font-bold text-white tracking-tight">
					ADMIN PANEL
				</Link>
				<button
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					className="p-2 text-slate-400 hover:text-white">
					<span className="material-symbols-outlined">
						{isMobileMenuOpen ? "close" : "menu"}
					</span>
				</button>
			</div>

			<div className="flex h-screen overflow-hidden">
				{/* Sidebar Desktop & Mobile Overlay */}

				{/* Mobile Backdrop */}
				{isMobileMenuOpen && (
					<div
						className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
						onClick={() => setIsMobileMenuOpen(false)}></div>
				)}

				<aside
					className={`
            fixed lg:static inset-y-0 left-0 z-50 w-64 flex-col border-r border-white/5 bg-[#0a0f18] transition-transform duration-300 lg:translate-x-0
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            flex
        `}>
					<div className="p-6 border-b border-white/5 flex justify-between items-center">
						<div>
							<Link
								href="/"
								className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
								TAUFIK HIDAYAT
							</Link>
							<div className="mt-1 text-xs text-primary font-mono tracking-widest uppercase">
								Admin Console
							</div>
						</div>
						<button
							onClick={() => setIsMobileMenuOpen(false)}
							className="lg:hidden text-slate-500">
							<span className="material-symbols-outlined">close</span>
						</button>
					</div>

					<nav className="flex-1 overflow-y-auto p-4 space-y-1">
						<NavItem
							href="/admin"
							icon="dashboard"
							label="Dashboard"
							isActive={pathname === "/admin"}
						/>
						<NavItem
							href="/admin/profile"
							icon="person"
							label="Profile & Hero"
							isActive={pathname.startsWith("/admin/profile")}
						/>
						<NavItem
							href="/admin/projects"
							icon="dataset"
							label="Projects"
							isActive={pathname.startsWith("/admin/projects")}
						/>
						<NavItem
							href="/admin/testimonials"
							icon="forum"
							label="Testimonials"
							isActive={pathname.startsWith("/admin/testimonials")}
						/>
					</nav>

					<div className="p-4 border-t border-white/5">
						<button
							onClick={handleSignOut}
							className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-slate-400 transition-all">
							<span className="material-symbols-outlined text-[20px]">
								logout
							</span>
							<span className="text-sm font-medium">Sign Out</span>
						</button>
					</div>
				</aside>

				{/* Main Content */}
				<main className="flex-1 overflow-y-auto bg-background-dark relative">
					<div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none fixed"></div>
					<div className="relative z-10 p-4 md:p-8 lg:p-10 max-w-7xl mx-auto">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
}

function NavItem({
  href,
  icon,
  label,
  isActive
}: {
  href: string;
  icon: string;
  label: string;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive ? 'bg-white/5 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
    >
      <span className={`material-symbols-outlined text-[20px] transition-colors ${isActive ? 'text-primary' : 'group-hover:text-primary'}`}>
        {icon}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
