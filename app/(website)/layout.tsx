import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrolling from "@/components/SmoothScrolling";

export const metadata: Metadata = {
	title: "Taufik Hidayat - Portfolio",
	description: "Web Developer & Automation Specialist",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<head>
				<link href="https://fonts.googleapis.com" rel="preconnect" />
				<link
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
					rel="preconnect"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className="bg-background-dark text-white font-display antialiased overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground min-h-screen flex flex-col">
				<SmoothScrolling>
					<Navbar />
					{children}
					<Footer />
				</SmoothScrolling>
			</body>
		</html>
	);
}
