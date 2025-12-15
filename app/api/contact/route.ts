import { NextResponse } from "next/server"
import { createContactMessage } from "@/lib/services/contact.service"
import { contactMessageSchema } from "@/lib/validations/schemas"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const validatedData = contactMessageSchema.parse(body)

    const message = await createContactMessage(validatedData)

    return NextResponse.json({ success: true, message }, { status: 201 })
  } catch (error) {
    console.error("Error creating contact message:", error)
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 400 })
  }
}
