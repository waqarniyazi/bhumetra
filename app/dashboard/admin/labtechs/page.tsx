import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { UserRole } from "@/lib/types"
import { AdminDashboardShell } from "../components/admin-dashboard-shell"
import { LabTechsManagement } from "./components/labtechs-management"

export default async function AdminLabTechsPage() {
  const session = await getSession()

  if (!session || session.role !== UserRole.ADMIN) {
    redirect("/login")
  }

  return (
    <AdminDashboardShell adminName={session.name || "Admin"}>
      <LabTechsManagement />
    </AdminDashboardShell>
  )
}
