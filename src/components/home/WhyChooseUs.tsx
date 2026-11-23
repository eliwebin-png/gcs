"use client";

import React from "react";
import Link from "next/link";
import {
  Tv,
  GraduationCap,
  Laptop,
  ShieldCheck,
  Dumbbell,
  Microscope,
  BookOpen,
  Bus,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface WhyChooseUsItemType {
  id: string;
  title: string;
  description?: string | null;
  iconName: string;
  colorTheme: string;
}

interface WhyChooseUsProps {
  items?: WhyChooseUsItemType[];
}

export default function WhyChooseUs({ items }: WhyChooseUsProps) {
  // Built-in educational photography & feature highlights matching reference graphics
  const defaultItems = [
    {
      title: "Smart Classrooms",
      description:
        "Digitally equipped interactive smart boards, audio-visual systems & ergonomic seating for dynamic learning.",
      feature: "Interactive Smart Panels & Air-Conditioned",
      imageUrl:
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop",
      icon: Tv,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Experienced Faculty",
      description:
        "Highly qualified CBSE educators dedicated to student mentorship, personal growth and academic excellence.",
      feature: "100% Certified & Student-Centered",
      imageUrl:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
      icon: GraduationCap,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Digital Learning",
      description:
        "Blended learning environment with computer literacy, coding curriculum and modern STEM technology tools.",
      feature: "High-Speed Fiber & Modern Devices",
      imageUrl:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
      icon: Laptop,
      color: "text-cyan-600 bg-cyan-50 border-cyan-100",
    },
    {
      title: "Safe & Secure Campus",
      description:
        "Comprehensive 24x7 CCTV coverage, verified support staff, security guards and automated visitor check-in.",
      feature: "24x7 CCTV Monitored & Secure Entry",
      imageUrl:
        "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",
      icon: ShieldCheck,
      color: "text-green-600 bg-green-50 border-green-100",
    },
    {
      title: "Sports Facilities",
      description:
        "Multi-sport grounds for football, cricket, basketball, volleyball and regular athletic fitness programs.",
      feature: "Full-Sized Grounds & Expert Coaching",
      imageUrl:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop",
      icon: Dumbbell,
      color: "text-rose-600 bg-rose-50 border-rose-100",
    },
    {
      title: "Science & Computer Labs",
      description:
        "Fully equipped Physics, Chemistry, Biology and high-tech Computer labs fostering hands-on experimentation.",
      feature: "Modern NABL Standard Equipment",
      imageUrl:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
      icon: Microscope,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "Well Stocked Library",
      description:
        "Expansive collection of curriculum books, encyclopedias, fiction, journals and quiet digital reading zones.",
      feature: "Over 10,000+ Titles & Reading Hall",
      imageUrl:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop",
      icon: BookOpen,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "GPS Enabled Transportation",
      description:
        "Dedicated fleet of school buses covering all major town routes with live GPS tracking and safety staff.",
      feature: "Live GPS Tracked & Speed Governed",
      imageUrl:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop",
      icon: Bus,
      color: "text-orange-600 bg-orange-50 border-orange-100",
    },
  ];

  const imageMap: Record<string, { image: string; feature: string }> = {
    "smart classrooms": {
      image:
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop",
      feature: "Interactive Smart Panels & Air-Conditioned",
    },
    "experienced faculty": {
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
      feature: "100% Certified & Student-Centered",
    },
    "digital learning": {
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
      feature: "High-Speed Fiber & Modern Devices",
    },
    "safe & secure campus": {
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop",
      feature: "24x7 CCTV Monitored & Secure Entry",
    },
    "sports facilities": {
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop",
      feature: "Full-Sized Grounds & Expert Coaching",
    },
    "science & computer labs": {
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
      feature: "Modern NABL Standard Equipment",
    },
    "well stocked library": {
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop",
      feature: "Over 10,000+ Titles & Reading Hall",
    },
    "gps enabled transportation": {
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop",
      feature: "Live GPS Tracked & Speed Governed",
    },
  };

  const getIcon = (name: string) => {
    switch (name?.toLowerCase()) {
      case "tv":
        return Tv;
      case "graduationcap":
        return GraduationCap;
      case "laptop":
        return Laptop;
      case "shieldcheck":
        return ShieldCheck;
      case "dumbbell":
        return Dumbbell;
      case "microscope":
        return Microscope;
      case "bookopen":
        return BookOpen;
      case "bus":
        return Bus;
      default:
        return Tv;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-600 bg-blue-50 border-blue-100";
      case "emerald":
        return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "cyan":
        return "text-cyan-600 bg-cyan-50 border-cyan-100";
      case "green":
        return "text-green-600 bg-green-50 border-green-100";
      case "rose":
        return "text-rose-600 bg-rose-50 border-rose-100";
      case "indigo":
        return "text-indigo-600 bg-indigo-50 border-indigo-100";
      case "amber":
        return "text-amber-600 bg-amber-50 border-amber-100";
      case "orange":
        return "text-orange-600 bg-orange-50 border-orange-100";
      default:
        return "text-blue-600 bg-blue-50 border-blue-100";
    }
  };

  const getImageAndFeature = (title: string) => {
    const key = title?.toLowerCase().trim();
    if (imageMap[key]) return imageMap[key];

    for (const [k, val] of Object.entries(imageMap)) {
      if (key.includes(k) || k.includes(key)) return val;
    }

    return {
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
      feature: "24x7 Monitored & High Standards",
    };
  };

  const displayItems =
    items && items.length > 0
      ? items.map((it) => {
          const meta = getImageAndFeature(it.title);
          return {
            title: it.title,
            description:
              it.description ||
              "Designed to provide students with modern tools, inspiring environments, and exceptional learning support.",
            feature: meta.feature,
            imageUrl: meta.image,
            icon: getIcon(it.iconName),
            color: getColorClasses(it.colorTheme),
          };
        })
      : defaultItems;

  return (
    <section className="py-20 bg-slate-50/70 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs tracking-wider uppercase mb-2 border border-emerald-200/60 shadow-2xs">
            WHY CHOOSE US
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            World-Class Infrastructure & Pedagogy
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            A look into our campus facilities, experienced educators, and technology-driven learning infrastructure.
          </p>
        </div>

        {/* 8 Graphic Cards Grid (2 rows of 4 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col"
              >
                {/* Top Graphic Image with Dark Gradient & Overlay Title */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                  {/* Floating Top Icon Badge */}
                  <div className="absolute top-3.5 right-3.5 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center border border-white/70">
                    <IconComp className="w-5 h-5 text-blue-600" />
                  </div>

                  {/* Title Overlaid on Graphic */}
                  <div className="absolute bottom-3.5 left-4 right-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-md leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Card Description & Verified Feature Tag */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                    <span className="truncate">{item.feature}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Infrastructure CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/infrastructure"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-blue-600 font-bold text-xs sm:text-sm border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all active:scale-95"
          >
            <span>Explore All Campus Infrastructure & Labs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
