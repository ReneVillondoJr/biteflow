import { CircleDollarSign, Clock3, RotateCcw, WalletCards } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { PaymentTransaction } from '../types';

const formatAmount = (amount: number) => `P ${amount.toLocaleString('en-PH')}`;

export default function PaymentsMetrics({ payments }: { payments: PaymentTransaction[] }) {
  const paid = payments.filter((payment) => payment.status === 'Paid');
  const metrics = [
    { label: 'Transactions', value: payments.length.toLocaleString(), icon: WalletCards },
    { label: 'Collected', value: formatAmount(paid.reduce((sum, payment) => sum + payment.amount, 0)), icon: CircleDollarSign },
    { label: 'Pending', value: payments.filter((payment) => payment.status === 'Pending').length.toLocaleString(), icon: Clock3 },
    { label: 'Refunded', value: formatAmount(payments.filter((payment) => payment.status === 'Refunded').reduce((sum, payment) => sum + payment.amount, 0)), icon: RotateCcw },
  ];

  return (
    <section className='mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4' aria-label='Payment overview'>
      {metrics.map(({ label, value, icon: Icon }) => (
        <Card key={label} className='min-h-24 rounded-md border-border p-3.5 shadow-sm'>
          <div className='flex items-center gap-3'><span className='flex size-11 items-center justify-center rounded-md bg-[#edf2ec] text-[#4f6858]'><Icon className='size-5' aria-hidden='true' /></span><div><span className='text-[10px] font-extrabold tracking-wide text-muted-foreground'>{label}</span><strong className='mt-1 block text-[22px] font-bold leading-none tracking-tight'>{value}</strong></div></div>
        </Card>
      ))}
    </section>
  );
}
