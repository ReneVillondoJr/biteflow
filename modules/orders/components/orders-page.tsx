'use client';

import OrdersHeading from './heading';
import OrdersMetrics from './metrics';
import OrdersTable from './orders-table';
import { useOrders } from '../hooks/use-orders';

export default function OrdersPage() {
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
