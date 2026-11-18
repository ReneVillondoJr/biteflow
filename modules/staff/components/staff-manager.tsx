'use client';

import { useState, type FormEvent } from 'react';
import { BriefcaseBusiness, CalendarDays, Clock3, Mail, MapPin, Phone, Search, ShieldCheck, Trash2, UserRound, UserPlus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import SummaryMetricCard from '@/components/admin/shared/summary-metric-card';
import type { StaffMember } from '../schema';
import { staffMemberSchema } from '../schema';
import type { StaffDraft, useStaff } from '../hooks/use-staff';

type Props = { staff: ReturnType<typeof useStaff> };
const inputClass = 'h-10 rounded-md border-border bg-white px-3 text-sm';
const roleLabels: Record<StaffMember['role'], string> = { manager: 'Manager', supervisor: 'Supervisor', cashier: 'Cashier', cook: 'Cook', server: 'Server', delivery: 'Delivery' };
const shiftLabels: Record<StaffMember['shift'], string> = { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening', flexible: 'Flexible' };
const statusLabels: Record<StaffMember['status'], string> = { active: 'Active', 'on-leave': 'On leave', inactive: 'Inactive' };
const permissionOptions: Array<{ value: StaffMember['permissions'][number]; label: string }> = [
  { value: 'orders', label: 'Orders' }, { value: 'menu', label: 'Menu' }, { value: 'inventory', label: 'Inventory' }, { value: 'reports', label: 'Reports' }, { value: 'staff', label: 'Staff management' },
];

function StaffForm({ member, onSave, onClose }: { member: StaffMember | null; onSave: (draft: StaffDraft, id?: string) => boolean; onClose: () => void }) {
  const [error, setError] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const result = staffMemberSchema.safeParse({
      id: member?.id ?? 'new-staff-member', name: String(values.get('name') ?? ''), email: String(values.get('email') ?? '').trim().toLowerCase(),
      phone: String(values.get('phone') ?? ''), role: String(values.get('role') ?? 'server'), shift: String(values.get('shift') ?? 'morning'),
      location: String(values.get('location') ?? ''), status: String(values.get('status') ?? 'active'), hiredAt: member?.hiredAt ?? '2026-01-01',
      permissions: values.getAll('permissions').map(String), notes: String(values.get('notes') ?? ''),
    });
    if (!result.success) { setError(result.error.issues[0]?.message ?? 'Review the profile details.'); return; }
    const { name, email, phone, role, shift, location, status, permissions, notes } = result.data;
    if (onSave({ name, email, phone, role, shift, location, status, permissions, notes }, member?.id)) onClose();
  }

  return <form onSubmit={submit} className='grid gap-4'>
    <div className='grid gap-3 sm:grid-cols-2'>
      <label className='grid gap-1.5 text-xs font-semibold'>Full name<Input className={inputClass} name='name' defaultValue={member?.name} placeholder='Staff member name' required maxLength={80} /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Work email<Input className={inputClass} name='email' type='email' defaultValue={member?.email} placeholder='name@biteflow.example' required /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Phone number<Input className={inputClass} name='phone' type='tel' defaultValue={member?.phone} placeholder='+63 9xx xxx xxxx' required maxLength={24} /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Role<select className={inputClass} name='role' defaultValue={member?.role ?? 'server'}>{Object.entries(roleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Shift<select className={inputClass} name='shift' defaultValue={member?.shift ?? 'morning'}>{Object.entries(shiftLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Work location<Input className={inputClass} name='location' defaultValue={member?.location} placeholder='Branch or location' required maxLength={80} /></label>
      <label className='grid gap-1.5 text-xs font-semibold sm:col-span-2'>Staff status<select className={inputClass} name='status' defaultValue={member?.status ?? 'active'}>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <fieldset className='grid gap-2 sm:col-span-2'><legend className='mb-1 text-xs font-semibold'>System permissions</legend><div className='grid gap-2 sm:grid-cols-2'>{permissionOptions.map((permission) => <label key={permission.value} className='flex items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-medium'><input type='checkbox' name='permissions' value={permission.value} defaultChecked={member?.permissions.includes(permission.value) ?? permission.value === 'orders'} className='size-4 accent-primary' />{permission.label}</label>)}</div><span className='text-[11px] text-muted-foreground'>Choose the areas this team member can access.</span></fieldset>
      <label className='grid gap-1.5 text-xs font-semibold sm:col-span-2'>Notes<textarea className='min-h-24 resize-y rounded-md border border-input bg-white px-3 py-2 text-sm outline-none' name='notes' defaultValue={member?.notes} placeholder='Staff notes or scheduling details' maxLength={500} /></label>
    </div>
    {error ? <p className='text-sm text-destructive' role='alert'>{error}</p> : null}
    <DialogFooter><Button type='button' variant='outline' onClick={onClose}>Cancel</Button><Button type='submit' variant='soft'>{member ? 'Save changes' : 'Add staff member'}</Button></DialogFooter>
  </form>;
}

export default function StaffManager({ staff }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<StaffMember | null>(null);
  const [selected, setSelected] = useState<StaffMember | null>(null);
  const [formKey, setFormKey] = useState(0);
  const activeCount = staff.staff.filter((member) => member.status === 'active').length;
  const leaveCount = staff.staff.filter((member) => member.status === 'on-leave').length;
  const locationCount = new Set(staff.staff.map((member) => member.location)).size;

  function openForm(member: StaffMember | null = null) { setEditing(member); setFormKey((key) => key + 1); setDialogOpen(true); setSelected(null); }
  function closeForm() { setDialogOpen(false); setEditing(null); }

  if (!staff.hydrated) return <div className='grid min-h-80 place-items-center' role='status'>Loading staff…</div>;

  return <div className='mx-auto w-full max-w-[1240px] py-3 md:py-4'>
    <div className='mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
      <div><span className='mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground'>People and operations</span><h1 className='text-[30px] font-semibold leading-tight tracking-[-0.04em] text-foreground md:text-[38px]'>Staff</h1><p className='mt-1.5 text-[13px] text-muted-foreground'>Manage team profiles, roles, permissions, shifts, and staffing status.</p></div>
      <Button variant='soft' className='h-10 px-4 font-semibold shadow-sm' onClick={() => openForm()}><UserPlus className='size-4' /> Add staff member</Button>
    </div>
    {staff.storageError ? <p className='mb-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900' role='alert'>{staff.storageError}</p> : null}
    {staff.notice ? <p className='mb-4 flex items-center justify-between rounded-md border border-border bg-card p-3 text-sm' role='status'>{staff.notice}<button type='button' className='font-semibold text-muted-foreground hover:text-foreground' onClick={() => staff.setNotice(null)} aria-label='Dismiss message'>×</button></p> : null}
    <div className='mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4'>
      {[
        { label: 'Team members', value: staff.staff.length, icon: Users },
        { label: 'Active staff', value: activeCount, icon: UserRound },
        { label: 'On leave', value: leaveCount, icon: CalendarDays },
        { label: 'Locations', value: locationCount, icon: MapPin },
      ].map((metric) => <SummaryMetricCard key={metric.label} label={metric.label} value={metric.value} icon={metric.icon} />)}
    </div>
    <Card className='overflow-hidden rounded-md border-border bg-card p-4 shadow-sm sm:p-5'>
      <div className='mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center'>
        <div><h2 className='text-base font-semibold'>Team directory</h2><p className='text-xs text-muted-foreground'>{staff.filteredStaff.length} of {staff.staff.length} team members</p></div>
        <div className='flex flex-col gap-2 sm:flex-row sm:flex-wrap'>
          <label className='relative'><Search className='pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground' /><input className='h-9 w-full rounded-md border border-input bg-white pl-9 pr-3 text-xs outline-none focus-visible:ring-2 focus-visible:ring-ring/30 sm:w-52' placeholder='Search name, email, location' value={staff.query} onChange={(event) => staff.setQuery(event.target.value)} aria-label='Search staff' /></label>
          <select className='h-9 rounded-md border border-input bg-white px-3 text-xs' value={staff.roleFilter} onChange={(event) => staff.setRoleFilter(event.target.value)} aria-label='Filter by role'><option value='all'>All roles</option>{Object.entries(roleLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
          <select className='h-9 rounded-md border border-input bg-white px-3 text-xs' value={staff.statusFilter} onChange={(event) => staff.setStatusFilter(event.target.value)} aria-label='Filter by status'><option value='all'>All statuses</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
          <select className='h-9 rounded-md border border-input bg-white px-3 text-xs' value={staff.locationFilter} onChange={(event) => staff.setLocationFilter(event.target.value)} aria-label='Filter by location'><option value='all'>All locations</option>{Array.from(new Set(staff.staff.map((member) => member.location))).sort().map((location) => <option key={location} value={location}>{location}</option>)}</select>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader><TableRow><TableHead>Team member</TableHead><TableHead>Role and shift</TableHead><TableHead>Location</TableHead><TableHead>Permissions</TableHead><TableHead>Status</TableHead><TableHead className='text-right'>Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {staff.filteredStaff.map((member) => <TableRow key={member.id}>
              <TableCell><button type='button' className='text-left' onClick={() => setSelected(member)}><strong className='block text-xs text-foreground hover:underline'>{member.name}</strong><span className='mt-0.5 block text-[10px] text-muted-foreground'>{member.email}</span></button></TableCell>
              <TableCell><strong className='block text-xs font-medium'>{roleLabels[member.role]}</strong><span className='mt-0.5 block text-[10px] text-muted-foreground'>{shiftLabels[member.shift]} shift</span></TableCell>
              <TableCell className='text-xs'>{member.location}</TableCell>
              <TableCell className='text-xs'>{member.permissions.length} area{member.permissions.length === 1 ? '' : 's'}</TableCell>
              <TableCell><span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${member.status === 'active' ? 'bg-[#e5eee5] text-[#41664e]' : member.status === 'on-leave' ? 'bg-[#f3ebdc] text-[#8b6b35]' : 'bg-[#edf0f2] text-[#5b6871]'}`}>{statusLabels[member.status]}</span></TableCell>
              <TableCell><div className='flex justify-end gap-1.5'><Button variant='outline' size='sm' className='h-7 px-2.5 text-[10px]' onClick={() => openForm(member)}>Edit</Button><Button variant='outline' size='sm' className='h-7 px-2.5 text-[10px]' onClick={() => staff.setMemberStatus(member, member.status === 'active' ? 'inactive' : 'active')}>{member.status === 'active' ? 'Deactivate' : 'Activate'}</Button><Button variant='ghost' size='icon-sm' className='text-destructive' aria-label={`Remove ${member.name}`} onClick={() => staff.removeMember(member)}><Trash2 className='size-3.5' /></Button></div></TableCell>
            </TableRow>)}
            {staff.filteredStaff.length === 0 ? <TableRow><TableCell colSpan={6} className='py-10 text-center text-xs text-muted-foreground'>No staff members match your search or filters.</TableCell></TableRow> : null}
          </TableBody>
        </Table>
      </div>
    </Card>
    <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) closeForm(); else setDialogOpen(true); }}>
      <DialogContent className='max-h-[90dvh] overflow-y-auto sm:max-w-[680px]'>
        <DialogHeader><DialogTitle>{editing ? 'Edit staff profile' : 'Add staff member'}</DialogTitle><DialogDescription>Maintain contact details, work assignments, and access permissions.</DialogDescription></DialogHeader>
        <StaffForm key={`${editing?.id ?? 'new'}-${formKey}`} member={editing} onSave={staff.saveMember} onClose={closeForm} />
      </DialogContent>
    </Dialog>
    <Sheet open={Boolean(selected)} onOpenChange={(open) => { if (!open) setSelected(null); }}>
      <SheetContent className='w-full max-w-[440px] p-0 sm:max-w-[440px]'>
        {selected ? <>
          <SheetHeader className='border-b border-border px-5 py-4 pr-14 text-left'><span className='text-[10px] font-bold uppercase tracking-wide text-muted-foreground'>Staff profile</span><SheetTitle>{selected.name}</SheetTitle><SheetDescription>{roleLabels[selected.role]} · {selected.location}</SheetDescription></SheetHeader>
          <div className='grid gap-5 px-5 py-5'>
            <div className='grid grid-cols-2 gap-3'><Card className='rounded-md border-border p-3'><span className='text-[10px] text-muted-foreground'>Status</span><strong className='mt-1 block text-sm'>{statusLabels[selected.status]}</strong></Card><Card className='rounded-md border-border p-3'><span className='text-[10px] text-muted-foreground'>Shift</span><strong className='mt-1 block text-sm'>{shiftLabels[selected.shift]}</strong></Card></div>
            <section className='grid gap-2'><h3 className='text-[10px] font-bold uppercase tracking-wide text-muted-foreground'>Contact details</h3><span className='flex items-center gap-2 text-sm'><Mail className='size-4 text-muted-foreground' />{selected.email}</span><span className='flex items-center gap-2 text-sm'><Phone className='size-4 text-muted-foreground' />{selected.phone}</span><span className='flex items-center gap-2 text-sm'><MapPin className='size-4 text-muted-foreground' />{selected.location}</span></section>
            <section className='grid gap-2'><h3 className='text-[10px] font-bold uppercase tracking-wide text-muted-foreground'>Work assignment</h3><p className='flex items-center gap-2 text-sm'><BriefcaseBusiness className='size-4 text-muted-foreground' />{roleLabels[selected.role]}</p><p className='flex items-center gap-2 text-sm'><Clock3 className='size-4 text-muted-foreground' />{shiftLabels[selected.shift]} shift</p><p className='flex items-center gap-2 text-sm'><CalendarDays className='size-4 text-muted-foreground' />On team since {selected.hiredAt}</p></section>
            <section className='grid gap-2'><h3 className='flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-muted-foreground'><ShieldCheck className='size-3.5' />System permissions</h3><div className='flex flex-wrap gap-1.5'>{selected.permissions.length ? selected.permissions.map((permission) => <span key={permission} className='rounded-full bg-[#edf0f2] px-2.5 py-1 text-[10px] font-semibold capitalize'>{permission}</span>) : <span className='text-sm text-muted-foreground'>No system permissions assigned.</span>}</div></section>
            {selected.notes ? <section className='grid gap-2'><h3 className='text-[10px] font-bold uppercase tracking-wide text-muted-foreground'>Notes</h3><p className='rounded-md border border-border bg-muted/40 p-3 text-sm leading-6'>{selected.notes}</p></section> : null}
            <div className='flex gap-2'><Button variant='soft' className='flex-1' onClick={() => openForm(selected)}>Edit profile</Button><Button variant='outline' className='flex-1' onClick={() => { staff.setMemberStatus(selected, selected.status === 'active' ? 'inactive' : 'active'); setSelected({ ...selected, status: selected.status === 'active' ? 'inactive' : 'active' }); }}>{selected.status === 'active' ? 'Deactivate' : 'Activate'}</Button></div>
          </div>
        </> : null}
      </SheetContent>
    </Sheet>
  </div>;
}
