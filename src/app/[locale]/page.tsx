import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import { auth } from "@/../auth"
import { prisma } from "@/lib/prisma"
import ThemeToggle from "@/components/ThemeToggle"
import LanguageSwitcher from "@/components/LanguageSwitcher"

export default async function Home() {
  const session = await auth()
  const t = await getTranslations("nav")
  const tHome = await getTranslations("home")

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
              {t("jobs")}
            </Link>
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              {t("features")}
            </a>
            <a
              href="#how"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              {t("how")}
            </a>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              {t("contact")}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            {session?.user ? (
              <Link
                href="/dashboard"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                {t("dashboard")}
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:block"
                >
                  {t("login")}
                </Link>
                <Link
                  href="/register"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  {t("register")}
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ====== Hero Section ====== */}
      <section className="relative overflow-hidden px-4 py-20 md:px-8 md:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-gray-950 dark:to-purple-950/20" />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-600/10" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl dark:bg-purple-600/10" />

        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-600 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
            </span>
            {tHome("heroBadge")}
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl lg:text-7xl dark:text-white">
            {tHome("heroTitle")}
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {tHome("heroHighlight")}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 md:text-xl dark:text-gray-400">
            {tHome("heroDescription")}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link
              href={session?.user ? "/jobs" : "/register"}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 hover:shadow-xl md:w-auto"
            >
              {session?.user ? tHome("viewJobs") : tHome("startFree")}
              <span className="transition group-hover:translate-x-1">←</span>
            </Link>
            <Link
              href="/jobs"
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition hover:border-gray-300 hover:bg-gray-50 md:w-auto dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
            >
              🔍 {tHome("viewJobs")}
            </Link>
          </div>

          {/* Live Stats */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {totalJobs}
              </div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {tHome("statsActiveJobs")}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {totalUsers}
              </div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {tHome("statsUsers")}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {totalApplications}
              </div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {tHome("statsApplications")}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}