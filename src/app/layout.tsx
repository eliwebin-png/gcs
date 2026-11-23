import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/seo";
import { getSchoolJsonLd, getWebSiteJsonLd } from "@/lib/jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Premier CBSE Affiliated Institution`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.creator,
  publisher: siteConfig.publisher,
  keywords: siteConfig.keywords,
  category: "Education",
  icons: {
    icon: [
      { url: "/images/gidhaur-logo.png", sizes: "any" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/images/gidhaur-logo.png",
    apple: [
      { url: "/images/gidhaur-logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: siteConfig.url,
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
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - Premier CBSE Affiliated Institution`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Campus & Infrastructure`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Admissions Open 2025-26`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@gidhaurcentralschool",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-token",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "yandex-verification-token",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schoolSchema = getSchoolJsonLd();
  const websiteSchema = getWebSiteJsonLd();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Global JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
