import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { siteConfig } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // 1. Static Public Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/admissions`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/academics`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/achievements`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/infrastructure`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faculty`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/notice-board`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/downloads`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mandatory-disclosure`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/career`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/principal-message`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/director-message`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. Dynamic News routes from Prisma
  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    const news = await prisma.news.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true, publishDate: true },
    });
    newsRoutes = news.map((item) => ({
      url: `${baseUrl}/news/${item.slug}`,
      lastModified: item.updatedAt || item.publishDate || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {}

  return [...staticRoutes, ...newsRoutes];
}
