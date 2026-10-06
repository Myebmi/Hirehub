import Link from "next/link"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { auth } from "@/../auth"
import ProfileForm from "./ProfileForm"
import ChangePasswordForm from "./ChangePasswordForm"
import ThemeToggle from "@/components/ThemeToggle"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          jobs: true,
          applications: true,
        },
      },
    },
  })

  if (!user) {
    redirect("/login")
  }

  const roleLabels: Record<string, string> = {
    ADMIN: "ادمین",
    RECRUITER: "استخدام‌کننده",
    CANDIDATE: "کارجو",
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link
              href="/dashboard"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              ← بازگشت به داشبورد
            </Link>
            <h1 className="mt-2 text-3xl font-bold dark:text-white">
              پروفایل کاربری
            </h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Info Card */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
              {user.name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-xl font-bold dark:text-white">{user.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </p>
              <span className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {roleLabels[user.role] || user.role}
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4 dark:border-gray-700">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                تعداد آگهی‌ها
              </p>
              <p className="text-lg font-bold dark:text-white">
                {user._count.jobs}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                تعداد درخواست‌ها
              </p>
              <p className="text-lg font-bold dark:text-white">
                {user._count.applications}
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            عضو از: {new Date(user.createdAt).toLocaleDateString("fa-IR")}
          </p>
        </div>

        {/* Profile Form */}
        <ProfileForm user={{ name: user.name || "", email: user.email }} />

        {/* Password Form */}
        <div className="mt-6">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  )
}