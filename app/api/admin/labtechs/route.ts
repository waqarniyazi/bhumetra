import { NextResponse } from "next/server"
import { getAllLabTechs, createLabTech } from "@/lib/services/labtech.service"
import { EntityStatus } from "@/lib/types"

export async function GET() {
  try {
    const labTechs = await getAllLabTechs()
    return NextResponse.json({ labTechs })
  } catch (error) {
    console.error("Error fetching lab techs:", error)
    return NextResponse.json({ error: "Failed to fetch lab techs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const labTech = await createLabTech({
      name: body.name,
      phone: body.phone,
      labName: body.labName,
      status: EntityStatus.ACTIVE,
    })
    return NextResponse.json({ labTech })
  } catch (error) {
    console.error("Error creating lab tech:", error)
    return NextResponse.json({ error: "Failed to create lab tech" }, { status: 500 })
  }
}
