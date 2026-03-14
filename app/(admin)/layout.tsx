import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
	title: "Admin Panel | Taufik Hidayat",
	description: "Portfolio Admin Console",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function AdminRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<head>
                {/* Reusing fonts from main layout for consistency */}
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
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body className="bg-background-dark text-white font-display antialiased overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground min-h-screen">
				{children}
			</body>
		</html>
	);
}
