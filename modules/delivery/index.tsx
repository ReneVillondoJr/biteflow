'use client';

import { useDelivery } from './hooks/use-delivery';
import DeliveryBoard from './components/delivery-board';
import DeliveryHeading from './components/delivery-heading';
import DeliveryMetrics from './components/delivery-metrics';

export default function DeliveryModule() {
  const delivery = useDelivery();

  return (
    <div className='mx-auto w-full max-w-[1480px] py-3 md:py-4'>
      <DeliveryHeading onRefresh={delivery.refreshDeliveries} />
      <DeliveryMetrics metrics={delivery.metrics} />
      <DeliveryBoard
        tickets={delivery.visibleTickets}
        query={delivery.query}
        rider={delivery.rider}
        status={delivery.status}
        elapsed={delivery.elapsed}
        onQueryChange={delivery.setQuery}
        onRiderChange={delivery.setRider}
        onStatusFilterChange={delivery.setStatus}
        onClearFilters={delivery.clearFilters}
        onStatusChange={delivery.updateStatus}
        onAssignRider={delivery.assignRider}
      />
    </div>
  );
}