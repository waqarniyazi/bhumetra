"use client"

import { useI18n } from "@/lib/i18n/context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Users, Shield, Leaf } from "lucide-react"

export default function AboutPage() {
  const { t } = useI18n()

  const sections = [
    { icon: Leaf, title: t.about.storyTitle, content: t.about.storyContent },
    { icon: Target, title: t.about.missionTitle, content: t.about.missionContent },
    { icon: Users, title: t.about.howWeWorkTitle, content: t.about.howWeWorkContent },
    { icon: Shield, title: t.about.privacyTitle, content: t.about.privacyContent },
  ]

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight">{t.about.title}</h1>
          <p className="mt-4 text-xl text-muted-foreground">{t.about.subtitle}</p>
        </div>

        {/* Content Sections */}
        <div className="mx-auto max-w-4xl space-y-8">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Brand Explanation */}
        <div className="mx-auto max-w-2xl mt-16 text-center">
          <Card className="bg-accent border-none">
            <CardContent className="py-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Bhumetra</h2>
              <p className="text-lg text-muted-foreground">
                <span className="font-semibold text-foreground">"Bhu" (भू)</span> - Sanskrit for Earth/Soil
              </p>
              <p className="text-lg text-muted-foreground mt-2">
                <span className="font-semibold text-foreground">"Metra"</span> - From Measurement
              </p>
              <p className="mt-4 text-sm text-muted-foreground">Together: The Science of Soil Measurement</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
