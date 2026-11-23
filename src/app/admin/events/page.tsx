"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Calendar, MapPin, Clock } from "lucide-react";
import { saveEventAction, deleteEventAction } from "@/actions/cmsActions";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop");
  const [location, setLocation] = useState("Main Sports Complex & Ground");
  const [eventDate, setEventDate] = useState("2025-11-20");
  const [time, setTime] = useState("08:30 AM - 04:00 PM");
  const [status, setStatus] = useState("UPCOMING");
  const [isSaving, setIsSaving] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/admin/events");
      const data = await res.json();
      if (data.events) setEvents(data.events);
    } catch {}
  };

  useEffect(() => {
    fetchEvents();
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
    await saveEventAction({
      id: currentId,
      title,
      slug,
      description,
      thumbnail,
      location,
      eventDate: new Date(eventDate),
      time,
      status,
      isFeatured: true,
    });
    setIsSaving(false);
    resetForm();
    fetchEvents();
  };

  const handleEdit = (item: any) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setTitle(item.title);
    setSlug(item.slug);
    setDescription(item.description);
    setThumbnail(item.thumbnail);
    setLocation(item.location);
    setEventDate(new Date(item.eventDate).toISOString().split("T")[0]);
    setTime(item.time);
    setStatus(item.status);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this school event?")) {
      await deleteEventAction(id);
      fetchEvents();
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(undefined);
    setTitle("");
    setSlug("");
    setDescription("");
    setThumbnail("https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop");
    setLocation("Main Sports Complex & Ground");
    setEventDate("2025-11-20");
    setTime("08:30 AM - 04:00 PM");
    setStatus("UPCOMING");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-white">School Events Management</h2>
        <p className="text-xs text-slate-400 mt-0.5">Manage sports carnivals, annual functions, exhibitions, and competitions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            {isEditing ? <Edit2 className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-blue-400" />}
            <span>{isEditing ? "Edit Event" : "Schedule New Event"}</span>
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Event Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Annual Sports Carnival 2025"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
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
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Time</label>
                <input
                  type="text"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="09:00 AM - 02:00 PM"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Location / Venue</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                >
                  <option value="UPCOMING">UPCOMING</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
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

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all"
              >
                {isSaving ? "Saving..." : isEditing ? "Update Event" : "Save & Publish Event"}
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

        {/* Event List */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-base font-bold text-white">Scheduled Events ({events.length})</h3>

          <div className="space-y-3">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm flex items-center justify-between gap-4"
              >
                <img
                  src={ev.thumbnail}
                  alt={ev.title}
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{ev.title}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{ev.location}</p>
                  <span className="text-[10px] text-blue-400 block mt-0.5">
                    {new Date(ev.eventDate).toLocaleDateString()} • {ev.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(ev)}
                    className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-950/40"
                    aria-label="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(ev.id)}
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
