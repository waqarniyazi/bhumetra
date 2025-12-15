"use client"

import type React from "react"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function LeadForm() {
  const { t } = useI18n()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      village: formData.get("village") as string,
      district: formData.get("district") as string,
      acres: Number(formData.get("acres")) || undefined,
      preferredCrop: formData.get("preferredCrop") as string,
    }

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        toast({
          title: t.common.success,
          description: t.contact.successMessage,
        })
        ;(e.target as HTMLFormElement).reset()
      } else {
        throw new Error("Failed to submit")
      }
    } catch {
      toast({
        title: t.common.error,
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t.form.name} *</Label>
          <Input id="name" name="name" required placeholder="आपका नाम / Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t.form.phone} *</Label>
          <Input id="phone" name="phone" type="tel" required placeholder="9876543210" />
        </div>
      </div>
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
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="acres">{t.form.acres}</Label>
          <Input id="acres" name="acres" type="number" step="0.5" min="0" placeholder="2.5" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="preferredCrop">{t.form.preferredCrop}</Label>
          <Input id="preferredCrop" name="preferredCrop" placeholder="गेहूं, धान / Wheat, Rice" />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {t.common.submit}
      </Button>
    </form>
  )
}
