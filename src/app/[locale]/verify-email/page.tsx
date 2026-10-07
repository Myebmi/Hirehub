import { Link } from "@/i18n/navigation"
import { verifyEmail } from "@/actions/email-verification"

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams
  const token = params.token

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
        <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-gray-800">
          <div className="mb-4 text-6xl">❌</div>
          <h2 className="mb-4 text-2xl font-bold dark:text-white">
            توکن یافت نشد
          </h2>
          <Link
            href="/login"
            className="inline-block rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            بازگشت به ورود
          </Link>
        </div>
      </div>
    )
  }

  const result = await verifyEmail(token)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-gray-800">
        <div className="mb-4 text-6xl">
          {result.success ? "✅" : "❌"}
        </div>
        <h2 className="mb-4 text-2xl font-bold dark:text-white">
          {result.success ? "ایمیل شما تأیید شد!" : result.error}
        </h2>
        <Link
          href={result.success ? "/dashboard" : "/login"}
          className="inline-block rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          {result.success ? "رفتن به داشبورد" : "بازگشت به ورود"}
        </Link>
      </div>
    </div>
  )
}