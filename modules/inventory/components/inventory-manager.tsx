'use client';

import { useState, type FormEvent } from 'react';
import { AlertTriangle, Minus, PackagePlus, Plus, Search, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { inventoryItemSchema, type InventoryItem } from '../schema';
import type { useInventory } from '../hooks/use-inventory';

type Props = { inventory: ReturnType<typeof useInventory> };

function ItemForm({ item, onSave, onClose }: { item: InventoryItem | null; onSave: Props['inventory']['saveItem']; onClose: () => void }) {
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
    <DialogFooter><Button type='button' variant='outline' onClick={onClose}>Cancel</Button><Button type='submit'>{item ? 'Save changes' : 'Add item'}</Button></DialogFooter>
  </form>;
}

export default function InventoryManager({ inventory }: Props) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<InventoryItem | null>(null);
  const [formKey, setFormKey] = useState(0);
  const lowItems = inventory.items.filter((item) => item.quantity <= item.reorderAt);
  const stockValue = inventory.items.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);
  function openForm(item: InventoryItem | null = null) { setEditing(item); setFormKey((key) => key + 1); setOpen(true); }
  function closeForm() { setOpen(false); setEditing(null); }
  if (!inventory.hydrated) return <div className='grid min-h-80 place-items-center' role='status'>Loading inventory…</div>;
  return <div className='mx-auto w-full max-w-[1240px] py-3 md:py-4'>
    <div className='mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'><div><span className='mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground'>Stock management</span><h1 className='text-[30px] font-semibold leading-tight tracking-[-0.04em] text-foreground md:text-[38px]'>Inventory</h1><p className='mt-1.5 text-[13px] text-muted-foreground'>Track ingredients, stock levels, and replenishment needs.</p></div><Button className='h-10 rounded-xl px-4 shadow-sm' onClick={() => openForm()}><PackagePlus className='size-4' /> Add inventory item</Button></div>
    {inventory.storageError ? <p className='mb-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900' role='alert'>{inventory.storageError}</p> : null}
    {inventory.notice ? <p className='mb-4 rounded-md border border-border bg-card p-3 text-sm' role='status'>{inventory.notice}<Button type='button' variant='ghost' size='sm' className='ml-2 h-7' onClick={() => inventory.setNotice(null)} aria-label='Dismiss inventory message'>×</Button></p> : null}
    <div className='mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
      {[{ label: 'Tracked items', value: inventory.items.length }, { label: 'Low stock', value: lowItems.length }, { label: 'Healthy stock', value: inventory.items.length - lowItems.length }, { label: 'Stock value', value: `₱${stockValue.toLocaleString('en-PH', { maximumFractionDigits: 2 })}` }].map((metric) => <Card className='rounded-2xl border-border/80 bg-card p-4 shadow-sm' key={metric.label}><p className='text-[10px] font-bold uppercase tracking-wide text-muted-foreground'>{metric.label}</p><p className='mt-2 text-2xl font-semibold tracking-tight text-foreground'>{metric.value}</p></Card>)}
    </div>
    {lowItems.length > 0 ? <Card className='mb-4 flex items-start gap-3 rounded-2xl border-amber-200 bg-amber-50/80 p-4 text-amber-950'><AlertTriangle className='mt-0.5 size-4 shrink-0 text-amber-700' /><div><p className='text-sm font-semibold'>Reorder attention needed</p><p className='mt-0.5 text-xs'>{lowItems.map((item) => item.name).join(', ')} {lowItems.length === 1 ? 'is' : 'are'} at or below the reorder threshold.</p></div></Card> : null}
    <Card className='overflow-hidden rounded-2xl border-border/80 bg-card shadow-sm'>
      <div className='flex flex-col gap-3 border-b border-border/80 p-4 lg:flex-row lg:items-center lg:justify-between'><div className='relative w-full lg:max-w-sm'><Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' /><Input aria-label='Search inventory' className='h-10 rounded-xl bg-background pl-9' value={inventory.query} onChange={(event) => inventory.setQuery(event.target.value)} placeholder='Search item or category' /></div><div className='flex flex-wrap items-center gap-2'><Select value={inventory.category} onValueChange={(value) => value && inventory.setCategory(value)}><SelectTrigger aria-label='Filter by category' className='h-10 min-w-36 rounded-xl bg-background text-xs'><SelectValue /></SelectTrigger><SelectContent>{inventory.categories.map((value) => <SelectItem key={value} value={value}>{value === 'all' ? 'All categories' : value}</SelectItem>)}</SelectContent></Select><Select value={inventory.stockFilter} onValueChange={(value) => value && inventory.setStockFilter(value as 'all' | 'low' | 'healthy')}><SelectTrigger aria-label='Filter by stock level' className='h-10 min-w-36 rounded-xl bg-background text-xs'><SelectValue /></SelectTrigger><SelectContent><SelectItem value='all'>All stock levels</SelectItem><SelectItem value='low'>Low stock</SelectItem><SelectItem value='healthy'>Healthy stock</SelectItem></SelectContent></Select><span className='self-center text-xs text-muted-foreground'>{inventory.filteredItems.length} of {inventory.items.length} items</span></div></div>
      <div className='overflow-x-auto'><Table className='min-w-[850px]'><TableHeader><TableRow><TableHead className='h-11 px-4'>Item</TableHead><TableHead className='px-4'>Category</TableHead><TableHead className='px-4'>In stock</TableHead><TableHead className='px-4'>Reorder at</TableHead><TableHead className='px-4'>Unit cost</TableHead><TableHead className='px-4'>Stock status</TableHead><TableHead className='px-3 text-right'>Actions</TableHead></TableRow></TableHeader><TableBody>
        {inventory.filteredItems.map((item) => { const low = item.quantity <= item.reorderAt; return <TableRow key={item.id}><TableCell className='px-4 py-3'><strong className='block text-sm text-[#25382d]'>{item.name}</strong><span className='text-xs text-muted-foreground'>Updated {item.updatedAt}</span></TableCell><TableCell className='px-4 text-xs'>{item.category}</TableCell><TableCell className='px-4'><strong className='text-sm'>{item.quantity}</strong><span className='ml-1 text-xs text-muted-foreground'>{item.unit}</span></TableCell><TableCell className='px-4 text-xs'>{item.reorderAt} {item.unit}</TableCell><TableCell className='px-4 text-xs'>₱{item.unitCost.toLocaleString('en-PH', { maximumFractionDigits: 2 })}/{item.unit}</TableCell><TableCell className='px-4'><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${low ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'}`}>{low ? 'Low stock' : 'In stock'}</span></TableCell><TableCell className='px-3 text-right'><div className='flex justify-end gap-1'><Button variant='outline' size='icon-sm' aria-label={`Remove one ${item.name}`} disabled={item.quantity === 0} onClick={() => inventory.adjustStock(item, -1)}><Minus className='size-3.5' /></Button><Button variant='outline' size='icon-sm' aria-label={`Add one ${item.name}`} onClick={() => inventory.adjustStock(item, 1)}><Plus className='size-3.5' /></Button><Button variant='ghost' size='icon-sm' aria-label={`Edit ${item.name}`} onClick={() => openForm(item)}><Pencil className='size-4' /></Button><Button variant='ghost' size='icon-sm' className='text-destructive' aria-label={`Delete ${item.name}`} onClick={() => inventory.removeItem(item)}><Trash2 className='size-4' /></Button></div></TableCell></TableRow>; })}
        {inventory.filteredItems.length === 0 ? <TableRow><TableCell colSpan={7} className='h-32 text-center text-sm text-muted-foreground'>No inventory items match those filters.</TableCell></TableRow> : null}
      </TableBody></Table></div>
    </Card>
    <p className='mt-3 text-xs text-muted-foreground'>Inventory changes are saved in this browser. Connect a shared database for multi-device stock tracking.</p>
    <Dialog open={open} onOpenChange={(next) => { if (!next) closeForm(); else setOpen(true); }}><DialogContent className='max-h-[90dvh] overflow-y-auto sm:max-w-[600px]'><DialogHeader><DialogTitle>{editing ? 'Edit inventory item' : 'Add inventory item'}</DialogTitle><DialogDescription>Keep quantities and reorder thresholds up to date.</DialogDescription></DialogHeader><ItemForm key={`${editing?.id ?? 'new'}-${formKey}`} item={editing} onSave={inventory.saveItem} onClose={closeForm} /></DialogContent></Dialog>
  </div>;
}
