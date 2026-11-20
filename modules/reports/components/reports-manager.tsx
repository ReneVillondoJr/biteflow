'use client';

import { ChartNoAxesCombined, CircleDollarSign, Download, ShoppingBag, TicketCheck, WalletCards } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import SummaryMetricCard from '@/components/admin/shared/summary-metric-card';
import { parseOrderAmount } from '../data/reports';
import { reportPeriods } from '../schema';
import type { useReports } from '../hooks/use-reports';

type Props = { reports: ReturnType<typeof useReports> };
const formatMoney = (amount: number) => `₱${amount.toLocaleString('en-PH', { maximumFractionDigits: 0 })}`;
const statusTone: Record<string, string> = {
  Completed: 'bg-[#e5eee5] text-[#41664e]',
  Cancelled: 'bg-[#f5e7e4] text-[#9b5045]',
  Preparing: 'bg-[#f3ebdc] text-[#8b6b35]',
  Ready: 'bg-[#edf0f2] text-[#5b6871]',
  New: 'bg-[#edf0f2] text-[#5b6871]',
  'On delivery': 'bg-[#edf0f2] text-[#5b6871]',
};

export default function ReportsManager({ reports }: Props) {
  const products = new Map<string, { quantity: number; value: number }>();
  reports.activeOrders.forEach((order) => order.items.forEach((item) => {
    const current = products.get(item.name) ?? { quantity: 0, value: 0 };
    current.quantity += item.quantity;
    current.value += item.quantity * parseOrderAmount(item.price);
    products.set(item.name, current);
  }));
  const topProducts = [...products.entries()].sort((a, b) => b[1].quantity - a[1].quantity).slice(0, 5);
  const maxQuantity = Math.max(1, ...topProducts.map(([, values]) => values.quantity));
  const paymentMix = ['GCash', 'Card', 'Cash'].map((method) => ({
    method,
    count: reports.activeOrders.filter((order) => order.payment === method).length,
  }));
  const maxPaymentCount = Math.max(1, ...paymentMix.map(({ count }) => count));

  return <div className='mx-auto w-full max-w-[1240px] py-3 md:py-4'>
    <div className='mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
      <div><span className='mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground'>Business insights</span><h1 className='text-[30px] font-semibold leading-tight tracking-[-0.04em] text-foreground md:text-[38px]'>Reports</h1><p className='mt-1.5 text-[13px] text-muted-foreground'>Review order value, best-selling menu items, and payment activity.</p></div>
      <div className='flex flex-col gap-2 sm:flex-row'>
        <label className='sr-only' htmlFor='report-period'>Report period</label>
        <select id='report-period' className='h-10 appearance-auto rounded-md border border-input bg-white px-3 text-sm text-foreground' value={reports.period} onChange={(event) => reports.setPeriod(event.target.value as typeof reports.period)}>
          {reportPeriods.map((period) => <option key={period} value={period}>{period}</option>)}
        </select>
        <Button variant='outline' className='h-10 rounded-md border-input bg-white px-3 text-xs shadow-none' onClick={reports.exportCsv}><Download className='size-4' />Export CSV</Button>
      </div>
    </div>
    <section className='mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4' aria-label='Report summary'>
      <SummaryMetricCard label='Orders placed' value={reports.orders.length.toLocaleString()} icon={ShoppingBag} />
      <SummaryMetricCard label='Order value' value={formatMoney(reports.orderValue)} icon={CircleDollarSign} />
      <SummaryMetricCard label='Completed orders' value={reports.completedCount.toLocaleString()} icon={TicketCheck} />
      <SummaryMetricCard label='Average order value' value={formatMoney(reports.averageOrderValue)} icon={WalletCards} />
    </section>
    <div className='mb-5 grid gap-4 lg:grid-cols-[1.35fr_1fr]'>
      <Card className='rounded-md border-border p-4 shadow-sm sm:p-5'>
        <div className='mb-5 flex items-start justify-between gap-3'><div><h2 className='text-base font-semibold'>Best-selling items</h2><p className='text-xs text-muted-foreground'>Units sold in {reports.period.toLowerCase()}</p></div><ChartNoAxesCombined className='size-5 text-muted-foreground' aria-hidden='true' /></div>
        {topProducts.length ? <div className='grid gap-4'>
          {topProducts.map(([name, values]) => <div key={name} className='grid gap-1.5'>
            <div className='flex items-center justify-between gap-3 text-xs'><span className='truncate font-medium'>{name}</span><span className='shrink-0 text-muted-foreground'>{values.quantity} sold</span></div>
            <div className='h-2 overflow-hidden rounded-full bg-muted'><div className='h-full rounded-full bg-primary' style={{ width: `${Math.max(4, values.quantity / maxQuantity * 100)}%` }} /></div>
          </div>)}
        </div> : <p className='py-8 text-center text-sm text-muted-foreground'>No item sales for this period.</p>}
      </Card>
      <Card className='rounded-md border-border p-4 shadow-sm sm:p-5'>
        <div className='mb-5'><h2 className='text-base font-semibold'>Payment methods</h2><p className='text-xs text-muted-foreground'>Non-cancelled orders by payment type</p></div>
        <div className='grid gap-5'>
          {paymentMix.map(({ method, count }) => <div key={method} className='grid gap-1.5'>
            <div className='flex justify-between text-xs'><span className='font-medium'>{method}</span><span className='text-muted-foreground'>{count} order{count === 1 ? '' : 's'}</span></div>
            <div className='h-2 overflow-hidden rounded-full bg-muted'><div className='h-full rounded-full bg-[#8b9b8d]' style={{ width: `${count ? Math.max(4, count / maxPaymentCount * 100) : 0}%` }} /></div>
          </div>)}
        </div>
      </Card>
    </div>
    <Card className='overflow-hidden rounded-md border-border bg-card p-4 shadow-sm sm:p-5'>
      <div className='mb-4'><h2 className='text-base font-semibold'>Order activity</h2><p className='text-xs text-muted-foreground'>{reports.orders.length} orders in {reports.period.toLowerCase()}</p></div>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader><TableRow><TableHead>Order</TableHead><TableHead>Customer</TableHead><TableHead>Type</TableHead><TableHead>Payment</TableHead><TableHead>Order value</TableHead><TableHead>Status</TableHead><TableHead>Placed</TableHead></TableRow></TableHeader>
          <TableBody>
            {reports.orders.map((order) => <TableRow key={order.id}>
              <TableCell className='text-xs font-semibold'>{order.id}</TableCell>
              <TableCell className='text-xs'>{order.customer}</TableCell>
              <TableCell className='text-xs'>{order.type}</TableCell>
              <TableCell className='text-xs'>{order.payment}</TableCell>
              <TableCell className='text-xs font-medium'>{formatMoney(parseOrderAmount(order.total))}</TableCell>
              <TableCell><span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${statusTone[order.status] ?? 'bg-muted text-muted-foreground'}`}>{order.status}</span></TableCell>
              <TableCell className='whitespace-nowrap text-[10px] text-muted-foreground'>{order.placedAt}</TableCell>
            </TableRow>)}
            {reports.orders.length === 0 ? <TableRow><TableCell colSpan={7} className='py-10 text-center text-xs text-muted-foreground'>No orders for this period.</TableCell></TableRow> : null}
          </TableBody>
        </Table>
      </div>
      <p className='mt-3 text-[11px] text-muted-foreground'>Order value and averages exclude cancelled orders. Figures are based on the order records available in this app.</p>
    </Card>
  </div>;
}
