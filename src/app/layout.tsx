import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "sonner"
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HireHub - سیستم مدیریت استخدام",
  description: "پلتفرم استخدام نسل جدید برای اتصال کارجویان و استخدام‌کنندگان",
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
      <body className={inter.className}>
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