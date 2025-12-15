"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useI18n } from "@/lib/i18n/context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Save } from "lucide-react"
import useSWR, { mutate } from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function GlobalConfigForm() {
  const { t } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const { data, isLoading } = useSWR("/api/admin/config", fetcher)

  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    whatsApp: "",
    officeAddress: "",
    baseTestPricePerAcre: 0,
    commission: {
      agent: 0,
      lab: 0,
      franchise: 0,
      platform: 0,
    },
  })

  useEffect(() => {
    if (data?.config) {
      setFormData({
        businessName: data.config.businessName || "",
        email: data.config.email || "",
        phone: data.config.phone || "",
        whatsApp: data.config.whatsApp || "",
        officeAddress: data.config.officeAddress || "",
        baseTestPricePerAcre: data.config.baseTestPricePerAcre || 0,
        commission: data.config.commission || { agent: 0, lab: 0, franchise: 0, platform: 0 },
      })
    }
  }, [data])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage("")

    try {
      const res = await fetch("/api/admin/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        mutate("/api/admin/config")
        setSuccessMessage("Configuration saved successfully!")
        setTimeout(() => setSuccessMessage(""), 3000)
      }
    } catch (error) {
      console.error("Error saving config:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <p className="text-muted-foreground">{t.common.loading}</p>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t.admin.globalConfig}</h1>
        <p className="text-muted-foreground">Manage business settings and pricing</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t.admin.businessSettings}</CardTitle>
            <CardDescription>Basic business information displayed across the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.form.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t.form.phone}</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsApp">WhatsApp</Label>
                <Input
                  id="whatsApp"
                  value={formData.whatsApp}
                  onChange={(e) => setFormData({ ...formData, whatsApp: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="officeAddress">Office Address</Label>
              <Input
                id="officeAddress"
                value={formData.officeAddress}
                onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
            <CardDescription>Base test price per acre</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="baseTestPricePerAcre">Base Test Price per Acre (₹)</Label>
              <Input
                id="baseTestPricePerAcre"
                type="number"
                value={formData.baseTestPricePerAcre}
                onChange={(e) => setFormData({ ...formData, baseTestPricePerAcre: Number(e.target.value) })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Commission Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t.admin.commissionSettings}</CardTitle>
            <CardDescription>Commission percentages for each party (must total 100%)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="agentCommission">Agent (%)</Label>
                <Input
                  id="agentCommission"
                  type="number"
                  value={formData.commission.agent}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      commission: { ...formData.commission, agent: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="labCommission">Lab (%)</Label>
                <Input
                  id="labCommission"
                  type="number"
                  value={formData.commission.lab}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      commission: { ...formData.commission, lab: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="franchiseCommission">Franchise (%)</Label>
                <Input
                  id="franchiseCommission"
                  type="number"
                  value={formData.commission.franchise}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      commission: { ...formData.commission, franchise: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="platformCommission">Platform (%)</Label>
                <Input
                  id="platformCommission"
                  type="number"
                  value={formData.commission.platform}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      commission: { ...formData.commission, platform: Number(e.target.value) },
                    })
                  }
                />
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Total:{" "}
              {formData.commission.agent +
                formData.commission.lab +
                formData.commission.franchise +
                formData.commission.platform}
              %
            </p>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? t.common.loading : t.common.save}
          </Button>
          {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}
        </div>
      </form>
    </div>
  )
}
