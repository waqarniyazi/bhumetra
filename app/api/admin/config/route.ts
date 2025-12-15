import { NextResponse } from "next/server"
import { getGlobalConfig, updateGlobalConfig } from "@/lib/services/config.service"

export async function GET() {
  try {
    const config = await getGlobalConfig()
    return NextResponse.json({ config })
  } catch (error) {
    console.error("Error fetching config:", error)
    return NextResponse.json({ error: "Failed to fetch config" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const config = await updateGlobalConfig(body)
    return NextResponse.json({ config })
  } catch (error) {
    console.error("Error updating config:", error)
    return NextResponse.json({ error: "Failed to update config" }, { status: 500 })
  }
}
