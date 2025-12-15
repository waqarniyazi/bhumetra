import { NextResponse } from "next/server"
import { getAllAgents, createAgent } from "@/lib/services/agent.service"
import { EntityStatus } from "@/lib/types"

export async function GET() {
  try {
    const agents = await getAllAgents()
    return NextResponse.json({ agents })
  } catch (error) {
    console.error("Error fetching agents:", error)
    return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const agent = await createAgent({
      name: body.name,
      phone: body.phone,
      region: body.region,
      status: EntityStatus.ACTIVE,
    })
    return NextResponse.json({ agent })
  } catch (error) {
    console.error("Error creating agent:", error)
    return NextResponse.json({ error: "Failed to create agent" }, { status: 500 })
  }
}
