// src/components/home/HeroSection.js
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, Users, BookOpen, Award } from "lucide-react";

const STATS = [
  { icon: Users,    label: "Maqsad: O'quvchilar", value: "1,000+",  suffix: "" },
  { icon: BookOpen, label: "IT Yo'nalish",         value: "8",       suffix: "" },
  { icon: Award,    label: "Sertifikat",           value: "100%",    suffix: "" },
  { icon: Sparkles, label: "AI Mentor",            value: "24/7",    suffix: "" },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 10% 50%, rgba(0,188,212,.1) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 90% 20%, rgba(245,166,35,.07) 0%, transparent 60%)" }}
        />
        {/* Grid */}
        <div className="absolute inset-0 bg-grid-pattern bg-[length:60px_60px]"
          style={{ maskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)" }}
        />
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,188,212,.08), transparent 70%)", animation: "float 6s ease-in-out infinite" }}
        />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(245,166,35,.06), transparent 70%)", animation: "float 8s ease-in-out infinite reverse" }}
        />
      </div>

      {/* Floating Cards */}
      <div className="absolute top-1/4 right-8 hidden xl:flex items-center gap-3 glass px-4 py-3 rounded-2xl animate-float z-10">
        <span className="text-2xl">🤖</span>
        <div>
          <p className="text-sm font-semibold text-white">AI Mentor faol</p>
          <p className="text-xs text-teal">Claude bilan o'rganish</p>
        </div>
      </div>
      <div className="absolute bottom-1/3 left-8 hidden xl:flex items-center gap-3 glass px-4 py-3 rounded-2xl z-10" style={{ animation: "float 5s ease-in-out infinite reverse" }}>
        <span className="text-2xl">🏆</span>
        <div>
          <p className="text-sm font-semibold text-white">Sertifikat tayyor!</p>
          <p className="text-xs text-gold">Aziz — Data Analytics</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

        {/* Badge */}
        <div className={`inline-flex items-center gap-2 glass badge-teal px-4 py-2 rounded-full mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
          <span className="text-xs font-mono tracking-wider uppercase text-teal">
            O'zbekistonning #1 AI EdTech Platformasi
          </span>
        </div>

        {/* Title */}
        <h1 className={`font-display font-black leading-none mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <span className="block text-white text-4xl sm:text-6xl lg:text-7xl tracking-tight">IT Kelajaging</span>
          <span className="block text-gradient text-6xl sm:text-8xl lg:text-9xl tracking-tight drop-shadow-[0_0_40px_rgba(245,166,35,0.3)]">KINGS</span>
          <span className="block text-white/90 text-3xl sm:text-4xl lg:text-5xl tracking-widest font-bold mt-2">EDUCATION ZONE</span>
        </h1>

        {/* Subtitle */}
        <p className={`text-lg text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          O'zbek tilida, <span className="text-teal font-medium">Claude AI</span> yordamida — Data Analytics, Python, React, ML va yana ko'p narsani o'rganing.
          Online, Offline yoki Hybrid — siz tanlaysiz.
        </p>

        {/* Actions */}
        <div className={`flex items-center justify-center gap-4 flex-wrap mb-16 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Link href="/courses" className="btn-primary text-base px-8 py-3.5">
            Kurslarni Ko'rish <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="#ai" className="btn-secondary text-base px-8 py-3.5">
            <Play className="w-4 h-4 fill-current" /> AI Mentor haqida
          </Link>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {STATS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="card px-4 py-4 text-center">
              <div className="w-8 h-8 rounded-lg bg-teal/10 flex items-center justify-center mx-auto mb-2">
                <Icon className="w-4 h-4 text-teal" />
              </div>
              <div className="font-display font-black text-2xl text-gold">{value}</div>
              <div className="text-xs text-white/40 mt-0.5 leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

