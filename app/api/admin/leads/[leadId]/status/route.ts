import { NextResponse } from "next/server"
import { updateLeadStatus } from "@/lib/services/lead.service"

export async function PATCH(request: Request, { params }: { params: Promise<{ leadId: string }> }) {
  try {
    const { leadId } = await params
    const body = await request.json()
    const lead = await updateLeadStatus(leadId, body.status)
    return NextResponse.json({ lead })
  } catch (error) {
    console.error("Error updating lead status:", error)
    return NextResponse.json({ error: "Failed to update lead status" }, { status: 500 })
  }
}
