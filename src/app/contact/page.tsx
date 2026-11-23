import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import FaqAndContact from "@/components/home/FaqAndContact";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const schoolInfo = await prisma.schoolInfo.findFirst().catch(() => null);
  return constructMetadata({
    title: "Contact Campus & Admissions Office | Address, Phone & Map",
    description: `Contact ${schoolInfo?.schoolName || "Greenfield International School"}. Call ${schoolInfo?.phone1 || "+91 98765 43210"} or email ${schoolInfo?.email || "admissions@greenfieldschool.edu.in"} for admissions inquiries and campus tours.`,
    canonical: "/contact",
  });
}

export default async function ContactPage() {
  const [schoolInfo, faqs] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.fAQ.findMany({ orderBy: { order: "asc" } }).catch(() => []),
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
        badge="GET IN TOUCH"
        title="Contact Our Campus"
        subtitle="We invite parents, students, and visitors to reach out or visit our campus for guided tours."
        breadcrumbs={[{ label: "Contact Us" }]}
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
        whatsappNumber={schoolInfo?.whatsappNumber}
      />
    </div>
  );
}
