"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch("/api/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push("/auth");
        }
      } catch {
        router.push("/auth");
      }
    };
    fetchMe();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <nav className="bg-sky-600 text-white px-6 py-3 flex justify-between items-center">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        NotesApp
      </h1>
      <div className="flex items-center gap-4">
        {user && <span>{user.name}</span>}
        <button
          onClick={handleLogout}
          className="bg-white text-sky-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
