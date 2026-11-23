import type { Settings } from '../schema';
import { Bell, Building2, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import SettingsSection from './settings-section';

const inputClass = 'h-10 w-full rounded-md border border-input bg-white px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/30';

export function RestaurantDetails({ settings }: { settings: Settings }) {
  return <SettingsSection icon={Building2} title='Restaurant details' description='Contact information shown to your team and customers.'>
    <div className='grid gap-4 sm:grid-cols-2'>
      <label className='grid gap-1.5 text-xs font-semibold sm:col-span-2'>Restaurant name<input className={inputClass} name='restaurantName' defaultValue={settings.restaurantName} minLength={2} maxLength={80} required /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Contact email<input className={inputClass} name='contactEmail' type='email' defaultValue={settings.contactEmail} /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Phone number<input className={inputClass} name='contactPhone' type='tel' defaultValue={settings.contactPhone} maxLength={30} placeholder='+63 900 000 0000' /></label>
      <label className='grid gap-1.5 text-xs font-semibold sm:col-span-2'>Business address<input className={inputClass} name='address' defaultValue={settings.address} maxLength={160} placeholder='Street, city, province' /></label>
    </div>
  </SettingsSection>;
}

export function RegionalPreferences({ settings }: { settings: Settings }) {
  return <SettingsSection icon={SlidersHorizontal} title='Regional preferences' description='Set the formats used for schedules and reporting.'>
    <div className='grid gap-4 sm:grid-cols-2'>
      <label className='grid gap-1.5 text-xs font-semibold'>Currency<select className={`${inputClass} appearance-auto`} name='currency' defaultValue={settings.currency}><option value='PHP'>PHP — Philippine peso</option><option value='USD'>USD — US dollar</option></select></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Time zone<select className={`${inputClass} appearance-auto`} name='timezone' defaultValue={settings.timezone}><option value='Asia/Manila'>Manila (UTC+8)</option><option value='Asia/Singapore'>Singapore (UTC+8)</option><option value='America/Los_Angeles'>Los Angeles</option></select></label>
    </div>
  </SettingsSection>;
}

export function NotificationPreferences({ settings }: { settings: Settings }) {
  return <SettingsSection icon={Bell} title='Notifications' description='Choose which operational updates are enabled.'>
    <SettingsToggle name='orderNotifications' label='New order alerts' description='Notify the admin team when a new order is placed.' checked={settings.orderNotifications} />
    <SettingsToggle name='lowStockNotifications' label='Low stock alerts' description='Flag inventory items that need to be replenished.' checked={settings.lowStockNotifications} />
    <SettingsToggle name='dailySummary' label='Daily operations summary' description='Include a daily recap of orders, sales, and activity.' checked={settings.dailySummary} />
  </SettingsSection>;
}

export function AdminControls({ settings }: { settings: Settings }) {
  return <SettingsSection icon={ShieldCheck} title='Admin controls' description='Set an approval safeguard for sensitive workflows.'>
    <SettingsToggle name='requireManagerApproval' label='Require manager approval' description='Keep manager review enabled for operational changes that need approval.' checked={settings.requireManagerApproval} />
  </SettingsSection>;
}

function SettingsToggle({ name, label, description, checked }: { name: string; label: string; description: string; checked: boolean }) {
  return <label className='flex cursor-pointer items-start justify-between gap-4 border-b border-border py-4 last:border-0'>
    <span><span className='block text-sm font-semibold'>{label}</span><span className='mt-1 block text-xs leading-5 text-muted-foreground'>{description}</span></span>
    <input name={name} type='checkbox' defaultChecked={checked} className='mt-1 size-4 shrink-0 accent-primary' />
  </label>;
}

