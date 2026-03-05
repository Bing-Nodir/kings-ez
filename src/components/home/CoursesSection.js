// src/components/home/CoursesSection.js
import Link from "next/link";
import { Clock, BookOpen, Star, ArrowRight } from "lucide-react";
import { formatPrice, LEVEL_LABELS, LEVEL_COLORS } from "@/lib/utils";
import { cn } from "@/lib/utils";

const FALLBACK_COURSES = [
  { id: "1", slug: "data-analytics",    title: "Data Analytics",      description: "Ma'lumot tahlili, vizualizatsiya va biznes qarorlar.", price: 49, level: "BEGINNER",    duration: 40, lectureCount: 42, category: { name: "Data", icon: "📊", color: "#00BCD4" }, _count: { enrollments: 124, reviews: 38 } },
  { id: "2", slug: "python-dasturlash", title: "Python Dasturlash",   description: "Noldan Python — avtomatlashtirish, data science.",     price: 59, level: "BEGINNER",    duration: 55, lectureCount: 58, category: { name: "Python", icon: "🐍", color: "#3B82F6" }, _count: { enrollments: 98, reviews: 29 } },
  { id: "3", slug: "react-js",          title: "React.js Frontend",   description: "Zamonaviy veb ilovalar — hooks, Next.js.",             price: 69, level: "INTERMEDIATE", duration: 60, lectureCount: 65, category: { name: "React", icon: "⚛️", color: "#06B6D4" }, _count: { enrollments: 67, reviews: 21 } },
  { id: "4", slug: "ml-llm-ai",         title: "ML / LLM / AI",       description: "Machine learning, LLM, Claude API integratsiyasi.",    price: 89, level: "ADVANCED",     duration: 70, lectureCount: 72, category: { name: "AI/ML", icon: "🤖", color: "#EF4444" }, _count: { enrollments: 45, reviews: 15 } },
];

function CourseCard({ course }) {
  const accentColor = course.category?.color || "#00BCD4";

  return (
    <Link href={`/courses/${course.slug}`} className="group block">
      <div className="card card-hover h-full flex flex-col" style={{ "--accent": accentColor }}>

        {/* Top color bar */}
        <div className="h-1 rounded-t-2xl" style={{ background: accentColor }} />

        <div className="p-5 flex flex-col flex-1">
          {/* Icon + Category */}
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${accentColor}18` }}>
              {course.category?.icon}
            </div>
            <span className={cn("badge text-xs", LEVEL_COLORS[course.level])}>
              {LEVEL_LABELS[course.level]}
            </span>
          </div>

          <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-teal-DEFAULT transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed flex-1 mb-4">
            {course.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-white/35 mb-4">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration} soat</span>
            <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{course.lectureCount} dars</span>
            {course._count.reviews > 0 && (
              <span className="flex items-center gap-1 text-gold-DEFAULT/70"><Star className="w-3.5 h-3.5 fill-current" />{course._count.reviews}</span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <span className="font-display font-black text-xl" style={{ color: accentColor }}>
              {formatPrice(course.price)}
            </span>
            <span className="btn-ghost text-xs py-1.5 px-3 group-hover:text-teal-DEFAULT group-hover:border group-hover:border-teal-DEFAULT/30 rounded-full transition-all">
              Boshlash <ArrowRight className="w-3 h-3 inline ml-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CoursesSection({ courses }) {
  const displayCourses = courses?.length ? courses : FALLBACK_COURSES;

  return (
    <section id="courses" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-label">// kurs katalogi</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white">
            Bizning <span className="text-gradient">IT Yo'nalishlari</span>
          </h2>
          <p className="text-white/50 mt-3 max-w-lg mx-auto">
            8 ta professional kurs — boshlang'ichdan mutaxassisgacha, o'zbek tilida
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayCourses.map(c => <CourseCard key={c.id} course={c} />)}
        </div>

        <div className="text-center mt-12">
          <Link href="/courses" className="btn-secondary px-8">
            Barcha Kurslarni Ko'rish <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
