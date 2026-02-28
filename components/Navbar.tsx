'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path ? 'text-white font-medium bg-white/10' : 'text-slate-400 hover:text-white';
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Project', path: '/projects' },
    { name: 'Stack', path: '/stack' }, // Placeholder based on original HTML
    { name: 'Contact', path: '/about#contact' },
  ];

  return (
		<nav className="fixed top-4 w-full z-50 px-4 flex justify-center sticky-nav">
			<div className="w-full max-w-[1000px] rounded-full border border-glass-border bg-background-dark/60 backdrop-blur-xl px-4 sm:px-6 shadow-2xl">
				<div className="flex items-center justify-between h-14 md:h-16">
					<div className="flex items-center">
						<Link
							href="/"
							className="size-8 md:size-9 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-background-dark font-black text-xs md:text-sm">
							TH
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-1">
						{navLinks.map((link) => (
							<Link
								key={link.path}
								href={link.path}
								className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
									pathname === link.path
										? "text-white bg-white/10"
										: "text-slate-400 hover:text-white"
								}`}>
								{link.name}
							</Link>
						))}
					</div>

					<div className="flex items-center gap-2 md:gap-4">
						<button className="hidden sm:flex group items-center justify-center overflow-hidden rounded-full h-8 md:h-10 px-4 md:px-6 bg-primary hover:bg-primary/90 transition-all text-background-dark text-[11px] md:text-sm font-bold shadow-[0_0_20px_-5px_rgba(38,171,247,0.5)]">
							<span className="mr-1 md:mr-2">Hire Me</span>
							<span className="material-symbols-outlined text-[14px] md:text-[18px] group-hover:translate-x-1 transition-transform">
								arrow_forward
							</span>
						</button>

						{/* Mobile Menu Button */}
						<button
							className="md:hidden text-white p-1"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
							<span className="material-symbols-outlined text-[20px]">
								{isMobileMenuOpen ? "close" : "menu"}
							</span>
						</button>
					</div>
				</div>

				{/* Mobile Menu Dropdown - Integrated inside the same container or just below it */}
				{isMobileMenuOpen && (
					<div className="md:hidden py-4 border-t border-glass-border flex flex-col gap-1">
						{navLinks.map((link) => (
							<Link
								key={link.path}
								href={link.path}
								className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
									pathname === link.path
										? "text-white bg-white/10"
										: "text-slate-300 hover:bg-white/5"
								}`}
								onClick={() => setIsMobileMenuOpen(false)}>
								{link.name}
							</Link>
						))}
					</div>
				)}
			</div>
		</nav>
	);
}
