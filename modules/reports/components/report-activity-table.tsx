import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { parseOrderAmount } from '../data/reports';
import type { ReportPeriod } from '../schema';
import type { CustomerOrder } from '@/modules/orders/types/orders';

const formatMoney = (amount: number) => `₱${amount.toLocaleString('en-PH', { maximumFractionDigits: 0 })}`;
const statusTone: Record<string, string> = {
  Completed: 'bg-[#e5eee5] text-[#41664e]',
  Cancelled: 'bg-[#f5e7e4] text-[#9b5045]',
  Preparing: 'bg-[#f3ebdc] text-[#8b6b35]',
  Ready: 'bg-[#edf0f2] text-[#5b6871]',
  New: 'bg-[#edf0f2] text-[#5b6871]',
  'On delivery': 'bg-[#edf0f2] text-[#5b6871]',
};

export default function ReportActivityTable({ orders, period }: { orders: CustomerOrder[]; period: ReportPeriod }) {
  return <Card className='overflow-hidden rounded-md border-border bg-card p-4 shadow-sm sm:p-5'>
    <div className='mb-4'><h2 className='text-base font-semibold'>Order activity</h2><p className='text-xs text-muted-foreground'>{orders.length} orders in {period.toLowerCase()}</p></div>
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader><TableRow><TableHead>Order</TableHead><TableHead>Customer</TableHead><TableHead>Type</TableHead><TableHead>Payment</TableHead><TableHead>Order value</TableHead><TableHead>Status</TableHead><TableHead>Placed</TableHead></TableRow></TableHeader>
        <TableBody>
          {orders.slice(0, 10).map((order) => <TableRow key={order.id}>
            <TableCell className='text-xs font-semibold'>{order.id}</TableCell>
            <TableCell className='text-xs'>{order.customer}</TableCell>
            <TableCell className='text-xs'>{order.type}</TableCell>
            <TableCell className='text-xs'>{order.payment}</TableCell>
            <TableCell className='text-xs font-medium'>{formatMoney(parseOrderAmount(order.total))}</TableCell>
            <TableCell><span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${statusTone[order.status] ?? 'bg-muted text-muted-foreground'}`}>{order.status}</span></TableCell>
            <TableCell className='whitespace-nowrap text-[10px] text-muted-foreground'>{order.placedAt}</TableCell>
          </TableRow>)}
          {orders.length === 0 ? <TableRow><TableCell colSpan={7} className='py-10 text-center text-xs text-muted-foreground'>No orders for this period.</TableCell></TableRow> : null}
        </TableBody>
      </Table>
    </div>
    <p className='mt-3 text-[11px] text-muted-foreground'>Order value and averages exclude cancelled orders. Figures are based on the order records available in this app.</p>
  </Card>;
}
