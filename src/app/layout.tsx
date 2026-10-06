import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "sonner"
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister"
import "./globals.css"

export const metadata: Metadata = {
    metadataBase: new URL(process.env.AUTH_URL || "http://localhost:3000"),
  title: {
    default: "HireHub - سیستم مدیریت استخدام",
    template: "%s | HireHub",
  },
  description:
    "پلتفرم استخدام نسل جدید برای اتصال کارجویان و استخدام‌کنندگان. آگهی‌های شغلی، مدیریت متقاضیان، و داشبورد حرفه‌ای.",
  keywords: [
    "استخدام",
    "کار",
    "شغل",
    "آگهی شغلی",
    "کارجو",
    "استخدام‌کننده",
    "HireHub",
    "افغانستان",
  ],
  authors: [{ name: "Yasen Ebrahimi" }],
  creator: "Yasen Ebrahimi",
  publisher: "HireHub",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HireHub",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-192x192.png",
  },
  openGraph: {
    type: "website",
    locale: "fa_AF",
    url: "https://hirelink.vercel.app",
    siteName: "HireHub",
    title: "HireHub - سیستم مدیریت استخدام",
    description:
      "پلتفرم استخدام نسل جدید برای اتصال کارجویان و استخدام‌کنندگان",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HireHub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HireHub - سیستم مدیریت استخدام",
    description:
      "پلتفرم استخدام نسل جدید برای اتصال کارجویان و استخدام‌کنندگان",
    images: ["/og-image.png"],
    creator: "@hirehub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" richColors closeButton />
          <ServiceWorkerRegister />
        </ThemeProvider>
      </body>
    </html>
  )
}