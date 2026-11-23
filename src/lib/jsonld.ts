import { siteConfig } from "./seo";

export function getSchoolJsonLd(schoolInfo?: any) {
  const name = schoolInfo?.schoolName || siteConfig.name;
  const description = schoolInfo?.tagline || siteConfig.description;
  const phone = schoolInfo?.phone1 || siteConfig.telephone;
  const email = schoolInfo?.email || siteConfig.email;
  const address = schoolInfo?.address || `${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}`;

  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${siteConfig.url}/#school`,
    name,
    description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: siteConfig.ogImage,
    telephone: phone,
    email,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    sameAs: [
      schoolInfo?.facebookUrl || siteConfig.social.facebook,
      schoolInfo?.instagramUrl || siteConfig.social.instagram,
      schoolInfo?.youtubeUrl || siteConfig.social.youtube,
      schoolInfo?.linkedinUrl || siteConfig.social.linkedin,
    ].filter(Boolean),
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Net Banking, UPI",
    openingHours: "Mo-Sa 08:00-16:00",
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#school`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/news?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
  };
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url.startsWith("/") ? item.url : `/${item.url}`}`,
    })),
  };
}

export function getFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getNewsArticleJsonLd(article: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.description,
    image: [article.imageUrl || siteConfig.ogImage],
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Person",
      name: article.author || "Principal's Desk",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url.startsWith("http") ? article.url : `${siteConfig.url}${article.url}`,
    },
  };
}

export function getEventJsonLd(event: {
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  imageUrl?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: event.title,
    description: event.description,
    image: [event.imageUrl || siteConfig.ogImage],
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: siteConfig.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: event.location || siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.addressLocality,
        addressRegion: siteConfig.address.addressRegion,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.addressCountry,
      },
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}
