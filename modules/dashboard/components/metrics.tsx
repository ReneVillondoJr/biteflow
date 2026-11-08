import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { metrics } from '../data/dashboard';
import { Card } from '@/components/ui/card';

export default function Metrics() {
  return (
    <section className='mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4' aria-label='Business overview'>
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Link href={metric.href} key={metric.label}>
          <Card className='relative min-h-24 grid grid-cols-[44px_1fr] items-center gap-3 rounded-md border-border p-3.5 shadow-sm transition-transform hover:-translate-y-0.5'>
            <div className={`flex size-11 items-center justify-center rounded-md ${metric.tone === 'green' ? 'bg-emerald-50 text-emerald-700' : metric.tone === 'amber' ? 'bg-amber-100 text-amber-700' : metric.tone === 'blue' ? 'bg-sky-50 text-sky-700' : 'bg-rose-50 text-rose-700'}`}>
              <Icon aria-hidden='true' />
            </div>
            <div className='grid min-w-0'>
              <span className='text-[10px] font-extrabold tracking-wide text-muted-foreground'>{metric.label}</span>
              <strong className='mt-1 font-heading text-2xl font-normal tracking-tight'>{metric.value}</strong>
            </div>
            <div className='absolute bottom-3 right-4 grid justify-items-end'>
              <span className='flex items-center text-[10px] font-extrabold text-emerald-700'><ArrowUpRight className='size-3' aria-hidden='true' />{metric.change}</span>
              <small className='hidden text-[9px] text-muted-foreground sm:block'>{metric.detail}</small>
            </div>
          </Card>
          </Link>
        );
      })}
    </section>
  );
}
