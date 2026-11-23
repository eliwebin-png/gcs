"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, X, ZoomIn } from "lucide-react";

interface GalleryImageItem {
  id: string;
  title: string;
  caption?: string | null;
  imageUrl: string;
}

interface SchoolGalleryProps {
  images?: GalleryImageItem[];
}

export default function SchoolGallery({ images }: SchoolGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImageItem | null>(null);

  const defaultImages: GalleryImageItem[] = [
    {
      id: "1",
      title: "Classroom Learning",
      caption: "Interactive smart learning sessions in high school.",
      imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "2",
      title: "Annual Day",
      caption: "Vibrant dance performances during the Annual Day gala.",
      imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "3",
      title: "Sports Day",
      caption: "Students competing in 400m relay sprint championship.",
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "4",
      title: "Science Exhibition",
      caption: "Young innovators presenting working solar models.",
      imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "5",
      title: "Cultural Activities",
      caption: "Traditional folk drama and musical orchestra.",
      imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "6",
      title: "Our Campus",
      caption: "Scenic aerial view of our expansive green campus.",
      imageUrl: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=800&auto=format&fit=crop",
    },
  ];

  const displayList = images && images.length > 0 ? images : defaultImages;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and "View More Photos" button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-xs tracking-wider uppercase mb-2">
              SCHOOL GALLERY
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Moments & Memories of Campus Life
            </h2>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-lg transition-all self-start sm:self-auto"
          >
            <span>View More Photos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {displayList.slice(0, 6).map((img, idx) => (
            <div
              key={img.id || idx}
              onClick={() => setSelectedImage(img)}
              className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url(${img.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              
              {/* Zoom badge */}
              <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3.5 h-3.5" />
              </div>

              {/* Title at bottom */}
              <div className="absolute bottom-0 inset-x-0 p-3">
                <p className="text-xs font-bold text-white leading-tight drop-shadow truncate">
                  {img.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
              
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-cover"
              />

              <div className="p-6 bg-slate-900 text-white">
                <h3 className="text-xl font-bold">{selectedImage.title}</h3>
                {selectedImage.caption && (
                  <p className="text-sm text-slate-400 mt-1">{selectedImage.caption}</p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
