import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { UserRole } from "@/lib/types"
import { getFarmerById } from "@/lib/services/farmer.service"
import { FarmerDashboardShell } from "../components/farmer-dashboard-shell"
import { FarmerTestsList } from "./components/farmer-tests-list"

export default async function FarmerTestsPage() {
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
      <FarmerTestsList farmerId={session.linkedEntityId} />
    </FarmerDashboardShell>
  )
}
