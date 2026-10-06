import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/../auth"

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     tags:
 *       - Jobs
 *     summary: لیست همه آگهی‌ها
 *     description: دریافت لیست آگهی‌های شغلی فعال
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: جستجو در عنوان و توضیحات
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [FULL_TIME, PART_TIME, REMOTE, CONTRACT, INTERNSHIP]
 *         description: فیلتر بر اساس نوع همکاری
 *     responses:
 *       200:
 *         description: لیست آگهی‌ها
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q") || ""
  const type = searchParams.get("type") || ""

  const where: any = { status: "OPEN" }

  if (q) {
    where.OR = [
      { title: { contains: q } },
      { description: { contains: q } },
    ]
  }

  if (type) {
    where.type = type
  }

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      recruiter: {
        select: { name: true, email: true },
      },
      _count: {
        select: { applications: true },
      },
    },
  })

  return NextResponse.json(jobs)
}

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     tags:
 *       - Jobs
 *     summary: ساخت آگهی جدید
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - location
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *                 example: برنامه‌نویس فرانت‌اند
 *               description:
 *                 type: string
 *                 example: حداقل ۳ سال تجربه React
 *               location:
 *                 type: string
 *                 example: کابل، افغانستان
 *               salary:
 *                 type: number
 *                 example: 50000
 *               type:
 *                 type: string
 *                 enum: [FULL_TIME, PART_TIME, REMOTE, CONTRACT, INTERNSHIP]
 *     responses:
 *       201:
 *         description: آگهی ساخته شد
 *       401:
 *         description: دسترسی ندارید
 */
export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "دسترسی ندارید" }, { status: 401 })
  }

  const body = await request.json()

  const job = await prisma.job.create({
    data: {
      ...body,
      recruiterId: session.user.id,
    },
  })

  return NextResponse.json(job, { status: 201 })
}