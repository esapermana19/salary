"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/proxy-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: "admin",
        }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server tidak memberikan respon JSON. Pastikan API aktif.");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registrasi gagal");
      }

      alert("Registrasi berhasil! Silakan login.");
      router.push("/sign-in");
    } catch (err: any) {
      setError(err.message === "Failed to fetch" 
        ? "Gagal terhubung ke server API. Periksa koneksi internet atau masalah CORS." 
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-slate-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[32px] shadow-md p-10 border border-slate-100">
        
        {/* Header Section */}
        <div className="text-center mb-8 ">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Create Account</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Daftar untuk mulai mengelola gaji</p>
        </div>
        
        <form onSubmit={handleSignUp} className="flex flex-col gap-5">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5 group">
            <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider group-hover:text-teal-600 transition-colors">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm font-medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5 group">
            <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider group-hover:text-teal-600 transition-colors">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@gmail.com"
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5 group">
            <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider group-hover:text-teal-600 transition-colors">
              Password
            </label>
            <input
              type="password"
              placeholder="******"
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 rounded-xl border border-red-100">
              <p className="text-red-500 text-[11px] font-bold text-center">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-800 hover:bg-teal-600 active:bg-teal-700 py-3.5 text-white font-bold text-sm shadow-lg shadow-slate-800/10 transition-all disabled:opacity-50 mt-2"
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-slate-500 mt-4">
            Already have an account?{" "}
            <button 
              type="button" 
              onClick={() => router.push("/sign-in")}
              className="text-slate-800 font-black hover:text-teal-600 hover:underline transition-colors ml-1"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </main>
  );
}