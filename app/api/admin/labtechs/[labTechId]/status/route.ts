import { NextResponse } from "next/server"
import { updateLabTechStatus } from "@/lib/services/labtech.service"

export async function PATCH(request: Request, { params }: { params: Promise<{ labTechId: string }> }) {
  try {
    const { labTechId } = await params
    const body = await request.json()
    const labTech = await updateLabTechStatus(labTechId, body.status)
    return NextResponse.json({ labTech })
  } catch (error) {
    console.error("Error updating lab tech status:", error)
    return NextResponse.json({ error: "Failed to update lab tech status" }, { status: 500 })
  }
}
