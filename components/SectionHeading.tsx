import React from "react";

interface SectionHeadingProps {
	titleLine1: string;
	titleLine2?: string;
	description?: string;
	align?: "left" | "center";
}

export default function SectionHeading({
	titleLine1,
	titleLine2,
	description,
	align = "center",
}: SectionHeadingProps) {
	return (
		<div
			className={`flex flex-col mb-10 md:mb-14 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}>
			<h2
				className={`text-3xl md:text-5xl lg:text-5xl font-black text-white tracking-tight leading-tight ${description ? "mb-4" : ""}`}>
				<span>{titleLine1}</span>
				{titleLine2 && (
					<span className="block text-slate-400 font-extrabold mt-1 md:mt-2">
						{titleLine2}
					</span>
				)}
			</h2>

			{description && (
				<p
					className={`text-slate-400 md:text-lg max-w-4xl mt-2 ${align === "center" ? "mx-auto" : ""}`}>
					{description}
				</p>
			)}
		</div>
	);
}
