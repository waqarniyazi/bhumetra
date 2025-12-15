import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { UserRole } from "@/lib/types"
import { AdminDashboardShell } from "../components/admin-dashboard-shell"
import { FarmersManagement } from "./components/farmers-management"

export default async function AdminFarmersPage() {
  const session = await getSession()

  if (!session || session.role !== UserRole.ADMIN) {
    redirect("/login")
  }

  return (
    <AdminDashboardShell adminName={session.name || "Admin"}>
      <FarmersManagement />
    </AdminDashboardShell>
  )
}
