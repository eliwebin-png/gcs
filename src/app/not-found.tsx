import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-32 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-lg border border-blue-100">
            <span className="text-4xl font-black">404</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black text-slate-900">Page Not Found</h1>
            <p className="text-sm text-slate-500">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
            >
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
