"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { Leaf, Phone, Mail, MapPin, MessageCircle } from "lucide-react"
import { defaultConfig } from "@/lib/config"

export function PublicFooter() {
  const { t } = useI18n()

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-primary">Bhumetra</span>
            </Link>
            <p className="text-sm text-muted-foreground">{t.footer.tagline}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t.footer.quickLinks}</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                {t.nav.home}
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                {t.nav.about}
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary">
                {t.nav.pricing}
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                {t.nav.contact}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t.footer.contact}</h3>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${defaultConfig.phone}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                {defaultConfig.phone}
              </a>
              <a
                href={`mailto:${defaultConfig.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {defaultConfig.email}
              </a>
              <a
                href={`https://wa.me/${defaultConfig.whatsApp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t.contact.addressLabel}</h3>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{defaultConfig.officeAddress}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {defaultConfig.businessName}. {t.footer.copyright}.
        </div>
      </div>
    </footer>
  )
}
