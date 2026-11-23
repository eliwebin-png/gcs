"use client";

import React from "react";
import Link from "next/link";
import { Monitor, FlaskConical, Cpu, BookOpen, Trophy, Music, Palette, Coffee } from "lucide-react";

interface FacilityItem {
  id: string;
  title: string;
  description?: string | null;
  imageUrl: string;
  iconName?: string | null;
}

interface FeaturedFacilitiesProps {
  facilities?: FacilityItem[];
}

export default function FeaturedFacilities({ facilities }: FeaturedFacilitiesProps) {
  const defaultFacilities = [
    { title: "Computer Lab", image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop", icon: Monitor },
    { title: "Science Lab", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop", icon: FlaskConical },
    { title: "Robotics Lab", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop", icon: Cpu },
    { title: "Library", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&auto=format&fit=crop", icon: BookOpen },
    { title: "Sports Ground", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop", icon: Trophy },
    { title: "Music Room", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop", icon: Music },
    { title: "Art Studio", image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600&auto=format&fit=crop", icon: Palette },
    { title: "Cafeteria", image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=600&auto=format&fit=crop", icon: Coffee },
  ];

  const getIcon = (name?: string | null) => {
    switch (name?.toLowerCase()) {
      case "monitor": return Monitor;
      case "flaskconical": return FlaskConical;
      case "cpu": return Cpu;
      case "bookopen": return BookOpen;
      case "trophy": return Trophy;
      case "music": return Music;
      case "palette": return Palette;
      case "coffee": return Coffee;
      default: return Monitor;
    }
  };

  const displayList = facilities && facilities.length > 0
    ? facilities.map((f) => ({
        title: f.title,
        image: f.imageUrl,
        icon: getIcon(f.iconName),
      }))
    : defaultFacilities;

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs tracking-wider uppercase mb-2">
            FEATURED FACILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            State-of-the-Art Campus Amenities
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {displayList.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <Link
                key={idx}
                href="/infrastructure"
                className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden block shadow-lg border border-slate-800 hover:border-blue-500 transition-all duration-300"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                {/* Content at Bottom */}
                <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2 group-hover:bg-blue-600 transition-colors">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-tight drop-shadow-sm">
                    {item.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
