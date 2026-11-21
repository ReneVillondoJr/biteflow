import { Card } from '@/components/ui/card';

type PaymentMethod = { method: string; count: number };

export default function PaymentMethods({ methods }: { methods: PaymentMethod[] }) {
  const maxCount = Math.max(1, ...methods.map(({ count }) => count));

  return <Card className='rounded-md border-border p-4 shadow-sm sm:p-5'>
    <div className='mb-5'><h2 className='text-base font-semibold'>Payment methods</h2><p className='text-xs text-muted-foreground'>Non-cancelled orders by payment type</p></div>
    <div className='grid gap-5'>
      {methods.map(({ method, count }) => <div key={method} className='grid gap-1.5'>
        <div className='flex justify-between text-xs'><span className='font-medium'>{method}</span><span className='text-muted-foreground'>{count} order{count === 1 ? '' : 's'}</span></div>
        <div className='h-2 overflow-hidden rounded-full bg-muted'><div className='h-full rounded-full bg-[#8b9b8d]' style={{ width: `${count ? Math.max(4, count / maxCount * 100) : 0}%` }} /></div>
      </div>)}
    </div>
  </Card>;
}
