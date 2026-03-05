// src/components/home/HowItWorksSection.js
export default function HowItWorksSection() {
  const steps = [
    { n: "01", title: "Kurs Tanlang",         desc: "8 ta yo'nalish orasidan o'zingizga mos kursni tanlang" },
    { n: "02", title: "Format Belgilang",      desc: "Online, Offline (Toshkent) yoki Hybrid — siz tanlaysiz" },
    { n: "03", title: "AI bilan O'rganing",    desc: "Video darslar + AI Mentor + amaliy topshiriqlar" },
    { n: "04", title: "Sertifikat Oling",      desc: "Portfolio loyihani taqdim eting va sertifikat qo'lga kiriting" },
  ];
  return (
    <section id="how" className="py-24 px-4 bg-navy-2">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-label">// qanday ishlaydi</span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white">4 Qadam — <span className="text-gradient-teal">Karyerangizga</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="absolute hidden lg:block top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-teal-DEFAULT to-transparent opacity-30" />
          {steps.map(({ n, title, desc }) => (
            <div key={n} className="text-center relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-DEFAULT to-teal-light text-navy font-mono font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-[0_0_24px_rgba(0,188,212,.4)]">
                {n}
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">{title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
