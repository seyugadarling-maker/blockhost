"use client"

import { Button } from "@/components/ui/button"
import { PricingCard } from "@/components/pricing-card"
import { Check } from "lucide-react"
import { useState } from "react"

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small servers",
      monthlyPrice: 5,
      yearlyPrice: 50,
      ram: "2GB RAM",
      features: [
        "Paper / Spigot Support",
        "Up to 20 Players",
        "Automatic Backups",
        "24/7 Support",
        "Full FTP Access",
        "Instant Setup",
      ],
      popular: false,
    },
    {
      name: "Pro",
      description: "Most popular choice",
      monthlyPrice: 15,
      yearlyPrice: 150,
      ram: "6GB RAM",
      features: [
        "Plugins + Mods Support",
        "Up to 100 Players",
        "Automatic Backups",
        "Priority Support",
        "Full FTP Access",
        "Instant Setup",
        "DDoS Protection",
        "Multiple Locations",
      ],
      popular: true,
    },
    {
      name: "Ultra",
      description: "For large networks",
      monthlyPrice: 35,
      yearlyPrice: 350,
      ram: "12GB+ RAM",
      features: [
        "Unlimited Players",
        "All Plugins & Mods",
        "Hourly Backups",
        "Dedicated Support",
        "Full FTP Access",
        "Instant Setup",
        "Advanced DDoS Protection",
        "Global Locations",
        "Custom Configuration",
      ],
      popular: false,
    },
  ]

  return (
    <main className="min-h-screen pt-16">
      {/* Pricing Hero */}
      <section className="py-24 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="mb-4 text-5xl font-bold md:text-6xl text-balance">Simple, Powerful Pricing</h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground text-pretty">
            Choose the perfect plan for your Minecraft world.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 rounded-full bg-muted p-1 mb-16">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                billingPeriod === "monthly"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                billingPeriod === "yearly"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">Save 17%</span>
            </button>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <PricingCard
                key={plan.name}
                name={plan.name}
                description={plan.description}
                price={billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                billingPeriod={billingPeriod}
                ram={plan.ram}
                features={plan.features}
                popular={plan.popular}
                delay={i * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-12 text-center text-4xl font-bold">What's Included in Every Plan</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              "Instant Setup",
              "Full FTP Access",
              "Automatic Backups",
              "24/7 Support",
              "DDoS Protection",
              "Global Locations",
              "No Hidden Fees",
              "Cancel Anytime",
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 glass-card rounded-lg p-4 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="mb-4 text-4xl font-bold">Still have questions?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Our team is here to help you find the perfect plan for your needs.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/30 hover:border-primary hover:bg-primary/10 bg-transparent"
          >
            Contact Support
          </Button>
        </div>
      </section>
    </main>
  )
}
