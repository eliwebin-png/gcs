"use client";

import React, { useState } from "react";
import { Mail, Phone, Trash2 } from "lucide-react";
import { updateInquiryStatusAction, deleteInquiryAction } from "@/actions/inquiryActions";

interface InquiriesClientProps {
  admissions: any[];
  contacts: any[];
}

export default function InquiriesClient({ admissions, contacts }: InquiriesClientProps) {
  const [tab, setTab] = useState<"admissions" | "contacts">("admissions");

  const handleStatusChange = async (id: string, type: "admission" | "contact", status: string) => {
    await updateInquiryStatusAction(id, type, status);
  };

  const handleDelete = async (id: string, type: "admission" | "contact") => {
    if (confirm("Are you sure you want to delete this inquiry record?")) {
      await deleteInquiryAction(id, type);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white">Inquiries & Communications</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage inbound student applications and parent inquiries.</p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setTab("admissions")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === "admissions" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            Admissions ({admissions.length})
          </button>
          <button
            onClick={() => setTab("contacts")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === "contacts" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            Contact Messages ({contacts.length})
          </button>
        </div>
      </div>

      {/* Admissions Table */}
      {tab === "admissions" && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Applicant & Parent</th>
                  <th className="px-6 py-4">Grade</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Submitted Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {admissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                      No admission inquiries submitted yet.
                    </td>
                  </tr>
                ) : (
                  admissions.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white text-sm">{item.studentName}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">Parent: {item.parentName}</div>
                        {item.message && <p className="text-[10px] text-slate-500 mt-1 italic">"{item.message}"</p>}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                          {item.gradeApplying}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Phone className="w-3 h-3 text-emerald-400" />
                          <span>{item.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Mail className="w-3 h-3 text-blue-400" />
                          <span>{item.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, "admission", e.target.value)}
                          className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="ADMITTED">ADMITTED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(item.id, "admission")}
                          className="p-2 rounded-lg text-rose-400 hover:bg-rose-950/40 transition-colors"
                          aria-label="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contacts Table */}
      {tab === "contacts" && (
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Sender</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                      No contact messages received yet.
                    </td>
                  </tr>
                ) : (
                  contacts.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-white text-sm">{item.name}</div>
                        <div className="text-slate-500 text-[10px]">{item.subject || "General Inquiry"}</div>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-slate-300 line-clamp-2">{item.message}</p>
                      </td>
                      <td className="px-6 py-4 space-y-1">
                        <div className="text-slate-300">{item.email}</div>
                        {item.phone && <div className="text-slate-500 text-[11px]">{item.phone}</div>}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, "contact", e.target.value)}
                          className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-purple-500"
                        >
                          <option value="NEW">NEW</option>
                          <option value="READ">READ</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="RESOLVED">RESOLVED</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(item.id, "contact")}
                          className="p-2 rounded-lg text-rose-400 hover:bg-rose-950/40 transition-colors"
                          aria-label="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
