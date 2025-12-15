"use client"

import type React from "react"
import { useI18n } from "@/lib/i18n/context"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { UserRole } from "@/lib/types"
import { LayoutDashboard, Users, FlaskConical, Tractor, FileText, Settings, MessageSquare } from "lucide-react"

interface AdminDashboardShellProps {
  adminName: string
  children: React.ReactNode
}

export function AdminDashboardShell({ adminName, children }: AdminDashboardShellProps) {
  const { t } = useI18n()

  const navItems = [
    {
      href: "/dashboard/admin",
      label: t.dashboard.overview,
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/agents",
      label: t.admin.manageAgents,
      icon: <Users className="h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/labtechs",
      label: t.admin.manageLabTechs,
      icon: <FlaskConical className="h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/farmers",
      label: t.admin.manageFarmers,
      icon: <Tractor className="h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/orders",
      label: t.admin.ordersReports,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/leads",
      label: t.admin.leadsContacts,
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      href: "/dashboard/admin/config",
      label: t.admin.globalConfig,
      icon: <Settings className="h-4 w-4" />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName={adminName} userRole={UserRole.ADMIN} navItems={navItems} />
      <div className="flex">
        <DashboardSidebar navItems={navItems} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
