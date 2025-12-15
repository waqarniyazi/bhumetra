"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavItem {
  href: string
  label: string
  icon?: React.ReactNode
}

interface DashboardSidebarProps {
  navItems: NavItem[]
}

export function DashboardSidebar({ navItems }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-sidebar min-h-[calc(100vh-4rem)]">
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-smooth animate-slide-in-right",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground hover:translate-x-1",
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
