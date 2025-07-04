"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRight, ChevronRightIcon } from "lucide-react"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 5, // ✅ show 10 items per page (default)
})
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
    setMounted(true)
}   , [])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    getSortedRowModel: getSortedRowModel(), // ✅ Add this
    onSortingChange: setSorting, // ✅ Add this
    onPaginationChange: setPagination, // ✅ required

    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
      pagination, // ✅ add pagination state
    },
  })


// export function for excel file
function exportToExcel(data: any[], fileName: string = "table_data") {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
  XLSX.writeFile(workbook, `${fileName}.xlsx`)
}
// export function for pdf file


function exportToPDF(columns: string[], data: any[]) {
  const doc = new jsPDF()

  autoTable(doc, {
    head: [columns],
    body: data.map((row) => columns.map((key) => row[key])),
  })

  doc.save("table_data.pdf")
}


  return (
    <div className="rounded-md border">
      <Card>
        <CardHeader>
          <CardTitle>Your Products</CardTitle>
          <CardDescription>
            Update, delete and edit your products 💯
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div>
              <Input
                placeholder="Filter Products"
                value={
                  (table.getColumn("title")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("title")?.setFilterValue(event.target.value)
                }
              />
            </div>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        // <TableHead key={header.id}>
                        //   {header.isPlaceholder
                        //     ? null
                        //     : flexRender(
                        //         header.column.columnDef.header,
                        //         header.getContext()
                        //       )}
                        // </TableHead>
                        <TableHead
                            key={header.id}
                            onClick={header.column.getToggleSortingHandler()}
                            className="cursor-pointer select-none"
                            >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                                asc: " 🔼",
                                desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                            </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              
              {/* code for the x out of x products */}
              {mounted && (
                <div className="w-max flex justify-end">
                    <p className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium">
                        {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                    </span>
                    –
                    <span className="font-medium">
                        {Math.min(
                        (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                        table.getFilteredRowModel().rows.length
                        )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                        {table.getFilteredRowModel().rows.length}
                    </span>{" "}
                    results
                    </p>
                </div>
                )}

            </Table>
            
                <div>
                {/* Page Size Selector goes *outside* the Table */}
                <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2 text-sm">
                    Rows per page:
                    <select
                    className="border rounded px-2 py-1"
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                    >
                    {[5, 10, 20, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                        {pageSize}
                        </option>
                    ))}
                    </select>
                </div>
                </div>
                    <div className="flex justify-end">
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline">Export</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => {
                            const exportData = table.getFilteredRowModel().rows.map(
                                (row) => row.original
                            )
                            exportToExcel(exportData, "products_export")
                            }}
                        >
                            Export to Excel
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                            const rows = table.getFilteredRowModel().rows.map(
                                (row) => row.original
                            )
                            const columnKeys = ["id", "title", "price"] // customize this as needed
                            exportToPDF(columnKeys, rows)
                            }}
                        >
                            Export to PDF
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    </div>

                </div>





            <div className="flex items-center justify-end gap-4 pt-4">
              <Button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                variant="outline"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                <span>Previous Page</span>
              </Button>
              <Button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                variant="outline"
              >
                <span>Next page</span>
                <ChevronRightIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
