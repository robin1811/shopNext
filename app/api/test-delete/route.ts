// app/api/test-delete/route.ts


import { NextResponse } from "next/server"
import { deleteProduct } from "@/server/actions/delete-product"

export async function DELETE(req: Request) {
  const body = await req.json()
  const result = await deleteProduct(body)
  return NextResponse.json(result)
}

