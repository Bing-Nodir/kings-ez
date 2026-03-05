// src/app/courses/[slug]/page.js
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import CourseDetailClient from "@/components/course/CourseDetailClient";
import Footer from "@/components/layout/Footer";

export async function generateMetadata({ params }) {
  const course = await db.course.findUnique({ where: { slug: params.slug } });
  if (!course) return { title: "Kurs topilmadi" };
  return { title: course.title, description: course.description };
}

export default async function CourseDetailPage({ params }) {
  const session = await getServerSession(authOptions);

  const course = await db.course.findUnique({
    where:   { slug: params.slug, isPublished: true },
    include: {
      category:   true,
      sections:   { include: { lessons: { orderBy: { order: "asc" } } }, orderBy: { order: "asc" } },
      reviews:    { include: { user: { select: { name: true, image: true } } }, take: 5, orderBy: { createdAt: "desc" } },
      _count:     { select: { enrollments: true, reviews: true } },
    }
  });

  if (!course) notFound();

  // Check if user is enrolled
  let isEnrolled = false;
  if (session?.user?.id) {
    const enrollment = await db.enrollment.findUnique({
      where: { userId_courseId: { userId: session.user.id, courseId: course.id } }
    });
    isEnrolled = !!enrollment;
  }

  return (
    <>
      <Navbar />
      <CourseDetailClient
        course={JSON.parse(JSON.stringify(course))}
        isEnrolled={isEnrolled}
        isLoggedIn={!!session}
      />
      <Footer />
    </>
  );
}
