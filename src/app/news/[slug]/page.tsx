import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import { getNewsArticleJsonLd } from "@/lib/jsonld";

export const revalidate = 60;

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.news.findUnique({ where: { slug } }).catch(() => null);

  if (!article) {
    return constructMetadata({
      title: "Article Not Found",
      description: "The requested school news article could not be located.",
      noIndex: true,
    });
  }

  return constructMetadata({
    title: article.title,
    description: article.summary || article.content.substring(0, 160),
    image: article.thumbnail,
    canonical: `/news/${article.slug}`,
    type: "article",
    publishedTime: new Date(article.publishDate).toISOString(),
    authors: [article.author || "Principal's Desk"],
  });
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;

  const [schoolInfo, article] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.news.findUnique({ where: { slug } }).catch(() => null),
  ]);

  if (!article) {
    notFound();
  }

  const newsArticleJsonLd = getNewsArticleJsonLd({
    title: article.title,
    description: article.summary || article.content.substring(0, 160),
    url: `/news/${article.slug}`,
    imageUrl: article.thumbnail,
    datePublished: new Date(article.publishDate).toISOString(),
    dateModified: new Date(article.updatedAt || article.publishDate).toISOString(),
    author: article.author,
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleJsonLd) }}
      />

      <Navbar
        schoolName={schoolInfo?.schoolName}
        tagline={schoolInfo?.tagline}
        phone={schoolInfo?.phone1}
        email={schoolInfo?.email}
      />

      <PageHeader
        badge="CAMPUS NEWS"
        title={article.title}
        breadcrumbs={[{ label: "News", href: "/news" }, { label: article.title }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All News</span>
          </Link>

          {/* Article Header Meta */}
          <div className="flex items-center gap-6 text-xs text-slate-500 pb-4 border-b border-slate-100">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-600" />
              {new Date(article.publishDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-500" />
              By {article.author}
            </span>
          </div>

          {/* Featured Image */}
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full max-h-[480px] object-cover"
            />
          </div>

          {/* Summary Callout */}
          <div className="p-6 rounded-2xl bg-blue-50/70 border-l-4 border-blue-600 text-slate-800 text-base font-semibold leading-relaxed">
            {article.summary}
          </div>

          {/* Full Content */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base sm:text-lg space-y-4">
            <p>{article.content}</p>
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
