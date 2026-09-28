import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-5xl font-bold">HireHub 🚀</h1>
      <p className="text-lg text-gray-600">سیستم مدیریت استخدام</p>
      
      <div className="mt-8 flex gap-4">
        <Link
          href="/register"
          className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          ثبت‌نام
        </Link>
        <Link
          href="/login"
          className="rounded-md border border-gray-300 px-6 py-2 hover:bg-gray-50"
        >
          ورود
        </Link>
      </div>
    </main>
  )
}