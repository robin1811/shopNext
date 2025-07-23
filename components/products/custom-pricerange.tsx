"use client"

import { useRange } from "react-instantsearch"
import { useState } from "react"

export function CustomPriceRange() {
  const { refine } = useRange({ attribute: "price" })
  const [min, setMin] = useState<number | "">("")
  const [max, setMax] = useState<number | "">("")

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="number"
        placeholder="Min price"
        value={min}
        onChange={(e) => setMin(e.target.value === "" ? "" : Number(e.target.value))}
        className="border px-2 py-1 rounded w-24"
      />
      <input
        type="number"
        placeholder="Max price"
        value={max}
        onChange={(e) => setMax(e.target.value === "" ? "" : Number(e.target.value))}
        className="border px-2 py-1 rounded w-24"
      />
      <button
        onClick={() => refine([min === "" ? undefined : min, max === "" ? undefined : max])}
        className="bg-primary text-white px-3 py-1 rounded"
      >
        Go
      </button>
    </div>
  )
}
