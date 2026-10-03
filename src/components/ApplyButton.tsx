"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { applyToJob } from "@/actions/application"
import ResumeUploader from "./ResumeUploader"

export default function ApplyButton({ jobId }: { jobId: string }) {
  const [resumeUrl, setResumeUrl] = useState("")
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
    formData.append("resumeUrl", resumeUrl)

    const result = await applyToJob(formData)

    if (result.success) {
      toast.success("درخواست شما با موفقیت ارسال شد! 🎉", {
        description: "می‌توانید وضعیت را در «درخواست‌های من» ببینید",
      })
      setOpen(false)
      router.refresh()
    } else {
      setError(result.error || "خطایی رخ داد")
      toast.error("خطا در ارسال درخواست", {
        description: result.error || "لطفاً دوباره تلاش کنید",
      })
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-md bg-blue-600 p-3 text-white transition hover:bg-blue-700"
      >
        ارسال درخواست
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
            <h2 className="text-xl font-bold dark:text-white">ارسال درخواست</h2>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {/* Cover Letter */}
              <div>
                <label
                  htmlFor="coverLetter"
                  className="block text-sm font-medium dark:text-gray-300"
                >
                  نامه پوششی *
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  required
                  rows={5}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  placeholder="چرا برای این موقعیت مناسب هستید؟"
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium dark:text-gray-300">
                  رزومه (اختیاری)
                </label>
                <p className="mt-1 mb-3 text-xs text-gray-500 dark:text-gray-400">
                  می‌توانید رزومه خود را با فرمت PDF آپلود کنید یا لینک آن را وارد کنید.
                </p>

                {/* Uploader */}
                <ResumeUploader onUploadComplete={setResumeUrl} />

                {/* Or URL input */}
                <div className="mt-3">
                  <label
                    htmlFor="resumeUrl"
                    className="block text-xs text-gray-500 dark:text-gray-400"
                  >
                    یا لینک رزومه:
                  </label>
                  <input
                    id="resumeUrl"
                    type="url"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="https://example.com/resume.pdf"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-md bg-blue-600 p-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "در حال ارسال..." : "ارسال"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-gray-300 px-6 py-2 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
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