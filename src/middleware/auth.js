import jwt from "jsonwebtoken";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

/**
 * Route-level auth middleware
 * @param {Request} req - Next.js request object
 * @param {Array} roles - Optional array of allowed roles (e.g., ["ADMIN"])
 * @returns {Object} { user } or { error }
 */
export async function authMiddleware(req, roles = []) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { error: "Unauthorized" };
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { tenant: true },
    });

    if (!user) {
      return { error: "User not found" };
    }

    // Optional role check
    if (roles.length > 0 && !roles.includes(user.role)) {
      return { error: "Forbidden: insufficient permissions" };
    }

    return { user };
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return { error: "Invalid or expired token" };
  }
}
