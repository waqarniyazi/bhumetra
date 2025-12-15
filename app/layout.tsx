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
      <head>
        <meta name="apple-mobile-web-app-title" content="Bhumetra" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/web-app-manifest-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/web-app-manifest-512x512.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon1.png" />
        <link rel="mask-icon" href="/icon0.svg" color="#4a7c59" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4a7c59" />
      </head>
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
