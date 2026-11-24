'use client';

import { Edit2, Search, Star, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SelectMenu } from '@/components/select';
import type { MenuItem } from '@/modules/menu/types/menu';
import type { useAdminMenu } from '../hooks/use-admin-menu';

type MenuCatalogTableProps = {
  menu: ReturnType<typeof useAdminMenu>;
  onEdit: (item: MenuItem) => void;
};

export default function MenuCatalogTable({ menu, onEdit }: MenuCatalogTableProps) {
  return (
    <Card className='overflow-hidden rounded-md border-border bg-white shadow-sm'>
      <div className='flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between'>
        <div className='relative w-full lg:max-w-sm'>
          <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' aria-hidden='true' />
          <Input aria-label='Search menu items' className='search-field-input h-9 pl-9' value={menu.query} onChange={(event) => menu.setQuery(event.target.value)} placeholder='Search dishes or ingredients' />
        </div>
        <div className='flex flex-wrap items-center gap-3'>
          <SelectMenu
            label='Filter by category'
            value={menu.categoryFilter}
            options={menu.data.categories.map((category) => ({ value: category.slug, label: category.label }))}
            onChange={menu.setCategoryFilter}
          />
          {(menu.query || menu.categoryFilter !== 'all') ? <Button type='button' variant='ghost' size='sm' className='h-9' onClick={menu.clearFilters}>Clear filters</Button> : null}
          <span className='text-xs text-muted-foreground'>Showing {Math.min(menu.filteredItems.length, 10)} of {menu.filteredItems.length} matching dishes</span>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <Table className='min-w-[850px]'>
          <TableHeader>
            <TableRow>
              <TableHead className='h-11 px-4 text-[10px] font-black uppercase tracking-wide'>Dish</TableHead>
              <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide'>Category</TableHead>
              <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide'>Price</TableHead>
              <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide'>Prep time</TableHead>
              <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide'>Availability</TableHead>
              <TableHead className='px-4 text-[10px] font-black uppercase tracking-wide'>Featured</TableHead>
              <TableHead className='w-24 px-3 text-right text-[10px] font-black uppercase tracking-wide'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {menu.filteredItems.slice(0, 10).map((item) => (
              <TableRow key={item.slug}>
                <TableCell className='px-4 py-3'><div className='flex items-center gap-3'><div className='size-11 shrink-0 rounded-md bg-cover bg-center' role='img' aria-label={item.name} style={{ backgroundImage: `url("${item.image}")` }} /><div className='min-w-0'><p className='font-semibold text-[#25382d]'>{item.name}</p><p className='max-w-[280px] truncate text-xs text-muted-foreground'>{item.description}</p></div></div></TableCell>
                <TableCell className='px-4 text-xs'>{item.category}</TableCell>
                <TableCell className='px-4 text-xs font-bold'>₱{item.price.toLocaleString('en-PH')}</TableCell>
                <TableCell className='px-4 text-xs'>{item.prepTime} min</TableCell>
                <TableCell className='px-4'><Button type='button' variant='outline' size='sm' className={`h-7 rounded-full px-2.5 text-[10px] ${item.isAvailable ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-border bg-muted text-muted-foreground'}`} onClick={() => menu.toggleItem(item, 'isAvailable')} aria-label={`${item.isAvailable ? 'Mark' : 'Make'} ${item.name} ${item.isAvailable ? 'unavailable' : 'available'}`}>{item.isAvailable ? 'Available' : 'Unavailable'}</Button></TableCell>
                <TableCell className='px-4'><Button type='button' variant='ghost' size='sm' className={`h-8 px-2 ${item.isPopular ? 'text-amber-600' : 'text-muted-foreground'}`} onClick={() => menu.toggleItem(item, 'isPopular')} aria-pressed={item.isPopular} aria-label={`${item.isPopular ? 'Remove' : 'Mark'} ${item.name} ${item.isPopular ? 'from' : 'as'} featured`}><Star className='size-4' fill={item.isPopular ? 'currentColor' : 'none'} />{item.isPopular ? 'Yes' : 'No'}</Button></TableCell>
                <TableCell className='px-3 text-right'><div className='flex justify-end gap-1'><Button type='button' variant='ghost' size='icon-sm' onClick={() => onEdit(item)} aria-label={`Edit ${item.name}`}><Edit2 className='size-4' /></Button><Button type='button' variant='ghost' size='icon-sm' className='text-destructive hover:text-destructive' onClick={() => menu.removeItem(item)} aria-label={`Delete ${item.name}`}><Trash2 className='size-4' /></Button></div></TableCell>
              </TableRow>
            ))}
            {menu.filteredItems.length === 0 ? <TableRow><TableCell colSpan={7} className='h-36 text-center text-sm text-muted-foreground'>No dishes match those filters.</TableCell></TableRow> : null}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
