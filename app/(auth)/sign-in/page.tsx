"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login gagal");
      }
      
      const userWithRole = {
          ...data.user,
          role: email === "hrd@mail.com" ? "admin" : "karyawan"
      };

      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(userWithRole));

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-slate-900">
      <main className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md dark:bg-zinc-900 border border-slate-100">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-800 dark:text-white">Sign In</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="admin@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // Focus ring teal-500 sesuai permintaan
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm font-medium"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 ml-1">Password</label>
            <input
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // Focus ring teal-500 sesuai permintaan
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-sm font-medium"
              required
            />
          </div>

          {error && <p className="text-xs font-bold text-red-500 ml-1">{error}</p>}

          <button
            disabled={loading}
            // Warna dasar slate-800, hover teal-500 sesuai permintaan
            className="w-full rounded-lg bg-slate-800 hover:bg-teal-600 active:bg-teal-700 py-3 text-white font-bold text-sm transition-colors shadow-sm disabled:opacity-50 mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          
          <p className="text-center text-sm text-slate-500 mt-4">
            don't have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/sign-up")}
              className="text-slate-800 font-black hover:text-teal-600 hover:underline transition-colors"
            >
              Sign Up
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}