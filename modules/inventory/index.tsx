'use client';

import { useInventory } from './hooks/use-inventory';
import { useState } from 'react';
import InventoryHeading from './components/inventory-heading';
import InventoryItemForm from './components/inventory-item-form';
import InventorySummary from './components/inventory-summary';
import InventoryTable from './components/inventory-table';
import type { InventoryItem } from './schema';

export default function InventoryModule() {
  const inventory = useInventory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<InventoryItem | null>(null);
  const [formKey, setFormKey] = useState(0);
  const lowItems = inventory.items.filter((item) => item.quantity <= item.reorderAt);
  const stockValue = inventory.items.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);
  function openForm(item: InventoryItem | null = null) { setEditing(item); setFormKey((key) => key + 1); setDialogOpen(true); }
  function closeForm() { setDialogOpen(false); setEditing(null); }

  if (!inventory.hydrated) return <div className='grid min-h-80 place-items-center' role='status'>Loading inventory…</div>;

  return <div className='mx-auto w-full max-w-[1240px] py-3 md:py-4'>
    <InventoryHeading onAdd={() => openForm()} />
    {inventory.storageError ? <p className='mb-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900' role='alert'>{inventory.storageError}</p> : null}
    {inventory.notice ? <p className='mb-4 rounded-md border border-border bg-card p-3 text-sm' role='status'>{inventory.notice}<button type='button' className='ml-2 rounded px-2 py-1 font-semibold text-muted-foreground hover:text-foreground' onClick={() => inventory.setNotice(null)} aria-label='Dismiss inventory message'>×</button></p> : null}
    <InventorySummary itemCount={inventory.items.length} lowCount={lowItems.length} stockValue={stockValue} />
    <InventoryTable inventory={inventory} lowItems={lowItems} onEdit={openForm} />
    <InventoryItemForm open={dialogOpen} item={editing} formKey={formKey} onOpenChange={(open) => { if (!open) closeForm(); else setDialogOpen(true); }} onSave={inventory.saveItem} onClose={closeForm} />
  </div>;
}
