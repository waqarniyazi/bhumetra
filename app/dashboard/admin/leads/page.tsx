import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { UserRole } from "@/lib/types"
import { AdminDashboardShell } from "../components/admin-dashboard-shell"
import { LeadsManagement } from "./components/leads-management"

export default async function AdminLeadsPage() {
  const session = await getSession()

  if (!session || session.role !== UserRole.ADMIN) {
    redirect("/login")
  }

  return (
    <AdminDashboardShell adminName={session.name || "Admin"}>
      <LeadsManagement />
    </AdminDashboardShell>
  )
}
