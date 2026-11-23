import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import GalleryViewer from "@/components/gallery/GalleryViewer";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    title: "Campus Photo & Video Gallery | Academic Life & Celebrations",
    description:
      "Explore high-resolution photographs of our campus infrastructure, interactive classrooms, sports events, annual celebrations, and science exhibitions.",
    canonical: "/gallery",
  });
}

export default async function GalleryPage() {
  const [schoolInfo, images] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.galleryImage.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }).catch(() => []),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar
        schoolName={schoolInfo?.schoolName}
        tagline={schoolInfo?.tagline}
        phone={schoolInfo?.phone1}
        email={schoolInfo?.email}
      />

      <PageHeader
        badge="CAMPUS MOMENTS"
        title="Photo & Video Gallery"
        subtitle="A vibrant photographic chronicle of academic discoveries, cultural celebrations, and sports triumphs."
        breadcrumbs={[{ label: "Gallery" }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryViewer initialImages={images as any} />
        </div>
      </main>

      <Footer
        schoolName={schoolInfo?.schoolName}
        tagline={schoolInfo?.tagline}
        facebookUrl={schoolInfo?.facebookUrl}
        instagramUrl={schoolInfo?.instagramUrl}
        youtubeUrl={schoolInfo?.youtubeUrl}
        linkedinUrl={schoolInfo?.linkedinUrl}
        whatsappNumber={schoolInfo?.whatsappNumber}
      />
    </div>
  );
}
