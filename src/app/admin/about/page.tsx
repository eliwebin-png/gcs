"use client";

import React, { useState, useEffect } from "react";
import { Save, CheckCircle2, User, Eye, Target, HeartHandshake } from "lucide-react";
import {
  updateAboutSectionAction,
  updatePrincipalMessageAction,
  updateDirectorMessageAction,
} from "@/actions/cmsActions";

export default function AdminAboutPage() {
  const [activeTab, setActiveTab] = useState<"about" | "principal" | "director">("about");
  const [status, setStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // About form states
  const [badge, setBadge] = useState("ABOUT OUR SCHOOL");
  const [title, setTitle] = useState("Inspiring Excellence. Nurturing Tomorrow's Leaders.");
  const [description, setDescription] = useState(
    "At Your Public School, we believe every child is unique and has the potential to achieve greatness. Our holistic approach to education blends academics, co-curricular activities, and life skills."
  );
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop");
  const [vision, setVision] = useState("To be a leading institution that inspires and empowers students to shape the future.");
  const [mission, setMission] = useState("To provide quality education that fosters creativity, critical thinking and character.");
  const [values, setValues] = useState("Integrity, Respect, Excellence, Empathy and Responsibility guide everything we do.");

  // Principal Message states
  const [principalName, setPrincipalName] = useState("Dr. Sunita Sharma");
  const [principalQual, setPrincipalQual] = useState("M.Sc., M.Ed., Ph.D. in Educational Leadership");
  const [principalMsg, setPrincipalMsg] = useState(
    "Welcome to Your Public School! For over three decades, our endeavor has been to kindle the fire of curiosity, build ethical foundations, and foster excellence in every child."
  );
  const [principalPhoto, setPrincipalPhoto] = useState("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop");

  // Director Message states
  const [directorName, setDirectorName] = useState("Shri Rajesh V. Verma");
  const [directorDesig, setDirectorDesig] = useState("Managing Director & Trustee");
  const [directorMsg, setDirectorMsg] = useState(
    "Education is not merely about accumulating degrees; it is the harmonious training of head, heart, and hands. Our vision is to provide 21st-century infrastructure while keeping timeless human values at the core."
  );
  const [directorPhoto, setDirectorPhoto] = useState("https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop");

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateAboutSectionAction({
      badge,
      title,
      description,
      imageUrl,
      vision,
      mission,
      values,
      yearsExp: "30+",
    });
    setIsSaving(false);
    setStatus("About School section updated successfully!");
    setTimeout(() => setStatus(null), 3000);
  };

  const handleSavePrincipal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updatePrincipalMessageAction({
      principalName,
      qualification: principalQual,
      message: principalMsg,
      photoUrl: principalPhoto,
    });
    setIsSaving(false);
    setStatus("Principal's Message updated successfully!");
    setTimeout(() => setStatus(null), 3000);
  };

  const handleSaveDirector = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateDirectorMessageAction({
      directorName,
      designation: directorDesig,
      message: directorMsg,
      photoUrl: directorPhoto,
    });
    setIsSaving(false);
    setStatus("Director's Message updated successfully!");
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-black text-white">About & Leadership Management</h2>
        <p className="text-xs text-slate-400 mt-0.5">Manage school mission, vision, values, and leadership desk messages.</p>
      </div>

      {status && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{status}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab("about")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "about" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"
          }`}
        >
          About Section & Values
        </button>
        <button
          onClick={() => setActiveTab("principal")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "principal" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"
          }`}
        >
          Principal's Message
        </button>
        <button
          onClick={() => setActiveTab("director")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "director" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"
          }`}
        >
          Director's Message
        </button>
      </div>

      {/* About Section Form */}
      {activeTab === "about" && (
        <form onSubmit={handleSaveAbout} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Badge Tag</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Main Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Overview Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Featured Campus Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-blue-400 mb-1 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>Vision Statement</span>
              </label>
              <textarea
                rows={3}
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1">
                <Target className="w-3.5 h-3.5" />
                <span>Mission Statement</span>
              </label>
              <textarea
                rows={3}
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-400 mb-1 flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Core Values</span>
              </label>
              <textarea
                rows={3}
                value={values}
                onChange={(e) => setValues(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save About Changes"}</span>
            </button>
          </div>
        </form>
      )}

      {/* Principal Form */}
      {activeTab === "principal" && (
        <form onSubmit={handleSavePrincipal} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Principal Name</label>
              <input
                type="text"
                value={principalName}
                onChange={(e) => setPrincipalName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Academic Qualifications</label>
              <input
                type="text"
                value={principalQual}
                onChange={(e) => setPrincipalQual(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Principal Photo URL</label>
            <input
              type="text"
              value={principalPhoto}
              onChange={(e) => setPrincipalPhoto(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Message to Students & Parents</label>
            <textarea
              rows={6}
              value={principalMsg}
              onChange={(e) => setPrincipalMsg(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Principal Message"}</span>
            </button>
          </div>
        </form>
      )}

      {/* Director Form */}
      {activeTab === "director" && (
        <form onSubmit={handleSaveDirector} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Director Name</label>
              <input
                type="text"
                value={directorName}
                onChange={(e) => setDirectorName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Designation</label>
              <input
                type="text"
                value={directorDesig}
                onChange={(e) => setDirectorDesig(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Director Photo URL</label>
            <input
              type="text"
              value={directorPhoto}
              onChange={(e) => setDirectorPhoto(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Message from the Managing Desk</label>
            <textarea
              rows={6}
              value={directorMsg}
              onChange={(e) => setDirectorMsg(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Director Message"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
