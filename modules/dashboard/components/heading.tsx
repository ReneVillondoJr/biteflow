'use client';

import { CalendarDays } from 'lucide-react';
import { useDateRange } from '../hooks/use-date-range';
import { dashboardSchema } from '../schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Heading() {
  const dateRange = useDateRange(dashboardSchema.revenuePeriods);

  return (
    <div className='mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end'>
      <div>
        <span className='mb-1 block text-[10px] font-black uppercase tracking-[0.16em] text-[#7d887d]'>Thursday, November 6</span>
        <h1 className='text-[30px] font-bold leading-tight tracking-[-0.03em] text-[#20372c] md:text-[38px]'>Good morning, Admin</h1>
        <p className='mt-1.5 text-[13px] text-[#7d887d]'>Here is what is happening with BiteFlow today.</p>
      </div>

      <Select value={dateRange.selected} onValueChange={(value) => dateRange.select(String(value))}>
        <SelectTrigger className='h-11 rounded-xl border-border bg-card px-3 shadow-sm'>
          <CalendarDays aria-hidden='true' />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {dashboardSchema.revenuePeriods.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
