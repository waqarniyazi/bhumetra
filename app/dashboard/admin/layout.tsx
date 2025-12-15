import type React from "react"
import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { UserRole } from "@/lib/types"

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session || session.role !== UserRole.ADMIN) {
    redirect("/login")
  }

  return <>{children}</>
}
