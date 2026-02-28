import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProjectCarousel from "@/components/ProjectCarousel";

// Disable caching for this page so it updates instantly
export const revalidate = 0;

async function getData() {
    // Parallel fetching
    const [profileRes, techRes, projectsRes] = await Promise.all([
        supabase.from('profile_settings').select('*').single(),
        supabase.from('tech_stacks').select('*').order('sort_order', { ascending: true }),
        supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(6)
    ]);

    return {
        profile: profileRes.data || {},
        techs: techRes.data || [],
        projects: projectsRes.data || []
    };
}

export default async function Home() {
    // 1. Log the view (fire and forget, don't block the rest)
    supabase.from('page_views').insert([{ page_url: '/' }]).then();

    const { profile, techs, projects } = await getData();

    // Defaults in case DB is empty
    const heroTitle = profile.hero_title || "TAUFIK HIDAYAT";
    const statusText = profile.status_text || "Available for work";
    const fullName = profile.full_name || "Taufik Hidayat";
    const description = profile.hero_description || "Crafting digital experiences with a focus on automation, performance, and minimalistic aesthetics.";
    const location = profile.location || "Magelang, ID";
    const coords = profile.location_coords || "7.4797° S, 110.2177° E";
    const heroImage = profile.hero_image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuBXnx2Tx10nWun9jgtUQimDVPjRiiFNSH2qSVplo5mUO-ousoWq_dRnOdBUijcWL8Rrm5BFZp7EMITDazdJRuWKqzpwp-Qr-UUWZOHXZ6GT_IRlFE_i73p5cSNxF6v8D00YrHVZ4QGhNvmhFAcMHf4E2w3R7A-wKnfRa_1Fgerspwkb99vV5JHKUC1RITe0zoE_eU-RoKljNTjvbfgZ-fM8RZszcBos5hOf83cdH7FSjSn4zjfPclUGij70z_C0DoC6p9e8mInqqblb";

	return (
		<main className="relative z-10 flex-grow pt-32 pb-12 px-4 sm:px-6">
			<div className="max-w-[1200px] mx-auto">
				<header className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
					<div className="space-y-2">
						<h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
							{heroTitle}
						</h1>
						<div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-slate-400 font-mono text-sm md:text-base">
							<span className="flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
								{statusText}
							</span>
							<span className="hidden md:block text-slate-700">|</span>
							<p className="text-primary font-medium tracking-wide">
								WEB DEVELOPER & AUTOMATION SPECIALIST
							</p>
						</div>
					</div>
				</header>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-auto lg:grid-rows-[minmax(280px,auto)_minmax(180px,auto)_auto] gap-4 lg:gap-6">
					{/* Portrait Card */}
					<div className="group relative col-span-1 md:col-span-1 lg:col-span-2 lg:row-span-2 rounded-2xl overflow-hidden border border-glass-border bg-glass-bg backdrop-blur-md min-h-[500px] lg:min-h-0">
						<div className="absolute inset-0 z-0">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={heroImage}
								alt={`Portrait of ${fullName}`}
								className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60"
							/>
						</div>
						<div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent z-10"></div>
						<div className="absolute bottom-0 left-0 w-full p-6 z-20">
							<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/20 backdrop-blur-sm mb-4">
								<span className="material-symbols-outlined text-primary text-[16px]">
									verified
								</span>
								<span className="text-xs font-bold text-primary tracking-wide uppercase">
									Pro Member
								</span>
							</div>
							<h2 className="text-3xl font-bold text-white mb-1">
								{fullName}
							</h2>
							<p className="text-slate-300 max-w-md text-sm leading-relaxed">
								{description}
							</p>
							<div className="flex gap-3 mt-4">
								{profile.email && (
									<Link
										href={`mailto:${profile.email}`}
										className="p-2 rounded-lg bg-white/10 hover:bg-white/20 hover:text-primary transition-colors text-white"
										title="Email Me">
										<span className="material-symbols-outlined text-[20px]">
											mail
										</span>
									</Link>
								)}
								{profile.social_links?.github && (
									<Link
										href={profile.social_links.github}
										target="_blank"
										className="p-2 rounded-lg bg-white/10 hover:bg-white/20 hover:text-primary transition-colors text-white"
										title="GitHub">
										<span className="material-symbols-outlined text-[20px]">
											code
										</span>
									</Link>
								)}
							</div>
						</div>
						<div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-2xl transition-all duration-300 pointer-events-none z-30"></div>
					</div>

					{/* Terminal Card */}
					<div className="col-span-1 md:col-span-1 lg:col-span-2 lg:row-span-2 rounded-2xl overflow-hidden border border-glass-border bg-[#0a0f18] shadow-2xl flex flex-col group">
						<div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/5">
							<div className="flex gap-2">
								<div className="w-3 h-3 rounded-full bg-red-500/80"></div>
								<div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
								<div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
							</div>
							<div className="text-[10px] font-mono text-slate-500">
								zsh — 80x24
							</div>
						</div>
						<div className="p-5 font-mono text-sm md:text-base text-slate-300 flex-grow overflow-y-auto scrollbar-hide space-y-4">
							<div className="space-y-1">
								<div className="flex gap-2 text-wrap break-all">
									<span className="text-emerald-400">root@taufik:~#</span>
									<span className="text-white">whoami</span>
								</div>
								<p className="pl-4 text-slate-400">
									&gt; Full Stack Developer specializing in React, Node.js, and
									Python automation scripts.
								</p>
							</div>
							<div className="space-y-1">
								<div className="flex gap-2 text-wrap break-all">
									<span className="text-emerald-400">root@taufik:~#</span>
									<span className="text-white">current_focus</span>
								</div>
								<p className="pl-4 text-slate-400">
									&gt; Building scalable dashboard systems and high-performance
									web applications.
								</p>
							</div>
							<div className="space-y-1">
								<div className="flex gap-2 text-wrap break-all">
									<span className="text-emerald-400">root@taufik:~#</span>
									<span className="text-white">skills --list</span>
								</div>
                                {/* Dynamic Tech List in Terminal if needed, or keeping static for flavor. Let's make it fetch techs for flavor */}
								<div className="pl-4 grid grid-cols-2 gap-x-4 gap-y-1 text-primary/90 text-xs md:text-sm">
                                    {techs.length > 0 ? techs.slice(0, 6).map((tech: any, i: number) => (
                                        <span key={i}>- {tech.name}</span>
                                    )) : (
                                        <>
                                            <span>- JavaScript (ES6+)</span>
                                            <span>- TypeScript</span>
                                            <span>- Python</span>
                                            <span>- Supabase</span>
                                        </>
                                    )}
								</div>
							</div>
							<div className="flex gap-2 pt-2">
								<span className="text-emerald-400">root@taufik:~#</span>
								<span className="w-2.5 h-5 bg-primary/80 cursor-blink inline-block align-middle"></span>
							</div>
						</div>
					</div>

					{/* Tech Stack Card */}
					<div className="col-span-1 md:col-span-2 rounded-2xl p-6 border border-glass-border bg-glass-bg backdrop-blur-md flex flex-col justify-center relative overflow-hidden group hover:bg-glass-bg/80 transition-all">
						<h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 z-10">
							Tech Stack
						</h3>
						<div className="flex flex-wrap items-center gap-6 md:gap-8 z-10">
                            {/* Dynamic Tech Stack */}
                            {techs.length > 0 ? techs.map((tech: any) => (
                                <div key={tech.id} className="flex flex-col items-center gap-2 group/icon">
                                    <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${tech.color_class || 'text-slate-400'} group-hover/icon:text-white group-hover/icon:${tech.color_class?.replace('text-', 'bg-').replace('400', '500') || 'bg-slate-500'} transition-all`}>
                                        <span className="material-symbols-outlined text-[32px]">
                                            {tech.icon_name}
                                        </span>
                                    </div>
                                    <span className="text-xs font-medium text-slate-400">
                                        {tech.name}
                                    </span>
                                </div>
                            )) : (
                                <p className="text-slate-500 text-sm">No stack defined yet.</p>
                            )}
						</div>
						<span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[140px] text-white/5 rotate-[-15deg] pointer-events-none group-hover:text-white/10 transition-colors">
							layers
						</span>
					</div>

					{/* Location Card */}
					<div className="col-span-1 rounded-2xl relative overflow-hidden border border-glass-border bg-[#111] group">
						<div
							className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity"
							style={{
								backgroundImage:
									"url('https://lh3.googleusercontent.com/aida-public/AB6AXuAPIbPtL6HgyY4bP-LNS-G3g0QPNto9EM7dzd3vtpy_kdQaNjopXNMO3PACHmQ4AOyzZedrAvF4OzPMSRSruP2GYNkBLFxJUhLdzC0Nv6LguKFJVwh_SIYwEZnRtZuMOwuOsYlei6FObA2G2I_cw0Nf19GSGcdbuDCcsLzrXBlN4qLBQ6ldRaoNarqQunqVcXb3Oec3DolzXv4FfHDHGUdqI1AmuN3a4s2DQD2B1GAXU1W-jf35tIWSASBrvdciLx1PzknYob0DZBuY')",
							}}></div>
						<div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
						<div className="absolute bottom-4 left-4 z-10">
							<div className="flex items-center gap-1.5 mb-1 text-primary">
								<span className="material-symbols-outlined text-[18px] animate-bounce">
									location_on
								</span>
								<span className="font-bold text-sm tracking-wide">
									{location}
								</span>
							</div>
							<p className="font-mono text-[10px] text-slate-400 bg-black/50 backdrop-blur-sm px-2 py-1 rounded border border-white/5 inline-block">
								{coords}
							</p>
						</div>
					</div>

					{/* Contributions Card */}
					<div className="col-span-1 rounded-2xl p-5 border border-glass-border bg-glass-bg backdrop-blur-md flex flex-col justify-between group hover:border-primary/40 transition-all">
						<div className="flex justify-between items-start">
							<div className="p-2 rounded-lg bg-white/5 text-white">
								<span className="material-symbols-outlined text-[24px]">
									dataset
								</span>
							</div>
							<a href={profile.social_links?.github || '#'} target="_blank" className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors cursor-pointer text-[20px]">
								open_in_new
							</a>
						</div>
						<div className="space-y-2 mt-4">
							<div className="text-3xl font-black text-white">532</div>
							<div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
								Contributions (YTD)
							</div>
						</div>
                        {/* Fake contribution graph - kept static as requested unless user asks for GH integration */}
						<div className="flex gap-1 mt-4 h-8 items-end opacity-50 group-hover:opacity-100 transition-opacity">
                            {/* ... kept same bars ... */}
                            {[40, 70, 100, 50, 80, 30, 90, 60, 40, 20, 60, 80].map((h, i) => (
                                <div key={i} className={`w-1.5 bg-primary${h<100 ? '/'+h : ''} rounded-sm`} style={{height: `${h}%`}}></div>
                            ))}
						</div>
					</div>

					{/* Featured Projects Carousel Component */}
					<ProjectCarousel projects={projects} />
				</div>

			</div>

			{/* Background Effect */}
			<div className="fixed inset-0 z-0 pointer-events-none">
				<div className="absolute inset-0 bg-grid-pattern opacity-60"></div>
				<div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
				<div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
			</div>
		</main>
	);
}
