import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";

import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy | Data Protection & Student Safety",
  description: "Learn how we handle, protect, and process student and parent personal information under statutory privacy guidelines.",
  canonical: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <PageHeader
        badge="LEGAL INFORMATION"
        title="Privacy Policy"
        subtitle="How we collect, protect, and handle data for students, parents, and visitors."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate text-sm sm:text-base leading-relaxed space-y-6 text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">1. Information Collection</h2>
          <p>
            We collect personal identification information from parents, guardians, and prospective students through online inquiry forms, admission registrations, newsletter subscriptions, and feedback surveys. This includes names, email addresses, phone numbers, student grades, and academic histories.
          </p>

          <h2 className="text-xl font-bold text-slate-900">2. Use of Information</h2>
          <p>
            The collected information is utilized strictly to process admission inquiries, provide academic updates, circulate official circulars, and improve student welfare and campus safety. We do not sell or lease personal data to any third-party marketing entities.
          </p>

          <h2 className="text-xl font-bold text-slate-900">3. Data Security & Storage</h2>
          <p>
            We employ modern encryption protocols, secure SSL transmission, and strict access controls to safeguard your data from unauthorized access or disclosure.
          </p>

          <h2 className="text-xl font-bold text-slate-900">4. Contacting the Data Protection Officer</h2>
          <p>
            If you have questions regarding our privacy practices or wish to review data submitted to our portal, please email <strong>privacy@yourpublicschool.edu.in</strong>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
