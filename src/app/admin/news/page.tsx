"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Calendar, User, CheckCircle2, Newspaper } from "lucide-react";
import { saveNewsAction, deleteNewsAction } from "@/actions/cmsActions";

export default function AdminNewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop");
  const [author, setAuthor] = useState("Principal's Desk");
  const [isPublished, setIsPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/admin/news");
      const data = await res.json();
      if (data.news) setNews(data.news);
    } catch {}
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await saveNewsAction({
      id: currentId,
      title,
      slug,
      summary,
      content,
      thumbnail,
      author,
      publishDate: new Date(),
      isPublished,
      isFeatured,
    });
    setIsSaving(false);
    resetForm();
    fetchNews();
  };

  const handleEdit = (item: any) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setTitle(item.title);
    setSlug(item.slug);
    setSummary(item.summary);
    setContent(item.content);
    setThumbnail(item.thumbnail);
    setAuthor(item.author);
    setIsPublished(item.isPublished);
    setIsFeatured(item.isFeatured);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this news article?")) {
      await deleteNewsAction(id);
      fetchNews();
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(undefined);
    setTitle("");
    setSlug("");
    setSummary("");
    setContent("");
    setThumbnail("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop");
    setAuthor("Principal's Desk");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">News & Articles Management</h2>
          <p className="text-xs text-slate-400 mt-0.5">Publish bulletins, event announcements, and press coverage.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            {isEditing ? <Edit2 className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-blue-400" />}
            <span>{isEditing ? "Edit News Article" : "Create New News Article"}</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Article Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Science Fair 2025 Innovations"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">URL Slug</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Short Summary</label>
              <input
                type="text"
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief summary displayed on card preview..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Full Content</label>
              <textarea
                rows={5}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Detailed article body..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Thumbnail URL</label>
                <input
                  type="text"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="rounded text-blue-600 bg-slate-950 border-slate-800"
                />
                <span className="text-slate-300 font-semibold">Published</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-blue-600 bg-slate-950 border-slate-800"
                />
                <span className="text-slate-300 font-semibold">Featured on Homepage</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
              >
                {isSaving ? "Saving..." : isEditing ? "Update Article" : "Publish Article"}
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

        {/* List of News */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-base font-bold text-white">Published News ({news.length})</h3>

          <div className="space-y-3">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm flex items-center justify-between gap-4"
              >
                <img
                  src={item.thumbnail || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=300&auto=format&fit=crop"}
                  alt={item.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=300&auto=format&fit=crop";
                  }}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0 bg-slate-950 border border-slate-800"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{item.summary}</p>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {new Date(item.publishDate).toLocaleDateString()} • {item.author}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-950/40"
                    aria-label="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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
