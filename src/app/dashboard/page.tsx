import Link from "next/link"
import { auth } from "@/../auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import LogoutButton from "@/components/LogoutButton"
import StatsCards from "@/components/stats/StatsCards"
import ApplicationsChart from "@/components/stats/ApplicationsChart"
import UsersPieChart from "@/components/stats/UsersPieChart"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const isRecruiter =
    session.user?.role === "RECRUITER" || session.user?.role === "ADMIN"

  // همه Queryها رو موازی اجرا کن
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

  // داده‌های نمودار میله‌ای
  const statusLabels: Record<string, string> = {
    PENDING: "در انتظار",
    REVIEWING: "بررسی",
    INTERVIEW: "مصاحبه",
    REJECTED: "رد شده",
    HIRED: "استخدام",
  }

  const applicationsData = statusCounts.map(
    (s: { status: string; _count: number }) => ({
      name: statusLabels[s.status] || s.status,
      count: s._count,
    })
  )

  // داده‌های نمودار دایره‌ای
  const roleLabels: Record<string, string> = {
    ADMIN: "ادمین",
    RECRUITER: "استخدام‌کننده",
    CANDIDATE: "کارجو",
  }

  const usersData = roleCounts.map(
    (r: { role: string; _count: number }) => ({
      name: roleLabels[r.role] || r.role,
      value: r._count,
    })
  )

  // کارت‌های آمار
  const stats = isRecruiter
    ? [
        { title: "آگهی‌های من", value: myJobs, icon: "💼", color: "text-blue-500" },
        { title: "کل آگهی‌ها", value: totalJobs, icon: "📋", color: "text-purple-500" },
        { title: "کل درخواست‌ها", value: totalApplications, icon: "📨", color: "text-yellow-500" },
        { title: "استخدام شده", value: totalHired, icon: "✅", color: "text-green-500" },
      ]
    : [
        { title: "کل آگهی‌ها", value: totalJobs, icon: "💼", color: "text-blue-500" },
        { title: "درخواست‌های من", value: myApplications, icon: "📨", color: "text-yellow-500" },
        { title: "کل کاربران", value: totalUsers, icon: "👥", color: "text-purple-500" },
        { title: "استخدام شده", value: totalHired, icon: "✅", color: "text-green-500" },
      ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between rounded-lg bg-white p-6 shadow">
          <div>
            <h1 className="text-2xl font-bold">داشبورد HireHub</h1>
            <p className="mt-1 text-gray-600">خوش آمدی، {session.user?.name}</p>
          </div>
          <LogoutButton />
        </div>

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Quick Actions */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link
            href="/jobs"
            className="rounded-lg bg-white p-6 shadow transition hover:shadow-md"
          >
            <h2 className="text-lg font-semibold">💼 آگهی‌ها</h2>
            <p className="mt-1 text-sm text-gray-600">مشاهده همه آگهی‌ها</p>
          </Link>

          <Link
            href="/my-applications"
            className="rounded-lg bg-white p-6 shadow transition hover:shadow-md"
          >
            <h2 className="text-lg font-semibold">📋 درخواست‌های من</h2>
            <p className="mt-1 text-sm text-gray-600">درخواست‌های فرستاده</p>
          </Link>

          {isRecruiter && (
            <Link
              href="/jobs/new"
              className="rounded-lg bg-blue-600 p-6 text-white shadow transition hover:bg-blue-700"
            >
              <h2 className="text-lg font-semibold">➕ آگهی جدید</h2>
              <p className="mt-1 text-sm opacity-90">ثبت موقعیت شغلی</p>
            </Link>
          )}
        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ApplicationsChart data={applicationsData} />
          <UsersPieChart data={usersData} />
        </div>
      </div>
    </div>
  )
}