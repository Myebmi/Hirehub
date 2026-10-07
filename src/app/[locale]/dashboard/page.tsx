import Link from "next/link"
import { auth } from "@/../auth"
import { redirect } from "next/navigation"
import { getTranslations } from "next-intl/server"
import LogoutButton from "@/components/LogoutButton"
import StatsCards from "@/components/stats/StatsCards"
import ThemeToggle from "@/components/ThemeToggle"
import NotificationBell from "@/components/NotificationBell"
import LanguageSwitcher from "@/components/LanguageSwitcher"
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
import {
  getDashboardStats,
  getChartData,
  getApplicationsTrend,
  getUsersTrend,
  getWeeklyStats,
  getJobsStatus,
  getHiringFunnel,
  getMonthlyActivity,
} from "@/lib/queries/dashboard"

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
    stats,
    { statusCounts, roleCounts },
    trendData,
    usersTrendData,
    weeklyData,
    jobsStatus,
    funnel,
    monthlyData,
  ] = await Promise.all([
    getDashboardStats(session.user.id, isRecruiter),
    getChartData(),
    getApplicationsTrend(),
    getUsersTrend(),
    getWeeklyStats(),
    getJobsStatus(),
    getHiringFunnel(),
    getMonthlyActivity(),
  ])

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

  const roleLabels: Record<string, string> = {
    ADMIN: "Admin",
    RECRUITER: "Recruiter",
    CANDIDATE: "Candidate",
  }

  const usersData = roleCounts.map((r: { role: string; _count: number }) => ({
    name: roleLabels[r.role] || r.role,
    value: r._count,
  }))

  const jobsStatusData = [
    { name: t("charts.jobsStatus"), value: jobsStatus.openJobs, color: "#10b981" },
    { name: "Draft", value: jobsStatus.draftJobs, color: "#f59e0b" },
    { name: "Closed", value: jobsStatus.closedJobs, color: "#ef4444" },
  ]

  const hiringFunnelData = [
    { status: "Pending", count: funnel.pending, fill: "#f59e0b" },
    { status: "Reviewing", count: funnel.reviewing, fill: "#3b82f6" },
    { status: "Interview", count: funnel.interview, fill: "#8b5cf6" },
    { status: "Hired", count: funnel.hired, fill: "#10b981" },
    { status: "Rejected", count: funnel.rejected, fill: "#ef4444" },
  ]

  const statsCards = isRecruiter
    ? [
        { title: t("myJobs"), value: stats.myJobs, icon: "💼", color: "text-blue-500" },
        { title: t("totalJobs"), value: stats.totalJobs, icon: "📋", color: "text-purple-500" },
        { title: t("totalApplications"), value: stats.totalApplications, icon: "📨", color: "text-yellow-500" },
        { title: t("hired"), value: stats.totalHired, icon: "✅", color: "text-green-500" },
      ]
    : [
        { title: t("totalJobs"), value: stats.totalJobs, icon: "💼", color: "text-blue-500" },
        { title: t("myApplications"), value: stats.myApplications, icon: "📨", color: "text-yellow-500" },
        { title: t("totalUsers"), value: stats.totalUsers, icon: "👥", color: "text-purple-500" },
        { title: t("hired"), value: stats.totalHired, icon: "✅", color: "text-green-500" },
      ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl">
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

        <StatsCards stats={statsCards} />

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

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ApplicationsChart data={applicationsData} />
          <UsersPieChart data={usersData} />
        </div>

        <div className="mt-6">
          <ApplicationsTrendChart data={trendData} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <WeeklyStatsChart data={weeklyData} />
          <HiringRateChart
            data={{ hired: stats.totalHired, total: stats.totalApplications }}
          />
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