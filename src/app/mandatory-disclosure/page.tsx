import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { FileCheck, Download } from "lucide-react";

import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    title: "CBSE Mandatory Public Disclosure | Affiliation & Statutory Compliance",
    description:
      "Statutory public disclosure under CBSE guidelines including society registration, fire safety certificate, building safety, and water testing reports.",
    canonical: "/mandatory-disclosure",
  });
}

export default async function MandatoryDisclosurePage() {
  const [schoolInfo, disclosures] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.mandatoryDisclosure.findMany().catch(() => []),
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
        badge="REGULATORY COMPLIANCE"
        title="Mandatory Public Disclosure"
        subtitle="In accordance with the Central Board of Secondary Education (CBSE) circulars and statutory guidelines."
        breadcrumbs={[{ label: "Mandatory Disclosure" }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* General School Meta */}
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <span className="text-xs text-amber-400 font-bold uppercase">Affiliation Number</span>
              <p className="text-lg font-bold mt-0.5">{schoolInfo?.affiliationNo || "CBSE/AFF/2024/983421"}</p>
            </div>
            <div>
              <span className="text-xs text-amber-400 font-bold uppercase">School Code</span>
              <p className="text-lg font-bold mt-0.5">{schoolInfo?.schoolCode || "84920"}</p>
            </div>
            <div>
              <span className="text-xs text-amber-400 font-bold uppercase">Principal Name</span>
              <p className="text-lg font-bold mt-0.5">{schoolInfo?.principalName || "Dr. Sunita Sharma"}</p>
            </div>
          </div>

          {/* Table of Disclosures */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                Copies of Certificates & Statutory Information
              </h3>
            </div>

            <div className="divide-y divide-slate-100">
              {disclosures.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      {item.documentNo && (
                        <p className="text-xs text-slate-500 font-mono mt-0.5">Doc No: {item.documentNo}</p>
                      )}
                    </div>
                  </div>

                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold transition-colors self-start sm:self-center flex-shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>View / Download</span>
                  </a>
                </div>
              ))}
            </div>
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
