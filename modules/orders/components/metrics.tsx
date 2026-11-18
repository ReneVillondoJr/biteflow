import { orderMetrics } from '../data/orders';
import SummaryMetricCard from '@/components/admin/shared/summary-metric-card';

export default function OrdersMetrics() {
  return (
    <section className='mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4' aria-label='Order overview'>
      {orderMetrics.map((metric) => (
        <SummaryMetricCard key={metric.label} label={metric.label} value={metric.value} icon={metric.icon} trend={metric.change} />
      ))}
    </section>
  );
}
