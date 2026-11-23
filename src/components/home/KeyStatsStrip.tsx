"use client";

import React from "react";
import { Users, UserCheck, Trophy, Medal, Monitor } from "lucide-react";

interface StatItem {
  id: string;
  label: string;
  value: string;
  iconName: string;
  colorClass: string;
}

interface KeyStatsStripProps {
  stats?: StatItem[];
}

export default function KeyStatsStrip({ stats }: KeyStatsStripProps) {
  // Default items matching reference screenshot
  const defaultStats = [
    {
      id: "1",
      value: "2500+",
      label: "Students",
      icon: Users,
      bgColor: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      id: "2",
      value: "150+",
      label: "Teachers",
      icon: UserCheck,
      bgColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      id: "3",
      value: "30",
      label: "Years of Excellence",
      icon: Trophy,
      bgColor: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      id: "4",
      value: "100%",
      label: "Board Results",
      icon: Medal,
      bgColor: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      id: "5",
      value: "50+",
      label: "Smart Classrooms",
      icon: Monitor,
      bgColor: "bg-rose-50 text-rose-600 border-rose-100",
    },
  ];

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "users": return Users;
      case "usercheck": return UserCheck;
      case "trophy": return Trophy;
      case "medal": return Medal;
      case "monitor": return Monitor;
      default: return Users;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue": return "bg-blue-50 text-blue-600 border-blue-100";
      case "emerald":
      case "green": return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "amber":
      case "yellow": return "bg-amber-50 text-amber-600 border-amber-100";
      case "purple": return "bg-purple-50 text-purple-600 border-purple-100";
      case "rose":
      case "red": return "bg-rose-50 text-rose-600 border-rose-100";
      default: return "bg-blue-50 text-blue-600 border-blue-100";
    }
  };

  const displayList = stats && stats.length > 0
    ? stats.map((s) => ({
        id: s.id,
        value: s.value,
        label: s.label,
        icon: getIcon(s.iconName),
        bgColor: getColorClasses(s.colorClass),
      }))
    : defaultStats;

  return (
    <section className="relative -mt-6 sm:-mt-10 lg:-mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {displayList.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id || idx}
                className="flex flex-col items-center text-center p-3 hover:scale-105 transition-transform duration-200"
              >
                <div className={`w-13 h-13 rounded-2xl flex items-center justify-center p-3 border mb-3 ${item.bgColor}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
