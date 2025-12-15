import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { UserRole } from "@/lib/types"
import { AdminDashboardShell } from "./components/admin-dashboard-shell"
import { AdminOverview } from "./components/admin-overview"

export default async function AdminDashboardPage() {
  const session = await getSession()

  if (!session || session.role !== UserRole.ADMIN) {
    redirect("/login")
  }

  return (
    <AdminDashboardShell adminName={session.name || "Admin"}>
      <AdminOverview />
    </AdminDashboardShell>
  )
}
