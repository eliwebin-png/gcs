"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  Sparkles,
  Image as ImageIcon,
  Eye,
  EyeOff,
  ExternalLink,
  Users,
  Trophy,
  BookOpen,
  CalendarCheck,
} from "lucide-react";
import {
  createHeroSlideAction,
  updateHeroSlideAction,
  deleteHeroSlideAction,
  toggleHeroStatsAction,
  getHeroStatsVisibilityAction,
} from "@/actions/cmsActions";

export default function AdminHeroPage() {
  const [slides, setSlides] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // Floating Stats Card Visibility State
  const [showHeroStats, setShowHeroStats] = useState(true);
  const [isTogglingStats, setIsTogglingStats] = useState(false);
  const [statsStatus, setStatsStatus] = useState<string | null>(null);

  // Form State
  const [badge, setBadge] = useState("Admissions Open 2025-26");
  const [heading, setHeading] = useState("Building Bright Futures Through Quality Education");
  const [subheading, setSubheading] = useState("Empowering students through academic excellence, innovation, leadership, and values in a nurturing learning environment.");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop");
  const [primaryCtaText, setPrimaryCtaText] = useState("Apply Now");
  const [primaryCtaLink, setPrimaryCtaLink] = useState("/admissions");
  const [secondaryCtaText, setSecondaryCtaText] = useState("Virtual Tour");
  const [secondaryCtaLink, setSecondaryCtaLink] = useState("/infrastructure");
  const [isActive, setIsActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSlidesAndSettings = async () => {
    try {
      const [slidesRes, statsRes] = await Promise.all([
        fetch("/api/admin/hero"),
        fetch("/api/admin/hero/stats-toggle"),
      ]);
      const slidesData = await slidesRes.json();
      if (slidesData.slides) setSlides(slidesData.slides);

      const statsData = await statsRes.json();
      if (statsData.settings) {
        setShowHeroStats(statsData.settings.showHeroStats);
      }
    } catch {}
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSlidesAndSettings();
  }, []);

  const handleToggleStats = async () => {
    setIsTogglingStats(true);
    const nextVal = !showHeroStats;
    const res = await toggleHeroStatsAction(nextVal);
    if (res.success) {
      setShowHeroStats(nextVal);
      setStatsStatus(
        nextVal
          ? "Hero floating stats card is now VISIBLE on homepage!"
          : "Hero floating stats card is now HIDDEN from homepage!"
      );
      setTimeout(() => setStatsStatus(null), 3500);
    }
    setIsTogglingStats(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (isEditing && currentId) {
      await updateHeroSlideAction(currentId, {
        badge,
        heading,
        subheading,
        imageUrl,
        primaryCtaText,
        primaryCtaLink,
        secondaryCtaText,
        secondaryCtaLink,
        isActive,
      });
    } else {
      await createHeroSlideAction({
        badge,
        heading,
        subheading,
        imageUrl,
        primaryCtaText,
        primaryCtaLink,
        secondaryCtaText,
        secondaryCtaLink,
        isActive,
        order: slides.length + 1,
      });
    }
    setIsSubmitting(false);
    resetForm();
    fetchSlidesAndSettings();
  };

  const handleEdit = (slide: any) => {
    setIsEditing(true);
    setCurrentId(slide.id);
    setBadge(slide.badge);
    setHeading(slide.heading);
    setSubheading(slide.subheading);
    setImageUrl(slide.imageUrl);
    setPrimaryCtaText(slide.primaryCtaText || "Apply Now");
    setPrimaryCtaLink(slide.primaryCtaLink || "/admissions");
    setSecondaryCtaText(slide.secondaryCtaText || "Virtual Tour");
    setSecondaryCtaLink(slide.secondaryCtaLink || "/infrastructure");
    setIsActive(slide.isActive !== undefined ? slide.isActive : true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this hero slide?")) {
      await deleteHeroSlideAction(id);
      fetchSlidesAndSettings();
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(undefined);
    setBadge("Admissions Open 2025-26");
    setHeading("Building Bright Futures Through Quality Education");
    setSubheading("Empowering students through academic excellence, innovation, leadership, and values in a nurturing learning environment.");
    setImageUrl("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop");
    setPrimaryCtaText("Apply Now");
    setPrimaryCtaLink("/admissions");
    setSecondaryCtaText("Virtual Tour");
    setSecondaryCtaLink("/infrastructure");
    setIsActive(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white">Hero Slider Management</h2>
        <p className="text-xs text-slate-400 mt-0.5">Customize homepage hero banners, typography, badges, images, call-to-actions, and floating cards.</p>
      </div>

      {/* Floating Stats Card Show/Hide Control Panel */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4 shadow-lg shadow-slate-950/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-bold text-white">
                Homepage Hero Floating Stats Box
              </h3>
              {showHeroStats ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Currently Visible</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 text-xs font-bold border border-slate-700 flex items-center gap-1.5">
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Currently Hidden</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Show or hide the translucent floating statistics card (2500+ Active Students, 30 Years Academic Excellence, CBSE Curriculum, Admissions Open) on the right side of the hero section.
            </p>
          </div>

          <button
            type="button"
            disabled={isTogglingStats}
            onClick={handleToggleStats}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer flex-shrink-0 ${
              showHeroStats
                ? "bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30"
                : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
            }`}
          >
            {isTogglingStats ? (
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

        {/* Live Preview of the Box */}
        <div className="pt-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
            Card Preview ({showHeroStats ? "Shown on Hero section" : "Currently hidden on Hero section"})
          </span>
          <div
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all max-w-sm ${
              showHeroStats
                ? "bg-slate-950/80 border-slate-800 opacity-100"
                : "bg-slate-950/40 border-slate-900 opacity-45 grayscale"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs">2500+</div>
                  <div className="text-[10px] text-slate-400">Active Students</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs">30 Years</div>
                  <div className="text-[10px] text-slate-400">Academic Excellence</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs">CBSE</div>
                  <div className="text-[10px] text-slate-400">Curriculum (K-12)</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <CalendarCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-white text-xs">Admissions</div>
                  <div className="text-[10px] text-slate-400">Open 2025-26 Session</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {statsStatus && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <Check className="w-4 h-4" />
            <span>{statsStatus}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              {isEditing ? <Edit2 className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-blue-400" />}
              <span>{isEditing ? "Edit Hero Slide" : "Add New Hero Slide"}</span>
            </h3>
            {isEditing && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                Editing Mode
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Badge Tag</label>
              <input
                type="text"
                required
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Admissions Open 2025-26"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Main Heading</label>
              <input
                type="text"
                required
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="e.g. Building Bright Futures Through Quality Education"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
              />
              <p className="text-[10px] text-slate-500 mt-1">Tip: The word "Bright" will automatically be highlighted in gold!</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Subheading Paragraph</label>
              <textarea
                rows={2}
                required
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
                placeholder="Brief introduction or motto..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Background Image URL (Any image link / CDN / local URL)</label>
              <input
                type="text"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... or https://your-cdn.com/school.jpg or /images/hero.jpg"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
              />
              
              {/* Image Preview */}
              {imageUrl && (
                <div className="mt-2.5 rounded-2xl overflow-hidden border border-slate-800 h-32 relative bg-slate-950">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <div className="absolute bottom-1 right-2 px-2 py-0.5 rounded bg-black/60 text-[10px] text-slate-300">
                    Live Image Preview
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Primary CTA Text</label>
                <input
                  type="text"
                  value={primaryCtaText}
                  onChange={(e) => setPrimaryCtaText(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Primary CTA Link</label>
                <input
                  type="text"
                  value={primaryCtaLink}
                  onChange={(e) => setPrimaryCtaLink(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Secondary CTA Text</label>
                <input
                  type="text"
                  value={secondaryCtaText}
                  onChange={(e) => setSecondaryCtaText(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Secondary CTA Link</label>
                <input
                  type="text"
                  value={secondaryCtaLink}
                  onChange={(e) => setSecondaryCtaLink(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded text-blue-600 bg-slate-950 border-slate-800"
                />
                <span className="font-semibold">Active Slide</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? "Saving..." : isEditing ? "Update Hero Slide" : "Publish Hero Slide"}</span>
                <Sparkles className="w-4 h-4" />
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Existing Slides List */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-base font-bold text-white">Active Slides ({slides.length})</h3>

          <div className="space-y-4">
            {slides.map((s) => (
              <div
                key={s.id}
                className={`bg-slate-900 rounded-3xl p-5 border shadow-md space-y-3 relative group transition-all ${
                  currentId === s.id ? "border-amber-500/80 bg-slate-900/90" : "border-slate-800"
                }`}
              >
                {/* Thumbnail image and details */}
                <div className="flex items-start gap-4">
                  <div className="w-20 h-16 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0">
                    <img
                      src={s.imageUrl}
                      alt={s.heading}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                      {s.badge}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1 truncate">{s.heading}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{s.subheading}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <div className="text-[11px] text-slate-500">
                    CTA: <strong className="text-slate-300">{s.primaryCtaText}</strong> ({s.primaryCtaLink})
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-bold transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 transition-colors"
                      aria-label="Delete slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
