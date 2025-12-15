import type React from "react"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/session"
import { getLabTechById } from "@/lib/services/labtech.service"
import { UserRole } from "@/lib/types"
import { LabDashboardShell } from "./components/lab-dashboard-shell"

export default async function LabDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()

  if (!session || session.role !== UserRole.LAB_TECH) {
    redirect("/login")
  }

  const labTech = await getLabTechById(session.linkedEntityId)

  if (!labTech) {
    redirect("/login")
  }

  return <LabDashboardShell labTechName={labTech.name}>{children}</LabDashboardShell>
}
