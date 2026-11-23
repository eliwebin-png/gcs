"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SchoolLogo from "@/components/ui/SchoolLogo";
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  Mail,
  ChevronDown,
  Building2,
  GraduationCap,
  Target,
  Award,
  BookOpen,
  Layers,
  Users,
  Calendar,
  FileText,
  BookMarked,
  FlaskConical,
  Trophy,
  Bus,
  Building,
  Camera,
  Video,
  CalendarDays,
  Newspaper,
  Bell,
  FileEdit,
  Sparkles,
} from "lucide-react";

interface SubNavItem {
  name: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavItem {
  name: string;
  href: string;
  children?: SubNavItem[];
}

interface NavbarProps {
  schoolName?: string;
  tagline?: string;
  phone?: string;
  email?: string;
}

export default function Navbar({
  schoolName = "GIDHAUR CENTRAL SCHOOL",
  tagline = "Duty • Devotion • Discipline",
  phone = "+91 8409254393",
  email = "info@gidhaurcentralschool.com",
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor scroll for compact sticky transitions
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  // Dropdown hover helpers with safe exit buffer to prevent flickering
  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  const toggleMobileAccordion = (name: string) => {
    setMobileExpanded((prev) => (prev === name ? null : name));
  };

  // Main navigation structure strictly following requirements
  const navigationItems: NavItem[] = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
      children: [
        {
          name: "About School",
          href: "/about",
          description: "Our heritage, academic ethos & founding legacy",
          icon: Building2,
        },
        {
          name: "Academic",
          href: "/academics",
          description: "Curriculum, wings & academic excellence",
          icon: BookOpen,
        },
        {
          name: "Facilities",
          href: "/infrastructure",
          description: "Smart campus, laboratories, library & sports",
          icon: Building,
        },
      ],
    },
    {
      name: "Academics",
      href: "/academics",
      children: [
        {
          name: "Curriculum",
          href: "/academics",
          description: "CBSE curriculum & innovative pedagogical model",
          icon: BookOpen,
        },
        {
          name: "Academic Calendar",
          href: "/downloads",
          description: "Examination dates, term milestones & circulars",
          icon: Calendar,
        },
        {
          name: "Admissions",
          href: "/admissions",
          description: "Procedures, age criteria & online registration",
          icon: FileText,
        },
      ],
    },
    {
      name: "Gallery",
      href: "/gallery",
      children: [
        {
          name: "All Media",
          href: "/gallery",
          description: "Campus photo albums, video archives & highlights",
          icon: Camera,
        },
        {
          name: "Events",
          href: "/events",
          description: "Upcoming celebrations, exhibitions & sports meets",
          icon: CalendarDays,
        },
      ],
    },
    {
      name: "Blog",
      href: "/news",
      children: [
        {
          name: "School News",
          href: "/news",
          description: "Official press bulletins, headlines & announcements",
          icon: Newspaper,
        },
        {
          name: "Latest Updates",
          href: "/notice-board",
          description: "Timely parent circulars & student board notices",
          icon: Bell,
        },
        {
          name: "Articles",
          href: "/news",
          description: "Faculty perspectives & student literary columns",
          icon: FileEdit,
        },
        {
          name: "Achievements",
          href: "/achievements",
          description: "Academic honours, olympiad ranks & trophies",
          icon: Sparkles,
        },
      ],
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  // Helper to determine if a menu or child is currently active
  const isItemActive = (item: NavItem) => {
    if (pathname === item.href) return true;
    if (item.children) {
      return item.children.some(
        (child) => pathname === child.href.split("#")[0]
      );
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* 1. Top Utility Micro-Bar */}
      <div
        className={`bg-slate-900 text-slate-300 text-xs px-4 hidden md:block border-b border-slate-800 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "max-h-0 py-0 opacity-0 overflow-hidden border-none"
            : "max-h-12 py-2 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{phone}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>{email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <Link
              href="/notice-board"
              className="hover:text-blue-400 transition-colors"
            >
              Notice Board
            </Link>
            <span className="text-slate-700">|</span>
            <Link
              href="/mandatory-disclosure"
              className="hover:text-blue-400 transition-colors"
            >
              CBSE Disclosure
            </Link>
            <span className="text-slate-700">|</span>
            <Link
              href="/admin/login"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md shadow-slate-900/5 border-b border-slate-200/80 py-3"
            : "bg-white border-b border-slate-100 py-3.5 sm:py-4 shadow-xs"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Official Crest & Branding */}
          <div className="flex-shrink-0">
            <SchoolLogo schoolName={schoolName} tagline={tagline} />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
            {navigationItems.map((item) => {
              const active = isItemActive(item);
              const isOpen = openDropdown === item.name;

              if (item.children) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === item.name ? null : item.name
                        )
                      }
                      className={`group flex items-center gap-1.5 px-3 py-2 rounded-xl text-[14px] font-medium transition-all duration-200 outline-none select-none ${
                        active
                          ? "text-blue-700 bg-blue-50/70 font-semibold"
                          : isOpen
                          ? "text-blue-600 bg-slate-50"
                          : "text-slate-700 hover:text-blue-600 hover:bg-slate-50/90"
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${
                          isOpen
                            ? "rotate-180 text-blue-600"
                            : "text-slate-400 group-hover:text-blue-600"
                        }`}
                      />
                    </button>

                    {/* Desktop Dropdown Panel with safe hover bridge */}
                    <div
                      className={`absolute left-0 top-full pt-2 z-50 transition-all duration-200 ease-out origin-top-left ${
                        isOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto visible"
                          : "opacity-0 -translate-y-1.5 pointer-events-none invisible"
                      }`}
                    >
                      {/* Invisible hover bridge to eliminate gaps */}
                      <div className="absolute -top-2 left-0 right-0 h-2 bg-transparent" />

                      <div className="w-[340px] bg-white rounded-2xl p-2 shadow-xl shadow-slate-900/10 border border-slate-100 ring-1 ring-slate-900/5">
                        <div className="space-y-1">
                          {item.children.map((sub) => {
                            const isSubActive =
                              pathname === sub.href.split("#")[0];
                            const IconComponent = sub.icon;

                            return (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setOpenDropdown(null)}
                                className={`group/item flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150 ${
                                  isSubActive
                                    ? "bg-blue-50/80 text-blue-900"
                                    : "hover:bg-slate-50/90"
                                }`}
                              >
                                <div
                                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                                    isSubActive
                                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/25"
                                      : "bg-blue-50/80 text-blue-700 group-hover/item:bg-blue-600 group-hover/item:text-white group-hover/item:shadow-sm"
                                  }`}
                                >
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0 pt-0.5">
                                  <div
                                    className={`text-[13px] font-semibold leading-snug transition-colors ${
                                      isSubActive
                                        ? "text-blue-700"
                                        : "text-slate-800 group-hover/item:text-blue-600"
                                    }`}
                                  >
                                    {sub.name}
                                  </div>
                                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5 line-clamp-1">
                                    {sub.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Normal link without dropdown (Home, Contact)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                    active
                      ? "text-blue-700 bg-blue-50/70 font-semibold"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50/90"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action Button & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Admissions CTA button */}
            <Link
              href="/admissions"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95 transition-all duration-200 flex-shrink-0"
            >
              <span>
                <span className="hidden sm:inline">Admissions Open</span>
                <span className="sm:hidden">Apply</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline-block" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors flex-shrink-0"
              aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-800" />
              ) : (
                <Menu className="w-6 h-6 text-slate-800" />
              )}
            </button>
          </div>
        </div>

        {/* 3. Mobile Responsive Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-200/90 max-h-[calc(100vh-120px)] overflow-y-auto space-y-1.5">
              {navigationItems.map((item) => {
                const active = isItemActive(item);
                const isExpanded = mobileExpanded === item.name;

                if (item.children) {
                  return (
                    <div
                      key={item.name}
                      className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50/50"
                    >
                      <button
                        type="button"
                        onClick={() => toggleMobileAccordion(item.name)}
                        className={`w-full flex items-center justify-between px-3.5 py-3 text-sm font-semibold transition-colors ${
                          active ? "text-blue-600" : "text-slate-800"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {item.name}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-blue-600" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="px-2 pb-2.5 pt-1 space-y-1 bg-white border-t border-slate-100">
                          {item.children.map((sub) => {
                            const isSubActive =
                              pathname === sub.href.split("#")[0];
                            const SubIcon = sub.icon;

                            return (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                                  isSubActive
                                    ? "bg-blue-50 text-blue-700 font-semibold"
                                    : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                                }`}
                              >
                                <div
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                    isSubActive
                                      ? "bg-blue-600 text-white"
                                      : "bg-blue-50 text-blue-600"
                                  }`}
                                >
                                  <SubIcon className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">{sub.name}</div>
                                  <div className="text-[10px] text-slate-500 line-clamp-1">
                                    {sub.description}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                // Simple link for Home / Contact
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-800 hover:bg-slate-100/70"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Mobile Quick Action Footer */}
              <div className="pt-3 mt-2 border-t border-slate-100 space-y-2">
                <Link
                  href="/admissions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-sm shadow-md"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="py-2 px-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Call School</span>
                  </a>
                  <Link
                    href="/admin/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Admin Portal</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
