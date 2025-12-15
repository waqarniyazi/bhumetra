import type React from "react"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/session"
import { getAgentById } from "@/lib/services/agent.service"
import { UserRole } from "@/lib/types"
import { AgentDashboardShell } from "./components/agent-dashboard-shell"

export default async function AgentDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (!session || session.role !== UserRole.AGENT) {
    redirect("/login")
  }

  const agent = await getAgentById(session.linkedEntityId)

  if (!agent) {
    redirect("/login")
  }

  return <AgentDashboardShell agentName={agent.name}>{children}</AgentDashboardShell>
}
