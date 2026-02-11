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
    <nav className="fixed top-0 w-full z-50 border-b border-glass-border bg-background-dark/80 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <Link href="/" className="size-9 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-background-dark font-black text-sm">
              TH
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 rounded-full border border-glass-border bg-glass-bg/50 p-1 px-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                  pathname === link.path
                    ? 'text-white bg-white/5'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex group items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary hover:bg-primary/90 transition-all text-background-dark text-sm font-bold shadow-[0_0_20px_-5px_rgba(38,171,247,0.5)]">
              <span className="mr-2">Hire Me</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background-dark/95 backdrop-blur-xl border-b border-glass-border py-4 px-4 flex flex-col gap-2">
           {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
        </div>
      )}
    </nav>
  );
}
