"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Download, FileText } from "lucide-react";
import { saveDownloadItemAction, deleteDownloadItemAction } from "@/actions/cmsActions";

export default function AdminDownloadsPage() {
  const [downloads, setDownloads] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Prospectus");
  const [fileUrl, setFileUrl] = useState("/downloads/prospectus.pdf");
  const [fileSize, setFileSize] = useState("2.4 MB");
  const [fileType, setFileType] = useState("PDF");
  const [isSaving, setIsSaving] = useState(false);

  const fetchDownloads = async () => {
    try {
      const res = await fetch("/api/admin/downloads");
      const data = await res.json();
      if (data.downloads) setDownloads(data.downloads);
    } catch {}
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await saveDownloadItemAction({
      id: currentId,
      title,
      category,
      fileUrl,
      fileSize,
      fileType,
    });
    setIsSaving(false);
    resetForm();
    fetchDownloads();
  };

  const handleEdit = (d: any) => {
    setIsEditing(true);
    setCurrentId(d.id);
    setTitle(d.title);
    setCategory(d.category);
    setFileUrl(d.fileUrl);
    setFileSize(d.fileSize);
    setFileType(d.fileType);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this downloadable file item?")) {
      await deleteDownloadItemAction(id);
      fetchDownloads();
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(undefined);
    setTitle("");
    setCategory("Prospectus");
    setFileUrl("/downloads/prospectus.pdf");
    setFileSize("2.4 MB");
    setFileType("PDF");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white">Downloads & Resource Forms</h2>
        <p className="text-xs text-slate-400 mt-0.5">Manage school prospectus, admission forms, syllabus outlines, and circulars.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            {isEditing ? <Edit2 className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-blue-400" />}
            <span>{isEditing ? "Edit Download Item" : "Add Resource Link"}</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Document Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. School Prospectus 2025-26"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                >
                  <option value="Prospectus">Prospectus</option>
                  <option value="Admission Form">Admission Form</option>
                  <option value="Holiday List">Holiday List</option>
                  <option value="Syllabus">Syllabus</option>
                  <option value="Circulars">Circulars</option>
                  <option value="Results">Results</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">File Size</label>
                <input
                  type="text"
                  value={fileSize}
                  onChange={(e) => setFileSize(e.target.value)}
                  placeholder="2.4 MB"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">File / Download URL</label>
              <input
                type="text"
                required
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
              >
                {isSaving ? "Saving..." : isEditing ? "Update Resource" : "Add Resource"}
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
          <h3 className="text-base font-bold text-white">Active Resources ({downloads.length})</h3>

          <div className="space-y-3">
            {downloads.map((d) => (
              <div
                key={d.id}
                className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-emerald-400 uppercase">{d.category}</span>
                    <h4 className="text-xs font-bold text-white">{d.title}</h4>
                    <span className="text-[10px] text-slate-400">{d.fileType} • {d.fileSize}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(d)}
                    className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-950/40"
                    aria-label="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(d.id)}
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
