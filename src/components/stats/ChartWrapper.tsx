"use client"

import dynamic from "next/dynamic"

const ApplicationsChart = dynamic(
  () => import("@/components/stats/ApplicationsChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
    ),
  }
)

const UsersPieChart = dynamic(
  () => import("@/components/stats/UsersPieChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
    ),
  }
)

const ApplicationsTrendChart = dynamic(
  () => import("@/components/stats/ApplicationsTrendChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
    ),
  }
)

const HiringRateChart = dynamic(
  () => import("@/components/stats/HiringRateChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
    ),
  }
)

const WeeklyStatsChart = dynamic(
  () => import("@/components/stats/WeeklyStatsChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
    ),
  }
)

const UsersTrendChart = dynamic(
  () => import("@/components/stats/UsersTrendChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
    ),
  }
)

const JobsStatusChart = dynamic(
  () => import("@/components/stats/JobsStatusChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
    ),
  }
)

const HiringFunnelChart = dynamic(
  () => import("@/components/stats/HiringFunnelChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
    ),
  }
)

const MonthlyStackedChart = dynamic(
  () => import("@/components/stats/MonthlyStackedChart"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
    ),
  }
)

export {
  ApplicationsChart,
  UsersPieChart,
  ApplicationsTrendChart,
  HiringRateChart,
  WeeklyStatsChart,
  UsersTrendChart,
  JobsStatusChart,
  HiringFunnelChart,
  MonthlyStackedChart,
}