"use client"

import { useI18n } from "@/lib/i18n/context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileText, Lightbulb, Sprout, Droplets, Leaf, Beaker, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Order, SoilReport } from "@/lib/types"

interface SoilReportViewProps {
  order: Order
  report: SoilReport | null
}

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
  if (EC < 4) return { rating: "Moderately saline", color: "text-orange-600 bg-orange-50" }
  return { rating: "Highly saline", color: "text-red-600 bg-red-50" }
}

function getOcRating(OC: number): { rating: string; color: string } {
  if (OC < 0.5) return { rating: "Low", color: "text-red-600 bg-red-50" }
  if (OC < 0.75) return { rating: "Medium", color: "text-yellow-600 bg-yellow-50" }
  return { rating: "High", color: "text-green-600 bg-green-50" }
}

function getNitrogenRating(N: number): { rating: string; color: string } {
  if (N < 280) return { rating: "Low", color: "text-red-600 bg-red-50" }
  if (N < 560) return { rating: "Medium", color: "text-yellow-600 bg-yellow-50" }
  return { rating: "High", color: "text-green-600 bg-green-50" }
}

function getPhosphorusRating(P: number): { rating: string; color: string } {
  if (P < 10) return { rating: "Low", color: "text-red-600 bg-red-50" }
  if (P < 25) return { rating: "Medium", color: "text-yellow-600 bg-yellow-50" }
  return { rating: "High", color: "text-green-600 bg-green-50" }
}

function getPotassiumRating(K: number): { rating: string; color: string } {
  if (K < 120) return { rating: "Low", color: "text-red-600 bg-red-50" }
  if (K < 280) return { rating: "Medium", color: "text-yellow-600 bg-yellow-50" }
  return { rating: "High", color: "text-green-600 bg-green-50" }
}

function getMicronutrientRating(value: number, type: string): { rating: string; color: string } {
  const thresholds: Record<string, number> = {
    zinc: 0.6,
    iron: 4.5,
    manganese: 2.0,
    copper: 0.2,
    boron: 0.5,
    sulphur: 10,
  }
  const threshold = thresholds[type] || 1
  if (value < threshold) return { rating: "Deficient", color: "text-red-600 bg-red-50" }
  return { rating: "Sufficient", color: "text-green-600 bg-green-50" }
}

export function SoilReportView({ order, report }: SoilReportViewProps) {
  const { t } = useI18n()

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      PAYMENT_PENDING: { variant: "outline", label: t.orderStatus.PAYMENT_PENDING },
      PAID: { variant: "secondary", label: t.orderStatus.PAID },
      SENT_TO_LAB: { variant: "secondary", label: t.orderStatus.SENT_TO_LAB },
      UNDER_TESTING: { variant: "default", label: t.orderStatus.UNDER_TESTING },
      COMPLETED: { variant: "default", label: t.orderStatus.COMPLETED },
      CANCELLED: { variant: "destructive", label: t.orderStatus.CANCELLED },
    }
    const config = statusMap[status] || { variant: "outline", label: status }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const buildSoilParamsTable = () => {
    if (!report?.soilParams) return []
    const params = report.soilParams
    const rows: { sNo: number; parameter: string; value: string; unit: string; rating: string; ratingColor: string }[] =
      []
    let sNo = 1

    if (params.pH !== undefined) {
      const r = getPhRating(params.pH)
      rows.push({
        sNo: sNo++,
        parameter: "pH",
        value: params.pH.toString(),
        unit: "-",
        rating: r.rating,
        ratingColor: r.color,
      })
    }
    if (params.EC !== undefined) {
      const r = getEcRating(params.EC)
      rows.push({
        sNo: sNo++,
        parameter: "EC (Electrical Conductivity)",
        value: params.EC.toString(),
        unit: "dS/m",
        rating: r.rating,
        ratingColor: r.color,
      })
    }
    if (params.OC !== undefined) {
      const r = getOcRating(params.OC)
      rows.push({
        sNo: sNo++,
        parameter: "Organic Carbon (OC)",
        value: params.OC.toString(),
        unit: "%",
        rating: r.rating,
        ratingColor: r.color,
      })
    }
    if (params.N !== undefined) {
      const r = getNitrogenRating(params.N)
      rows.push({
        sNo: sNo++,
        parameter: "Available Nitrogen (N)",
        value: params.N.toString(),
        unit: "Kg/ha",
        rating: r.rating,
        ratingColor: r.color,
      })
    }
    if (params.P !== undefined) {
      const r = getPhosphorusRating(params.P)
      rows.push({
        sNo: sNo++,
        parameter: "Available Phosphorus (P)",
        value: params.P.toString(),
        unit: "Kg/ha",
        rating: r.rating,
        ratingColor: r.color,
      })
    }
    if (params.K !== undefined) {
      const r = getPotassiumRating(params.K)
      rows.push({
        sNo: sNo++,
        parameter: "Available Potassium (K)",
        value: params.K.toString(),
        unit: "Kg/ha",
        rating: r.rating,
        ratingColor: r.color,
      })
    }
    if (params.micronutrients) {
      const m = params.micronutrients
      if (m.zinc !== undefined) {
        const r = getMicronutrientRating(m.zinc, "zinc")
        rows.push({
          sNo: sNo++,
          parameter: "Available Zinc (Zn)",
          value: m.zinc.toString(),
          unit: "Mg/kg",
          rating: r.rating,
          ratingColor: r.color,
        })
      }
      if (m.boron !== undefined) {
        const r = getMicronutrientRating(m.boron, "boron")
        rows.push({
          sNo: sNo++,
          parameter: "Available Boron (B)",
          value: m.boron.toString(),
          unit: "Mg/kg",
          rating: r.rating,
          ratingColor: r.color,
        })
      }
      if (m.iron !== undefined) {
        const r = getMicronutrientRating(m.iron, "iron")
        rows.push({
          sNo: sNo++,
          parameter: "Available Iron (Fe)",
          value: m.iron.toString(),
          unit: "Mg/kg",
          rating: r.rating,
          ratingColor: r.color,
        })
      }
      if (m.manganese !== undefined) {
        const r = getMicronutrientRating(m.manganese, "manganese")
        rows.push({
          sNo: sNo++,
          parameter: "Available Manganese (Mn)",
          value: m.manganese.toString(),
          unit: "Mg/kg",
          rating: r.rating,
          ratingColor: r.color,
        })
      }
      if (m.copper !== undefined) {
        const r = getMicronutrientRating(m.copper, "copper")
        rows.push({
          sNo: sNo++,
          parameter: "Available Copper (Cu)",
          value: m.copper.toString(),
          unit: "Mg/kg",
          rating: r.rating,
          ratingColor: r.color,
        })
      }
    }
    return rows
  }

  const soilParamsTable = buildSoilParamsTable()

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{t.farmer.testDetails}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Customer ID: #{order.customerId || "-"}</p>
        </div>
        <Link href="/dashboard/farmer/tests">
          <Button variant="outline" size="sm" className="transition-smooth hover:scale-[1.02] bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.common.back}
          </Button>
        </Link>
      </div>

      {/* Order Details Card */}
      <Card className="animate-slide-up hover-scale">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">{t.farmer.testDetails}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-3 rounded-lg bg-muted/50 transition-smooth">
              <p className="text-xs sm:text-sm text-muted-foreground">Customer ID</p>
              <p className="font-mono font-bold text-sm sm:text-base">#{order.customerId || "-"}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 transition-smooth">
              <p className="text-xs sm:text-sm text-muted-foreground">{t.form.acres}</p>
              <p className="font-bold text-sm sm:text-base">{order.acres}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 transition-smooth">
              <p className="text-xs sm:text-sm text-muted-foreground">Date</p>
              <p className="font-medium text-sm sm:text-base">{new Date(order.createdAt!).toLocaleDateString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 transition-smooth">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">{t.common.status}</p>
              {getStatusBadge(order.status)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report or Pending Message */}
      {!report ? (
        <Card className="animate-slide-up">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4 animate-bounce-subtle">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-muted-foreground">{t.farmer.noReportYet}</p>
            <p className="text-sm text-muted-foreground mt-1">Your soil report is being processed</p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="report" className="space-y-4">
          <TabsList className="w-full grid grid-cols-3 h-auto p-1">
            <TabsTrigger value="report" className="text-xs sm:text-sm py-2 transition-smooth">
              <Beaker className="h-4 w-4 mr-1 sm:mr-2 hidden sm:inline" />
              {t.farmer.soilReport}
            </TabsTrigger>
            <TabsTrigger value="fertilizer" className="text-xs sm:text-sm py-2 transition-smooth">
              <Leaf className="h-4 w-4 mr-1 sm:mr-2 hidden sm:inline" />
              Fertilizer
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="text-xs sm:text-sm py-2 transition-smooth">
              <Lightbulb className="h-4 w-4 mr-1 sm:mr-2 hidden sm:inline" />
              Advice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="report" className="space-y-4 animate-fade-in">
            {/* PDF Download */}
            {report.reportPdfUrl && (
              <Card className="hover-scale transition-smooth">
                <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">{t.farmer.soilReport} PDF</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{t.farmer.downloadReport}</p>
                    </div>
                  </div>
                  <a href={report.reportPdfUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="transition-smooth hover:scale-[1.02]">
                      <Download className="mr-2 h-4 w-4" />
                      {t.common.download}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            )}

            {/* Soil Parameters Table - styled like the example report */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Beaker className="h-5 w-5 text-primary" />
                  Soil Test Results
                </CardTitle>
                <CardDescription>Detailed soil analysis with ratings</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12 text-xs sm:text-sm">S.No</TableHead>
                      <TableHead className="text-xs sm:text-sm">Parameter</TableHead>
                      <TableHead className="text-center text-xs sm:text-sm">Value</TableHead>
                      <TableHead className="text-center text-xs sm:text-sm">Unit</TableHead>
                      <TableHead className="text-center text-xs sm:text-sm">Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {soilParamsTable.map((row, idx) => (
                      <TableRow key={row.sNo} className="animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
                        <TableCell className="font-medium text-xs sm:text-sm">{row.sNo}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{row.parameter}</TableCell>
                        <TableCell className="text-center font-mono font-bold text-xs sm:text-sm">
                          {row.value}
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground text-xs sm:text-sm">
                          {row.unit}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={`${row.ratingColor} border-0 text-xs`}>
                            {row.rating}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Texture and Remarks */}
                {(report.soilParams.texture || report.soilParams.remarks) && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {report.soilParams.texture && (
                      <div className="rounded-lg border p-4 transition-smooth hover:shadow-sm">
                        <p className="text-xs sm:text-sm text-muted-foreground">Soil Texture</p>
                        <p className="font-medium text-sm sm:text-base">{report.soilParams.texture}</p>
                      </div>
                    )}
                    {report.soilParams.remarks && (
                      <div className="rounded-lg border p-4 transition-smooth hover:shadow-sm">
                        <p className="text-xs sm:text-sm text-muted-foreground">Remarks</p>
                        <p className="font-medium text-sm sm:text-base">{report.soilParams.remarks}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fertilizer" className="space-y-4 animate-fade-in">
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Leaf className="h-5 w-5 text-primary" />
                  Fertilizer Recommendations
                </CardTitle>
                <CardDescription>Based on your soil test results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {report.aiRecommendations?.fertilizer ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Recommended Fertilizer Plan</h4>
                      <p className="text-green-700 whitespace-pre-line text-sm sm:text-base">
                        {report.aiRecommendations.fertilizer}
                      </p>
                    </div>
                  </div>
                ) : (
                  // Default fertilizer recommendations based on soil params
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 animate-slide-up">
                      <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-amber-200 flex items-center justify-center text-xs font-bold">
                          N
                        </span>
                        Nitrogen (Urea)
                      </h4>
                      <p className="text-amber-700 text-sm sm:text-base">
                        {report.soilParams.N && report.soilParams.N < 280
                          ? "Your soil is LOW in Nitrogen. Apply 50-60 kg Urea per acre in 2-3 split doses."
                          : report.soilParams.N && report.soilParams.N < 560
                            ? "Your soil has MEDIUM Nitrogen. Apply 30-40 kg Urea per acre."
                            : "Your soil has adequate Nitrogen. Apply 20-25 kg Urea per acre for maintenance."}
                      </p>
                    </div>

                    <div
                      className="p-4 rounded-lg bg-blue-50 border border-blue-200 animate-slide-up"
                      style={{ animationDelay: "100ms" }}
                    >
                      <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-blue-200 flex items-center justify-center text-xs font-bold">
                          P
                        </span>
                        Phosphorus (DAP/SSP)
                      </h4>
                      <p className="text-blue-700 text-sm sm:text-base">
                        {report.soilParams.P && report.soilParams.P < 10
                          ? "Your soil is LOW in Phosphorus. Apply 50 kg DAP or 100 kg SSP per acre at sowing."
                          : report.soilParams.P && report.soilParams.P < 25
                            ? "Your soil has MEDIUM Phosphorus. Apply 25-30 kg DAP per acre."
                            : "Your soil has adequate Phosphorus. Apply 15-20 kg DAP per acre."}
                      </p>
                    </div>

                    <div
                      className="p-4 rounded-lg bg-purple-50 border border-purple-200 animate-slide-up"
                      style={{ animationDelay: "200ms" }}
                    >
                      <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-purple-200 flex items-center justify-center text-xs font-bold">
                          K
                        </span>
                        Potassium (MOP)
                      </h4>
                      <p className="text-purple-700 text-sm sm:text-base">
                        {report.soilParams.K && report.soilParams.K < 120
                          ? "Your soil is LOW in Potassium. Apply 40-50 kg MOP per acre."
                          : report.soilParams.K && report.soilParams.K < 280
                            ? "Your soil has MEDIUM Potassium. Apply 20-30 kg MOP per acre."
                            : "Your soil has HIGH Potassium. Minimal application needed (10-15 kg MOP per acre)."}
                      </p>
                    </div>

                    {/* Micronutrient recommendations */}
                    {report.soilParams.micronutrients?.boron !== undefined &&
                      report.soilParams.micronutrients.boron < 0.5 && (
                        <div
                          className="p-4 rounded-lg bg-red-50 border border-red-200 animate-slide-up"
                          style={{ animationDelay: "300ms" }}
                        >
                          <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                            <span className="h-6 w-6 rounded-full bg-red-200 flex items-center justify-center text-xs font-bold">
                              B
                            </span>
                            Boron Deficiency Detected
                          </h4>
                          <p className="text-red-700 text-sm sm:text-base">
                            Apply Borax at 2-3 kg per acre or foliar spray of 0.2% Boric Acid solution.
                          </p>
                        </div>
                      )}

                    {report.soilParams.micronutrients?.zinc !== undefined &&
                      report.soilParams.micronutrients.zinc < 0.6 && (
                        <div
                          className="p-4 rounded-lg bg-orange-50 border border-orange-200 animate-slide-up"
                          style={{ animationDelay: "400ms" }}
                        >
                          <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                            <span className="h-6 w-6 rounded-full bg-orange-200 flex items-center justify-center text-xs font-bold">
                              Zn
                            </span>
                            Zinc Deficiency Detected
                          </h4>
                          <p className="text-orange-700 text-sm sm:text-base">
                            Apply Zinc Sulphate at 10-15 kg per acre or foliar spray of 0.5% ZnSO4 solution.
                          </p>
                        </div>
                      )}
                  </div>
                )}

                {/* Organic alternatives */}
                <div
                  className="p-4 rounded-lg bg-green-50/50 border border-green-200/50 animate-slide-up"
                  style={{ animationDelay: "500ms" }}
                >
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <Sprout className="h-5 w-5" />
                    Organic Alternatives
                  </h4>
                  <ul className="text-green-700 space-y-1 text-sm sm:text-base">
                    <li>• FYM (Farm Yard Manure): 4-5 tonnes per acre</li>
                    <li>• Vermicompost: 2-3 tonnes per acre</li>
                    <li>• Green manuring with Dhaincha/Sesbania</li>
                    <li>• Neem cake: 100-150 kg per acre</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4 animate-fade-in">
            {!report.aiRecommendations ? (
              <Card className="animate-slide-up">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Lightbulb className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium text-muted-foreground">AI recommendations coming soon</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Overall Summary */}
                {report.aiRecommendations.summary && (
                  <Card className="animate-slide-up hover-scale">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Lightbulb className="h-5 w-5 text-primary" />
                        {t.farmer.overallSummary}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm sm:text-base">{report.aiRecommendations.summary}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Recommended Crops */}
                {report.aiRecommendations.crops && report.aiRecommendations.crops.length > 0 && (
                  <Card className="animate-slide-up hover-scale" style={{ animationDelay: "100ms" }}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Sprout className="h-5 w-5 text-primary" />
                        {t.farmer.recommendedCrops}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {report.aiRecommendations.crops.map((crop, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-sm py-1 px-3 transition-smooth hover:scale-105"
                          >
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Organic Practices */}
                {report.aiRecommendations.organic && (
                  <Card className="animate-slide-up hover-scale" style={{ animationDelay: "200ms" }}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Leaf className="h-5 w-5 text-primary" />
                        {t.farmer.organicPractices}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-line text-muted-foreground text-sm sm:text-base">
                        {report.aiRecommendations.organic}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Irrigation Tips */}
                {report.aiRecommendations.irrigation && (
                  <Card className="animate-slide-up hover-scale" style={{ animationDelay: "300ms" }}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Droplets className="h-5 w-5 text-primary" />
                        {t.farmer.irrigationTips}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-line text-muted-foreground text-sm sm:text-base">
                        {report.aiRecommendations.irrigation}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
