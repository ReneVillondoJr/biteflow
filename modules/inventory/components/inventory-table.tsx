'use client';

import { AlertTriangle, Minus, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SelectMenu } from '@/components/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { useInventory } from '../hooks/use-inventory';
import type { InventoryItem } from '../schema';

type Props = { inventory: ReturnType<typeof useInventory>; lowItems: InventoryItem[]; onEdit: (item: InventoryItem) => void };

export default function InventoryTable({ inventory, lowItems, onEdit }: Props) {
  return <>
    {lowItems.length > 0 ? <Card className='mb-4 flex items-start gap-3 rounded-2xl border-amber-200 bg-amber-50/80 p-4 text-amber-950'><AlertTriangle className='mt-0.5 size-4 shrink-0 text-amber-700' /><div><p className='text-sm font-semibold'>Reorder attention needed</p><p className='mt-0.5 text-xs'>{lowItems.map((item) => item.name).join(', ')} {lowItems.length === 1 ? 'is' : 'are'} at or below the reorder threshold.</p></div></Card> : null}
    <Card className='overflow-hidden rounded-2xl border-border/80 bg-card shadow-sm'>
      <div className='flex flex-col gap-3 border-b border-border/80 p-4 lg:flex-row lg:items-center lg:justify-between'><div className='relative w-full lg:max-w-sm'><Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' /><Input aria-label='Search inventory' className='search-field-input h-9 pl-9' value={inventory.query} onChange={(event) => inventory.setQuery(event.target.value)} placeholder='Search item or category' /></div><div className='flex flex-wrap items-center gap-2'><SelectMenu label='Filter by category' value={inventory.category} options={inventory.categories.map((value) => ({ value, label: value === 'all' ? 'All categories' : value }))} onChange={inventory.setCategory} /><SelectMenu label='Filter by stock level' value={inventory.stockFilter} options={[{ value: 'all', label: 'All stock levels' }, { value: 'low', label: 'Low stock' }, { value: 'healthy', label: 'Healthy stock' }]} onChange={(value) => inventory.setStockFilter(value as 'all' | 'low' | 'healthy')} /><span className='self-center text-xs text-muted-foreground'>Showing {Math.min(inventory.filteredItems.length, 10)} of {inventory.filteredItems.length} matching items</span></div></div>
      <div className='overflow-x-auto'><Table className='min-w-[850px]'><TableHeader><TableRow><TableHead className='h-11 px-4'>Item</TableHead><TableHead className='px-4'>Category</TableHead><TableHead className='px-4'>In stock</TableHead><TableHead className='px-4'>Reorder at</TableHead><TableHead className='px-4'>Unit cost</TableHead><TableHead className='px-4'>Stock status</TableHead><TableHead className='px-3 text-right'>Actions</TableHead></TableRow></TableHeader><TableBody>
        {inventory.filteredItems.slice(0, 10).map((item) => { const low = item.quantity <= item.reorderAt; return <TableRow key={item.id}><TableCell className='px-4 py-3'><strong className='block text-sm text-[#25382d]'>{item.name}</strong><span className='text-xs text-muted-foreground'>Updated {item.updatedAt}</span></TableCell><TableCell className='px-4 text-xs'>{item.category}</TableCell><TableCell className='px-4'><strong className='text-sm'>{item.quantity}</strong><span className='ml-1 text-xs text-muted-foreground'>{item.unit}</span></TableCell><TableCell className='px-4 text-xs'>{item.reorderAt} {item.unit}</TableCell><TableCell className='px-4 text-xs'>₱{item.unitCost.toLocaleString('en-PH', { maximumFractionDigits: 2 })}/{item.unit}</TableCell><TableCell className='px-4'><span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${low ? 'bg-amber-50 text-amber-800' : 'bg-emerald-50 text-emerald-800'}`}>{low ? 'Low stock' : 'In stock'}</span></TableCell><TableCell className='px-3 text-right'><div className='flex justify-end gap-1'><Button variant='outline' size='icon-sm' aria-label={`Remove one ${item.name}`} disabled={item.quantity === 0} onClick={() => inventory.adjustStock(item, -1)}><Minus className='size-3.5' /></Button><Button variant='outline' size='icon-sm' aria-label={`Add one ${item.name}`} onClick={() => inventory.adjustStock(item, 1)}><Plus className='size-3.5' /></Button><Button variant='ghost' size='icon-sm' aria-label={`Edit ${item.name}`} onClick={() => onEdit(item)}><Pencil className='size-4' /></Button><Button variant='ghost' size='icon-sm' className='text-destructive' aria-label={`Delete ${item.name}`} onClick={() => inventory.removeItem(item)}><Trash2 className='size-4' /></Button></div></TableCell></TableRow>; })}
        {inventory.filteredItems.length === 0 ? <TableRow><TableCell colSpan={7} className='h-32 text-center text-sm text-muted-foreground'>No inventory items match those filters.</TableCell></TableRow> : null}
      </TableBody></Table></div>
    </Card>
    <p className='mt-3 text-xs text-muted-foreground'>Inventory changes are saved in this browser. Connect a shared database for multi-device stock tracking.</p>
  </>;
}
