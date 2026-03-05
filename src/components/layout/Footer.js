// src/components/layout/Footer.js
import Link from "next/link";

const LINKS = {
  "Kurslar":    [["Data Analytics","/courses/data-analytics"],["Python","/courses/python-dasturlash"],["React.js","/courses/react-js"],["ML / LLM","/courses/ml-llm-ai"],["HTML & CSS","/courses/html-css"]],
  "Platforma":  [["Offline Markaz","/#how"],["AI Mentor","/#ai"],["Sertifikat","/#pricing"],["B2B","/#pricing"],["Blog","/blog"]],
  "Kompaniya":  [["Haqimizda","/about"],["Aloqa","/contact"],["Shartlar","/terms"],["Maxfiylik","/privacy"]],
};

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/5 px-4 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <span className="text-2xl drop-shadow-[0_0_8px_rgba(245,166,35,.6)]">👑</span>
            <span className="font-display font-black text-lg text-white">Kings <span className="text-gold">Education Zone</span></span>
          </Link>
          <p className="text-sm text-white/40 leading-relaxed max-w-xs">
            O'zbekistonning birinchi AI-quvvatli IT ta'lim platformasi. O'zbek tilida, professional sifatda.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <span className="badge badge-teal text-[10px]">🤖 Powered by Claude AI</span>
          </div>
        </div>

        {/* Links */}
        {Object.entries(LINKS).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-mono text-xs tracking-[.15em] uppercase text-teal mb-4">{title}</h4>
            <ul className="space-y-2.5">
              {links.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/40 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
        <span>© 2025 Kings Education Zone. Barcha huquqlar himoyalangan.</span>
        <span>Toshkent, O'zbekiston · +998(33) 806-4545</span>
      </div>
    </footer>
  );
}

