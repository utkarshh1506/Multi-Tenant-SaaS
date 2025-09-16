"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [notes, setNotes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notes", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.ok) {
          const data = await res.json();
          setNotes(data);
        } else {
          router.push("/auth");
        }
      } catch {
        router.push("/auth");
      }
    };
    fetchNotes();
  }, [router]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-black font-semibold">Your Notes</h2>
        <button
          onClick={() => router.push("/dashboard/new")}
          className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
        >
          + New Note
        </button>
      </div>

      <div className="grid gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => router.push(`/dashboard/${note.id}`)}
            className="p-4 bg-white shadow rounded-lg cursor-pointer hover:shadow-md transition"
          >
            <h3 className="text-lg text-black font-bold">{note.title}</h3>
            <p className="text-gray-600 text-sm truncate">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
