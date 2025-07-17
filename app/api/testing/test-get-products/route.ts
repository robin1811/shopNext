// app/api/testing/test-get-products/route.ts

import { NextResponse } from "next/server"
import { db } from "@/server" 
import { products } from "@/server/schema"

export async function GET() {
  try {
    const allProducts = await db.select().from(products)
    return NextResponse.json(allProducts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products", details: error }, { status: 500 })
  }
}
