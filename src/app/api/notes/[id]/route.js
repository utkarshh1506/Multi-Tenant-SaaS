import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { authMiddleware } from "@/middleware/auth";


const prisma = new PrismaClient()


export async function GET(req, { params }) {
  const { user, error } = await authMiddleware(req);
  if (error) return NextResponse.json({ error }, { status: 401 });

  const note = await prisma.note.findUnique({ where: { id: params.id } });
  if (!note || note.tenantId !== user.tenantId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (user.role === "member" && note.userId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json(note);
}


export async function PUT(req, { params }) {
  const { user, error } = await authMiddleware(req);
  if (error) return NextResponse.json({ error }, { status: 401 });

  const note = await prisma.note.findUnique({ where: { id: params.id } });
  if (!note || note.tenantId !== user.tenantId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (user.role === "member" && note.userId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const updated = await prisma.note.update({
    where: { id: params.id },
    data: {
      title: body.title ?? note.title,
      content: body.content ?? note.content,
    },
  });

  return NextResponse.json(updated);
}


export async function DELETE(req, { params }) {
  const { user, error } = await authMiddleware(req);
  if (error) return NextResponse.json({ error }, { status: 401 });

  const note = await prisma.note.findUnique({ where: { id: params.id } });
  if (!note || note.tenantId !== user.tenantId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (user.role === "member" && note.userId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.note.delete({ where: { id: params.id } });

  return NextResponse.json({ message: "Note deleted" });
}
