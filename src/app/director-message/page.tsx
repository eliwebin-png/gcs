import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { Quote } from "lucide-react";

import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [schoolInfo, dir] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.directorMessage.findFirst().catch(() => null),
  ]);

  return constructMetadata({
    title: `Director's Vision | ${dir?.directorName || "Managing Director"}`,
    description:
      dir?.message?.substring(0, 160) ||
      `Read the vision for excellence from Managing Director ${dir?.directorName || "Shri Rajesh V. Verma"}.`,
    canonical: "/director-message",
  });
}

export default async function DirectorMessagePage() {
  const [schoolInfo, dir] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
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
        badge="MANAGEMENT"
        title="Director's Message"
        subtitle="Creating progressive educational ecosystems that empower the next generation."
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Director Message" }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            {/* Director Photo & Details */}
            <div className="md:col-span-4 text-center space-y-4">
              <div className="relative inline-block">
                <img
                  src={dir?.photoUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop"}
                  alt={dir?.directorName || "Director"}
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl object-cover shadow-lg mx-auto border-4 border-white"
                />
                <div className="absolute -bottom-3 inset-x-0 mx-auto w-fit px-4 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-md">
                  Managing Director
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-xl font-black text-slate-900">{dir?.directorName || "Shri Rajesh V. Verma"}</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">{dir?.designation || "Managing Director & Trustee"}</p>
              </div>
            </div>

            {/* Director Message Text */}
            <div className="md:col-span-8 space-y-6">
              <div className="flex items-center gap-2 text-emerald-600">
                <Quote className="w-8 h-8 opacity-40 rotate-180" />
                <span className="text-sm font-bold uppercase tracking-wider">Vision for Excellence</span>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed space-y-4">
                <p>
                  {dir?.message || "Education is not merely about accumulating degrees; it is the harmonious training of head, heart, and hands. Our vision is to provide 21st-century infrastructure while keeping timeless human values at the core of learning."}
                </p>
                <p>
                  Since the inception of our institution, our management board has invested relentlessly in cutting-edge robotics labs, international-standard sports fields, digital libraries, and teacher training programs.
                </p>
                <p>
                  We are deeply grateful to our parent community for their unswerving trust and collaboration as we guide each child on a transformative path towards a luminous future.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <p className="text-sm font-bold text-slate-900">Sincerely,</p>
                <p className="text-base font-black text-emerald-600 mt-0.5">{dir?.directorName || "Shri Rajesh V. Verma"}</p>
                <p className="text-xs text-slate-500">Managing Director & Trustee</p>
              </div>
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
