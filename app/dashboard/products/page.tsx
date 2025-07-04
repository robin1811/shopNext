import { db } from "@/server"
import placeholder from "@/public/placeholder-image.jpeg"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export default async function Products() {
  const products = await db.query.products.findMany({

    orderBy: (products, { desc }) => [desc(products.id)],
  })


  const dataTable = products.map((product) => {

      return {
        id: product.id,
        title: product.title,
        price: product.price,
        image: placeholder.src,
        variants: [],
      }

  })
  if (!dataTable) throw new Error("No data found")
  return (
    <div>
      <DataTable columns={columns} data={dataTable} />
    </div>
  )
}
