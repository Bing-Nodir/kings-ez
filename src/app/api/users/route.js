// src/app/api/users/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { z } from "zod";

const registerSchema = z.object({
  name:     z.string().min(2, "Ism kamida 2 ta harf"),
  email:    z.string().email("Email noto'g'ri"),
  password: z.string().min(8, "Parol kamida 8 ta belgi"),
});

export async function POST(req) {
  try {
    const body   = await req.json();
    const parsed = registerSchema.parse(body);

    const exists = await db.user.findUnique({ where: { email: parsed.email } });
    if (exists) return NextResponse.json({ error: "Bu email allaqachon ro'yxatdan o'tgan" }, { status: 409 });

    const hashed = await bcrypt.hash(parsed.password, 12);
    const user   = await db.user.create({
      data: { name: parsed.name, email: parsed.email, password: hashed },
      select: { id: true, name: true, email: true, createdAt: true }
    });

    return NextResponse.json({ message: "Ro'yxatdan o'tish muvaffaqiyatli!", user }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.errors[0].message }, { status: 400 });
    return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
  }
}
