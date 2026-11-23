"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Eye, Target, HeartHandshake } from "lucide-react";

interface AboutSectionProps {
  badge?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  vision?: string;
  mission?: string;
  values?: string;
}

export default function AboutSection({
  badge = "ABOUT OUR SCHOOL",
  title = "Gidhaur Central School - Duty, Devotion & Discipline",
  description = "At Gidhaur Central School, established in 2005 in Gidhaur, Jamui (Bihar), we believe in nurturing young minds with foundational academic excellence, moral integrity, and character building. Guided by our motto 'Duty • Devotion • Discipline', we prepare students for a bright and purposeful future.",
  imageUrl = "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop",
  vision = "To cultivate intellectually vibrant, morally upright, and socially responsible citizens through accessible quality education.",
  mission = "To provide an enriching learning environment that fosters academic curiosity, ethical values, and holistic physical development.",
  values = "Duty, Devotion, Discipline, Integrity, and Compassion guide everything we do.",
}: AboutSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: School Image with rounded corners & shadow */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={imageUrl}
                alt="Students at Gidhaur Central School"
                className="w-full h-[420px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative background blob */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-100/70 rounded-full blur-2xl -z-0" />
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-amber-100/70 rounded-full blur-2xl -z-0" />
          </div>

          {/* Right Column: About Content & Value Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs tracking-wider uppercase">
                {badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                {title}
              </h2>
            </div>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {description}
            </p>

            {/* Vision / Mission / Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              
              {/* Vision Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                <div className="flex items-center gap-2 mb-1.5 text-blue-600 font-bold text-sm">
                  <Eye className="w-4 h-4" />
                  <span>Vision</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  {vision}
                </p>
              </div>

              {/* Mission Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
                <div className="flex items-center gap-2 mb-1.5 text-emerald-600 font-bold text-sm">
                  <Target className="w-4 h-4" />
                  <span>Mission</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  {mission}
                </p>
              </div>

              {/* Values Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-colors">
                <div className="flex items-center gap-2 mb-1.5 text-amber-600 font-bold text-sm">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Values</span>
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  {values}
                </p>
              </div>

            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
