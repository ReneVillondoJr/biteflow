'use client';

import { ChevronLeft, ChevronRight, CircleDashed, Eye, MoreHorizontal, Printer, Search, Store, X } from 'lucide-react';
import { useState } from 'react';

import type { CustomerOrder, OrderStatus } from '../types/orders';
import { orderSchema } from '../schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import OrderSelect from './order-select';

type OrdersTableProps = {
  orders: CustomerOrder[];
  filteredCount: number;
  query: string;
  status: (typeof orderSchema.statusOptions)[number];
  type: (typeof orderSchema.typeOptions)[number];
  page: number;
  pageCount: number;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: (typeof orderSchema.statusOptions)[number]) => void;
  onTypeChange: (value: (typeof orderSchema.typeOptions)[number]) => void;
  onPageChange: (page: number) => void;
  onStatusUpdate: (id: string, status: OrderStatus) => void;
  onClearFilters: () => void;
};

const statusStyles: Record<OrderStatus, string> = {
  New: 'border-blue-200 bg-blue-50 text-blue-700',
  Preparing: 'border-amber-200 bg-amber-50 text-amber-700',
  Ready: 'border-sky-200 bg-sky-50 text-sky-700',
  'On delivery': 'border-violet-200 bg-violet-50 text-violet-700',
  Completed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Cancelled: 'border-red-200 bg-red-50 text-red-700',
};

export default function OrdersTable({
  orders, filteredCount, query, status, type, page, pageCount,
  onQueryChange, onStatusChange, onTypeChange, onPageChange, onStatusUpdate, onClearFilters,
}: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  function openOrder(order: CustomerOrder) {
    setSelectedOrder(order);
    setSheetOpen(true);
  }

  return (
    <>
      <Card className='overflow-hidden rounded-md border-border shadow-sm'>
        <div className='flex flex-col gap-3 border-b border-border px-4 py-3 xl:flex-row xl:items-center xl:justify-between'>
          <div className='relative w-full xl:w-[320px]'>
            <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' aria-hidden='true' />
            <Input className='h-9 border-[#dde2dc] bg-white pl-9 shadow-none placeholder:text-[#9da59c] focus-visible:border-[#dde2dc] focus-visible:bg-white focus-visible:ring-0' value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder='Search order or customer' />
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            <OrderSelect
              value={status}
              options={orderSchema.statusOptions}
              onChange={onStatusChange}
              icon={CircleDashed}
              label='Filter by order status'
            />
            <OrderSelect
              value={type}
              options={orderSchema.typeOptions}
              onChange={onTypeChange}
              icon={Store}
              label='Filter by order type'
              className='min-w-36'
            />
            {(query || status !== 'All' || type !== 'All types') && (
              <Button variant='ghost' size='sm' className='h-9 rounded-md px-2 text-[10px]' onClick={onClearFilters}>
                <X className='size-3.5' />
                Clear
              </Button>
            )}
          </div>
        </div>

        <div className='overflow-x-auto'>
          <Table className='min-w-[820px]'>
            <TableHeader>
              <TableRow>
                <TableHead className='h-11 px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Order</TableHead>
                <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Customer</TableHead>
                <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Type</TableHead>
                <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Items</TableHead>
                <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Status</TableHead>
                <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Total</TableHead>
                <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Placed</TableHead>
                <TableHead className='w-12 px-2' />
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className='cursor-pointer' onClick={() => openOrder(order)}>
                  <TableCell className='h-[58px] px-4'><strong className='text-[12px] text-[#25382d]'>{order.id}</strong></TableCell>
                  <TableCell className='px-4'><strong className='block text-[12px] font-semibold'>{order.customer}</strong><small className='text-[10px] text-muted-foreground'>{order.phone}</small></TableCell>
                  <TableCell className='px-4 text-[12px] font-medium'>{order.type}</TableCell>
                  <TableCell className='px-4 text-[12px] text-muted-foreground'>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</TableCell>
                  <TableCell className='px-4'><Badge className={`rounded-md border px-2 py-0.5 text-[9px] font-extrabold ${statusStyles[order.status]}`}>{order.status}</Badge></TableCell>
                  <TableCell className='px-4 text-[12px] font-extrabold'>{order.total}</TableCell>
                  <TableCell className='px-4 text-[11px] text-muted-foreground'>{order.placedAt}</TableCell>
                  <TableCell className='px-2' onClick={(event) => event.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger className='flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted' aria-label={`Actions for ${order.id}`}><MoreHorizontal className='size-4' /></DropdownMenuTrigger>
                      <DropdownMenuContent align='end' className='w-44 rounded-md'>
                        <DropdownMenuItem onClick={() => openOrder(order)}><Eye className='size-4' />View details</DropdownMenuItem>
                        {orderSchema.statuses.map((nextStatus) => (
                          <DropdownMenuItem key={nextStatus} disabled={order.status === nextStatus} onClick={() => onStatusUpdate(order.id, nextStatus)}>
                            Set {nextStatus}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {!orders.length && (
                <TableRow><TableCell colSpan={8} className='h-40 text-center text-muted-foreground'>No orders match the current filters.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className='flex h-12 items-center justify-between border-t border-border px-4'>
          <span className='text-[11px] text-muted-foreground'>Showing {orders.length} of {filteredCount} orders</span>
          <div className='flex items-center gap-1'>
            <Button variant='outline' size='icon-sm' disabled={page === 1} onClick={() => onPageChange(page - 1)} aria-label='Previous page'><ChevronLeft /></Button>
            <span className='min-w-16 text-center text-[11px] font-semibold'>{page} / {pageCount}</span>
            <Button variant='outline' size='icon-sm' disabled={page === pageCount} onClick={() => onPageChange(page + 1)} aria-label='Next page'><ChevronRight /></Button>
          </div>
        </div>
      </Card>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className='w-full max-w-[440px] p-0 sm:max-w-[440px]'>
          {selectedOrder && (
            <>
              <SheetHeader className='border-b border-border px-5 py-4 pr-14 text-left'>
                <span className='text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Order details</span>
                <SheetTitle>{selectedOrder.id}</SheetTitle>
                <SheetDescription>{selectedOrder.customer} · {selectedOrder.placedAt}</SheetDescription>
              </SheetHeader>
              <div className='flex-1 overflow-y-auto px-5 py-5'>
                <div className='mb-5 flex items-center justify-between rounded-md border border-[#edf0ea] bg-[#fbfcfa] p-3'>
                  <div><span className='block text-[10px] font-bold text-muted-foreground'>Current status</span><Badge className={`mt-1 rounded-md border px-2 py-0.5 text-[9px] font-extrabold ${statusStyles[selectedOrder.status]}`}>{selectedOrder.status}</Badge></div>
                  <OrderSelect
                    value={selectedOrder.status}
                    options={orderSchema.statuses}
                    onChange={(nextStatus) => {
                      onStatusUpdate(selectedOrder.id, nextStatus);
                      setSelectedOrder({ ...selectedOrder, status: nextStatus });
                    }}
                    icon={CircleDashed}
                    label='Change order status'
                    className='w-36'
                  />
                </div>
                <div className='mb-5 grid gap-2'>
                  <h3 className='text-[11px] font-black uppercase tracking-wide text-muted-foreground'>Customer</h3>
                  <strong className='text-sm'>{selectedOrder.customer}</strong>
                  <span className='text-[12px] text-muted-foreground'>{selectedOrder.phone}</span>
                  <span className='text-[12px] text-muted-foreground'>{selectedOrder.email}</span>
                  {selectedOrder.address && <p className='mt-2 rounded-lg border border-border p-3 text-[12px] leading-5'>{selectedOrder.address}</p>}
                </div>
                <div className='mb-5 grid gap-2'>
                  <h3 className='text-[11px] font-black uppercase tracking-wide text-muted-foreground'>Order items</h3>
                  {selectedOrder.items.map((item) => (
                    <div className='flex items-center justify-between border-b border-border py-2.5 text-[12px]' key={item.name}>
                      <span><strong>{item.quantity}×</strong> {item.name}</span><strong>{item.price}</strong>
                    </div>
                  ))}
                </div>
                <div className='grid gap-2 rounded-md border border-border p-3 text-[12px]'>
                  <div className='flex justify-between text-muted-foreground'><span>Subtotal</span><strong>{selectedOrder.subtotal}</strong></div>
                  <div className='flex justify-between text-muted-foreground'><span>Delivery fee</span><strong>{selectedOrder.fee}</strong></div>
                  <div className='flex justify-between border-t border-border pt-2 text-sm'><span>Total</span><strong>{selectedOrder.total}</strong></div>
                  <div className='flex justify-between text-muted-foreground'><span>Payment</span><strong>{selectedOrder.payment}</strong></div>
                </div>
              </div>
              <div className='border-t border-border p-4'>
                <Button className='w-full rounded-lg' variant='outline' onClick={() => window.print()}>
                  <Printer className='size-4' />
                  Print order
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
