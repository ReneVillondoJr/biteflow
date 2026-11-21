import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { reportPeriods } from '../schema';
import type { ReportPeriod } from '../schema';

type Props = {
  period: ReportPeriod;
  onPeriodChange: (period: ReportPeriod) => void;
  onExport: () => void;
};

export default function ReportHeading({ period, onPeriodChange, onExport }: Props) {
  return <div className='mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
    <div><span className='mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground'>Business insights</span><h1 className='text-[30px] font-semibold leading-tight tracking-[-0.04em] text-foreground md:text-[38px]'>Reports</h1><p className='mt-1.5 text-[13px] text-muted-foreground'>Review order value, best-selling menu items, and payment activity.</p></div>
    <div className='flex flex-col gap-2 sm:flex-row'>
      <label className='sr-only' htmlFor='report-period'>Report period</label>
      <select id='report-period' className='h-10 appearance-auto rounded-md border border-input bg-white px-3 text-sm text-foreground' value={period} onChange={(event) => onPeriodChange(event.target.value as ReportPeriod)}>
        {reportPeriods.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      <Button variant='outline' className='h-10 rounded-md border-input bg-white px-3 text-xs shadow-none' onClick={onExport}><Download className='size-4' />Export CSV</Button>
    </div>
  </div>;
}
