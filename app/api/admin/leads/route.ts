import { NextResponse } from "next/server"
import { getAllLeads } from "@/lib/services/lead.service"

export async function GET() {
  try {
    const leads = await getAllLeads()
    return NextResponse.json({ leads })
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}
