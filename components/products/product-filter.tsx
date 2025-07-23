'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function ProductFilters() {
  const params = useSearchParams()
  const router = useRouter()

  const currentTag = params.get("tag") ? `&tag=${params.get("tag")}` : ""

  const applyQuery = (query: string) => {
    router.push(`?${query}${currentTag}`)
  }

  return (
    <div className="flex flex-wrap items-center gap-4 my-4">
      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Sort by Price <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => applyQuery('sort=asc')}>
            Low to High
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => applyQuery('sort=desc')}>
            High to Low
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Price Range Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Filter by Price <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Price Ranges</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => applyQuery('minPrice=0&maxPrice=50')}>
            Under $50
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => applyQuery('minPrice=50&maxPrice=100')}>
            $50 - $100
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => applyQuery('minPrice=100&maxPrice=500')}>
            $100 - $500
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Reset */}
      <Button
        variant="ghost"
        className="text-red-500 hover:text-red-600"
        onClick={() => router.push(`?${currentTag}`)}
      >
        Reset Filters
      </Button>
    </div>
  )
}
