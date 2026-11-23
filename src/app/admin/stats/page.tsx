"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Layers, CheckCircle2 } from "lucide-react";
import { updateStatCounterAction, createStatCounterAction, deleteStatCounterAction } from "@/actions/cmsActions";

export default function AdminStatsPage() {
  const [stats, setStats] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [iconName, setIconName] = useState("Users");
  const [colorClass, setColorClass] = useState("blue");
  const [isSaving, setIsSaving] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.stats) setStats(data.stats);
    } catch {}
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    if (isEditing && currentId) {
      await updateStatCounterAction(currentId, {
        label,
        value,
        iconName,
        colorClass,
        order: stats.length + 1,
      });
    } else {
      await createStatCounterAction({
        label,
        value,
        iconName,
        colorClass,
        order: stats.length + 1,
      });
    }
    setIsSaving(false);
    resetForm();
    fetchStats();
  };

  const handleEdit = (s: any) => {
    setIsEditing(true);
    setCurrentId(s.id);
    setLabel(s.label);
    setValue(s.value);
    setIconName(s.iconName);
    setColorClass(s.colorClass);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this metric counter?")) {
      await deleteStatCounterAction(id);
      fetchStats();
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(undefined);
    setLabel("");
    setValue("");
    setIconName("Users");
    setColorClass("blue");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white">Stat Counters & Metrics</h2>
        <p className="text-xs text-slate-400 mt-0.5">Edit the 5 floating metric pills displayed directly below the hero section.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            {isEditing ? <Edit2 className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-blue-400" />}
            <span>{isEditing ? "Edit Stat Counter" : "Add Stat Counter"}</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Metric Number / Value</label>
              <input
                type="text"
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. 2500+ or 100%"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Metric Label</label>
              <input
                type="text"
                required
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Active Students"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Icon Style</label>
                <select
                  value={iconName}
                  onChange={(e) => setIconName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                >
                  <option value="Users">Students (Users)</option>
                  <option value="UserCheck">Teachers (UserCheck)</option>
                  <option value="Trophy">Trophy / Years</option>
                  <option value="Medal">Medal / Results</option>
                  <option value="Monitor">Classrooms (Monitor)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Color Theme</label>
                <select
                  value={colorClass}
                  onChange={(e) => setColorClass(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                >
                  <option value="blue">Blue</option>
                  <option value="emerald">Emerald</option>
                  <option value="amber">Amber</option>
                  <option value="purple">Purple</option>
                  <option value="rose">Rose</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
              >
                {isSaving ? "Saving..." : isEditing ? "Update Stat" : "Create Stat"}
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
          <h3 className="text-base font-bold text-white">Active Stat Counters ({stats.length})</h3>

          <div className="space-y-3">
            {stats.map((s) => (
              <div
                key={s.id}
                className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm flex items-center justify-between gap-4"
              >
                <div>
                  <div className="text-xl font-black text-white">{s.value}</div>
                  <div className="text-xs text-slate-400 font-semibold">{s.label}</div>
                  <span className="text-[10px] text-blue-400 font-mono">Icon: {s.iconName} • Color: {s.colorClass}</span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(s)}
                    className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-950/40"
                    aria-label="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
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
