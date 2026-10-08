import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/../auth"
import { prisma } from "@/lib/prisma"
import ThemeToggle from "@/components/ThemeToggle"
import LogoutButton from "@/components/LogoutButton"
import AdminNav from "@/components/admin/AdminNav"
import Pagination from "@/components/ui/Pagination"
import UserRow from "../UserRow"

const PAGE_SIZE = 20

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const session = await auth()

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || "1"))

  const [totalCount, users] = await Promise.all([
    prisma.user.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        _count: {
          select: { jobs: true, applications: true },
        },
      },
    }),
  ])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">👥</span>
              <h1 className="text-2xl font-bold dark:text-white">
                مدیریت کاربران
              </h1>
            </div>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              {totalCount} کاربر در سیستم
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              بازگشت
            </Link>
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>

        {/* Nav */}
        <AdminNav />

        {/* Users List */}
        {users.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow dark:bg-gray-800">
            <p className="text-gray-500 dark:text-gray-400">
              هیچ کاربری وجود ندارد
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {users.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/admin/users"
            />

            <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
              نمایش {(currentPage - 1) * PAGE_SIZE + 1}-
              {Math.min(currentPage * PAGE_SIZE, totalCount)} از {totalCount}
            </p>
          </>
        )}
      </div>
    </div>
  )
}