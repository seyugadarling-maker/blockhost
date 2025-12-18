"use client"

import { Button } from "@/components/ui/button"
import { FloatingBlocks } from "@/components/floating-blocks"
import { FeatureCard } from "@/components/feature-card"
import { StatsCounter } from "@/components/stats-counter"
import { Zap, Shield, Globe, Clock, Boxes, Rocket } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Floating Minecraft blocks */}
        <FloatingBlocks />

        {/* Hero content */}
        <div
          className={`container relative z-10 mx-auto px-4 text-center transition-all duration-1000 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="mb-6 text-6xl font-bold leading-tight tracking-tight text-balance md:text-7xl lg:text-8xl">
            Host Your Minecraft World.{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-glow">
              Instantly.
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground md:text-xl text-pretty">
            High-performance Minecraft hosting powered by NVMe SSDs & Ryzen CPUs.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="group bg-primary text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/50"
            >
              <Link href="/register">
                Deploy Server
                <Rocket className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/30 text-lg hover:border-primary hover:bg-primary/10 transition-all duration-300 bg-transparent"
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-8 w-5 rounded-full border-2 border-primary/50 p-1">
            <div className="h-2 w-1 rounded-full bg-primary mx-auto" />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div
            className={`mb-16 text-center transition-all duration-1000 delay-200 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">Why Choose BlockHost?</h2>
            <p className="text-lg text-muted-foreground">Everything you need for premium Minecraft hosting</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Rocket className="h-8 w-8" />}
              title="1-Click Server Setup"
              description="Deploy your Minecraft server in seconds with our automated setup process."
              delay={0}
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Ultra-Low Latency"
              description="Experience lightning-fast performance with NVMe SSDs and Ryzen CPUs."
              delay={100}
            />
            <FeatureCard
              icon={<Boxes className="h-8 w-8" />}
              title="Mod & Plugin Support"
              description="Full support for all popular mods, plugins, and modpacks."
              delay={200}
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="DDoS Protection"
              description="Enterprise-grade protection keeps your server online 24/7."
              delay={300}
            />
            <FeatureCard
              icon={<Globe className="h-8 w-8" />}
              title="Global Locations"
              description="Choose from data centers worldwide for optimal performance."
              delay={400}
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8" />}
              title="99.9% Uptime"
              description="Reliable infrastructure ensures your world is always accessible."
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid gap-12 md:grid-cols-3 mb-16">
            <StatsCounter end={12847} label="Servers Online" />
            <StatsCounter end={284523} label="Players Hosted" />
            <StatsCounter end={99.9} label="Uptime %" decimals={1} />
          </div>

          {/* Testimonials */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                name: "Steve_Builder",
                comment: "Best hosting I've used. My server runs flawlessly with 100+ players!",
                avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=steve",
              },
              {
                name: "Alex_Miner",
                comment: "Setup was instant and support is amazing. Highly recommended!",
                avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=alex",
              },
              {
                name: "Creeper_King",
                comment: "The performance is incredible. No lag even with tons of mods.",
                avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=creeper",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="glass-card rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-10 w-10 rounded"
                  />
                  <span className="font-semibold">{testimonial.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4">
        <div className="container mx-auto text-center">
          <h2 className="mb-6 text-5xl font-bold md:text-6xl text-balance">Launch Your Server in Seconds</h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground">
            Join thousands of players already hosting with BlockHost
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-xl px-12 py-6 h-auto hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-xl shadow-primary/50"
          >
            <Link href="/register">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
