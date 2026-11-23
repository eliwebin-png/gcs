"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

interface SchoolLogoProps {
  variant?: "light" | "dark";
  schoolName?: string;
  tagline?: string;
  logoUrl?: string;
}

export default function SchoolLogo({
  variant = "light",
  schoolName = "GIDHAUR CENTRAL SCHOOL",
  tagline = "Duty • Devotion • Discipline",
  logoUrl = "/images/gidhaur-logo.png",
}: SchoolLogoProps) {
  const isDarkBg = variant === "dark";
  const [imgError, setImgError] = useState(false);

  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-3 group select-none min-w-0">
      {/* Official School Crest Logo */}
      <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white shadow-md border-2 border-blue-600/30 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
        {!imgError ? (
          <img
            src={logoUrl}
            alt={schoolName}
            className="w-full h-full object-contain p-0.5"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-900">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow" />
          </div>
        )}
      </div>

      {/* School Name & Tagline */}
      <div className="flex flex-col min-w-0">
        <span
          className={`font-black tracking-tight text-xs sm:text-base lg:text-lg leading-tight uppercase truncate ${
            isDarkBg ? "text-white" : "text-slate-900"
          }`}
        >
          {schoolName}
        </span>
        <span
          className={`text-[9px] sm:text-[11px] font-semibold tracking-wide truncate ${
            isDarkBg ? "text-blue-400" : "text-blue-700"
          }`}
        >
          {tagline}
        </span>
      </div>
    </Link>
  );
}
