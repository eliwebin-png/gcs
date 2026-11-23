"use client";

import React, { useState, useEffect } from "react";
import { ZoomIn, X } from "lucide-react";

interface GalleryImageItem {
  id: string;
  title: string;
  caption?: string | null;
  imageUrl: string;
  category?: { name: string; slug: string } | null;
  categoryId?: string;
}

interface GalleryViewerProps {
  initialImages?: GalleryImageItem[];
}

export default function GalleryViewer({ initialImages = [] }: GalleryViewerProps) {
  const [images, setImages] = useState<GalleryImageItem[]>(initialImages);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryImageItem | null>(null);

  useEffect(() => {
    if (initialImages.length === 0) {
      fetch("/api/gallery")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.images) {
            setImages(data.images);
          }
        })
        .catch(() => {});
    }
  }, [initialImages]);

  const defaultGallery: GalleryImageItem[] = [
    {
      id: "1",
      title: "Classroom Learning",
      caption: "Interactive smart learning sessions in high school.",
      imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
      category: { name: "Academic Life", slug: "academics" },
    },
    {
      id: "2",
      title: "Annual Day Gala",
      caption: "Vibrant dance performances during the Annual Day gala.",
      imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
      category: { name: "Events & Celebrations", slug: "events" },
    },
    {
      id: "3",
      title: "Sports Day Sprint",
      caption: "Students competing in 400m relay sprint championship.",
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
      category: { name: "Sports & Athletics", slug: "sports" },
    },
    {
      id: "4",
      title: "Science Exhibition",
      caption: "Young innovators presenting working solar models.",
      imageUrl: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800&auto=format&fit=crop",
      category: { name: "Academic Life", slug: "academics" },
    },
    {
      id: "5",
      title: "Cultural Activities",
      caption: "Traditional folk drama and musical orchestra.",
      imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
      category: { name: "Events & Celebrations", slug: "events" },
    },
    {
      id: "6",
      title: "Our Campus Aerial",
      caption: "Scenic aerial view of our expansive green campus.",
      imageUrl: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=800&auto=format&fit=crop",
      category: { name: "Campus & Infrastructure", slug: "campus" },
    },
  ];

  const currentList = images.length > 0 ? images : defaultGallery;

  const filteredImages =
    selectedCategory === "all"
      ? currentList
      : currentList.filter((img) => img.category?.slug === selectedCategory);

  const categories = [
    { label: "All Photos", slug: "all" },
    { label: "Campus & Infrastructure", slug: "campus" },
    { label: "Academic Life", slug: "academics" },
    { label: "Events & Celebrations", slug: "events" },
    { label: "Sports & Athletics", slug: "sports" },
  ];

  return (
    <div className="space-y-10">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === cat.slug
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredImages.map((img, idx) => (
          <div
            key={img.id || idx}
            onClick={() => setSelectedImage(img)}
            className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl border border-slate-100 transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src={img.imageUrl}
              alt={img.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4" />
            </div>

            <div className="absolute bottom-0 inset-x-0 p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                {img.category?.name || "Campus"}
              </span>
              <h3 className="text-sm font-bold text-white leading-tight drop-shadow truncate">
                {img.title}
              </h3>
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
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
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
              className="w-full max-h-[70vh] object-contain bg-black/40"
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
  );
}
