import createMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse } from "next/server"
import { routing } from "./i18n/routing"
import { auth } from "@/../auth"

const intlMiddleware = createMiddleware(routing)

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // ✅ چک کن اگه مسیر /admin هست، کاربر ADMIN باشه
  const isAdminPath = /^\/(fa|en)\/admin/.test(pathname)

  if (isAdminPath) {
    const session = await auth()

    if (!session?.user) {
      const locale = pathname.split("/")[1] || "fa"
      return NextResponse.redirect(
        new URL(`/${locale}/login`, request.url)
      )
    }

    if (session.user.role !== "ADMIN") {
      const locale = pathname.split("/")[1] || "fa"
      return NextResponse.redirect(
        new URL(`/${locale}/dashboard`, request.url)
      )
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}