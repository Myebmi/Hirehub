import Link from "next/link"
import { auth } from "@/../auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { getTranslations } from "next-intl/server"
import LogoutButton from "@/components/LogoutButton"
import StatsCards from "@/components/stats/StatsCards"
import ThemeToggle from "@/components/ThemeToggle"
import NotificationBell from "@/components/NotificationBell"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { toAfghanDate } from "@/lib/afghanDate"
import {
  ApplicationsChart,
  UsersPieChart,
  ApplicationsTrendChart,
  HiringRateChart,
  WeeklyStatsChart,
  UsersTrendChart,
  JobsStatusChart,
  HiringFunnelChart,
  MonthlyStackedChart,
} from "@/components/stats/ChartWrapper"

export default async function DashboardPage() {
  const session = await auth()
  const t = await getTranslations("dashboard")
  const tNav = await getTranslations("nav")

  if (!session) {
    redirect("/login")
  }

  const isRecruiter =
    session.user?.role === "RECRUITER" || session.user?.role === "ADMIN"

  const [
    totalJobs,
    totalApplications,
    totalUsers,
    totalHired,
    myJobs,
    myApplications,
    statusCounts,
    roleCounts,
  ] = await Promise.all([
    prisma.job.count(),
    prisma.application.count(),
    prisma.user.count(),
    prisma.application.count({ where: { status: "HIRED" } }),
    isRecruiter
      ? prisma.job.count({ where: { recruiterId: session.user.id } })
      : Promise.resolve(0),
    !isRecruiter
      ? prisma.application.count({ where: { applicantId: session.user.id } })
      : Promise.resolve(0),
    prisma.application.groupBy({
      by: ["status"],
      _count: true,
    }),
    prisma.user.groupBy({
      by: ["role"],
      _count: true,
    }),
  ])

  // نمودار روند درخواست‌ها (۳۰ روز اخیر)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const applicationsTrend = await prisma.application.findMany({
    where: { createdAt: { gte: thirtyDaysAgo } },
    select: { createdAt: true },
  })

  const trendMap = new Map<string, number>()
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const key = toAfghanDate(date)
    trendMap.set(key, 0)
  }

  applicationsTrend.forEach((app) => {
    const key = toAfghanDate(app.createdAt)
    if (trendMap.has(key)) {
      trendMap.set(key, (trendMap.get(key) || 0) + 1)
    }
  })

  const trendData = Array.from(trendMap.entries()).map(([date, count]) => ({
    date,
    count,
  }))

  // آمار هفتگی
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const [weeklyJobs, weeklyApplications] = await Promise.all([
    prisma.job.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    }),
    prisma.application.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    }),
  ])

  const weeklyMap = new Map<string, { jobs: number; applications: number }>()
  const dayNames = ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"]

  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dayName = dayNames[date.getDay()]
    weeklyMap.set(dayName, { jobs: 0, applications: 0 })
  }

  weeklyJobs.forEach((job) => {
    const dayName = dayNames[job.createdAt.getDay()]
    const current = weeklyMap.get(dayName)
    if (current) {
      weeklyMap.set(dayName, { ...current, jobs: current.jobs + 1 })
    }
  })

  weeklyApplications.forEach((app) => {
    const dayName = dayNames[app.createdAt.getDay()]
    const current = weeklyMap.get(dayName)
    if (current) {
      weeklyMap.set(dayName, { ...current, applications: current.applications + 1 })
    }
  })

  const weeklyData = Array.from(weeklyMap.entries()).map(([day, data]) => ({
    day,
    jobs: data.jobs,
    applications: data.applications,
  }))

  // نمودار روند کاربران
  const thirtyDaysAgo2 = new Date()
  thirtyDaysAgo2.setDate(thirtyDaysAgo2.getDate() - 30)

  const usersTrend = await prisma.user.findMany({
    where: { createdAt: { gte: thirtyDaysAgo2 } },
    select: { createdAt: true },
  })

  const usersTrendMap = new Map<string, number>()
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const key = toAfghanDate(date)
    usersTrendMap.set(key, 0)
  }

  usersTrend.forEach((user) => {
    const key = toAfghanDate(user.createdAt)
    if (usersTrendMap.has(key)) {
      usersTrendMap.set(key, (usersTrendMap.get(key) || 0) + 1)
    }
  })

  const usersTrendData = Array.from(usersTrendMap.entries()).map(([date, count]) => ({ date, count }))

  // وضعیت آگهی‌ها
  const [openJobs, draftJobs, closedJobs] = await Promise.all([
    prisma.job.count({ where: { status: "OPEN" } }),
    prisma.job.count({ where: { status: "DRAFT" } }),
    prisma.job.count({ where: { status: "CLOSED" } }),
  ])

  const jobsStatusData = [
    { name: t("charts.jobsStatus"), value: openJobs, color: "#10b981" },
    { name: "Draft", value: draftJobs, color: "#f59e0b" },
    { name: "Closed", value: closedJobs, color: "#ef4444" },
  ]

  // قیف استخدام
  const [pendingCount, reviewingCount, interviewCount, rejectedCount, hiredCount] = await Promise.all([
    prisma.application.count({ where: { status: "PENDING" } }),
    prisma.application.count({ where: { status: "REVIEWING" } }),
    prisma.application.count({ where: { status: "INTERVIEW" } }),
    prisma.application.count({ where: { status: "REJECTED" } }),
    prisma.application.count({ where: { status: "HIRED" } }),
  ])

  const hiringFunnelData = [
    { status: "Pending", count: pendingCount, fill: "#f59e0b" },
    { status: "Reviewing", count: reviewingCount, fill: "#3b82f6" },
    { status: "Interview", count: interviewCount, fill: "#8b5cf6" },
    { status: "Hired", count: hiredCount, fill: "#10b981" },
    { status: "Rejected", count: rejectedCount, fill: "#ef4444" },
  ]

  // فعالیت ماهانه
  const afghanMonths = ["حمل", "ثور", "جوزا", "سرطان", "اسد", "سنبله", "میزان", "عقرب", "قوس", "جدی", "دلو", "حوت"]

  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  const [monthlyUsers, monthlyJobs, monthlyApps] = await Promise.all([
    prisma.user.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true },
    }),
    prisma.job.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true },
    }),
    prisma.application.findMany({
      where: { createdAt: { gte: sixMonthsAgo } },
      select: { createdAt: true },
    }),
  ])

  const monthlyMap = new Map<string, { users: number; jobs: number; applications: number }>()

  for (let i = 5; i >= 0; i--) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const gregorianMonth = date.getMonth() + 1
    const afghanMonthIndex = (gregorianMonth + 8) % 12
    const monthName = afghanMonths[afghanMonthIndex] || afghanMonths[0]
    monthlyMap.set(monthName, { users: 0, jobs: 0, applications: 0 })
  }

  monthlyUsers.forEach((u) => {
    const monthIndex = (u.createdAt.getMonth() + 8) % 12
    const monthName = afghanMonths[monthIndex]
    const current = monthlyMap.get(monthName)
    if (current) monthlyMap.set(monthName, { ...current, users: current.users + 1 })
  })

  monthlyJobs.forEach((j) => {
    const monthIndex = (j.createdAt.getMonth() + 8) % 12
    const monthName = afghanMonths[monthIndex]
    const current = monthlyMap.get(monthName)
    if (current) monthlyMap.set(monthName, { ...current, jobs: current.jobs + 1 })
  })

  monthlyApps.forEach((a) => {
    const monthIndex = (a.createdAt.getMonth() + 8) % 12
    const monthName = afghanMonths[monthIndex]
    const current = monthlyMap.get(monthName)
    if (current) monthlyMap.set(monthName, { ...current, applications: current.applications + 1 })
  })

  const monthlyData = Array.from(monthlyMap.entries()).map(([month, data]) => ({
    month,
    users: data.users,
    jobs: data.jobs,
    applications: data.applications,
  }))

  // داده‌های نمودار میله‌ای
  const statusLabels: Record<string, string> = {
    PENDING: "Pending",
    REVIEWING: "Reviewing",
    INTERVIEW: "Interview",
    REJECTED: "Rejected",
    HIRED: "Hired",
  }

  const applicationsData = statusCounts.map((s: { status: string; _count: number }) => ({
    name: statusLabels[s.status] || s.status,
    count: s._count,
  }))

  // داده‌های نمودار دایره‌ای
  const roleLabels: Record<string, string> = {
    ADMIN: "Admin",
    RECRUITER: "Recruiter",
    CANDIDATE: "Candidate",
  }

  const usersData = roleCounts.map((r: { role: string; _count: number }) => ({
    name: roleLabels[r.role] || r.role,
    value: r._count,
  }))

  // کارت‌های آمار
  const stats = isRecruiter
    ? [
        { title: t("myJobs"), value: myJobs, icon: "💼", color: "text-blue-500" },
        { title: t("totalJobs"), value: totalJobs, icon: "📋", color: "text-purple-500" },
        { title: t("totalApplications"), value: totalApplications, icon: "📨", color: "text-yellow-500" },
        { title: t("hired"), value: totalHired, icon: "✅", color: "text-green-500" },
      ]
    : [
        { title: t("totalJobs"), value: totalJobs, icon: "💼", color: "text-blue-500" },
        { title: t("myApplications"), value: myApplications, icon: "📨", color: "text-yellow-500" },
        { title: t("totalUsers"), value: totalUsers, icon: "👥", color: "text-purple-500" },
        { title: t("hired"), value: totalHired, icon: "✅", color: "text-green-500" },
      ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div>
            <h1 className="text-2xl font-bold dark:text-white">{t("title")}</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {t("welcome")}، {session.user?.name}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <NotificationBell />
            <LanguageSwitcher />
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Quick Actions */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/jobs"
            className="rounded-lg bg-white p-6 shadow transition hover:shadow-md dark:bg-gray-800"
          >
            <h2 className="text-lg font-semibold dark:text-white">💼 {tNav("jobs")}</h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {t("viewJobs")}
            </p>
          </Link>

          <Link
            href="/my-applications"
            className="rounded-lg bg-white p-6 shadow transition hover:shadow-md dark:bg-gray-800"
          >
            <h2 className="text-lg font-semibold dark:text-white">
              📋 {t("myApplications")}
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {t("myApplicationsCard")}
            </p>
          </Link>

          <Link
            href="/profile"
            className="rounded-lg bg-white p-6 shadow transition hover:shadow-md dark:bg-gray-800"
          >
            <h2 className="text-lg font-semibold dark:text-white">
              👤 {t("profileCard")}
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {t("profileCard")}
            </p>
          </Link>

          {isRecruiter && (
            <Link
              href="/jobs/new"
              className="rounded-lg bg-blue-600 p-6 text-white shadow transition hover:bg-blue-700"
            >
              <h2 className="text-lg font-semibold">➕ {t("newJob")}</h2>
              <p className="mt-1 text-sm opacity-90">{t("newJob")}</p>
            </Link>
          )}
        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ApplicationsChart data={applicationsData} />
          <UsersPieChart data={usersData} />
        </div>

        <div className="mt-6">
          <ApplicationsTrendChart data={trendData} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <WeeklyStatsChart data={weeklyData} />
          <HiringRateChart data={{ hired: totalHired, total: totalApplications }} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <UsersTrendChart data={usersTrendData} />
          <JobsStatusChart data={jobsStatusData} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <HiringFunnelChart data={hiringFunnelData} />
          <MonthlyStackedChart data={monthlyData} />
        </div>
      </div>
    </div>
  )
}