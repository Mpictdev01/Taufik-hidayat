"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditTestimonial() {
	const router = useRouter();
	const params = useParams();
	const id = params.id as string;

	const [loading, setLoading] = useState(false);
	const [initialLoading, setInitialLoading] = useState(true);

	// Form States
	const [clientName, setClientName] = useState("");
	const [clientRole, setClientRole] = useState("");
	const [content, setContent] = useState("");
	const [rating, setRating] = useState(5);
	const [isActive, setIsActive] = useState(true);

	// Image Handling
	const [imageUrl, setImageUrl] = useState("");
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState("");

	useEffect(() => {
		if (!id) return;

		const fetchTestimonial = async () => {
			const { data, error } = await supabase
				.from("testimonials")
				.select("*")
				.eq("id", id)
				.single();

			if (error) {
				console.error(error);
				alert("Testimonial not found.");
				router.push("/admin/testimonials");
				return;
			}

			if (data) {
				setClientName(data.client_name || "");
				setClientRole(data.client_role || "");
				setContent(data.content || "");
				setRating(data.rating || 5);
				setIsActive(data.is_active !== false); // default true if undefined
				setImageUrl(data.avatar_url || "");
			}
			setInitialLoading(false);
		};

		fetchTestimonial();
	}, [id, router]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setImageFile(file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	const handleRemoveImage = () => {
		setImageFile(null);
		setImagePreview("");
		setImageUrl("");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			let finalImageUrl = imageUrl;

			// Handle image upload if a new file is selected
			if (imageFile) {
				const fileExt = imageFile.name.split(".").pop();
				const fileName = `${Math.random()}.${fileExt}`;
				const filePath = `avatars/${fileName}`;

				const { error: uploadError } = await supabase.storage
					.from("project-images")
					.upload(filePath, imageFile);

				if (uploadError) throw uploadError;

				const {
					data: { publicUrl },
				} = supabase.storage.from("project-images").getPublicUrl(filePath);

				finalImageUrl = publicUrl;
			}

			// Update database
			const { error: updateError } = await supabase
				.from("testimonials")
				.update({
					client_name: clientName,
					client_role: clientRole,
					content,
					rating,
					is_active: isActive,
					avatar_url: finalImageUrl || null, // Allow nulling out old image
				})
				.eq("id", id);

			if (updateError) throw updateError;

			alert("Testimonial updated successfully!");
			router.push("/admin/testimonials");
			router.refresh();
		} catch (error: any) {
			alert("Error updating testimonial: " + error.message);
		} finally {
			setLoading(false);
		}
	};

	if (initialLoading) {
		return (
			<div className="p-10 text-center text-slate-400">
				Loading Testimonial Data...
			</div>
		);
	}

	// ... Using same layout as NewTestimonial
	return (
		<div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
			{/* Header */}
			<div>
				<button
					onClick={() => router.back()}
					className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
					<span className="material-symbols-outlined text-sm">arrow_back</span>
					Back to Testimonials
				</button>
				<h1 className="text-3xl font-black text-white tracking-tight">
					Edit Testimonial
				</h1>
				<p className="text-slate-500 text-sm mt-1 font-mono">{id}</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="bg-glass-bg border border-glass-border rounded-2xl p-6 lg:p-8 space-y-6">
					{/* Basic Info */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
								Client Name
							</label>
							<input
								type="text"
								value={clientName}
								onChange={(e) => setClientName(e.target.value)}
								className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
								required
							/>
						</div>
						<div>
							<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
								Client Role / Company
							</label>
							<input
								type="text"
								value={clientRole}
								onChange={(e) => setClientRole(e.target.value)}
								className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
								required
							/>
						</div>
					</div>

					{/* Content */}
					<div>
						<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
							Testimonial Content
						</label>
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							rows={4}
							className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
							required></textarea>
					</div>

					{/* Rating & Status */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-white/10">
						<div>
							<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
								Rating (1-5)
							</label>
							<input
								type="number"
								min="1"
								max="5"
								value={rating}
								onChange={(e) => setRating(parseInt(e.target.value))}
								className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
								required
							/>
						</div>
						<div className="flex items-center mt-8">
							<label className="flex items-center gap-3 cursor-pointer">
								<input
									type="checkbox"
									className="w-5 h-5 rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-background-dark"
									checked={isActive}
									onChange={(e) => setIsActive(e.target.checked)}
								/>
								<span className="text-white font-medium">Set as Active</span>
							</label>
						</div>
					</div>

					{/* Avatar Upload */}
					<div>
						<div className="flex justify-between items-center mb-2">
							<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
								Avatar Profile (Optional)
							</label>
							{(imagePreview || imageUrl) && (
								<button
									type="button"
									onClick={handleRemoveImage}
									className="text-[10px] text-red-400 font-bold uppercase hover:underline">
									Remove Image
								</button>
							)}
						</div>
						<div className="flex items-start gap-6">
							<div
								className="w-24 h-24 rounded-full border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center text-slate-500 overflow-hidden bg-cover bg-center shrink-0"
								style={
									imagePreview || imageUrl
										? { backgroundImage: `url(${imagePreview || imageUrl})` }
										: {}
								}>
								{!(imagePreview || imageUrl) && (
									<span className="material-symbols-outlined text-3xl">
										account_circle
									</span>
								)}
							</div>
							<div className="flex-1">
								<input
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									className="block w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary hover:file:text-background-dark cursor-pointer transition-colors"
								/>
								<p className="text-xs text-slate-500 mt-2">
									Recommended: Square format avatar, max 2MB.
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Submit Area */}
				<div className="flex justify-end">
					<button
						type="submit"
						disabled={loading}
						className={`px-8 py-4 rounded-xl font-bold bg-primary text-background-dark transition-all duration-300 flex items-center gap-2 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]"}`}>
						{loading ? (
							<>
								<span className="material-symbols-outlined animate-spin">
									sync
								</span>
								Saving...
							</>
						) : (
							<>
								<span className="material-symbols-outlined text-[20px]">
									save
								</span>
								Update Testimonial
							</>
						)}
					</button>
				</div>
			</form>
		</div>
	);
}
