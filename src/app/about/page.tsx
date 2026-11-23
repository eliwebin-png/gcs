import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { Eye, Target, HeartHandshake, Award, ShieldCheck, Sparkles, Quote, ArrowRight } from "lucide-react";

import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import { getBreadcrumbJsonLd } from "@/lib/jsonld";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [schoolInfo, aboutSection] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.aboutSection.findFirst().catch(() => null),
  ]);

  return constructMetadata({
    title: "About Our School | Vision, Mission & Values",
    description:
      aboutSection?.description ||
      `Learn about ${schoolInfo?.schoolName || "our school"}, our heritage, vision, mission, and commitment to educational excellence since inception.`,
    canonical: "/about",
  });
}

export default async function AboutPage() {
  const [schoolInfo, aboutSection, principalMsg, directorMsg] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.aboutSection.findFirst().catch(() => null),
    prisma.principalMessage.findFirst().catch(() => null),
    prisma.directorMessage.findFirst().catch(() => null),
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
        badge="ABOUT US"
        title="Nurturing Brilliance Since 1995"
        subtitle="A beacon of transformative education, moral character, and lifelong leadership."
        breadcrumbs={[{ label: "About Us" }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Main Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                OUR HERITAGE & VISION
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                {aboutSection?.title || "Inspiring Excellence. Nurturing Tomorrow's Leaders."}
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {aboutSection?.description || "At Gidhaur Central School, established in 2005 in Gidhaur, Jamui (Bihar), we believe in nurturing young minds with foundational academic excellence, moral integrity, and character building. Guided by our motto 'Duty • Devotion • Discipline', we prepare students for a bright and purposeful future."}
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Established with a vision to provide world-class education rooted in traditional values, we have grown into one of the region's most esteemed institutions. Our faculty of over 150+ educators nurture students with care and modern teaching tools.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100">
              <img
                src={aboutSection?.imageUrl || "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop"}
                alt="School Campus & Students"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Pillars: Vision, Mission, Values */}
          <div id="vision-mission" className="grid grid-cols-1 md:grid-cols-3 gap-8 scroll-mt-28">
            <div className="p-8 rounded-3xl bg-blue-50/70 border border-blue-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {aboutSection?.vision || "To be a leading institution that inspires and empowers students to shape the future."}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-emerald-50/70 border border-emerald-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {aboutSection?.mission || "To provide quality education that fosters creativity, critical thinking and character."}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-amber-50/70 border border-amber-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Core Values</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {aboutSection?.values || "Integrity, Respect, Excellence, Empathy and Responsibility guide everything we do."}
              </p>
            </div>
          </div>

          {/* Leadership Messages: Principal & Director */}
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                LEADERSHIP & VISION
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Messages from Our Leadership
              </h2>
              <p className="text-sm text-slate-600">
                Guiding our students with moral character, modern innovation, and enduring values.
              </p>
            </div>

            {/* Principal's Message Card */}
            <div
              id="principal-message"
              className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start scroll-mt-28"
            >
              <div className="md:col-span-4 text-center space-y-4">
                <div className="relative inline-block">
                  <img
                    src={principalMsg?.photoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop"}
                    alt={principalMsg?.principalName || "Principal"}
                    className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl object-cover shadow-lg mx-auto border-4 border-white"
                  />
                  <div className="absolute -bottom-3 inset-x-0 mx-auto w-fit px-4 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-md">
                    Principal
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-xl font-black text-slate-900">{principalMsg?.principalName || "Dr. Sunita Sharma"}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">{principalMsg?.qualification || "M.Sc., M.Ed., Ph.D. in Educational Leadership"}</p>
                </div>
              </div>

              <div className="md:col-span-8 space-y-5">
                <div className="flex items-center gap-2 text-blue-600">
                  <Quote className="w-7 h-7 opacity-40 rotate-180" />
                  <span className="text-xs font-bold uppercase tracking-wider">Principal&apos;s Message</span>
                </div>

                <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3">
                  <p>
                    {principalMsg?.message || "Welcome to our school! For over three decades, our endeavor has been to kindle the fire of curiosity, build ethical foundations, and foster excellence in every child. We nurture thinkers, innovators, and empathetic human beings who lead the world with confidence and compassion."}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-xs font-bold text-slate-900">Warm Regards,</p>
                    <p className="text-sm font-black text-blue-600 mt-0.5">{principalMsg?.principalName || "Dr. Sunita Sharma"}</p>
                    <p className="text-[11px] text-slate-500">Principal, {schoolInfo?.schoolName || "Gidhaur Central School"}</p>
                  </div>
                  <Link
                    href="/principal-message"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    <span>Read Full Message</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Director's Message Card */}
            <div
              id="management"
              className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start scroll-mt-28"
            >
              <div className="md:col-span-4 text-center space-y-4">
                <div className="relative inline-block">
                  <img
                    src={directorMsg?.photoUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop"}
                    alt={directorMsg?.directorName || "Director"}
                    className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl object-cover shadow-lg mx-auto border-4 border-white"
                  />
                  <div className="absolute -bottom-3 inset-x-0 mx-auto w-fit px-4 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-md">
                    Managing Director
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-xl font-black text-slate-900">{directorMsg?.directorName || "Shri Rajesh V. Verma"}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">{directorMsg?.designation || "Managing Director & Trustee"}</p>
                </div>
              </div>

              <div className="md:col-span-8 space-y-5">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Quote className="w-7 h-7 opacity-40 rotate-180" />
                  <span className="text-xs font-bold uppercase tracking-wider">Director&apos;s Message</span>
                </div>

                <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3">
                  <p>
                    {directorMsg?.message || "Education is not merely about accumulating degrees; it is the harmonious training of head, heart, and hands. Our vision is to provide 21st-century infrastructure while keeping timeless human values at the core of learning."}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-xs font-bold text-slate-900">Sincerely,</p>
                    <p className="text-sm font-black text-emerald-600 mt-0.5">{directorMsg?.directorName || "Shri Rajesh V. Verma"}</p>
                    <p className="text-[11px] text-slate-500">Managing Director & Trustee</p>
                  </div>
                  <Link
                    href="/director-message"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                  >
                    <span>Read Full Vision</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Affiliation & Board Badge Strip */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                OFFICIAL AFFILIATION
              </span>
              <h3 className="text-2xl font-bold mt-1">
                {schoolInfo?.affiliationBoard || "CBSE Affiliated Institution"}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Affiliation Number: {schoolInfo?.affiliationNo || "CBSE/AFF/2024/983421"} | School Code: {schoolInfo?.schoolCode || "84920"}
              </p>
            </div>
            <a
              href="/mandatory-disclosure"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex-shrink-0"
            >
              View Mandatory Disclosure
            </a>
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
