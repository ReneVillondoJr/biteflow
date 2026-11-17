'use client';

import { CalendarDays, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OrderSelect from '@/modules/orders/components/order-select';
import { paymentSchema } from '../schema';

type Props = {
  dateRange: (typeof paymentSchema.dateOptions)[number];
  onDateChange: (value: (typeof paymentSchema.dateOptions)[number]) => void;
  onExport: () => void;
  onRefresh: () => void;
};

export default function PaymentsHeading({ dateRange, onDateChange, onExport, onRefresh }: Props) {
  return (
    <div className='mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end'>
      <div>
        <span className='mb-1 block text-[10px] font-black uppercase tracking-[0.16em] text-[#7d887d]'>Transaction management</span>
        <h1 className='text-[30px] font-bold leading-tight tracking-[-0.03em] text-[#20372c] md:text-[38px]'>Payments</h1>
        <p className='mt-1.5 text-[13px] text-[#7d887d]'>Review transactions, payment status, refunds, and settlements.</p>
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <Button variant='outline' className='h-10 rounded-md border-[#dde2dc] bg-white px-3 text-[11px] shadow-none' onClick={onExport}><Download className='size-4' aria-hidden='true' />Export CSV</Button>
        <Button variant='outline' size='icon' className='h-10 w-10 rounded-md border-[#dde2dc] bg-white shadow-none' onClick={onRefresh} aria-label='Refresh payments'><RefreshCw className='size-4' /></Button>
        <OrderSelect value={dateRange} options={paymentSchema.dateOptions} onChange={onDateChange} icon={CalendarDays} label='Select payment date range' className='h-10' />
      </div>
    </div>
  );
}
