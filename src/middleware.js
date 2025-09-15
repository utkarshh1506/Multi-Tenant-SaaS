import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default function middleware(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api/notes") ||
    pathname.startsWith("/api/tenants")
  ) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
      jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/notes/:path*", "/api/tenants/:path*"],
  runtime: "nodejs",
};



