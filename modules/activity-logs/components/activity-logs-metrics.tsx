import { AlertTriangle, CheckCircle2, ClipboardList, ShieldAlert } from 'lucide-react';
import SummaryMetricCard from '@/components/admin/shared/summary-metric-card';

type Props = { total: number; success: number; warnings: number; failed: number };

export default function ActivityLogsMetrics({ total, success, warnings, failed }: Props) {
  return (
    <div className='mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'>
      <SummaryMetricCard label='Events in view' value={total} icon={ClipboardList} />
      <SummaryMetricCard label='Successful events' value={success} icon={CheckCircle2} />
      <SummaryMetricCard label='Warnings' value={warnings} icon={AlertTriangle} />
      <SummaryMetricCard label='Failed events' value={failed} icon={ShieldAlert} />
    </div>
  );
}
