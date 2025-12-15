"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useI18n } from "@/lib/i18n/context"
import { logout } from "@/lib/auth/actions"
import { LanguageSelector } from "./language-selector"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Leaf, Menu, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/types"

interface DashboardHeaderProps {
  userName: string
  userRole: UserRole
  navItems: { href: string; label: string; icon?: React.ReactNode }[]
}

export function DashboardHeader({ userName, userRole, navItems }: DashboardHeaderProps) {
  const { t } = useI18n()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  const roleLabels: Record<UserRole, string> = {
    FARMER: "Farmer",
    AGENT: "Agent",
    LAB_TECH: "Lab Tech",
    ADMIN: "Admin",
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <div className="p-4 border-b">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                    <Leaf className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-bold text-primary">Bhumetra</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-1 p-4">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-smooth animate-slide-in-right",
                        isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent",
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2 transition-smooth hover:opacity-80">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-primary">
              <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-primary hidden sm:inline">Bhumetra</span>
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSelector />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 sm:gap-2 h-9 px-2 sm:px-3 transition-smooth">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline max-w-[100px] truncate">{userName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 animate-scale-in">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium truncate">{userName}</p>
                <p className="text-xs text-muted-foreground">{roleLabels[userRole]}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t.nav.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
