import * as z from "zod"

export const ProductSchema = z.object({
    // we have added optinal because we might be in edit mode then i will already have a id
  id: z.number().optional(),
  title: z.string().min(5, {
    message: "Title must be at least 5 characters long",
  }),
  description: z.string().min(40, {
    message: "Description must be at least 40 characters long",
  }),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .positive({ message: "Price must be a positive number" }),
})

export type zProductSchema = z.infer<typeof ProductSchema>
