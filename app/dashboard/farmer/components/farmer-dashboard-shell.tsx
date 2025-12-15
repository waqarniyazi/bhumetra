"use client"

import type React from "react"
import { useI18n } from "@/lib/i18n/context"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { UserRole } from "@/lib/types"
import { LayoutDashboard, FileText } from "lucide-react"

interface FarmerDashboardShellProps {
  farmerName: string
  children: React.ReactNode
}

export function FarmerDashboardShell({ farmerName, children }: FarmerDashboardShellProps) {
  const { t } = useI18n()

  const navItems = [
    {
      href: "/dashboard/farmer",
      label: t.dashboard.overview,
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      href: "/dashboard/farmer/tests",
      label: t.farmer.myTests,
      icon: <FileText className="h-4 w-4" />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName={farmerName} userRole={UserRole.FARMER} navItems={navItems} />
      <div className="flex">
        <DashboardSidebar navItems={navItems} />
        <main className="flex-1 p-3 sm:p-4 lg:p-6 animate-fade-in">{children}</main>
      </div>
    </div>
  )
}
