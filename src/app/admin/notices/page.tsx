"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Pin, FileText, Bell } from "lucide-react";
import { saveNoticeAction, deleteNoticeAction } from "@/actions/cmsActions";

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [category, setCategory] = useState("General");
  const [isPinned, setIsPinned] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchNotices = async () => {
    try {
      const res = await fetch("/api/admin/notices");
      const data = await res.json();
      if (data.notices) setNotices(data.notices);
    } catch {}
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await saveNoticeAction({
      id: currentId,
      title,
      description,
      fileUrl: fileUrl || "#",
      category,
      isPinned,
      publishDate: new Date(),
    });
    setIsSaving(false);
    resetForm();
    fetchNotices();
  };

  const handleEdit = (item: any) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setTitle(item.title);
    setDescription(item.description || "");
    setFileUrl(item.fileUrl || "");
    setCategory(item.category);
    setIsPinned(item.isPinned);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this notice circular?")) {
      await deleteNoticeAction(id);
      fetchNotices();
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(undefined);
    setTitle("");
    setDescription("");
    setFileUrl("");
    setCategory("General");
    setIsPinned(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white">Notice Board & Circulars</h2>
        <p className="text-xs text-slate-400 mt-0.5">Publish exam timetables, holiday announcements, and academic circulars.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            {isEditing ? <Edit2 className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-blue-400" />}
            <span>{isEditing ? "Edit Notice Circular" : "Publish New Notice"}</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Notice Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Term 1 Examination Date Sheet"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              >
                <option value="General">General</option>
                <option value="Examination">Examination</option>
                <option value="Academics">Academics</option>
                <option value="Holiday">Holiday</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed instructions or circular summary..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">PDF File Link / Attachment URL</label>
              <input
                type="text"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="https://... or /downloads/notice.pdf"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded text-amber-500 bg-slate-950 border-slate-800"
                />
                <span className="text-slate-300 font-semibold flex items-center gap-1">
                  <Pin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pin Notice at Top of List</span>
                </span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
              >
                {isSaving ? "Saving..." : isEditing ? "Update Notice" : "Publish Notice"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Notices List */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-base font-bold text-white">Active Notices ({notices.length})</h3>

          <div className="space-y-3">
            {notices.map((n) => (
              <div
                key={n.id}
                className={`rounded-2xl p-4 border shadow-sm flex items-start justify-between gap-4 ${
                  n.isPinned ? "bg-amber-950/20 border-amber-800/40" : "bg-slate-900 border-slate-800"
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    {n.isPinned && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] flex items-center gap-0.5">
                        <Pin className="w-2.5 h-2.5" />
                        PINNED
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                      {n.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mt-1">{n.title}</h4>
                  {n.description && <p className="text-[11px] text-slate-400 line-clamp-2">{n.description}</p>}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(n)}
                    className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-950/40"
                    aria-label="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(n.id)}
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
