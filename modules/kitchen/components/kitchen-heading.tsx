'use client';

import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function KitchenHeading({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className='mb-5 flex items-center justify-between gap-4'>
      <div>
        <div className='mb-1.5 flex items-center gap-2'>
          <span className='size-1.5 rounded-full bg-[#4f8a61]' />
          <span className='text-[10px] font-bold uppercase tracking-[0.16em] text-[#788278]'>Kitchen operations</span>
        </div>
        <h1 className='text-[28px] font-bold leading-tight tracking-[-0.035em] text-[#20372c] md:text-[34px]'>Kitchen display</h1>
        <p className='mt-1 text-[12px] text-[#7d887d]'>Active orders, organized by preparation status.</p>
      </div>
      <Button variant='outline' size='sm' className='h-9 rounded-md border-[#dfe4dc] bg-white px-3 text-[11px] font-semibold text-[#526057] shadow-none hover:bg-[#f8faf7]' onClick={onRefresh}>
        <RefreshCw className='size-3.5 text-[#7b887c]' />
        Refresh board
      </Button>
    </div>
  );
}
