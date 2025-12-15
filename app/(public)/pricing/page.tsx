"use client"

import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, defaultConfig } from "@/lib/config"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const { t } = useI18n()

  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
  ]

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight">{t.pricing.title}</h1>
          <p className="mt-4 text-xl text-muted-foreground">{t.pricing.subtitle}</p>
        </div>

        {/* Pricing Card */}
        <div className="mx-auto max-w-lg mb-20">
          <Card className="border-2 border-primary shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardDescription className="text-lg">Standard Soil Test</CardDescription>
              <CardTitle className="text-5xl font-bold text-primary mt-2">
                {formatCurrency(defaultConfig.baseTestPricePerAcre)}
              </CardTitle>
              <CardDescription className="text-lg">{t.pricing.perAcre}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <p className="font-semibold mb-4">{t.pricing.includes}:</p>
                <ul className="space-y-3">
                  {t.pricing.includesList.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="w-full" size="lg" asChild>
                <Link href="/#lead-form">{t.pricing.bookNow}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">{t.faq.title}</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
