import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

type SummaryMetricCardProps = {
  label: string;
  value: ReactNode;
  icon: LucideIcon;
  trend?: string;
};

export default function SummaryMetricCard({ label, value, icon: Icon, trend }: SummaryMetricCardProps) {
  return (
    <Card className='relative min-h-24 rounded-md border-border p-3.5 shadow-sm'>
      <div className='flex items-center gap-3'>
        <span className='flex size-11 shrink-0 items-center justify-center rounded-md bg-[#edf2ec] text-[#4f6858]'>
          <Icon className='size-5' aria-hidden='true' />
        </span>
        <div className='min-w-0'>
          <span className='block text-[10px] font-extrabold tracking-wide text-muted-foreground'>{label}</span>
          <strong className='mt-1 block truncate text-[22px] font-bold leading-none tracking-tight text-foreground'>{value}</strong>
        </div>
      </div>
      {trend ? <span className='absolute bottom-3 right-4 flex items-center text-[10px] font-extrabold text-emerald-700'><ArrowUpRight className='size-3' aria-hidden='true' />{trend}</span> : null}
    </Card>
  );
}
