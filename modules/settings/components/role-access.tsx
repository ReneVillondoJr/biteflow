'use client';

import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import { adminSections, staffRoles, type AdminSection, type Settings, type StaffRole } from '../schema';
import SettingsSection from './settings-section';
import { SelectMenu } from '@/components/select';

const roleLabels: Record<StaffRole, string> = { manager: 'Manager', supervisor: 'Supervisor', cashier: 'Cashier', cook: 'Cook', server: 'Server', delivery: 'Delivery' };
const roleLimits: Record<StaffRole, number> = { manager: adminSections.length, supervisor: 10, cashier: 7, cook: 5, server: 4, delivery: 3 };
const sectionLabels: Record<AdminSection, string> = {
  dashboard: 'Dashboard', orders: 'Orders', kitchen: 'Kitchen', delivery: 'Delivery', menu: 'Menu', inventory: 'Inventory', promotions: 'Promotions', customers: 'Customers', payments: 'Payments', staff: 'Staff', payroll: 'Payroll', reports: 'Reports', 'activity-logs': 'Activity logs', settings: 'Settings',
};

export default function RoleAccess({ settings }: { settings: Settings }) {
  const [editingRole, setEditingRole] = useState<StaffRole>(settings.navigationRole);
  const [selectedSections, setSelectedSections] = useState<AdminSection[]>(settings.roleAccess[settings.navigationRole]);
  const accessPercent = (role: StaffRole) => Math.round(settings.roleAccess[role].length / adminSections.length * 100);
  function changeRole(role: StaffRole) {
    setEditingRole(role);
    setSelectedSections(settings.roleAccess[role]);
  }
  return <SettingsSection icon={KeyRound} title='Role-based navigation' description='Choose which admin sections appear for each staff role.'>
    <label className='grid max-w-md gap-1.5 text-xs font-semibold'>Role to edit and preview<SelectMenu label='Role to edit and preview' name='navigationRole' value={editingRole} onChange={changeRole} options={staffRoles.map((role) => ({ value: role, label: role === 'manager' ? 'Admin / Manager · 100%' : `${roleLabels[role]} · ${accessPercent(role)}% (max ${Math.round(roleLimits[role] / adminSections.length * 100)}%)` }))} className='w-full' /></label>
    <div className='mt-4 flex items-center justify-between rounded-md bg-muted/60 px-3 py-2 text-xs'><span className='font-semibold'>{roleLabels[editingRole]} access level</span><span className='text-muted-foreground'>{editingRole === 'manager' ? '100% · Full access' : `${Math.round(selectedSections.length / adminSections.length * 100)}% · up to ${roleLimits[editingRole]} of ${adminSections.length} sections`}</span></div>
    <div className='mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3'>
      {adminSections.map((section) => {
        const checked = editingRole === 'manager' || selectedSections.includes(section);
        const disabled = editingRole === 'manager' || (!checked && selectedSections.length >= roleLimits[editingRole]);
        return <label key={section} className={`flex min-h-10 items-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-medium ${disabled && editingRole !== 'manager' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
        <input type='checkbox' name={`access-${section}`} checked={checked} disabled={disabled} onChange={(event) => setSelectedSections((current) => event.target.checked ? [...current, section] : current.filter((item) => item !== section))} className='size-4 accent-primary' />
        {sectionLabels[section]}
      </label>;
      })}
    </div>
    <p className='mt-4 rounded-md bg-muted/60 p-3 text-xs leading-5 text-muted-foreground'>Navigation is hidden for the selected role in this browser. This does not restrict direct URLs or secure backend data.</p>
  </SettingsSection>;
}
