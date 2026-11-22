'use client';

import { Activity, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = { onExport: () => void; onRefresh: () => void };

export default function ActivityLogsHeading({ onExport, onRefresh }: Props) {
  return (
    <div className='mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end'>
      <div>
        <span className='mb-1 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#7d887d]'><Activity className='size-3.5' aria-hidden='true' />Admin workspace</span>
        <h1 className='text-[30px] font-bold leading-tight tracking-[-0.03em] text-[#20372c] md:text-[38px]'>Activity Logs</h1>
        <p className='mt-1.5 text-[13px] text-[#7d887d]'>Review administrator actions and operational events.</p>
      </div>
      <div className='flex items-center gap-2'>
        <Button variant='outline' className='h-10 rounded-md border-[#dde2dc] bg-white px-3 text-[11px] shadow-none' onClick={onExport}><Download className='size-4' aria-hidden='true' />Export CSV</Button>
        <Button variant='outline' size='icon' className='h-10 w-10 rounded-md border-[#dde2dc] bg-white shadow-none' onClick={onRefresh} aria-label='Refresh activity logs'><RefreshCw className='size-4' aria-hidden='true' /></Button>
      </div>
    </div>
  );
}
