import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { getFarmerByPhone } from "@/lib/services/farmer.service"
import { UserRole } from "@/lib/types"

export async function GET(request: Request) {
  try {
    const session = await getSession()
    if (!session || (session.role !== UserRole.AGENT && session.role !== UserRole.ADMIN)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const phone = searchParams.get("phone")

    if (!phone) {
      return NextResponse.json({ error: "Phone number required" }, { status: 400 })
    }

    const farmer = await getFarmerByPhone(phone)

    if (!farmer) {
      return NextResponse.json({ error: "Farmer not found" }, { status: 404 })
    }

    return NextResponse.json(farmer)
  } catch (error) {
    console.error("Error searching farmer:", error)
    return NextResponse.json({ error: "Failed to search farmer" }, { status: 500 })
  }
}
