'use client';

import { useState, type FormEvent } from 'react';
import { CircleDollarSign, Crown, Mail, MessageSquareText, Phone, Search, Trash2, UserRound, UserPlus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SelectMenu } from '@/components/select';
import SummaryMetricCard from '@/components/admin/shared/summary-metric-card';
import type { Customer } from '../schema';
import { customerSchema } from '../schema';
import type { useCustomers } from '../hooks/use-customers';

type Props = { customers: ReturnType<typeof useCustomers> };
type CustomerDraft = Pick<Customer, 'name' | 'email' | 'phone' | 'status' | 'tier' | 'preferredContact' | 'notes'>;
const inputClass = 'h-10 rounded-md border-border bg-white px-3 text-sm';
const blankDraft: CustomerDraft = { name: '', email: '', phone: '', status: 'active', tier: 'regular', preferredContact: 'email', notes: '' };

function formatMoney(amount: number) {
  return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

function CustomerForm({ customer, onSave, onClose }: { customer: Customer | null; onSave: (draft: CustomerDraft, id?: string) => boolean; onClose: () => void }) {
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const result = customerSchema.safeParse({
      id: customer?.id ?? 'new-customer',
      name: String(values.get('name') ?? ''),
      email: String(values.get('email') ?? '').trim().toLowerCase(),
      phone: String(values.get('phone') ?? ''),
      joinedAt: customer?.joinedAt ?? '2026-01-01',
      status: String(values.get('status') ?? 'active'),
      tier: String(values.get('tier') ?? 'regular'),
      preferredContact: String(values.get('preferredContact') ?? 'email'),
      notes: String(values.get('notes') ?? ''),
      ordersCount: customer?.ordersCount ?? 0,
      lifetimeValue: customer?.lifetimeValue ?? 0,
    });
    if (!result.success) { setError(result.error.issues[0]?.message ?? 'Review the profile details.'); return; }
    const { name, email, phone, status, tier, preferredContact, notes } = result.data;
    if (onSave({ name, email, phone, status, tier, preferredContact, notes }, customer?.id)) onClose();
  }

  return <form onSubmit={submit} className='grid gap-4'>
    <div className='grid gap-3 sm:grid-cols-2'>
      <label className='grid gap-1.5 text-xs font-semibold'>Full name<Input className={inputClass} name='name' defaultValue={customer?.name} placeholder='Customer name' required maxLength={80} /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Email address<Input className={inputClass} name='email' type='email' defaultValue={customer?.email} placeholder='name@example.com' required /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Phone number<Input className={inputClass} name='phone' type='tel' defaultValue={customer?.phone} placeholder='+63 9xx xxx xxxx' required maxLength={24} /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Preferred contact<SelectMenu label='Preferred contact' name='preferredContact' defaultValue={customer?.preferredContact ?? blankDraft.preferredContact} options={[{ value: 'email', label: 'Email' }, { value: 'sms', label: 'Text message' }, { value: 'phone', label: 'Phone call' }]} className='w-full' /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Customer tier<SelectMenu label='Customer tier' name='tier' defaultValue={customer?.tier ?? blankDraft.tier} options={[{ value: 'regular', label: 'Regular' }, { value: 'vip', label: 'VIP' }]} className='w-full' /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Account status<SelectMenu label='Account status' name='status' defaultValue={customer?.status ?? blankDraft.status} options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} className='w-full' /></label>
      <label className='grid gap-1.5 text-xs font-semibold sm:col-span-2'>Notes<textarea className='min-h-24 resize-y rounded-md border border-input bg-white px-3 py-2 text-sm outline-none' name='notes' defaultValue={customer?.notes} placeholder='Preferences or account notes' maxLength={500} /></label>
    </div>
    {error ? <p className='text-sm text-destructive' role='alert'>{error}</p> : null}
    <DialogFooter><Button type='button' variant='outline' onClick={onClose}>Cancel</Button><Button type='submit' variant='soft'>{customer ? 'Save changes' : 'Add customer'}</Button></DialogFooter>
  </form>;
}

export default function CustomersManager({ customers }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [selected, setSelected] = useState<Customer | null>(null);
  const [formKey, setFormKey] = useState(0);
  const activeCount = customers.customers.filter((customer) => customer.status === 'active').length;
  const vipCount = customers.customers.filter((customer) => customer.tier === 'vip').length;
  const lifetimeValue = customers.customers.reduce((total, customer) => total + customer.lifetimeValue, 0);

  function openForm(customer: Customer | null = null) {
    setEditing(customer);
    setFormKey((key) => key + 1);
    setDialogOpen(true);
    setSelected(null);
  }
  function closeForm() { setDialogOpen(false); setEditing(null); }
  function openCustomer(customer: Customer) { setSelected(customer); }

  if (!customers.hydrated) return <div className='grid min-h-80 place-items-center' role='status'>Loading customers…</div>;

  return <div className='mx-auto w-full max-w-[1240px] py-3 md:py-4'>
    <div className='mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
      <div><span className='mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground'>Customer relationships</span><h1 className='text-[30px] font-semibold leading-tight tracking-[-0.04em] text-foreground md:text-[38px]'>Customers</h1><p className='mt-1.5 text-[13px] text-muted-foreground'>Manage customer profiles, contact preferences, and account activity.</p></div>
      <Button variant='soft' className='h-10 px-4 font-semibold shadow-sm' onClick={() => openForm()}><UserPlus className='size-4' /> Add customer</Button>
    </div>
    {customers.storageError ? <p className='mb-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900' role='alert'>{customers.storageError}</p> : null}
    {customers.notice ? <p className='mb-4 flex items-center justify-between rounded-md border border-border bg-card p-3 text-sm' role='status'>{customers.notice}<button type='button' className='font-semibold text-muted-foreground hover:text-foreground' onClick={() => customers.setNotice(null)} aria-label='Dismiss message'>×</button></p> : null}
    <div className='mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
      {[
        { label: 'Total customers', value: customers.customers.length, icon: Users, color: 'bg-[#edf0f2] text-[#5b6871]' },
        { label: 'Active accounts', value: activeCount, icon: UserRound, color: 'bg-[#e5eee5] text-[#41664e]' },
        { label: 'VIP customers', value: vipCount, icon: Crown, color: 'bg-[#f3ebdc] text-[#8b6b35]' },
        { label: 'Lifetime spend', value: formatMoney(lifetimeValue), icon: CircleDollarSign, color: 'bg-[#eef1f4] text-[#526d80]' },
      ].map((metric) => <SummaryMetricCard key={metric.label} label={metric.label} value={metric.value} icon={metric.icon} />)}
    </div>
    <Card className='overflow-hidden rounded-md border-border bg-card p-4 shadow-sm sm:p-5'>
      <div className='mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center'>
        <div><h2 className='text-base font-semibold'>Customer directory</h2><p className='text-xs text-muted-foreground'>Showing {Math.min(customers.filteredCustomers.length, 10)} of {customers.filteredCustomers.length} matching profiles</p></div>
        <div className='flex flex-col gap-4 sm:flex-row sm:gap-x-8 sm:gap-y-4'>
          <label className='relative'><Search className='pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground' /><input className='search-field-input h-9 w-full pl-9 pr-3 text-xs outline-none sm:w-56' placeholder='Search name, email, phone' value={customers.query} onChange={(event) => customers.setQuery(event.target.value)} aria-label='Search customers' /></label>
          <SelectMenu label='Filter by account status' value={customers.statusFilter} options={[{ value: 'all', label: 'All accounts' }, { value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} onChange={customers.setStatusFilter} />
          <SelectMenu label='Filter by customer tier' value={customers.tierFilter} options={[{ value: 'all', label: 'All tiers' }, { value: 'vip', label: 'VIP' }, { value: 'regular', label: 'Regular' }]} onChange={customers.setTierFilter} />
        </div>
      </div>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader><TableRow><TableHead>Customer</TableHead><TableHead>Orders</TableHead><TableHead>Lifetime spend</TableHead><TableHead>Tier</TableHead><TableHead>Account</TableHead><TableHead className='text-right'>Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {customers.filteredCustomers.slice(0, 10).map((customer) => <TableRow key={customer.id}>
              <TableCell><button type='button' className='text-left' onClick={() => openCustomer(customer)}><strong className='block text-xs text-foreground hover:underline'>{customer.name}</strong><span className='mt-0.5 block text-[10px] text-muted-foreground'>{customer.email}</span></button></TableCell>
              <TableCell className='text-xs'>{customer.ordersCount}</TableCell>
              <TableCell className='text-xs font-semibold'>{formatMoney(customer.lifetimeValue)}</TableCell>
              <TableCell><span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${customer.tier === 'vip' ? 'bg-[#f3ebdc] text-[#8b6b35]' : 'bg-[#edf0f2] text-[#5b6871]'}`}>{customer.tier === 'vip' ? 'VIP' : 'Regular'}</span></TableCell>
              <TableCell><span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${customer.status === 'active' ? 'bg-[#e5eee5] text-[#41664e]' : 'bg-[#edf0f2] text-[#5b6871]'}`}>{customer.status === 'active' ? 'Active' : 'Inactive'}</span></TableCell>
              <TableCell><div className='flex justify-end gap-2'><Button variant='outline' size='sm' className='h-8 w-24 justify-center px-2 text-[10px]' onClick={() => openForm(customer)}>Edit</Button><Button variant='outline' size='sm' className='h-8 w-24 justify-center px-2 text-[10px]' onClick={() => customers.toggleStatus(customer)}>{customer.status === 'active' ? 'Deactivate' : 'Activate'}</Button><Button variant='ghost' size='icon-sm' className='text-destructive' aria-label={`Remove ${customer.name}`} onClick={() => customers.removeCustomer(customer)}><Trash2 className='size-3.5' /></Button></div></TableCell>
            </TableRow>)}
            {customers.filteredCustomers.length === 0 ? <TableRow><TableCell colSpan={6} className='py-10 text-center text-xs text-muted-foreground'>No customers match your search or filters.</TableCell></TableRow> : null}
          </TableBody>
        </Table>
      </div>
    </Card>
    <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) closeForm(); else setDialogOpen(true); }}>
      <DialogContent className='max-h-[90dvh] overflow-y-auto sm:max-w-[620px]'>
        <DialogHeader><DialogTitle>{editing ? 'Edit customer profile' : 'Add customer'}</DialogTitle><DialogDescription>Keep contact details and preferences current.</DialogDescription></DialogHeader>
        <CustomerForm key={`${editing?.id ?? 'new'}-${formKey}`} customer={editing} onSave={customers.saveCustomer} onClose={closeForm} />
      </DialogContent>
    </Dialog>
    <Sheet open={Boolean(selected)} onOpenChange={(open) => { if (!open) setSelected(null); }}>
      <SheetContent className='w-full max-w-[440px] p-0 sm:max-w-[440px]'>
        {selected ? <>
          <SheetHeader className='border-b border-border px-5 py-4 pr-14 text-left'><span className='text-[10px] font-bold uppercase tracking-wide text-muted-foreground'>Customer profile</span><SheetTitle>{selected.name}</SheetTitle><SheetDescription>Customer since {selected.joinedAt}</SheetDescription></SheetHeader>
          <div className='grid gap-5 px-5 py-5'>
            <div className='grid grid-cols-2 gap-3'><Card className='rounded-md border-border p-3'><span className='text-[10px] text-muted-foreground'>Orders</span><strong className='mt-1 block text-lg'>{selected.ordersCount}</strong></Card><Card className='rounded-md border-border p-3'><span className='text-[10px] text-muted-foreground'>Lifetime spend</span><strong className='mt-1 block text-lg'>{formatMoney(selected.lifetimeValue)}</strong></Card></div>
            <section className='grid gap-2'><h3 className='text-[10px] font-bold uppercase tracking-wide text-muted-foreground'>Contact details</h3><span className='flex items-center gap-2 text-sm'><Mail className='size-4 text-muted-foreground' />{selected.email}</span><span className='flex items-center gap-2 text-sm'><Phone className='size-4 text-muted-foreground' />{selected.phone}</span><span className='flex items-center gap-2 text-sm'><MessageSquareText className='size-4 text-muted-foreground' />Prefers {selected.preferredContact === 'sms' ? 'text messages' : selected.preferredContact === 'phone' ? 'phone calls' : 'email'}</span></section>
            <section className='grid gap-2'><h3 className='text-[10px] font-bold uppercase tracking-wide text-muted-foreground'>Account</h3><p className='text-sm'>Status: <strong className='capitalize'>{selected.status}</strong></p><p className='text-sm'>Tier: <strong className='uppercase'>{selected.tier}</strong></p></section>
            {selected.notes ? <section className='grid gap-2'><h3 className='text-[10px] font-bold uppercase tracking-wide text-muted-foreground'>Notes</h3><p className='rounded-md border border-border bg-muted/40 p-3 text-sm leading-6'>{selected.notes}</p></section> : null}
            <div className='flex gap-2'><Button variant='soft' className='flex-1' onClick={() => openForm(selected)}>Edit profile</Button><Button variant='outline' className='flex-1' onClick={() => { customers.toggleStatus(selected); setSelected({ ...selected, status: selected.status === 'active' ? 'inactive' : 'active' }); }}>{selected.status === 'active' ? 'Deactivate' : 'Activate'}</Button></div>
          </div>
        </> : null}
      </SheetContent>
    </Sheet>
  </div>;
}
