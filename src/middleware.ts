import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  // همه مسیرها به جز API و فایل‌های استاتیک
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}