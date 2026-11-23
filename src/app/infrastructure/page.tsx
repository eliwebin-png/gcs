import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { CheckCircle2 } from "lucide-react";

import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    title: "Campus Infrastructure & World-Class Facilities | STEM Labs, Library & Sports",
    description:
      "Tour our green campus featuring smart classrooms, robotics lab, science laboratories, olympic-size sports arena, and Wi-Fi enabled digital library.",
    canonical: "/infrastructure",
  });
}

export default async function InfrastructurePage() {
  const [schoolInfo, facilities] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.facility.findMany({ orderBy: { order: "asc" } }).catch(() => []),
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
        badge="CAMPUS & FACILITIES"
        title="World-Class Infrastructure"
        subtitle="Sprawling green campus equipped with modern laboratories, smart classrooms, and athletic fields."
        breadcrumbs={[{ label: "Infrastructure & Facilities" }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((fac) => {
              const facSlug = fac.title.toLowerCase();
              const anchorId = facSlug.includes("library")
                ? "library"
                : facSlug.includes("lab") || facSlug.includes("science")
                ? "laboratories"
                : facSlug.includes("sport")
                ? "sports"
                : facSlug.includes("transport") || facSlug.includes("bus")
                ? "transport"
                : facSlug.replace(/[^a-z0-9]+/g, "-");

              return (
                <div
                  key={fac.id}
                  id={anchorId}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group scroll-mt-28"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={fac.imageUrl}
                      alt={fac.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white drop-shadow">
                        {fac.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {fac.description || "State-of-the-art facility designed to stimulate hands-on learning, safety, and creative exploration for all age groups."}
                    </p>
                    
                    <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>24x7 Monitored & Fully Air-Conditioned</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      <Footer
        schoolName={schoolInfo?.schoolName}
        tagline={schoolInfo?.tagline}
        facebookUrl={schoolInfo?.facebookUrl}
        instagramUrl={schoolInfo?.instagramUrl}
        youtubeUrl={schoolInfo?.youtubeUrl}
        linkedinUrl={schoolInfo?.linkedinUrl}
      />
    </div>
  );
}
