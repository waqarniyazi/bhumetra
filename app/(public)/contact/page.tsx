"use client"

import type React from "react"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { defaultConfig } from "@/lib/config"
import { Phone, Mail, MapPin, MessageCircle, Loader2 } from "lucide-react"

export default function ContactPage() {
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
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    }

    try {
      const res = await fetch("/api/contact", {
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
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight">{t.contact.title}</h1>
          <p className="mt-4 text-xl text-muted-foreground">{t.contact.subtitle}</p>
        </div>

        <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>{t.contact.formTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.contact.name} *</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.contact.phone}</Label>
                    <Input id="phone" name="phone" type="tel" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.contact.email}</Label>
                    <Input id="email" name="email" type="email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t.contact.message} *</Label>
                  <Textarea id="message" name="message" rows={5} required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t.contact.submitButton}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.contact.infoTitle}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <a href={`tel:${defaultConfig.phone}`} className="flex items-center gap-4 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.contact.phoneLabel}</p>
                    <p className="font-medium">{defaultConfig.phone}</p>
                  </div>
                </a>

                <a href={`mailto:${defaultConfig.email}`} className="flex items-center gap-4 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.contact.emailLabel}</p>
                    <p className="font-medium">{defaultConfig.email}</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${defaultConfig.whatsApp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.contact.whatsAppLabel}</p>
                    <p className="font-medium">{defaultConfig.whatsApp}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t.contact.addressLabel}</p>
                    <p className="font-medium">{defaultConfig.officeAddress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
