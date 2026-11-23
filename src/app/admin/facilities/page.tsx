"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Building2 } from "lucide-react";
import { saveFacilityAction, deleteFacilityAction } from "@/actions/cmsActions";

export default function AdminFacilitiesPage() {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop");
  const [iconName, setIconName] = useState("Monitor");
  const [isSaving, setIsSaving] = useState(false);

  const fetchFacilities = async () => {
    try {
      const res = await fetch("/api/admin/facilities");
      const data = await res.json();
      if (data.facilities) setFacilities(data.facilities);
    } catch {}
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await saveFacilityAction({
      id: currentId,
      title,
      description,
      imageUrl,
      iconName,
      order: facilities.length + 1,
      isFeatured: true,
    });
    setIsSaving(false);
    resetForm();
    fetchFacilities();
  };

  const handleEdit = (f: any) => {
    setIsEditing(true);
    setCurrentId(f.id);
    setTitle(f.title);
    setDescription(f.description || "");
    setImageUrl(f.imageUrl);
    setIconName(f.iconName || "Monitor");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this facility item?")) {
      await deleteFacilityAction(id);
      fetchFacilities();
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(undefined);
    setTitle("");
    setDescription("");
    setImageUrl("https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop");
    setIconName("Monitor");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white">Campus Facilities & Infrastructure</h2>
        <p className="text-xs text-slate-400 mt-0.5">Manage science labs, robotics hubs, library, sports fields, and studios.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            {isEditing ? <Edit2 className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-blue-400" />}
            <span>{isEditing ? "Edit Facility" : "Add Facility"}</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Facility Name</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Artificial Intelligence Lab"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Icon Style</label>
              <select
                value={iconName}
                onChange={(e) => setIconName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              >
                <option value="Monitor">Computer / Monitor</option>
                <option value="FlaskConical">Science Lab</option>
                <option value="Cpu">Robotics & Tech</option>
                <option value="BookOpen">Library</option>
                <option value="Trophy">Sports & Athletics</option>
                <option value="Music">Music Studio</option>
                <option value="Palette">Art & Design</option>
                <option value="Coffee">Cafeteria / Dining</option>
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
              <label className="block text-xs font-bold text-slate-300 mb-1">Short Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Key equipment, safety standards, capacity..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
              >
                {isSaving ? "Saving..." : isEditing ? "Update Facility" : "Add Facility"}
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
          <h3 className="text-base font-bold text-white">Campus Facilities ({facilities.length})</h3>

          <div className="grid grid-cols-2 gap-4">
            {facilities.map((fac) => (
              <div
                key={fac.id}
                className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-md group relative flex flex-col justify-between"
              >
                <div className="h-32 relative">
                  <img src={fac.imageUrl} alt={fac.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  
                  <div className="absolute top-2 right-2 flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(fac)}
                      className="p-1 rounded-lg bg-blue-600/90 text-white"
                      aria-label="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(fac.id)}
                      className="p-1 rounded-lg bg-rose-600/90 text-white"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-3">
                  <h4 className="text-xs font-bold text-white truncate">{fac.title}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{fac.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
