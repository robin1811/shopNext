// app/api/testing/test-create/route.ts

import { NextResponse } from "next/server"
import { createProduct } from "@/server/actions/create-products"

export async function POST(req: Request) {
  const body = await req.json() // Get JSON payload from request
  const result = await createProduct(body) // Call the action with the body
  return NextResponse.json(result) // Return the response as JSON
}
