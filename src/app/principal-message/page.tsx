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
  const [schoolInfo, msg] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.principalMessage.findFirst().catch(() => null),
  ]);

  return constructMetadata({
    title: `Principal's Message | ${msg?.principalName || "Dr. Sunita Sharma"}`,
    description:
      msg?.message?.substring(0, 160) ||
      `Read the inspirational message from Principal ${msg?.principalName || "Dr. Sunita Sharma"} on fostering holistic academic excellence and moral character.`,
    canonical: "/principal-message",
  });
}

export default async function PrincipalMessagePage() {
  const [schoolInfo, msg] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.principalMessage.findFirst().catch(() => null),
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
        badge="LEADERSHIP"
        title="Principal's Message"
        subtitle="Guiding students with visionary leadership, academic rigor, and compassionate care."
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Principal Message" }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            {/* Principal Photo & Details */}
            <div className="md:col-span-4 text-center space-y-4">
              <div className="relative inline-block">
                <img
                  src={msg?.photoUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop"}
                  alt={msg?.principalName || "Principal"}
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl object-cover shadow-lg mx-auto border-4 border-white"
                />
                <div className="absolute -bottom-3 inset-x-0 mx-auto w-fit px-4 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-md">
                  Principal
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-xl font-black text-slate-900">{msg?.principalName || "Dr. Sunita Sharma"}</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">{msg?.qualification || "M.Sc., M.Ed., Ph.D. in Educational Leadership"}</p>
              </div>
            </div>

            {/* Principal Message Text */}
            <div className="md:col-span-8 space-y-6">
              <div className="flex items-center gap-2 text-blue-600">
                <Quote className="w-8 h-8 opacity-40 rotate-180" />
                <span className="text-sm font-bold uppercase tracking-wider">Words of Wisdom</span>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 text-base sm:text-lg leading-relaxed space-y-4">
                <p>
                  {msg?.message || "Welcome to Your Public School! For over three decades, our endeavor has been to kindle the fire of curiosity, build ethical foundations, and foster excellence in every child. We nurture thinkers, innovators, and empathetic human beings who lead the world with confidence and compassion."}
                </p>
                <p>
                  In a rapidly evolving global landscape, education must transcend conventional rote memorization. We empower our learners with computational thinking, experiential science experiments, eloquent communication skills, and emotional resilience.
                </p>
                <p>
                  Our dedicated teachers work closely with parents to understand every child's distinctive inclinations, ensuring an environment where talent is celebrated and curiosity is ignited.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <p className="text-sm font-bold text-slate-900">Warm Regards,</p>
                <p className="text-base font-black text-blue-600 mt-0.5">{msg?.principalName || "Dr. Sunita Sharma"}</p>
                <p className="text-xs text-slate-500">Principal, Your Public School</p>
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
