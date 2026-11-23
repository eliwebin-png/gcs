"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, FileCheck } from "lucide-react";
import { saveMandatoryDisclosureAction, deleteMandatoryDisclosureAction } from "@/actions/cmsActions";

export default function AdminDisclosuresPage() {
  const [disclosures, setDisclosures] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  const [title, setTitle] = useState("");
  const [documentNo, setDocumentNo] = useState("");
  const [fileUrl, setFileUrl] = useState("#");
  const [category, setCategory] = useState("Documents & Information");
  const [isSaving, setIsSaving] = useState(false);

  const fetchDisclosures = async () => {
    try {
      const res = await fetch("/api/admin/disclosures");
      const data = await res.json();
      if (data.disclosures) setDisclosures(data.disclosures);
    } catch {}
  };

  useEffect(() => {
    fetchDisclosures();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await saveMandatoryDisclosureAction({
      id: currentId,
      title,
      documentNo,
      fileUrl,
      category,
    });
    setIsSaving(false);
    resetForm();
    fetchDisclosures();
  };

  const handleEdit = (d: any) => {
    setIsEditing(true);
    setCurrentId(d.id);
    setTitle(d.title);
    setDocumentNo(d.documentNo || "");
    setFileUrl(d.fileUrl);
    setCategory(d.category);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this mandatory disclosure certificate?")) {
      await deleteMandatoryDisclosureAction(id);
      fetchDisclosures();
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(undefined);
    setTitle("");
    setDocumentNo("");
    setFileUrl("#");
    setCategory("Documents & Information");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white">CBSE Mandatory Public Disclosures</h2>
        <p className="text-xs text-slate-400 mt-0.5">Upload affiliation extensions, building safety NOCs, fire certificates, and fee structures.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            {isEditing ? <Edit2 className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-blue-400" />}
            <span>{isEditing ? "Edit Certificate" : "Add Statutory Document"}</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Document / Certificate Name</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Building Safety Certificate"
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
                  <option value="Documents & Information">Documents & Information</option>
                  <option value="Staff & Infrastructure">Staff & Infrastructure</option>
                  <option value="Results & Academics">Results & Academics</option>
                  <option value="General Information">General Information</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Document / Certificate No.</label>
                <input
                  type="text"
                  value={documentNo}
                  onChange={(e) => setDocumentNo(e.target.value)}
                  placeholder="PWD/BLD/9924"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">PDF File URL</label>
              <input
                type="text"
                required
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="https://... or /downloads/cert.pdf"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
              >
                {isSaving ? "Saving..." : isEditing ? "Update Certificate" : "Add Certificate"}
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
          <h3 className="text-base font-bold text-white">Compliance Documents ({disclosures.length})</h3>

          <div className="space-y-3">
            {disclosures.map((d) => (
              <div
                key={d.id}
                className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-blue-400 uppercase">{d.category}</span>
                    <h4 className="text-xs font-bold text-white">{d.title}</h4>
                    {d.documentNo && <span className="text-[10px] text-slate-400">Doc No: {d.documentNo}</span>}
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
