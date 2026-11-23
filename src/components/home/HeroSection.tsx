"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Users,
  Trophy,
  BookOpen,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export interface HeroSlideItem {
  id?: string;
  badge?: string;
  heading: string;
  subheading: string;
  imageUrl: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

interface HeroSectionProps {
  slides?: HeroSlideItem[];
  // Single-slide fallbacks
  heading?: string;
  subheading?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imageUrl?: string;
  showHeroStats?: boolean;
}

export default function HeroSection({
  slides = [],
  heading,
  subheading,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  imageUrl,
  showHeroStats = true,
}: HeroSectionProps) {
  // Built-in default slides if none provided
  const defaultSlides: HeroSlideItem[] = [
    {
      id: "1",
      badge: "Admissions Open 2025-26",
      heading: "Building Bright Futures Through Quality Education",
      subheading:
        "Empowering students through academic excellence, innovation, leadership, and values in a nurturing learning environment.",
      imageUrl:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop",
      primaryCtaText: "Apply Now",
      primaryCtaLink: "/admissions",
      secondaryCtaText: "Virtual Tour",
      secondaryCtaLink: "/infrastructure",
    },
    {
      id: "2",
      badge: "Ranked #1 School for Holistic Development",
      heading: "Nurturing Curious Minds, Shaping Global Leaders",
      subheading:
        "State-of-the-art infrastructure, international pedagogy, and world-class sports facilities for every student.",
      imageUrl:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop",
      primaryCtaText: "Explore Academics",
      primaryCtaLink: "/academics",
      secondaryCtaText: "Contact Us",
      secondaryCtaLink: "/contact",
    },
  ];

  // Combine props into slide list
  const activeSlidesList =
    slides.length > 0
      ? slides
      : heading
        ? [
          {
            id: "prop-1",
            heading: heading || "Building Bright Futures Through Quality Education",
            subheading:
              subheading ||
              "Empowering students through academic excellence, innovation, leadership, and values.",
            imageUrl:
              imageUrl ||
              "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop",
            primaryCtaText: primaryCtaText || "Apply Now",
            primaryCtaLink: primaryCtaLink || "/admissions",
            secondaryCtaText: secondaryCtaText || "Virtual Tour",
            secondaryCtaLink: secondaryCtaLink || "/infrastructure",
          },
          ...defaultSlides.slice(1),
        ]
        : defaultSlides;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto Slider Timer: changes every 3 seconds (3000ms)
  useEffect(() => {
    if (activeSlidesList.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlidesList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeSlidesList.length, isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? activeSlidesList.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlidesList.length);
  };

  const currentSlide = activeSlidesList[currentIndex] || defaultSlides[0];

  // Format title to highlight the word "Bright" in brand blue
  const renderStyledHeading = (text: string) => {
    if (text && text.includes("Bright")) {
      const parts = text.split("Bright");
      return (
        <>
          {parts[0]}
          <span className="text-blue-600 font-extrabold">
            Bright
          </span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <section
      className="relative min-h-[560px] xs:min-h-[600px] sm:min-h-[640px] lg:min-h-[660px] flex flex-col justify-end lg:justify-center pt-16 sm:pt-20 lg:pt-16 pb-8 sm:pb-12 lg:pb-20 overflow-hidden bg-slate-950 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image: Full cover with object-top so faces & banner stay visible at top */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {activeSlidesList.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.heading}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop";
              }}
              className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.02]"
            />
          </div>
        ))}
      </div>

      {/* Main Content: Placed at lower area of image on mobile, centered on desktop */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          className={`grid grid-cols-1 ${
            showHeroStats ? "lg:grid-cols-12 gap-6 lg:gap-12" : "max-w-3xl"
          } items-center`}
        >

          {/* Left Column: Transparent Frosted Glass Card (Same beautiful blur & transparency on mobile and desktop) */}
          <div className={`${showHeroStats ? "lg:col-span-7" : "w-full"} flex justify-center lg:justify-start`}>
            <div
              className={`w-full ${
                showHeroStats ? "max-w-lg lg:max-w-xl" : "max-w-2xl"
              } p-5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-white/40 backdrop-blur-md border border-white/60 shadow-xl shadow-slate-900/10 space-y-3 sm:space-y-3.5 text-left`}
            >
              {currentSlide.badge && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/90 text-blue-700 text-[11px] font-bold border border-blue-200/80 shadow-2xs">
                  <span>{currentSlide.badge}</span>
                </div>
              )}

              <h1
                key={currentIndex}
                className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-[1.25] tracking-tight drop-shadow-2xs animate-in fade-in slide-in-from-left-4 duration-500"
              >
                {renderStyledHeading(currentSlide.heading)}
              </h1>

              <p
                key={`sub-${currentIndex}`}
                className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed animate-in fade-in slide-in-from-left-4 duration-500 delay-100"
              >
                {currentSlide.subheading}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                <Link
                  href={currentSlide.primaryCtaLink || "/admissions"}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <span>{currentSlide.primaryCtaText || "Apply Now"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={currentSlide.secondaryCtaLink || "/infrastructure"}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-white/80 hover:bg-white text-slate-800 font-bold text-xs sm:text-sm border border-slate-200/90 shadow-sm hover:border-blue-300 hover:text-blue-600 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <span>{currentSlide.secondaryCtaText || "Virtual Tour"}</span>
                  <Play className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Glassmorphism Translucent Stats Card (Show/Hide Controlled from Admin) */}
          {showHeroStats && (
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-xs sm:max-w-sm rounded-2xl bg-white/45 backdrop-blur-md p-4 sm:p-5 shadow-xl shadow-slate-900/10 border border-white/60 space-y-2.5 animate-float">

                {/* Stat 1 */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 border border-white/60 hover:bg-white/90 transition-all">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-100/80 border border-blue-200/80 flex items-center justify-center text-blue-700 flex-shrink-0 shadow-2xs">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-slate-900">2500+</h4>
                    <p className="text-[11px] font-medium text-slate-600">Active Students</p>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 border border-white/60 hover:bg-white/90 transition-all">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-amber-100/80 border border-amber-200/80 flex items-center justify-center text-amber-700 flex-shrink-0 shadow-2xs">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-slate-900">20+ Years</h4>
                    <p className="text-[11px] font-medium text-slate-600">Academic Excellence</p>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 border border-white/60 hover:bg-white/90 transition-all">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-indigo-100/80 border border-indigo-200/80 flex items-center justify-center text-indigo-700 flex-shrink-0 shadow-2xs">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-slate-900">JAM/PR-29</h4>
                    <p className="text-[11px] font-medium text-slate-600">Recognized Curriculum</p>
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/70 border border-white/60 hover:bg-white/90 transition-all">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-100/80 border border-emerald-200/80 flex items-center justify-center text-emerald-700 flex-shrink-0 shadow-2xs">
                    <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-slate-900">Admissions</h4>
                    <p className="text-[11px] font-medium text-slate-600">Open 2025-26 Session</p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      {/* ================= SLIDER ARROWS & DESKTOP DOTS ================= */}
      {activeSlidesList.length > 1 && (
        <>
          {/* Left Arrow (Desktop / Tablet) */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 shadow-md border border-slate-200 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer items-center justify-center"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow (Desktop / Tablet) */}
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 shadow-md border border-slate-200 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer items-center justify-center"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Slide Indicator Dots (Mobile & Desktop) */}
          <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {activeSlidesList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx
                    ? "w-8 bg-blue-600 shadow-sm shadow-blue-500/30"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
