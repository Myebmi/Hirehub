"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

type StatusData = {
  name: string
  value: number
  color: string
}

export default function JobsStatusChart({ data }: { data: StatusData[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <h2 className="mb-4 text-lg font-semibold dark:text-white">
        وضعیت آگهی‌ها
      </h2>
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              label={({ name, value }) =>
                `${name}: ${value}`
              }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        {/* Center Text */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {total}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            کل آگهی‌ها
          </div>
        </div>
      </div>
    </div>
  )
}