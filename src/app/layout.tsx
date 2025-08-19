import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Kindo - Fun & Easy Korean Learning App',
	description:
		'Learn Korean through play with Kindo! Interactive lessons, speaking practice, personalized learning paths, and daily reminders to help you master Korean language skills.',
	keywords: [
		'Korean learning',
		'language app',
		'Korean language',
		'learn Korean',
		'Korean lessons',
		'speaking practice',
		'interactive learning',
	],
	openGraph: {
		title: 'Kindo - Fun & Easy Korean Learning App',
		description:
			'Learn Korean through play with interactive lessons and personalized learning paths.',
		type: 'website',
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Kindo - Fun & Easy Korean Learning App',
		description:
			'Learn Korean through play with interactive lessons and personalized learning paths.',
	},
	robots: 'index, follow',
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
