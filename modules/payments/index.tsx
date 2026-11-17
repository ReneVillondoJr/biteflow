'use client';

import PaymentsHeading from './components/payments-heading';
import PaymentsMetrics from './components/payments-metrics';
import PaymentsTable from './components/payments-table';
import { usePayments } from './hooks/use-payments';

export default function PaymentsModule() {
  const payments = usePayments();

  return (
    <div className='mx-auto w-full max-w-[1240px] py-3 md:py-4'>
      <PaymentsHeading dateRange={payments.dateRange} onDateChange={payments.setDate} onExport={payments.exportCsv} onRefresh={payments.refreshPayments} />
      <PaymentsMetrics payments={payments.payments} />
      <PaymentsTable
        payments={payments.visiblePayments}
        filteredCount={payments.filteredPayments.length}
        query={payments.query}
        status={payments.status}
        method={payments.method}
        page={payments.page}
        pageCount={payments.pageCount}
        onQueryChange={payments.setQuery}
        onStatusChange={payments.setFilterStatus}
        onMethodChange={payments.setFilterMethod}
        onPageChange={payments.setPage}
        onStatusUpdate={payments.updateStatus}
        onClearFilters={payments.clearFilters}
      />
    </div>
  );
}
