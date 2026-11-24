'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChefHat, CheckCircle2, ExternalLink, Plus, Sparkles, Star, Tags } from 'lucide-react';

import SummaryMetricCard from '@/components/admin/shared/summary-metric-card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { MenuItem } from '@/modules/menu/types/menu';
import MenuCatalogTable from './components/menu-catalog-table';
import MenuItemForm from './components/menu-item-form';
import { useAdminMenu } from './hooks/use-admin-menu';

export default function AdminMenuModule() {
  const menu = useAdminMenu();
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
    return <div className='grid min-h-80 place-items-center' role='status'>Loading menu inventory…</div>;
  }

  const metrics = [
    { label: 'Total dishes', value: menu.data.items.length, icon: ChefHat },
    { label: 'Available', value: availableCount, icon: CheckCircle2 },
    { label: 'Featured', value: featuredCount, icon: Star },
    { label: 'Categories', value: menu.data.categories.filter((category) => category.slug !== 'all').length, icon: Tags },
  ];

  return (
    <div className='mx-auto w-full max-w-[1240px] py-3 md:py-4'>
      <div className='mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
        <div>
          <span className='mb-1 block text-[10px] font-black uppercase tracking-[0.16em] text-[#7d887d]'>Catalog management</span>
          <h1 className='text-[30px] font-bold leading-tight tracking-[-0.03em] text-[#20372c] md:text-[38px]'>Menu</h1>
          <p className='mt-1.5 text-[13px] text-[#7d887d]'>Create dishes, manage categories, pricing, availability, and featured items.</p>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button variant='outline' className='h-10 rounded-md border-[#dde2dc] bg-white px-3 text-[11px] shadow-none' nativeButton={false} render={<Link href='/menu' target='_blank' />}>
            View customer menu<ExternalLink className='size-4' aria-hidden='true' />
          </Button>
          <Button variant='soft' className='h-10 px-3 text-[11px]' onClick={openCreateDialog}><Plus className='size-4' aria-hidden='true' />Add dish</Button>
        </div>
      </div>

      {menu.storageError ? <p className='mb-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900' role='alert'>{menu.storageError}</p> : null}
      {menu.notice ? <p className='mb-4 rounded-md border border-border bg-card p-3 text-sm' role='status'>{menu.notice}<Button type='button' variant='ghost' size='sm' className='ml-2 h-7' onClick={() => menu.setNotice(null)} aria-label='Dismiss menu message'>×</Button></p> : null}

      <div className='mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
        {metrics.map((metric) => <SummaryMetricCard key={metric.label} label={metric.label} value={metric.value} icon={metric.icon} />)}
      </div>

      <MenuCatalogTable menu={menu} onEdit={openEditDialog} />
      <p className='mt-3 text-xs text-muted-foreground'>Admin menu edits are saved in this browser and appear on its customer menu. A shared production catalog needs a server database.</p>

      <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) setEditingItem(null); }}>
        <DialogContent className='max-h-[min(92dvh,880px)] gap-0 overflow-hidden rounded-[26px] border border-[#e7e4da] bg-[#fffefa] p-0 text-[#202e25] shadow-[0_32px_100px_rgba(20,40,30,0.28)] ring-1 ring-white/70 sm:max-w-[680px]' overlayClassName='bg-[#14281e]/55 backdrop-blur-sm'>
          <div className='flex max-h-[min(92dvh,880px)] flex-col overflow-hidden'>
            <DialogHeader className='relative shrink-0 border-b border-[#ece9df] px-6 py-6 pr-14 sm:px-8'>
              <div className='absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#254b3a] via-[#d6a15d] to-[#254b3a]' />
              <div className='flex items-center gap-4'>
                {editingItem ? <div className='size-14 shrink-0 rounded-2xl border border-[#e7e4da] bg-cover bg-center shadow-sm' role='img' aria-label={`${editingItem.name} preview`} style={{ backgroundImage: `url("${editingItem.image}")` }} /> : <span className='grid size-14 shrink-0 place-items-center rounded-2xl bg-[#eaf0e7] text-[#254b3a]'><ChefHat className='size-6' aria-hidden='true' /></span>}
                <div>
                  <span className='mb-1 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-[#9a7946]'><Sparkles className='size-3' aria-hidden='true' />Menu studio</span>
                  <DialogTitle className='font-heading text-2xl font-normal tracking-tight text-[#20372c] sm:text-[28px]'>{editingItem ? 'Refine this dish' : 'Create a new dish'}</DialogTitle>
                  <DialogDescription className='mt-1 text-xs leading-5 text-[#777d73]'>Curate the details your guests will see on the menu.</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <MenuItemForm key={`${editingItem?.slug ?? 'new'}-${formVersion}`} item={editingItem} onSave={menu.saveItem} onCancel={closeDialog} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
