'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import {
  ChefHat,
  Clock3,
  ImagePlus,
  Sparkles,
  Edit2,
  ExternalLink,
  Plus,
  Search,
  Star,
  Trash2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { menuItemSchema } from '@/modules/menu/schema';
import type { MenuItem } from '@/modules/menu/types/menu';

import type { useAdminMenu } from '../hooks/use-admin-menu';

type MenuManagerProps = {
  menu: ReturnType<typeof useAdminMenu>;
};

function MenuItemForm({
  item,
  onSave,
  onCancel,
}: {
  item: MenuItem | null;
  onSave: (item: Omit<MenuItem, 'slug' | 'categorySlug'>, slug?: string) => boolean;
  onCancel: () => void;
}) {
  const [formError, setFormError] = useState<string | null>(null);
  const fieldClassName =
    'h-11 rounded-xl border-[#e7e4da] bg-[#fbfaf6] px-3.5 text-sm shadow-none transition-colors placeholder:text-[#a7a69d] focus-visible:border-[#254b3a] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#254b3a]/10';
  const labelClassName =
    'grid gap-2 text-[11px] font-bold uppercase tracking-[0.09em] text-[#536156]';

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = menuItemSchema
      .omit({ slug: true, categorySlug: true })
      .safeParse({
        name: String(formData.get('name') ?? ''),
        category: String(formData.get('category') ?? ''),
        description: String(formData.get('description') ?? ''),
        price: Number(formData.get('price')),
        image: String(formData.get('image') ?? ''),
        badge: String(formData.get('badge') ?? '').trim() || undefined,
        prepTime: Number(formData.get('prepTime')),
        tags: String(formData.get('tags') ?? '')
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        isPopular: formData.has('isPopular'),
        isAvailable: formData.has('isAvailable'),
      });

    if (!result.success) {
      setFormError(result.error.issues[0]?.message ?? 'Check the dish details.');
      return;
    }

    if (onSave(result.data, item?.slug)) {
      onCancel();
    }
  }

  return (
    <form className='grid min-h-0' onSubmit={submitForm}>
      <div className='grid gap-5 overflow-y-auto px-6 py-6 sm:px-8'>
      <section className='grid gap-4 rounded-2xl border border-[#ece9df] bg-[#fbfaf6] p-4 sm:grid-cols-[1fr_auto] sm:items-center'>
        <div>
          <div className='mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#8a7554]'>
            <span className='size-1.5 rounded-full bg-[#d6a15d]' />
            Dish essentials
          </div>
          <label className={labelClassName} htmlFor='dish-name'>
            Dish name
        <Input
          id='dish-name'
          name='name'
          defaultValue={item?.name ?? ''}
          maxLength={80}
          required
              className={fieldClassName}
        />
          </label>
        </div>
        {item ?
          <div
            className='hidden size-20 rounded-xl border border-white bg-cover bg-center shadow-[0_8px_24px_rgba(32,46,37,0.12)] sm:block'
            role='img'
            aria-label={`${item.name} preview`}
            style={{ backgroundImage: `url("${item.image}")` }}
          />
        : <span className='hidden size-20 place-items-center rounded-xl border border-dashed border-[#d8d4c8] bg-white text-[#9b8a6e] sm:grid'>
            <ImagePlus className='size-6' aria-hidden='true' />
          </span>
        }
      </section>

      <div className='grid gap-4 sm:grid-cols-[1fr_150px]'>
        <label className={labelClassName} htmlFor='dish-category'>
          Category
          <Input
            id='dish-category'
            name='category'
            defaultValue={item?.category ?? ''}
            placeholder='e.g. Rice bowls'
            maxLength={40}
            required
            className={fieldClassName}
          />
          <span className='text-[11px] font-normal normal-case tracking-normal text-[#85877e]'>
            New categories are created automatically.
          </span>
        </label>
        <label className={labelClassName} htmlFor='dish-price'>
          Price <span className='normal-case tracking-normal'>(PHP)</span>
          <Input
            id='dish-price'
            name='price'
            type='number'
            min='0'
            step='1'
            defaultValue={item?.price ?? ''}
            required
            className={fieldClassName}
          />
        </label>
      </div>

      <label className={labelClassName} htmlFor='dish-description'>
        Description
        <textarea
          id='dish-description'
          name='description'
          rows={3}
          maxLength={300}
          defaultValue={item?.description ?? ''}
          required
          className='min-h-24 resize-y rounded-xl border border-[#e7e4da] bg-[#fbfaf6] px-3.5 py-3 text-sm font-normal normal-case tracking-normal text-[#202e25] shadow-none outline-none transition-colors placeholder:text-[#a7a69d] focus-visible:border-[#254b3a] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#254b3a]/10'
        />
      </label>

      <section className='grid gap-4 rounded-2xl border border-[#ece9df] p-4'>
        <div className='flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#8a7554]'>
          <Clock3 className='size-3.5' aria-hidden='true' />
          Preparation & discovery
        </div>
        <div className='grid gap-4 sm:grid-cols-2'>
          <label className={labelClassName} htmlFor='dish-prep-time'>
            Preparation time <span className='normal-case tracking-normal'>(minutes)</span>
          <Input
            id='dish-prep-time'
            name='prepTime'
            type='number'
            min='1'
            step='1'
            defaultValue={item?.prepTime ?? 15}
            required
              className={fieldClassName}
          />
          </label>
          <label className={labelClassName} htmlFor='dish-tags'>
            Tags <span className='normal-case tracking-normal'>(comma separated)</span>
          <Input
            id='dish-tags'
            name='tags'
            defaultValue={item?.tags.join(', ') ?? ''}
            placeholder='Chicken, Spicy'
              className={fieldClassName}
          />
          </label>
        </div>

        <label className={labelClassName} htmlFor='dish-badge'>
          Menu highlight <span className='normal-case tracking-normal'>(optional)</span>
        <Input
          id='dish-badge'
          name='badge'
          defaultValue={item?.badge ?? ''}
          maxLength={30}
          placeholder='Bestseller'
            className={fieldClassName}
        />
        </label>
      </section>

      <div className='grid gap-3 sm:grid-cols-2'>
        <label className='flex cursor-pointer items-start gap-3 rounded-2xl border border-[#e7e4da] bg-white p-4 transition-colors hover:border-[#c8d2c4]'>
          <input
            type='checkbox'
            name='isAvailable'
            defaultChecked={item?.isAvailable ?? true}
            className='mt-0.5 size-4 accent-[#254b3a]'
          />
          <span>
            <strong className='block text-sm text-[#25382d]'>Available to order</strong>
            <span className='mt-1 block text-xs text-[#85877e]'>Show this dish in the customer menu.</span>
          </span>
        </label>
        <label className='flex cursor-pointer items-start gap-3 rounded-2xl border border-[#e7e4da] bg-white p-4 transition-colors hover:border-[#e1c99f]'>
          <input
            type='checkbox'
            name='isPopular'
            defaultChecked={item?.isPopular ?? false}
            className='mt-0.5 size-4 accent-[#b18342]'
          />
          <span>
            <strong className='flex items-center gap-1.5 text-sm text-[#25382d]'>
              <Sparkles className='size-3.5 text-[#b18342]' aria-hidden='true' />
              Featured dish
            </strong>
            <span className='mt-1 block text-xs text-[#85877e]'>Highlight this item as a popular choice.</span>
          </span>
        </label>
      </div>

      {formError ?
        <p className='rounded-xl border border-[#ecc9c2] bg-[#fff5f2] px-4 py-3 text-sm text-destructive' role='alert'>
          {formError}
        </p>
      : null}
      </div>

      <DialogFooter className='mx-0 mb-0 border-[#ece9df] bg-[#fbfaf6] px-6 py-4 sm:px-8'>
        <Button type='button' variant='outline' className='h-10 rounded-xl border-[#dedbd0] bg-white px-5' onClick={onCancel}>
          Cancel
        </Button>
        <Button type='submit' className='h-10 rounded-xl bg-[#254b3a] px-5 font-semibold shadow-[0_5px_14px_rgba(37,75,58,0.18)] hover:bg-[#193c2c]'>
          <ChefHat className='size-4' aria-hidden='true' />
          {item ? 'Save dish changes' : 'Add to menu'}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function MenuManager({ menu }: MenuManagerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formVersion, setFormVersion] = useState(0);
  const availableCount = menu.data.items.filter((item) => item.isAvailable).length;
  const featuredCount = menu.data.items.filter((item) => item.isPopular).length;

  function openCreateDialog() {
    setEditingItem(null);
    setFormVersion((current) => current + 1);
    setDialogOpen(true);
  }

  function openEditDialog(item: MenuItem) {
    setEditingItem(item);
    setFormVersion((current) => current + 1);
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    setEditingItem(null);
  }

  if (!menu.hydrated) {
    return (
      <div className='grid min-h-80 place-items-center' role='status'>
        Loading menu inventory…
      </div>
    );
  }

  return (
    <div className='mx-auto w-full max-w-[1240px] py-3 md:py-4'>
      <div className='mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
        <div>
          <span className='mb-1 block text-[10px] font-black uppercase tracking-[0.16em] text-[#7d887d]'>
            Catalog management
          </span>
          <h1 className='text-[30px] font-bold leading-tight tracking-[-0.03em] text-[#20372c] md:text-[38px]'>
            Menu
          </h1>
          <p className='mt-1.5 text-[13px] text-[#7d887d]'>
            Create dishes, manage categories, pricing, availability, and featured items.
          </p>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button
            variant='outline'
            className='h-10 rounded-md border-[#dde2dc] bg-white px-3 text-[11px] shadow-none'
            render={<Link href='/menu' target='_blank' />}
          >
            View customer menu
            <ExternalLink className='size-4' aria-hidden='true' />
          </Button>
          <Button className='h-10 rounded-md px-3 text-[11px]' onClick={openCreateDialog}>
            <Plus className='size-4' aria-hidden='true' />
            Add dish
          </Button>
        </div>
      </div>

      {menu.storageError ?
        <p className='mb-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900' role='alert'>
          {menu.storageError}
        </p>
      : null}
      {menu.notice ?
        <p className='mb-4 rounded-md border border-border bg-card p-3 text-sm' role='status'>
          {menu.notice}
          <Button
            type='button'
            variant='ghost'
            size='sm'
            className='ml-2 h-7'
            onClick={() => menu.setNotice(null)}
            aria-label='Dismiss menu message'
          >
            ×
          </Button>
        </p>
      : null}

      <div className='mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
        {[
          { label: 'Total dishes', value: menu.data.items.length },
          { label: 'Available', value: availableCount },
          { label: 'Featured', value: featuredCount },
          {
            label: 'Categories',
            value: menu.data.categories.filter((category) => category.slug !== 'all').length,
          },
        ].map((metric) => (
          <Card className='rounded-md border-border bg-white p-4 shadow-sm' key={metric.label}>
            <p className='text-[10px] font-bold uppercase tracking-wide text-muted-foreground'>
              {metric.label}
            </p>
            <p className='mt-2 text-2xl font-bold text-[#20372c]'>{metric.value}</p>
          </Card>
        ))}
      </div>

      <Card className='overflow-hidden rounded-md border-border bg-white shadow-sm'>
        <div className='flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between'>
          <div className='relative w-full lg:max-w-sm'>
            <Search
              className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground'
              aria-hidden='true'
            />
            <Input
              aria-label='Search menu items'
              className='h-9 border-[#dde2dc] bg-white pl-9 shadow-none'
              value={menu.query}
              onChange={(event) => menu.setQuery(event.target.value)}
              placeholder='Search dishes or ingredients'
            />
          </div>
          <div className='flex flex-wrap items-center gap-2'>
            <label className='sr-only' htmlFor='menu-category-filter'>
              Filter by category
            </label>
            <select
              id='menu-category-filter'
              value={menu.categoryFilter}
              onChange={(event) => menu.setCategoryFilter(event.target.value)}
              className='h-9 min-w-40 rounded-md border border-[#dde2dc] bg-white px-3 text-xs'
            >
              {menu.data.categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.label}
                </option>
              ))}
            </select>
            {(menu.query || menu.categoryFilter !== 'all') ?
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='h-9'
                onClick={menu.clearFilters}
              >
                Clear filters
              </Button>
            : null}
            <span className='text-xs text-muted-foreground'>
              {menu.filteredItems.length} of {menu.data.items.length} dishes
            </span>
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
              {menu.filteredItems.map((item) => (
                <TableRow key={item.slug}>
                  <TableCell className='px-4 py-3'>
                    <div className='flex items-center gap-3'>
                      <div
                        className='size-11 shrink-0 rounded-md bg-cover bg-center'
                        role='img'
                        aria-label={item.name}
                        style={{ backgroundImage: `url("${item.image}")` }}
                      />
                      <div className='min-w-0'>
                        <p className='font-semibold text-[#25382d]'>{item.name}</p>
                        <p className='max-w-[280px] truncate text-xs text-muted-foreground'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='px-4 text-xs'>{item.category}</TableCell>
                  <TableCell className='px-4 text-xs font-bold'>
                    ₱{item.price.toLocaleString('en-PH')}
                  </TableCell>
                  <TableCell className='px-4 text-xs'>{item.prepTime} min</TableCell>
                  <TableCell className='px-4'>
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      className={`h-7 rounded-full px-2.5 text-[10px] ${item.isAvailable ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-border bg-muted text-muted-foreground'}`}
                      onClick={() => menu.toggleItem(item, 'isAvailable')}
                      aria-label={`${item.isAvailable ? 'Mark' : 'Make'} ${item.name} ${item.isAvailable ? 'unavailable' : 'available'}`}
                    >
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </Button>
                  </TableCell>
                  <TableCell className='px-4'>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className={`h-8 px-2 ${item.isPopular ? 'text-amber-600' : 'text-muted-foreground'}`}
                      onClick={() => menu.toggleItem(item, 'isPopular')}
                      aria-pressed={item.isPopular}
                      aria-label={`${item.isPopular ? 'Remove' : 'Mark'} ${item.name} ${item.isPopular ? 'from' : 'as'} featured`}
                    >
                      <Star className='size-4' fill={item.isPopular ? 'currentColor' : 'none'} />
                      {item.isPopular ? 'Yes' : 'No'}
                    </Button>
                  </TableCell>
                  <TableCell className='px-3 text-right'>
                    <div className='flex justify-end gap-1'>
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon-sm'
                        onClick={() => openEditDialog(item)}
                        aria-label={`Edit ${item.name}`}
                      >
                        <Edit2 className='size-4' />
                      </Button>
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon-sm'
                        className='text-destructive hover:text-destructive'
                        onClick={() => menu.removeItem(item)}
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 className='size-4' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {menu.filteredItems.length === 0 ?
                <TableRow>
                  <TableCell colSpan={7} className='h-36 text-center text-sm text-muted-foreground'>
                    No dishes match those filters.
                  </TableCell>
                </TableRow>
              : null}
            </TableBody>
          </Table>
        </div>
      </Card>

      <p className='mt-3 text-xs text-muted-foreground'>
        Admin menu edits are saved in this browser and appear on its customer menu. A shared production catalog needs a server database.
      </p>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingItem(null);
          }
        }}
      >
        <DialogContent
          className='max-h-[min(92dvh,880px)] gap-0 overflow-hidden rounded-[26px] border border-[#e7e4da] bg-[#fffefa] p-0 text-[#202e25] shadow-[0_32px_100px_rgba(20,40,30,0.28)] ring-1 ring-white/70 sm:max-w-[680px]'
          overlayClassName='bg-[#14281e]/55 backdrop-blur-sm'
        >
          <div className='flex max-h-[min(92dvh,880px)] flex-col overflow-hidden'>
            <DialogHeader className='relative shrink-0 border-b border-[#ece9df] px-6 py-6 pr-14 sm:px-8'>
              <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#254b3a] via-[#d6a15d] to-[#254b3a]' />
              <div className='flex items-center gap-4'>
                {editingItem ?
                  <div
                    className='size-14 shrink-0 rounded-2xl border border-[#e7e4da] bg-cover bg-center shadow-sm'
                    role='img'
                    aria-label={`${editingItem.name} preview`}
                    style={{ backgroundImage: `url("${editingItem.image}")` }}
                  />
                : <span className='grid size-14 shrink-0 place-items-center rounded-2xl bg-[#eaf0e7] text-[#254b3a]'>
                    <ChefHat className='size-6' aria-hidden='true' />
                  </span>
                }
                <div>
                  <span className='mb-1 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-[#9a7946]'>
                    <Sparkles className='size-3' aria-hidden='true' />
                    Menu studio
                  </span>
                  <DialogTitle className='font-heading text-2xl font-normal tracking-tight text-[#20372c] sm:text-[28px]'>
                    {editingItem ? 'Refine this dish' : 'Create a new dish'}
                  </DialogTitle>
                  <DialogDescription className='mt-1 text-xs leading-5 text-[#777d73]'>
                    Curate the details your guests will see on the menu.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <MenuItemForm
              key={`${editingItem?.slug ?? 'new'}-${formVersion}`}
              item={editingItem}
              onSave={menu.saveItem}
              onCancel={closeDialog}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
