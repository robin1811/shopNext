// app/api/testing/test-add-review/route.ts

import { NextResponse } from "next/server"
import { addReview } from "@/server/actions/add-review"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // For testing, mock session inside addReview if no real auth present
    const result = await addReview(body)

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Failed to add review", details: error }, { status: 500 })
  }
}
