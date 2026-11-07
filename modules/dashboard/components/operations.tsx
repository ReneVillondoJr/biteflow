import Link from 'next/link';
import { Bike, ChefHat, ShoppingBag } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Operations() {
  return (
    <section className='grid grid-cols-1 gap-2.5 sm:grid-cols-3' aria-label='Operations summary'>
      <Card size='sm' className='h-[52px] justify-center rounded-full border-border py-2 shadow-sm'>
        <Link className='flex items-center gap-2.5 px-2' href='/admin/kitchen'><span className='flex size-8 items-center justify-center rounded-full bg-amber-100 text-amber-700'><ChefHat className='size-4' aria-hidden='true' /></span><div className='grid leading-none'><strong className='text-base'>12</strong><small className='mt-1 text-[9px] text-muted-foreground'>Orders in kitchen</small></div></Link>
      </Card>
      <Card size='sm' className='h-[52px] justify-center rounded-full border-border py-2 shadow-sm'>
        <Link className='flex items-center gap-2.5 px-2' href='/admin/delivery'><span className='flex size-8 items-center justify-center rounded-full bg-sky-50 text-sky-700'><Bike className='size-4' aria-hidden='true' /></span><div className='grid leading-none'><strong className='text-base'>8</strong><small className='mt-1 text-[9px] text-muted-foreground'>Out for delivery</small></div></Link>
      </Card>
      <Card size='sm' className='h-[52px] justify-center rounded-full border-border py-2 shadow-sm'>
        <Link className='flex items-center gap-2.5 px-2' href='/admin/orders'><span className='flex size-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700'><ShoppingBag className='size-4' aria-hidden='true' /></span><div className='grid leading-none'><strong className='text-base'>24</strong><small className='mt-1 text-[9px] text-muted-foreground'>Orders this hour</small></div></Link>
      </Card>
    </section>
  );
}
