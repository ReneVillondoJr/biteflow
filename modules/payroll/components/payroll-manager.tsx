'use client';

import { useState, type FormEvent } from 'react';
import { CircleDollarSign, Clock3, Search, Trash2, Users, WalletCards } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SelectMenu } from '@/components/select';
import SummaryMetricCard from '@/components/admin/shared/summary-metric-card';
import type { StaffMember } from '@/modules/staff/schema';
import type { PayrollEntry } from '../schema';
import { getGrossPay, getNetPay } from '../schema';
import type { PayrollDraft, usePayroll } from '../hooks/use-payroll';

type Props = { payroll: ReturnType<typeof usePayroll>; staff: StaffMember[]; staffHydrated: boolean };
const inputClass = 'h-10 w-full rounded-md border border-input bg-white px-3 text-sm text-foreground';
const statusLabels: Record<PayrollEntry['status'], string> = { draft: 'Draft', approved: 'Approved', paid: 'Paid' };
const money = (value: number) => `₱${value.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function PayrollForm({ entry, staff, onSave, onClose }: { entry: PayrollEntry | null; staff: StaffMember[]; onSave: (draft: PayrollDraft, id?: string) => boolean; onClose: () => void }) {
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const member = staff.find((person) => person.id === String(values.get('staffId') ?? ''));
    if (!member) { setError('Choose a staff member.'); return; }
    const draft: PayrollDraft = {
      staffId: member.id,
      staffName: member.name,
      role: member.role,
      location: member.location,
      periodStart: String(values.get('periodStart') ?? ''),
      periodEnd: String(values.get('periodEnd') ?? ''),
      hours: Number(values.get('hours')),
      hourlyRate: Number(values.get('hourlyRate')),
      bonus: Number(values.get('bonus') || 0),
      deductions: Number(values.get('deductions') || 0),
      notes: String(values.get('notes') ?? '').trim(),
    };
    const gross = draft.hours * draft.hourlyRate + draft.bonus;
    if (!draft.periodStart || !draft.periodEnd || draft.periodEnd < draft.periodStart) { setError('Enter a valid pay period. The end date must be on or after the start date.'); return; }
    if (!(draft.hours > 0) || !(draft.hourlyRate > 0) || draft.bonus < 0 || draft.deductions < 0) { setError('Enter positive hours and hourly rate. Bonus and deductions cannot be negative.'); return; }
    if (draft.deductions > gross) { setError('Deductions cannot exceed gross pay.'); return; }
    if (onSave(draft, entry?.id)) onClose();
  }

  return <form onSubmit={submit} className='grid gap-4'>
    <div className='grid gap-3 sm:grid-cols-2'>
      <label className='grid gap-1.5 text-xs font-semibold sm:col-span-2'>Staff member<SelectMenu label='Staff member' name='staffId' defaultValue={entry?.staffId} placeholder='Select a team member' required options={staff.filter((member) => member.status !== 'inactive').map((member) => ({ value: member.id, label: `${member.name} · ${member.role} · ${member.location}` }))} className='w-full' /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Period starts<input className={inputClass} type='date' name='periodStart' defaultValue={entry?.periodStart} required /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Period ends<input className={inputClass} type='date' name='periodEnd' defaultValue={entry?.periodEnd} required /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Hours worked<input className={inputClass} type='number' name='hours' min='0.01' step='0.25' defaultValue={entry?.hours} placeholder='80' required /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Hourly rate (₱)<input className={inputClass} type='number' name='hourlyRate' min='0.01' step='0.01' defaultValue={entry?.hourlyRate} placeholder='150' required /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Bonus (₱)<input className={inputClass} type='number' name='bonus' min='0' step='0.01' defaultValue={entry?.bonus ?? 0} /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Deductions (₱)<input className={inputClass} type='number' name='deductions' min='0' step='0.01' defaultValue={entry?.deductions ?? 0} /></label>
      <label className='grid gap-1.5 text-xs font-semibold sm:col-span-2'>Notes<textarea className='min-h-20 resize-y rounded-md border border-input bg-white px-3 py-2 text-sm text-foreground' name='notes' defaultValue={entry?.notes} placeholder='Optional payroll note' maxLength={300} /></label>
    </div>
    {error ? <p className='text-sm text-destructive' role='alert'>{error}</p> : null}
    <DialogFooter><Button type='button' variant='outline' onClick={onClose}>Cancel</Button><Button type='submit' variant='soft'>{entry ? 'Save changes' : 'Create payroll record'}</Button></DialogFooter>
  </form>;
}

export default function PayrollManager({ payroll, staff, staffHydrated }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<PayrollEntry | null>(null);
  const [formKey, setFormKey] = useState(0);
  const draftCount = payroll.entries.filter((entry) => entry.status === 'draft').length;
  const approvedCount = payroll.entries.filter((entry) => entry.status === 'approved').length;
  const paidTotal = payroll.entries.filter((entry) => entry.status === 'paid').reduce((sum, entry) => sum + getNetPay(entry), 0);
  function openForm(entry: PayrollEntry | null = null) { setEditing(entry); setFormKey((key) => key + 1); setDialogOpen(true); }
  function closeForm() { setDialogOpen(false); setEditing(null); }

  if (!payroll.hydrated || !staffHydrated) return <div className='grid min-h-80 place-items-center' role='status'>Loading payroll…</div>;

  return <div className='mx-auto w-full max-w-[1240px] py-3 md:py-4'>
    <div className='mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
      <div><span className='mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground'>People and operations</span><h1 className='text-[30px] font-semibold leading-tight tracking-[-0.04em] text-foreground md:text-[38px]'>Payroll</h1><p className='mt-1.5 text-[13px] text-muted-foreground'>Prepare pay records, review totals, and track payment status.</p></div>
      <Button variant='soft' className='h-10 px-4 font-semibold shadow-sm' onClick={() => openForm()}><CircleDollarSign className='size-4' /> Create payroll record</Button>
    </div>
    {payroll.storageError ? <p className='mb-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900' role='alert'>{payroll.storageError}</p> : null}
    {payroll.notice ? <p className='mb-4 flex items-center justify-between rounded-md border border-border bg-card p-3 text-sm' role='status'>{payroll.notice}<button type='button' className='font-semibold text-muted-foreground hover:text-foreground' onClick={() => payroll.setNotice(null)} aria-label='Dismiss message'>×</button></p> : null}
    <div className='mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
      {[
        { label: 'Payroll records', value: payroll.entries.length, icon: Users },
        { label: 'Drafts to review', value: draftCount, icon: Clock3 },
        { label: 'Approved', value: approvedCount, icon: WalletCards },
        { label: 'Total paid', value: money(paidTotal), icon: CircleDollarSign },
      ].map((metric) => <SummaryMetricCard key={metric.label} label={metric.label} value={metric.value} icon={metric.icon} />)}
    </div>
    <Card className='overflow-hidden rounded-md border-border bg-card p-4 shadow-sm sm:p-5'>
      <div className='mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center'>
        <div><h2 className='text-base font-semibold'>Payroll records</h2><p className='text-xs text-muted-foreground'>Showing {Math.min(payroll.filteredEntries.length, 10)} of {payroll.filteredEntries.length} matching records</p></div>
        <div className='flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3'>
          <label className='relative'><Search className='pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground' /><input className='search-field-input h-9 w-full pl-9 pr-3 text-xs outline-none sm:w-56' placeholder='Search staff or location' value={payroll.query} onChange={(event) => payroll.setQuery(event.target.value)} aria-label='Search payroll records' /></label>
          <SelectMenu label='Filter by payroll status' value={payroll.statusFilter} options={[{ value: 'all', label: 'All statuses' }, ...Object.entries(statusLabels).map(([value, label]) => ({ value, label }))]} onChange={payroll.setStatusFilter} />
        </div>
      </div>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader><TableRow><TableHead>Team member</TableHead><TableHead>Pay period</TableHead><TableHead>Hours</TableHead><TableHead>Gross pay</TableHead><TableHead>Net pay</TableHead><TableHead>Status</TableHead><TableHead className='text-right'>Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {payroll.filteredEntries.slice(0, 10).map((entry) => <TableRow key={entry.id}>
              <TableCell><strong className='block text-xs'>{entry.staffName}</strong><span className='mt-0.5 block text-[10px] capitalize text-muted-foreground'>{entry.role} · {entry.location}</span></TableCell>
              <TableCell><span className='block text-[10px]'>{entry.periodStart}</span><span className='text-[10px] text-muted-foreground'>to {entry.periodEnd}</span></TableCell>
              <TableCell className='text-xs'>{entry.hours}</TableCell>
              <TableCell className='text-xs'>{money(getGrossPay(entry))}</TableCell>
              <TableCell className='text-xs font-semibold'>{money(getNetPay(entry))}</TableCell>
              <TableCell><span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${entry.status === 'paid' ? 'bg-[#e5eee5] text-[#41664e]' : entry.status === 'approved' ? 'bg-[#f3ebdc] text-[#8b6b35]' : 'bg-[#edf0f2] text-[#5b6871]'}`}>{statusLabels[entry.status]}</span></TableCell>
              <TableCell><div className='flex justify-end gap-2'><Button variant='outline' size='sm' className='h-8 w-24 justify-center px-2 text-[10px]' onClick={() => openForm(entry)}>Edit</Button>{entry.status === 'draft' ? <Button variant='outline' size='sm' className='h-8 w-24 justify-center px-2 text-[10px]' onClick={() => payroll.setEntryStatus(entry, 'approved')}>Approve</Button> : entry.status === 'approved' ? <Button variant='outline' size='sm' className='h-8 w-24 justify-center px-2 text-[10px]' onClick={() => payroll.setEntryStatus(entry, 'paid')}>Mark paid</Button> : null}<Button variant='ghost' size='icon-sm' className='text-destructive' aria-label={`Delete payroll record for ${entry.staffName}`} onClick={() => payroll.removeEntry(entry)}><Trash2 className='size-3.5' /></Button></div></TableCell>
            </TableRow>)}
            {payroll.filteredEntries.length === 0 ? <TableRow><TableCell colSpan={7} className='py-10 text-center text-xs text-muted-foreground'>No payroll records match your search. Create a record to get started.</TableCell></TableRow> : null}
          </TableBody>
        </Table>
      </div>
      {payroll.entries.length > 0 ? <p className='mt-3 text-[11px] text-muted-foreground'>Net pay equals hours × rate + bonus − deductions.</p> : null}
    </Card>
    <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) closeForm(); else setDialogOpen(true); }}>
      <DialogContent className='max-h-[90dvh] overflow-y-auto sm:max-w-[620px]'>
        <DialogHeader><DialogTitle>{editing ? 'Edit payroll record' : 'Create payroll record'}</DialogTitle><DialogDescription>Enter the pay period and compensation details. New records start as drafts.</DialogDescription></DialogHeader>
        <PayrollForm key={`${editing?.id ?? 'new'}-${formKey}`} entry={editing} staff={staff} onSave={payroll.saveEntry} onClose={closeForm} />
      </DialogContent>
    </Dialog>
  </div>;
}
