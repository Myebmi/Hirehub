import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 dark:from-blue-950/20 dark:via-gray-950 dark:to-purple-950/20">
      {/* Blur Circles */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-600/10" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl dark:bg-purple-600/10" />

      <div className="relative z-10 text-center">
        {/* 404 Number */}
        <div className="animate-fade-in mb-8">
          <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-9xl font-extrabold text-transparent md:text-[180px]">
            404
          </h1>
        </div>

        {/* Icon */}
        <div className="animate-bounce-subtle mb-6 text-7xl">🔍</div>

        {/* Title */}
        <h2 className="animate-fade-in delay-100 mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
          صفحه مورد نظر پیدا نشد
        </h2>

        {/* Description */}
        <p className="animate-fade-in delay-200 mx-auto mb-8 max-w-md text-lg text-gray-600 dark:text-gray-400">
          متأسفانه صفحه‌ای که دنبالش هستید وجود ندارد یا حذف شده است.
        </p>

        {/* Buttons */}
        <div className="animate-fade-in delay-300 flex flex-col items-center justify-center gap-4 md:flex-row">
          <Link
            href="/"
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/50 active:scale-95 md:w-auto"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              🏠
            </span>
            بازگشت به صفحه اصلی
          </Link>

          <Link
            href="/jobs"
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-8 py-3 font-semibold text-gray-900 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:bg-gray-50 hover:shadow-lg active:scale-95 md:w-auto dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
          >
            🔍 مشاهده آگهی‌ها
          </Link>
        </div>

        {/* Help Text */}
        <p className="animate-fade-in delay-500 mt-12 text-sm text-gray-500 dark:text-gray-500">
          اگه فکر می‌کنید این یه خطاست، لطفاً با ما تماس بگیرید.
        </p>
      </div>
    </div>
  )
}