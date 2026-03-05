// src/components/home/CTASection.js
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section id="cta" className="py-24 px-4 border-t border-white/5" style={{ background: "linear-gradient(135deg,rgba(0,188,212,.07),rgba(245,166,35,.07))" }}>
      <div className="max-w-3xl mx-auto text-center">
        <span className="section-label">// hozir qo'shiling</span>
        <h2 className="font-display font-black text-5xl sm:text-6xl text-white leading-tight mb-5">
          IT Kelajaging<br /><span className="text-gradient">HOZIR BOSHLANADI</span>
        </h2>
        <p className="text-white/50 mb-10 max-w-xl mx-auto leading-relaxed">
          Bepul sinab ko'ring — birinchi darsga kirish bepul. Karta ma'lumoti shart emas.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/auth/register" className="btn-primary text-base px-10 py-4">
            🚀 Bepul Boshlash <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="tel:+998338064545" className="btn-secondary text-base px-8 py-4">
            <Phone className="w-4 h-4" /> +998 (33) 806-4545
          </a>
        </div>
        <p className="mt-8 text-xs text-white/25">📍 Toshkent offline markaz · 🌐 Online — butun O'zbekiston · 📧 nodirkhudayarov@gmail.com</p>
      </div>
    </section>
  );
}
