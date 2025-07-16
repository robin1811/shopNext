// app/api/testing/test-delete/route.ts


import { NextResponse } from "next/server"
import { deleteProduct } from "@/server/actions/delete-product"

export async function DELETE(req: Request) {
  const body = await req.json(); // Parses the request body
  const result = await deleteProduct(body); // Calls the delete action
  return NextResponse.json(result); // Returns JSON response
}


