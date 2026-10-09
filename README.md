<div align="center">

# 🚀 HireHub

### پلتفرم استخدام نسل جدید | Next Generation Hiring Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://hirehublink.vercel.app)
[![Tests](https://img.shields.io/badge/Tests-63%20passed-brightgreen?style=for-the-badge)](https://github.com/Myebmi/Hirehub)
[![Coverage](https://img.shields.io/badge/Coverage-94%25-brightgreen?style=for-the-badge)](https://github.com/Myebmi/Hirehub)

**🌐 [Live Demo](https://hirehublink.vercel.app) • 🐛 [Report Bug](https://github.com/Myebmi/Hirehub/issues)**

</div>

---

## 📖 درباره پروژه

**HireHub** یه پلتفرم استخدام مدرن و **دوزبانه** (فارسی + انگلیسی) است که کارجویان و استخدام‌کنندگان رو به هم وصل می‌کنه. با **Next.js 16**، **React 19**، **PostgreSQL** و **Prisma ORM** ساخته شده و روی **Vercel** Deploy شده.

### 🎯 چرا HireHub؟

- 🌍 **دوزبانه**: فارسی (RTL) + انگلیسی (LTR)
- 🔒 **امنیت بالا**: Rate Limiting + bcrypt + Zod Validation
- ⚡ **Performance**: Caching + Pagination
- 🔄 **Realtime**: اعلان‌های فوری با Supabase Realtime
- 🎨 **UI/UX مدرن**: Dark Mode + Toast + Skeleton
- 📊 **Dashboard تحلیلی**: ۱۰ نمودار
- 🔐 **Admin Panel**: مدیریت کاربران و آگهی‌ها
- 🧪 **تست‌شده**: ۶۳ Unit Test با ۹۴٪ Coverage

---

## ✨ Features

### 🎯 اصلی
- ✅ **احراز هویت**: NextAuth v5 + bcrypt
- ✅ **نقش‌ها**: Candidate, Recruiter, Admin
- ✅ **آگهی‌ها**: CRUD + جستجو + فیلتر + Pagination
- ✅ **درخواست‌ها**: ارسال + پیگیری + تغییر وضعیت
- ✅ **پروفایل**: ویرایش + تغییر رمز
- ✅ **پنل ادمین**: مدیریت کامل

### 🚀 پیشرفته
- ✅ **Realtime Notifications**: Supabase Realtime + Toast
- ✅ **Email System**: Resend (خوش‌آمد + تأیید ایمیل + بازیابی رمز)
- ✅ **Rate Limiting**: Upstash Redis
- ✅ **Dashboard**: ۱۰ نمودار با Recharts
- ✅ **Caching**: unstable_cache
- ✅ **i18n**: next-intl (fa + en)
- ✅ **Dark Mode**: next-themes
- ✅ **PWA**: نصب‌پذیر

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Recharts, Sonner, next-intl, next-themes |
| **Backend** | Next.js API Routes, Server Actions, Prisma ORM, PostgreSQL, NextAuth v5, Zod, bcrypt |
| **DevOps** | Vercel, GitHub Actions, Upstash Redis, Resend, UploadThing |
| **Testing** | Jest (63 tests, 94% coverage), Playwright (3 E2E tests) |

---

## 🚀 نصب سریع

```bash
# Clone
git clone https://github.com/Myebmi/Hirehub.git
cd Hirehub

# Install
npm install

# Setup .env (ببین .env.example)
cp .env.example .env

# Database
npx prisma generate
npx prisma db push

# Run
npm run dev
```

باز کن: `http://localhost:3000`

---

## 🧪 تست

```bash
# Unit Tests
npm test
npm run test:coverage

# E2E Tests
npm run test:e2e
```

**نتیجه:**
```
Test Suites: 10 passed, 10 total
Tests:       63 passed, 63 total
Coverage:    94.4% Statements, 85.71% Branches
```

---

## 🌐 Production

**URL:** [https://hirehublink.vercel.app](https://hirehublink.vercel.app)

- ✅ Deployed on **Vercel**
- ✅ Database on **Supabase**
- ✅ Auto Deploy on Git Push
- ✅ SSL/HTTPS

---

## 📄 License

MIT License

---

## 👨‍💻 نویسنده

**Yasen Ebrahimi**

- 🌐 [hirehublink.vercel.app](https://hirehublink.vercel.app)
- 📧 myebmi@outlook.com
- 📱 +93 79 007 9386
- 📍 Kabul, Afghanistan

---

<div align="center">

**⭐ اگه این پروژه رو دوست داشتی، یه Star بزن! ⭐**

ساخته شده با ❤️ در افغانستان 🇦🇫

© 2026 HireHub

</div>