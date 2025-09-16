"use client";
import { useEffect, useState,use } from "react";
import { useRouter } from "next/navigation";

export default function NoteDetailPage({ params }) {
    const {id} = use(params)
  const [note, setNote] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth");
        return;
      }

      // Fetch current user
      const meRes = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (meRes.ok) {
        const meData = await meRes.json();
        setUser(meData);
      }

      // Fetch the note
      const res = await fetch(`/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setNote(data);
      } else {
        router.push("/dashboard");
      }
    };
    fetchNote();
  }, [id, router]);

  if (!note) return <p>Loading...</p>;

  const handleEdit = () => {
    router.push(`/dashboard/${note.id}/edit`);
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/notes/${note.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Error deleting note");
    }
  };

  // ✅ Check permission: Admin OR Owner
  const canEditOrDelete =
    user &&
    (user.role === "ADMIN" || user.id === note.userId);

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
      <p className="text-gray-700 whitespace-pre-line mb-6">{note.content}</p>

      {canEditOrDelete && (
        <div className="flex gap-4">
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-azure-700"
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
      )}
    </div>
  );
}
