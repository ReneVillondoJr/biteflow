'use client';

import ReportActivityTable from './components/report-activity-table';
import ReportHeading from './components/report-heading';
import PaymentMethods from './components/payment-methods';
import ReportSummary from './components/report-summary';
import TopSellingItems from './components/top-selling-items';
import { useReports } from './hooks/use-reports';

export default function ReportsModule() {
  const reports = useReports();
  return <div className='mx-auto w-full max-w-[1240px] py-3 md:py-4'>
    <ReportHeading period={reports.period} onPeriodChange={reports.setPeriod} onExport={reports.exportCsv} />
    <ReportSummary orderCount={reports.orders.length} orderValue={reports.orderValue} completedCount={reports.completedCount} averageOrderValue={reports.averageOrderValue} />
    <div className='mb-5 grid gap-4 lg:grid-cols-[1.35fr_1fr]'>
      <TopSellingItems products={reports.topProducts} period={reports.period} />
      <PaymentMethods methods={reports.paymentMix} />
    </div>
    <ReportActivityTable orders={reports.orders} period={reports.period} />
  </div>;
}
