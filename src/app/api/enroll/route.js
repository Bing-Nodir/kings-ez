// src/app/api/enroll/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// Enroll in a course
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Kirish talab qilinadi" }, { status: 401 });

  const { courseId, paymentMethod = "demo" } = await req.json();
  if (!courseId) return NextResponse.json({ error: "courseId talab qilinadi" }, { status: 400 });

  const course = await db.course.findUnique({ where: { id: courseId } });
  if (!course) return NextResponse.json({ error: "Kurs topilmadi" }, { status: 404 });

  // Check if already enrolled
  const existing = await db.enrollment.findUnique({ where: { userId_courseId: { userId: session.user.id, courseId } } });
  if (existing) return NextResponse.json({ error: "Allaqachon yozilgansiz", enrollment: existing }, { status: 409 });

  const enrollment = await db.enrollment.create({
    data: {
      userId: session.user.id,
      courseId,
      paidAmount: course.price,
      paymentMethod,
    }
  });

  return NextResponse.json({ message: "Muvaffaqiyatli yozildingiz!", enrollment }, { status: 201 });
}

// Get user's enrollments
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Kirish talab qilinadi" }, { status: 401 });

  const enrollments = await db.enrollment.findMany({
    where: { userId: session.user.id },
    include: {
      course: { include: { category: true, _count: { select: { lessons: { where: { section: {} } } } } } }
    },
    orderBy: { enrolledAt: "desc" },
  });

  return NextResponse.json(enrollments);
}
