"use client"

import { useState } from "react"
import { UploadButton } from "@uploadthing/react"
import { toast } from "sonner"
import type { OurFileRouter } from "@/lib/uploadthing"

export default function ResumeUploader({
  onUploadComplete,
}: {
  onUploadComplete: (url: string) => void
}) {
  const [url, setUrl] = useState<string>("")

  return (
    <div className="space-y-2">
      <UploadButton<OurFileRouter, "resumeUploader">
        endpoint="resumeUploader"
        onClientUploadComplete={(res) => {
          if (res && res[0]) {
            const fileUrl = res[0].url
            setUrl(fileUrl)
            onUploadComplete(fileUrl)
            toast.success("رزومه با موفقیت آپلود شد! 📄", {
              description: "فایل شما آماده استفاده است",
            })
          }
        }}
        onUploadError={(error: Error) => {
          toast.error("خطا در آپلود", {
            description: error.message,
          })
        }}
        appearance={{
          button:
            "ut-ready:bg-blue-600 ut-uploading:bg-blue-500 ut-ready:text-white ut-uploading:text-white rounded-md px-4 py-2 text-sm",
          allowedContent: "text-gray-500 text-xs dark:text-gray-400",
        }}
        content={{
          button({ ready }) {
            if (ready) return "📄 آپلود رزومه (PDF)"
            return "در حال آماده‌سازی..."
          },
          allowedContent: "PDF — حداکثر 16 مگابایت",
        }}
      />
      {url && (
        <p className="text-xs text-green-600 dark:text-green-400">
          ✅ فایل آپلود شد: {url.substring(0, 40)}...
        </p>
      )}
    </div>
  )
}