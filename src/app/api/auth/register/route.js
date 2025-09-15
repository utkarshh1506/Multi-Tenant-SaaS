import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient()


export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: { id: newUser.id, email: newUser.email },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error registering user", error }, { status: 500 });
  }
}
