import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { UserRole } from "@/lib/types"
import { getFarmerById } from "@/lib/services/farmer.service"
import { FarmerDashboardShell } from "./components/farmer-dashboard-shell"
import { FarmerOverview } from "./components/farmer-overview"

export default async function FarmerDashboardPage() {
  const session = await getSession()

  if (!session || session.role !== UserRole.FARMER) {
    redirect("/login")
  }

  const farmer = await getFarmerById(session.linkedEntityId)

  if (!farmer) {
    redirect("/login")
  }

  return (
    <FarmerDashboardShell farmerName={farmer.name}>
      <FarmerOverview farmerId={session.linkedEntityId} farmerName={farmer.name} />
    </FarmerDashboardShell>
  )
}
