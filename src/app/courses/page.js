// src/app/courses/page.js
import { db } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import CoursesPageClient from "@/components/course/CoursesPageClient";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "Barcha Kurslar" };
export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const [courses, categories] = await Promise.all([
    db.course.findMany({
      where:   { isPublished: true },
      include: { category: true, _count: { select: { enrollments: true, reviews: true } } },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    }),
    db.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <>
      <Navbar />
      <CoursesPageClient
        courses={JSON.parse(JSON.stringify(courses))}
        categories={JSON.parse(JSON.stringify(categories))}
      />
      <Footer />
    </>
  );
}
