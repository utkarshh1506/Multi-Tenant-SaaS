import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { authMiddleware } from "@/middleware/auth";

const prisma = new PrismaClient();

export async function GET(req) {
  const { user, error } = await authMiddleware(req);
  if (error) return NextResponse.json({ error }, { status: 401 });

  const notes = await prisma.note.findMany({
    where: {
      tenantId: user.tenantId,
      ...(user.role === "member" ? { userId: user.id } : {}),
    },
    include: { user: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(notes);
}

export async function POST(req) {
  const { user, error } = await authMiddleware(req);
  if (error) return NextResponse.json({ error }, { status: 401 });

  const body = await req.json();
  const { title, content } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "Title and content required" }, { status: 400 });
  }

  const note = await prisma.note.create({
    data: {
      title,
      content,
      userId: user.id,
      tenantId: user.tenantId,
    },
  });

  return NextResponse.json(note, { status: 201 });
}
