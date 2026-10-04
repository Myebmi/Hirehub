import Link from "next/link"
import { auth } from "@/../auth"
import { prisma } from "@/lib/prisma"
import ThemeToggle from "@/components/ThemeToggle"

export default async function Home() {
  const session = await auth()

  // آمار زنده
  const [totalJobs, totalUsers, totalApplications] = await Promise.all([
    prisma.job.count({ where: { status: "OPEN" } }),
    prisma.user.count(),
    prisma.application.count(),
  ])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* ====== Navbar ====== */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white">
              H
            </div>
            <span className="text-xl font-bold dark:text-white">HireHub</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/jobs"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              آگهی‌ها
            </Link>
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              ویژگی‌ها
            </a>
            <a
              href="#how"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              چطور کار می‌کند؟
            </a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {session?.user ? (
              <Link
                href="/dashboard"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                داشبورد
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:block"
                >
                  ورود
                </Link>
                <Link
                  href="/register"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  شروع کنید
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ====== Hero Section ====== */}
      <section className="relative overflow-hidden px-4 py-20 md:px-8 md:py-32">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-gray-950 dark:to-purple-950/20" />
        
        {/* Blur Circles */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-600/10" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl dark:bg-purple-600/10" />

        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-600 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
            </span>
            پلتفرم استخدام نسل جدید
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl lg:text-7xl dark:text-white">
            استخدام هوشمند
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              با HireHub
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 md:text-xl dark:text-gray-400">
            HireHub پلتفرمی مدرن برای اتصال کارجویان و استخدام‌کنندگان است.
            آگهی‌های شغلی را مرور کنید، درخواست بفرستید و مسیر شغلی خود را بسازید.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link
              href={session?.user ? "/jobs" : "/register"}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 hover:shadow-xl md:w-auto"
            >
              {session?.user ? "مشاهده آگهی‌ها" : "شروع رایگان"}
              <span className="transition group-hover:translate-x-1">←</span>
            </Link>
            <Link
              href="/jobs"
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition hover:border-gray-300 hover:bg-gray-50 md:w-auto dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
            >
              🔍 مشاهده آگهی‌ها
            </Link>
          </div>

          {/* Live Stats */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {totalJobs}
              </div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                آگهی فعال
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {totalUsers}
              </div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                کاربر
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {totalApplications}
              </div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                درخواست
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Features ====== */}
      <section id="features" className="border-t border-gray-200 px-4 py-20 md:px-8 dark:border-gray-800">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              چرا HireHub؟
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              همه‌چیز برای استخدام هوشمند
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🔐",
                title: "احراز هویت امن",
                description:
                  "ثبت‌نام و ورود با رمزنگاری bcrypt و NextAuth. اطلاعات شما کاملاً امن است.",
              },
              {
                icon: "💼",
                title: "مدیریت آگهی‌ها",
                description:
                  "ساخت، ویرایش و مدیریت آگهی‌های شغلی با امکانات کامل و رابط کاربری ساده.",
              },
              {
                icon: "📄",
                title: "آپلود رزومه PDF",
                description:
                  "رزومه خود را به صورت PDF آپلود کنید و در یک کلیک به کارفرما ارسال کنید.",
              },
              {
                icon: "📊",
                title: "داشبورد و آمار",
                description:
                  "نمودارها و آمار زنده از درخواست‌ها، کاربران و آگهی‌ها در یک نگاه.",
              },
              {
                icon: "🔍",
                title: "جستجو و فیلتر",
                description:
                  "با جستجوی پیشرفته، آگهی‌های مناسب خود را در کمترین زمان پیدا کنید.",
              },
              {
                icon: "🌙",
                title: "Dark Mode",
                description:
                  "رابط کاربری مدرن با پشتیبانی از حالت تیره و روشن برای راحتی چشم.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-gray-200 bg-white p-8 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
              >
                <div className="mb-4 text-5xl transition group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== How It Works ====== */}
      <section
        id="how"
        className="border-t border-gray-200 bg-gray-50 px-4 py-20 md:px-8 dark:border-gray-800 dark:bg-gray-950"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              چطور کار می‌کند؟
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              در ۳ مرحله ساده شروع کنید
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "۱",
                title: "ثبت‌نام کنید",
                description:
                  "حساب کاربری خود را بسازید و پروفایل خود را کامل کنید.",
              },
              {
                step: "۲",
                title: "آگهی‌ها را مرور کنید",
                description:
                  "با جستجو و فیلتر پیشرفته، آگهی‌های مناسب خود را پیدا کنید.",
              },
              {
                step: "۳",
                title: "درخواست بفرستید",
                description:
                  "با آپلود رزومه PDF، در یک کلیک درخواست خود را ارسال کنید.",
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-3xl font-bold text-white shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== For Recruiters ====== */}
      <section className="border-t border-gray-200 px-4 py-20 md:px-8 dark:border-gray-800">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                👔 برای استخدام‌کنندگان
              </div>
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                تیم خود را با بهترین‌ها بسازید
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                آگهی خود را ثبت کنید، رزومه‌های دریافتی را مدیریت کنید و
                بهترین استعدادها را استخدام کنید.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "ثبت آگهی در چند ثانیه",
                  "مدیریت رزومه‌ها و وضعیت متقاضیان",
                  "آمار دقیق از بازخورد آگهی‌ها",
                  "ارتباط مستقیم با کارجویان",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm text-green-600 dark:bg-green-900/30 dark:text-green-400">
                      ✓
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                شروع کنید ←
              </Link>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50 p-8 dark:border-gray-800 dark:from-blue-950/20 dark:to-purple-950/20">
              <div className="space-y-4">
                {[
                  { name: "برنامه‌نویس فرانت‌اند", applicants: 24 },
                  { name: "طراح UI/UX", applicants: 18 },
                  { name: "برنامه‌نویس بک‌اند", applicants: 31 },
                ].map((job, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                  >
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {job.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {job.applicants} متقاضی
                      </div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      💼
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Final CTA ====== */}
      <section className="border-t border-gray-200 bg-gradient-to-br from-blue-600 to-purple-600 px-4 py-20 md:px-8 dark:border-gray-800">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            آماده‌اید مسیر شغلی خود را بسازید؟
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            همین حالا ثبت‌نام کنید و در چند ثانیه شروع کنید.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link
              href="/register"
              className="w-full rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg transition hover:bg-gray-100 md:w-auto"
            >
              ثبت‌نام رایگان
            </Link>
            <Link
              href="/jobs"
              className="w-full rounded-lg border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/10 md:w-auto"
            >
              مشاهده آگهی‌ها
            </Link>
          </div>
        </div>
      </section>

      {/* ====== Footer ====== */}
      <footer className="border-t border-gray-200 bg-white px-4 py-12 md:px-8 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white">
                  H
                </div>
                <span className="text-xl font-bold dark:text-white">
                  HireHub
                </span>
              </Link>
              <p className="mt-4 max-w-md text-gray-600 dark:text-gray-400">
                پلتفرم استخدام نسل جدید برای اتصال کارجویان و استخدام‌کنندگان.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                لینک‌های سریع
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/jobs"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    آگهی‌ها
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    ثبت‌نام
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  >
                    ورود
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                تماس
              </h3>
              <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
                <li>📧 Myebmi@outlook.com</li>
                <li>📞 0790079386</li>
                <li>📍 کابل، افغانستان</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
            <p>
              © {new Date().getFullYear()} HireHub. ساخته شده با 💻 در
              افغانستان
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}