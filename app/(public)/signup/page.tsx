"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { signup } from "@/lib/auth/actions"
import { UserRole } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Leaf, Loader2 } from "lucide-react"

export default function SignupPage() {
  const { t } = useI18n()
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<UserRole>(UserRole.FARMER)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      toast({
        title: t.common.error,
        description: "Passwords don't match",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: (formData.get("email") as string) || undefined,
      password,
      role,
      village: formData.get("village") as string,
      district: formData.get("district") as string,
      state: formData.get("state") as string,
      region: formData.get("region") as string,
      labName: formData.get("labName") as string,
    }

    try {
      const result = await signup(data)

      if (result.success && result.redirectTo) {
        toast({
          title: t.common.success,
          description: "Account created successfully",
        })
        router.push(result.redirectTo)
      } else {
        toast({
          title: t.common.error,
          description: result.error || "Signup failed",
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
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary mb-4">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">{t.nav.signup}</CardTitle>
          <CardDescription>Create your Bhumetra account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">I am a</Label>
              <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserRole.FARMER}>Farmer / किसान</SelectItem>
                  <SelectItem value={UserRole.AGENT}>Agent / एजेंट</SelectItem>
                  <SelectItem value={UserRole.LAB_TECH}>Lab Technician / प्रयोगशाला तकनीशियन</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">{t.form.name} *</Label>
              <Input id="name" name="name" required placeholder="आपका नाम / Your name" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">{t.form.phone} *</Label>
                <Input id="phone" name="phone" type="tel" required placeholder="9876543210" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.form.email}</Label>
                <Input id="email" name="email" type="email" placeholder="email@example.com" />
              </div>
            </div>

            {/* Role-specific fields */}
            {role === UserRole.FARMER && (
              <div className="space-y-4 pt-2 border-t">
                <p className="text-sm text-muted-foreground">Address Details</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="village">{t.form.village}</Label>
                    <Input id="village" name="village" placeholder="गाँव / Village" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">{t.form.district}</Label>
                    <Input id="district" name="district" placeholder="जिला / District" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">{t.form.state}</Label>
                  <Input id="state" name="state" placeholder="राज्य / State" />
                </div>
              </div>
            )}

            {role === UserRole.AGENT && (
              <div className="space-y-2 pt-2 border-t">
                <Label htmlFor="region">{t.form.region} *</Label>
                <Input id="region" name="region" required placeholder="District/State you operate in" />
              </div>
            )}

            {role === UserRole.LAB_TECH && (
              <div className="space-y-2 pt-2 border-t">
                <Label htmlFor="labName">{t.form.labName} *</Label>
                <Input id="labName" name="labName" required placeholder="Name of your laboratory" />
              </div>
            )}

            <div className="space-y-4 pt-2 border-t">
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input id="password" name="password" type="password" required placeholder="••••••••" minLength={6} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t.nav.signup}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="text-primary hover:underline font-medium">
              {t.nav.login}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
