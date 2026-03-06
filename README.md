# 👑 Kings Education Zone — Full-Stack Next.js

O'zbekistonning birinchi AI-powered IT ta'lim platformasi.

## 🚀 Tezkor Boshlash

```bash
# 1. Paketlarni o'rnating
npm install

# 2. Environment o'rnating
cp .env.example .env.local
# .env.local faylini oching va kalitlarni to'ldiring

# 3. Ma'lumotlar bazasini yarating
npm run db:push

# 4. Namuna ma'lumotlarni kiriting
npm run db:seed

# 5. Serverni ishga tushiring
npm run dev
```

Brauzerda: http://localhost:3000

## ⚙️ Environment Sozlash

`.env.local` faylida:

### DATABASE
```
DATABASE_URL="file:./dev.db"
```

### NEXTAUTH
```
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="kamida-32-belgili-maxfiy-kalit"
```

### GOOGLE OAUTH
1. https://console.cloud.google.com ga kiring
2. Yangi loyiha yarating → "APIs & Services" → "Credentials"
3. "OAuth 2.0 Client ID" yarating
4. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

```
GOOGLE_CLIENT_ID="...apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="..."
```

### ANTHROPIC CLAUDE AI
1. https://console.anthropic.com ga kiring
2. API key yarating

```
ANTHROPIC_API_KEY="sk-ant-api03-..."
```

## 📁 Loyiha Tuzilmasi

```
src/
├── app/
│   ├── page.js                    # Asosiy sahifa
│   ├── layout.js                  # Root layout
│   ├── globals.css                # Global uslublar
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth (Google + Email)
│   │   ├── chat/                  # Claude AI streaming chat
│   │   ├── courses/               # Kurslar CRUD API
│   │   ├── enroll/                # Yozilish API
│   │   └── users/                 # Ro'yxat API
│   ├── auth/
│   │   ├── login/                 # Kirish sahifasi
│   │   └── register/              # Ro'yxat sahifasi
│   ├── courses/
│   │   ├── page.js                # Kurslar ro'yxati
│   │   └── [slug]/page.js         # Kurs tafsiloti
│   └── dashboard/                 # O'quvchi paneli
├── components/
│   ├── layout/                    # Navbar, Footer
│   ├── home/                      # Asosiy sahifa komponentlari
│   ├── course/                    # Kurs komponentlari
│   ├── dashboard/                 # Dashboard komponentlari
│   ├── chat/                      # AI Chat widget
│   └── providers/                 # Context provayderlar
└── lib/
    ├── db.js                      # Prisma client
    ├── auth.js                    # NextAuth konfiguratsiya
    ├── claude.js                  # Anthropic AI helper
    └── utils.js                   # Yordamchi funksiyalar
```

## 🔌 API Endpointlar

| Method | URL | Tavsif | Auth |
|--------|-----|--------|------|
| GET | `/api/courses` | Barcha kurslar | Yo'q |
| POST | `/api/courses` | Yangi kurs (Admin) | Admin |
| POST | `/api/users` | Ro'yxatdan o'tish | Yo'q |
| POST | `/api/chat` | AI chat (streaming) | Ixtiyoriy |
| POST | `/api/enroll` | Kursga yozilish | Ha |
| GET | `/api/enroll` | Mening kurslarim | Ha |
| * | `/api/auth/*` | NextAuth endpoints | — |

## 🛠️ Texnologiyalar

- **Framework**: Next.js 14 (App Router)
- **Database**: SQLite (Prisma ORM)
- **Auth**: NextAuth.js (Google OAuth + Credentials)
- **AI**: Anthropic Claude API (streaming)
- **UI**: Tailwind CSS + Radix UI
- **Validation**: Zod
- **Animations**: Framer Motion

## Vercel + PostgreSQL Deploy

Local development `prisma/schema.prisma` orqali SQLite bilan ishlaydi.
Vercel deploy uchun `prisma/schema.postgres.prisma` ishlatiladi.

1. Vercel'da Postgres/Neon/Supabase dan PostgreSQL ulang.
2. Vercel environment variables kiriting:
   - `POSTGRES_PRISMA_URL`
   - `NEXTAUTH_URL`
   - `NEXT_PUBLIC_APP_URL`
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `ANTHROPIC_API_KEY`
3. Vercel Project Settings ichida Build Command ni `npm run vercel-build` qiling.
4. Agar ma'lumotlarni seed qilish kerak bo'lsa, local terminalda PostgreSQL `DATABASE_URL` bilan:

```bash
npm run db:migrate:postgres
npm run db:seed:postgres
```

## 👤 Admin Hisob (seed dan keyin)

```
Email: admin@kingseducation.uz
Parol: admin123
```

## 📞 Muallif

**Nodir Khudayarov**  
📧 nodirkhudayarov@gmail.com  
📞 +998 (33) 806-4545  
🔗 linkedin.com/in/n-khudoyorov
