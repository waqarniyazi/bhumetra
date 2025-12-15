"use client"

import { useI18n } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LeadForm } from "@/components/lead-form"
import { formatCurrency, defaultConfig } from "@/lib/config"
import Link from "next/link"
import {
  FlaskConical,
  Truck,
  FileText,
  Sparkles,
  Shield,
  IndianRupee,
  CheckCircle2,
  ArrowRight,
  Phone,
} from "lucide-react"

export default function HomePage() {
  const { t } = useI18n()

  const steps = [
    { icon: Phone, title: t.landing.step1Title, description: t.landing.step1Desc },
    { icon: Truck, title: t.landing.step2Title, description: t.landing.step2Desc },
    { icon: FlaskConical, title: t.landing.step3Title, description: t.landing.step3Desc },
    { icon: FileText, title: t.landing.step4Title, description: t.landing.step4Desc },
  ]

  const benefits = [
    { icon: FlaskConical, title: t.landing.benefit1Title, description: t.landing.benefit1Desc },
    { icon: Truck, title: t.landing.benefit2Title, description: t.landing.benefit2Desc },
    { icon: Sparkles, title: t.landing.benefit3Title, description: t.landing.benefit3Desc },
    { icon: IndianRupee, title: t.landing.benefit4Title, description: t.landing.benefit4Desc },
  ]

  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-accent to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
              {t.landing.heroTitle}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground text-pretty">{t.landing.heroSubtitle}</p>
            <p className="mt-4 text-sm font-medium text-secondary">{t.landing.brandMeaning}</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="#lead-form">
                  {t.landing.ctaBookTest}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a
                  href={`https://wa.me/${defaultConfig.whatsApp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.landing.ctaTalk}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.landing.howItWorksTitle}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="h-full text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <step.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="absolute -top-3 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                    <CardTitle className="mt-4">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{step.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.landing.benefitsTitle}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold mb-4">{t.pricing.title}</h2>
            <p className="text-muted-foreground mb-8">{t.pricing.subtitle}</p>
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">
                  {formatCurrency(defaultConfig.baseTestPricePerAcre)}
                </CardTitle>
                <CardDescription className="text-lg">{t.pricing.perAcre}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-medium">{t.pricing.includes}:</p>
                <ul className="space-y-2 text-left">
                  {t.pricing.includesList.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6" size="lg" asChild>
                  <Link href="#lead-form">{t.pricing.bookNow}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section id="lead-form" className="py-20 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{t.landing.leadFormTitle}</CardTitle>
                <CardDescription>{t.landing.leadFormSubtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <LeadForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t.faq.title}</h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-semibold">{t.about.privacyTitle}</span>
          </div>
          <p className="max-w-2xl mx-auto opacity-90">{t.about.privacyContent}</p>
        </div>
      </section>
    </div>
  )
}
