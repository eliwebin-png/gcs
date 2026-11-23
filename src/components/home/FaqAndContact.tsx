"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Navigation,
} from "lucide-react";
import { submitContactMessageAction } from "@/actions/inquiryActions";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqAndContactProps {
  faqs?: FAQItem[];
  address?: string;
  phone1?: string;
  phone2?: string;
  email?: string;
  workingHours?: string;
}

export default function FaqAndContact({
  faqs,
  address = "Vill- Gidhaur, Post- Gidhaur, Dist- Jamui - Pin: 811305, Jamui, Bihar",
  phone1 = "+91 8409254393",
  phone2 = "+91 9934485443",
  email = "info@gidhaurcentralschool.com",
  workingHours = "Mon - Sat: 8:00 AM - 3:30 PM",
}: FaqAndContactProps) {
  const defaultFaqs: FAQItem[] = [
    {
      id: "1",
      question: "What curriculum does Gidhaur Central School follow?",
      answer: "We follow the CBSE patterned holistic curriculum from Pre-Primary through Grade X/XII, emphasizing academic mastery, Hindi, English, Mathematics, Science experiments, and moral values under our motto 'Duty • Devotion • Discipline'.",
    },
    {
      id: "2",
      question: "How can I apply for admission?",
      answer: "You can apply directly online by clicking 'Apply Now' or visit our school office at Gidhaur from 8:00 AM to 3:30 PM, Monday through Saturday.",
    },
    {
      id: "3",
      question: "Is transport facility available for nearby villages and towns?",
      answer: "Yes, safe school buses and van transport facilities operate across Gidhaur, Jamui, and neighboring village routes with strict safety oversight.",
    },
    {
      id: "4",
      question: "What are the regular school timings?",
      answer: "Pre-Primary (Nursery to UKG): 8:00 AM to 12:30 PM | Primary & Middle (Grades I to VIII): 8:00 AM to 2:30 PM | High School: 8:00 AM to 3:00 PM.",
    },
    {
      id: "5",
      question: "What documents are required during admission?",
      answer: "Birth Certificate, previous academic progress report, 4 passport size photos of the student, parent Aadhaar cards, and Transfer Certificate (if applicable).",
    },
  ];

  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Form State
  const [name, setName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMsg, setResponseMsg] = useState<{ success: boolean; text: string } | null>(null);

  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Gidhaur Central School, Gidhaur, Jamui, Bihar 811305"
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMsg(null);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", emailInput);
    formData.append("phone", phone);
    formData.append("message", message);
    formData.append("subject", "Website Contact Form - Gidhaur Central School");

    const res = await submitContactMessageAction(formData);
    setIsSubmitting(false);

    if (res.success) {
      setResponseMsg({ success: true, text: res.message || "Message sent successfully!" });
      setName("");
      setEmailInput("");
      setPhone("");
      setMessage("");
    } else {
      setResponseMsg({ success: false, text: res.error || "Failed to send message." });
    }
  };

  return (
    <section className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* ================= LEFT COLUMN: FAQs & Interactive Location Map ================= */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Got Questions? We Have Answers.
              </h2>
            </div>

            {/* Accordion list */}
            <div className="space-y-3">
              {displayFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={faq.id || idx}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ================= INTERACTIVE CAMPUS MAP SECTION ================= */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-md space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Campus Location Map</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Gidhaur, Jamui, Bihar - 811305</p>
                  </div>
                </div>

                <a
                  href={googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all hover:scale-105"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Google Map Embedded Frame */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 h-64 sm:h-72 w-full relative bg-slate-100 shadow-inner">
                <iframe
                  title="Gidhaur Central School Campus Map"
                  src="https://maps.google.com/maps?q=Gidhaur,%20Jamui,%20Bihar%20811305&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>📍 Vill- Gidhaur, Post- Gidhaur, Dist- Jamui (Bihar)</span>
                <a
                  href={googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Open in App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: GET IN TOUCH ================= */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                GET IN TOUCH
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Connect With Our Team
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              {responseMsg && (
                <div
                  className={`p-3.5 rounded-xl flex items-center gap-2.5 text-xs font-medium ${
                    responseMsg.success
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                >
                  {responseMsg.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
                  <span>{responseMsg.text}</span>
                </div>
              )}

              <div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your inquiry or remarks..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Contact Details List */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Address</span>
                  <span className="leading-relaxed">{address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Phone</span>
                  <span className="font-semibold text-slate-700">{phone1} | {phone2}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Email</span>
                  <span className="text-slate-700">{email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-sm">Office Hours</span>
                  <span>{workingHours}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
