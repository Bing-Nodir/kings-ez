// src/components/dashboard/DashboardClient.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { BookOpen, MessageSquare, Award, TrendingUp, Clock, ArrowRight, Play } from "lucide-react";
import { formatPrice, LEVEL_LABELS, LEVEL_COLORS } from "@/lib/utils";
import { cn } from "@/lib/utils";
import AIChatWidget from "@/components/chat/AIChatWidget";

export default function DashboardClient({ user, enrollments, chatHistory }) {
  const [tab, setTab] = useState("courses");

  const stats = [
    { icon: BookOpen,      label: "Kurslarim",     value: enrollments.length,                            color: "text-teal-DEFAULT" },
    { icon: MessageSquare, label: "AI Suhbatlar",  value: chatHistory.filter(m => m.role === "user").length, color: "text-gold-DEFAULT" },
    { icon: Award,         label: "Sertifikatlar", value: 0,                                             color: "text-green-400" },
    { icon: TrendingUp,    label: "Kunlik Streak",  value: "7 kun",                                      color: "text-purple-400" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {user.image ? (
              <img src={user.image} alt="" className="w-14 h-14 rounded-2xl" />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-DEFAULT to-gold-DEFAULT flex items-center justify-center text-navy font-black text-xl font-display">
                {user.name?.[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-white/50 text-sm font-mono">SALOM,</p>
              <h1 className="font-display font-black text-2xl text-white">{user.name} 👑</h1>
            </div>
          </div>
          <Link href="/courses" className="btn-primary text-sm">
            Yangi Kurs Qo'shish <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono tracking-wider text-white/40 uppercase">{label}</span>
                <Icon className={cn("w-4 h-4", color)} />
              </div>
              <p className={cn("font-display font-black text-3xl", color)}>{value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/5 rounded-xl p-1 mb-6 w-fit">
          {[["courses", "Kurslarim", BookOpen], ["chat", "AI Tarix", MessageSquare]].map(([id, label, Icon]) => (
            <button key={id} onClick={() => setTab(id)}
              className={cn("flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                tab === id ? "bg-teal-DEFAULT text-navy shadow-[0_4px_12px_rgba(0,188,212,.3)]" : "text-white/50 hover:text-white"
              )}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "courses" && (
          enrollments.length === 0 ? (
            <div className="card p-16 text-center">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="font-display font-bold text-xl text-white mb-2">Hali kurs yo'q</h3>
              <p className="text-white/45 mb-6">Birinchi kursga yoziling va IT karyerangizni boshlang!</p>
              <Link href="/courses" className="btn-primary">Kurslarni Ko'rish</Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {enrollments.map(e => (
                <Link key={e.id} href={`/courses/${e.course.slug}`} className="group">
                  <div className="card card-hover p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${e.course.category?.color || "#00BCD4"}18` }}>
                        {e.course.category?.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm text-white truncate group-hover:text-teal-DEFAULT transition-colors">{e.course.title}</h3>
                        <p className={cn("text-xs mt-0.5 badge px-2 py-0.5", LEVEL_COLORS[e.course.level])}>{LEVEL_LABELS[e.course.level]}</p>
                      </div>
                    </div>
                    {/* Progress bar placeholder */}
                    <div className="h-1.5 bg-white/5 rounded-full mb-2">
                      <div className="h-full bg-gradient-to-r from-teal-DEFAULT to-teal-light rounded-full" style={{ width: "30%" }} />
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/35">
                      <span>30% yakunlangan</span>
                      <span className="flex items-center gap-1 text-teal-DEFAULT"><Play className="w-3 h-3" />Davom et</span>
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-xs text-white/25">
                      <Clock className="w-3 h-3" />
                      Yozilgan: {new Date(e.enrolledAt).toLocaleDateString("uz-UZ")}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )
        )}

        {tab === "chat" && (
          <div className="card p-6 max-h-[500px] overflow-y-auto space-y-3">
            {chatHistory.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-4xl mb-3">🤖</p>
                <p className="text-white/45">Hali AI bilan suhbat yo'q. Quyidagi chat tugmasini bosing!</p>
              </div>
            ) : chatHistory.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={cn("max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-teal-DEFAULT/15 border border-teal-DEFAULT/20 rounded-br-sm"
                    : "bg-white/5 border border-white/8 rounded-bl-sm text-white/75"
                )}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AIChatWidget />
    </div>
  );
}
