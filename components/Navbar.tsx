"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

	// Lock body scroll when menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	const handleNavClick = useCallback(
		(e: React.MouseEvent, link: (typeof navLinks)[0]) => {
			setIsMobileMenuOpen(false);
			if (link.isAnchor) {
				e.preventDefault();
				const id = link.path.split("#")[1];
				if (pathname !== "/") {
					window.location.href = link.path;
				} else {
					document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
				}
			}
		},
		[pathname],
	);

	// Animation variants
	const overlayVariants = {
		closed: { opacity: 0 },
		open: { opacity: 1 },
	};

	const menuVariants = {
		closed: { x: "100%" },
		open: {
			x: 0,
			transition: { type: "spring" as const, damping: 30, stiffness: 300 },
		},
	};

	const linkVariants = {
		closed: { x: 40, opacity: 0 },
		open: (i: number) => ({
			x: 0,
			opacity: 1,
			transition: { delay: 0.15 + i * 0.07, duration: 0.4, ease: "easeOut" as const },
		}),
	};

	const bottomVariants = {
		closed: { y: 20, opacity: 0 },
		open: {
			y: 0,
			opacity: 1,
			transition: { delay: 0.4, duration: 0.5, ease: "easeOut" as const },
		},
	};

	return (
		<>
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
										onClick={(e) => handleNavClick(e, link)}
									>
										{link.name}
									</Link>
								))}
							</div>
						</div>

						{/* Right Side: Hire Me & Mobile Toggle */}
						<div className="flex items-center gap-3 md:gap-4">
							<a
								href="https://wa.me/6285600133559"
								target="_blank"
								rel="noopener noreferrer"
								className="hidden sm:flex group items-center justify-center overflow-hidden h-8 md:h-10 px-5 md:px-6 bg-blue-700 hover:bg-blue-800 transition-all text-white text-xs md:text-sm font-bold shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.4),0_4px_10px_rgba(29,78,216,0.5)] active:shadow-[inset_0_0_2px_rgba(0,0,0,0.5)] active:translate-y-0.5 rounded-full border border-blue-600/50"
							>
								<span className="mr-2 drop-shadow-sm">Hire Me</span>
								<span className="material-symbols-outlined text-[16px] md:text-[20px] group-hover:translate-x-1 transition-transform drop-shadow-sm">
									arrow_forward
								</span>
							</a>

							{/* Mobile Menu Button */}
							<button
								className="md:hidden relative z-[60] text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								aria-label="Toggle menu"
							>
								<div className="w-5 h-4 flex flex-col justify-between">
									<span
										className={`block h-[2px] w-full bg-white rounded-full transform transition-all duration-300 origin-center ${
											isMobileMenuOpen
												? "rotate-45 translate-y-[7px]"
												: ""
										}`}
									/>
									<span
										className={`block h-[2px] w-full bg-white rounded-full transition-all duration-300 ${
											isMobileMenuOpen
												? "opacity-0 scale-x-0"
												: "opacity-100"
										}`}
									/>
									<span
										className={`block h-[2px] w-full bg-white rounded-full transform transition-all duration-300 origin-center ${
											isMobileMenuOpen
												? "-rotate-45 -translate-y-[7px]"
												: ""
										}`}
									/>
								</div>
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Mobile Fullscreen Menu Overlay */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							className="fixed inset-0 z-[51] bg-black/60 backdrop-blur-sm md:hidden"
							variants={overlayVariants}
							initial="closed"
							animate="open"
							exit="closed"
							transition={{ duration: 0.3 }}
							onClick={() => setIsMobileMenuOpen(false)}
						/>

						{/* Slide-in Panel */}
						<motion.div
							className="fixed top-0 right-0 z-[55] w-[85%] max-w-[360px] h-full md:hidden flex flex-col"
							variants={menuVariants}
							initial="closed"
							animate="open"
							exit="closed"
							style={{
								background:
									"linear-gradient(195deg, rgba(15,23,42,0.98) 0%, rgba(2,6,23,0.99) 100%)",
							}}
						>
							{/* Top glow accent */}
							<div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
							<div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-600/8 rounded-full blur-[60px] pointer-events-none" />

							{/* Header */}
							<div className="flex items-center justify-between px-6 pt-6 pb-4">
								<motion.span
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.2 }}
									className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]"
								>
									Navigation
								</motion.span>
							</div>

							{/* Divider */}
							<div className="mx-6 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

							{/* Nav Links */}
							<div className="flex-1 flex flex-col px-4 pt-4 gap-1">
								{navLinks.map((link, i) => (
									<motion.div
										key={link.path}
										custom={i}
										variants={linkVariants}
										initial="closed"
										animate="open"
									>
										<Link
											href={link.path}
											className={`group flex items-center gap-4 px-4 py-4 rounded-xl text-base font-medium transition-all duration-200 ${
												!link.isAnchor && pathname === link.path
													? "text-white bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
													: "text-slate-300 hover:text-white hover:bg-white/[0.04]"
											}`}
											scroll={false}
											onClick={(e) => handleNavClick(e, link)}
										>
											{/* Active indicator dot */}
											<span
												className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
													!link.isAnchor && pathname === link.path
														? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
														: "bg-slate-700 group-hover:bg-slate-500"
												}`}
											/>
											<span className="flex-1">{link.name}</span>
											{/* Arrow on hover */}
											<span className="material-symbols-outlined text-[18px] text-slate-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
												arrow_forward
											</span>
										</Link>
									</motion.div>
								))}
							</div>

							{/* Bottom Section: Hire Me CTA */}
							<motion.div
								className="px-6 pb-8 pt-4"
								variants={bottomVariants}
								initial="closed"
								animate="open"
							>
								<div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

								<a
									href="https://wa.me/6285600133559"
									target="_blank"
									rel="noopener noreferrer"
									className="group flex items-center justify-center gap-3 w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_28px_rgba(37,99,235,0.45)] active:scale-[0.98]"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-5 h-5"
									>
										<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
									</svg>
									Hire Me
									<span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
										arrow_forward
									</span>
								</a>

								<p className="text-center text-[10px] text-slate-600 mt-4 tracking-wider">
									© {new Date().getFullYear()} Taufik Hidayat
								</p>
							</motion.div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
