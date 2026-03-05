// src/app/auth/register/page.js
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { UserPlus, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm]     = useState({ name: "", email: "", password: "" });
  const [show, setShow]     = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Xatolik yuz berdi"); return; }

      toast.success("Ro'yxatdan o'tish muvaffaqiyatli! 🎉");
      await signIn("credentials", { email: form.email, password: form.password, redirect: false });
      router.push("/dashboard");
    } catch { toast.error("Server xatosi"); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(0,188,212,.08), transparent 60%), radial-gradient(ellipse at 30% 20%, rgba(245,166,35,.06), transparent 60%)" }}>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="text-3xl drop-shadow-[0_0_8px_rgba(245,166,35,.6)]">👑</span>
            <span className="font-display font-black text-xl text-white">Kings <span className="text-gold">EZ</span></span>
          </Link>
          <h1 className="font-display font-black text-3xl text-white">O'rganishni Boshlang!</h1>
          <p className="text-white/50 mt-2">Bepul hisob yarating</p>
        </div>

        <div className="glass p-8 rounded-2xl">
          <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 border border-white/10 rounded-xl py-3 text-sm font-medium text-white/80 hover:bg-white/5 transition-all mb-5">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google bilan ro'yxatdan o'ting
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/30 font-mono">yoki</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-white/50 mb-1.5 block">Ismingiz</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="input" placeholder="Aziz Karimov" required />
            </div>
            <div>
              <label className="text-xs font-medium text-white/50 mb-1.5 block">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                className="input" placeholder="aziz@example.com" required />
            </div>
            <div>
              <label className="text-xs font-medium text-white/50 mb-1.5 block">Parol</label>
              <div className="relative">
                <input type={show ? "text" : "password"} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  className="input pr-10" placeholder="Kamida 8 ta belgi" required minLength={8} />
                <button type="button" onClick={() => setShow(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 disabled:opacity-50">
              {loading ? "Yaratilmoqda..." : <><UserPlus className="w-4 h-4" /> Hisob Yaratish</>}
            </button>
          </form>

          <p className="text-xs text-white/30 text-center mt-4 leading-relaxed">
            Ro'yxatdan o'tib, siz{" "}
            <Link href="/terms" className="text-teal/70 hover:text-teal">Foydalanish shartlari</Link>
            {" "}va{" "}
            <Link href="/privacy" className="text-teal/70 hover:text-teal">Maxfiylik siyosatimizga</Link>
            {" "}rozilik bildirasiz.
          </p>

          <p className="text-center text-sm text-white/40 mt-4">
            Hisobingiz bormi?{" "}
            <Link href="/auth/login" className="text-teal hover:text-teal-light font-medium">Kirish</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

