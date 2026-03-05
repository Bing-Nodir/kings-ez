// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Categories
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: "data" }, update: {}, create: { name: "Data Analytics", slug: "data", color: "#00BCD4", icon: "📊" } }),
    prisma.category.upsert({ where: { slug: "python" }, update: {}, create: { name: "Python", slug: "python", color: "#3B82F6", icon: "🐍" } }),
    prisma.category.upsert({ where: { slug: "sql" }, update: {}, create: { name: "SQL", slug: "sql", color: "#8B5CF6", icon: "🗄️" } }),
    prisma.category.upsert({ where: { slug: "powerbi" }, update: {}, create: { name: "Power BI", slug: "powerbi", color: "#F59E0B", icon: "📈" } }),
    prisma.category.upsert({ where: { slug: "react" }, update: {}, create: { name: "React.js", slug: "react", color: "#06B6D4", icon: "⚛️" } }),
    prisma.category.upsert({ where: { slug: "nodejs" }, update: {}, create: { name: "Node.js", slug: "nodejs", color: "#10B981", icon: "🟢" } }),
    prisma.category.upsert({ where: { slug: "ml" }, update: {}, create: { name: "ML / LLM", slug: "ml", color: "#EF4444", icon: "🤖" } }),
    prisma.category.upsert({ where: { slug: "html" }, update: {}, create: { name: "HTML & CSS", slug: "html", color: "#F97316", icon: "🌐" } }),
  ]);

  // Admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@kingseducation.uz" },
    update: {},
    create: { name: "Nodir Khudayarov", email: "admin@kingseducation.uz", password: adminPassword, role: "ADMIN" }
  });

  // Courses
  const coursesData = [
    { slug: "data-analytics", title: "Data Analytics", description: "Ma'lumotlarni tahlil qilish, vizualizatsiya va biznes qarorlar qabul qilishni o'rganing. Excel, Google Sheets, Tableau va Python asoslari.", price: 49, level: "BEGINNER", duration: 40, lectureCount: 42, categoryId: categories[0].id, isFeatured: true },
    { slug: "python-dasturlash", title: "Python Dasturlash", description: "Noldan Python o'rganing — avtomatlashtirish, web scraping, data science va real loyihalar bilan.", price: 59, level: "BEGINNER", duration: 55, lectureCount: 58, categoryId: categories[1].id, isFeatured: true },
    { slug: "sql-va-bazalar", title: "SQL va Ma'lumotlar Bazasi", description: "PostgreSQL, MySQL — so'rovlar yozish, JOIN, subquery, indekslar va optimizatsiya.", price: 39, level: "BEGINNER", duration: 30, lectureCount: 32, categoryId: categories[2].id, isFeatured: false },
    { slug: "power-bi", title: "Power BI Professional", description: "Dashboard yaratish, KPI hisobotlari, DAX formulalar va biznes analitika — professional darajada.", price: 49, level: "BEGINNER", duration: 28, lectureCount: 30, categoryId: categories[3].id, isFeatured: false },
    { slug: "react-js", title: "React.js Frontend", description: "Zamonaviy veb ilovalar — hooks, state management, Next.js, TypeScript bilan.", price: 69, level: "INTERMEDIATE", duration: 60, lectureCount: 65, categoryId: categories[4].id, isFeatured: true },
    { slug: "nodejs-api", title: "Node.js Backend API", description: "REST API, authentication, PostgreSQL bilan ishlash — to'liq backend tizim.", price: 69, level: "INTERMEDIATE", duration: 55, lectureCount: 60, categoryId: categories[5].id, isFeatured: false },
    { slug: "ml-llm-ai", title: "ML / LLM / AI Engineering", description: "Machine learning, neural networks, LLM bilan ishlash, Claude/GPT API integratsiyasi.", price: 89, level: "ADVANCED", duration: 70, lectureCount: 72, categoryId: categories[6].id, isFeatured: true },
    { slug: "html-css", title: "HTML & CSS Asoslari", description: "Veb ishlab chiqarishning asosi — zamonaviy Flexbox, Grid, animatsiyalar.", price: 29, level: "BEGINNER", duration: 22, lectureCount: 24, categoryId: categories[7].id, isFeatured: false },
  ];

  for (const course of coursesData) {
    const c = await prisma.course.upsert({
      where: { slug: course.slug }, update: {}, create: { ...course, isPublished: true }
    });

    // Add sections & lessons
    await prisma.section.upsert({
      where: { id: `${c.id}-s1` },
      update: {},
      create: {
        id: `${c.id}-s1`, title: "Kirish va Asoslar", order: 1, courseId: c.id,
        lessons: {
          create: [
            { title: "Kursga xush kelibsiz", duration: 5, order: 1, isFree: true },
            { title: "O'rganish muhitini sozlash", duration: 15, order: 2, isFree: true },
            { title: "Asosiy tushunchalar", duration: 20, order: 3 },
          ]
        }
      }
    }).catch(() => {});

    await prisma.section.upsert({
      where: { id: `${c.id}-s2` },
      update: {},
      create: {
        id: `${c.id}-s2`, title: "Asosiy Bo'lim", order: 2, courseId: c.id,
        lessons: {
          create: [
            { title: "Birinchi loyiha", duration: 45, order: 1 },
            { title: "Amaliy mashqlar", duration: 30, order: 2 },
            { title: "Mini-projekt", duration: 60, order: 3 },
          ]
        }
      }
    }).catch(() => {});
  }

  console.log("✅ Database seeded successfully!");
  console.log("Admin: admin@kingseducation.uz / admin123");
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
