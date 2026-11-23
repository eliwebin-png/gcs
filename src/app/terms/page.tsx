import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";

import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Terms & Conditions | Website Usage & Admissions Terms",
  description: "General policies and terms governing the use of the school website and online admissions.",
  canonical: "/terms",
});

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <PageHeader
        badge="TERMS OF USE"
        title="Terms & Conditions"
        subtitle="General policies and terms governing the use of the school website and online admissions."
        breadcrumbs={[{ label: "Terms & Conditions" }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate text-sm sm:text-base leading-relaxed space-y-6 text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and browsing this school website, you agree to comply with and be bound by the following terms and conditions of use.
          </p>

          <h2 className="text-xl font-bold text-slate-900">2. Accuracy of Information</h2>
          <p>
            While every effort is made to maintain accurate information regarding admissions, fee schedules, academic calendars, and school policies, the school management reserves the right to make necessary modifications without prior notice.
          </p>

          <h2 className="text-xl font-bold text-slate-900">3. Intellectual Property</h2>
          <p>
            All logos, photographs, badges, syllabus documents, and digital media displayed on this website are the intellectual property of Gidhaur Central School and may not be reproduced without explicit written consent.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
