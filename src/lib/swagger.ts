import { createSwaggerSpec } from "next-swagger-doc"

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "HireHub API",
        version: "1.0.0",
        description: "API documentation for HireHub - Hiring Management System",
      },
      servers: [
        {
          url: process.env.AUTH_URL || "http://localhost:3000",
          description: "Development Server",
        },
      ],
      components: {
        securitySchemes: {
          cookieAuth: {
            type: "apiKey",
            in: "cookie",
            name: "authjs.session-token",
          },
        },
      },
      security: [],
      tags: [
        { name: "Auth", description: "احراز هویت" },
        { name: "Jobs", description: "مدیریت آگهی‌ها" },
        { name: "Applications", description: "مدیریت درخواست‌ها" },
        { name: "Users", description: "مدیریت کاربران" },
      ],
    },
  })
  return spec
}