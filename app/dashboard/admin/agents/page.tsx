import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { UserRole } from "@/lib/types"
import { AdminDashboardShell } from "../components/admin-dashboard-shell"
import { AgentsManagement } from "./components/agents-management"

export default async function AdminAgentsPage() {
  const session = await getSession()

  if (!session || session.role !== UserRole.ADMIN) {
    redirect("/login")
  }

  return (
    <AdminDashboardShell adminName={session.name || "Admin"}>
      <AgentsManagement />
    </AdminDashboardShell>
  )
}
