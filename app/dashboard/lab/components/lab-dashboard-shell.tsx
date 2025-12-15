"use client"

import type React from "react"
import { useI18n } from "@/lib/i18n/context"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { UserRole } from "@/lib/types"
import { LayoutDashboard, FlaskConical, CheckCircle } from "lucide-react"

interface LabDashboardShellProps {
  labTechName: string
  children: React.ReactNode
}

export function LabDashboardShell({ labTechName, children }: LabDashboardShellProps) {
  const { t } = useI18n()

  const navItems = [
    {
      href: "/dashboard/lab",
      label: t.dashboard.overview,
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      href: "/dashboard/lab/pending",
      label: t.lab.pendingSamples,
      icon: <FlaskConical className="h-4 w-4" />,
    },
    {
      href: "/dashboard/lab/completed",
      label: t.lab.completedTests,
      icon: <CheckCircle className="h-4 w-4" />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName={labTechName} userRole={UserRole.LAB_TECH} navItems={navItems} />
      <div className="flex">
        <DashboardSidebar navItems={navItems} />
        <main className="flex-1 p-3 sm:p-4 lg:p-6 animate-fade-in">{children}</main>
      </div>
    </div>
  )
}
