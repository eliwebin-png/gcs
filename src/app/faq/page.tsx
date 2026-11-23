import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import FaqAndContact from "@/components/home/FaqAndContact";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import { getFaqJsonLd } from "@/lib/jsonld";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    title: "Frequently Asked Questions (FAQ) | Admissions, Timings & Transport",
    description:
      "Find answers to frequently asked questions about admissions procedure, age eligibility, bus routes, CBSE board affiliation, and day-boarding.",
    canonical: "/faq",
  });
}

export default async function FaqPage() {
  const [schoolInfo, faqs] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.fAQ.findMany({ orderBy: { order: "asc" } }).catch(() => []),
  ]);

  const faqSchema = getFaqJsonLd(
    faqs.map((f) => ({ question: f.question, answer: f.answer }))
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar
        schoolName={schoolInfo?.schoolName}
        tagline={schoolInfo?.tagline}
        phone={schoolInfo?.phone1}
        email={schoolInfo?.email}
      />

      <PageHeader
        badge="HELP & ASSISTANCE"
        title="Frequently Asked Questions"
        subtitle="Answers to common queries regarding admissions, curriculum, school timings, transportation, and fees."
        breadcrumbs={[{ label: "FAQs" }]}
      />

      <main className="flex-1">
        <FaqAndContact
          faqs={faqs}
          address={schoolInfo?.address}
          phone1={schoolInfo?.phone1}
          phone2={schoolInfo?.phone2}
          email={schoolInfo?.email}
          workingHours={schoolInfo?.workingHours}
        />
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
