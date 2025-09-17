import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ReactQueryProvider } from '@/providers/react-query.provider';
import Navbar from '@/components/Navbar/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    images: [
      {
        url: '/landing.png',
        width: 1200,
        height: 630,
        alt: 'Kindo - Fun & Easy Korean Learning App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kindo - Fun & Easy Korean Learning App',
    description:
      'Learn Korean through play with interactive lessons and personalized learning paths.',
    images: ['/landing.png'],
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
        <ReactQueryProvider>
          <Navbar />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
