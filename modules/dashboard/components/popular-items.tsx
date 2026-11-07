'use client';

import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { popularItems } from '../data/dashboard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function PopularItems() {
  const router = useRouter();

  return (
    <Card className='rounded-xl border-border shadow-sm'>
      <div className='flex min-h-14 items-center justify-between border-b border-border px-4'>
        <div className='grid'><span className='text-[10px] font-extrabold uppercase tracking-wide text-muted-foreground'>Popular items</span><strong className='mt-1 text-sm'>Top performers</strong></div>
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label='Popular item options'
            render={<Button variant='ghost' size='icon-sm' />}
          >
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => router.push('/admin/menu')}>Manage menu</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/admin/inventory')}>Check inventory</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='divide-y divide-border px-4'>
        {popularItems.map((item, index) => (
          <div className='grid grid-cols-[36px_1fr_auto_auto] items-center gap-3 py-3' key={item.name}>
            <span className='flex size-8 items-center justify-center rounded-full text-xs font-black text-white' style={{ backgroundColor: item.color }}>{index + 1}</span>
            <div className='grid'><strong className='text-xs'>{item.name}</strong><small className='text-[10px] text-muted-foreground'>{item.category}</small></div>
            <div className='grid text-right'><strong className='text-xs'>{item.orders}</strong><small className='text-[9px] text-muted-foreground'>orders</small></div>
            <span className='text-xs font-extrabold'>{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
