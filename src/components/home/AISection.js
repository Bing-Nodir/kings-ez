// src/components/home/AISection.js
"use client";
import { Bot, Code2, TrendingUp, Lightbulb } from "lucide-react";

const FEATURES = [
  { icon: Bot,        color: "#00BCD4", title: "Shaxsiy Javoblar",  desc: "O'zbek yoki rus tilida istalgan savolga tezkor, tushunarli javob" },
  { icon: Code2,      color: "#F5A623", title: "Kod Tahlili",       desc: "Yozgan kodingizni tekshirib, xatolarni tushuntiradi va yaxshilaydi" },
  { icon: TrendingUp, color: "#10B981", title: "Progress Kuzatish", desc: "AI sizning kuchsiz joylaringizni aniqlaydi, maxsus mashqlar tayyorlaydi" },
  { icon: Lightbulb,  color: "#8B5CF6", title: "Loyiha Yordami",   desc: "Portfolio loyiha yaratishda g'oyalar, arxitektura va kod yozishda yordam" },
];

export default function AISection() {
  return (
    <section id="ai" className="py-24 px-4" style={{ background: "linear-gradient(135deg,rgba(0,188,212,.05) 0%,transparent 50%,rgba(245,166,35,.05) 100%)" }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* AI Chat Mock */}
        <div className="glass p-6 rounded-2xl order-2 md:order-1">
          <div className="flex items-center gap-3 pb-4 mb-5 border-b border-white/5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-DEFAULT to-teal-light flex items-center justify-center text-navy font-bold">🤖</div>
            <div>
              <p className="font-semibold text-sm">KEZ AI Mentor</p>
              <p className="text-xs text-teal-DEFAULT flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-teal-DEFAULT animate-pulse inline-block" />Faol — javobga tayyor</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="ml-auto w-fit max-w-[80%] bg-teal-DEFAULT/10 border border-teal-DEFAULT/20 rounded-2xl rounded-br-sm px-4 py-2.5 text-sm">
              Python'da list comprehension nima?
            </div>
            <div className="mr-auto w-fit max-w-[80%] bg-white/5 border border-white/8 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm leading-relaxed">
              List comprehension — ro'yxat yaratishning qisqa usuli! 🐍<br />
              <code className="text-teal-light text-xs bg-teal-DEFAULT/15 px-1 rounded">[x*2 for x in range(5)]</code><br />
              Bu <code className="text-teal-light text-xs bg-teal-DEFAULT/15 px-1 rounded">[0,2,4,6,8]</code> qaytaradi. Sodda, tez va pythonic! Misol kerakmi?
            </div>
            <div className="ml-auto w-fit max-w-[80%] bg-teal-DEFAULT/10 border border-teal-DEFAULT/20 rounded-2xl rounded-br-sm px-4 py-2.5 text-sm">
              Ha, filter bilan ham misol ber
            </div>
            <div className="mr-auto flex gap-1.5 px-4 py-3">
              {[0,200,400].map(d => (
                <span key={d} className="w-2 h-2 rounded-full bg-teal-DEFAULT animate-bounce" style={{ animationDelay: `${d}ms` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="order-1 md:order-2">
          <span className="section-label">// ai mentor</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white mb-4">
            Claude AI bilan <span className="text-gradient">O'rganing</span>
          </h2>
          <p className="text-white/50 mb-8 leading-relaxed">O'zbekistonda birinchi marta — har bir o'quvchining shaxsiy AI o'qituvchisi, 24/7 tayyor</p>

          <div className="space-y-3">
            {FEATURES.map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="card p-4 flex gap-4 items-start hover:border-white/10 transition-colors">
                <div className="w-11 h-11 min-w-[2.75rem] rounded-xl flex items-center justify-center" style={{ background: `${color}18` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white mb-0.5">{title}</p>
                  <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
