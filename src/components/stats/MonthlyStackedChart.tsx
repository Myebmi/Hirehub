"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

type MonthlyData = {
  month: string
  jobs: number
  applications: number
  users: number
}

export default function MonthlyStackedChart({ data }: { data: MonthlyData[] }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <h2 className="mb-4 text-lg font-semibold dark:text-white">
        فعالیت ماهانه (۶ ماه اخیر)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxis
            dataKey="month"
            stroke="#6b7280"
            style={{ fontSize: "12px" }}
          />
          <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          <Legend wrapperStyle={{ color: "#6b7280" }} />
          <Bar
            dataKey="users"
            name="کاربران"
            stackId="a"
            fill="#8b5cf6"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="jobs"
            name="آگهی‌ها"
            stackId="a"
            fill="#3b82f6"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="applications"
            name="درخواست‌ها"
            stackId="a"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}