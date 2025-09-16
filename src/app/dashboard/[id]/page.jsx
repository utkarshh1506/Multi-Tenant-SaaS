"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

export default function NoteDetailPage({ params }) {
  const { id } = use(params);
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      const res = await fetch(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.ok) {
        const data = await res.json();
        setNote(data);
      } else {
        router.push("/dashboard");
      }
      setLoading(false);
    };
    fetchNote();
  }, [id, router]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    const res = await fetch(`/api/notes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Failed to delete note.");
    }
  };

  const handleEdit = () => {
    router.push(`/notes/${id}/edit`);
  };

  if (loading) return <p>Loading...</p>;
  if (!note) return <p>Note not found</p>;

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{note.title}</h2>
        <div className="space-x-2">
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
    </div>
  );
}
