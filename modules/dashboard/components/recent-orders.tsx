'use client';

import { ArrowUpRight, Clock3 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { orders } from '../data/dashboard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function RecentOrders() {
  const [status, setStatus] = useState<'All' | 'Preparing' | 'Ready' | 'On delivery'>('All');
  const filteredOrders = status === 'All' ? orders : orders.filter((order) => order.status === status);
  const statusStyles = {
    Preparing: 'border-amber-200 bg-amber-50 text-amber-700',
    Ready: 'border-sky-200 bg-sky-50 text-sky-700',
    'On delivery': 'border-violet-200 bg-violet-50 text-violet-700',
  };

  return (
    <Card className='min-w-0 overflow-hidden rounded-xl border-border shadow-sm'>
      <div className='flex min-h-14 items-center justify-between border-b border-border px-4'>
        <div className='grid'><span className='text-[10px] font-extrabold uppercase tracking-wide text-muted-foreground'>Recent orders</span><strong className='mt-1 text-sm'>Live activity</strong></div>
        <Link className='flex items-center gap-1 text-[10px] font-extrabold text-primary' href='/admin/orders'>View all <ArrowUpRight className='size-3' aria-hidden='true' /></Link>
      </div>
      <div className='flex gap-1 border-b border-border px-4 py-2.5' aria-label='Filter recent orders'>
        {(['All', 'Preparing', 'Ready', 'On delivery'] as const).map((option) => (
          <Button
            type='button'
            key={option}
            onClick={() => setStatus(option)}
            variant={status === option ? 'default' : 'ghost'}
            size='sm'
            className='h-7 rounded-md px-2.5 text-[10px]'
          >
            {option}
          </Button>
        ))}
      </div>
      <div className='overflow-x-auto'>
        <Table className='min-w-[620px]'>
          <TableHeader>
            <TableRow>
              <TableHead className='h-11 px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Order</TableHead>
              <TableHead className='h-11 px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Customer</TableHead>
              <TableHead className='h-11 px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Total</TableHead>
              <TableHead className='h-11 px-4 text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Status</TableHead>
              <TableHead className='h-11 px-4 text-right text-[10px] font-black uppercase tracking-wide text-muted-foreground'>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className='h-[58px] px-4'>
                  <strong className='block text-[12px] font-extrabold text-[#25382d]'>{order.id}</strong>
                  <small className='mt-0.5 block text-[10px] text-muted-foreground'>{order.items}</small>
                </TableCell>
                <TableCell className='px-4 text-[12px] font-medium'>{order.customer}</TableCell>
                <TableCell className='px-4 text-[12px] font-extrabold'>{order.total}</TableCell>
                <TableCell className='px-4'>
                  <Badge className={`rounded-md border px-2 py-0.5 text-[9px] font-extrabold ${statusStyles[order.status]}`} variant='secondary'>{order.status}</Badge>
                </TableCell>
                <TableCell className='px-4 text-right'>
                  <span className='inline-flex items-center gap-1.5 text-[11px] text-muted-foreground'><Clock3 className='size-3' aria-hidden='true' />{order.time}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
