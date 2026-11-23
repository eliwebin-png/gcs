import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { Calendar, Clock, MapPin } from "lucide-react";

import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    title: "School Events Calendar & Activities | Sports, Cultural & Science Meets",
    description:
      "Explore upcoming school events, annual day celebrations, science exhibitions, sports meets, and inter-school competitions.",
    canonical: "/events",
  });
}

export default async function EventsPage() {
  const [schoolInfo, events] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.event.findMany({ orderBy: { eventDate: "asc" } }).catch(() => []),
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
        badge="CAMPUS LIFE"
        title="Upcoming & Past Events"
        subtitle="Experience sports meets, cultural fests, science olympiads, and annual celebrations."
        breadcrumbs={[{ label: "Events" }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={ev.thumbnail}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm text-white text-[11px] font-bold shadow-md">
                      {ev.status}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {ev.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-2 border-t border-slate-50 text-xs text-slate-500">
                  <div className="flex items-center gap-2 pt-3">
                    <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span>{new Date(ev.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
                    <span className="truncate">{ev.location}</span>
                  </div>
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
