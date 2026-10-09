<div align="center">

# 🚀 HireHub

### پلتفرم استخدام نسل جدید | Next Generation Hiring Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://hirehublink.vercel.app)
[![Tests](https://img.shields.io/badge/Tests-63%20passed-brightgreen?style=for-the-badge&logo=jest)](https://github.com/Myebmi/Hirehub)
[![Coverage](https://img.shields.io/badge/Coverage-94%25-brightgreen?style=for-the-badge)](https://github.com/Myebmi/Hirehub)

**🌐 [Live Demo](https://hirehublink.vercel.app) • 📖 [Documentation](https://github.com/Myebmi/Hirehub) • 🐛 [Report Bug](https://github.com/Myebmi/Hirehub/issues)**

</div>

---

## 📖 درباره پروژه

**HireHub** یه پلتفرم استخدام مدرن و **دوزبانه** (فارسی + انگلیسی) است که کارجویان و استخدام‌کنندگان رو به هم وصل می‌کنه. این پروژه با **Next.js 16**، **React 19**، **PostgreSQL** و **Prisma ORM** ساخته شده و روی **Vercel** Deploy شده.

### 🎯 چرا HireHub؟

- 🌍 **دوزبانه**: فارسی (RTL) + انگلیسی (LTR)
- 🔒 **امنیت بالا**: Rate Limiting + bcrypt + Zod Validation
- ⚡ **Performance**: Caching + Pagination + Dynamic Imports
- 🔄 **Realtime**: اعلان‌های فوری با Supabase Realtime
- 🎨 **UI/UX مدرن**: Dark Mode + Toast + Skeleton + Animation
- 📊 **Dashboard تحلیلی**: ۱۰ نمودار با داده‌های زنده
- 🔐 **Admin Panel**: مدیریت کامل کاربران و آگهی‌ها
- 🧪 **تست‌شده**: ۶۳ Unit Test با ۹۴٪ Coverage

---

## 📸 Screenshots

### 🏠 صفحه اصلی (فارسی - RTL)
![Home FA](./screenshots/hero-fa.png)

### 🏠 Home Page (انگلیسی - LTR)
![Home EN](./screenshots/hero-en.png)

### 📊 داشبورد با ۱۰ نمودار
![Dashboard](./screenshots/dashboard.png)

### 💼 لیست آگهی‌ها + Pagination
![Jobs](./screenshots/jobs.png)

### 🔐 پنل مدیریت
![Admin](./screenshots/admin.png)

### 🔔 اعلان‌های Realtime
![Realtime Notifications](./screenshots/realtime-notif.png)

### 🌙 Dark Mode
![Dark Mode](./screenshots/dark-mode.png)

---

## ✨ Features

### 🎯 اصلی
- ✅ **احراز هویت**: NextAuth v5 + bcrypt + Credentials
- ✅ **نقش‌ها**: Candidate, Recruiter, Admin
- ✅ **آگهی‌ها**: CRUD کامل + جستجو + فیلتر
- ✅ **درخواست‌ها**: ارسال + پیگیری + تغییر وضعیت
- ✅ **پروفایل کاربر**: ویرایش اطلاعات + تغییر رمز
- ✅ **پنل ادمین**: مدیریت کاربران + آگهی‌ها

### 🚀 پیشرفته
- ✅ **Realtime Notifications**: Supabase Realtime + Toast
- ✅ **Email System**: Resend (خوش‌آمد + تأیید ایمیل + بازیابی رمز)
- ✅ **Rate Limiting**: Upstash Redis (Login, Register, API)
- ✅ **Dashboard Analytics**: ۱۰ نمودار (Recharts)
- ✅ **Pagination**: با URL-based navigation
- ✅ **Caching**: unstable_cache برای Queryهای سنگین
- ✅ **i18n**: next-intl (fa + en)
- ✅ **Dark Mode**: next-themes
- ✅ **PWA**: نصب‌پذیر + Offline

### 🔒 امنیت
- ✅ **Zod Validation**: روی همه Forms
- ✅ **bcrypt**: هش پسورد با ۱۰ Salt Rounds
- ✅ **Security Headers**: CSP, X-Frame-Options, ...
- ✅ **Rate Limiting**: Upstash Redis
- ✅ **Role Guard**: Middleware + Page-level
- ✅ **Session Management**: NextAuth v5

### 🧪 تست
- ✅ **Jest**: ۶۳ Unit Test (Validations, Utilities)
- ✅ **Playwright**: ۳ E2E Test (Auth, Home, Jobs)
- ✅ **Coverage**: ۹۴٪ Statements, ۸۵٪ Branches

---

## 🛠️ Tech Stack

### Frontend
| تکنولوژی | نسخه | کاربرد |
|----------|------|--------|
| **Next.js** | 16.3 | App Router + Server Components |
| **React** | 19.3 | UI Library |
| **TypeScript** | 5.x | Type Safety |
| **Tailwind CSS** | 4.0 | Styling |
| **Recharts** | 2.x | Charts |
| **Sonner** | 2.x | Toast Notifications |
| **next-intl** | 4.x | i18n (fa + en) |
| **next-themes** | 0.4 | Dark Mode |

### Backend
| تکنولوژی | نسخه | کاربرد |
|----------|------|--------|
| **Next.js API Routes** | 16.3 | REST API |
| **Server Actions** | 16.3 | Mutations |
| **Prisma ORM** | 6.19 | Database ORM |
| **PostgreSQL** | 16 | Database |
| **Supabase** | - | Hosted PostgreSQL + Realtime |
| **NextAuth v5** | 5.x | Authentication |
| **Zod** | 3.x | Schema Validation |
| **bcrypt** | 2.x | Password Hashing |

### DevOps & Tools
| تکنولوژی | کاربرد |
|----------|--------|
| **Vercel** | Deployment |
| **GitHub Actions** | CI/CD |
| **Upstash Redis** | Rate Limiting |
| **Resend** | Email Service |
| **UploadThing** | File Upload |
| **Jest** | Unit Tests |
| **Playwright** | E2E Tests |

---

## 📁 ساختار پروژه

```
hirehub/
├── prisma/
│   ├── schema.prisma          # Database Schema (8 models)
│   └── migrations/            # Migrations
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (auth)/        # login, register, forgot-password
│   │   │   ├── admin/         # Admin Panel
│   │   │   ├── dashboard/     # Dashboard با 10 نمودار
│   │   │   ├── jobs/          # Job Listings + CRUD
│   │   │   ├── profile/       # User Profile
│   │   │   └── contact/       # Contact Page
│   │   └── api/               # REST API Routes
│   ├── actions/               # Server Actions
│   ├── components/            # React Components
│   ├── lib/                   # Utilities
│   ├── i18n/                  # i18n Config
│   └── middleware.ts          # Route Protection
├── messages/
│   ├── fa.json                # Persian Translations
│   └── en.json                # English Translations
├── __tests__/                 # Jest Tests
├── e2e/                       # Playwright Tests
└── public/                    # Static Assets
```

---

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها
- Node.js 20+
- PostgreSQL 16 (یا Supabase)
- npm / pnpm / yarn

### ۱. Clone
```bash
git clone https://github.com/Myebmi/Hirehub.git
cd Hirehub
```

### ۲. نصب Dependencies
```bash
npm install
```

### ۳. تنظیم Environment Variables
```bash
cp .env.example .env
```

فایل `.env` رو با این مقادیر پر کن:

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Auth
AUTH_SECRET="your-secret-here"
AUTH_URL="http://localhost:3000"

# Supabase (Realtime)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."

# Email
RESEND_API_KEY="re_..."
EMAIL_FROM="onboarding@resend.dev"

# Rate Limiting
UPSTASH_REDIS_REST_URL="https://xxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### ۴. Setup Database
```bash
npx prisma generate
npx prisma db push
```

### ۵. Run Development
```bash
npm run dev
```

باز کن: `http://localhost:3000`

---

## 🧪 تست

### Unit Tests (Jest)
```bash
npm test                  # یک بار
npm run test:watch        # Watch Mode
npm run test:coverage     # با Coverage
```

### E2E Tests (Playwright)
```bash
npm run test:e2e          # Headless
npm run test:e2e:ui       # UI Mode
```

---

## 📊 نتایج تست

```
Test Suites: 10 passed, 10 total
Tests:       63 passed, 63 total
Time:        3.5 s

Coverage:
File              | % Stmts | % Branch | % Funcs | % Lines
------------------|---------|----------|---------|--------
All files         |   94.4  |   85.71  |   66.66 |   94.4
lib/afghanDate.ts |   89.23 |   81.81  |   66.66 |   89.23
validations/*     |    100  |     100  |     100 |    100
```

---

## 🌐 Production

**URL:** [https://hirehublink.vercel.app](https://hirehublink.vercel.app)

- ✅ **Deployed on Vercel**
- ✅ **Database on Supabase**
- ✅ **CDN Global**
- ✅ **SSL/HTTPS**
- ✅ **Auto Deploy on Git Push**

---

## 🤝 Contributing

اگه می‌خوای کمک کنی:

1. Fork کن
2. Branch بساز: `git checkout -b feature/amazing-feature`
3. Commit کن: `git commit -m 'Add amazing feature'`
4. Push کن: `git push origin feature/amazing-feature`
5. Pull Request باز کن

---

## 📄 License

این پروژه تحت **MIT License** منتشر شده.

---

## 👨‍💻 نویسنده

**Yasen Ebrahimi**

- 🌐 Website: [hirehublink.vercel.app](https://hirehublink.vercel.app)
- 📧 Email: myebmi@outlook.com
- 📱 Phone: +93 79 007 9386
- 📍 Location: Kabul, Afghanistan

---

## 🙏 تشکر از

- [Next.js](https://nextjs.org/) — React Framework
- [Vercel](https://vercel.com/) — Hosting
- [Supabase](https://supabase.com/) — Database + Realtime
- [Prisma](https://www.prisma.io/) — ORM
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Upstash](https://upstash.com/) — Redis
- [Resend](https://resend.com/) — Email

---

<div align="center">

**⭐ اگه این پروژه رو دوست داشتی، یه Star بزن! ⭐**

ساخته شده با ❤️ در افغانستان 🇦🇫

© 2026 HireHub. All rights reserved.

</div>
```

**مسیر:** `LICENSE`

```
MIT License

Copyright (c) 2026 Yasen Ebrahimi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
