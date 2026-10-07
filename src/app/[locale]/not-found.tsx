import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"

export default async function NotFound() {
  const t = await getTranslations("common")

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="text-center">
        <div className="mb-4 text-8xl font-bold text-blue-600 dark:text-blue-400">
          404
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          {t("notFoundTitle")}
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          {t("notFoundMessage")}
        </p>
        <Link
          href="/"
          className="inline-block rounded-md bg-blue-600 px-6 py-3 text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl active:scale-95"
        >
          🏠 {t("goHome")}
        </Link>
      </div>
    </div>
  )
}