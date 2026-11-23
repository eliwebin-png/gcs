import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { Calendar, User, ArrowRight } from "lucide-react";

import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    title: "School News, Announcements & Press Releases",
    description:
      "Stay updated with the latest academic news, event circulars, admission bulletins, and achievements from our school.",
    canonical: "/news",
  });
}

export default async function NewsPage() {
  const [schoolInfo, newsList] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.news.findMany({ where: { isPublished: true }, orderBy: { publishDate: "desc" } }).catch(() => []),
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
        badge="PRESS & BULLETINS"
        title="Latest News & Stories"
        subtitle="Keep abreast with school announcements, achievements, academic updates, and press releases."
        breadcrumbs={[{ label: "News" }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-4 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-500" />
                        {new Date(item.publishDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {item.author}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/news/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 group/link"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
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
