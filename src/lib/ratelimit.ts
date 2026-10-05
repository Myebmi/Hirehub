import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// اگه Upstash تنظیم نشده باشه، null برمی‌گردونه
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null

// Rate Limiter برای Login (۵ درخواست در ۱ دقیقه)
export const loginRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      analytics: true,
      prefix: "ratelimit:login",
    })
  : null

// Rate Limiter برای Register (۳ درخواست در ۱ ساعت)
export const registerRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "1 h"),
      analytics: true,
      prefix: "ratelimit:register",
    })
  : null

// Rate Limiter برای API عمومی (۳۰ درخواست در ۱ دقیقه)
export const apiRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, "1 m"),
      analytics: true,
      prefix: "ratelimit:api",
    })
  : null

// Rate Limiter برای ایجاد آگهی (۱۰ در ۱ ساعت)
export const createJobRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 h"),
      analytics: true,
      prefix: "ratelimit:createJob",
    })
  : null

// Rate Limiter برای ارسال درخواست (۵ در ۱ ساعت)
export const applyRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      analytics: true,
      prefix: "ratelimit:apply",
    })
  : null