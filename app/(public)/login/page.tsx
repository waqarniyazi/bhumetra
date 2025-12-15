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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Leaf, Loader2, User, Sprout } from "lucide-react"

const FARMER_DEMO = { email: "farmer@demo.com", password: "farmer123" }

export default function LoginPage() {
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

  function fillDemoCredentials() {
    setIdentifier(FARMER_DEMO.email)
    setPassword(FARMER_DEMO.password)
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="transition-smooth">
              {t.nav.login}
            </TabsTrigger>
            <TabsTrigger value="signup" className="transition-smooth">
              {t.nav.signup}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="animate-slide-up">
            <Card className="hover-scale">
              <CardHeader className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4 transition-smooth hover:bg-primary/20">
                  <Sprout className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">{t.nav.login}</CardTitle>
                <CardDescription>Welcome back! Enter your credentials to access your farm dashboard</CardDescription>
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

                {/* Demo Account Helper */}
                <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-dashed animate-fade-in">
                  <p className="text-xs text-muted-foreground mb-2 text-center">Demo Account</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-center gap-2 transition-smooth hover:bg-primary/10 bg-transparent"
                    onClick={fillDemoCredentials}
                  >
                    <User className="h-4 w-4" />
                    <span>Use Demo Farmer Account</span>
                  </Button>
                </div>

                {/* Link to Admin Login */}
                <div className="mt-4 text-center text-sm">
                  <span className="text-muted-foreground">Agent, Lab Tech or Admin? </span>
                  <Link href="/admin-login" className="text-primary hover:underline font-medium transition-smooth">
                    Login here
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup" className="animate-slide-up">
            <FarmerSignupForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function FarmerSignupForm() {
  const { t } = useI18n()
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    village: "",
    district: "",
    state: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t.common.error,
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role: "FARMER",
        }),
      })

      const data = await res.json()

      if (res.ok) {
        toast({
          title: t.common.success,
          description: "Account created! Please login.",
        })
        router.push("/login")
      } else {
        toast({
          title: t.common.error,
          description: data.error || "Signup failed",
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

  return (
    <Card className="hover-scale">
      <CardHeader className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4 transition-smooth hover:bg-primary/20">
          <Leaf className="h-7 w-7 text-primary" />
        </div>
        <CardTitle className="text-2xl">{t.nav.signup}</CardTitle>
        <CardDescription>Create your farmer account to start soil testing</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t.form.name} *</Label>
              <Input
                id="name"
                required
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="transition-smooth"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t.form.phone} *</Label>
              <Input
                id="phone"
                required
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="transition-smooth"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t.form.email}</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com (optional)"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="transition-smooth"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="village">{t.form.village} *</Label>
              <Input
                id="village"
                required
                placeholder="Your village"
                value={formData.village}
                onChange={(e) => handleChange("village", e.target.value)}
                className="transition-smooth"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">{t.form.district} *</Label>
              <Input
                id="district"
                required
                placeholder="Your district"
                value={formData.district}
                onChange={(e) => handleChange("district", e.target.value)}
                className="transition-smooth"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              required
              placeholder="Your state"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="transition-smooth"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="transition-smooth"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                className="transition-smooth"
              />
            </div>
          </div>

          <Button type="submit" className="w-full transition-smooth hover:scale-[1.02]" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-muted-foreground">Agent, Lab Tech or Admin? </span>
          <Link href="/admin-login" className="text-primary hover:underline font-medium transition-smooth">
            Login here
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
