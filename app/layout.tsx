import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAT San Jose",
  description: "San Jose's premier muscle activation therapy practice. Expert MAT specialist providing pain relief, posture correction, and sports rehabilitation without surgery or medication.",
  keywords: "muscle activation technique, MAT therapy, pain relief, San Jose, posture correction, sports rehabilitation, chronic pain treatment",
  authors: [{ name: "MAT San Jose" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
    apple: { url: '/favicon.svg', type: 'image/svg+xml' }
  },
  openGraph: {
    title: "MAT San Jose",
    description: "Expert muscle activation therapy in San Jose. Eliminate pain, improve posture, and enhance performance without surgery.",
    type: "website",
    locale: "en_US",
  },
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
