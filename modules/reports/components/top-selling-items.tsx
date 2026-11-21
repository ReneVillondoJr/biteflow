import { ChartNoAxesCombined } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { ReportPeriod } from '../schema';

type Product = [string, { quantity: number; value: number }];

export default function TopSellingItems({ products, period }: { products: Product[]; period: ReportPeriod }) {
  const maxQuantity = Math.max(1, ...products.map(([, values]) => values.quantity));

  return <Card className='rounded-md border-border p-4 shadow-sm sm:p-5'>
    <div className='mb-5 flex items-start justify-between gap-3'><div><h2 className='text-base font-semibold'>Best-selling items</h2><p className='text-xs text-muted-foreground'>Units sold in {period.toLowerCase()}</p></div><ChartNoAxesCombined className='size-5 text-muted-foreground' aria-hidden='true' /></div>
    {products.length ? <div className='grid gap-4'>
      {products.map(([name, values]) => <div key={name} className='grid gap-1.5'>
        <div className='flex items-center justify-between gap-3 text-xs'><span className='truncate font-medium'>{name}</span><span className='shrink-0 text-muted-foreground'>{values.quantity} sold</span></div>
        <div className='h-2 overflow-hidden rounded-full bg-muted'><div className='h-full rounded-full bg-primary' style={{ width: `${Math.max(4, values.quantity / maxQuantity * 100)}%` }} /></div>
      </div>)}
    </div> : <p className='py-8 text-center text-sm text-muted-foreground'>No item sales for this period.</p>}
  </Card>;
}
