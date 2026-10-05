import { ReactNode } from "react"

type AnimatedCardProps = {
  children: ReactNode
  delay?: 0 | 100 | 200 | 300 | 400 | 500
  className?: string
}

export default function AnimatedCard({
  children,
  delay = 0,
  className = "",
}: AnimatedCardProps) {
  const delayClass = delay > 0 ? `delay-${delay}` : ""

  return (
    <div
      className={`animate-fade-in ${delayClass} ${className}`}
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  )
}