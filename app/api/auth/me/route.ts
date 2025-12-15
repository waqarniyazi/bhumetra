import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { getFarmerById } from "@/lib/services/farmer.service"
import { getAgentById } from "@/lib/services/agent.service"
import { getLabTechById } from "@/lib/services/labtech.service"
import { UserRole } from "@/lib/types"

export async function GET() {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the linked entity details based on role
    let entityDetails = null

    switch (session.role) {
      case UserRole.FARMER:
        entityDetails = await getFarmerById(session.linkedEntityId)
        break
      case UserRole.AGENT:
        entityDetails = await getAgentById(session.linkedEntityId)
        break
      case UserRole.LAB_TECH:
        entityDetails = await getLabTechById(session.linkedEntityId)
        break
    }

    return NextResponse.json({
      session,
      entity: entityDetails,
    })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
