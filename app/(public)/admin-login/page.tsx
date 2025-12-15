"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { login } from "@/lib/auth/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Users, FlaskConical, Shield, Building2 } from "lucide-react"

const DEMO_ACCOUNTS = [
  { email: "agent@demo.com", password: "agent123", role: "Agent", icon: Users, color: "text-blue-600" },
  { email: "lab@demo.com", password: "lab123", role: "Lab Tech", icon: FlaskConical, color: "text-purple-600" },
  { email: "admin@demo.com", password: "admin123", role: "Admin", icon: Shield, color: "text-red-600" },
]

export default function AdminLoginPage() {
  const { t } = useI18n()
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await login({ identifier, password })

      if (result.success && result.redirectTo) {
        toast({
          title: t.common.success,
          description: "Login successful",
        })
        router.push(result.redirectTo)
      } else {
        toast({
          title: t.common.error,
          description: result.error || "Login failed",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: t.common.error,
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  function fillDemoCredentials(email: string, pwd: string) {
    setIdentifier(email)
    setPassword(pwd)
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <Card className="hover-scale">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4 transition-smooth hover:bg-primary/20">
              <Building2 className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl">Staff Login</CardTitle>
            <CardDescription>Login portal for Agents, Lab Technicians, and Administrators</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">
                  {t.form.email} / {t.form.phone}
                </Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  placeholder="email@example.com or 9876543210"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="transition-smooth focus:scale-[1.01]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="transition-smooth focus:scale-[1.01]"
                />
              </div>
              <Button type="submit" className="w-full transition-smooth hover:scale-[1.02]" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.nav.login}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <span className="text-muted-foreground">Are you a farmer? </span>
              <Link href="/login" className="text-primary hover:underline font-medium transition-smooth">
                Farmer Login
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="border-dashed animate-slide-up">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Demo Accounts</CardTitle>
            <CardDescription className="text-xs">Click to fill credentials automatically</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {DEMO_ACCOUNTS.map((account) => (
              <Button
                key={account.email}
                variant="outline"
                size="sm"
                className="w-full justify-start h-auto py-3 px-4 bg-transparent transition-smooth hover:scale-[1.01]"
                onClick={() => fillDemoCredentials(account.email, account.password)}
              >
                <account.icon className={`h-5 w-5 mr-3 ${account.color}`} />
                <div className="text-left flex-1">
                  <div className="text-sm font-medium">{account.role}</div>
                  <div className="text-xs text-muted-foreground">{account.email}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
