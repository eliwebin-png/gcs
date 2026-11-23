import React from "react";
import prisma from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import {
  Award,
  Trophy,
  Flame,
  Medal,
  Star,
  GraduationCap,
  Sparkles,
  Quote,
} from "lucide-react";

import { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    title: "Achievements & Hall of Fame | Board Toppers, Olympiads & Accolades",
    description:
      "Celebrate our student toppers in CBSE Board exams, National Science & Math Olympiads, and athletic state championships.",
    canonical: "/achievements",
    keywords: [
      "School Toppers",
      "CBSE Board Result 100%",
      "Olympiad Gold Medalists",
      "Student Achievements",
      "Hall of Fame",
    ],
  });
}

export default async function AchievementsPage() {
  const [schoolInfo, achievements, testimonials] = await Promise.all([
    prisma.schoolInfo.findFirst().catch(() => null),
    prisma.achievement.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }).catch(() => []),
  ]);

  const getAchIcon = (name?: string) => {
    switch (name?.toLowerCase()) {
      case "award":
        return Award;
      case "trophy":
        return Trophy;
      case "flame":
        return Flame;
      case "medal":
        return Medal;
      default:
        return Award;
    }
  };

  // High-Achiever Board & Olympiad Students List
  const defaultBoardToppers = [
    {
      id: "t1",
      name: "Rohan Mehta",
      grade: "Class XII (Science)",
      score: "98.8%",
      rank: "School Topper & District Rank 1",
      photoUrl:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop",
      tag: "CBSE XII 2024",
    },
    {
      id: "t2",
      name: "Ananya Gupta",
      grade: "Class X (Board)",
      score: "99.2%",
      rank: "State Rank 3 • 100/100 in Maths",
      photoUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
      tag: "CBSE X 2024",
    },
    {
      id: "t3",
      name: "Arjun Patel",
      grade: "Class XII (Commerce)",
      score: "97.6%",
      rank: "District Rank 2 • 100 in Economics",
      photoUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
      tag: "CBSE XII 2024",
    },
    {
      id: "t4",
      name: "Sanya Kapoor",
      grade: "Class XII (Humanities)",
      score: "98.2%",
      rank: "Stream Topper • 100 in Psychology",
      photoUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
      tag: "CBSE XII 2024",
    },
    {
      id: "t5",
      name: "Devansh Singh",
      grade: "Class X (Board)",
      score: "98.4%",
      rank: "Gold Medalist in Science Olympiad",
      photoUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
      tag: "CBSE X 2024",
    },
    {
      id: "t6",
      name: "Ishita Rao",
      grade: "Class XII (Science)",
      score: "97.8%",
      rank: "National Cyber Olympiad Silver",
      photoUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
      tag: "CBSE XII 2024",
    },
  ];

  // Dynamic DB Toppers
  const customDbToppers = achievements
    .filter(
      (a) =>
        a.category === "Board Toppers" ||
        a.studentName ||
        (a.description && a.description.startsWith("PHOTO:"))
    )
    .map((a) => ({
      id: a.id,
      name: a.title,
      grade: a.subtitle,
      score: a.year || "98.8%",
      rank: a.iconName || "School Topper",
      photoUrl:
        a.description && a.description.startsWith("PHOTO:")
          ? a.description.replace("PHOTO:", "")
          : "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop",
      tag: a.category === "Board Toppers" ? "CBSE Topper" : a.category,
    }));

  const boardToppers =
    customDbToppers.length > 0 ? customDbToppers : defaultBoardToppers;

  // Default student voices if testimonials empty
  const defaultStudentVoices = [
    {
      id: "s1",
      name: "Rohan Mehta",
      role: "Grade 10 Student",
      message:
        "Our school has given me the confidence to explore my talents and achieve my goals. The teachers and science labs are truly world-class!",
      avatarUrl:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop",
      rating: 5,
    },
    {
      id: "s2",
      name: "Ananya Gupta",
      role: "Grade 8 Student",
      message:
        "I love the robotics and arts clubs here. I've made wonderful friends and learned so many new skills that prepare us for competitions.",
      avatarUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
      rating: 5,
    },
    {
      id: "s3",
      name: "Arjun Patel",
      role: "Grade 12 Student",
      message:
        "The guidance for competitive exams alongside the CBSE curriculum helped me secure a top rank in national entrance examinations.",
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
      rating: 5,
    },
    {
      id: "s4",
      name: "Pooja Deshmukh",
      role: "Grade 11 Student",
      message:
        "The sports facilities and basketball coaching are fantastic. We won the Inter-School state tournament with tremendous faculty support.",
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
      rating: 5,
    },
  ];

  const studentReviews =
    testimonials && testimonials.length > 0 ? testimonials : defaultStudentVoices;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar
        schoolName={schoolInfo?.schoolName}
        tagline={schoolInfo?.tagline}
        phone={schoolInfo?.phone1}
        email={schoolInfo?.email}
      />

      <PageHeader
        badge="HONOURS, TOPPERS & AWARDS"
        title="Student Achievements & Hall of Fame"
        subtitle="Celebrating outstanding student toppers, Olympiad medalists, sports champions, and community voices."
        breadcrumbs={[{ label: "Achievements" }]}
      />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* ================= SECTION 1: STAR STUDENT TOPPERS (STUDENT CARDS) ================= */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                ⭐ Academic Excellence
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                Board Toppers & Star Students
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Meet our high achievers who have brought great pride and accolades in CBSE Board examinations and national competitions.
              </p>
            </div>

            {/* Grid of Student Toppers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {boardToppers.map((student) => (
                <div
                  key={student.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-4 relative overflow-hidden group"
                >
                  {/* Top corner score badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500 text-white font-black text-xs shadow-md shadow-emerald-500/30">
                    {student.score}
                  </div>

                  {/* Student Portrait */}
                  <div className="w-20 h-24 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 flex-shrink-0 shadow-sm">
                    <img
                      src={student.photoUrl}
                      alt={student.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 pr-10">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                      {student.tag}
                    </span>
                    <h3 className="text-base font-black text-slate-900 truncate mt-0.5">
                      {student.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500">{student.grade}</p>
                    <p className="text-[11px] font-bold text-amber-600 mt-1 line-clamp-1 flex items-center gap-1">
                      <Medal className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{student.rank}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= SECTION 2: INSTITUTIONAL AWARDS ================= */}
          <div className="space-y-8 pt-8 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                🏆 School Honors
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                Major Institutional Milestones
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Consistent excellence across academics, sports tournaments, and extracurricular development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((ach) => {
                const IconComp = getAchIcon(ach.iconName);
                return (
                  <div
                    key={ach.id}
                    className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                  >
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center p-3 mb-5 border border-blue-100 group-hover:scale-110 transition-transform">
                        <IconComp className="w-7 h-7" />
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        {ach.category} {ach.year ? `• ${ach.year}` : ""}
                      </span>

                      <h3 className="text-lg font-bold text-slate-900 mt-3 group-hover:text-blue-600 transition-colors">
                        {ach.title}
                      </h3>

                      <p className="text-xs font-semibold text-slate-700 mt-1">
                        {ach.subtitle}
                      </p>

                      {ach.description && (
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                          {ach.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 mt-6 border-t border-slate-100 flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span className="text-[11px] font-bold text-slate-700">Official Honor</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= SECTION 3: ALL STUDENT VOICES & TESTIMONIALS ================= */}
          <div className="space-y-8 pt-8 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                💬 Student Community
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                What Our Students & Parents Say
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Real experiences, testimonials, and growth journeys from our student community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studentReviews.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 italic leading-relaxed">
                      "{item.message}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <img
                      src={
                        item.avatarUrl ||
                        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop"
                      }
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                      <p className="text-[10px] text-emerald-600 font-semibold">{item.role}</p>
                    </div>
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
        whatsappNumber={schoolInfo?.whatsappNumber}
      />
    </div>
  );
}
