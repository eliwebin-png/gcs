"use client";

import React, { useState } from "react";
import Link from "next/link";
import SchoolLogo from "@/components/ui/SchoolLogo";
import { Send, CheckCircle2 } from "lucide-react";

interface FooterProps {
  schoolName?: string;
  tagline?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  whatsappNumber?: string;
}

// Crisp inline SVGs for brand icons
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

// Authentic crisp WhatsApp Brand Vector Icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 2C8.268 2 2 8.268 2 16c0 2.657.74 5.143 2.023 7.264L2.3 29.7l6.634-1.687A13.93 13.93 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.667a11.603 11.603 0 01-5.918-1.614l-.424-.251-4.394 1.117 1.173-4.22-.276-.438A11.608 11.608 0 014.333 16c0-6.443 5.224-11.667 11.667-11.667 6.443 0 11.667 5.224 11.667 11.667 0 6.443-5.224 11.667-11.667 11.667zm6.386-8.739c-.35-.175-2.072-1.022-2.393-1.139-.321-.117-.554-.175-.788.175-.233.35-.904 1.139-1.108 1.373-.204.233-.408.262-.758.087-.35-.175-1.479-.545-2.817-1.738-1.041-.928-1.744-2.075-1.948-2.425-.204-.35-.022-.539.153-.713.158-.157.35-.408.525-.612.175-.204.233-.35.35-.584.117-.233.058-.438-.029-.612-.087-.175-.788-1.9-1.08-2.6-.284-.683-.573-.59-.788-.602-.204-.01-.438-.012-.671-.012-.233 0-.613.087-.933.438-.321.35-1.226 1.198-1.226 2.921s1.255 3.388 1.43 3.621c.175.233 2.47 3.772 5.984 5.289.836.361 1.489.577 1.998.739.84.267 1.604.229 2.209.139.674-.101 2.072-.847 2.364-1.664.292-.817.292-1.518.204-1.664-.087-.146-.321-.233-.671-.408z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer({
  schoolName = "GIDHAUR CENTRAL SCHOOL",
  tagline = "Duty • Devotion • Discipline",
  facebookUrl = "https://facebook.com",
  instagramUrl = "https://instagram.com",
  youtubeUrl = "https://youtube.com",
  linkedinUrl = "https://linkedin.com",
  whatsappNumber = "+918409254393",
}: FooterProps) {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setEmailInput("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  // Clean WhatsApp number removing non-numeric characters except plus
  const cleanWhatsappNumber = (whatsappNumber || "+919876543210").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${encodeURIComponent(
    `Hello! I would like to inquire about admissions and information at ${schoolName}.`
  )}`;

  return (
    <footer className="bg-[#0B1528] text-slate-300 pt-16 pb-8 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Column 1: School Identity */}
          <div className="lg:col-span-2 space-y-4">
            <SchoolLogo variant="dark" schoolName={schoolName} tagline={tagline} />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              A premier institution dedicated to academic excellence and all round development of students through experiential learning, strong moral values, and global pedagogical standards.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-pink-600/20 text-pink-400 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/academics" className="hover:text-blue-400 transition-colors">Academics</Link></li>
              <li><Link href="/infrastructure" className="hover:text-blue-400 transition-colors">Facilities</Link></li>
              <li><Link href="/gallery" className="hover:text-blue-400 transition-colors">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Academic Links */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base tracking-wide">Academic Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/academics" className="hover:text-blue-400 transition-colors">Curriculum</Link></li>
              <li><Link href="/achievements" className="hover:text-blue-400 transition-colors">Co-Curricular</Link></li>
              <li><Link href="/notice-board" className="hover:text-blue-400 transition-colors">Exam & Results</Link></li>
              <li><Link href="/downloads" className="hover:text-blue-400 transition-colors">Homework & Downloads</Link></li>
              <li><Link href="/principal-message" className="hover:text-blue-400 transition-colors">Counselling</Link></li>
              <li><Link href="/career" className="hover:text-blue-400 transition-colors">Career Guidance</Link></li>
            </ul>
          </div>

          {/* Column 4: Admissions & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base tracking-wide">Admissions</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/admissions" className="hover:text-blue-400 transition-colors">Admission Process</Link></li>
              <li><Link href="/admissions" className="hover:text-blue-400 transition-colors">Fee Structure</Link></li>
              <li><Link href="/admissions" className="hover:text-blue-400 transition-colors">Required Documents</Link></li>
              <li><Link href="/downloads" className="hover:text-blue-400 transition-colors">Admission Form</Link></li>
              <li><Link href="/faq" className="hover:text-blue-400 transition-colors">FAQs</Link></li>
            </ul>

            <div className="pt-3">
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-2">Newsletter</h4>
              <p className="text-xs text-slate-400 mb-2">Subscribe to get updates on events, admissions and latest news.</p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs py-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-1.5">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors flex-shrink-0"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {schoolName}. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms & Conditions</Link>
            <Link href="/mandatory-disclosure" className="hover:text-slate-400 transition-colors">Mandatory Disclosure</Link>
          </div>
        </div>
      </div>

      {/* Floating Authentic WhatsApp Direct Chat Round Icon with Smooth Animation */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer border-2 border-white/40 shadow-emerald-600/50 hover:shadow-[0_0_30px_rgba(37,211,102,0.7)]"
        aria-label="Chat on WhatsApp"
      >
        {/* Smooth Subtle Ripple Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
        
        {/* WhatsApp Icon */}
        <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white relative z-10 transition-transform duration-300 group-hover:rotate-6 drop-shadow" />
      </a>
    </footer>
  );
}
