import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { I18nProvider } from "@/lib/i18n/context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bhumetra - Scientific Soil Testing for Better Harvests",
  description:
    "Get accurate soil analysis and AI-powered crop recommendations for your farm. Door-to-door sample collection and certified lab testing.",
  generator: "v0.app",
  keywords: ["soil testing", "agriculture", "farming", "soil analysis", "crop recommendations", "India"],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#4a7c59" },
    { media: "(prefers-color-scheme: dark)", color: "#2d4a35" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <I18nProvider>
          {children}
          <Toaster />
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
