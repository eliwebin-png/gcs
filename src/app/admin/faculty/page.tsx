"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Users, GraduationCap } from "lucide-react";
import { saveFacultyMemberAction, deleteFacultyMemberAction } from "@/actions/cmsActions";

export default function AdminFacultyPage() {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("Science");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("10+ Years");
  const [photoUrl, setPhotoUrl] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const fetchFaculty = async () => {
    try {
      const res = await fetch("/api/admin/faculty");
      const data = await res.json();
      if (data.faculty) setFaculty(data.faculty);
    } catch {}
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await saveFacultyMemberAction({
      id: currentId,
      name,
      designation,
      department,
      qualification,
      experience,
      photoUrl,
      email,
      order: faculty.length + 1,
    });
    setIsSaving(false);
    resetForm();
    fetchFaculty();
  };

  const handleEdit = (f: any) => {
    setIsEditing(true);
    setCurrentId(f.id);
    setName(f.name);
    setDesignation(f.designation);
    setDepartment(f.department);
    setQualification(f.qualification);
    setExperience(f.experience);
    setPhotoUrl(f.photoUrl);
    setEmail(f.email || "");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this faculty record?")) {
      await deleteFacultyMemberAction(id);
      fetchFaculty();
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(undefined);
    setName("");
    setDesignation("");
    setDepartment("Science");
    setQualification("");
    setExperience("10+ Years");
    setPhotoUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop");
    setEmail("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white">Faculty & Staff Directory</h2>
        <p className="text-xs text-slate-400 mt-0.5">Manage teachers, HODs, coordinators, and subject specialists.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            {isEditing ? <Edit2 className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-blue-400" />}
            <span>{isEditing ? "Edit Faculty Profile" : "Add Faculty Member"}</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Teacher Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Arvind K. Saxena"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Designation</label>
                <input
                  type="text"
                  required
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. HOD Physics"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                >
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Languages">Languages</option>
                  <option value="Primary">Primary Wing</option>
                  <option value="Sports">Physical Education</option>
                  <option value="Arts">Performing Arts</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Qualifications</label>
              <input
                type="text"
                required
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="e.g. Ph.D. in Physics, M.Sc., B.Ed."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Experience</label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="15+ Years"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Official Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@school.edu.in"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Photo URL</label>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
              >
                {isSaving ? "Saving..." : isEditing ? "Update Profile" : "Add Faculty Member"}
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
          <h3 className="text-base font-bold text-white">Current Faculty ({faculty.length})</h3>

          <div className="space-y-3">
            {faculty.map((f) => (
              <div
                key={f.id}
                className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={f.photoUrl}
                    alt={f.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{f.name}</h4>
                    <p className="text-[10px] text-blue-400">{f.designation} • {f.department}</p>
                    <p className="text-[10px] text-slate-400">{f.qualification} (Exp: {f.experience})</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(f)}
                    className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-950/40"
                    aria-label="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(f.id)}
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
