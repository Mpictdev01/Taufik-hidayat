"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navLinks = [
		{ name: "Home", path: "/", isAnchor: false },
		{ name: "Scoping", path: "/#scoping", isAnchor: true },
		{ name: "Project", path: "/projects", isAnchor: false },
		{ name: "Testimonials", path: "/#testimonials", isAnchor: true },
		{ name: "FAQ", path: "/#faq", isAnchor: true },
	];

	return (
		<nav className="fixed top-0 w-full z-50 sticky-nav transition-all duration-300 bg-transparent">
			<div className="w-full px-6 md:px-12">
				<div className="flex items-center justify-between h-16 md:h-20">
					{/* Left Side: Menu Items */}
					<div className="flex items-center gap-8 md:gap-12">
						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center gap-6">
							{navLinks.map((link) => (
							<Link
								key={link.path}
								href={link.path}
								className={`text-sm font-medium transition-colors hover:text-white ${
									!link.isAnchor && pathname === link.path
										? "text-white drop-shadow-md"
										: "text-slate-400"
								}`}
								scroll={false}
								onClick={(e) => {
									if (link.isAnchor) {
										e.preventDefault();
										const id = link.path.split('#')[1];
										if (pathname !== '/') {
											window.location.href = link.path;
										} else {
											document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
										}
									}
								}}
							>
								{link.name}
							</Link>
						))}
						</div>
					</div>

					{/* Right Side: Hire Me & Mobile Toggle */}
					<div className="flex items-center gap-3 md:gap-4">
						<button className="hidden sm:flex group items-center justify-center overflow-hidden h-8 md:h-10 px-5 md:px-6 bg-blue-700 hover:bg-blue-800 transition-all text-white text-xs md:text-sm font-bold shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.4),0_4px_10px_rgba(29,78,216,0.5)] active:shadow-[inset_0_0_2px_rgba(0,0,0,0.5)] active:translate-y-0.5 rounded-full border border-blue-600/50">
							<span className="mr-2 drop-shadow-sm">Hire Me</span>
							<span className="material-symbols-outlined text-[16px] md:text-[20px] group-hover:translate-x-1 transition-transform drop-shadow-sm">
								arrow_forward
							</span>
						</button>

						{/* Mobile Menu Button */}
						<button
							className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
							<span className="material-symbols-outlined text-[24px]">
								{isMobileMenuOpen ? "close" : "menu"}
							</span>
						</button>
					</div>
				</div>

				{/* Mobile Menu Dropdown */}
				{isMobileMenuOpen && (
					<div className="md:hidden py-4 flex flex-col gap-1 border-t border-white/10 bg-black/80 backdrop-blur-xl rounded-b-2xl px-4 mt-2 shadow-2xl">
						{navLinks.map((link) => (
						<Link
							key={link.path}
							href={link.path}
							className={`px-4 py-3 text-sm font-medium transition-colors rounded-lg ${
								!link.isAnchor && pathname === link.path
									? "text-white bg-white/10"
									: "text-slate-300 hover:bg-white/5 hover:text-white"
							}`}
							scroll={false}
							onClick={(e) => {
								setIsMobileMenuOpen(false);
								if (link.isAnchor) {
									e.preventDefault();
									const id = link.path.split('#')[1];
									if (pathname !== '/') {
										window.location.href = link.path;
									} else {
										document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
									}
								}
							}}
						>
							{link.name}
						</Link>
					))}
					</div>
				)}
			</div>
		</nav>
	);
}
