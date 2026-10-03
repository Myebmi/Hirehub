type StatCard = {
  title: string
  value: number | string
  icon: string
  color: string
}

export default function StatsCards({ stats }: { stats: StatCard[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="rounded-lg bg-white p-6 shadow dark:bg-gray-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
              <p className="mt-2 text-3xl font-bold dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className={`text-4xl ${stat.color}`}>{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  )
}