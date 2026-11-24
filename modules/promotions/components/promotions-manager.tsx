'use client';

import { useState, type FormEvent } from 'react';
import { CalendarDays, CircleDollarSign, Clock3, Percent, Plus, Search, Tag, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SelectMenu } from '@/components/select';
import SummaryMetricCard from '@/components/admin/shared/summary-metric-card';
import type { Promotion } from '../schema';
import { promotionSchema } from '../schema';
import type { usePromotions } from '../hooks/use-promotions';
import { getPromotionStatus, localDateValue } from '../utils';

type Props = { promotions: ReturnType<typeof usePromotions> };
type Draft = Omit<Promotion, 'id'>;
const inputClass = 'h-10 w-full rounded-md border border-input bg-white px-3 text-sm text-foreground';
const endDate = new Date();
endDate.setDate(endDate.getDate() + 30);
const blankDraft: Draft = { name: '', code: '', description: '', kind: 'percentage', value: 10, startDate: localDateValue(new Date()), endDate: localDateValue(endDate), status: 'active' };

function formatValue(promotion: Promotion) {
  if (promotion.kind === 'percentage') return `${promotion.value}% off`;
  if (promotion.kind === 'fixed') return `₱${promotion.value.toLocaleString('en-PH')} off`;
  return `₱${promotion.value.toLocaleString('en-PH')} bundle`;
}

function PromotionForm({ promotion, onSave, onClose }: { promotion: Promotion | null; onSave: (draft: Draft, id?: string) => boolean; onClose: () => void }) {
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const result = promotionSchema.safeParse({
      id: promotion?.id ?? 'new-promotion',
      name: String(values.get('name') ?? ''),
      code: String(values.get('code') ?? '').trim().toUpperCase(),
      description: String(values.get('description') ?? ''),
      kind: String(values.get('kind') ?? 'percentage'),
      value: Number(values.get('value')),
      startDate: String(values.get('startDate') ?? ''),
      endDate: String(values.get('endDate') ?? ''),
      status: String(values.get('status') ?? 'active'),
    });
    if (!result.success) { setError(result.error.issues[0]?.message ?? 'Review the promotion details.'); return; }
    const { name, code, description, kind, value, startDate, endDate, status } = result.data;
    const draft = { name, code, description, kind, value, startDate, endDate, status };
    if (onSave(draft, promotion?.id)) onClose();
  }

  return <form onSubmit={submit} className='grid gap-4'>
    <div className='grid gap-3 sm:grid-cols-2'>
      <label className='grid gap-1.5 text-xs font-semibold'>Promotion name<Input className={inputClass} name='name' defaultValue={promotion?.name} placeholder='e.g. Weekend special' required maxLength={80} /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Promo code<Input className={inputClass} name='code' defaultValue={promotion?.code} placeholder='WEEKEND15' required maxLength={20} /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Promotion type<SelectMenu label='Promotion type' name='kind' defaultValue={promotion?.kind ?? blankDraft.kind} options={[{ value: 'percentage', label: 'Percentage discount' }, { value: 'fixed', label: 'Fixed amount discount' }, { value: 'bundle', label: 'Bundle price' }]} className='w-full' /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Value<input className={inputClass} name='value' type='number' min='0.01' step='0.01' defaultValue={promotion?.value ?? blankDraft.value} required /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Starts on<input className={inputClass} name='startDate' type='date' defaultValue={promotion?.startDate ?? blankDraft.startDate} required /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Ends on<input className={inputClass} name='endDate' type='date' defaultValue={promotion?.endDate ?? blankDraft.endDate} required /></label>
      <label className='grid gap-1.5 text-xs font-semibold sm:col-span-2'>Description<input className={inputClass} name='description' defaultValue={promotion?.description} placeholder='Short customer-facing details' maxLength={180} /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Initial status<SelectMenu label='Initial status' name='status' defaultValue={promotion?.status ?? 'active'} options={[{ value: 'active', label: 'Active' }, { value: 'paused', label: 'Paused' }, { value: 'draft', label: 'Draft' }]} className='w-full' /></label>
    </div>
    {error ? <p className='text-sm text-destructive' role='alert'>{error}</p> : null}
    <DialogFooter><Button type='button' variant='outline' onClick={onClose}>Cancel</Button><Button type='submit' variant='soft'>{promotion ? 'Save changes' : 'Create promotion'}</Button></DialogFooter>
  </form>;
}

export default function PromotionsManager({ promotions }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Promotion | null>(null);
  const [formKey, setFormKey] = useState(0);
  const activeCount = promotions.promotions.filter((item) => getPromotionStatus(item, promotions.today) === 'active').length;
  const scheduledCount = promotions.promotions.filter((item) => getPromotionStatus(item, promotions.today) === 'scheduled').length;
  const pausedCount = promotions.promotions.filter((item) => getPromotionStatus(item, promotions.today) === 'paused').length;
  function openForm(item: Promotion | null = null) { setEditing(item); setFormKey((key) => key + 1); setDialogOpen(true); }
  function closeForm() { setDialogOpen(false); setEditing(null); }

  if (!promotions.hydrated) return <div className='grid min-h-80 place-items-center' role='status'>Loading promotions…</div>;

  return <div className='mx-auto w-full max-w-[1240px] py-3 md:py-4'>
    <div className='mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
      <div><span className='mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground'>Campaign management</span><h1 className='text-[30px] font-semibold leading-tight tracking-[-0.04em] text-foreground md:text-[38px]'>Promotions</h1><p className='mt-1.5 text-[13px] text-muted-foreground'>Create discount codes, bundle prices, and scheduled offers.</p></div>
      <Button variant='soft' className='h-10 px-4 font-semibold shadow-sm' onClick={() => openForm()}><Plus className='size-4' /> Create promotion</Button>
    </div>
    {promotions.storageError ? <p className='mb-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900' role='alert'>{promotions.storageError}</p> : null}
    {promotions.notice ? <p className='mb-4 flex items-center justify-between rounded-md border border-border bg-card p-3 text-sm' role='status'>{promotions.notice}<button type='button' className='font-semibold text-muted-foreground hover:text-foreground' onClick={() => promotions.setNotice(null)} aria-label='Dismiss message'>×</button></p> : null}
    <div className='mb-5 grid gap-3 sm:grid-cols-3'>
      {[
        { label: 'Active now', value: activeCount, icon: Tag, color: 'bg-[#e5eee5] text-[#41664e]' },
        { label: 'Scheduled', value: scheduledCount, icon: CalendarDays, color: 'bg-[#f3ebdc] text-[#8b6b35]' },
        { label: 'Paused', value: pausedCount, icon: Clock3, color: 'bg-[#edf0f2] text-[#5b6871]' },
      ].map((metric) => <SummaryMetricCard key={metric.label} label={metric.label} value={metric.value} icon={metric.icon} />)}
    </div>
    <Card className='overflow-hidden rounded-md border-border bg-card p-4 shadow-sm sm:p-5'>
      <div className='mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center'>
        <div><h2 className='text-base font-semibold'>All promotions</h2><p className='text-xs text-muted-foreground'>{promotions.promotions.length} campaigns</p></div>
        <div className='flex flex-col gap-2 sm:flex-row sm:gap-3'>
          <label className='relative'><Search className='pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground' /><input className='h-9 w-full rounded-md border border-input bg-white pl-9 pr-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/30 sm:w-56' placeholder='Search name or code' value={promotions.query} onChange={(event) => promotions.setQuery(event.target.value)} aria-label='Search promotions' /></label>
          <SelectMenu label='Filter promotions' value={promotions.filter} options={[{ value: 'all', label: 'All statuses' }, { value: 'active', label: 'Active' }, { value: 'scheduled', label: 'Scheduled' }, { value: 'paused', label: 'Paused' }, { value: 'draft', label: 'Draft' }, { value: 'expired', label: 'Expired' }]} onChange={promotions.setFilter} />
        </div>
      </div>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader><TableRow><TableHead>Promotion</TableHead><TableHead>Offer</TableHead><TableHead>Schedule</TableHead><TableHead>Status</TableHead><TableHead className='text-right'>Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {promotions.filteredPromotions.slice(0, 10).map((promotion) => {
              const status = getPromotionStatus(promotion, promotions.today);
              const scheduleStatus = status.charAt(0).toUpperCase() + status.slice(1);
              return <TableRow key={promotion.id}>
                <TableCell><strong className='block text-xs'>{promotion.name}</strong><span className='mt-0.5 block text-[10px] text-muted-foreground'>{promotion.code}</span>{promotion.description ? <span className='mt-1 block max-w-64 truncate text-[10px] text-muted-foreground'>{promotion.description}</span> : null}</TableCell>
                <TableCell><span className='inline-flex items-center gap-1.5 text-xs font-semibold'>{promotion.kind === 'percentage' ? <Percent className='size-3.5' /> : promotion.kind === 'fixed' ? <CircleDollarSign className='size-3.5' /> : <Users className='size-3.5' />}{formatValue(promotion)}</span></TableCell>
                <TableCell><span className='block text-[10px] text-muted-foreground'>{promotion.startDate}</span><span className='text-[10px] text-muted-foreground'>to {promotion.endDate}</span></TableCell>
                <TableCell><span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${status === 'active' ? 'bg-[#e5eee5] text-[#41664e]' : status === 'scheduled' ? 'bg-[#f3ebdc] text-[#8b6b35]' : status === 'expired' ? 'bg-[#f5e7e4] text-[#9b5045]' : 'bg-[#edf0f2] text-[#5b6871]'}`}>{scheduleStatus}</span></TableCell>
                <TableCell><div className='flex justify-end gap-2'><Button variant='outline' size='sm' className='h-8 w-24 justify-center px-2 text-[10px]' onClick={() => openForm(promotion)}>Edit</Button>{status !== 'expired' ? <Button variant='outline' size='sm' className='h-8 w-24 justify-center px-2 text-[10px]' onClick={() => promotions.togglePromotion(promotion)}>{promotion.status === 'active' ? 'Pause' : 'Activate'}</Button> : null}<Button variant='ghost' size='icon-sm' className='text-destructive' aria-label={`Delete ${promotion.name}`} onClick={() => promotions.removePromotion(promotion)}><Trash2 className='size-3.5' /></Button></div></TableCell>
              </TableRow>;
            })}
            {promotions.filteredPromotions.length === 0 ? <TableRow><TableCell colSpan={5} className='py-10 text-center text-xs text-muted-foreground'>No promotions match your search.</TableCell></TableRow> : null}
          </TableBody>
        </Table>
      </div>
    </Card>
    <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) closeForm(); else setDialogOpen(true); }}>
      <DialogContent className='max-h-[90dvh] overflow-y-auto sm:max-w-[620px]'>
        <DialogHeader><DialogTitle>{editing ? 'Edit promotion' : 'Create promotion'}</DialogTitle><DialogDescription>Set the discount, redemption code, and campaign dates.</DialogDescription></DialogHeader>
        <PromotionForm key={`${editing?.id ?? 'new'}-${formKey}`} promotion={editing} onSave={promotions.savePromotion} onClose={closeForm} />
      </DialogContent>
    </Dialog>
  </div>;
}
