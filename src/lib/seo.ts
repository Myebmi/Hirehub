import type { Metadata } from "next"

const baseUrl = process.env.AUTH_URL || "https://hirehub.vercel.app"

export function constructMetadata({
  title = "HireHub - سیستم مدیریت استخدام",
  description = "پلتفرم استخدام نسل جدید برای اتصال کارجویان و استخدام‌کنندگان",
  image = "/og-image.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
      type: "website",
      locale: "fa_AF",
      siteName: "HireHub",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@hirehub",
    },
    icons,
    metadataBase: new URL(baseUrl),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}