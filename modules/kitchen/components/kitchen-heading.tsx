'use client';

import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function KitchenHeading({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className='mb-4 flex items-end justify-between gap-3'>
      <div>
        <span className='mb-1 block text-[10px] font-black uppercase tracking-[0.16em] text-[#7d887d]'>Live operations</span>
        <h1 className='text-[30px] font-bold leading-tight tracking-[-0.03em] text-[#20372c] md:text-[38px]'>Kitchen display</h1>
        <p className='mt-1.5 text-[13px] text-[#7d887d]'>Monitor and move active tickets through the kitchen.</p>
      </div>
      <Button variant='outline' size='sm' className='h-10 rounded-md border-[#dfe4dc] bg-white px-3 text-[11px] shadow-none' onClick={onRefresh}>
        <RefreshCw className='size-3.5' />
        Refresh
      </Button>
    </div>
  );
}
