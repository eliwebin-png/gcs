"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Image as ImageIcon, FolderPlus } from "lucide-react";
import { saveGalleryImageAction, deleteGalleryImageAction, createGalleryCategoryAction } from "@/actions/cmsActions";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // New Image states
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop");
  const [categoryId, setCategoryId] = useState("");

  // New Category states
  const [newCatName, setNewCatName] = useState("");
  const [showCatModal, setShowCatModal] = useState(false);

  const fetchGalleryData = async () => {
    try {
      const res = await fetch("/api/admin/gallery-all");
      const data = await res.json();
      if (data.images) setImages(data.images);
      if (data.categories) {
        setCategories(data.categories);
        if (data.categories.length > 0 && !categoryId) {
          setCategoryId(data.categories[0].id);
        }
      }
    } catch {}
  };

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const handleSaveImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) {
      alert("Please select or create a category first.");
      return;
    }
    setIsSaving(true);
    await saveGalleryImageAction({
      title,
      caption,
      imageUrl,
      categoryId,
      isFeatured: true,
    });
    setIsSaving(false);
    setTitle("");
    setCaption("");
    fetchGalleryData();
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    const slug = newCatName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await createGalleryCategoryAction(newCatName, slug);
    setNewCatName("");
    setShowCatModal(false);
    fetchGalleryData();
  };

  const handleDeleteImage = async (id: string) => {
    if (confirm("Delete this gallery image?")) {
      await deleteGalleryImageAction(id);
      fetchGalleryData();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Photo Gallery & Media Manager</h2>
          <p className="text-xs text-slate-400 mt-0.5">Upload photos, organize album categories, and manage lightbox showcases.</p>
        </div>
        <button
          onClick={() => setShowCatModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
        >
          <FolderPlus className="w-4 h-4 text-blue-400" />
          <span>New Album Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-400" />
            <span>Add Photo to Gallery</span>
          </h3>

          <form onSubmit={handleSaveImage} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Image Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Annual Day Performance"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Album Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Image URL</label>
              <input
                type="text"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Caption / Description</label>
              <textarea
                rows={2}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Short caption for lightbox preview..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{isSaving ? "Saving..." : "Add to Gallery"}</span>
            </button>
          </form>
        </div>

        {/* Gallery Grid */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-base font-bold text-white">Current Gallery Images ({images.length})</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((img) => (
              <div
                key={img.id}
                className="group relative h-44 rounded-2xl overflow-hidden border border-slate-800 shadow-md bg-slate-950"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />
                
                <button
                  onClick={() => handleDeleteImage(img.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white shadow-md transition-colors"
                  aria-label="Delete image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="absolute bottom-2 left-2 right-2">
                  <span className="text-[9px] font-bold uppercase text-blue-400 block">
                    {img.category?.name || "Campus"}
                  </span>
                  <h4 className="text-xs font-bold text-white truncate">{img.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Category Modal */}
      {showCatModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-sm w-full border border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Create New Album Category</h3>
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Robotics & Innovation"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCatModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
