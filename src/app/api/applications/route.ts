import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/../auth"

/**
 * @swagger
 * /api/applications:
 *   get:
 *     tags:
 *       - Applications
 *     summary: لیست درخواست‌ها
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: لیست درخواست‌های کاربر
 */
export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 401 })
  }

  const applications = await prisma.application.findMany({
    where: { applicantId: session.user.id },
    include: {
      job: {
        select: {
          id: true,
          title: true,
          location: true,
        },
      },
    },
  })

  return NextResponse.json(applications)
}

/**
 * @swagger
 * /api/applications:
 *   post:
 *     tags:
 *       - Applications
 *     summary: ارسال درخواست جدید
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobId
 *               - coverLetter
 *             properties:
 *               jobId:
 *                 type: string
 *               coverLetter:
 *                 type: string
 *               resumeUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: درخواست ارسال شد
 *       400:
 *         description: داده نامعتبر
 *       401:
 *         description: دسترسی ندارید
 */
export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 401 })
  }

  const body = await request.json()

  const application = await prisma.application.create({
    data: {
      jobId: body.jobId,
      applicantId: session.user.id,
      coverLetter: body.coverLetter,
      resumeUrl: body.resumeUrl || null,
    },
  })

  return NextResponse.json(application, { status: 201 })
}