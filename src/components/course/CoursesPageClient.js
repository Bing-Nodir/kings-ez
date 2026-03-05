// src/components/course/CoursesPageClient.js
"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock, BookOpen, Star, ArrowRight, SlidersHorizontal } from "lucide-react";
import { formatPrice, LEVEL_LABELS, LEVEL_COLORS } from "@/lib/utils";
import { cn } from "@/lib/utils";

const LEVELS = [["", "Hammasi"], ["BEGINNER", "Boshlang'ich"], ["INTERMEDIATE", "O'rta"], ["ADVANCED", "Ilg'or"]];

export default function CoursesPageClient({ courses, categories }) {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("");
  const [level,    setLevel]    = useState("");

  const filtered = useMemo(() => courses.filter(c => {
    const matchSearch   = !search   || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !category || c.category?.slug === category;
    const matchLevel    = !level    || c.level === level;
    return matchSearch && matchCategory && matchLevel;
  }), [courses, search, category, level]);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">// barcha kurslar</span>
          <h1 className="font-display font-black text-5xl text-white mb-3">
            IT <span className="text-gradient">Kurslar</span>
          </h1>
          <p className="text-white/50 max-w-md mx-auto">
            {courses.length} ta kurs — o'zbek tilida, AI Mentor bilan, sertifikat bilan
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Kurs qidirish..."
              className="input pl-9 py-2.5 text-sm"
            />
          </div>

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setCategory("")} className={cn("px-3 py-2 rounded-lg text-xs font-medium transition-all", !category ? "bg-teal text-navy" : "bg-white/5 text-white/60 hover:text-white border border-white/10")}>
              Hammasi
            </button>
            {categories.map(c => (
              <button key={c.slug} onClick={() => setCategory(c.slug)}
                className={cn("px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1",
                  category === c.slug ? "text-navy shadow-sm" : "bg-white/5 text-white/60 hover:text-white border border-white/10")}
                style={category === c.slug ? { background: c.color } : {}}>
                {c.icon} {c.name}
              </button>
            ))}
          </div>

          {/* Level filter */}
          <div className="flex gap-2">
            <SlidersHorizontal className="w-4 h-4 text-white/30 self-center" />
            {LEVELS.map(([val, label]) => (
              <button key={val} onClick={() => setLevel(val)}
                className={cn("px-3 py-2 rounded-lg text-xs font-medium transition-all", level === val ? "bg-gold text-navy" : "bg-white/5 text-white/60 hover:text-white border border-white/10")}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-white/35 mb-6 font-mono">{filtered.length} ta kurs topildi</p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-white/40">Hech narsa topilmadi. Filtrni o'zgartiring.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(c => (
              <Link key={c.id} href={`/courses/${c.slug}`} className="group block h-full">
                <div className="card card-hover h-full flex flex-col">
                  <div className="h-1 rounded-t-2xl" style={{ background: c.category?.color || "#00BCD4" }} />
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{ background: `${c.category?.color || "#00BCD4"}18` }}>
                        {c.category?.icon}
                      </div>
                      <span className={cn("badge text-[10px] px-2 py-0.5", LEVEL_COLORS[c.level])}>
                        {LEVEL_LABELS[c.level]}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base text-white mb-1.5 group-hover:text-teal transition-colors">{c.title}</h3>
                    <p className="text-xs text-white/45 leading-relaxed flex-1 mb-3">{c.description}</p>
                    <div className="flex items-center gap-3 text-xs text-white/30 mb-3">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{c.duration}h</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{c.lectureCount}</span>
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-gold/60" />{c._count.enrollments}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="font-display font-black text-lg" style={{ color: c.category?.color || "#00BCD4" }}>
                        {formatPrice(c.price)}
                      </span>
                      <span className="text-xs text-teal flex items-center gap-1">
                        Ko'rish <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

