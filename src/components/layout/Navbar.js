// src/components/layout/Navbar.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/courses",       label: "Kurslar" },
  { href: "/#ai",           label: "AI Mentor" },
  { href: "/#how",          label: "Qanday ishlaydi" },
  { href: "/#pricing",      label: "Narxlar" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [userMenu,  setUserMenu]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled
        ? "py-3 bg-navy/95 backdrop-blur-xl border-b border-white/5"
        : "py-4 bg-navy/70 backdrop-blur-md"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl drop-shadow-[0_0_8px_rgba(245,166,35,0.6)] group-hover:scale-110 transition-transform">👑</span>
          <span className="font-display font-black text-lg text-white">
            Kings <span className="text-gold">EZ</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === l.href ? "text-teal" : "text-white/60 hover:text-white"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Auth / User */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <div className="relative">
              <button
                onClick={() => setUserMenu(p => !p)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-teal/30 transition-all"
              >
                {session.user.image ? (
                  <img src={session.user.image} alt="" className="w-7 h-7 rounded-full" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal to-gold flex items-center justify-center text-navy font-bold text-xs">
                    {session.user.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-white/80 max-w-[120px] truncate">{session.user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/40" />
              </button>

              {userMenu && (
                <div className="absolute right-0 top-12 w-52 glass rounded-xl overflow-hidden shadow-xl z-50" onMouseLeave={() => setUserMenu(false)}>
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-xs text-white/40 font-mono">HISOBINGIZ</p>
                    <p className="text-sm font-semibold mt-0.5 truncate">{session.user.email}</p>
                  </div>
                  <div className="p-1.5">
                    <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setUserMenu(false)}>
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link href="/courses" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setUserMenu(false)}>
                      <BookOpen className="w-4 h-4" /> Kurslarim
                    </Link>
                    {session.user.role === "ADMIN" && (
                      <Link href="/admin" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gold hover:bg-gold/10 transition-colors" onClick={() => setUserMenu(false)}>
                        ⚙️ Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => { signOut({ callbackUrl: "/" }); setUserMenu(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Chiqish
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login" className="btn-ghost text-sm">Kirish</Link>
              <Link href="/auth/register" className="btn-primary text-sm py-2 px-5">
                Boshlash →
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden p-2 rounded-lg hover:bg-white/5" onClick={() => setMenuOpen(p => !p)}>
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 py-4 border-t border-white/5 bg-navy/95 backdrop-blur-xl">
          {NAV_LINKS.map(l => (
            <Link key={l.href} href={l.href} className="block py-3 text-white/70 hover:text-white border-b border-white/5" onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4">
            {session ? (
              <Link href="/dashboard" className="btn-primary flex-1 justify-center text-sm" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            ) : (
              <>
                <Link href="/auth/login"    className="btn-secondary flex-1 justify-center text-sm" onClick={() => setMenuOpen(false)}>Kirish</Link>
                <Link href="/auth/register" className="btn-primary  flex-1 justify-center text-sm" onClick={() => setMenuOpen(false)}>Ro'yxat</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

