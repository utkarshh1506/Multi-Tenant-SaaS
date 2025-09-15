import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password", 10);

  // Tenants
  const acme = await prisma.tenant.create({
    data: { name: "Acme", slug: "acme", plan: "FREE" },
  });

  const globex = await prisma.tenant.create({
    data: { name: "Globex", slug: "globex", plan: "FREE" },
  });

  // Users
  await prisma.user.createMany({
    data: [
      { name:'Acme Admin', email: "admin@acme.test", password, role: "ADMIN", tenantId: acme.id },
      { name:'Acme Member', email: "user@acme.test", password, role: "MEMBER", tenantId: acme.id },
      { name:'Globex Admin', email: "admin@globex.test", password, role: "ADMIN", tenantId: globex.id },
      { name:'GLOBEX Member', email: "user@globex.test", password, role: "MEMBER", tenantId: globex.id },
    ],
  });
}

main()
  .then(() => {
    console.log("Database seeded");
    prisma.$disconnect();
  })
  .catch(err => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
