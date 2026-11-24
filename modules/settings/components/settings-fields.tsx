import type { Settings } from '../schema';
import { Bell, Building2, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import SettingsSection from './settings-section';
import { SelectMenu } from '@/components/select';

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
      <label className='grid gap-1.5 text-xs font-semibold'>Currency<SelectMenu label='Currency' name='currency' defaultValue={settings.currency} options={[{ value: 'PHP', label: 'PHP — Philippine peso' }, { value: 'USD', label: 'USD — US dollar' }]} className='w-full' /></label>
      <label className='grid gap-1.5 text-xs font-semibold'>Time zone<SelectMenu label='Time zone' name='timezone' defaultValue={settings.timezone} options={[{ value: 'Asia/Manila', label: 'Manila (UTC+8)' }, { value: 'Asia/Singapore', label: 'Singapore (UTC+8)' }, { value: 'America/Los_Angeles', label: 'Los Angeles' }]} className='w-full' /></label>
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

