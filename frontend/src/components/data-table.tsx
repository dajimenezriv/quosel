'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  EllipsisVertical,
  ExternalLink,
  MapPin,
  Star,
} from 'lucide-react';
import * as React from 'react';
import { z } from 'zod';
import { schema } from './task-schema';

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: 'place',
    header: 'Place',
    cell: ({ row }) => <span className="font-medium">{row.original.place.name}</span>,
  },
  {
    id: 'domain',
    header: 'Domain',
    cell: ({ row }) => (
      <a
        href={`https://${row.original.domain}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400">
        {row.original.domain}
        <ExternalLink className="size-3 shrink-0" />
      </a>
    ),
  },
  {
    id: 'address',
    header: 'Address',
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.place.shortFormattedAddress}</span>,
  },
  {
    id: 'rating',
    header: 'Rating',
    cell: ({ row }) => {
      const { rating, userRatingCount } = row.original.place;
      if (rating === null) return <span className="text-muted-foreground">—</span>;
      return (
        <Badge variant="outline" className="text-muted-foreground gap-1 px-1.5">
          <Star className="size-3 fill-yellow-400 text-yellow-400" />
          {rating.toFixed(1)}
          {userRatingCount !== null && <span className="text-xs">({userRatingCount.toLocaleString()})</span>}
        </Badge>
      );
    },
  },
  {
    id: 'template',
    header: 'Template',
    cell: ({ row }) => <span className="text-muted-foreground capitalize">{row.original.template}</span>,
  },
  {
    id: 'createdAt',
    header: 'Created',
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
      </span>
    ),
  },
  {
    id: 'updatedAt',
    header: 'Updated',
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {new Date(row.original.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
      </span>
    ),
  },
  {
    id: 'maps',
    header: '',
    cell: ({ row }) => (
      <a
        href={row.original.place.googleMapsPlaceUri}
        target="_blank"
        rel="noopener noreferrer"
        title="View on Google Maps"
        onClick={(e) => e.stopPropagation()}
        className="text-muted-foreground hover:text-foreground flex items-center">
        <MapPin className="size-4" />
      </a>
    ),
  },
  {
    id: 'actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8 cursor-pointer"
            size="icon"
            onClick={(e) => e.stopPropagation()}>
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export function DataTable({ data, onRowClick }: { data: z.infer<typeof schema>[]; onRowClick?: (id: string) => void }) {
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    getRowId: (row) => row.id,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} onClick={() => onRowClick?.(row.original.id)} className={onRowClick ? 'cursor-pointer' : ''}>
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
      <div className="flex items-center justify-end px-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select value={`${table.getState().pagination.pageSize}`} onValueChange={(value) => table.setPageSize(Number(value))}>
              <SelectTrigger size="sm" className="w-20 cursor-pointer" id="rows-per-page">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-8 w-8 cursor-pointer p-0"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}>
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8 cursor-pointer"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8 cursor-pointer"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="size-8 cursor-pointer"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}>
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
