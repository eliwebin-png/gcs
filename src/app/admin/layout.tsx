"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  SlidersHorizontal,
  Info,
  Layers,
  GraduationCap,
  Building2,
  Image as ImageIcon,
  Newspaper,
  Calendar,
  Bell,
  Award,
  MessageSquareQuote,
  Users,
  Download,
  FileCheck,
  MailQuestion,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldAlert,
} from "lucide-react";
import { logoutAdminAction } from "@/actions/authActions";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, render children without dashboard frame
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await logoutAdminAction();
    router.push("/admin/login");
    router.refresh();
  };

  const navItems = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Inquiries Inbox", href: "/admin/inquiries", icon: MailQuestion, badge: "Live" },
    { label: "Hero Slider", href: "/admin/hero", icon: SlidersHorizontal },
    { label: "About & Messages", href: "/admin/about", icon: Info },
    { label: "Stat Counters", href: "/admin/stats", icon: Layers },
    { label: "Academic Programs", href: "/admin/programs", icon: GraduationCap },
    { label: "Facilities", href: "/admin/facilities", icon: Building2 },
    { label: "Photo Gallery", href: "/admin/gallery", icon: ImageIcon },
    { label: "News & Articles", href: "/admin/news", icon: Newspaper },
    { label: "School Events", href: "/admin/events", icon: Calendar },
    { label: "Notice Board", href: "/admin/notices", icon: Bell },
    { label: "Achievements", href: "/admin/achievements", icon: Award },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "Faculty Directory", href: "/admin/faculty", icon: Users },
    { label: "Downloads & Forms", href: "/admin/downloads", icon: Download },
    { label: "Mandatory Disclosures", href: "/admin/disclosures", icon: FileCheck },
    { label: "School Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="h-screen w-full bg-slate-950 text-slate-100 flex overflow-hidden">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Fixed Sidebar */}
      <aside
        className={`fixed lg:relative top-0 bottom-0 left-0 z-50 w-72 h-screen bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-[calc(100vh-65px)] min-h-0">
          {/* Brand Header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800 shrink-0">
            <Link href="/admin" className="flex items-center gap-2.5 font-black text-xs sm:text-sm tracking-tight text-white">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-white border border-blue-500/40 p-0.5 flex-shrink-0">
                <img
                  src="/images/gidhaur-logo.png"
                  alt="Gidhaur Central School"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="leading-none text-xs font-black">GIDHAUR CENTRAL</span>
                <span className="text-[9px] text-blue-400 font-bold uppercase tracking-wider mt-0.5">Admin CMS</span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1 overflow-y-auto flex-1 min-h-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Quick Website link & Logout */}
        <div className="p-3 border-t border-slate-800 space-y-1 bg-slate-900/90 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-blue-400" />
              <span>View Public Site</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area (Independent scroll) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 px-4 sm:px-6 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
              School Management System
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700">
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
              <span className="text-xs font-semibold text-slate-300 hidden sm:inline">
                Administrator
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content with its own smooth scrollbar */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
