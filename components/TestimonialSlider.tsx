"use client";

import { useRef, useState, useEffect } from "react";

interface Testimonial {
	id: string;
	client_name: string;
	client_role: string;
	avatar_url: string;
	content: string;
	rating: number;
}

export default function TestimonialSlider({
	testimonials,
}: {
	testimonials: Testimonial[];
}) {
	const trackRef = useRef<HTMLDivElement>(null);
	const [isPaused, setIsPaused] = useState(false);
	const [duration, setDuration] = useState(40);

	if (!testimonials || testimonials.length === 0) return null;

	// We need two identical sets side-by-side for seamless infinite loop
	const items = [...testimonials, ...testimonials];

	// Calculate animation duration based on item count (more items = slower)
	useEffect(() => {
		setDuration(Math.max(20, testimonials.length * 8));
	}, [testimonials.length]);

	return (
		<div
			className="w-full py-10 overflow-hidden relative"
			style={{
				WebkitMaskImage:
					"linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
				maskImage:
					"linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
			}}>
			<div
				ref={trackRef}
				className="flex gap-6 w-max"
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
				style={{
					animationName: "marquee-scroll",
					animationDuration: `${duration}s`,
					animationTimingFunction: "linear",
					animationIterationCount: "infinite",
					animationPlayState: isPaused ? "paused" : "running",
				}}>
				{items.map((testi, i) => (
					<div
						key={`${testi.id}-${i}`}
						className="w-[300px] md:w-[400px] shrink-0 bg-glass-bg border border-glass-border p-6 md:p-8 rounded-2xl flex flex-col justify-between hover:border-primary/40 hover:shadow-[0_0_30px_rgba(45,212,191,0.05)] transition-all duration-300 cursor-default select-none">
						{/* Stars */}
						<div className="flex text-amber-400 text-sm mb-4 space-x-1">
							{[...Array(5)].map((_, idx) => (
								<span
									key={idx}
									className="material-symbols-outlined"
									style={{ fontVariationSettings: "'FILL' 1" }}>
									{idx < (testi.rating || 5) ? "star" : "star_border"}
								</span>
							))}
						</div>

						{/* Content */}
						<p className="text-slate-300 text-base md:text-lg mb-8 leading-relaxed font-light italic flex-grow">
							&ldquo;{testi.content}&rdquo;
						</p>

						{/* Author */}
						<div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
							<div
								className="w-12 h-12 rounded-full bg-slate-800 bg-cover bg-center shrink-0 border border-white/10"
								style={{
									backgroundImage: testi.avatar_url
										? `url('${testi.avatar_url}')`
										: "none",
								}}>
								{!testi.avatar_url && (
									<div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-lg rounded-full">
										{testi.client_name.charAt(0)}
									</div>
								)}
							</div>
							<div>
								<h4 className="font-bold text-white tracking-tight">
									{testi.client_name}
								</h4>
								<p className="text-xs text-primary font-mono uppercase tracking-widest mt-0.5">
									{testi.client_role}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Inline keyframes for the marquee */}
			<style jsx>{`
				@keyframes marquee-scroll {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}
			`}</style>
		</div>
	);
}
