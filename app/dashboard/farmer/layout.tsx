import type React from "react"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { UserRole } from "@/lib/types"
import { getFarmerById } from "@/lib/services/farmer.service"

export default async function FarmerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session || session.role !== UserRole.FARMER) {
    redirect("/login")
  }

  const farmer = await getFarmerById(session.linkedEntityId)

  if (!farmer) {
    redirect("/login")
  }

  return <>{children}</>
}
