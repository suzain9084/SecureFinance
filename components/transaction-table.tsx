"use client"

import { useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Badge } from "@/components/ui/badge"

// Mock transaction data
const data = Array.from({ length: 50 }).map((_, i) => ({
  id: `TRX-${Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0")}`,
  payerId: `P${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`,
  payeeId: `M${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`,
  amount: Math.floor(Math.random() * 10000) / 100,
  date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  channel: ["online", "in-store", "mobile"][Math.floor(Math.random() * 3)],
  paymentMode: ["credit card", "debit card", "bank transfer"][Math.floor(Math.random() * 3)],
  gateway: ["Bank A", "Bank B", "Bank C", "Bank D"][Math.floor(Math.random() * 4)],
  isPredictedFraud: Math.random() > 0.9,
  isReportedFraud: Math.random() > 0.95,
}))

type Transaction = (typeof data)[0]

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "payerId",
    header: "Payer ID",
  },
  {
    accessorKey: "payeeId",
    header: "Payee ID",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <div>${row.getValue("amount")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{new Date(row.getValue("date")).toLocaleString()}</div>,
  },
  {
    accessorKey: "channel",
    header: "Channel",
  },
  {
    accessorKey: "paymentMode",
    header: "Payment Mode",
  },
  {
    accessorKey: "gateway",
    header: "Gateway",
  },
  {
    accessorKey: "isPredictedFraud",
    header: "Predicted Fraud",
    cell: ({ row }) => (
      <Badge variant={row.getValue("isPredictedFraud") ? "destructive" : "outline"}>
        {row.getValue("isPredictedFraud") ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    accessorKey: "isReportedFraud",
    header: "Reported Fraud",
    cell: ({ row }) => (
      <Badge variant={row.getValue("isReportedFraud") ? "destructive" : "outline"}>
        {row.getValue("isReportedFraud") ? "Yes" : "No"}
      </Badge>
    ),
  },
]

export function TransactionTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Search by Transaction ID..."
              value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("id")?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex-1">
            <Input
              placeholder="Filter by Payer ID..."
              value={(table.getColumn("payerId")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("payerId")?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex-1">
            <Input
              placeholder="Filter by Payee ID..."
              value={(table.getColumn("payeeId")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("payeeId")?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex-1">
            <DatePickerWithRange className="max-w-sm" />
          </div>
          <div className="flex-1 flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} of {table.getCoreRowModel().rows.length} row(s).
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

