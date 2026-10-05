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
          className="group animate-fade-in rounded-lg bg-white p-6 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
          style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
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
            <div
              className={`text-4xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6 ${stat.color}`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}