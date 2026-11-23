import { Metadata } from "next";
import { siteConfig } from "./seo";

interface ConstructMetadataProps {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  canonical,
  noIndex = false,
  keywords = siteConfig.keywords,
  type = "website",
  publishedTime,
  authors,
}: ConstructMetadataProps = {}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} - Premier CBSE School`;
  const canonicalUrl = canonical
    ? `${siteConfig.url}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
    : siteConfig.url;

  return {
    title: metaTitle,
    description,
    keywords,
    authors: authors ? authors.map((a) => ({ name: a })) : [{ name: siteConfig.author }],
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: metaTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      locale: siteConfig.locale,
      type,
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description,
      images: [image],
      creator: "@gidhaurcentralschool",
    },
  };
}
