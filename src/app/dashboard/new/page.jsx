"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl text-black font-semibold mb-4">Create a New Note</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full text-black p-2 border rounded mb-3"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="w-full text-black p-2 border rounded mb-3"
        rows={5}
      />
      <button
        type="submit"
        className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition"
      >
        Save
      </button>
    </form>
  );
}
