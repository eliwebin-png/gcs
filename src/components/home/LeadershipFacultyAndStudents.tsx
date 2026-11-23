"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Quote, Award, Sparkles, ChevronRight } from "lucide-react";

// Inline brand icon SVGs
function FacebookMini() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedinMini() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function TwitterMini() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface FacultyItem {
  id: string;
  name: string;
  designation: string;
  department: string;
  photoUrl: string;
  email?: string | null;
}

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  message: string;
  avatarUrl?: string | null;
  rating?: number;
}

interface LeadershipFacultyAndStudentsProps {
  principalMessage?: {
    name?: string;
    designation?: string;
    photoUrl?: string;
    message?: string;
  } | null;
  directorMessage?: {
    name?: string;
    designation?: string;
    photoUrl?: string;
    message?: string;
  } | null;
  facultyMembers?: FacultyItem[];
  studentTestimonials?: TestimonialItem[];
}

export default function LeadershipFacultyAndStudents({
  principalMessage,
  directorMessage,
  facultyMembers = [],
  studentTestimonials = [],
}: LeadershipFacultyAndStudentsProps) {
  // Built-in Default Leadership Messages
  const principal = principalMessage || {
    name: "Dr. Rajesh Kumar",
    designation: "Principal",
    photoUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    message:
      "Welcome to our school. We believe education is not merely the acquisition of facts, but the training of the mind to think innovatively and compassionately.",
  };

  const director = directorMessage || {
    name: "Mr. Suresh Agarwal",
    designation: "Managing Director",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    message:
      "Our mission is to establish world-class infrastructure and pedagogical excellence to prepare our students to lead the global society.",
  };

  // Built-in Default Faculty (Matching the 4 cards in user's image)
  const defaultFaculty: FacultyItem[] = [
    {
      id: "1",
      name: "Dr. Rajesh Kumar",
      designation: "Principal",
      department: "Administration",
      photoUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "2",
      name: "Ms. Priya Sharma",
      designation: "Vice Principal",
      department: "Academics",
      photoUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "3",
      name: "Mr. Amit Verma",
      designation: "Science Head",
      department: "Physics",
      photoUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "4",
      name: "Ms. Neha Singh",
      designation: "English Head",
      department: "Languages",
      photoUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    },
  ];

  const facultyList = facultyMembers.length > 0 ? facultyMembers.slice(0, 4) : defaultFaculty;

  // Built-in Default Students (Matching the 3 student cards in user's image)
  const defaultStudents: TestimonialItem[] = [
    {
      id: "s1",
      name: "Rohan Mehta",
      role: "Grade 10",
      message:
        "Greenfield has given me the confidence to explore my talents and achieve my goals. The teachers are amazing!",
      avatarUrl:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "s2",
      name: "Ananya Gupta",
      role: "Grade 8",
      message:
        "I love the activities and clubs here. I've made great friends and learned so many new things.",
      avatarUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "s3",
      name: "Arjun Patel",
      role: "Grade 12",
      message:
        "The school provides excellent facilities and opportunities for overall development.",
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
    },
  ];

  const studentList = studentTestimonials.length > 0 ? studentTestimonials : defaultStudents;

  // Student Slider Active Index
  const [studentIndex, setStudentIndex] = useState(0);

  // Auto slide student reviews every 5s
  useEffect(() => {
    if (studentList.length <= 3) return;
    const interval = setInterval(() => {
      setStudentIndex((prev) => (prev + 1) % studentList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [studentList.length]);

  return (
    <section className="py-16 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ================= SECTION 1 & 2: TOP ROW (LEADERSHIP & FACULTY) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Top Left: Leadership Messages (Principal & Director) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Leadership Desk
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Messages from Leaders
                </h3>
              </div>
              <Link
                href="/principal-message"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
              >
                <span>Read More</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Principal Card */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition-all flex gap-4 items-start">
              <div className="w-20 h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                <img
                  src={principal.photoUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"}
                  alt={principal.name || "Principal"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{principal.name}</h4>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {principal.designation}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-3 italic leading-relaxed">
                  "{principal.message}"
                </p>
                <Link
                  href="/principal-message"
                  className="text-[11px] font-bold text-blue-600 hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>Principal's Full Note</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Director Card */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition-all flex gap-4 items-start">
              <div className="w-20 h-24 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                <img
                  src={director.photoUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"}
                  alt={director.name || "Director"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{director.name}</h4>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {director.designation}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-3 italic leading-relaxed">
                  "{director.message}"
                </p>
                <Link
                  href="/director-message"
                  className="text-[11px] font-bold text-blue-600 hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>Director's Vision</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Top Right: Our Faculty (4 Cards Grid) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Educators & Mentors
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Our Faculty
                </h3>
              </div>
              <Link
                href="/faculty"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 4 Faculty Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {facultyList.map((f) => (
                <div
                  key={f.id}
                  className="bg-white rounded-3xl p-3.5 border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
                >
                  {/* Portrait photo */}
                  <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 relative">
                    <img
                      src={f.photoUrl}
                      alt={f.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop";
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Name & Designation */}
                  <div className="mt-3 w-full">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {f.name}
                    </h4>
                    <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
                      {f.designation}
                    </p>
                  </div>

                  {/* Social links */}
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100 w-full justify-center text-blue-500">
                    <span className="w-6 h-6 rounded-full bg-blue-50 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                      <FacebookMini />
                    </span>
                    <span className="w-6 h-6 rounded-full bg-blue-50 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                      <LinkedinMini />
                    </span>
                    <span className="w-6 h-6 rounded-full bg-blue-50 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer">
                      <TwitterMini />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ================= SECTION 3: BOTTOM ROW (WHAT OUR STUDENTS SAY) ================= */}
        <div className="space-y-6 pt-4 border-t border-slate-200/70">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                Student Voices
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                What Our Students Say
              </h3>
            </div>
            <Link
              href="/achievements"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
            >
              <span>Student Accolades</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3 Student Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studentList.slice(0, 3).map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-4 relative overflow-hidden group"
              >
                {/* Green accent bottom border */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Student Avatar */}
                <div className="w-20 h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 shadow-sm">
                  <img
                    src={
                      s.avatarUrl ||
                      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop"
                    }
                    alt={s.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Quote details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-full space-y-2">
                  <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-3">
                    "{s.message}"
                  </p>
                  <div>
                    <h5 className="text-sm font-bold text-emerald-600 truncate">
                      {s.name}
                    </h5>
                    <p className="text-[11px] text-slate-500 font-medium">{s.role}</p>
                  </div>
                </div>

                {/* Big Quote Watermark */}
                <Quote className="w-8 h-8 text-slate-200/80 absolute top-4 right-4 group-hover:text-emerald-200/60 transition-colors" />
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            <span className="w-6 h-2 rounded-full bg-emerald-500" />
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span className="w-2 h-2 rounded-full bg-slate-300" />
          </div>
        </div>

      </div>
    </section>
  );
}
