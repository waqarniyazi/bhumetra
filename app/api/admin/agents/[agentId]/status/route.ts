import { NextResponse } from "next/server"
import { updateAgentStatus } from "@/lib/services/agent.service"

export async function PATCH(request: Request, { params }: { params: Promise<{ agentId: string }> }) {
  try {
    const { agentId } = await params
    const body = await request.json()
    const agent = await updateAgentStatus(agentId, body.status)
    return NextResponse.json({ agent })
  } catch (error) {
    console.error("Error updating agent status:", error)
    return NextResponse.json({ error: "Failed to update agent status" }, { status: 500 })
  }
}
