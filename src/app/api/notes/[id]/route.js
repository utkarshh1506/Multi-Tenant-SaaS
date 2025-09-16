import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { authMiddleware } from "@/middleware/auth";

const prisma = new PrismaClient();

export async function GET(req, context) {
  const { params } = await context;
  const { user, error } = await authMiddleware(req);
  if (error) return NextResponse.json({ error }, { status: 401 });

  const note = await prisma.note.findUnique({
    where: { id: params.id },
  });

  if (!note || note.tenantId !== user.tenantId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(note);
}

export async function DELETE(req, { params }) {
  const { user, error } = await authMiddleware(req);
  if (error) return NextResponse.json({ error }, { status: 401 });

  const note = await prisma.note.findUnique({
    where: { id: params.id },
  });

  if (!note || note.tenantId !== user.tenantId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.note.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
}

export async function PUT(req, { params }) {
  const { user, error } = await authMiddleware(req);
  if (error) return NextResponse.json({ error }, { status: 401 });

  const data = await req.json();

  const note = await prisma.note.findUnique({
    where: { id: params.id },
  });

  if (!note || note.tenantId !== user.tenantId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updatedNote = await prisma.note.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(updatedNote);
}
