import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { Pin, FileText, Calendar, Download } from "lucide-react";

import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    title: "Notice Board & Official Circulars | Exam Dates, Holidays & Announcements",
    description:
      "Access official school notices, CBSE date sheets, holiday announcements, parent-teacher meeting schedules, and urgent alerts.",
    canonical: "/notice-board",
  });
}

export default async function NoticeBoardPage() {
  const [schoolInfo, notices] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.notice.findMany({ orderBy: [{ isPinned: "desc" }, { publishDate: "desc" }] }).catch(() => []),
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
        badge="OFFICIAL CIRCULARS"
        title="Notice Board"
        subtitle="Official administrative communications, exam date sheets, holiday alerts, and academic schedules."
        breadcrumbs={[{ label: "Notice Board" }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="space-y-4">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className={`p-6 rounded-3xl border transition-all duration-200 ${
                  notice.isPinned
                    ? "bg-amber-50/40 border-amber-200 shadow-sm"
                    : "bg-white border-slate-200/80 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      {notice.isPinned && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                          <Pin className="w-3 h-3" />
                          <span>Pinned Notice</span>
                        </span>
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                        {notice.category}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {notice.title}
                    </h3>

                    {notice.description && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {notice.description}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>
                        Published on {new Date(notice.publishDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {notice.fileUrl && (
                    <a
                      href={notice.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all self-start sm:self-center flex-shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  )}
                </div>
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
