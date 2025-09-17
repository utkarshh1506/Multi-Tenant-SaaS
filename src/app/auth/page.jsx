"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, Suspense } from "react";

function AuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode") || "login";

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

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
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h2 className="text-3xl font-bold text-center text-black mb-6">
        {mode === "login" ? "Sign In" : "Create Account"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Full Name"
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-azure-400"
            value={form.name}
            onChange={handleChange("name")}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-azure-400"
          value={form.email}
          onChange={handleChange("email")}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-azure-400"
          value={form.password}
          onChange={handleChange("password")}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg hover:bg-azure-700 transition"
        >
          {mode === "login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        {mode === "login" ? (
          <>
            Don’t have an account?{" "}
            <Link
              href="/auth?mode=signup"
              className="text-azure-600 font-semibold"
            >
              Get Started
            </Link>
          </>
        ) : (
          <>
            Already a member?{" "}
            <Link
              href="/auth?mode=login"
              className="text-azure-600 font-semibold"
            >
              Sign In
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

export default function AuthPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-azure-50">
      <Suspense fallback={<div>Loading...</div>}>
        <AuthForm />
      </Suspense>
    </main>
  );
}
