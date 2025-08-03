import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from '@/components/Providers';

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChatGuru - Ancient Vedic Wisdom for Modern Life",
  description: "Discover timeless guidance through Patanjali's Yoga Sutras. ChatGuru helps you navigate life's challenges with 2,000-year-old wisdom tailored to your personal spiritual journey.",
  keywords: ["yoga", "meditation", "patanjali", "spiritual guidance", "vedic wisdom", "yoga sutras"],
  authors: [{ name: "ChatGuru Team" }],
  openGraph: {
    title: "ChatGuru - Ancient Vedic Wisdom for Modern Life",
    description: "Personalized spiritual guidance based on Patanjali's Yoga Sutras",
    type: "website",
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
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
