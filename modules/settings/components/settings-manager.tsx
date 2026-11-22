'use client';

import { type FormEvent } from 'react';
import { Bell, Building2, Clock3, Save, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { useSettings } from '../hooks/use-settings';
import type { Settings } from '../schema';

type Props = { settings: ReturnType<typeof useSettings> };
const inputClass = 'h-10 w-full rounded-md border border-input bg-white px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/30';

function Toggle({ name, label, description, defaultChecked }: { name: string; label: string; description: string; defaultChecked: boolean }) {
  return <label className='flex cursor-pointer items-start justify-between gap-4 border-b border-border py-4 last:border-0'>
    <span><span className='block text-sm font-semibold'>{label}</span><span className='mt-1 block text-xs leading-5 text-muted-foreground'>{description}</span></span>
    <input name={name} type='checkbox' defaultChecked={defaultChecked} className='mt-1 size-4 shrink-0 accent-primary' />
  </label>;
}

function Section({ icon: Icon, title, description, children }: { icon: typeof Building2; title: string; description: string; children: React.ReactNode }) {
  return <Card className='rounded-md border-border bg-card p-5 shadow-sm sm:p-6'><div className='mb-5 flex items-start gap-3'><span className='flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary'><Icon className='size-4' /></span><div><h2 className='text-base font-semibold'>{title}</h2><p className='mt-0.5 text-xs text-muted-foreground'>{description}</p></div></div>{children}</Card>;
}

export default function SettingsManager({ settings }: Props) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
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
    };
    settings.saveSettings(draft);
  }

  if (!settings.hydrated) return <div className='grid min-h-80 place-items-center' role='status'>Loading settings…</div>;

  return <div className='mx-auto w-full max-w-[1040px] py-3 md:py-4'>
    <div className='mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'><div><span className='mb-1 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground'>Workspace configuration</span><h1 className='text-[30px] font-semibold leading-tight tracking-[-0.04em] text-foreground md:text-[38px]'>Settings</h1><p className='mt-1.5 text-[13px] text-muted-foreground'>Manage restaurant details, daily operations, and admin notifications.</p></div><Button type='submit' form='settings-form' variant='soft' className='h-10 px-4 font-semibold shadow-sm'><Save className='size-4' /> Save settings</Button></div>
    {settings.storageError ? <p className='mb-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900' role='alert'>{settings.storageError}</p> : null}
    {settings.notice ? <p className='mb-4 flex items-center justify-between rounded-md border border-border bg-card p-3 text-sm' role='status'>{settings.notice}<button type='button' className='font-semibold text-muted-foreground hover:text-foreground' onClick={() => settings.setNotice(null)} aria-label='Dismiss message'>×</button></p> : null}
    <form id='settings-form' onSubmit={submit} className='grid gap-4'>
      <Section icon={Building2} title='Restaurant details' description='Contact information shown to your team and customers.'>
        <div className='grid gap-4 sm:grid-cols-2'>
          <label className='grid gap-1.5 text-xs font-semibold sm:col-span-2'>Restaurant name<input className={inputClass} name='restaurantName' defaultValue={settings.data.restaurantName} minLength={2} maxLength={80} required /></label>
          <label className='grid gap-1.5 text-xs font-semibold'>Contact email<input className={inputClass} name='contactEmail' type='email' defaultValue={settings.data.contactEmail} /></label>
          <label className='grid gap-1.5 text-xs font-semibold'>Phone number<input className={inputClass} name='contactPhone' type='tel' defaultValue={settings.data.contactPhone} maxLength={30} placeholder='+63 900 000 0000' /></label>
          <label className='grid gap-1.5 text-xs font-semibold sm:col-span-2'>Business address<input className={inputClass} name='address' defaultValue={settings.data.address} maxLength={160} placeholder='Street, city, province' /></label>
        </div>
      </Section>
      <Section icon={SlidersHorizontal} title='Regional preferences' description='Set the formats used for schedules and reporting.'>
        <div className='grid gap-4 sm:grid-cols-2'>
          <label className='grid gap-1.5 text-xs font-semibold'>Currency<select className={`${inputClass} appearance-auto`} name='currency' defaultValue={settings.data.currency}><option value='PHP'>PHP — Philippine peso</option><option value='USD'>USD — US dollar</option></select></label>
          <label className='grid gap-1.5 text-xs font-semibold'>Time zone<select className={`${inputClass} appearance-auto`} name='timezone' defaultValue={settings.data.timezone}><option value='Asia/Manila'>Manila (UTC+8)</option><option value='Asia/Singapore'>Singapore (UTC+8)</option><option value='America/Los_Angeles'>Los Angeles</option></select></label>
        </div>
      </Section>
      <Section icon={Bell} title='Notifications' description='Choose which operational updates are enabled.'>
        <Toggle name='orderNotifications' label='New order alerts' description='Notify the admin team when a new order is placed.' defaultChecked={settings.data.orderNotifications} />
        <Toggle name='lowStockNotifications' label='Low stock alerts' description='Flag inventory items that need to be replenished.' defaultChecked={settings.data.lowStockNotifications} />
        <Toggle name='dailySummary' label='Daily operations summary' description='Include a daily recap of orders, sales, and activity.' defaultChecked={settings.data.dailySummary} />
      </Section>
      <Section icon={ShieldCheck} title='Admin controls' description='Set an approval safeguard for sensitive workflows.'>
        <Toggle name='requireManagerApproval' label='Require manager approval' description='Keep manager review enabled for operational changes that need approval.' defaultChecked={settings.data.requireManagerApproval} />
        <div className='mt-4 flex items-start gap-2 rounded-md bg-muted/60 p-3 text-xs leading-5 text-muted-foreground'><Clock3 className='mt-0.5 size-4 shrink-0' /> Settings are stored in this browser and apply to this admin workspace.</div>
      </Section>
      <div className='flex flex-col justify-between gap-3 sm:flex-row sm:items-center'><p className='text-xs text-muted-foreground'>Saved restaurant: <strong className='font-semibold text-foreground'>{settings.data.restaurantName}</strong></p><Button type='submit' variant='soft' className='h-10 px-4 font-semibold'><Save className='size-4' /> Save settings</Button></div>
    </form>
  </div>;
}
