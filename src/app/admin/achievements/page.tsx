"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Award, Trophy, Medal, Star, GraduationCap, Sparkles } from "lucide-react";
import { saveAchievementAction, deleteAchievementAction } from "@/actions/cmsActions";

export default function AdminAchievementsPage() {
  const [activeTab, setActiveTab] = useState<"students" | "school">("students");
  const [achievements, setAchievements] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  // Form Fields
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Board Toppers");
  const [year, setYear] = useState("98.8%");
  const [iconColor, setIconColor] = useState("emerald");
  const [iconName, setIconName] = useState("School Topper & District Rank 1");
  const [studentName, setStudentName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop");
  const [isSaving, setIsSaving] = useState(false);

  // Default pre-populated Star Students if database doesn't have custom ones yet
  const defaultStudentToppers = [
    {
      id: "demo-t1",
      title: "Rohan Mehta",
      subtitle: "Class XII (Science)",
      year: "98.8%",
      iconName: "School Topper & District Rank 1",
      category: "Board Toppers",
      description: "PHOTO:https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "demo-t2",
      title: "Ananya Gupta",
      subtitle: "Class X (Board)",
      year: "99.2%",
      iconName: "State Rank 3 • 100/100 in Maths",
      category: "Board Toppers",
      description: "PHOTO:https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "demo-t3",
      title: "Arjun Patel",
      subtitle: "Class XII (Commerce)",
      year: "97.6%",
      iconName: "District Rank 2 • 100 in Economics",
      category: "Board Toppers",
      description: "PHOTO:https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: "demo-t4",
      title: "Sanya Kapoor",
      subtitle: "Class XII (Humanities)",
      year: "98.2%",
      iconName: "Stream Topper • 100 in Psychology",
      category: "Board Toppers",
      description: "PHOTO:https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    },
  ];

  const fetchAchievements = async () => {
    try {
      const res = await fetch("/api/admin/achievements");
      const data = await res.json();
      if (data.achievements) setAchievements(data.achievements);
    } catch {}
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  // Filtered lists
  const studentAchievementsInDb = achievements.filter(
    (a) => a.category === "Board Toppers" || a.category === "Olympiads" || a.studentName || (a.description && a.description.startsWith("PHOTO:"))
  );
  const displayStudentsList = studentAchievementsInDb.length > 0 ? studentAchievementsInDb : defaultStudentToppers;

  const schoolAchievementsList = achievements.filter(
    (a) => a.category !== "Board Toppers" && !a.studentName && (!a.description || !a.description.startsWith("PHOTO:"))
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await saveAchievementAction({
      id: currentId && !currentId.startsWith("demo-") ? currentId : undefined,
      title,
      subtitle,
      description: activeTab === "students" ? (photoUrl ? `PHOTO:${photoUrl}` : "") : description,
      category: activeTab === "students" ? category : category,
      year,
      studentName: activeTab === "students" ? (studentName || title) : undefined,
      iconColor,
      iconName,
      order: achievements.length + 1,
    });
    setIsSaving(false);
    resetForm();
    fetchAchievements();
  };

  const handleEdit = (a: any) => {
    setIsEditing(true);
    setCurrentId(a.id);
    setTitle(a.title);
    setSubtitle(a.subtitle);
    if (a.description && a.description.startsWith("PHOTO:")) {
      setPhotoUrl(a.description.replace("PHOTO:", ""));
    } else {
      setDescription(a.description || "");
    }
    setCategory(a.category || (activeTab === "students" ? "Board Toppers" : "Academics"));
    setYear(a.year || (activeTab === "students" ? "98.8%" : "2024-25"));
    setIconColor(a.iconColor || "emerald");
    setIconName(a.iconName || (activeTab === "students" ? "School Topper & District Rank 1" : "Award"));
    setStudentName(a.studentName || a.title || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this record?")) {
      if (!id.startsWith("demo-")) {
        await deleteAchievementAction(id);
      }
      fetchAchievements();
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(undefined);
    setTitle("");
    setSubtitle("");
    setDescription("");
    setCategory(activeTab === "students" ? "Board Toppers" : "Academics");
    setYear(activeTab === "students" ? "98.8%" : "2024-25");
    setIconColor("emerald");
    setIconName(activeTab === "students" ? "School Topper & District Rank 1" : "Award");
    setStudentName("");
    setPhotoUrl("https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white">Achievements & Student Toppers Management</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage Star Student Toppers, Olympiad Champions, Sports Stars, and School-wide Honors.
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 w-fit">
        <button
          onClick={() => {
            setActiveTab("students");
            resetForm();
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "students" ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "text-slate-400 hover:text-white"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Star Students & Board Toppers</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("school");
            resetForm();
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "school" ? "bg-blue-600 text-white shadow-md shadow-blue-600/30" : "text-slate-400 hover:text-white"
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>School Institutional Accolades</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            {isEditing ? <Edit2 className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-blue-400" />}
            <span>
              {isEditing
                ? `Edit ${activeTab === "students" ? "Student Topper" : "School Achievement"}`
                : `Add ${activeTab === "students" ? "Star Student Topper" : "School Achievement"}`}
            </span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            {activeTab === "students" ? (
              /* Student Toppers Form */
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Student Full Name</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        setStudentName(e.target.value);
                      }}
                      placeholder="e.g. Rohan Mehta"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Score / Percentage</label>
                    <input
                      type="text"
                      required
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="e.g. 98.8% or 100/100"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Grade / Class & Stream</label>
                    <input
                      type="text"
                      required
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="e.g. Class XII (Science)"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Category / Exam</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Board Toppers">Board Toppers (CBSE)</option>
                      <option value="Olympiads">Olympiad Champions</option>
                      <option value="Sports Stars">Sports Champions</option>
                      <option value="Competitions">National Competitions</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Rank / Accolade Title</label>
                  <input
                    type="text"
                    required
                    value={iconName}
                    onChange={(e) => setIconName(e.target.value)}
                    placeholder="e.g. School Topper & District Rank 1"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Student Photo URL</label>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                  />
                  {photoUrl && (
                    <div className="mt-2 w-16 h-20 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                      <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* School Accolades Form */
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Achievement Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 100% Board Result"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Subtitle / Summary</label>
                  <input
                    type="text"
                    required
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="e.g. Consistent top performance in CBSE examinations"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Academics">Academics</option>
                      <option value="Sports">Sports</option>
                      <option value="Competitions">Competitions</option>
                      <option value="Olympiads">Olympiads</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Session / Year</label>
                    <input
                      type="text"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="2024-25"
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Detailed Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
              >
                {isSaving ? "Saving..." : isEditing ? "Update Record" : "Save Record"}
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

        {/* List (Dynamically matches the activeTab) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-base font-bold text-white">
            {activeTab === "students"
              ? `Star Students & Toppers (${displayStudentsList.length})`
              : `School Institutional Honors (${schoolAchievementsList.length})`}
          </h3>

          <div className="space-y-3">
            {activeTab === "students" ? (
              /* Students List */
              displayStudentsList.map((stu) => {
                const img =
                  stu.description && stu.description.startsWith("PHOTO:")
                    ? stu.description.replace("PHOTO:", "")
                    : "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop";

                return (
                  <div
                    key={stu.id}
                    className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={img}
                        alt={stu.title}
                        className="w-12 h-14 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white truncate">{stu.title}</h4>
                          <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                            {stu.year}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 truncate">{stu.subtitle}</p>
                        <p className="text-[10px] text-amber-400 font-semibold truncate flex items-center gap-1 mt-0.5">
                          <Medal className="w-3 h-3" />
                          <span>{stu.iconName}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(stu)}
                        className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-950/40"
                        aria-label="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(stu.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              /* School Accolades List */
              schoolAchievementsList.map((ach) => (
                <div
                  key={ach.id}
                  className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm flex items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                      {ach.category} • {ach.year}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1.5">{ach.title}</h4>
                    <p className="text-xs text-slate-400">{ach.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(ach)}
                      className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-950/40"
                      aria-label="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(ach.id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
