export default function NotFound() {
  return (
    <html lang="fa" dir="rtl">
      <body style={{ fontFamily: "system-ui", margin: 0 }}>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
            background: "#f9fafb",
            padding: "1rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "6rem",
                fontWeight: "bold",
                color: "#2563eb",
              }}
            >
              404
            </div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "0.5rem",
              }}
            >
              صفحه مورد نظر پیدا نشد
            </h1>
            <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
              متأسفانه صفحه‌ای که دنبالش هستید وجود ندارد یا حذف شده است.
            </p>
            <a
              href="/fa"
              style={{
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                background: "#2563eb",
                color: "white",
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              🏠 بازگشت به صفحه اصلی
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}