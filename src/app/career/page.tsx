import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { Briefcase, Send, CheckCircle2 } from "lucide-react";

import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    title: "Careers & Teaching Job Vacancies | Work With Us",
    description:
      "Explore educator vacancies, PGT/TGT teaching openings, sports coaching jobs, and administrative careers with competitive compensation.",
    canonical: "/career",
  });
}

export default async function CareerPage() {
  const schoolInfo = await prisma.schoolInfo.findFirst().catch(() => null);

  const openPositions = [
    { title: "PGT Mathematics", department: "Senior Secondary", qualification: "M.Sc. Maths + B.Ed.", exp: "3+ Years" },
    { title: "TGT Computer Science & AI", department: "Middle & Secondary", qualification: "B.Tech / MCA + B.Ed.", exp: "2+ Years" },
    { title: "PRT Primary Homeroom Teacher", department: "Primary Wing", qualification: "Graduate + D.El.Ed / B.Ed.", exp: "2+ Years" },
    { title: "Sports Coach (Basketball / Football)", department: "Physical Education", qualification: "B.P.Ed / NIS Certified", exp: "2+ Years" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar
        schoolName={schoolInfo?.schoolName}
        tagline={schoolInfo?.tagline}
        phone={schoolInfo?.phone1}
        email={schoolInfo?.email}
      />

      <PageHeader
        badge="JOIN OUR TEAM"
        title="Careers & Opportunities"
        subtitle="Be a part of an inspiring educator community dedicated to transforming young lives."
        breadcrumbs={[{ label: "Career" }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Current Openings for 2025-26
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              We offer competitive salary packages as per 7th Pay Commission, medical benefits, and professional development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {openPositions.map((pos, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                      {pos.department}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">Full Time</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{pos.title}</h3>
                  <p className="text-xs text-slate-600"><strong>Eligibility:</strong> {pos.qualification}</p>
                  <p className="text-xs text-slate-600"><strong>Experience:</strong> {pos.exp}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Actively Hiring</span>
                  </span>
                  <a
                    href={`mailto:${schoolInfo?.email || "careers@yourpublicschool.edu.in"}?subject=Application for ${pos.title}`}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                  >
                    Apply via Email
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* General Application Callout */}
          <div className="p-8 rounded-3xl bg-blue-50/70 border border-blue-100 text-center space-y-3">
            <h3 className="text-lg font-bold text-slate-900">Don't See Your Role Listed?</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              We are always eager to meet outstanding educators and administrative professionals. Send your resume to{" "}
              <strong className="text-blue-600">{schoolInfo?.email || "careers@yourpublicschool.edu.in"}</strong>.
            </p>
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
