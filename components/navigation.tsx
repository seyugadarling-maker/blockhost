"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-gradient-to-br from-primary to-secondary" />
          <span className="text-xl font-bold">BlockHost</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href="/pricing"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/pricing" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/login"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/login" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Login
          </Link>
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
            <Link href="/register">Deploy Server</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
