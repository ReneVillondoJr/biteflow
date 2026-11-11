'use client';

import OrdersHeading from './components/heading';
import OrdersMetrics from './components/metrics';
import OrdersTable from './components/orders-table';
import { useOrders } from './hooks/use-orders';

export default function OrdersModule() {
  const orders = useOrders();

  return (
    <div className='mx-auto w-full max-w-[1240px] py-3 md:py-4'>
      <OrdersHeading
        onExport={orders.exportCsv}
        dateRange={orders.dateRange}
        onDateChange={orders.setDate}
        onRefresh={orders.refreshOrders}
      />
      <OrdersMetrics />
      <OrdersTable
        orders={orders.visibleOrders}
        filteredCount={orders.filteredOrders.length}
        query={orders.query}
        status={orders.status}
        type={orders.type}
        page={orders.page}
        pageCount={orders.pageCount}
        onQueryChange={orders.setQuery}
        onStatusChange={orders.setFilterStatus}
        onTypeChange={orders.setFilterType}
        onPageChange={orders.setPage}
        onStatusUpdate={orders.updateStatus}
        onClearFilters={orders.clearFilters}
      />
    </div>
  );
}