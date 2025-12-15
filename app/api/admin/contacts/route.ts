import { NextResponse } from "next/server"
import { getAllContactMessages } from "@/lib/services/contact.service"

export async function GET() {
  try {
    const messages = await getAllContactMessages()
    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}
