import { NextResponse } from "next/server"
import { getAllFarmers } from "@/lib/services/farmer.service"

export async function GET() {
  try {
    const farmers = await getAllFarmers()
    return NextResponse.json({ farmers })
  } catch (error) {
    console.error("Error fetching farmers:", error)
    return NextResponse.json({ error: "Failed to fetch farmers" }, { status: 500 })
  }
}
