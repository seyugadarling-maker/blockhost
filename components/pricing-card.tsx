"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

interface PricingCardProps {
  name: string
  description: string
  price: number
  billingPeriod: "monthly" | "yearly"
  ram: string
  features: string[]
  popular: boolean
  delay: number
}

export function PricingCard({
  name,
  description,
  price,
  billingPeriod,
  ram,
  features,
  popular,
  delay,
}: PricingCardProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`glass-card relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 ${
        popular
          ? "border-2 border-secondary shadow-2xl shadow-secondary/30 scale-105"
          : "hover:shadow-xl hover:shadow-primary/20"
      } ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="rounded-full bg-gradient-to-r from-secondary to-primary px-4 py-1 text-sm font-bold shadow-lg">
            Most Popular
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="mb-2 text-2xl font-bold">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="mb-6">
        <div className="mb-2 flex items-baseline gap-2">
          <span className="text-5xl font-bold">${price}</span>
          <span className="text-muted-foreground">/{billingPeriod === "monthly" ? "mo" : "yr"}</span>
        </div>
        <div className="text-lg font-semibold text-primary">{ram}</div>
      </div>

      <Button
        asChild
        className={`mb-8 w-full ${
          popular ? "bg-gradient-to-r from-secondary to-primary hover:opacity-90" : "bg-primary hover:bg-primary/90"
        } transition-all duration-300 hover:scale-105`}
        size="lg"
      >
        <Link href="/register">Deploy Now</Link>
      </Button>

      <div className="space-y-3">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
              <Check className="h-3 w-3 text-primary" />
            </div>
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
