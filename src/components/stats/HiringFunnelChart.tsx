"use client"

import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

type FunnelData = {
  status: string
  count: number
  fill: string
}

export default function HiringFunnelChart({ data }: { data: FunnelData[] }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
      <h2 className="mb-4 text-lg font-semibold dark:text-white">
        قیف استخدام
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="90%"
          barSize={20}
          data={data}
        >
          <RadialBar
            label={{ position: "insideStart", fill: "#fff", fontSize: 12 }}
            background
            dataKey="count"
          />
          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            wrapperStyle={{ color: "#6b7280" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}