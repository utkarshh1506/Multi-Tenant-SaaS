"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode") || "login";

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = mode === "login" ? "/api/auth/login" : "/api/auth/register";

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      alert(data.message || "Something went wrong");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-azure-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-black-700 mb-6">
          {mode === "login" ? "Sign In" : "Create Account"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-azure-400"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-azure-400"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-azure-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-sky-600 text-black py-3 rounded-lg hover:bg-sky-700 transition"
          >
            {mode === "login" ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <a
                href="/auth?mode=signup"
                className="text-black-600 font-semibold"
              >
                Get Started
              </a>
            </>
          ) : (
            <>
              Already a member?{" "}
              <a
                href="/auth?mode=login"
                className="text-black-600 font-semibold"
              >
                Sign In
              </a>
            </>
          )}
        </p>
      </div>
    </main>
  );
}
