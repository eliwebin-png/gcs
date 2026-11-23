import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { Mail, GraduationCap, Briefcase } from "lucide-react";

import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    title: "Faculty Directory & Experienced Educators | Teaching Staff",
    description:
      "Meet our experienced faculty, HODs, postgraduate teachers, and dedicated mentors committed to student excellence.",
    canonical: "/faculty",
  });
}

export default async function FacultyPage() {
  const [schoolInfo, facultyMembers] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.facultyMember.findMany({ orderBy: { order: "asc" } }).catch(() => []),
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
        badge="OUR EDUCATORS"
        title="Distinguished Faculty"
        subtitle="Passionate, experienced mentors empowering students to reach their highest potential."
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Faculty & Staff" }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {facultyMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1.5"
              >
                <div className="relative mb-5">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-32 h-32 rounded-2xl object-cover shadow-md border-2 border-slate-100 group-hover:border-blue-500 transition-colors"
                  />
                  <span className="absolute -bottom-2.5 inset-x-0 mx-auto w-fit px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-sm">
                    {member.department}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h3>

                <p className="text-xs font-semibold text-blue-600 mt-0.5">
                  {member.designation}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 w-full text-left space-y-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    <span className="truncate">{member.qualification}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>Exp: {member.experience}</span>
                  </div>
                  {member.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
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
