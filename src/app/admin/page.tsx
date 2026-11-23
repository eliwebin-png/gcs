import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  MailQuestion,
  Image as ImageIcon,
  Calendar,
  Newspaper,
  Bell,
  ArrowRight,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Metadata } from "next";
import AdminCharts from "@/components/admin/AdminCharts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard | School CMS Command Center",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardPage() {
  const [
    totalInquiries,
    totalAdmissions,
    totalNews,
    totalEvents,
    totalNotices,
    totalGallery,
    totalFaculty,
    recentInquiries,
    recentAdmissions,
  ] = await Promise.all([
    prisma.contactMessage.count().catch(() => 0),
    prisma.admissionInquiry.count().catch(() => 0),
    prisma.news.count().catch(() => 0),
    prisma.event.count().catch(() => 0),
    prisma.notice.count().catch(() => 0),
    prisma.galleryImage.count().catch(() => 0),
    prisma.facultyMember.count().catch(() => 0),
    prisma.contactMessage.findMany({ take: 4, orderBy: { createdAt: "desc" } }).catch(() => []),
    prisma.admissionInquiry.findMany({ take: 4, orderBy: { createdAt: "desc" } }).catch(() => []),
  ]);

  const kpis = [
    { label: "Active Students", value: "2,500+", icon: GraduationCap, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "Faculty Members", value: `${totalFaculty || 150}+`, icon: Users, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "Admission Inquiries", value: `${totalAdmissions}`, icon: MailQuestion, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { label: "Contact Messages", value: `${totalInquiries}`, icon: MailQuestion, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { label: "Published News", value: `${totalNews}`, icon: Newspaper, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
    { label: "Active Notices", value: `${totalNotices}`, icon: Bell, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
    { label: "Gallery Photos", value: `${totalGallery}`, icon: ImageIcon, color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
    { label: "Scheduled Events", value: `${totalEvents}`, icon: Calendar, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-950/40 p-6 sm:p-8 rounded-3xl border border-blue-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            ADMINISTRATIVE DASHBOARD
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Welcome to School Command Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor admissions inquiries, update syllabus circulars, publish news, and manage website content.
          </p>
        </div>
        <Link
          href="/admin/inquiries"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all self-start sm:self-center flex-shrink-0"
        >
          <span>View Inbound Inquiries</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 flex items-center justify-between gap-3 shadow-sm hover:border-slate-700 transition-colors"
            >
              <div>
                <p className="text-xs font-semibold text-slate-400">{kpi.label}</p>
                <p className="text-xl sm:text-2xl font-black text-white mt-1">{kpi.value}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border flex-shrink-0 ${kpi.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recharts Analytics Component */}
      <AdminCharts />

      {/* Recent Inquiries & Admissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Admissions Inquiries */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MailQuestion className="w-4 h-4 text-blue-400" />
              <span>Recent Admission Applications</span>
            </h3>
            <Link href="/admin/inquiries" className="text-xs text-blue-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-slate-800">
            {recentAdmissions.length === 0 ? (
              <p className="text-xs text-slate-500 py-4">No recent applications.</p>
            ) : (
              recentAdmissions.map((adm) => (
                <div key={adm.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-white">{adm.studentName}</h4>
                    <p className="text-[11px] text-slate-400">
                      Applying for <strong className="text-blue-400">{adm.gradeApplying}</strong> • Parent: {adm.parentName}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/20">
                    {adm.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Contact Messages */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MailQuestion className="w-4 h-4 text-purple-400" />
              <span>Recent Inbound Messages</span>
            </h3>
            <Link href="/admin/inquiries" className="text-xs text-purple-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-slate-800">
            {recentInquiries.length === 0 ? (
              <p className="text-xs text-slate-500 py-4">No recent messages.</p>
            ) : (
              recentInquiries.map((msg) => (
                <div key={msg.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-white">{msg.name}</h4>
                    <p className="text-[11px] text-slate-400 truncate max-w-xs">{msg.message}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20">
                    {msg.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
