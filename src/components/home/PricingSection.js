// src/components/home/PricingSection.js
import Link from "next/link";
import { Check, Minus } from "lucide-react";

const PLANS = [
  {
    name: "Asosiy Kurs", tag: "Starter", price: "$29–89", per: " (bir martalik)",
    desc: "Bitta kurs, bir martalik to'lov",
    features: [
      { text: "Video darslar (30–70 dars)", ok: true },
      { text: "AI Mentor (cheklangan)",     ok: true },
      { text: "Amaliy topshiriqlar",        ok: true },
      { text: "Sertifikat",                 ok: true },
      { text: "Mentor sessiyalari",         ok: false },
      { text: "Offline markaz kirish",      ok: false },
    ],
    cta: "Kurs Tanlash", href: "/courses", featured: false,
  },
  {
    name: "Hybrid Pro", tag: "⭐ Eng Mashhur", price: "$99", per: "/oy",
    desc: "Barcha kurslar + Offline markaz + AI cheksiz",
    features: [
      { text: "Barcha 8 ta kurs",           ok: true },
      { text: "AI Mentor (Cheksiz)",        ok: true },
      { text: "Offline markaz kirish",      ok: true },
      { text: "Haftalik mentor sessiya",    ok: true },
      { text: "Portfolio loyiha yordam",    ok: true },
      { text: "Karyera kengashi",           ok: true },
    ],
    cta: "Hozir Boshlash →", href: "/auth/register", featured: true,
  },
  {
    name: "B2B Litsenziya", tag: "Korporativ", price: "$500", per: "/paket",
    desc: "Kompaniyangiz xodimlari uchun",
    features: [
      { text: "10+ xodim uchun kirish",     ok: true },
      { text: "Maxsus kurs dasturi",        ok: true },
      { text: "Kompaniya hisoboti",         ok: true },
      { text: "Dedicated mentor",           ok: true },
      { text: "Korporativ sertifikat",      ok: true },
      { text: "Individual ta'lim",          ok: false },
    ],
    cta: "Murojaat Qilish", href: "mailto:nodirkhudayarov@gmail.com", featured: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-label">// narxlar</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white">O'zingizga Mos <span className="text-gradient">Rejani Tanlang</span></h2>
          <p className="text-white/50 mt-3">Shaffof narxlar — yashirin to'lovlar yo'q</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5 items-start">
          {PLANS.map(p => (
            <div key={p.name} className={`rounded-2xl p-6 flex flex-col ${p.featured ? "bg-gradient-to-b from-teal-DEFAULT/10 to-transparent border border-teal-DEFAULT/30 shadow-[0_30px_80px_rgba(0,188,212,.15)] scale-[1.03]" : "card"}`}>
              <div className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 w-fit ${p.featured ? "bg-gold-DEFAULT text-navy" : "bg-teal-DEFAULT/10 text-teal-DEFAULT border border-teal-DEFAULT/20"}`}>
                {p.tag}
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-1">{p.name}</h3>
              <div className="font-mono text-3xl font-bold text-teal-DEFAULT flex items-end gap-1 my-3">
                {p.price}<span className="text-sm text-white/40 font-body font-normal mb-1">{p.per}</span>
              </div>
              <p className="text-sm text-white/45 mb-5">{p.desc}</p>
              <ul className="space-y-2.5 mb-6 flex-1">
                {p.features.map(f => (
                  <li key={f.text} className="flex items-center gap-2.5 text-sm">
                    {f.ok
                      ? <Check className="w-4 h-4 text-teal-DEFAULT flex-shrink-0" />
                      : <Minus className="w-4 h-4 text-white/20 flex-shrink-0" />}
                    <span className={f.ok ? "text-white/70" : "text-white/25"}>{f.text}</span>
                  </li>
                ))}
              </ul>
              <Link href={p.href} className={p.featured ? "btn-primary justify-center" : "btn-secondary justify-center"}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
