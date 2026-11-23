"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageHeader({
  title,
  subtitle,
  badge,
  breadcrumbs = [],
}: PageHeaderProps) {
  return (
    <div className="relative pt-12 sm:pt-16 pb-12 sm:pb-16 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4 flex-wrap">
          <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-white transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-blue-400 font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {badge && (
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 font-bold text-xs tracking-wider uppercase mb-3 border border-blue-500/30">
            {badge}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
