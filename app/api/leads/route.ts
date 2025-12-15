import { NextResponse } from "next/server"
import { createLead } from "@/lib/services/lead.service"
import { leadSchema } from "@/lib/validations/schemas"
import { LeadSource } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const validatedData = leadSchema.parse({
      ...body,
      source: LeadSource.WEBSITE,
    })

    const lead = await createLead(validatedData)

    return NextResponse.json({ success: true, lead }, { status: 201 })
  } catch (error) {
    console.error("Error creating lead:", error)
    return NextResponse.json({ success: false, error: "Failed to create lead" }, { status: 400 })
  }
}
