'use client';

import { useInventory } from './hooks/use-inventory';
import InventoryManager from './components/inventory-manager';

export default function InventoryModule() {
  const inventory = useInventory();
  return <InventoryManager inventory={inventory} />;
}
