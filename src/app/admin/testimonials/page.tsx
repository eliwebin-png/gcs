"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Star, MessageSquareQuote } from "lucide-react";
import { saveTestimonialAction, deleteTestimonialAction } from "@/actions/cmsActions";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  const [name, setName] = useState("");
  const [role, setRole] = useState("Parent");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [avatarUrl, setAvatarUrl] = useState("https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop");
  const [isSaving, setIsSaving] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      if (data.testimonials) setTestimonials(data.testimonials);
    } catch {}
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await saveTestimonialAction({
      id: currentId,
      name,
      role,
      message,
      rating,
      avatarUrl,
      order: testimonials.length + 1,
      isActive: true,
    });
    setIsSaving(false);
    resetForm();
    fetchTestimonials();
  };

  const handleEdit = (t: any) => {
    setIsEditing(true);
    setCurrentId(t.id);
    setName(t.name);
    setRole(t.role);
    setMessage(t.message);
    setRating(t.rating || 5);
    setAvatarUrl(t.avatarUrl || "");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this testimonial?")) {
      await deleteTestimonialAction(id);
      fetchTestimonials();
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(undefined);
    setName("");
    setRole("Parent");
    setMessage("");
    setRating(5);
    setAvatarUrl("https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white">Parent & Student Testimonials</h2>
        <p className="text-xs text-slate-400 mt-0.5">Manage community reviews, quotes, ratings, and avatars.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            {isEditing ? <Edit2 className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-blue-400" />}
            <span>{isEditing ? "Edit Testimonial" : "Add Testimonial"}</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Author Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mrs. Neha Sharma"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Role / Grade</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Parent of Grade VI"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Star Rating (1 - 5)</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                <option value={3}>⭐⭐⭐ (3 Stars)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Avatar Image URL</label>
              <input
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Review Quote</label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Parent feedback..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
              >
                {isSaving ? "Saving..." : isEditing ? "Update Review" : "Add Review"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-base font-bold text-white">Active Testimonials ({testimonials.length})</h3>

          <div className="space-y-3">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={t.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.name}</h4>
                    <p className="text-[10px] text-blue-400">{t.role}</p>
                    <p className="text-xs text-slate-300 italic mt-1 line-clamp-2">"{t.message}"</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(t)}
                    className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-950/40"
                    aria-label="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
