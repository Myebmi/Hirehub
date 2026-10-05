const CACHE_NAME = "hirehub-v1"
const urlsToCache = [
  "/",
  "/jobs",
  "/login",
  "/register",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
]

// نصب Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache")
      return cache.addAll(urlsToCache)
    })
  )
  self.skipWaiting()
})

// فعال‌سازی
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch — استراتژی Network First
self.addEventListener("fetch", (event) => {
  // فقط GET رو کش کن
  if (event.request.method !== "GET") return

  // API و auth رو کش نکن
  if (
    event.request.url.includes("/api/") ||
    event.request.url.includes("/_next/")
  ) {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // کپی از response برای cache
        const responseToCache = response.clone()

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
      .catch(() => {
        // اگه آفلاین بود، از cache بگیر
        return caches.match(event.request).then((response) => {
          if (response) {
            return response
          }
          // اگه توی cache نبود، صفحه اصلی رو نشون بده
          return caches.match("/")
        })
      })
  )
})