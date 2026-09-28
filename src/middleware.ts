import { auth } from "@/../auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || 
                     req.nextUrl.pathname.startsWith("/register")
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard")

  // اگه کاربر لاگین کرده و می‌خواد بره login/register → ببرش dashboard
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // اگه کاربر لاگین نکرده و می‌خواد بره dashboard → ببرش login
  if (!isLoggedIn && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}