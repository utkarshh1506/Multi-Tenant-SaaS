import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middleware/auth";


export async function GET(req) {
  const { user, error } = await authMiddleware(req);
  if (error) return NextResponse.json({ error }, { status: 401 });

  const notes = await prisma.note.findMany({
    where: { tenantId: user.tenantId }, // Tenant isolation
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(notes);
}


export async function POST(req) {
  const { user, error } = await authMiddleware(req);
  if (error) return NextResponse.json({ error }, { status: 401 });

  const { title, content } = await req.json();

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
