import { ArrowUpRight } from 'lucide-react';
import { orderMetrics } from '../data/orders';
import { Card } from '@/components/ui/card';

export default function OrdersMetrics() {
  return (
    <section className='mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4' aria-label='Order overview'>
      {orderMetrics.map((metric) => {
        const Icon = metric.icon;
        const tone = 'bg-[#edf2ec] text-[#4f6858]';

        return (
          <Card key={metric.label} className='relative min-h-24 rounded-md border-border p-3.5 shadow-sm'>
            <div className='flex items-center gap-3'>
              <span className={`flex size-11 items-center justify-center rounded-md ${tone}`}>
                <Icon className='size-5' aria-hidden='true' />
              </span>
              <div>
                <span className='text-[10px] font-extrabold tracking-wide text-muted-foreground'>{metric.label}</span>
                <strong className='mt-1 block text-[22px] font-bold leading-none tracking-tight'>{metric.value}</strong>
              </div>
            </div>
            <span className='absolute bottom-3 right-4 flex items-center text-[10px] font-extrabold text-emerald-700'>
              <ArrowUpRight className='size-3' aria-hidden='true' />
              {metric.change}
            </span>
          </Card>
        );
      })}
    </section>
  );
}
