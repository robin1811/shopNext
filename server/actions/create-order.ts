// "use server"

// import { createOrderSchema } from "@/types/order-schema"
// import { createSafeActionClient } from "next-safe-action"
// import { auth } from "../auth"
// import { db } from "@/server"
// import { orderProduct, orders } from "../schema"

// const action = createSafeActionClient()

// export const createOrder = action(
//   createOrderSchema,
//   async ({ products, status, total, paymentIntentID }) => {
//     const user = await auth()
//     if (!user) return { error: "user not found" }

//     const order = await db
//       .insert(orders)
//       .values({
//         status,
//         paymentIntentID,
//         total,
//         userID: user.user.id,
//       })
//       .returning()
//     const orderProducts = products.map(
//       async ({ productID, quantity, variantID }) => {
//         const newOrderProduct = await db.insert(orderProduct).values({
//           quantity,
//           orderID: order[0].id,
//           productID: productID,
//           productVariantID: variantID,
//         })
//       }
//     )
//     return { success: "Order has been added" }
//   }
// )


"use server"

import { createOrderSchema } from "@/types/order-schema"
import { createSafeActionClient } from "next-safe-action"
import { auth } from "../auth"
import { db } from "@/server"
import { orderProduct, orders } from "../schema"
import { z } from "zod"

const action = createSafeActionClient()

// Infer the input type from the schema
type CreateOrderInput = z.infer<typeof createOrderSchema>
type OrderProductInput = CreateOrderInput["products"][number]

export const createOrder = action(
  createOrderSchema,
  async ({ products, status, total, paymentIntentID }) => {
    const user = await auth()
    if (!user) return { error: "user not found" }

    const [order] = await db
      .insert(orders)
      .values({
        status,
        paymentIntentID,
        total,
        userID: user.user.id,
      })
      .returning()

    await Promise.all(
      products.map(async (product: OrderProductInput) => {
        await db.insert(orderProduct).values({
          quantity: product.quantity,
          orderID: order.id,
          productID: product.productID,
          productVariantID: product.variantID,
        })
      })
    )

    return { success: "Order has been added" }
  }
)
