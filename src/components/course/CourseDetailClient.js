// src/components/course/CourseDetailClient.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Check, Clock, BookOpen, Users, Star, ChevronDown, ChevronRight, Play, Lock } from "lucide-react";
import { formatPrice, LEVEL_LABELS, LEVEL_COLORS } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function CourseDetailClient({ course, isEnrolled, isLoggedIn }) {
  const router = useRouter();
  const [enrolling,     setEnrolling]     = useState(false);
  const [expandedSec,   setExpandedSec]   = useState(course.sections[0]?.id);

  const accentColor = course.category?.color || "#00BCD4";

  async function handleEnroll() {
    if (!isLoggedIn) {
      router.push(`/auth/login?callbackUrl=/courses/${course.slug}`);
      return;
    }
    setEnrolling(true);
    try {
      const res = await fetch("/api/enroll", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ courseId: course.id }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Muvaffaqiyatli yozildingiz! 🎉");
        router.refresh();
      } else {
        toast.error(data.error || "Xatolik yuz berdi");
      }
    } catch { toast.error("Server xatosi"); }
    finally { setEnrolling(false); }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="py-16 px-4" style={{ background: `linear-gradient(135deg, ${accentColor}12, transparent 60%)` }}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-white/35 mb-6 font-mono">
              <Link href="/courses" className="hover:text-white">Kurslar</Link>
              <ChevronRight className="w-3 h-3" />
              <span style={{ color: accentColor }}>{course.category?.name}</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: `${accentColor}18` }}>
                {course.category?.icon}
              </div>
              <div>
                <span className={cn("badge text-xs px-2 py-0.5", LEVEL_COLORS[course.level])}>{LEVEL_LABELS[course.level]}</span>
                <p className="text-xs text-white/35 mt-0.5">{course.category?.name}</p>
              </div>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl text-white mb-4 leading-tight">{course.title}</h1>
            <p className="text-white/60 leading-relaxed mb-6">{course.description}</p>

            {/* Meta */}
            <div className="flex flex-wrap gap-5 text-sm text-white/45">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-teal" />{course.duration} soat</span>
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-teal" />{course.lectureCount} dars</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-gold" />{course._count.enrollments} o'quvchi</span>
              {course._count.reviews > 0 && (
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-gold fill-gold" />{course._count.reviews} sharh</span>
              )}
            </div>
          </div>

          {/* Enrollment Card */}
          <div className="glass p-6 rounded-2xl sticky top-24">
            <div className="font-display font-black text-4xl mb-1" style={{ color: accentColor }}>
              {formatPrice(course.price)}
            </div>
            <p className="text-xs text-white/35 mb-5">Bir martalik to'lov · Umr bo'yi kirish</p>

            {isEnrolled ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3">
                  <Check className="w-4 h-4" /> Siz allaqachon yozilgansiz!
                </div>
                <Link href="/dashboard" className="btn-primary w-full justify-center">
                  <Play className="w-4 h-4" /> O'qishni Davom Ettirish
                </Link>
              </div>
            ) : (
              <button onClick={handleEnroll} disabled={enrolling} className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-50">
                {enrolling ? "Yozilmoqda..." : `🚀 Kursga Yozilish — ${formatPrice(course.price)}`}
              </button>
            )}

            <div className="mt-5 space-y-2">
              {["O'zbek tilida to'liq kurs", "AI Mentor (Claude) kirish", "Umr bo'yi kirish", "Sertifikat", "Mobil qurilmalarda ishlash"].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/60">
                  <Check className="w-3.5 h-3.5 text-teal" /> {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-2xl text-white mb-6">Kurs Dasturi</h2>
            <div className="space-y-2">
              {course.sections.map(sec => (
                <div key={sec.id} className="card overflow-hidden">
                  <button
                    onClick={() => setExpandedSec(p => p === sec.id ? null : sec.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold text-teal bg-teal/10">
                        {sec.order}
                      </div>
                      <span className="font-semibold text-sm text-white">{sec.title}</span>
                      <span className="text-xs text-white/30">{sec.lessons.length} dars</span>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 text-white/40 transition-transform", expandedSec === sec.id && "rotate-180")} />
                  </button>
                  {expandedSec === sec.id && (
                    <div className="border-t border-white/5">
                      {sec.lessons.map(lesson => (
                        <div key={lesson.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors">
                          <div className="w-6 h-6 rounded-md flex items-center justify-center">
                            {lesson.isFree
                              ? <Play className="w-3.5 h-3.5 text-teal" />
                              : <Lock className="w-3.5 h-3.5 text-white/25" />}
                          </div>
                          <span className="flex-1 text-sm text-white/70">{lesson.title}</span>
                          <span className="text-xs text-white/30 font-mono">{lesson.duration}min</span>
                          {lesson.isFree && (
                            <span className="badge badge-teal text-[10px] px-2 py-0.5">Bepul</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* What you'll learn */}
          <div>
            <div className="card p-6 mb-5" style={{ borderColor: `${accentColor}30` }}>
              <h3 className="font-display font-bold text-lg text-white mb-4">Bu kursda o'rganasiz</h3>
              <ul className="space-y-2.5">
                {["Asosiy tushunchalar va nazariya", "Amaliy loyihalar va mashqlar", "Real ish jarayonlari", "AI Mentor bilan interaktiv o'qish", "Portfolio loyiha"].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/65">
                    <Check className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

