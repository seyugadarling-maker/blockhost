"use client"

import { type ReactNode, useEffect, useState } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay: number
}

export function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`glass-card group rounded-xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/20 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
