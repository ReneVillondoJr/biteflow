'use client';

import { CalendarDays, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { orderSchema } from '../schema';
import OrderSelect from './order-select';

type OrdersHeadingProps = {
  onExport: () => void;
  dateRange: (typeof orderSchema.dateOptions)[number];
  onDateChange: (value: (typeof orderSchema.dateOptions)[number]) => void;
  onRefresh: () => void;
};

export default function OrdersHeading({ onExport, dateRange, onDateChange, onRefresh }: OrdersHeadingProps) {
  return (
    <div className='mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end'>
      <div>
        <span className='mb-1 block text-[10px] font-black uppercase tracking-[0.16em] text-[#7d887d]'>Order management</span>
        <h1 className='text-[30px] font-bold leading-tight tracking-[-0.03em] text-[#20372c] md:text-[38px]'>Orders</h1>
        <p className='mt-1.5 text-[13px] text-[#7d887d]'>Review, update, and fulfill customer orders.</p>
      </div>
      <div className='flex items-center gap-2'>
        <Button variant='outline' className='h-10 rounded-md border-[#dde2dc] bg-white px-3 text-[11px] shadow-none' onClick={onExport}>
          <Download className='size-4' aria-hidden='true' />
          Export CSV
        </Button>
        <Button variant='outline' size='icon' className='h-10 w-10 rounded-md border-[#dde2dc] bg-white shadow-none' onClick={onRefresh} aria-label='Refresh orders'>
          <RefreshCw className='size-4' />
        </Button>
        <OrderSelect
          value={dateRange}
          options={orderSchema.dateOptions}
          onChange={onDateChange}
          icon={CalendarDays}
          label='Select order date range'
          className='h-10'
        />
      </div>
    </div>
  );
}
