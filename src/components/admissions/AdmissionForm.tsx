"use client";

import React, { useState } from "react";
import { submitAdmissionInquiryAction } from "@/actions/inquiryActions";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";

export default function AdmissionForm() {
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gradeApplying, setGradeApplying] = useState("Grade I");
  const [prevSchool, setPrevSchool] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData();
    formData.append("studentName", studentName);
    formData.append("parentName", parentName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("gradeApplying", gradeApplying);
    formData.append("prevSchool", prevSchool);
    formData.append("message", message);

    const res = await submitAdmissionInquiryAction(formData);
    setIsSubmitting(false);

    if (res.success) {
      setStatus({ success: true, text: res.message || "Application submitted successfully!" });
      setStudentName("");
      setParentName("");
      setEmail("");
      setPhone("");
      setPrevSchool("");
      setMessage("");
    } else {
      setStatus({ success: false, text: res.error || "Failed to submit application." });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          ONLINE REGISTRATION
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
          Apply for Admission
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Please complete the preliminary application form below. Our admissions office will reach out within 24 hours.
        </p>
      </div>

      {status && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${
            status.success
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {status.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600" />
          )}
          <span>{status.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Student Full Name *
            </label>
            <input
              type="text"
              required
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Parent / Guardian Name *
            </label>
            <input
              type="text"
              required
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="e.g. Ramesh Sharma"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Parent Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@domain.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Parent Mobile Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 9876543210"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Grade Applying For *
            </label>
            <select
              value={gradeApplying}
              onChange={(e) => setGradeApplying(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:border-blue-500"
            >
              <option value="Pre-Nursery / Nursery">Pre-Nursery / Nursery (Age 2.5 - 3.5)</option>
              <option value="Kindergarten (LKG / UKG)">Kindergarten (LKG / UKG)</option>
              <option value="Grade I">Grade I</option>
              <option value="Grade II - V">Grade II - V (Primary)</option>
              <option value="Grade VI - VIII">Grade VI - VIII (Middle)</option>
              <option value="Grade IX">Grade IX</option>
              <option value="Grade XI (Science)">Grade XI (Science - PCM/PCB)</option>
              <option value="Grade XI (Commerce)">Grade XI (Commerce)</option>
              <option value="Grade XI (Humanities)">Grade XI (Humanities)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Previous School (if any)
            </label>
            <input
              type="text"
              value={prevSchool}
              onChange={(e) => setPrevSchool(e.target.value)}
              placeholder="School name & city"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Special Inquiries or Remarks
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Provide any additional comments, transport requirements, or questions..."
            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
        >
          <span>{isSubmitting ? "Submitting Application..." : "Submit Admission Inquiry"}</span>
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
