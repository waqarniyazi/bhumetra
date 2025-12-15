import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { createFarmer } from "@/lib/services/farmer.service"
import { farmerSchema } from "@/lib/validations/schemas"
import { UserRole, Language } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session || (session.role !== UserRole.AGENT && session.role !== UserRole.ADMIN)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    const validatedData = farmerSchema.parse({
      ...body,
      language: body.language || Language.EN,
      createdByAgentId: session.role === UserRole.AGENT ? session.linkedEntityId : body.createdByAgentId,
    })

    const farmer = await createFarmer(validatedData)

    return NextResponse.json(farmer, { status: 201 })
  } catch (error) {
    console.error("Error creating farmer:", error)
    return NextResponse.json({ error: "Failed to create farmer" }, { status: 400 })
  }
}
