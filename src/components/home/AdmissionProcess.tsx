"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileEdit,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ClipboardCheck,
  MessageSquare,
  Award,
  ChevronRight,
  ShieldCheck,
  Clock,
  BookOpen,
} from "lucide-react";

export default function AdmissionProcess() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 3 Core Steps: Registration, Interview, Admission Confirmation
  const steps = [
    {
      stepNumber: "01",
      badge: "Stage 1 • Application",
      title: "Online Registration",
      subtitle: "Simple, paperless digital registration or campus desk inquiry.",
      description:
        "Fill out our simple registration form online or visit the school office. Submit basic student details and previous academic records to initiate the admission journey.",
      icon: FileEdit,
      gradient: "from-blue-600 to-indigo-600",
      lightBg: "bg-blue-50/70 border-blue-100 text-blue-700",
      accentColor: "blue",
      ringColor: "ring-blue-500/30",
      features: [
        "5-minute quick online form submission",
        "Birth certificate & transfer document upload",
        "Instant confirmation SMS & Registration ID",
      ],
      actionText: "Fill Registration Form",
      actionLink: "/admissions",
    },
    {
      stepNumber: "02",
      badge: "Stage 2 • Evaluation",
      title: "Interaction & Interview",
      subtitle: "Friendly, stress-free student assessment & parent interaction.",
      description:
        "We host a welcoming student assessment and informal parent-faculty conversation to understand the child's unique talents, curiosities, and learning requirements.",
      icon: Users,
      gradient: "from-indigo-600 to-purple-600",
      lightBg: "bg-purple-50/70 border-purple-100 text-purple-700",
      accentColor: "purple",
      ringColor: "ring-purple-500/30",
      features: [
        "Holistic & age-appropriate assessment",
        "One-on-one counselor & faculty interaction",
        "Guided campus tour of smart labs & sports turf",
      ],
      actionText: "Schedule Interaction",
      actionLink: "/contact",
    },
    {
      stepNumber: "03",
      badge: "Stage 3 • Enrollment",
      title: "Admission Confirmation",
      subtitle: "Official seat allotment, fee payment & welcome to GCS family.",
      description:
        "Upon successful interaction, formal provisional admission is offered. Complete document verification and fee payment to secure your child's seat for the academic session.",
      icon: Award,
      gradient: "from-emerald-600 to-teal-600",
      lightBg: "bg-emerald-50/70 border-emerald-100 text-emerald-700",
      accentColor: "emerald",
      ringColor: "ring-emerald-500/30",
      features: [
        "Formal admission offer letter & student ID",
        "Flexible online or offline fee payment options",
        "Orientation schedule, uniform & textbook kit",
      ],
      actionText: "View Fee & Guidelines",
      actionLink: "/admissions",
    },
  ];

  // Auto-cycle through the 3 steps smoothly when not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, steps.length]);

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50/70 to-white relative overflow-hidden">
      {/* Decorative ambient background blur lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-100/40 via-purple-100/30 to-emerald-100/40 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 font-bold text-xs tracking-wider uppercase mb-3 border border-blue-200/60 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>ADMISSION PROCESS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Simple 3-Step Enrollment Pathway
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From initial registration to the friendly interview and final confirmation — our admission journey is designed to be transparent, smooth, and welcoming.
          </p>

          {/* Interactive Step Switcher Tabs (Desktop/Tablet) */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-inner">
            {steps.map((s, idx) => (
              <button
                key={s.stepNumber}
                type="button"
                onClick={() => {
                  setActiveStep(idx);
                  setIsPaused(true);
                }}
                className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  activeStep === idx
                    ? "bg-white text-slate-900 shadow-md shadow-slate-900/10 scale-102"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center transition-colors ${
                    activeStep === idx
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {idx + 1}
                </span>
                <span className="hidden sm:inline">{s.title}</span>
                <span className="sm:hidden">{s.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3 Step Cards Grid with Animated Connection Rail */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Animated Glowing Connecting Line (visible on desktop) */}
          <div className="hidden lg:block absolute top-28 left-[16%] right-[16%] h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 rounded-full -z-0 opacity-40">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 rounded-full transition-all duration-700 ease-out shadow-sm shadow-blue-500/50"
              style={{
                width: activeStep === 0 ? "25%" : activeStep === 1 ? "65%" : "100%",
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
            {steps.map((s, idx) => {
              const IconComp = s.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={s.stepNumber}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsPaused(true);
                  }}
                  className={`group relative bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-500 flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? "border-blue-500/60 shadow-2xl shadow-blue-600/15 -translate-y-2.5 ring-4 " +
                        s.ringColor
                      : "border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 opacity-90 hover:opacity-100"
                  }`}
                >
                  {/* Top Stage Header & Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      {/* Step Number Badge */}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
                          isActive
                            ? s.lightBg
                            : "bg-slate-100 border-slate-200 text-slate-600"
                        }`}
                      >
                        {s.badge}
                      </span>

                      {/* Number Pill / Indicator */}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs transition-transform duration-300 ${
                          isActive
                            ? "bg-slate-900 text-white scale-110 shadow-md"
                            : "bg-slate-100 text-slate-500 group-hover:scale-105"
                        }`}
                      >
                        {s.stepNumber}
                      </div>
                    </div>

                    {/* Main Animated Icon Container */}
                    <div className="relative mb-5 flex items-center">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${s.gradient} text-white flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 ${
                          isActive ? "scale-105 shadow-xl animate-pulse" : ""
                        }`}
                      >
                        <IconComp className="w-8 h-8" />
                      </div>

                      {/* Active Ripple Wave Ring */}
                      {isActive && (
                        <span
                          className={`absolute -inset-1 rounded-2xl bg-gradient-to-tr ${s.gradient} opacity-25 blur-sm animate-ping pointer-events-none`}
                        />
                      )}
                    </div>

                    {/* Step Title & Subtitle */}
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-blue-600/90 mt-1">
                      {s.subtitle}
                    </p>

                    {/* Description Paragraph */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                      {s.description}
                    </p>

                    {/* Features Checklist */}
                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5">
                      {s.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2 text-xs text-slate-700 font-medium"
                        >
                          <CheckCircle2
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              isActive ? "text-emerald-600" : "text-slate-400"
                            }`}
                          />
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step Action Button */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href={s.actionLink}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                        isActive
                          ? "bg-slate-900 hover:bg-blue-600 text-white shadow-md shadow-slate-900/10"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                      }`}
                    >
                      <span>{s.actionText}</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Bottom CTA & Assistance Strip */}
        <div className="mt-14 sm:mt-16 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl shadow-slate-900/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
              Session 2025-26 Admissions Open
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Ready to secure your child's bright future?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Admissions are open for Pre-Primary to Class XII. Limited seats available per grade to ensure personalized mentorship.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <span>Apply for Admission</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/downloads"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm border border-slate-200 transition-all hover:scale-105 active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-slate-600" />
              <span>Download Prospectus</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
