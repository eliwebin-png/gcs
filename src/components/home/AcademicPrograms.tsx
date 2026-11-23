"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, Compass, Award, GraduationCap } from "lucide-react";

interface ProgramItem {
  id: string;
  title: string;
  ageGroup: string;
  description: string;
  slug: string;
  iconImage?: string;
}

interface AcademicProgramsProps {
  programs?: ProgramItem[];
}

export default function AcademicPrograms({ programs }: AcademicProgramsProps) {
  const defaultPrograms = [
    {
      id: "1",
      title: "Pre Primary",
      ageGroup: "Age 2.5 - 5 Years",
      description: "Fun-filled learning with care and individual attention.",
      slug: "pre-primary",
      icon: Sparkles,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      id: "2",
      title: "Primary",
      ageGroup: "Grade I - V",
      description: "Building strong foundations in academics & values.",
      slug: "primary",
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      id: "3",
      title: "Middle School",
      ageGroup: "Grade VI - VIII",
      description: "Encouraging curiosity, creativity and critical thinking.",
      slug: "middle-school",
      icon: Compass,
      color: "bg-teal-50 text-teal-600 border-teal-100",
    },
    {
      id: "4",
      title: "Secondary",
      ageGroup: "Grade IX - X",
      description: "Preparing students for board exams and future challenges.",
      slug: "secondary",
      icon: Award,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    {
      id: "5",
      title: "Senior Secondary",
      ageGroup: "Grade XI - XII",
      description: "Stream based education to shape successful careers.",
      slug: "senior-secondary",
      icon: GraduationCap,
      color: "bg-rose-50 text-rose-600 border-rose-100",
    },
  ];

  const getFallbackIcon = (idx: number) => {
    const icons = [Sparkles, BookOpen, Compass, Award, GraduationCap];
    return icons[idx % icons.length];
  };

  const getFallbackColor = (idx: number) => {
    const colors = [
      "bg-amber-50 text-amber-600 border-amber-100",
      "bg-blue-50 text-blue-600 border-blue-100",
      "bg-teal-50 text-teal-600 border-teal-100",
      "bg-indigo-50 text-indigo-600 border-indigo-100",
      "bg-rose-50 text-rose-600 border-rose-100",
    ];
    return colors[idx % colors.length];
  };

  const displayList = programs && programs.length > 0
    ? programs.map((p, idx) => ({
        ...p,
        icon: getFallbackIcon(idx),
        color: getFallbackColor(idx),
      }))
    : defaultPrograms;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs tracking-wider uppercase mb-2">
            ACADEMIC PROGRAMS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Nurturing Every Stage of Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {displayList.map((prog, idx) => {
            const IconComp = prog.icon;
            return (
              <div
                key={prog.id || idx}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div>
                  {/* Icon illustration container */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center p-3 border mb-5 group-hover:scale-110 transition-transform ${prog.color}`}>
                    <IconComp className="w-7 h-7" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {prog.title}
                  </h3>
                  
                  <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full mt-1 mb-3">
                    {prog.ageGroup}
                  </span>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-50">
                  <Link
                    href={`/academics#${prog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 group/link"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
