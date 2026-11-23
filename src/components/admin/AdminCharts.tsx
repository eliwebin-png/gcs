"use client";

import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Users, Activity } from "lucide-react";

export default function AdminCharts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const visitorData = [
    { month: "Jan", visitors: 4200, inquiries: 45 },
    { month: "Feb", visitors: 5800, inquiries: 82 },
    { month: "Mar", visitors: 9400, inquiries: 160 },
    { month: "Apr", visitors: 12500, inquiries: 240 },
    { month: "May", visitors: 8900, inquiries: 110 },
    { month: "Jun", visitors: 6700, inquiries: 75 },
    { month: "Jul", visitors: 7800, inquiries: 95 },
    { month: "Aug", visitors: 11200, inquiries: 190 },
  ];

  const streamDistribution = [
    { grade: "Pre-Primary", count: 420 },
    { grade: "Primary", count: 750 },
    { grade: "Middle", count: 620 },
    { grade: "Secondary", count: 410 },
    { grade: "Senior Sec", count: 300 },
  ];

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 h-80 bg-slate-900 rounded-3xl animate-pulse" />
        <div className="lg:col-span-4 h-80 bg-slate-900 rounded-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Chart 1: Monthly Website Traffic & Inquiries */}
      <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
              GROWTH ANALYTICS
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              Monthly Website Visitors & Admissions Traffic
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+28.4% YoY</span>
          </div>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={visitorData}>
              <defs>
                <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#visitorGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Enrollment Distribution by Stage */}
      <div className="lg:col-span-4 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
            STUDENT COMPOSITION
          </span>
          <h3 className="text-base font-bold text-white mt-0.5">
            Enrollment By Wing
          </h3>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={streamDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="grade" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="count" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
