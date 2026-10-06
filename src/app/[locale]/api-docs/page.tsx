import { getApiDocs } from "@/lib/swagger"
import SwaggerUIComponent from "./SwaggerUI"

export const metadata = {
  title: "API Documentation | HireHub",
  description: "مستندات API HireHub",
}

export default async function ApiDocsPage() {
  const spec = await getApiDocs()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold dark:text-white">
            📚 مستندات API
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            API های HireHub برای استفاده توسعه‌دهندگان
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <SwaggerUIComponent spec={spec} />
        </div>
      </div>
    </div>
  )
}