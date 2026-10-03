"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

type ChartData = {
  name: string
  count: number
}

export default function ApplicationsChart({ data }: { data: ChartData[] }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
  <h2 className="mb-4 text-lg font-semibold dark:text-white">
    درخواست‌ها به تفکیک وضعیت
  </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}