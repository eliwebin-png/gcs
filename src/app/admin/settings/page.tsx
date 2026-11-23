"use client";

import React, { useState, useEffect } from "react";
import { Save, CheckCircle2, Building, Phone, Mail, MapPin, Globe, Share2, MessageCircle, Eye, EyeOff } from "lucide-react";
import { updateSchoolInfoAction, toggleHeroStatsAction } from "@/actions/cmsActions";

export default function AdminSettingsPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // States
  const [showHeroStats, setShowHeroStats] = useState(true);
  const [isTogglingHeroStats, setIsTogglingHeroStats] = useState(false);
  const [schoolName, setSchoolName] = useState("YOUR PUBLIC SCHOOL");
  const [tagline, setTagline] = useState("Nurturing Minds, Building Futures");
  const [phone1, setPhone1] = useState("+91 98765 43210");
  const [phone2, setPhone2] = useState("+91 11223 45678");
  const [email, setEmail] = useState("info@yourpublicschool.edu.in");
  const [admissionEmail, setAdmissionEmail] = useState("admissions@yourpublicschool.edu.in");
  const [address, setAddress] = useState("123 Education Avenue, Knowledge City, New Delhi - 110001");
  const [workingHours, setWorkingHours] = useState("Mon - Sat: 8:00 AM - 4:00 PM");
  const [affiliationBoard, setAffiliationBoard] = useState("CBSE Affiliated");
  const [affiliationNo, setAffiliationNo] = useState("CBSE/AFF/2024/983421");
  const [schoolCode, setSchoolCode] = useState("84920");
  const [facebookUrl, setFacebookUrl] = useState("https://facebook.com");
  const [instagramUrl, setInstagramUrl] = useState("https://instagram.com");
  const [youtubeUrl, setYoutubeUrl] = useState("https://youtube.com");
  const [linkedinUrl, setLinkedinUrl] = useState("https://linkedin.com");
  const [twitterUrl, setTwitterUrl] = useState("https://twitter.com");
  const [whatsappNumber, setWhatsappNumber] = useState("+919876543210");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.info) {
          const i = data.info;
          if (i.schoolName) setSchoolName(i.schoolName);
          if (i.tagline) setTagline(i.tagline);
          if (i.phone1) setPhone1(i.phone1);
          if (i.phone2) setPhone2(i.phone2);
          if (i.email) setEmail(i.email);
          if (i.admissionEmail) setAdmissionEmail(i.admissionEmail);
          if (i.address) setAddress(i.address);
          if (i.workingHours) setWorkingHours(i.workingHours);
          if (i.affiliationBoard) setAffiliationBoard(i.affiliationBoard);
          if (i.affiliationNo) setAffiliationNo(i.affiliationNo);
          if (i.schoolCode) setSchoolCode(i.schoolCode);
          if (i.facebookUrl) setFacebookUrl(i.facebookUrl);
          if (i.instagramUrl) setInstagramUrl(i.instagramUrl);
          if (i.youtubeUrl) setYoutubeUrl(i.youtubeUrl);
          if (i.linkedinUrl) setLinkedinUrl(i.linkedinUrl);
          if (i.twitterUrl) setTwitterUrl(i.twitterUrl);
          if (i.whatsappNumber) setWhatsappNumber(i.whatsappNumber);
        }
      })
      .catch(() => {});

    fetch("/api/admin/hero/stats-toggle")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setShowHeroStats(data.settings.showHeroStats);
        }
      })
      .catch(() => {});
  }, []);

  const handleToggleHeroStats = async () => {
    setIsTogglingHeroStats(true);
    const nextVal = !showHeroStats;
    const res = await toggleHeroStatsAction(nextVal);
    if (res.success) {
      setShowHeroStats(nextVal);
      setStatus(
        nextVal
          ? "Homepage Hero floating stats card is now VISIBLE!"
          : "Homepage Hero floating stats card is now HIDDEN!"
      );
      setTimeout(() => setStatus(null), 3500);
    }
    setIsTogglingHeroStats(false);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSchoolInfoAction({
      schoolName,
      tagline,
      phone1,
      phone2,
      email,
      admissionEmail,
      address,
      workingHours,
      affiliationBoard,
      affiliationNo,
      schoolCode,
      facebookUrl,
      instagramUrl,
      youtubeUrl,
      linkedinUrl,
      twitterUrl,
      whatsappNumber,
    });
    setIsSaving(false);
    setStatus("School information and WhatsApp settings saved successfully!");
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-black text-white">General School Settings</h2>
        <p className="text-xs text-slate-400 mt-0.5">Manage school contact details, WhatsApp direct chat number, CBSE affiliation, and social links.</p>
      </div>

      {status && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{status}</span>
        </div>
      )}

      {/* Section: Homepage Hero Floating Stats Box Visibility */}
      <div className="bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-4 shadow-lg shadow-slate-950/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2.5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Homepage Hero Floating Stats Box
              </h3>
              {showHeroStats ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30 flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>Visible</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[11px] font-bold border border-slate-700 flex items-center gap-1">
                  <EyeOff className="w-3 h-3" />
                  <span>Hidden</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Toggle the translucent floating box (Active Students, Academic Excellence, CBSE, Admissions Open) on the homepage hero section.
            </p>
          </div>

          <button
            type="button"
            disabled={isTogglingHeroStats}
            onClick={handleToggleHeroStats}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer flex-shrink-0 ${
              showHeroStats
                ? "bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30"
                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
            }`}
          >
            {isTogglingHeroStats ? (
              <span>Updating...</span>
            ) : showHeroStats ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span>Hide From Homepage</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>Show On Homepage</span>
              </>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        
        {/* Section 0: Floating WhatsApp Chat Configuration */}
        <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 space-y-3">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span>Floating WhatsApp Quick-Chat Number</span>
          </h3>
          <p className="text-xs text-slate-400">
            This number powers the floating WhatsApp button on the bottom right corner of the website for direct parent and student inquiries. Include country code (e.g. +91 9876543210 or 919876543210).
          </p>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Mobile Number</label>
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="+91 98765 43210 or 919876543210"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-emerald-700/50 text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Section 1: Identity */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <Building className="w-4 h-4" />
            <span>School Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">School Name</label>
              <input
                type="text"
                required
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Motto / Tagline</label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Affiliation */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>Board Affiliation & Regulatory</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Affiliation Board</label>
              <input
                type="text"
                value={affiliationBoard}
                onChange={(e) => setAffiliationBoard(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Affiliation Number</label>
              <input
                type="text"
                value={affiliationNo}
                onChange={(e) => setAffiliationNo(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">School Code</label>
              <input
                type="text"
                value={schoolCode}
                onChange={(e) => setSchoolCode(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Contact Details */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>Contact & Address</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Primary Phone</label>
              <input
                type="text"
                value={phone1}
                onChange={(e) => setPhone1(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Secondary Phone</label>
              <input
                type="text"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">General Inquiries Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Admissions Desk Email</label>
              <input
                type="email"
                value={admissionEmail}
                onChange={(e) => setAdmissionEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Campus Physical Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Working / Office Hours</label>
              <input
                type="text"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Social Media */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            <span>Social Handles & Links</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Facebook URL</label>
              <input
                type="text"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Instagram URL</label>
              <input
                type="text"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">YouTube URL</label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Twitter / X URL</label>
              <input
                type="text"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving Settings..." : "Save All Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
