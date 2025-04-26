import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "scrive| Sketch toThumbnail Converter",
    template: "%s | scrive- Sketch toThumbnail AI Tool",
  },
  description:
    "scrivetransforms your sketches and images into professionalThumbnails using AI. Convert your design ideas into stunning, ready-to-useThumbnails with our powerful conversion tool.",
  keywords: [
    "sketch toThumbnail",
    "AIThumbnail generator",
    "image toThumbnail converter",
    "logo design tool",
    "AI design converter",
    "professionalThumbnail maker",
    "drawing toThumbnail",
    "logo transformation",
    "brand design tool",
    "AI branding assistant",
  ],
  authors: [{ name: "SketchThumb" }],
  creator: "SketchThumb",
  publisher: "SketchThumb",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://localhost:3000",
    siteName: "scrive- Sketch toThumbnail Converter",
    title: "scrive| Transform Sketches into ProfessionalThumbnails",
    description:
      "Turn your sketches and images into professionalThumbnails with SketchThumb. Our AI-powered tool helps you create stunningThumbnails from your design ideas quickly and efficiently.",
    images: [
      {
        url: "http://localhost:3000/og-image.png",
        width: 1200,
        height: 630,
        alt: "scriveSketch toThumbnail Converter Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "scrive| AI-Powered Sketch toThumbnail Converter",
    description:
      "Transform your sketches and images into professionalThumbnails with SketchThumb. Create stunning brand identities with our AI-powered conversion tool.",
    creator: "@yassin_ouchen",
    images: ["http://localhost:3000/twitter-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  alternates: {
    canonical: "http://localhost:3000",
    languages: {
      "en-US": "http://localhost:3000",
    },
  },
  category: "productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}