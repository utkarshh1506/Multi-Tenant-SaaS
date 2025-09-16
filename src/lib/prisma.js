import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis;

let prisma;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    log: ["error", "warn"],
  });
}

prisma = globalForPrisma.prisma;

export { prisma };
