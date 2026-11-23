"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SchoolLogo from "@/components/ui/SchoolLogo";
import { loginAdminAction } from "@/actions/authActions";
import { Lock, User, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("gcs@admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const res = await loginAdminAction(formData);
    setIsLoading(false);

    if (res.success) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(res.error || "Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10 space-y-4">
        <div className="flex justify-center">
          <SchoolLogo variant="dark" />
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Admin Portal Authentication
        </h2>
        <p className="text-xs text-slate-400">
          Enter your authorized administrator credentials to manage school CMS.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900/90 backdrop-blur-xl py-8 px-6 shadow-2xl rounded-3xl border border-slate-800 sm:px-10 space-y-6">

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin or admin@school.edu.in"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Credentials helper badge */}
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-center justify-between text-[11px] text-blue-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Authorized Admin Credentials</span>
              </span>
              <span className="text-slate-400 font-mono text-[10px]">
                gcs@admin / admin123
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span>{isLoading ? "Signing In..." : "Sign In to Dashboard"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
