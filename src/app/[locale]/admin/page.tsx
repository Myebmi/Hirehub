import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/../auth"
import { prisma } from "@/lib/prisma"
import ThemeToggle from "@/components/ThemeToggle"
import LogoutButton from "@/components/LogoutButton"
import UserRow from "./UserRow"
import JobRow from "./JobRow"

export default async function AdminPage() {
  const session = await auth()

  // چک ادمین
  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  // آمار
  const [
    totalUsers,
    totalJobs,
    totalApplications,
    recentUsers,
    recentJobs,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.job.count(),
    prisma.application.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        _count: {
          select: { jobs: true, applications: true },
        },
      },
    }),
    prisma.job.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: {
        recruiter: {
          select: { name: true, email: true },
        },
        _count: {
          select: { applications: true },
        },
      },
    }),
  ])

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔐</span>
              <h1 className="text-2xl font-bold dark:text-white">
                پنل ادمین
              </h1>
            </div>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              خوش آمدی، {session.user.name} (مدیر)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              داشبورد
            </Link>
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow">
            <div className="text-sm opacity-90">کل کاربران</div>
            <div className="mt-2 text-4xl font-bold">{totalUsers}</div>
            <div className="mt-2 text-3xl opacity-50">👥</div>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow">
            <div className="text-sm opacity-90">کل آگهی‌ها</div>
            <div className="mt-2 text-4xl font-bold">{totalJobs}</div>
            <div className="mt-2 text-3xl opacity-50">💼</div>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow">
            <div className="text-sm opacity-90">کل درخواست‌ها</div>
            <div className="mt-2 text-4xl font-bold">{totalApplications}</div>
            <div className="mt-2 text-3xl opacity-50">📨</div>
          </div>
        </div>

        {/* Users Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold dark:text-white">
            👥 مدیریت کاربران (۲۰ کاربر آخر)
          </h2>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </div>
        </div>

        {/* Jobs Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold dark:text-white">
            💼 مدیریت آگهی‌ها (۲۰ آگهی آخر)
          </h2>
          <div className="space-y-3">
            {recentJobs.map((job) => (
              <JobRow key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}