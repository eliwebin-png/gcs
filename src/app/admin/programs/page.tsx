"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, GraduationCap } from "lucide-react";
import { saveAcademicProgramAction, deleteAcademicProgramAction } from "@/actions/cmsActions";

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  const [title, setTitle] = useState("");
  const [ageGroup, setAgeGroup] = useState("Age 2.5 - 5 Years");
  const [description, setDescription] = useState("");
  const [iconImage, setIconImage] = useState("https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=400&auto=format&fit=crop");
  const [slug, setSlug] = useState("");
  const [curriculum, setCurriculum] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fetchPrograms = async () => {
    try {
      const res = await fetch("/api/admin/programs");
      const data = await res.json();
      if (data.programs) setPrograms(data.programs);
    } catch {}
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await saveAcademicProgramAction({
      id: currentId,
      title,
      ageGroup,
      description,
      iconImage,
      slug,
      curriculum,
      eligibility,
      order: programs.length + 1,
    });
    setIsSaving(false);
    resetForm();
    fetchPrograms();
  };

  const handleEdit = (p: any) => {
    setIsEditing(true);
    setCurrentId(p.id);
    setTitle(p.title);
    setAgeGroup(p.ageGroup);
    setDescription(p.description);
    setIconImage(p.iconImage);
    setSlug(p.slug);
    setCurriculum(p.curriculum || "");
    setEligibility(p.eligibility || "");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this academic program?")) {
      await deleteAcademicProgramAction(id);
      fetchPrograms();
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(undefined);
    setTitle("");
    setAgeGroup("Age 2.5 - 5 Years");
    setDescription("");
    setIconImage("https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=400&auto=format&fit=crop");
    setSlug("");
    setCurriculum("");
    setEligibility("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white">Academic Programs Management</h2>
        <p className="text-xs text-slate-400 mt-0.5">Configure wings (Pre-Primary, Primary, Middle, Secondary, Senior Secondary).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            {isEditing ? <Edit2 className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-blue-400" />}
            <span>{isEditing ? "Edit Program" : "Add Academic Wing"}</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Wing Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Senior Secondary"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Age / Grade Tag</label>
                <input
                  type="text"
                  required
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value)}
                  placeholder="e.g. Grade XI - XII"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Slug</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
              <textarea
                rows={2}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Overview of this wing..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Illustration / Photo URL</label>
              <input
                type="text"
                value={iconImage}
                onChange={(e) => setIconImage(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Curriculum Details</label>
              <input
                type="text"
                value={curriculum}
                onChange={(e) => setCurriculum(e.target.value)}
                placeholder="Key subject streams and pedagogical methods..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
              >
                {isSaving ? "Saving..." : isEditing ? "Update Program" : "Add Program"}
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
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-base font-bold text-white">Active Programs ({programs.length})</h3>

          <div className="space-y-3">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm flex items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                    {prog.ageGroup}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1">{prog.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{prog.description}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(prog)}
                    className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-950/40"
                    aria-label="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(prog.id)}
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
