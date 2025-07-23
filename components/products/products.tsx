// // 'use client'

// // import { VariantsWithProduct } from "@/lib/infer-type"
// // import Link from "next/link"
// // import Image from "next/image"
// // import { Badge } from "../ui/badge"
// // import formatPrice from "@/lib/format-price"
// // import { useSearchParams } from "next/navigation"
// // import { useMemo } from "react"


// // type ProductTypes = {
// //   variants: VariantsWithProduct[]
// // }

// // export default function Products({variants}: ProductTypes){
// //     // filtered version of the products based upon tags
// //     const params = useSearchParams();
// //     const paramTag = params.get("tag");
// //     const filtered = useMemo(() => {
// //         if(paramTag && variants){
// //             return variants.filter((variant) => variant.variantTags.some((tag)=> tag.tag === paramTag))
// //         }
// //         return variants
// //     },[paramTag])

// //     return(
// //         <main className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-3">
// //         {filtered.map((variant)=>
// //             <Link
// //           className="py-2"
// //           key={variant.id}
// //           href={`/products/${variant.id}?id=${variant.id}&productID=${variant.productID}&price=${variant.product.price}&title=${variant.product.title}&type=${variant.productType}&image=${variant.variantImages[0].url}`}
// //         >
// //         <Image
// //             className="rounded-md pb-2"
// //             src={variant.variantImages[0].url}
// //             width={720}
// //             height={480}
// //             alt={variant.product.title}
// //             loading="lazy"
// //           />
        
// //         <div className="flex justify-between">
// //             <div className="font-medium">
// //                 <h2>{variant.product.title}</h2>
// //                 <p className="text-sm text-muted-foreground">
// //                     {variant.productType}
// //                 </p>
// //             </div>
// //             <div>
// //                 <Badge className="text-sm" variant={"secondary"}>
// //                 {formatPrice(variant.product.price)}
// //                 </Badge>
// //             </div>
// //         </div>

// //         </Link>
        

// //         )}
// //         </main>
// //     )
// // }


// 'use client'

// import { VariantsWithProduct } from "@/lib/infer-type"
// import Link from "next/link"
// import Image from "next/image"
// import { Badge } from "../ui/badge"
// import formatPrice from "@/lib/format-price"
// import { useSearchParams } from "next/navigation"
// import { useMemo } from "react"

// type ProductTypes = {
//   variants: VariantsWithProduct[]
// }

// export default function Products({ variants }: ProductTypes) {
//   const params = useSearchParams()
//   const paramTag = params.get("tag")
//   const sortOrder = params.get("sort") // "asc" or "desc"
//   const minPrice = params.get("minPrice") ? Number(params.get("minPrice")) : null
//   const maxPrice = params.get("maxPrice") ? Number(params.get("maxPrice")) : null

//   const filtered = useMemo(() => {
//     let result = [...variants]

//     if (paramTag) {
//       result = result.filter((variant) =>
//         variant.variantTags.some((tag) => tag.tag === paramTag)
//       )
//     }

//     if (minPrice !== null || maxPrice !== null) {
//       result = result.filter((variant) => {
//         const price = variant.product.price
//         if (minPrice !== null && price < minPrice) return false
//         if (maxPrice !== null && price > maxPrice) return false
//         return true
//       })
//     }

//     if (sortOrder === "asc") {
//       result.sort((a, b) => a.product.price - b.product.price)
//     } else if (sortOrder === "desc") {
//       result.sort((a, b) => b.product.price - a.product.price)
//     }

//     return result
//   }, [paramTag, sortOrder, minPrice, maxPrice, variants])

//   return (
//     <main className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-3">
//       {filtered.map((variant) => (
//         <Link
//           className="py-2"
//           key={variant.id}
//           href={`/products/${variant.id}?id=${variant.id}&productID=${variant.productID}&price=${variant.product.price}&title=${variant.product.title}&type=${variant.productType}&image=${variant.variantImages[0].url}`}
//         >
//           <Image
//             className="rounded-md pb-2"
//             src={variant.variantImages[0].url}
//             width={720}
//             height={480}
//             alt={variant.product.title}
//             loading="lazy"
//           />
//           <div className="flex justify-between">
//             <div className="font-medium">
//               <h2>{variant.product.title}</h2>
//               <p className="text-sm text-muted-foreground">{variant.productType}</p>
//             </div>
//             <div>
//               <Badge className="text-sm" variant={"secondary"}>
//                 {formatPrice(variant.product.price)}
//               </Badge>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </main>
//   )
// }


'use client'

import { VariantsWithProduct } from "@/lib/infer-type"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "../ui/badge"
import formatPrice from "@/lib/format-price"
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { Button } from "../ui/button" // Your button component or fallback to <button>

type ProductTypes = {
  variants: VariantsWithProduct[]
}

export default function Products({ variants }: ProductTypes) {
  const params = useSearchParams()
  const paramTag = params.get("tag")
  const sortOrder = params.get("sort") // "asc" or "desc"
  const minPrice = params.get("minPrice") ? Number(params.get("minPrice")) : null
  const maxPrice = params.get("maxPrice") ? Number(params.get("maxPrice")) : null

  // Pagination state
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(6) // number of products per page

  // Filter + sort products
  const filtered = useMemo(() => {
    let result = [...variants]

    if (paramTag) {
      result = result.filter((variant) =>
        variant.variantTags.some((tag) => tag.tag === paramTag)
      )
    }

    if (minPrice !== null || maxPrice !== null) {
      result = result.filter((variant) => {
        const price = variant.product.price
        if (minPrice !== null && price < minPrice) return false
        if (maxPrice !== null && price > maxPrice) return false
        return true
      })
    }

    if (sortOrder === "asc") {
      result.sort((a, b) => a.product.price - b.product.price)
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.product.price - a.product.price)
    }

    return result
  }, [paramTag, sortOrder, minPrice, maxPrice, variants])

  // Calculate pagination
  const pageCount = Math.ceil(filtered.length / pageSize)
  const currentPageProducts = filtered.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  )

  // Helpers to check prev/next page availability
  const canPreviousPage = pageIndex > 0
  const canNextPage = pageIndex + 1 < pageCount

  // When filter params or filtered products change, reset to first page
  // Optional: You can add this effect to reset pageIndex on filter change
  // useEffect(() => {
  //   setPageIndex(0)
  // }, [paramTag, sortOrder, minPrice, maxPrice, variants])

  return (
    <div>
      <main className="grid sm:grid-cols-1 md:grid-cols-2 gap-12 lg:grid-cols-3">
        {currentPageProducts.map((variant) => (
          <Link
            className="py-2"
            key={variant.id}
            href={`/products/${variant.id}?id=${variant.id}&productID=${variant.productID}&price=${variant.product.price}&title=${variant.product.title}&type=${variant.productType}&image=${variant.variantImages[0].url}`}
          >
            <Image
              className="rounded-md pb-2"
              src={variant.variantImages[0].url}
              width={720}
              height={480}
              alt={variant.product.title}
              loading="lazy"
            />
            <div className="flex justify-between">
              <div className="font-medium">
                <h2>{variant.product.title}</h2>
                <p className="text-sm text-muted-foreground">{variant.productType}</p>
              </div>
              <div>
                <Badge className="text-sm" variant={"secondary"}>
                  {formatPrice(variant.product.price)}
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </main>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-8 space-y-2 sm:space-y-0">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium">
            {pageIndex * pageSize + 1}
          </span>{" "}
          –{" "}
          <span className="font-medium">
            {Math.min((pageIndex + 1) * pageSize, filtered.length)}
          </span>{" "}
          of <span className="font-medium">{filtered.length}</span> results
        </p>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setPageIndex(0)}
            disabled={!canPreviousPage}
            variant="outline"
            size="sm"
          >
            {"<<"}
          </Button>
          <Button
            onClick={() => canPreviousPage && setPageIndex(pageIndex - 1)}
            disabled={!canPreviousPage}
            variant="outline"
            size="sm"
          >
            Previous
          </Button>
          <Button
            onClick={() => canNextPage && setPageIndex(pageIndex + 1)}
            disabled={!canNextPage}
            variant="outline"
            size="sm"
          >
            Next
          </Button>
          <Button
            onClick={() => setPageIndex(pageCount - 1)}
            disabled={!canNextPage}
            variant="outline"
            size="sm"
          >
            {">>"}
          </Button>

          {/* Page size selector */}
          <select
            className="border rounded px-2 py-1 text-sm"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setPageIndex(0) // reset page when page size changes
            }}
          >
            {[6, 9, 12, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
