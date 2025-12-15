import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { UserRole } from "@/lib/types"
import { AdminDashboardShell } from "../components/admin-dashboard-shell"
import { OrdersManagement } from "./components/orders-management"

export default async function AdminOrdersPage() {
  const session = await getSession()

  if (!session || session.role !== UserRole.ADMIN) {
    redirect("/login")
  }

  return (
    <AdminDashboardShell adminName={session.name || "Admin"}>
      <OrdersManagement />
    </AdminDashboardShell>
  )
}
