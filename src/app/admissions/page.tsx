import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import AdmissionForm from "@/components/admissions/AdmissionForm";
import AdmissionProcess from "@/components/home/AdmissionProcess";
import { FileText, HelpCircle } from "lucide-react";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const schoolInfo = await prisma.schoolInfo.findFirst().catch(() => null);
  return constructMetadata({
    title: "Admissions Open 2025-26 | Eligibility, Fee Structure & Registration",
    description: `Admissions open from Nursery to Grade XI at ${schoolInfo?.schoolName || "Greenfield International School"}. Explore admission criteria, documentation checklist, and online application.`,
    canonical: "/admissions",
    keywords: [
      "School Admissions 2025-26",
      "CBSE Admission Process",
      "Nursery Admissions",
      "Class XI Admission",
      "School Registration Form",
      "Fee Structure",
    ],
  });
}

export default async function AdmissionsPage() {
  const schoolInfo = await prisma.schoolInfo.findFirst().catch(() => null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar
        schoolName={schoolInfo?.schoolName}
        tagline={schoolInfo?.tagline}
        phone={schoolInfo?.phone1}
        email={schoolInfo?.email}
      />

      <PageHeader
        badge="JOIN OUR FAMILY"
        title="Admissions 2026 - 2027"
        subtitle="Embark on an enriching educational voyage. Registrations now open from Pre-Primary through Grade XI."
        breadcrumbs={[{ label: "Admissions" }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* Form & Criteria Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Admission Application Form */}
            <div className="lg:col-span-7">
              <AdmissionForm />
            </div>

            {/* Right Column: Required Documents & Important Notes */}
            <div className="lg:col-span-5 space-y-6">

              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  CHECKLIST
                </span>
                <h2 className="text-xl font-bold">Required Documents for Verification</h2>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Birth Certificate issued by Municipal Corporation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Previous 2 years academic report cards (for Grade II & above)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Original Transfer Certificate (TC) countersigned</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Passport sized photographs of student and parents (4 each)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Proof of Residential Address (Aadhar, Passport, Utility bill)</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/80 border border-blue-100 space-y-3">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                  <HelpCircle className="w-5 h-5" />
                  <span>Need Admissions Assistance?</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our admissions counselors are available Monday to Saturday between 8:00 AM and 4:00 PM for one-on-one campus tours and curriculum guidance.
                </p>
                <div className="pt-2 text-xs font-bold text-slate-900">
                  Call Admissions Desk: {schoolInfo?.phone1 || "+91 98765 43210"}
                </div>
              </div>

            </div>

          </div>

          {/* Admission Process Component */}
          <AdmissionProcess />

        </div>
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
