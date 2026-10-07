import { unstable_cache } from "next/cache"
import { prisma } from "@/lib/prisma"
import { toAfghanDate } from "@/lib/afghanDate"

// ============================================
// 1. آمار کلی (کارت‌های Stats)
// ============================================
export const getDashboardStats = unstable_cache(
  async (userId: string, isRecruiter: boolean) => {
    const [
      totalJobs,
      totalApplications,
      totalUsers,
      totalHired,
      myJobs,
      myApplications,
    ] = await Promise.all([
      prisma.job.count(),
      prisma.application.count(),
      prisma.user.count(),
      prisma.application.count({ where: { status: "HIRED" } }),
      isRecruiter
        ? prisma.job.count({ where: { recruiterId: userId } })
        : Promise.resolve(0),
      !isRecruiter
        ? prisma.application.count({ where: { applicantId: userId } })
        : Promise.resolve(0),
    ])
    return {
      totalJobs,
      totalApplications,
      totalUsers,
      totalHired,
      myJobs,
      myApplications,
    }
  },
  ["dashboard-stats"],
  { revalidate: 60, tags: ["dashboard"] }
)

// ============================================
// 2. نمودار وضعیت درخواست‌ها + نقش کاربران
// ============================================
export const getChartData = unstable_cache(
  async () => {
    const [statusCounts, roleCounts] = await Promise.all([
      prisma.application.groupBy({ by: ["status"], _count: true }),
      prisma.user.groupBy({ by: ["role"], _count: true }),
    ])
    return { statusCounts, roleCounts }
  },
  ["dashboard-charts"],
  { revalidate: 120, tags: ["dashboard"] }
)

// ============================================
// 3. روند درخواست‌ها (30 روز)
// ============================================
export const getApplicationsTrend = unstable_cache(
  async () => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const applications = await prisma.application.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
    })

    const map = new Map<string, number>()
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      map.set(toAfghanDate(date), 0)
    }
    applications.forEach((app) => {
      const key = toAfghanDate(app.createdAt)
      if (map.has(key)) map.set(key, (map.get(key) || 0) + 1)
    })
    return Array.from(map.entries()).map(([date, count]) => ({ date, count }))
  },
  ["dashboard-apps-trend"],
  { revalidate: 60, tags: ["dashboard"] }
)

// ============================================
// 4. روند کاربران (30 روز)
// ============================================
export const getUsersTrend = unstable_cache(
  async () => {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const users = await prisma.user.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
    })

    const map = new Map<string, number>()
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      map.set(toAfghanDate(date), 0)
    }
    users.forEach((user) => {
      const key = toAfghanDate(user.createdAt)
      if (map.has(key)) map.set(key, (map.get(key) || 0) + 1)
    })
    return Array.from(map.entries()).map(([date, count]) => ({ date, count }))
  },
  ["dashboard-users-trend"],
  { revalidate: 60, tags: ["dashboard"] }
)

// ============================================
// 5. آمار هفتگی (7 روز اخیر)
// ============================================
export const getWeeklyStats = unstable_cache(
  async () => {
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

    const dayNames = ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"]
    const map = new Map<string, { jobs: number; applications: number }>()

    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      map.set(dayNames[date.getDay()], { jobs: 0, applications: 0 })
    }

    weeklyJobs.forEach((job) => {
      const day = dayNames[job.createdAt.getDay()]
      const current = map.get(day)
      if (current) map.set(day, { ...current, jobs: current.jobs + 1 })
    })

    weeklyApplications.forEach((app) => {
      const day = dayNames[app.createdAt.getDay()]
      const current = map.get(day)
      if (current) map.set(day, { ...current, applications: current.applications + 1 })
    })

    return Array.from(map.entries()).map(([day, data]) => ({
      day,
      jobs: data.jobs,
      applications: data.applications,
    }))
  },
  ["dashboard-weekly"],
  { revalidate: 60, tags: ["dashboard"] }
)

// ============================================
// 6. وضعیت آگهی‌ها
// ============================================
export const getJobsStatus = unstable_cache(
  async () => {
    const [openJobs, draftJobs, closedJobs] = await Promise.all([
      prisma.job.count({ where: { status: "OPEN" } }),
      prisma.job.count({ where: { status: "DRAFT" } }),
      prisma.job.count({ where: { status: "CLOSED" } }),
    ])
    return { openJobs, draftJobs, closedJobs }
  },
  ["dashboard-jobs-status"],
  { revalidate: 60, tags: ["dashboard"] }
)

// ============================================
// 7. قیف استخدام
// ============================================
export const getHiringFunnel = unstable_cache(
  async () => {
    const [pending, reviewing, interview, rejected, hired] = await Promise.all([
      prisma.application.count({ where: { status: "PENDING" } }),
      prisma.application.count({ where: { status: "REVIEWING" } }),
      prisma.application.count({ where: { status: "INTERVIEW" } }),
      prisma.application.count({ where: { status: "REJECTED" } }),
      prisma.application.count({ where: { status: "HIRED" } }),
    ])
    return { pending, reviewing, interview, rejected, hired }
  },
  ["dashboard-funnel"],
  { revalidate: 60, tags: ["dashboard"] }
)

// ============================================
// 8. فعالیت ماهانه (6 ماه)
// ============================================
export const getMonthlyActivity = unstable_cache(
  async () => {
    const afghanMonths = ["حمل", "ثور", "جوزا", "سرطان", "اسد", "سنبله", "میزان", "عقرب", "قوس", "جدی", "دلو", "حوت"]

    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const [users, jobs, apps] = await Promise.all([
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

    const map = new Map<string, { users: number; jobs: number; applications: number }>()

    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const idx = (date.getMonth() + 8) % 12
      map.set(afghanMonths[idx], { users: 0, jobs: 0, applications: 0 })
    }

    users.forEach((u) => {
      const idx = (u.createdAt.getMonth() + 8) % 12
      const month = afghanMonths[idx]
      const current = map.get(month)
      if (current) map.set(month, { ...current, users: current.users + 1 })
    })

    jobs.forEach((j) => {
      const idx = (j.createdAt.getMonth() + 8) % 12
      const month = afghanMonths[idx]
      const current = map.get(month)
      if (current) map.set(month, { ...current, jobs: current.jobs + 1 })
    })

    apps.forEach((a) => {
      const idx = (a.createdAt.getMonth() + 8) % 12
      const month = afghanMonths[idx]
      const current = map.get(month)
      if (current) map.set(month, { ...current, applications: current.applications + 1 })
    })

    return Array.from(map.entries()).map(([month, data]) => ({
      month,
      users: data.users,
      jobs: data.jobs,
      applications: data.applications,
    }))
  },
  ["dashboard-monthly"],
  { revalidate: 300, tags: ["dashboard"] }
)