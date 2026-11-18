import { CircleDollarSign, Clock3, RotateCcw, WalletCards } from 'lucide-react';
import SummaryMetricCard from '@/components/admin/shared/summary-metric-card';
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
    <section className='mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4' aria-label='Payment overview'>
      {metrics.map(({ label, value, icon: Icon }) => (
        <SummaryMetricCard key={label} label={label} value={value} icon={Icon} />
      ))}
    </section>
  );
}
