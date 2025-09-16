import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth";

export async function GET(req) {
  const { user, error } = await authMiddleware(req);

  if (error) {
    return NextResponse.json({ message: error }, { status: 401 });
  }

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    tenant: {
      id: user.tenant.id,
      name: user.tenant.name,
      slug: user.tenant.slug,
    },
  });
}
