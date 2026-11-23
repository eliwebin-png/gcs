import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { Download, FileText } from "lucide-react";

import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    title: "Downloads & Forms | Prospectus, Admission Forms, Syllabus & Calendar",
    description:
      "Download official school documents including the registration form, information brochure, annual academic calendar, and CBSE syllabus PDFs.",
    canonical: "/downloads",
  });
}

export default async function DownloadsPage() {
  const [schoolInfo, downloads] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.downloadItem.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []),
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
        badge="STUDENT & PARENT RESOURCES"
        title="Downloads & Forms"
        subtitle="Access school prospectus, admission forms, academic syllabi, holiday lists, and circulars."
        breadcrumbs={[{ label: "Downloads" }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {downloads.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {item.fileType} • {item.fileSize}
                    </p>
                  </div>
                </div>

                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all flex-shrink-0"
                  aria-label={`Download ${item.title}`}
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
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
