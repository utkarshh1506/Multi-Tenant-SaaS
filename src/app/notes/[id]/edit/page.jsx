"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

export default function EditNotePage({ params }) {
  const { id } = use(params);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      const res = await fetch(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
      }
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      router.push(`/dashboard/${id}`);
    } else {
      alert("Failed to update note.");
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="bg-white p-6 shadow rounded-lg max-w-lg mx-auto mt-6"
    >
      <h2 className="text-xl font-bold mb-4">Edit Note</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border p-2 mb-4 rounded"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows={6}
        className="w-full border p-2 mb-4 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-azure-700"
      >
        Save Changes
      </button>
    </form>
  );
}
