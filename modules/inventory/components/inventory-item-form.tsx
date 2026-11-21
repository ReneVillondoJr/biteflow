'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { inventoryItemSchema, type InventoryItem } from '../schema';
import type { useInventory } from '../hooks/use-inventory';

type Props = { open: boolean; item: InventoryItem | null; formKey: number; onOpenChange: (open: boolean) => void; onSave: ReturnType<typeof useInventory>['saveItem']; onClose: () => void };

function ItemForm({ item, onSave, onClose }: Pick<Props, 'item' | 'onSave' | 'onClose'>) {
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = inventoryItemSchema.omit({ id: true, updatedAt: true }).safeParse({
      name: String(form.get('name') ?? ''), category: String(form.get('category') ?? ''), unit: String(form.get('unit') ?? ''),
      quantity: Number(form.get('quantity')), reorderAt: Number(form.get('reorderAt')), unitCost: Number(form.get('unitCost')),
    });
    if (!result.success) { setError(result.error.issues[0]?.message ?? 'Check the item details.'); return; }
    if (onSave(result.data, item?.id)) onClose();
  }
  const field = 'h-10 rounded-lg';
  return <form onSubmit={submit} className='grid gap-4'>
    <div className='grid gap-3 sm:grid-cols-2'>
      <label className='grid gap-1.5 text-xs font-semibold'>Item name<Input className={field} name='name' defaultValue={item?.name} required maxLength={80} /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Category<Input className={field} name='category' defaultValue={item?.category} placeholder='e.g. Dairy' required maxLength={40} /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Unit<Input className={field} name='unit' defaultValue={item?.unit ?? 'pcs'} placeholder='kg, L, pcs' required maxLength={12} /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Current quantity<Input className={field} name='quantity' type='number' min='0' step='1' defaultValue={item?.quantity ?? 0} required /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Reorder threshold<Input className={field} name='reorderAt' type='number' min='0' step='1' defaultValue={item?.reorderAt ?? 5} required /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Cost per unit (₱)<Input className={field} name='unitCost' type='number' min='0' step='0.01' defaultValue={item?.unitCost ?? 0} required /></label>
    </div>
    {error ? <p role='alert' className='text-sm text-destructive'>{error}</p> : null}
    <DialogFooter><Button type='button' variant='outline' onClick={onClose}>Cancel</Button><Button type='submit' variant={item ? 'default' : 'soft'}>{item ? 'Save changes' : 'Add item'}</Button></DialogFooter>
  </form>;
}

export default function InventoryItemForm({ open, item, formKey, onOpenChange, onSave, onClose }: Props) {
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className='max-h-[90dvh] overflow-y-auto sm:max-w-[600px]'><DialogHeader><DialogTitle>{item ? 'Edit inventory item' : 'Add inventory item'}</DialogTitle><DialogDescription>Keep quantities and reorder thresholds up to date.</DialogDescription></DialogHeader><ItemForm key={`${item?.id ?? 'new'}-${formKey}`} item={item} onSave={onSave} onClose={onClose} /></DialogContent></Dialog>;
}
