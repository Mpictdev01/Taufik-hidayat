import Link from "next/link";
import { supabase } from "@/lib/supabase";
import PortfolioGrid from "@/components/PortfolioGrid";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQSection from "@/components/FAQSection";
import AnimatedSection from "@/components/AnimatedSection";
import RotatingHero from "@/components/RotatingHero";
import ProjectScopingForm from "@/components/ProjectScopingForm";
import SectionHeading from "@/components/SectionHeading";

// Disable caching for this page so it updates instantly
export const revalidate = 0;

async function getData() {
    // Parallel fetching
    const [profileRes, projectsRes, testimonialsRes] =
			await Promise.all([
				supabase.from("profile_settings").select("*").single(),
				supabase
					.from("projects")
					.select("*")
					.order("created_at", { ascending: false }),
				supabase
					.from("testimonials")
					.select("*")
					.eq("is_active", true)
					.order("created_at", { ascending: false }),
			]);

    return {
			profile: profileRes.data || {},
			projects: projectsRes.data || [],
			testimonials: testimonialsRes.data || [],
		};
}

export default async function Home() {
    // 1. Log the view (fire and forget, don't block the rest)
    supabase.from('page_views').insert([{ page_url: '/' }]).then();

    const { profile, projects, testimonials } = await getData();

    // Defaults in case DB is empty
    const heroTitle = profile.hero_title || "TAUFIK HIDAYAT";
    const statusText = profile.status_text || "Available for work";
    const fullName = profile.full_name || "Taufik Hidayat";
    const description = profile.hero_description || "Crafting digital experiences with a focus on automation, performance, and minimalistic aesthetics.";
    const location = profile.location || "Magelang, ID";
    const coords = profile.location_coords || "7.4797° S, 110.2177° E";
    const heroImage = profile.hero_image_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuBXnx2Tx10nWun9jgtUQimDVPjRiiFNSH2qSVplo5mUO-ousoWq_dRnOdBUijcWL8Rrm5BFZp7EMITDazdJRuWKqzpwp-Qr-UUWZOHXZ6GT_IRlFE_i73p5cSNxF6v8D00YrHVZ4QGhNvmhFAcMHf4E2w3R7A-wKnfRa_1Fgerspwkb99vV5JHKUC1RITe0zoE_eU-RoKljNTjvbfgZ-fM8RZszcBos5hOf83cdH7FSjSn4zjfPclUGij70z_C0DoC6p9e8mInqqblb";

	return (
		<main className="relative z-10 flex-grow pb-12 px-4 sm:px-6">
			<RotatingHero heroImage={heroImage} />
			<AnimatedSection id="scoping">
				<ProjectScopingForm />
			</AnimatedSection>

			<AnimatedSection className="max-w-[1200px] mx-auto pt-16">
				<SectionHeading
					titleLine1="Featured Projects & Production-Ready Solutions"
					description="Explore my recent works, case studies, and scalable architectures."
					align="center"
				/>
				{/* Portfolio Grid with Filter component */}
				<PortfolioGrid projects={projects} limitItems={6} showViewAll={true} />
			</AnimatedSection>

			{/* Testimonials Section */}
			<AnimatedSection id="testimonials" className="w-full mt-24">
				<div className="max-w-[1200px] mx-auto">
					<SectionHeading
						titleLine1="Client Feedback & Testimonials"
						description="What people are saying about my work, communication, and problem-solving skills."
						align="center"
					/>
				</div>

				{testimonials && testimonials.length > 0 ? (
					<TestimonialSlider testimonials={testimonials} />
				) : (
					<div className="max-w-[1200px] mx-auto py-12 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
						<span className="material-symbols-outlined text-4xl text-slate-600 mb-3">
							forum
						</span>
						<h3 className="text-xl font-bold text-slate-400 mb-1">
							No Testimonials Yet
						</h3>
						<p className="text-slate-500">
							Add your first testimonial from the Admin Panel.
						</p>
					</div>
				)}
			</AnimatedSection>

			{/* FAQ Section */}
			<AnimatedSection id="faq">
				<FAQSection />
			</AnimatedSection>

			{/* Background Effect */}
			<div className="fixed inset-0 z-0 pointer-events-none">
				<div className="absolute inset-0 bg-grid-pattern opacity-60"></div>
				<div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
				<div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
			</div>
		</main>
	);
}
