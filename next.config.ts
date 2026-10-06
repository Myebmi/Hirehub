import type { NextConfig } from "next"

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
]

const nextConfig: NextConfig = {
  // ✅ حذف console.log در Production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ✅ بهینه‌سازی تصاویر
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "utfs.io" }, // UploadThing
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },

  // ✅ بهینه‌سازی پکیج‌ها
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts", "date-fns"],
  },

  // ✅ Security Headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },

  // ✅ Redirects
  async redirects() {
    return []
  },
}

export default nextConfig