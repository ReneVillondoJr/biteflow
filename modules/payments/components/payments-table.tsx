'use client';

import { ChevronLeft, ChevronRight, CircleDashed, CreditCard, Eye, MoreHorizontal, Search, WalletCards, X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import OrderSelect from '@/modules/orders/components/order-select';
import { paymentSchema } from '../schema';
import type { PaymentMethod, PaymentStatus, PaymentTransaction } from '../types';

type Props = {
  payments: PaymentTransaction[];
  filteredCount: number;
  query: string;
  status: (typeof paymentSchema.statusOptions)[number];
  method: (typeof paymentSchema.methodOptions)[number];
  page: number;
  pageCount: number;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: (typeof paymentSchema.statusOptions)[number]) => void;
  onMethodChange: (value: (typeof paymentSchema.methodOptions)[number]) => void;
  onPageChange: (page: number) => void;
  onStatusUpdate: (id: string, status: PaymentStatus) => void;
  onClearFilters: () => void;
};

const statusStyles: Record<PaymentStatus, string> = {
  Paid: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Pending: 'border-amber-200 bg-amber-50 text-amber-700',
  Failed: 'border-red-200 bg-red-50 text-red-700',
  Refunded: 'border-slate-200 bg-slate-100 text-slate-700',
};
const methodIcons: Record<PaymentMethod, typeof CreditCard> = { Card: CreditCard, GCash: WalletCards, Cash: WalletCards };
const formatAmount = (amount: number) => `P ${amount.toLocaleString('en-PH')}`;

export default function PaymentsTable({ payments, filteredCount, query, status, method, page, pageCount, onQueryChange, onStatusChange, onMethodChange, onPageChange, onStatusUpdate, onClearFilters }: Props) {
  const [selected, setSelected] = useState<PaymentTransaction | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  function openPayment(payment: PaymentTransaction) { setSelected(payment); setSheetOpen(true); }

  return (
    <>
      <Card className='overflow-hidden rounded-md border-border shadow-sm'>
        <div className='flex flex-col gap-3 border-b border-border px-4 py-3 xl:flex-row xl:items-center xl:justify-between'>
          <div className='relative w-full xl:w-[320px]'><Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' aria-hidden='true' /><Input className='h-9 border-[#dde2dc] bg-white pl-9 shadow-none placeholder:text-[#9da59c] focus-visible:border-[#dde2dc] focus-visible:bg-white focus-visible:ring-0' value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder='Search transaction, order, customer' /></div>
          <div className='flex flex-wrap items-center gap-2'>
            <OrderSelect value={status} options={paymentSchema.statusOptions} onChange={onStatusChange} icon={CircleDashed} label='Filter by payment status' />
            <OrderSelect value={method} options={paymentSchema.methodOptions} onChange={onMethodChange} icon={WalletCards} label='Filter by payment method' className='min-w-36' />
            {(query || status !== 'All statuses' || method !== 'All methods') && <Button variant='ghost' size='sm' className='h-9 rounded-md px-2 text-[10px]' onClick={onClearFilters}><X className='size-3.5' />Clear</Button>}
          </div>
        </div>
        <div className='overflow-x-auto'>
          <Table className='min-w-[850px]'>
            <TableHeader><TableRow>
              <TableHead className='h-11 px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Transaction</TableHead>
              <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Order</TableHead>
              <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Customer</TableHead>
              <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Method</TableHead>
              <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Status</TableHead>
              <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Amount</TableHead>
              <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Date</TableHead>
              <TableHead className='w-12 px-2' />
            </TableRow></TableHeader>
            <TableBody>
              {payments.map((payment) => {
                const MethodIcon = methodIcons[payment.method];
                return <TableRow key={payment.id} className='cursor-pointer' onClick={() => openPayment(payment)}>
                  <TableCell className='h-[58px] px-4'><strong className='text-[12px] text-[#25382d]'>{payment.id}</strong></TableCell>
                  <TableCell className='px-4 text-[12px] font-semibold'>{payment.orderId}</TableCell>
                  <TableCell className='px-4'><strong className='block text-[12px] font-semibold'>{payment.customer}</strong><small className='text-[10px] text-muted-foreground'>{payment.email}</small></TableCell>
                  <TableCell className='px-4'><span className='inline-flex items-center gap-1.5 text-[12px]'><MethodIcon className='size-3.5 text-muted-foreground' aria-hidden='true' />{payment.method}</span></TableCell>
                  <TableCell className='px-4'><Badge className={`rounded-md border px-2 py-0.5 text-[9px] font-extrabold ${statusStyles[payment.status]}`}>{payment.status}</Badge></TableCell>
                  <TableCell className='px-4 text-[12px] font-extrabold'>{formatAmount(payment.amount)}</TableCell>
                  <TableCell className='px-4 text-[11px] text-muted-foreground'>{payment.placedAt}</TableCell>
                  <TableCell className='px-2' onClick={(event) => event.stopPropagation()}><DropdownMenu><DropdownMenuTrigger className='flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted' aria-label={`Actions for ${payment.id}`}><MoreHorizontal className='size-4' /></DropdownMenuTrigger><DropdownMenuContent align='end' className='w-40 rounded-md border border-[#dfe4dc] bg-white p-1 shadow-md'><DropdownMenuItem onClick={() => openPayment(payment)}><Eye className='size-4' />View details</DropdownMenuItem>{payment.status === 'Paid' && <DropdownMenuItem onClick={() => onStatusUpdate(payment.id, 'Refunded')}><CircleDashed className='size-4' />Mark refunded</DropdownMenuItem>}{paymentSchema.statuses.filter((nextStatus) => nextStatus !== 'Refunded').map((nextStatus) => <DropdownMenuItem key={nextStatus} disabled={payment.status === nextStatus} onClick={() => onStatusUpdate(payment.id, nextStatus)}>Set {nextStatus}</DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu></TableCell>
                </TableRow>;
              })}
              {!payments.length && <TableRow><TableCell colSpan={8} className='h-40 text-center text-muted-foreground'>No payments match the current filters.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
        <div className='flex h-12 items-center justify-between border-t border-border px-4'><span className='text-[11px] text-muted-foreground'>Showing {payments.length} of {filteredCount} transactions</span><div className='flex items-center gap-1'><Button variant='outline' size='icon-sm' disabled={page === 1} onClick={() => onPageChange(page - 1)} aria-label='Previous page'><ChevronLeft /></Button><span className='min-w-16 text-center text-[11px] font-semibold'>{page} / {pageCount}</span><Button variant='outline' size='icon-sm' disabled={page === pageCount} onClick={() => onPageChange(page + 1)} aria-label='Next page'><ChevronRight /></Button></div></div>
      </Card>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}><SheetContent className='w-full max-w-[440px] p-0 sm:max-w-[440px]'>{selected && <>
        <SheetHeader className='border-b border-border px-5 py-4 pr-14 text-left'><span className='text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Payment details</span><SheetTitle>{selected.id}</SheetTitle><SheetDescription>{selected.orderId} · {selected.placedAt}</SheetDescription></SheetHeader>
        <div className='grid flex-1 content-start gap-5 overflow-y-auto px-5 py-5'>
          <div className='flex items-center justify-between rounded-md border border-[#edf0ea] bg-[#fbfcfa] p-3'><div><span className='block text-[10px] font-bold text-muted-foreground'>Payment status</span><Badge className={`mt-1 rounded-md border px-2 py-0.5 text-[9px] font-extrabold ${statusStyles[selected.status]}`}>{selected.status}</Badge></div><OrderSelect value={selected.status} options={paymentSchema.statuses} onChange={(nextStatus) => { onStatusUpdate(selected.id, nextStatus); setSelected({ ...selected, status: nextStatus }); }} icon={CircleDashed} label='Change payment status' className='w-36' /></div>
          <div className='grid gap-2'><h3 className='text-[11px] font-black uppercase tracking-wide text-muted-foreground'>Customer</h3><strong className='text-sm'>{selected.customer}</strong><span className='text-[12px] text-muted-foreground'>{selected.email}</span></div>
          <div className='grid gap-3 rounded-md border border-border p-4 text-[12px]'><div className='flex justify-between text-muted-foreground'><span>Order</span><strong className='text-foreground'>{selected.orderId}</strong></div><div className='flex justify-between text-muted-foreground'><span>Payment method</span><strong className='text-foreground'>{selected.method}</strong></div><div className='flex justify-between border-t border-border pt-3 text-sm'><span>Amount</span><strong>{formatAmount(selected.amount)}</strong></div></div>
          <p className='text-xs leading-5 text-muted-foreground'>Sample transaction record for the admin interface. Payment processing and refunds are not connected to a live provider.</p>
        </div>
      </>}</SheetContent></Sheet>
    </>
  );
}
