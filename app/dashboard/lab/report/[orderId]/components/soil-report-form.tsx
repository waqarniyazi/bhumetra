"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { OrderStatus, type Order, type SoilReport } from "@/lib/types"
import { Loader2, Save, CheckCircle, FlaskConical } from "lucide-react"

interface SoilReportFormProps {
  order: Order
  existingReport: SoilReport | null
}

const soilTextures = ["Sandy", "Loamy", "Clay", "Silty", "Sandy Loam", "Clay Loam", "Silty Clay"]

function getPhRating(pH: number): { rating: string; color: string } {
  if (pH < 5.5) return { rating: "Strongly acidic", color: "text-red-600 bg-red-50" }
  if (pH < 6.5) return { rating: "Slightly acidic", color: "text-yellow-600 bg-yellow-50" }
  if (pH <= 7.5) return { rating: "Neutral", color: "text-green-600 bg-green-50" }
  if (pH <= 8.5) return { rating: "Moderately alkaline", color: "text-yellow-600 bg-yellow-50" }
  return { rating: "Strongly alkaline", color: "text-red-600 bg-red-50" }
}

function getEcRating(EC: number): { rating: string; color: string } {
  if (EC < 1) return { rating: "Non saline", color: "text-green-600 bg-green-50" }
  if (EC < 2) return { rating: "Slightly saline", color: "text-yellow-600 bg-yellow-50" }
  return { rating: "Saline", color: "text-red-600 bg-red-50" }
}

function getOcRating(OC: number): { rating: string; color: string } {
  if (OC < 0.5) return { rating: "Low", color: "text-red-600 bg-red-50" }
  if (OC < 0.75) return { rating: "Medium", color: "text-yellow-600 bg-yellow-50" }
  return { rating: "High", color: "text-green-600 bg-green-50" }
}

function getNPKRating(value: number, type: "N" | "P" | "K"): { rating: string; color: string } {
  const thresholds = { N: [280, 560], P: [10, 25], K: [120, 280] }
  const [low, high] = thresholds[type]
  if (value < low) return { rating: "Low", color: "text-red-600 bg-red-50" }
  if (value < high) return { rating: "Medium", color: "text-yellow-600 bg-yellow-50" }
  return { rating: "High", color: "text-green-600 bg-green-50" }
}

function getMicroRating(value: number, type: string): { rating: string; color: string } {
  const thresholds: Record<string, number> = { zinc: 0.6, iron: 4.5, manganese: 2.0, copper: 0.2, boron: 0.5 }
  if (value < (thresholds[type] || 1)) return { rating: "Deficient", color: "text-red-600 bg-red-50" }
  return { rating: "Sufficient", color: "text-green-600 bg-green-50" }
}

export function SoilReportForm({ order, existingReport }: SoilReportFormProps) {
  const { t } = useI18n()
  const { toast } = useToast()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    pH: existingReport?.soilParams.pH?.toString() || "",
    EC: existingReport?.soilParams.EC?.toString() || "",
    OC: existingReport?.soilParams.OC?.toString() || "",
    N: existingReport?.soilParams.N?.toString() || "",
    P: existingReport?.soilParams.P?.toString() || "",
    K: existingReport?.soilParams.K?.toString() || "",
    zinc: existingReport?.soilParams.micronutrients?.zinc?.toString() || "",
    iron: existingReport?.soilParams.micronutrients?.iron?.toString() || "",
    manganese: existingReport?.soilParams.micronutrients?.manganese?.toString() || "",
    copper: existingReport?.soilParams.micronutrients?.copper?.toString() || "",
    boron: existingReport?.soilParams.micronutrients?.boron?.toString() || "",
    texture: existingReport?.soilParams.texture || "",
    remarks: existingReport?.soilParams.remarks || "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async (markComplete: boolean) => {
    setLoading(true)

    const soilParams = {
      pH: formData.pH ? Number.parseFloat(formData.pH) : undefined,
      EC: formData.EC ? Number.parseFloat(formData.EC) : undefined,
      OC: formData.OC ? Number.parseFloat(formData.OC) : undefined,
      N: formData.N ? Number.parseFloat(formData.N) : undefined,
      P: formData.P ? Number.parseFloat(formData.P) : undefined,
      K: formData.K ? Number.parseFloat(formData.K) : undefined,
      micronutrients: {
        zinc: formData.zinc ? Number.parseFloat(formData.zinc) : undefined,
        iron: formData.iron ? Number.parseFloat(formData.iron) : undefined,
        manganese: formData.manganese ? Number.parseFloat(formData.manganese) : undefined,
        copper: formData.copper ? Number.parseFloat(formData.copper) : undefined,
        boron: formData.boron ? Number.parseFloat(formData.boron) : undefined,
      },
      texture: formData.texture || undefined,
      remarks: formData.remarks || undefined,
    }

    try {
      const res = await fetch(`/api/reports`, {
        method: existingReport ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order._id,
          customerId: order.customerId,
          soilParams,
          markComplete,
        }),
      })

      if (res.ok) {
        toast({
          title: t.common.success,
          description: markComplete ? "Report completed and saved" : "Report saved as draft",
        })
        router.push(markComplete ? "/dashboard/lab/completed" : "/dashboard/lab/pending")
        router.refresh()
      } else {
        throw new Error("Failed to save")
      }
    } catch {
      toast({
        title: t.common.error,
        description: "Failed to save report",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const isCompleted = order.status === OrderStatus.COMPLETED

  const RatingBadge = ({
    value,
    getRating,
  }: { value: string; getRating: (v: number) => { rating: string; color: string } }) => {
    if (!value) return null
    const v = Number.parseFloat(value)
    if (isNaN(v)) return null
    const { rating, color } = getRating(v)
    return (
      <Badge variant="outline" className={`${color} border-0 text-xs ml-2`}>
        {rating}
      </Badge>
    )
  }

  return (
    <div className="max-w-4xl animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">{t.lab.soilParameters}</h1>
        <p className="text-muted-foreground text-sm sm:text-base">Enter test results for sample</p>
      </div>

      {/* Customer ID Display */}
      <Card className="mb-6 hover-scale transition-smooth">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FlaskConical className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Customer ID</p>
              <p className="text-xl sm:text-2xl font-mono font-bold">{order.customerId}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-muted-foreground">Land Area</p>
              <p className="font-medium">{order.acres} acres</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Soil Parameters Form */}
      <Card className="mb-6 animate-slide-up">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">{t.lab.soilParameters}</CardTitle>
          <CardDescription>Enter the measured values - ratings will be shown automatically</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Parameters */}
          <div>
            <h3 className="font-medium mb-4 text-sm sm:text-base">Primary Parameters</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="pH" className="flex items-center text-sm">
                  pH (0-14)
                  <RatingBadge value={formData.pH} getRating={getPhRating} />
                </Label>
                <Input
                  id="pH"
                  type="number"
                  step="0.1"
                  min="0"
                  max="14"
                  value={formData.pH}
                  onChange={(e) => handleChange("pH", e.target.value)}
                  disabled={isCompleted}
                  className="transition-smooth"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="EC" className="flex items-center text-sm">
                  EC (dS/m)
                  <RatingBadge value={formData.EC} getRating={getEcRating} />
                </Label>
                <Input
                  id="EC"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.EC}
                  onChange={(e) => handleChange("EC", e.target.value)}
                  disabled={isCompleted}
                  className="transition-smooth"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="OC" className="flex items-center text-sm">
                  Organic Carbon (%)
                  <RatingBadge value={formData.OC} getRating={getOcRating} />
                </Label>
                <Input
                  id="OC"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.OC}
                  onChange={(e) => handleChange("OC", e.target.value)}
                  disabled={isCompleted}
                  className="transition-smooth"
                />
              </div>
            </div>
          </div>

          {/* NPK */}
          <div>
            <h3 className="font-medium mb-4 text-sm sm:text-base">Macronutrients (kg/ha)</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="N" className="flex items-center text-sm">
                  Nitrogen (N)
                  <RatingBadge value={formData.N} getRating={(v) => getNPKRating(v, "N")} />
                </Label>
                <Input
                  id="N"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.N}
                  onChange={(e) => handleChange("N", e.target.value)}
                  disabled={isCompleted}
                  className="transition-smooth"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="P" className="flex items-center text-sm">
                  Phosphorus (P)
                  <RatingBadge value={formData.P} getRating={(v) => getNPKRating(v, "P")} />
                </Label>
                <Input
                  id="P"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.P}
                  onChange={(e) => handleChange("P", e.target.value)}
                  disabled={isCompleted}
                  className="transition-smooth"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="K" className="flex items-center text-sm">
                  Potassium (K)
                  <RatingBadge value={formData.K} getRating={(v) => getNPKRating(v, "K")} />
                </Label>
                <Input
                  id="K"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.K}
                  onChange={(e) => handleChange("K", e.target.value)}
                  disabled={isCompleted}
                  className="transition-smooth"
                />
              </div>
            </div>
          </div>

          {/* Micronutrients */}
          <div>
            <h3 className="font-medium mb-4 text-sm sm:text-base">Micronutrients (ppm)</h3>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              <div className="space-y-2">
                <Label htmlFor="zinc" className="flex items-center flex-wrap text-sm">
                  Zinc (Zn)
                  <RatingBadge value={formData.zinc} getRating={(v) => getMicroRating(v, "zinc")} />
                </Label>
                <Input
                  id="zinc"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.zinc}
                  onChange={(e) => handleChange("zinc", e.target.value)}
                  disabled={isCompleted}
                  className="transition-smooth"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="iron" className="flex items-center flex-wrap text-sm">
                  Iron (Fe)
                  <RatingBadge value={formData.iron} getRating={(v) => getMicroRating(v, "iron")} />
                </Label>
                <Input
                  id="iron"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.iron}
                  onChange={(e) => handleChange("iron", e.target.value)}
                  disabled={isCompleted}
                  className="transition-smooth"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manganese" className="flex items-center flex-wrap text-sm">
                  Manganese (Mn)
                  <RatingBadge value={formData.manganese} getRating={(v) => getMicroRating(v, "manganese")} />
                </Label>
                <Input
                  id="manganese"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.manganese}
                  onChange={(e) => handleChange("manganese", e.target.value)}
                  disabled={isCompleted}
                  className="transition-smooth"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="copper" className="flex items-center flex-wrap text-sm">
                  Copper (Cu)
                  <RatingBadge value={formData.copper} getRating={(v) => getMicroRating(v, "copper")} />
                </Label>
                <Input
                  id="copper"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.copper}
                  onChange={(e) => handleChange("copper", e.target.value)}
                  disabled={isCompleted}
                  className="transition-smooth"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="boron" className="flex items-center flex-wrap text-sm">
                  Boron (B)
                  <RatingBadge value={formData.boron} getRating={(v) => getMicroRating(v, "boron")} />
                </Label>
                <Input
                  id="boron"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.boron}
                  onChange={(e) => handleChange("boron", e.target.value)}
                  disabled={isCompleted}
                  className="transition-smooth"
                />
              </div>
            </div>
          </div>

          {/* Texture and Remarks */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="texture" className="text-sm">
                Soil Texture
              </Label>
              <Select value={formData.texture} onValueChange={(v) => handleChange("texture", v)} disabled={isCompleted}>
                <SelectTrigger className="transition-smooth">
                  <SelectValue placeholder="Select texture" />
                </SelectTrigger>
                <SelectContent>
                  {soilTextures.map((texture) => (
                    <SelectItem key={texture} value={texture}>
                      {texture}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="remarks" className="text-sm">
                Remarks
              </Label>
              <Textarea
                id="remarks"
                value={formData.remarks}
                onChange={(e) => handleChange("remarks", e.target.value)}
                placeholder="Any additional observations..."
                disabled={isCompleted}
                className="transition-smooth resize-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      {!isCompleted && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={loading}
            className="flex-1 transition-smooth hover:scale-[1.02]"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {t.lab.markUnderTesting}
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={loading}
            className="flex-1 transition-smooth hover:scale-[1.02]"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
            {t.lab.markCompleted}
          </Button>
        </div>
      )}

      {isCompleted && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center animate-scale-in">
          <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <p className="font-medium text-green-800">This report has been completed</p>
        </div>
      )}
    </div>
  )
}
