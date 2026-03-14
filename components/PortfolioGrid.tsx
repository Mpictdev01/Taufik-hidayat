"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
	"All Projects",
	"SaaS & Dashboards",
	"Web3 & Memecoin",
	"Business & Portfolios",
	"AI Integrations",
];

export default function PortfolioGrid({
	projects,
	limitItems,
	showViewAll,
}: {
	projects: any[];
	limitItems?: number;
	showViewAll?: boolean;
}) {
	const [activeTab, setActiveTab] = useState("All Projects");

	// Filter Logic
	const filteredProjects = projects.filter((project) => {
		if (activeTab === "All Projects") return true;

		// Exact match with database category string
		if (project.category) {
			return project.category === activeTab;
		}

		// Fallback matching if category is empty (for old data)
		const q = activeTab.toLowerCase();
		const textToSearch =
			`${project.title} ${project.description} ${(project.tech_stack || []).join(" ")}`.toLowerCase();

		if (q.includes("saas") || q.includes("dashboard"))
			return (
				textToSearch.includes("saas") || textToSearch.includes("dashboard")
			);
		if (q.includes("web3") || q.includes("crypto"))
			return (
				textToSearch.includes("web3") ||
				textToSearch.includes("crypto") ||
				textToSearch.includes("solana")
			);
		if (q.includes("business") || q.includes("portfolio"))
			return (
				textToSearch.includes("business") ||
				textToSearch.includes("portfolio") ||
				textToSearch.includes("corporate") ||
				textToSearch.includes("landing")
			);
		if (q.includes("ai"))
			return (
				textToSearch.includes("ai") ||
				textToSearch.includes("openai") ||
				textToSearch.includes("machine learning")
			);

		return false;
	});

	const displayedProjects = limitItems
		? filteredProjects.slice(0, limitItems)
		: filteredProjects;

	return (
		<div className="flex flex-col gap-10">
			{/* Filter Tabs */}
			<div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-4">
				{CATEGORIES.map((category) => (
					<button
						key={category}
						onClick={() => setActiveTab(category)}
						className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
							activeTab === category
								? "bg-blue-700 text-white shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.4),0_4px_10px_rgba(29,78,216,0.3)] border border-blue-600/50"
								: "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5"
						}`}>
						{category}
					</button>
				))}
			</div>

			{/* Grid Layout */}
			<motion.div
				layout
				className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
				<AnimatePresence>
					{displayedProjects.length > 0 ? (
						displayedProjects.map((project: any) => (
							<motion.div
								layout
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.3 }}
								key={project.id}
								className="h-full">
								<Link
									href={`/projects/${project.id}`}
									className="flex flex-col h-full rounded-2xl bg-glass-bg border border-glass-border overflow-hidden group/card hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(29,78,216,0.15)] transition-all duration-300">
									{/* Thumbnail */}
									<div
										className="h-48 md:h-56 bg-cover bg-center relative border-b border-glass-border overflow-hidden"
										style={{
											backgroundImage: project.image_url
												? `url('${project.image_url}')`
												: "none",
											backgroundColor: "#111",
										}}>
										<div className="absolute inset-0 bg-black/40 group-hover/card:bg-transparent transition-all duration-500"></div>
										{/* Overlay gradient for text readability if needed */}
										<div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
									</div>

									{/* Content inside Card */}
									<div className="flex flex-col flex-grow p-6">
										<h4 className="font-bold text-xl text-white group-hover/card:text-blue-400 transition-colors line-clamp-2 mb-3">
											{project.title}
										</h4>
										<p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-grow">
											{project.description}
										</p>

										{/* Tech Stack Pills */}
										<div className="flex flex-wrap gap-2 mb-6">
											{project.tech_stack
												?.slice(0, 4)
												.map((stack: string, i: number) => (
													<span
														key={i}
														className="text-[10px] md:text-xs font-mono font-medium bg-blue-500/10 border border-blue-500/20 text-blue-300 px-2.5 py-1 rounded">
														{stack}
													</span>
												))}
											{project.tech_stack?.length > 4 && (
												<span className="text-[10px] md:text-xs font-mono font-medium bg-white/5 border border-white/10 text-slate-400 px-2.5 py-1 rounded">
													+{project.tech_stack.length - 4}
												</span>
											)}
										</div>

										{/* Footer Area with Divider */}
										<div className="pt-4 mt-auto border-t border-white/10 flex justify-between items-center">
											<div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium bg-emerald-400/10 px-2 py-1 rounded">
												<div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
												Live / Deployed
											</div>
											<div className="text-sm font-bold text-white group-hover/card:text-blue-400 flex items-center gap-1 transition-colors">
												Read Case Study
												<span className="material-symbols-outlined text-[16px] transform group-hover/card:translate-x-1 transition-transform">
													arrow_forward
												</span>
											</div>
										</div>
									</div>
								</Link>
							</motion.div>
						))
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="col-span-full py-20 text-center">
							<span className="material-symbols-outlined text-4xl text-slate-600 mb-3">
								folder_off
							</span>
							<h3 className="text-xl font-bold text-slate-400 mb-1">
								No Projects Found
							</h3>
							<p className="text-slate-500">
								There are no projects matching this category.
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>

			{/* View All Button */}
			{showViewAll && (
				<div className="flex justify-center mt-8">
					<Link
						href="/projects"
						className="px-8 py-3 rounded-full font-bold bg-blue-700 border border-blue-600/50 text-white shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.4),0_4px_10px_rgba(29,78,216,0.3)] hover:bg-blue-600 transition-all duration-300 flex items-center gap-2 group active:translate-y-[1px] active:shadow-[inset_0_1px_1px_rgba(0,0,0,0.2)]">
						View All Projects
						<span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
							arrow_forward
						</span>
					</Link>
				</div>
			)}
		</div>
	);
}
