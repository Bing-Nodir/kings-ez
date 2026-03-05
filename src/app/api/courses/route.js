// src/app/api/courses/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const level    = searchParams.get("level");
  const search   = searchParams.get("search");

  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      ...(category && { category: { slug: category } }),
      ...(level    && { level }),
      ...(search   && { OR: [{ title: { contains: search, mode: "insensitive" } }, { description: { contains: search, mode: "insensitive" } }] }),
    },
    include: {
      category:   true,
      _count:     { select: { enrollments: true, reviews: true } },
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(courses);
}

const courseSchema = z.object({
  slug:         z.string().min(3),
  title:        z.string().min(3),
  description:  z.string().min(10),
  price:        z.number().positive(),
  level:        z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  duration:     z.number().int().positive(),
  lectureCount: z.number().int().positive(),
  categoryId:   z.string(),
  isPublished:  z.boolean().optional(),
  isFeatured:   z.boolean().optional(),
});

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Ruxsat yo'q" }, { status: 403 });
  }
  try {
    const body   = await req.json();
    const parsed = courseSchema.parse(body);
    const course = await db.course.create({ data: parsed });
    return NextResponse.json(course, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: err.errors }, { status: 400 });
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
