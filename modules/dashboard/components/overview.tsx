'use client';

import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { revenuePoints } from '../data/dashboard';
import { dashboardSchema } from '../schema';

export default function Overview() {
  const router = useRouter();

  return (
    <section className='mb-4 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,2fr)_240px]'>
      <Card className='rounded-xl border-border shadow-sm'>
        <div className='flex min-h-14 items-center justify-between border-b border-border px-4'>
          <div className='grid'><span className='text-[10px] font-extrabold uppercase tracking-wide text-muted-foreground'>Revenue overview</span><strong className='mt-1 font-heading text-xl font-normal'>P 284,620</strong></div>
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label='Revenue options'
              render={<Button variant='ghost' size='icon-sm' />}
            >
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => router.push('/admin/reports')}>Open reports</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/admin/payments')}>View payments</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='relative grid h-[290px] grid-cols-[46px_1fr] gap-2 px-4 pb-4 pt-6' aria-label='Revenue chart for the last seven days'>
          <div className='flex flex-col justify-between pb-7 text-[9px] text-muted-foreground' aria-hidden='true'>
            <span>P 60k</span><span>P 40k</span><span>P 20k</span><span>P 0</span>
          </div>
          <div className='relative min-h-0'>
            <div className='absolute inset-x-0 top-0 flex h-[230px] flex-col justify-between py-1' aria-hidden='true'><i className='border-t border-dashed border-border/70' /><i className='border-t border-dashed border-border/70' /><i className='border-t border-dashed border-border/70' /><i className='border-t border-dashed border-border/70' /></div>
            <svg className='h-[230px] w-full' viewBox='0 0 700 230' role='img' aria-label='Weekly revenue trend' preserveAspectRatio='none'>
              <defs>
                <linearGradient id='revenueFill' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='#254b3a' stopOpacity='.18' />
                  <stop offset='100%' stopColor='#254b3a' stopOpacity='.01' />
                </linearGradient>
              </defs>
              <polygon points='0,174 116,148 233,158 350,106 466,120 583,76 700,88 700,230 0,230' fill='url(#revenueFill)' />
              <polyline points='0,174 116,148 233,158 350,106 466,120 583,76 700,88' fill='none' stroke='#254b3a' strokeWidth='4' strokeLinecap='round' strokeLinejoin='round' vectorEffect='non-scaling-stroke' />
              {[0, 116, 233, 350, 466, 583, 700].map((x, index) => (
                <circle key={x} cx={x} cy={[174, 148, 158, 106, 120, 76, 88][index]} r='5' fill='#fffefa' stroke='#254b3a' strokeWidth='3' vectorEffect='non-scaling-stroke' />
              ))}
            </svg>
            <div className='absolute inset-x-0 bottom-0 flex justify-between text-[9px] text-muted-foreground'>
              {revenuePoints.map((point) => <span key={point.day}>{point.day}</span>)}
            </div>
          </div>
        </div>
      </Card>

      <Card className='rounded-xl border-border shadow-sm'>
        <div className='flex min-h-16 items-center justify-between border-b border-border px-4'>
          <div><span className='text-[10px] font-extrabold uppercase tracking-wide text-muted-foreground'>Orders status</span></div>
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label='Order status options'
              render={<Button variant='ghost' size='icon-sm' />}
            >
              <MoreHorizontal />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => router.push('/admin/orders')}>View all orders</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/admin/kitchen')}>Open kitchen</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex justify-center px-4 py-5'>
          <div className='grid size-36 place-items-center rounded-full bg-[conic-gradient(#254b3a_0_72%,#dfb44a_72%_88%,#7ba7c7_88%_100%)]' role='img' aria-label={`1,842 orders: ${dashboardSchema.completionRate} percent completed`}>
            <div className='grid size-[108px] place-content-center rounded-full bg-card text-center shadow-inner'><strong className='font-heading text-2xl font-normal'>{dashboardSchema.completionRate}%</strong><span className='text-[9px] text-muted-foreground'>Completed</span></div>
          </div>
        </div>
        <div className='grid gap-2 px-4 pb-4'>
          <div className='flex justify-between text-xs'><span className='flex items-center gap-2 text-muted-foreground'><i className='size-2 rounded-full bg-emerald-700' />Completed</span><strong>{dashboardSchema.statusCounts.completed.toLocaleString('en-US')}</strong></div>
          <div className='flex justify-between text-xs'><span className='flex items-center gap-2 text-muted-foreground'><i className='size-2 rounded-full bg-amber-500' />Preparing</span><strong>{dashboardSchema.statusCounts.preparing}</strong></div>
          <div className='flex justify-between text-xs'><span className='flex items-center gap-2 text-muted-foreground'><i className='size-2 rounded-full bg-sky-500' />On delivery</span><strong>{dashboardSchema.statusCounts.onDelivery}</strong></div>
        </div>
      </Card>
    </section>
  );
}
