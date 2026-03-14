import { supabase } from "@/lib/supabase";
import PortfolioGrid from "@/components/PortfolioGrid";
import SectionHeading from "@/components/SectionHeading";

// Disable caching for live data
export const revalidate = 0;

export default async function Projects() {
	// Fetch all projects from Supabase
	const { data: projects } = await supabase
		.from("projects")
		.select("*")
		.order("created_at", { ascending: false });

	return (
		<main className="relative z-10 flex-grow pt-32 pb-24 px-4 sm:px-6">
			<div className="max-w-[1200px] mx-auto mb-16">
				{/* 
                  Identical heading style as requested. 
                  Users asked to change the title, description, and style to match the new web style.
                */}
				<SectionHeading
					titleLine1="Project Grid & Archive Repository."
					description="Exploring the intersection of modern Web Architecture, Web3, and scalable solutions."
					align="center"
				/>
			</div>

			<div className="max-w-[1200px] mx-auto">
				<PortfolioGrid projects={projects || []} />
			</div>

			{/* Simple Decorative Footer consistent with old design but modernized */}
			<div className="max-w-[1200px] mx-auto mt-24">
				<footer className="border-t border-white/10 pt-10 pb-6 flex flex-col md:flex-row justify-between items-center gap-6">
					<div className="flex flex-col gap-2 text-center md:text-left">
						<p className="text-slate-500 font-mono text-[10px] tracking-widest uppercase">
							© {new Date().getFullYear()} Taufik Hidayat // ARCHIVE_CORE
						</p>
						<div className="flex items-center justify-center md:justify-start gap-2">
							<span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
							<span className="text-emerald-400 font-mono text-[9px] uppercase tracking-tighter">
								System Status: Operational
							</span>
						</div>
					</div>
				</footer>
			</div>
		</main>
	);
}
