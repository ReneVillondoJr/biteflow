import { CircleDollarSign, ShoppingBag, TicketCheck, WalletCards } from 'lucide-react';
import SummaryMetricCard from '@/components/admin/shared/summary-metric-card';

type Props = {
  orderCount: number;
  orderValue: number;
  completedCount: number;
  averageOrderValue: number;
};

const formatMoney = (amount: number) => `₱${amount.toLocaleString('en-PH', { maximumFractionDigits: 0 })}`;

export default function ReportSummary({ orderCount, orderValue, completedCount, averageOrderValue }: Props) {
  return <section className='mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4' aria-label='Report summary'>
    <SummaryMetricCard label='Orders placed' value={orderCount.toLocaleString()} icon={ShoppingBag} />
    <SummaryMetricCard label='Order value' value={formatMoney(orderValue)} icon={CircleDollarSign} />
    <SummaryMetricCard label='Completed orders' value={completedCount.toLocaleString()} icon={TicketCheck} />
    <SummaryMetricCard label='Average order value' value={formatMoney(averageOrderValue)} icon={WalletCards} />
  </section>;
}
