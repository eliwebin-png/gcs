"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Award,
  Trophy,
  Flame,
  Medal,
  ArrowRight,
  Star,
  Calendar,
} from "lucide-react";

interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  iconName?: string;
  iconColor?: string;
}

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  avatarUrl?: string | null;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  thumbnail: string;
  publishDate: Date | string;
  slug: string;
}

interface TriSectionProps {
  achievements?: AchievementItem[];
  testimonials?: TestimonialItem[];
  newsList?: NewsItem[];
}

export default function TriSection({
  achievements,
  testimonials,
  newsList,
}: TriSectionProps) {
  // Testimonials Carousel State
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const defaultAchievements: AchievementItem[] = [
    {
      id: "1",
      title: "100% Board Result",
      subtitle: "Consistent excellent results for the past many years.",
      iconName: "Award",
      iconColor: "emerald",
    },
    {
      id: "2",
      title: "National Level Competitions",
      subtitle: "Winners in various national level competitions.",
      iconName: "Trophy",
      iconColor: "teal",
    },
    {
      id: "3",
      title: "Sports Championships",
      subtitle: "Multiple titles in district, state and national events.",
      iconName: "Flame",
      iconColor: "amber",
    },
    {
      id: "4",
      title: "Olympiad Winners",
      subtitle: "Outstanding performance in Science, Maths & More.",
      iconName: "Medal",
      iconColor: "rose",
    },
  ];

  const defaultTestimonials: TestimonialItem[] = [
    {
      id: "1",
      name: "Mrs. Neha Sharma",
      role: "Parent",
      message: "The school provides the perfect balance of academics and activities. My child has grown more confident and independent.",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: "2",
      name: "Arjun Verma",
      role: "Grade VIII Student",
      message: "Teachers are very supportive and friendly. I love the learning environment here.",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: "3",
      name: "Mr. Rajiv Malhotra",
      role: "Parent",
      message: "Best school with excellent facilities and caring staff. Highly recommended!",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
  ];

  const defaultNews: NewsItem[] = [
    {
      id: "1",
      title: "Admissions Open 2025-26",
      summary: "Secure your child's bright future.",
      thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=300&auto=format&fit=crop",
      publishDate: "May 15, 2025",
      slug: "admissions-open-2025-26",
    },
    {
      id: "2",
      title: "Annual Function 2025",
      summary: "A grand celebration of talent.",
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop",
      publishDate: "May 10, 2025",
      slug: "annual-function-2025",
    },
    {
      id: "3",
      title: "SCIENCE FAIR",
      summary: "Innovation and creativity on display.",
      thumbnail: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=300&auto=format&fit=crop",
      publishDate: "Apr 28, 2025",
      slug: "science-fair-2025",
    },
    {
      id: "4",
      title: "Inter-School Sports Meet",
      summary: "Excellence in sports continues.",
      thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=300&auto=format&fit=crop",
      publishDate: "Apr 20, 2025",
      slug: "inter-school-sports-meet",
    },
  ];

  const achList = achievements && achievements.length > 0 ? achievements : defaultAchievements;
  const testList = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;
  const nwList = newsList && newsList.length > 0 ? newsList : defaultNews;

  // Auto rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testList.length]);

  const activeReview = testList[currentTestimonialIndex];

  const getAchIcon = (name?: string) => {
    switch (name?.toLowerCase()) {
      case "award": return Award;
      case "trophy": return Trophy;
      case "flame": return Flame;
      case "medal": return Medal;
      default: return Award;
    }
  };

  const getAchColor = (color?: string) => {
    switch (color?.toLowerCase()) {
      case "emerald": return "bg-emerald-100 text-emerald-600";
      case "teal": return "bg-teal-100 text-teal-600";
      case "amber": return "bg-amber-100 text-amber-600";
      case "rose": return "bg-rose-100 text-rose-600";
      default: return "bg-blue-100 text-blue-600";
    }
  };

  return (
    <section className="py-20 bg-slate-50/70 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* ================= COLUMN 1: OUR ACHIEVEMENTS ================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  OUR ACHIEVEMENTS
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Excellence in Action
                </h3>
              </div>

              <div className="space-y-4">
                {achList.slice(0, 4).map((ach) => {
                  const IconComp = getAchIcon(ach.iconName);
                  const colorClass = getAchColor(ach.iconColor);
                  return (
                    <div key={ach.id} className="flex items-start gap-3.5 group">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {ach.title}
                        </h4>
                        <p className="text-xs text-slate-500 leading-tight mt-0.5">
                          {ach.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                href="/achievements"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide shadow-md transition-all"
              >
                <span>View All Achievements</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* ================= COLUMN 2: WHAT PARENTS & STUDENTS SAY ================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  WHAT PARENTS & STUDENTS SAY
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Voices of Our Community
                </h3>
              </div>

              {/* Review Card */}
              {activeReview && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(activeReview.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Message Quote */}
                  <p className="text-slate-600 text-sm italic leading-relaxed min-h-[90px]">
                    "{activeReview.message}"
                  </p>

                  {/* Author Meta */}
                  <div className="flex items-center gap-3 pt-2">
                    {activeReview.avatarUrl ? (
                      <img
                        src={activeReview.avatarUrl}
                        alt={activeReview.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-slate-100"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center">
                        {activeReview.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h5 className="text-sm font-bold text-slate-900">{activeReview.name}</h5>
                      <p className="text-xs text-slate-500">{activeReview.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination Dots */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-center gap-2">
              {testList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonialIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentTestimonialIndex === idx
                      ? "w-7 bg-blue-600"
                      : "bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ================= COLUMN 3: LATEST NEWS & EVENTS ================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  LATEST NEWS & EVENTS
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Campus Updates
                </h3>
              </div>

              <div className="space-y-3.5">
                {nwList.slice(0, 4).map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className="flex items-center gap-3 group p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <img
                      src={item.thumbnail || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=300&auto=format&fit=crop"}
                      alt={item.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=300&auto=format&fit=crop";
                      }}
                      className="w-14 h-12 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        {item.summary}
                      </p>
                      <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-blue-500" />
                        {typeof item.publishDate === "string"
                          ? item.publishDate
                          : new Date(item.publishDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide shadow-md transition-all"
              >
                <span>View All News</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
