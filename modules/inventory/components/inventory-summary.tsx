import { AlertTriangle, CircleCheck, CircleDollarSign, Package } from 'lucide-react';
import SummaryMetricCard from '@/components/admin/shared/summary-metric-card';

export default function InventorySummary({ itemCount, lowCount, stockValue }: { itemCount: number; lowCount: number; stockValue: number }) {
  const metrics = [
    { label: 'Tracked items', value: itemCount, icon: Package },
    { label: 'Low stock', value: lowCount, icon: AlertTriangle },
    { label: 'Healthy stock', value: itemCount - lowCount, icon: CircleCheck },
    { label: 'Stock value', value: `₱${stockValue.toLocaleString('en-PH', { maximumFractionDigits: 2 })}`, icon: CircleDollarSign },
  ];
  return <div className='mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
    {metrics.map((metric) => <SummaryMetricCard key={metric.label} {...metric} />)}
  </div>;
}
