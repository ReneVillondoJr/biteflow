'use client';

import { useKitchen } from '../hooks/use-kitchen';
import KitchenBoard from './kitchen-board';
import KitchenHeading from './kitchen-heading';
import KitchenMetrics from './kitchen-metrics';

export default function KitchenPage() {
  const kitchen = useKitchen();

  return (
    <div className='mx-auto w-full max-w-[1240px] py-3 md:py-4'>
      <KitchenHeading onRefresh={kitchen.refreshKitchen} />
      <KitchenMetrics metrics={kitchen.metrics} />
      <KitchenBoard
        tickets={kitchen.visibleTickets}
        query={kitchen.query}
        station={kitchen.station}
        status={kitchen.status}
        onQueryChange={kitchen.setQuery}
        onStationChange={kitchen.setStation}
        onStatusChangeFilter={kitchen.setStatus}
        onClearFilters={kitchen.clearFilters}
        elapsed={kitchen.elapsed}
        onStatusChange={kitchen.updateStatus}
        onToggleHeld={kitchen.toggleHeld}
        onTogglePriority={kitchen.togglePriority}
      />
    </div>
  );
}
