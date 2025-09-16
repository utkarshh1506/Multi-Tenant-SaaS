import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth";


export async function GET(req, { params }) {
  const { user, error } = await authMiddleware(req);
  if (error) return NextResponse.json({ error }, { status: 401 });

  const note = await prisma.note.findUnique({ where: { id: await params.id } });
  if (!note || note.tenantId !== user.tenantId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(note);
}

// PUT /api/notes/:id
export async function PUT(req, { params }) {
  const { user, error } = await authMiddleware(req);
  if (error) return NextResponse.json({ error }, { status: 401 });

  const id = await params.id;
  const note = await prisma.note.findUnique({ where: { id } });
  if (!note || note.tenantId !== user.tenantId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }


  if (user.role !== "ADMIN" && note.userId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { title, content } = await req.json();
  const updated = await prisma.note.update({
    where: { id },
    data: { title, content },
  });

  return NextResponse.json(updated);
}


export async function DELETE(req, { params }) {
  const { user, error } = await authMiddleware(req);
  if (error) return NextResponse.json({ error }, { status: 401 });

  const id = await params.id;
  const note = await prisma.note.findUnique({ where: { id } });
  if (!note || note.tenantId !== user.tenantId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (user.role !== "ADMIN" && note.userId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.note.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted successfully" });
}
