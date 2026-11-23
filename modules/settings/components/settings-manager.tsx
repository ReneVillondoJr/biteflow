'use client';

import { type FormEvent } from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { adminSections, type Settings, type StaffRole } from '../schema';
import type { useSettings } from '../hooks/use-settings';
import RoleAccess from './role-access';
import { AdminControls, NotificationPreferences, RegionalPreferences, RestaurantDetails } from './settings-fields';

type Props = { settings: ReturnType<typeof useSettings> };

export default function SettingsManager({ settings }: Props) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const role = String(values.get('navigationRole') ?? 'manager') as StaffRole;
    const roleAccess = { ...settings.data.roleAccess, [role]: role === 'manager' ? [...adminSections] : adminSections.filter((section) => values.has(`access-${section}`)) };
    const draft: Settings = {
      restaurantName: String(values.get('restaurantName') ?? ''),
      contactEmail: String(values.get('contactEmail') ?? ''),
      contactPhone: String(values.get('contactPhone') ?? ''),
      address: String(values.get('address') ?? ''),
      currency: String(values.get('currency')) as Settings['currency'],
      timezone: String(values.get('timezone')) as Settings['timezone'],
      orderNotifications: values.has('orderNotifications'),
      lowStockNotifications: values.has('lowStockNotifications'),
      dailySummary: values.has('dailySummary'),
      requireManagerApproval: values.has('requireManagerApproval'),
      navigationRole: role,
      roleAccess,
    };
    settings.saveSettings(draft);
  }

  if (!settings.hydrated) return <div className='grid min-h-80 place-items-center' role='status'>Loading settings…</div>;

  return <div className='mx-auto w-full max-w-[1040px] py-3 md:py-4'>
    <div className='mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'><div><span className='mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground'>Workspace configuration</span><h1 className='text-[30px] font-semibold leading-tight tracking-[-0.04em] text-foreground md:text-[38px]'>Settings</h1><p className='mt-1.5 text-[13px] text-muted-foreground'>Manage restaurant details, access, operations, and notifications.</p></div><Button type='submit' form='settings-form' variant='soft' className='h-10 px-4 font-semibold shadow-sm'><Save className='size-4' /> Save settings</Button></div>
    {settings.storageError ? <p className='mb-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900' role='alert'>{settings.storageError}</p> : null}
    {settings.notice ? <p className='mb-4 flex items-center justify-between rounded-md border border-border bg-card p-3 text-sm' role='status'>{settings.notice}<button type='button' className='font-semibold text-muted-foreground hover:text-foreground' onClick={() => settings.setNotice(null)} aria-label='Dismiss message'>×</button></p> : null}
    <form id='settings-form' onSubmit={submit} className='grid gap-4'>
      <RestaurantDetails settings={settings.data} />
      <RegionalPreferences settings={settings.data} />
      <NotificationPreferences settings={settings.data} />
      <AdminControls settings={settings.data} />
      <RoleAccess settings={settings.data} />
      <p className='text-xs text-muted-foreground'>Saved restaurant: <strong className='font-semibold text-foreground'>{settings.data.restaurantName}</strong></p>
    </form>
  </div>;
}
