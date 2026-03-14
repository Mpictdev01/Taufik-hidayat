"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";

export default function ProjectScopingForm() {
	const [step, setStep] = useState(1);

	// State for form data (untuk simulasi)
	const [formData, setFormData] = useState({
		hasDesign: "",
		projectType: "",
		details: "",
	});

	const nextStep = () => {
		if (step < 3) setStep(step + 1);
	};

	const prevStep = () => {
		if (step > 1) setStep(step - 1);
	};

	// Variasi Animasi Framer Motion untuk transisi form (geser ke kiri)
	const variants = {
		initial: { x: 50, opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: -50, opacity: 0 },
	};

	return (
		<section className="w-full min-h-[100vh] flex flex-col justify-center max-w-4xl mx-auto px-4 md:px-8 py-16">
			<div className="mt-8 md:mt-12">
				<SectionHeading
					titleLine1="Ready to Build?"
					titleLine2="Let’s Scope Your Project."
					description="Fill out this quick form so we can understand your vision and accelerate the timeline."
					align="center"
				/>
			</div>

			{/* Main Form Glass Card */}
			<motion.div
				layout
				className="relative p-6 md:p-10 rounded-2xl border border-glass-border bg-[#0a0f18]/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col h-auto transition-all duration-300">
				{/* Header: Progress Indicators */}
				<div className="flex justify-center items-center mb-12 relative z-10 w-full max-w-xs mx-auto">
					{/* Connecting Line */}
					<div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10 -translate-y-1/2"></div>

					<div className="flex justify-between w-full">
						{[1, 2, 3].map((num) => (
							<button
								key={num}
								onClick={() => step > num && setStep(num)} // Hanya bisa klik prev step
								className={`w-12 h-12 rounded-full flex items-center justify-center text-[20px] transition-all duration-300 relative ${
									step === num
										? "bg-blue-700 text-white shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.4),0_4px_10px_rgba(29,78,216,0.5)] border border-blue-600/50 scale-110"
										: step > num
											? "bg-blue-900/30 text-blue-400 border border-blue-700/50 cursor-pointer hover:bg-blue-800/40 shadow-inner"
											: "bg-white/5 text-slate-500 border border-white/10 cursor-default shadow-inner"
								}`}>
								<span className="material-symbols-outlined text-[24px]">
									{num === 1
										? "design_services"
										: num === 2
											? "apps"
											: "check_circle"}
								</span>
							</button>
						))}
					</div>
				</div>

				{/* Form Content Area */}
				<div className="relative w-full">
					<AnimatePresence mode="wait">
						{step === 1 && (
							<motion.div
								key="step1"
								variants={variants}
								initial="initial"
								animate="animate"
								exit="exit"
								transition={{ duration: 0.4, ease: "easeInOut" }}
								className="w-full flex flex-col">
								<h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center md:text-left">
									Do you have UI/UX designs or reference files ready?
								</h3>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<button
										onClick={() => {
											setFormData({ ...formData, hasDesign: "yes" });
											nextStep();
										}}
										className={`p-5 rounded-2xl border text-left transition-all duration-300 group hover:-translate-y-1 flex items-center gap-4 ${
											formData.hasDesign === "yes"
												? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
												: "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
										}`}>
										<div className="w-12 h-12 flex items-center justify-center shrink-0 rounded-lg bg-blue-700 text-white shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.4),0_4px_10px_rgba(29,78,216,0.5)] border border-blue-600/50 group-hover:bg-blue-800 transition-colors">
											<span className="material-symbols-outlined text-[24px]">
												check_box
											</span>
										</div>
										<span className="text-sm md:text-base font-medium text-slate-200 group-hover:text-white transition-colors">
											Yes, I have references or designs.
										</span>
									</button>

									<button
										onClick={() => {
											setFormData({ ...formData, hasDesign: "no" });
											nextStep();
										}}
										className={`p-5 rounded-2xl border text-left transition-all duration-300 group hover:-translate-y-1 flex items-center gap-4 ${
											formData.hasDesign === "no"
												? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
												: "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
										}`}>
										<div className="w-12 h-12 flex items-center justify-center shrink-0 rounded-lg bg-blue-700 text-white shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.4),0_4px_10px_rgba(29,78,216,0.5)] border border-blue-600/50 group-hover:bg-blue-800 transition-colors">
											<span className="material-symbols-outlined text-[24px]">
												design_services
											</span>
										</div>
										<span className="text-sm md:text-base font-medium text-slate-200 group-hover:text-white transition-colors">
											No, I need help starting from scratch.
										</span>
									</button>
								</div>
							</motion.div>
						)}

						{step === 2 && (
							<motion.div
								key="step2"
								variants={variants}
								initial="initial"
								animate="animate"
								exit="exit"
								transition={{ duration: 0.4, ease: "easeInOut" }}
								className="w-full flex-grow flex flex-col">
								<div className="flex items-center justify-between mb-6">
									<h3 className="text-xl md:text-2xl font-bold text-white text-center md:text-left">
										What kind of digital experience are we building?
									</h3>
									<button
										onClick={prevStep}
										className="text-slate-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 flex items-center justify-center">
										<span className="material-symbols-outlined">
											arrow_back
										</span>
									</button>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{/* Option A */}
									<button
										onClick={() => {
											setFormData({
												...formData,
												projectType: "SaaS Platform",
											});
											nextStep();
										}}
										className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-primary/50 hover:bg-primary/5 text-left transition-all duration-300 group flex items-start gap-4">
										<div className="w-12 h-12 flex items-center justify-center shrink-0 rounded-lg bg-blue-700 text-white shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.4),0_4px_10px_rgba(29,78,216,0.5)] border border-blue-600/50 group-hover:bg-blue-800 transition-colors">
											<span className="material-symbols-outlined text-[24px]">
												cloud_sync
											</span>
										</div>
										<div>
											<h4 className="text-white font-bold mb-1">
												SaaS Platform
											</h4>
											<p className="text-xs text-slate-400 group-hover:text-slate-300 leading-relaxed">
												End-to-end scalable web applications & dashboards.
											</p>
										</div>
									</button>

									{/* Option B */}
									<button
										onClick={() => {
											setFormData({
												...formData,
												projectType: "Web3 & Memecoin",
											});
											nextStep();
										}}
										className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-primary/50 hover:bg-primary/5 text-left transition-all duration-300 group flex items-start gap-4">
										<div className="w-12 h-12 flex items-center justify-center shrink-0 rounded-lg bg-blue-700 text-white shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.4),0_4px_10px_rgba(29,78,216,0.5)] border border-blue-600/50 group-hover:bg-blue-800 transition-colors">
											<span className="material-symbols-outlined text-[24px]">
												currency_bitcoin
											</span>
										</div>
										<div>
											<h4 className="text-white font-bold mb-1">
												Web3 & Memecoin
											</h4>
											<p className="text-xs text-slate-400 group-hover:text-slate-300 leading-relaxed">
												High-converting landing pages & presale dApps.
											</p>
										</div>
									</button>

									{/* Option C */}
									<button
										onClick={() => {
											setFormData({
												...formData,
												projectType: "Corporate Website",
											});
											nextStep();
										}}
										className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-primary/50 hover:bg-primary/5 text-left transition-all duration-300 group flex items-start gap-4">
										<div className="w-12 h-12 flex items-center justify-center shrink-0 rounded-lg bg-blue-700 text-white shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.4),0_4px_10px_rgba(29,78,216,0.5)] border border-blue-600/50 group-hover:bg-blue-800 transition-colors">
											<span className="material-symbols-outlined text-[24px]">
												corporate_fare
											</span>
										</div>
										<div>
											<h4 className="text-white font-bold mb-1">
												Corporate Website
											</h4>
											<p className="text-xs text-slate-400 group-hover:text-slate-300 leading-relaxed">
												Futuristic & professional business portfolios.
											</p>
										</div>
									</button>

									{/* Option D */}
									<button
										onClick={() => {
											setFormData({
												...formData,
												projectType: "Custom AI Integration",
											});
											nextStep();
										}}
										className="p-5 rounded-xl border border-white/10 bg-white/5 hover:border-primary/50 hover:bg-primary/5 text-left transition-all duration-300 group flex items-start gap-4">
										<div className="w-12 h-12 flex items-center justify-center shrink-0 rounded-lg bg-blue-700 text-white shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.4),0_4px_10px_rgba(29,78,216,0.5)] border border-blue-600/50 group-hover:bg-blue-800 transition-colors">
											<span className="material-symbols-outlined text-[24px]">
												smart_toy
											</span>
										</div>
										<div>
											<h4 className="text-white font-bold mb-1">
												Custom AI Integration
											</h4>
											<p className="text-xs text-slate-400 group-hover:text-slate-300 leading-relaxed">
												Web apps supercharged with modern AI solutions.
											</p>
										</div>
									</button>
								</div>
							</motion.div>
						)}

						{step === 3 && (
							<motion.div
								key="step3"
								variants={variants}
								initial="initial"
								animate="animate"
								exit="exit"
								transition={{ duration: 0.4, ease: "easeInOut" }}
								className="w-full flex-grow flex flex-col">
								<div className="flex items-center justify-between mb-6">
									<h3 className="text-xl md:text-2xl font-bold text-white text-center md:text-left">
										Upload & Final Details
									</h3>
									<button
										onClick={prevStep}
										className="text-slate-500 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 flex items-center justify-center">
										<span className="material-symbols-outlined">
											arrow_back
										</span>
									</button>
								</div>

								<div className="space-y-4 mb-6">
									{/* Fake Drag n Drop Area */}
									<div className="w-full h-32 border-2 border-dashed border-white/10 rounded-xl bg-white/5 hover:bg-white/10 hover:border-slate-500/30 transition-colors flex flex-col items-center justify-center cursor-pointer group">
										<div className="w-12 h-12 flex items-center justify-center shrink-0 mb-3 rounded-lg bg-blue-700 text-white shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.4),0_4px_10px_rgba(29,78,216,0.5)] border border-blue-600/50 group-hover:bg-blue-800 transition-all duration-300 group-hover:-translate-y-1">
											<span className="material-symbols-outlined text-[24px]">
												cloud_upload
											</span>
										</div>
										<p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
											<span className="underline decoration-slate-400 underline-offset-4">
												Click to upload
											</span>{" "}
											or drag and drop files here
										</p>
										<p className="text-[10px] text-slate-500 mt-1 font-mono">
											File Type: PDF, Images, Figma Links • Max 10MB
										</p>
									</div>

									{/* Textarea */}
									<div className="space-y-2">
										<label className="text-xs font-medium tracking-wide text-slate-400 uppercase">
											Tell me a bit more about your goals and timeline...
										</label>
										<textarea
											value={formData.details}
											onChange={(e) =>
												setFormData({ ...formData, details: e.target.value })
											}
											placeholder="Write your notes here..."
											className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-primary resize-none transition-colors"></textarea>
									</div>
								</div>

								<div className="flex flex-col sm:flex-row items-center justify-between mt-auto gap-4">
									<a
										href="https://upwork.com" // Edit this later to real upwork link
										target="_blank"
										rel="noreferrer"
										className="text-xs text-slate-500 hover:text-primary transition-colors underline decoration-slate-700 underline-offset-4">
										Prefer a direct chat? Let's talk on Upwork.
									</a>
									<button
										onClick={() =>
											alert("Form Submitted! (This is a frontend demo)")
										}
										className="w-full sm:w-auto px-6 py-3 rounded-full bg-blue-700 text-white font-bold text-sm tracking-wide shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.4),0_4px_10px_rgba(29,78,216,0.5)] border border-blue-600/50 hover:bg-blue-800 active:shadow-[inset_0_0_2px_rgba(0,0,0,0.5)] active:translate-y-0.5 transition-all">
										Get Project Estimate
									</button>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* Decorative glow behind form */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] rounded-full point-events-none -z-20"></div>
			</motion.div>
		</section>
	);
}
