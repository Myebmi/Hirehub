"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { applyToJob } from "@/actions/application"

export default function ApplyButton({ jobId }: { jobId: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    formData.append("jobId", jobId)

    const result = await applyToJob(formData)

    if (result.success) {
      setOpen(false)
      router.refresh()
    } else {
      setError(result.error || "خطایی رخ داد")
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-md bg-blue-600 p-3 text-white hover:bg-blue-700"
      >
        ارسال درخواست
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6">
            <h2 className="text-xl font-bold">ارسال درخواست</h2>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium">
                  نامه پوششی *
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  required
                  rows={5}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                  placeholder="چرا برای این موقعیت مناسب هستید؟"
                />
              </div>

              <div>
                <label htmlFor="resumeUrl" className="block text-sm font-medium">
                  لینک رزومه (اختیاری)
                </label>
                <input
                  id="resumeUrl"
                  name="resumeUrl"
                  type="url"
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                  placeholder="https://example.com/resume.pdf"
                />
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "در حال ارسال..." : "ارسال"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-gray-300 px-6 py-2 hover:bg-gray-50"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}