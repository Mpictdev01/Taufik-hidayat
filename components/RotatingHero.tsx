"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const slides = [
	"Scale Your Business with End-to-End, AI-Powered SaaS Platforms.",
	"Elevate Your Brand Authority with Smart, Futuristic Web Applications.",
	"Capture Market Hype with High-Converting Web3 & AI Integrations.",
];

interface RotatingHeroProps {
	heroImage: string;
}

export default function RotatingHero({ heroImage }: RotatingHeroProps) {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % slides.length);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	return (
		<section className="relative h-screen w-full flex items-center justify-center px-4 md:px-8 overflow-hidden">
			<div className="z-10 text-center max-w-5xl flex flex-col items-center gap-4">
				<div className="min-h-[100px] md:min-h-[120px] lg:min-h-[140px] flex items-center justify-center">
					<AnimatePresence mode="wait">
						<motion.h1
							key={slides[index]}
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -20, opacity: 0 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.2] md:leading-[1.1] max-w-4xl mx-auto">
							{slides[index]}
						</motion.h1>
					</AnimatePresence>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.6 }}
					className="relative mt-12 md:mt-16 px-6 pb-8 pt-16 md:pt-20 rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-md max-w-3xl mx-auto w-full shadow-xl">
					{/* Profile Image Overlapping Top Edge */}
					<motion.div
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{
							delay: 0.6,
							type: "spring",
							stiffness: 200,
							damping: 20,
						}}
						className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-br from-primary via-blue-500 to-purple-600 shadow-[0_0_30px_-5px_rgba(38,171,247,0.5)] z-20">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={heroImage}
							alt="Taufik Hidayat"
							className="w-full h-full object-cover rounded-full border-4 border-background-dark/90"
						/>
					</motion.div>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.8, duration: 0.8 }}
						className="text-sm md:text-base lg:text-lg text-slate-300 leading-relaxed balanced-text">
						I&apos;m Taufik, a Full Stack Developer with over 3 years of experience
						shaping the modern web with React and Next.js. I specialize in
						building end-to-end web applications with seamless AI integration.
						From scalable SaaS and futuristic business portfolios to
						high-converting Web3 and Memecoin launches, I deliver blazing-fast,
						secure digital experiences designed to drive real business results.
					</motion.p>
				</motion.div>

				{/* GitHub Button - Outside card, centered below */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1, duration: 0.5 }}
					className="flex justify-center mt-4">
					<a
						href="https://github.com/taufikhidayat"
						target="_blank"
						rel="noopener noreferrer"
						className="group w-12 hover:w-44 h-12 hover:bg-blue-600 relative bg-blue-700 rounded-full text-white duration-700 before:duration-700 font-bold flex justify-start gap-2 items-center p-2 pr-6 before:absolute before:-z-10 before:left-8 before:hover:left-40 before:w-6 before:h-6 before:bg-blue-700 before:hover:bg-blue-600 before:rotate-45 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.4),0_4px_10px_rgba(29,78,216,0.5)] border border-blue-600/50">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 shrink-0 fill-white">
							<path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.25.79-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.26 3.38.96.1-.76.4-1.26.72-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.5.12-3.1 0 0 .98-.32 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.18 3.2-1.18.64 1.6.24 2.8.12 3.1.75.8 1.2 1.82 1.2 3.08 0 4.44-2.7 5.4-5.28 5.68.4.34.76 1.02.76 2.06v3.05c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
						</svg>
						<span className="origin-left inline-flex duration-100 group-hover:duration-300 group-hover:delay-500 opacity-0 group-hover:opacity-100 border-l-2 border-white/30 px-1 transform scale-x-0 group-hover:scale-x-100 transition-all text-sm">
							GitHub
						</span>
					</a>
				</motion.div>
			</div>

			{/* Decorative elements to match the brutalist/minimalist theme */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px]"></div>
			</div>
		</section>
	);
}
