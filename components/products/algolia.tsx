// "use client"

// import { InstantSearchNext } from "react-instantsearch-nextjs"
// import { SearchBox, Hits } from "react-instantsearch"
// import { searchClient } from "@/lib/algolia-client"
// import Link from "next/link"
// import Image from "next/image"
// import { Card } from "../ui/card"
// import { useMemo, useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"



// function Hit({
//   hit,
// }: {
//   hit: {
//     objectID: string
//     id: string
//     price: number
//     title: string
//     productType: string
//     variantImages: string

//     _highlightResult: {
//       title: {
//         value: string
//         matchLevel: string
//         fullyHighlighted: boolean
//         matchedWords: string[]
//       }
//       productType: {
//         value: string
//         matchLevel: string
//         fullyHighlighted: boolean
//         matchedWords: string[]
//       }
//     }
//   }
// }) {
//   return (
//     <div className="p-4 mb-2 hover:bg-secondary ">
//       <Link
//         href={`/products/${hit.objectID}?id=${hit.objectID}&productID=${hit.id}&price=${hit.price}&title=${hit.title}&type=${hit.productType}&image=${hit.variantImages[0]}&variantID=${hit.objectID}`}
//       >
//         <div className="flex w-full gap-12 items-center justify-between">
//           <Image
//             src={hit.variantImages}
//             alt={hit.title}
//             width={60}
//             height={60}
//           />
//           <p
//             dangerouslySetInnerHTML={{
//               __html: hit._highlightResult.title.value,
//             }}
//           ></p>

//           <p
//             dangerouslySetInnerHTML={{
//               __html: hit._highlightResult.productType.value,
//             }}
//           ></p>
//           <p className="font-medium">${hit.price}</p>
//         </div>
//       </Link>
//     </div>
//   )
// }

// export default function Algolia() {
//   const [active, setActive] = useState(false)

//   const MCard = useMemo(() => motion(Card), [])
//   return (
//     <InstantSearchNext
//       future={{
//         persistHierarchicalRootCount: true,
//         preserveSharedStateOnUnmount: true,
//       }}
//       indexName="products"
//       searchClient={searchClient}
//     >
//       <div className="relative">
//         <SearchBox
//           placeholder="Search products…"
//           onFocus={() => setActive(true)}
//           onBlur={() => {
//             setTimeout(() => {
//               setActive(false)
//             }, 100)
//           }}
//           classNames={{
//             input:
//               " h-full w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
//             submitIcon: "hidden",
//             form: "relative mb-4",
//             resetIcon: "hidden",
//           }}
//         />
//         <AnimatePresence>
//           {active && (
//             <MCard
//               animate={{ opacity: 1, scale: 1 }}
//               initial={{ opacity: 0, scale: 0.8 }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               className="absolute w-full z-50 overflow-y-scroll h-96"
//             >
//               <Hits hitComponent={Hit} className="rounded-md" />
//             </MCard>
//           )}
//         </AnimatePresence>
//       </div>
//     </InstantSearchNext>
//   )
// }



"use client"

import { InstantSearchNext } from "react-instantsearch-nextjs"
import { SearchBox, Hits } from "react-instantsearch"
import { searchClient } from "@/lib/algolia-client"
import Link from "next/link"
import Image from "next/image"
import { Card } from "../ui/card"
import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CustomPriceRange } from "./custom-pricerange"

type AlgoliaProduct = {
  objectID: string
  id: string
  price: number
  title: string
  productType: string
  variantImages: string[] | string

  _highlightResult: {
    title: { value: string }
    productType: { value: string }
  }
}

function Hit({ hit }: { hit: AlgoliaProduct }) {
  const rawImage = Array.isArray(hit.variantImages)
    ? hit.variantImages[0]
    : hit.variantImages

  const imageUrl = rawImage?.startsWith("http") ? rawImage : "/placeholder.png"

  const queryParams = new URLSearchParams({
    id: hit.objectID,
    productID: hit.id,
    price: hit.price.toString(),
    title: hit.title,
    type: hit.productType,
    image: imageUrl,
    variantID: hit.objectID,
  }).toString()

  return (
    <Link href={`/products/${hit.objectID}?${queryParams}`} className="block">
      <div className="flex items-center gap-4 px-4 py-2 hover:bg-muted transition rounded">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={hit.title}
            width={50}
            height={50}
            className="rounded object-cover"
          />
        ) : (
          <div className="w-[50px] h-[50px] bg-gray-200 rounded" />
        )}

        <div className="flex-1">
          <p
            className="font-medium text-sm"
            dangerouslySetInnerHTML={{
              __html: hit._highlightResult.title.value,
            }}
          />
          <p
            className="text-xs text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: hit._highlightResult.productType.value,
            }}
          />
        </div>
        <p className="font-semibold text-sm">${hit.price.toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default function Algolia() {
  const [active, setActive] = useState(false)
  const [showCustomSearch, setShowCustomSearch] = useState(false)
  const MCard = useMemo(() => motion(Card), [])

  return (
    <InstantSearchNext
      indexName="products"
      searchClient={searchClient}
      future={{
        persistHierarchicalRootCount: true,
        preserveSharedStateOnUnmount: true,
      }}
    >
      <div className="relative space-y-2">
        <SearchBox
          placeholder="Search products…"
          onFocus={() => setActive(true)}
          onBlur={() => setTimeout(() => setActive(false), 150)}
          classNames={{
            input:
              "w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            form: "mb-2",
            submitIcon: "hidden",
            resetIcon: "hidden",
          }}
        />

        {/* Button to toggle custom price filter */}
        <button
          type="button"
          className="px-3 py-1 border rounded bg-primary text-primary-foreground hover:bg-primary/90 transition"
          onClick={() => setShowCustomSearch((v) => !v)}
        >
          {showCustomSearch ? "Hide Custom Search" : "Custom Search"}
        </button>

        {/* Conditionally render the price range filter */}
        {showCustomSearch && <CustomPriceRange />}

        <AnimatePresence>
          {active && (
            <MCard
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute z-50 mt-1 w-full max-h-96 overflow-y-auto shadow-lg bg-background border rounded"
            >
              <Hits hitComponent={Hit} />
            </MCard>
          )}
        </AnimatePresence>
      </div>
    </InstantSearchNext>
  )
}




// "use client"

// import { InstantSearchNext } from "react-instantsearch-nextjs"
// import { SearchBox, Hits } from "react-instantsearch"
// import { searchClient } from "@/lib/algolia-client"
// import Link from "next/link"
// import Image from "next/image"
// import { Card } from "../ui/card"
// import { useMemo, useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { CustomPriceRange } from "./custom-pricerange"

// type AlgoliaProduct = {
//   objectID: string
//   id: string
//   price: number
//   title: string
//   productType: string
//   variantImages: string[] | string // support both string[] and string fallback
//   _highlightResult: {
//     title: { value: string }
//     productType: { value: string }
//   }
// }

// function Hit({
//   hit,
// }: {
//   hit: {
//     objectID: string
//     id: string
//     price: number
//     title: string
//     productType: string
//     variantImages: string

//     _highlightResult: {
//       title: {
//         value: string
//       }
//       productType: {
//         value: string
//       }
//     }
//   }
// }) {
//   // Ensure image is safe for URL usage
//   const image = hit.variantImages?.startsWith("http")
//     ? hit.variantImages
//     : "/placeholder.png" // fallback if missing or invalid

//   const queryParams = new URLSearchParams({
//     id: hit.objectID,
//     productID: hit.id,
//     price: hit.price.toString(),
//     title: hit.title,
//     type: hit.productType,
//     image: image,
//     variantID: hit.objectID,
//   }).toString()

//   return (
//     <div className="p-4 mb-2 hover:bg-secondary">
//       <Link href={`/products/${hit.objectID}?${queryParams}`}>
//         <div className="flex w-full gap-12 items-center justify-between">
//           <Image
//             src={image}
//             alt={hit.title}
//             width={60}
//             height={60}
//           />
//           <p
//             dangerouslySetInnerHTML={{
//               __html: hit._highlightResult.title.value,
//             }}
//           ></p>
//           <p
//             dangerouslySetInnerHTML={{
//               __html: hit._highlightResult.productType.value,
//             }}
//           ></p>
//           <p className="font-medium">${hit.price}</p>
//         </div>
//       </Link>
//     </div>
//   )
// }


//   return (
//     <Link href={`/products/${hit.objectID}`} className="block">
//       <div className="flex items-center gap-4 px-4 py-2 hover:bg-muted transition rounded">
//         {validImage ? (
//           <Image
//             src={imageUrl}
//             alt={hit.title}
//             width={50}
//             height={50}
//             className="rounded object-cover"
//           />
//         ) : (
//           <div className="w-[50px] h-[50px] bg-gray-200 rounded" />
//         )}

//         <div className="flex-1">
//           <p
//             className="font-medium text-sm"
//             dangerouslySetInnerHTML={{
//               __html: hit._highlightResult.title.value,
//             }}
//           />
//           <p
//             className="text-xs text-muted-foreground"
//             dangerouslySetInnerHTML={{
//               __html: hit._highlightResult.productType.value,
//             }}
//           />
//         </div>
//         <p className="font-semibold text-sm">${hit.price.toFixed(2)}</p>
//       </div>
//     </Link>
//   )
// }

// export default function Algolia() {
//   const [active, setActive] = useState(false)
//   const MCard = useMemo(() => motion(Card), [])

//   return (
//     <InstantSearchNext
//       indexName="products"
//       searchClient={searchClient}
//       future={{
//         persistHierarchicalRootCount: true,
//         preserveSharedStateOnUnmount: true,
//       }}
//     >
//       <div className="relative">
//         <SearchBox
//           placeholder="Search products…"
//           onFocus={() => setActive(true)}
//           onBlur={() => setTimeout(() => setActive(false), 150)}
//           classNames={{
//             input:
//               "w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
//             form: "mb-2",
//             submitIcon: "hidden",
//             resetIcon: "hidden",
//           }}
//         />

//         {/* ✅ Optional: Price Range Filter */}
//         <CustomPriceRange />

//         <AnimatePresence>
//           {active && (
//             <MCard
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               className="absolute z-50 mt-1 w-full max-h-96 overflow-y-auto shadow-lg bg-background border rounded"
//             >
//               <Hits hitComponent={Hit} />
//             </MCard>
//           )}
//         </AnimatePresence>
//       </div>
//     </InstantSearchNext>
//   )
// }




// "use client"

// import { InstantSearchNext } from "react-instantsearch-nextjs"
// import { SearchBox, Hits } from "react-instantsearch"
// import { searchClient } from "@/lib/algolia-client"
// import Link from "next/link"
// import Image from "next/image"
// import { Card } from "../ui/card"
// import { useMemo, useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"

// import { RangeInput } from "react-instantsearch"
// import { CustomPriceRange } from "./custom-pricerange"

// function Hit({
//   hit,
// }: {
//   hit: {
//     objectID: string
//     id: string
//     price: number
//     title: string
//     productType: string
//     variantImages: string

//     _highlightResult: {
//       title: {
//         value: string
//         matchLevel: string
//         fullyHighlighted: boolean
//         matchedWords: string[]
//       }
//       productType: {
//         value: string
//         matchLevel: string
//         fullyHighlighted: boolean
//         matchedWords: string[]
//       }
//     }
//   }
// }) {
//   return (
//     <div className="p-4 mb-2 hover:bg-secondary ">
//       <Link
//         href={`/products/${hit.objectID}?id=${hit.objectID}&productID=${hit.id}&price=${hit.price}&title=${hit.title}&type=${hit.productType}&image=${hit.variantImages[0]}&variantID=${hit.objectID}`}
//       >
//         <div className="flex w-full gap-12 items-center justify-between">
//           <Image
//             src={hit.variantImages}
//             alt={hit.title}
//             width={60}
//             height={60}
//           />
//           <p
//             dangerouslySetInnerHTML={{
//               __html: hit._highlightResult.title.value,
//             }}
//           ></p>

//           <p
//             dangerouslySetInnerHTML={{
//               __html: hit._highlightResult.productType.value,
//             }}
//           ></p>
//           <p className="font-medium">${hit.price}</p>
//         </div>
//       </Link>
//     </div>
//   )
// }

// export default function Algolia() {
//   const [active, setActive] = useState(false)

//   const MCard = useMemo(() => motion(Card), [])
//   return (
//     <InstantSearchNext
//       future={{
//         persistHierarchicalRootCount: true,
//         preserveSharedStateOnUnmount: true,
//       }}
//       indexName="products"
//       searchClient={searchClient}
//     >
//       <div className="relative">
//   <SearchBox
//   onFocus={() => setActive(true)}
//   onBlur={() => setTimeout(() => setActive(false), 100)}
//   classNames={{
//     input:
//       " h-full w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
//     submitIcon: "hidden",
//     form: "relative mb-4",
//     resetIcon: "hidden",
//   }}
// />

// {/* ✅ Use only Custom Price Filter */}
// <CustomPriceRange />

// <AnimatePresence>
//   {active && (
//     <MCard animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.8 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute w-full z-50 overflow-y-scroll h-96">
//       <Hits hitComponent={Hit} />
//     </MCard>
//   )}
// </AnimatePresence>
// </div>

//     </InstantSearchNext>
    
//   )
  
// }

