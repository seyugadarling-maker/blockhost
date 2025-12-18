"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Eye, EyeOff, Mail, Lock, User, CheckCircle2, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    setIsLoading(true)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      if (data.token) {
        localStorage.setItem("token", data.token)
      }

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "An error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrength = () => {
    if (!password) return null
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength()
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"]
  const strengthColors = ["bg-destructive", "bg-accent", "bg-secondary", "bg-primary"]

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-16 py-12">
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-[10%] w-16 h-16 bg-primary/10 rounded animate-float"
          style={{ animationDelay: "0s", animationDuration: "8s" }}
        />
        <div
          className="absolute top-40 right-[15%] w-12 h-12 bg-secondary/10 rounded animate-float"
          style={{ animationDelay: "1s", animationDuration: "10s" }}
        />
        <div
          className="absolute bottom-32 left-[20%] w-20 h-20 bg-accent/10 rounded animate-float"
          style={{ animationDelay: "2s", animationDuration: "12s" }}
        />
      </div>

      <div
        className={`relative z-10 w-full max-w-md transition-all duration-1000 ${
          mounted ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
        }`}
      >
        <div className="glass-card rounded-xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold">Create Your BlockHost Account</h1>
            <p className="text-sm text-muted-foreground">Deploy your Minecraft server in minutes.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  id="username"
                  type="text"
                  placeholder="steve_builder"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 h-11 bg-muted/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  id="email"
                  type="email"
                  placeholder="steve@minecraft.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-muted/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-muted/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {passwordStrength !== null && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i < passwordStrength ? strengthColors[passwordStrength - 1] : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Password strength: {strengthLabels[passwordStrength - 1]}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-muted/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {confirmPassword && (
                <div className="flex items-center gap-1.5">
                  {password === confirmPassword ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      <p className="text-xs text-primary">Passwords match</p>
                    </>
                  ) : (
                    <p className="text-xs text-destructive">Passwords don't match</p>
                  )}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 hover:-translate-y-0.5 mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
