import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import AcademicPrograms from "@/components/home/AcademicPrograms";
import { BookCheck, Compass, Lightbulb, GraduationCap, Briefcase, Mail, ArrowRight } from "lucide-react";

import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    title: "Academics & CBSE Curriculum | Pre-Primary to Senior Secondary",
    description:
      "Explore comprehensive academic programs from Pre-Primary, Primary, Middle, Secondary to Senior Secondary Science, Commerce & Humanities streams.",
    canonical: "/academics",
    keywords: [
      "CBSE Curriculum",
      "Senior Secondary Science Stream",
      "Senior Secondary Commerce",
      "Primary Education",
      "Holistic Learning",
      "STEM Curriculum",
    ],
  });
}

export default async function AcademicsPage() {
  const [schoolInfo, programs, facultyMembers] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.academicProgram.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }).catch(() => []),
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
        badge="CURRICULUM & METHODOLOGY"
        title="Academic Excellence"
        subtitle="Empowering intellectual curiosity, rigorous discipline, and 21st-century problem solving."
        breadcrumbs={[{ label: "Academics" }]}
      />

      <main className="flex-1 py-16 space-y-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Pedagogical Philosophy */}
          <div id="curriculum" className="grid grid-cols-1 md:grid-cols-3 gap-8 scroll-mt-28">
            <div className="p-8 rounded-3xl bg-blue-50/60 border border-blue-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Experiential Learning</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Concepts are internalized through laboratory experiments, robotics projects, model presentations, and interactive problem solving.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-emerald-50/60 border border-emerald-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <BookCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">CBSE Affiliated Rigor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Structured assessments, weekly formative evaluations, and comprehensive mock examinations prepare learners for national board success.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-amber-50/60 border border-amber-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Holistic Enrichment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Integrated coding, public speaking, model united nations, music, and physical education integrated seamlessly into daily timetables.
              </p>
            </div>
          </div>

          {/* Academic Stages Program cards */}
          <div id="classes" className="space-y-12 scroll-mt-28">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-extrabold text-slate-900">
                Programs By Academic Wing
              </h2>
            </div>

            <div className="space-y-8">
              {programs.map((prog, idx) => (
                <div
                  key={prog.id}
                  id={prog.slug}
                  className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-4 rounded-2xl overflow-hidden h-52">
                    <img
                      src={prog.iconImage || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop"}
                      alt={prog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="lg:col-span-8 space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs">
                      {prog.ageGroup}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900">
                      {prog.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {prog.description}
                    </p>
                    
                    {prog.curriculum && (
                      <div className="pt-2">
                        <span className="text-xs font-bold text-slate-800">Curriculum Focus: </span>
                        <span className="text-xs text-slate-600">{prog.curriculum}</span>
                      </div>
                    )}

                    {prog.eligibility && (
                      <div>
                        <span className="text-xs font-bold text-slate-800">Eligibility: </span>
                        <span className="text-xs text-slate-600">{prog.eligibility}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Faculty & Educators Section */}
          <div id="faculty" className="space-y-10 scroll-mt-28">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  ACADEMIC MENTORS
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                  Our Distinguished Faculty
                </h2>
                <p className="text-sm text-slate-600 mt-1 max-w-xl">
                  Dedicated mentors, subject matter experts, and passionate educators bringing the CBSE curriculum to life.
                </p>
              </div>
              <Link
                href="/faculty"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex-shrink-0"
              >
                <span>View Full Faculty Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {facultyMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1"
                >
                  <div className="relative mb-4">
                    <img
                      src={member.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop"}
                      alt={member.name}
                      className="w-28 h-28 rounded-2xl object-cover shadow-md border-2 border-slate-100 group-hover:border-blue-500 transition-colors"
                    />
                    <span className="absolute -bottom-2 inset-x-0 mx-auto w-fit px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-xs">
                      {member.department}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-xs font-semibold text-blue-600 mt-0.5">
                    {member.designation}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 w-full text-left space-y-1.5 text-xs text-slate-500">
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
