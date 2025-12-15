"use client"

import Link from "next/link"
import Image from "next/image"
import { useI18n } from "@/lib/i18n/context"
import { LanguageSelector } from "./language-selector"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Leaf } from "lucide-react"
import { useState } from "react"

export function PublicHeader() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/pricing", label: t.nav.pricing },
    { href: "/contact", label: t.nav.contact },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-smooth hover:opacity-80">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg overflow-hidden">
            <Image src="/icon1.png" alt="Bhumetra" width={36} height={36} className="object-contain" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-primary">Bhumetra</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-smooth hover:text-primary hover:-translate-y-0.5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild className="transition-smooth">
              <Link href="/login">{t.nav.login}</Link>
            </Button>
            <Button asChild className="transition-smooth hover:scale-[1.02]">
              <Link href="/login">{t.nav.signup}</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0">
              <div className="p-4 border-b">
                <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg overflow-hidden">
                    <Image src="/icon1.png" alt="Bhumetra" width={36} height={36} className="object-contain" />
                  </div>
                  <span className="text-xl font-bold text-primary">Bhumetra</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-1 p-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-foreground transition-smooth hover:text-primary px-3 py-3 rounded-lg hover:bg-accent animate-slide-in-right"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="my-4" />
                <Button variant="outline" asChild className="w-full bg-transparent transition-smooth">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    {t.nav.login}
                  </Link>
                </Button>
                <Button asChild className="w-full mt-2 transition-smooth">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    {t.nav.signup}
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
