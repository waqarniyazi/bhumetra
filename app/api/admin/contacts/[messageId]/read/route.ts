import { NextResponse } from "next/server"
import { markMessageAsRead } from "@/lib/services/contact.service"

export async function PATCH(request: Request, { params }: { params: Promise<{ messageId: string }> }) {
  try {
    const { messageId } = await params
    const message = await markMessageAsRead(messageId)
    return NextResponse.json({ message })
  } catch (error) {
    console.error("Error marking message as read:", error)
    return NextResponse.json({ error: "Failed to mark message as read" }, { status: 500 })
  }
}
