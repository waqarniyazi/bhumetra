"use client"

import type React from "react"
import { useI18n } from "@/lib/i18n/context"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { UserRole } from "@/lib/types"
import { LayoutDashboard, Plus, ClipboardList } from "lucide-react"

interface AgentDashboardShellProps {
  agentName: string
  children: React.ReactNode
}

export function AgentDashboardShell({ agentName, children }: AgentDashboardShellProps) {
  const { t } = useI18n()

  const navItems = [
    {
      href: "/dashboard/agent",
      label: t.dashboard.overview,
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      href: "/dashboard/agent/create-order",
      label: t.agent.createOrder,
      icon: <Plus className="h-4 w-4" />,
    },
    {
      href: "/dashboard/agent/orders",
      label: t.agent.myOrders,
      icon: <ClipboardList className="h-4 w-4" />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName={agentName} userRole={UserRole.AGENT} navItems={navItems} />
      <div className="flex">
        <DashboardSidebar navItems={navItems} />
        <main className="flex-1 p-3 sm:p-4 lg:p-6 animate-fade-in">{children}</main>
      </div>
    </div>
  )
}
