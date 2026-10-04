"use client"

import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts"

type HiringRateData = {
  hired: number
  total: number
}

export default function HiringRateChart({ data }: { data: HiringRateData }) {
  const rate = data.total > 0 ? Math.round((data.hired / data.total) * 100) : 0

  const chartData = [
    {
      name: "نرخ استخدام",
      value: rate,
      fill: "#10b981",
    },
  ]

  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <h2 className="mb-4 text-lg font-semibold dark:text-white">نرخ استخدام</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="90%"
          barSize={20}
          data={chartData}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
            fill="#10b981"
          />
          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="bottom"
            wrapperStyle={{ color: "#6b7280" }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="mt-2 text-center">
        <p className="text-4xl font-bold text-green-600 dark:text-green-400">
          {rate}%
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {data.hired} از {data.total} درخواست
        </p>
      </div>
    </div>
  )
}