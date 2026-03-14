'use client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function EditProjectPage() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0); // 0-100%
    const [activeTab, setActiveTab] = useState('basic'); // basic, details, content
    
    // Form States
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState("SaaS & Dashboards");
		const [description, setDescription] = useState("");
		const [techStack, setTechStack] = useState("");
		const [imageUrl, setImageUrl] = useState("");
		const [imageFile, setImageFile] = useState<File | null>(null);
		const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
		const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);

		// Details
		const [client, setClient] = useState("");
		const [role, setRole] = useState("");
		const [year, setYear] = useState("");
		const [demoUrl, setDemoUrl] = useState("");
		const [repoUrl, setRepoUrl] = useState("");

		// Content
		const [overview, setOverview] = useState("");
		const [challenge, setChallenge] = useState("");
		const [solution, setSolution] = useState("");

		useEffect(() => {
			const fetchProject = async () => {
				const { data: project, error } = await supabase
					.from("projects")
					.select("*")
					.eq("id", id)
					.single();

				if (error) {
					console.error("Error fetching project:", error);
					alert("Project not found");
					router.push("/admin/projects");
					return;
				}

				setTitle(project.title || "");
				setCategory(project.category || "SaaS & Dashboards");
				setDescription(project.description || "");
				setTechStack(
					Array.isArray(project.tech_stack)
						? project.tech_stack.join(", ")
						: project.tech_stack || "",
				);
				setImageUrl(project.image_url || "");
				setClient(project.client || "");
				setRole(project.role || "");
				setYear(project.year || "");
				setDemoUrl(project.demo_url || "");
				setRepoUrl(project.repo_url || "");
				setOverview(project.overview || "");
				setChallenge(project.challenge || "");
				setSolution(project.solution || "");
				setGalleryUrls(project.gallery_urls || []);

				setLoading(false);
			};

			if (id) fetchProject();
		}, [id, router]);

		const handleSubmit = async (e: React.FormEvent) => {
			e.preventDefault();
			setSaving(true);

			try {
				let totalFiles = (imageFile ? 1 : 0) + newGalleryFiles.length;
				let uploadedCount = 0;

				const updateProgress = () => {
					uploadedCount++;
					setUploadProgress(Math.round((uploadedCount / totalFiles) * 100));
				};

				// 1. Upload Image if changed
				let finalImageUrl = imageUrl;
				if (imageFile) {
					const fileExt = imageFile.name.split(".").pop();
					const fileName = `cover-${Math.random()}.${fileExt}`;
					const { error: uploadError } = await supabase.storage
						.from("project-images")
						.upload(`${fileName}`, imageFile);

					if (uploadError) throw uploadError;

					const {
						data: { publicUrl },
					} = supabase.storage
						.from("project-images")
						.getPublicUrl(`${fileName}`);

					finalImageUrl = publicUrl;
					updateProgress();
				}

				// 2. Upload New Gallery Images
				let finalGalleryUrls = [...galleryUrls];
				for (const file of newGalleryFiles) {
					const fileExt = file.name.split(".").pop();
					const fileName = `gallery-${Math.random()}.${fileExt}`;
					const { error: uploadError } = await supabase.storage
						.from("project-images")
						.upload(`${fileName}`, file);

					if (!uploadError) {
						const {
							data: { publicUrl },
						} = supabase.storage
							.from("project-images")
							.getPublicUrl(`${fileName}`);
						finalGalleryUrls.push(publicUrl);
					}
					updateProgress();
				}

				// 3. Update Data
				const { error: updateError } = await supabase
					.from("projects")
					.update({
						title,
						category,
						description,
						tech_stack: techStack
							.split(",")
							.map((s) => s.trim())
							.filter(Boolean),
						image_url: finalImageUrl,
						client,
						role,
						year,
						demo_url: demoUrl,
						repo_url: repoUrl,
						overview,
						challenge,
						solution,
						gallery_urls: finalGalleryUrls,
					})
					.eq("id", id);

				if (updateError) throw updateError;

				router.push("/admin/projects");
				router.refresh();
			} catch (error: any) {
				console.error("Error updating project:", error);
				alert(`Error: ${error.message}`);
			} finally {
				setSaving(false);
				setUploadProgress(0);
			}
		};

		const removeGalleryImage = (indexToRemove: number) => {
			setGalleryUrls((prev) =>
				prev.filter((_, index) => index !== indexToRemove),
			);
		};

		if (loading)
			return (
				<div className="p-10 text-center text-slate-500">
					Loading project data...
				</div>
			);

		return (
			<div className="max-w-4xl mx-auto space-y-6">
				<div className="flex items-center gap-4 mb-8">
					<Link
						href="/admin/projects"
						className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
						<span className="material-symbols-outlined">arrow_back</span>
					</Link>
					<div>
						<h1 className="text-3xl font-bold text-white mb-1">Edit Project</h1>
						<p className="text-slate-400 text-sm">Update case study details</p>
					</div>
				</div>

				<div className="bg-glass-bg border border-glass-border p-6 md:p-8 rounded-2xl backdrop-blur-md">
					{/* Tabs */}
					<div className="flex border-b border-white/10 mb-8 overflow-x-auto">
						<button
							type="button"
							onClick={() => setActiveTab("basic")}
							className={`px-6 py-3 text-sm font-bold uppercase tracking-wider relative whitespace-nowrap ${activeTab === "basic" ? "text-primary" : "text-slate-500 hover:text-slate-300"}`}>
							Basic Info
							{activeTab === "basic" && (
								<div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
							)}
						</button>
						<button
							type="button"
							onClick={() => setActiveTab("details")}
							className={`px-6 py-3 text-sm font-bold uppercase tracking-wider relative whitespace-nowrap ${activeTab === "details" ? "text-primary" : "text-slate-500 hover:text-slate-300"}`}>
							Details & Links
							{activeTab === "details" && (
								<div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
							)}
						</button>
						<button
							type="button"
							onClick={() => setActiveTab("content")}
							className={`px-6 py-3 text-sm font-bold uppercase tracking-wider relative whitespace-nowrap ${activeTab === "content" ? "text-primary" : "text-slate-500 hover:text-slate-300"}`}>
							Case Study Content
							{activeTab === "content" && (
								<div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
							)}
						</button>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Basic Info Tab */}
						{activeTab === "basic" && (
							<div className="space-y-6 animate-fadeIn">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
											Project Title
										</label>
										<input
											type="text"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
											required
										/>
									</div>
									<div>
										<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
											Category
										</label>
										<select
											value={category}
											onChange={(e) => setCategory(e.target.value)}
											className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none"
											required>
											<option
												value="SaaS & Dashboards"
												className="bg-[#0a0f18] text-white">
												SaaS & Dashboards
											</option>
											<option
												value="Web3 & Memecoin"
												className="bg-[#0a0f18] text-white">
												Web3 & Memecoin
											</option>
											<option
												value="Business & Portfolios"
												className="bg-[#0a0f18] text-white">
												Business & Portfolios
											</option>
											<option
												value="AI Integrations"
												className="bg-[#0a0f18] text-white">
												AI Integrations
											</option>
											<option value="Other" className="bg-[#0a0f18] text-white">
												Other
											</option>
										</select>
									</div>
								</div>
								<div>
									<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
										Short Description
									</label>
									<textarea
										rows={3}
										value={description}
										onChange={(e) => setDescription(e.target.value)}
										className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
										required
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
										Tech Stack (comma separated)
									</label>
									<input
										type="text"
										value={techStack}
										onChange={(e) => setTechStack(e.target.value)}
										className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
											Cover Image
										</label>
										{imageUrl && (
											<div className="mb-4 w-32 h-20 rounded-lg overflow-hidden border border-white/10 relative group">
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src={imageUrl}
													alt="Current"
													className="w-full h-full object-cover"
												/>
											</div>
										)}
										<input
											type="file"
											accept="image/*"
											onChange={(e) =>
												setImageFile(e.target.files?.[0] || null)
											}
											className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
										/>
										<p className="text-[10px] text-slate-500 mt-1">
											Upload new file to replace current cover.
										</p>
									</div>

									<div>
										<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex justify-between">
											Gallery Images
											<span>
												({galleryUrls.length + newGalleryFiles.length} / 6)
											</span>
										</label>

										{/* Existing Gallery Images */}
										{galleryUrls.length > 0 && (
											<div className="flex flex-wrap gap-3 mb-4">
												{galleryUrls.map((url, i) => (
													<div
														key={i}
														className="relative w-16 h-16 rounded overflow-hidden border border-white/20 group">
														{/* eslint-disable-next-line @next/next/no-img-element */}
														<img
															src={url}
															alt={`Gallery ${i}`}
															className="w-full h-full object-cover"
														/>
														<button
															type="button"
															onClick={() => removeGalleryImage(i)}
															className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
															<span className="material-symbols-outlined text-sm">
																delete
															</span>
														</button>
													</div>
												))}
											</div>
										)}

										{/* Upload New Gallery Images */}
										<input
											type="file"
											accept="image/*"
											multiple
											onChange={(e) => {
												const files = Array.from(e.target.files || []);
												const availableSlots = 6 - galleryUrls.length;

												if (files.length > availableSlots) {
													alert(
														`Hanya ${availableSlots} slot tersisa untuk galeri.`,
													);
													setNewGalleryFiles(files.slice(0, availableSlots));
												} else {
													setNewGalleryFiles(files);
												}
											}}
											className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-white hover:file:bg-primary/50"
										/>
										{newGalleryFiles.length > 0 && (
											<div className="flex flex-wrap gap-2 mt-3 text-[10px] text-primary">
												+{newGalleryFiles.length} gambar baru akan diunggah
											</div>
										)}
									</div>
								</div>
							</div>
						)}

						{/* Details Tab */}
						{activeTab === "details" && (
							<div className="space-y-6 animate-fadeIn">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
											Client Name
										</label>
										<input
											type="text"
											value={client}
											onChange={(e) => setClient(e.target.value)}
											className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
										/>
									</div>
									<div>
										<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
											Year
										</label>
										<input
											type="text"
											value={year}
											onChange={(e) => setYear(e.target.value)}
											className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
										/>
									</div>
								</div>
								<div>
									<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
										Your Role
									</label>
									<input
										type="text"
										value={role}
										onChange={(e) => setRole(e.target.value)}
										className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
											Live Demo URL
										</label>
										<input
											type="url"
											value={demoUrl}
											onChange={(e) => setDemoUrl(e.target.value)}
											className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
										/>
									</div>
									<div>
										<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
											GitHub Repo URL
										</label>
										<input
											type="url"
											value={repoUrl}
											onChange={(e) => setRepoUrl(e.target.value)}
											className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
										/>
									</div>
								</div>
							</div>
						)}

						{/* Content Tab */}
						{activeTab === "content" && (
							<div className="space-y-6 animate-fadeIn">
								<div>
									<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
										Overview (Full Case Study)
									</label>
									<textarea
										rows={5}
										value={overview}
										onChange={(e) => setOverview(e.target.value)}
										className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
										The Challenge
									</label>
									<textarea
										rows={4}
										value={challenge}
										onChange={(e) => setChallenge(e.target.value)}
										className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
									/>
								</div>
								<div>
									<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
										The Solution
									</label>
									<textarea
										rows={4}
										value={solution}
										onChange={(e) => setSolution(e.target.value)}
										className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
									/>
								</div>
							</div>
						)}

						<div className="pt-8 flex justify-end gap-3 border-t border-white/10">
							<Link
								href="/admin/projects"
								className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-medium">
								Cancel
							</Link>
							<button
								type="submit"
								disabled={saving}
								className="relative px-6 py-3 bg-primary text-background-dark font-bold rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center gap-2 overflow-hidden">
								{saving && uploadProgress > 0 && (
									<div
										className="absolute left-0 top-0 bottom-0 bg-white/30 transition-all duration-300 pointer-events-none"
										style={{ width: `${uploadProgress}%` }}></div>
								)}
								<span className="relative z-10 flex items-center gap-2">
									{saving
										? `Saving... ${uploadProgress > 0 ? uploadProgress + "%" : ""}`
										: "Save Changes"}
									{!saving && (
										<span className="material-symbols-outlined text-[18px]">
											check
										</span>
									)}
								</span>
							</button>
						</div>
					</form>
				</div>
			</div>
		);
}
