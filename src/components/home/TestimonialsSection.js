// src/components/home/TestimonialsSection.js
const REVIEWS = [
  { name: "Aziz Karimov",     role: "Data Analyst @ Uzum",    initials: "AK", text: "Kings Education Zone'da Data Analytics kursini tugatganimdan keyin, 3 oy ichida IT kompaniyada ish topdim. AI Mentor juda foydali!", rating: 5 },
  { name: "Malika Rashidova", role: "Python Dev @ IT Park",    initials: "MR", text: "O'zbek tilida bunday sifatli IT kursni boshqa joyda topa olmagan edim. Karyeram butunlay o'zgardi!", rating: 5 },
  { name: "Jasur Toshmatov",  role: "Full Stack Developer",    initials: "JT", text: "Offline markazda o'qish juda qulay — zamonaviy kompyuterlar, professional muhit. Offline+Online kombinatsiyasi ajoyib!", rating: 5 },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 px-4 bg-navy-2">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-label">// o'quvchilar fikri</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white">Ular Nima <span className="text-gradient">Deyishdi?</span></h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {REVIEWS.map(r => (
            <div key={r.name} className="card p-6 relative">
              <div className="absolute top-4 right-5 font-display text-5xl text-teal/20 leading-none">"</div>
              <div className="text-gold text-sm tracking-widest mb-3">{"★".repeat(r.rating)}</div>
              <p className="text-sm text-white/65 leading-relaxed mb-5">{r.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal to-gold flex items-center justify-center text-navy font-black text-sm font-mono">
                  {r.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">{r.name}</p>
                  <p className="text-xs text-teal">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

