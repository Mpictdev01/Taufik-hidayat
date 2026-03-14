'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProjectCarousel({ projects }: { projects: any[] }) {
    const [carouselWidth, setCarouselWidth] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateWidth = () => {
             if (carouselRef.current && innerRef.current) {
                setCarouselWidth(innerRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }
        };
        
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [projects]);

    const scroll = (direction: 'left' | 'right') => {
        // Approximate width of one card + gap
        const step = window.innerWidth < 768 ? 280 + 24 : 340 + 24; 
        
        if (direction === 'left') {
            setCurrentX(prev => Math.min(prev + step, 0));
        } else {
            setCurrentX(prev => Math.max(prev - step, -carouselWidth));
        }
    };

    return (
			<div className="col-span-1 md:col-span-2 lg:col-span-4 rounded-2xl p-6 md:p-8 border border-glass-border bg-glass-bg backdrop-blur-md flex flex-col gap-6 relative overflow-hidden">
				<div className="flex justify-end items-center z-10 relative mb-2">
					<div className="flex gap-2">
						<button
							onClick={() => scroll("left")}
							disabled={currentX >= 0}
							className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
							<span className="material-symbols-outlined text-[18px]">
								chevron_left
							</span>
						</button>
						<button
							onClick={() => scroll("right")}
							disabled={currentX <= -carouselWidth}
							className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
							<span className="material-symbols-outlined text-[18px]">
								chevron_right
							</span>
						</button>
					</div>
				</div>

				{/* Carousel Container */}
				<div
					ref={carouselRef}
					className="overflow-hidden z-10 relative pb-4 pt-2 -mx-4 px-4 md:-mx-8 md:px-8 cursor-grab active:cursor-grabbing">
					<motion.div
						ref={innerRef}
						drag="x"
						dragConstraints={{ right: 0, left: -carouselWidth }}
						dragElastic={0.1}
						animate={{ x: currentX }}
						onDragEnd={(e, info) => {
							// Keep track of internal state to match drag
							setCurrentX(
								Math.max(-carouselWidth, Math.min(0, currentX + info.offset.x)),
							);
						}}
						transition={{
							type: "spring",
							stiffness: 200,
							damping: 25,
							mass: 1,
						}}
						className="flex gap-6 w-max">
						{/* Dynamic Projects */}
						{projects.length > 0 ? (
							projects.map((project: any) => (
								<Link
									key={project.id}
									draggable={false}
									href={`/projects/${project.id}`}
									className="min-w-[280px] w-[280px] md:min-w-[340px] md:w-[340px] rounded-xl bg-background-dark border border-white/5 overflow-hidden group/card hover:border-primary/40 transition-colors block">
									<div
										className="h-40 bg-cover bg-center relative"
										style={{
											backgroundImage: project.image_url
												? `url('${project.image_url}')`
												: "none",
											backgroundColor: "#111",
										}}>
										<div className="absolute inset-0 bg-black/40 group-hover/card:bg-black/20 transition-all"></div>
									</div>
									<div className="p-5 pointer-events-none">
										<div className="flex justify-between items-start mb-2">
											<h4 className="font-bold text-lg text-white group-hover/card:text-primary transition-colors">
												{project.title}
											</h4>
											<span className="material-symbols-outlined text-[18px] text-slate-500">
												arrow_outward
											</span>
										</div>
										<p className="text-xs text-slate-400 mb-4 line-clamp-2">
											{project.description}
										</p>
										<div className="flex gap-2 flex-wrap">
											{project.tech_stack
												?.slice(0, 3)
												.map((stack: string, i: number) => (
													<span
														key={i}
														className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded text-slate-300">
														{stack}
													</span>
												))}
										</div>
									</div>
								</Link>
							))
						) : (
							<div className="text-slate-500 text-sm p-4 min-w-[300px]">
								No projects added yet from admin.
							</div>
						)}
					</motion.div>
				</div>

				<div className="absolute top-0 right-0 w-1/4 md:w-1/6 h-full bg-gradient-to-l from-glass-bg to-transparent pointer-events-none z-0"></div>
				<div className="absolute top-0 left-0 w-1/4 md:w-1/6 h-full bg-gradient-to-r from-glass-bg to-transparent pointer-events-none z-0"></div>
			</div>
		);
}
