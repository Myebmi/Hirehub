import { handlers } from "@/../auth"

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: ورود به سیستم
 *     description: ورود با ایمیل و رمز عبور
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: ورود موفق
 *       401:
 *         description: ایمیل یا رمز اشتباه
 */
export const { GET, POST } = handlers