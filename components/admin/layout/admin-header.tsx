 'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, ChevronDown, Search, UserRound } from 'lucide-react';
import { useMemo, useState } from 'react';

import { adminNavigationGroups } from './navigation';
import { useSettingsData } from '@/modules/settings/data/store';
import { useInventoryData } from '@/modules/inventory/data/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [unreadNotifications, setUnreadNotifications] = useState(['orders']);
  const { data: settings } = useSettingsData();
  const inventory = useInventoryData();
  const lowStockItems = settings.lowStockNotifications
    ? inventory.data.items.filter((item) => item.quantity <= item.reorderAt)
    : [];
  const unreadCount = unreadNotifications.length + lowStockItems.length;
  const allowed = settings.roleAccess[settings.navigationRole];
  const visibleItems = adminNavigationGroups.flatMap((group) => group.items).filter((item) => allowed.includes(item.href.split('/').at(-1) as (typeof allowed)[number]));

  const pageName = useMemo(() => {
    const item = visibleItems.find((nav) => pathname === nav.href || pathname.startsWith(`${nav.href}/`));
    return item?.label ?? 'Administration';
  }, [pathname, visibleItems]);

  const results = query.trim()
    ? visibleItems.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 5)
    : [];

  function openNotification(id: string, href: string) {
    setUnreadNotifications((current) => current.filter((notificationId) => notificationId !== id));
    router.push(href);
  }

  return (
    <header className='sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-card/95 px-4 backdrop-blur-xl md:px-6'>
      <div className='min-w-0'>
        <span className='block text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground'>Admin</span>
        <strong className='mt-0.5 block truncate text-sm font-semibold tracking-tight text-foreground'>{pageName}</strong>
      </div>

      <div className='relative hidden w-[min(360px,36vw)] md:block'>
        <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#97a096]' aria-hidden='true' />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className='search-field-input h-9 w-full pl-9 pr-3 text-xs outline-none'
          placeholder='Search modules'
          aria-label='Search admin modules'
        />
        {query && (
          <div className='absolute left-0 right-0 top-[42px] border border-border bg-card p-1 shadow-lg'>
            {results.length ? results.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setQuery('')} className='flex h-9 items-center px-3 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground'>
                {item.label}
              </Link>
            )) : <div className='px-3 py-2 text-[12px] text-[#97a096]'>No matching modules</div>}
          </div>
        )}
      </div>

      <div className='flex shrink-0 items-center gap-2 border-l border-border pl-3'>
        <DropdownMenu>
          <DropdownMenuTrigger aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`} className='relative flex size-9 items-center justify-center border border-transparent bg-transparent text-muted-foreground outline-none transition-colors hover:border-border hover:bg-muted'>
            <Bell className='size-[17px]' aria-hidden='true' />
            {unreadCount > 0 ? <span className='absolute right-2 top-2 size-2 rounded-full bg-[#c78336] ring-2 ring-white' aria-hidden='true' /> : null}
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' sideOffset={6} className='w-72 rounded-xl border border-border bg-card p-1 shadow-lg ring-0'>
            <DropdownMenuGroup>
              <div className='flex items-center justify-between px-2.5 py-1'>
                <DropdownMenuLabel className='px-0'>Notifications</DropdownMenuLabel>
                {unreadCount ? <button type='button' className='text-[10px] font-semibold text-muted-foreground hover:text-foreground' onClick={() => setUnreadNotifications([])}>{lowStockItems.length ? 'Mark orders read' : 'Mark all read'}</button> : null}
              </div>
              <DropdownMenuItem className='rounded-lg px-2.5 py-2 text-[12px]' onClick={() => openNotification('orders', '/admin/orders')}>
                <span className={`mt-1 size-1.5 shrink-0 rounded-full ${unreadNotifications.includes('orders') ? 'bg-[#c78336]' : 'bg-transparent'}`} aria-hidden='true' /><span><strong className='block font-semibold'>Review incoming orders</strong><small className='text-muted-foreground'>Open the order queue</small></span>
              </DropdownMenuItem>
              {lowStockItems.length ? (
                <DropdownMenuItem className='rounded-lg px-2.5 py-2 text-[12px]' onClick={() => router.push('/admin/inventory')}>
                  <span className='mt-1 size-1.5 shrink-0 rounded-full bg-[#c78336]' aria-hidden='true' />
                  <span>
                    <strong className='block font-semibold'>Low inventory stock ({lowStockItems.length})</strong>
                    <small className='text-muted-foreground'>
                      {lowStockItems.slice(0, 3).map((item) => item.name).join(', ')}
                      {lowStockItems.length > 3 ? ` +${lowStockItems.length - 3} more` : ''}
                      {' '}at or below reorder level
                    </small>
                  </span>
                </DropdownMenuItem>
              ) : null}
              {!unreadNotifications.length && !lowStockItems.length ? <p className='px-3 py-2 text-[11px] text-muted-foreground'>You’re all caught up.</p> : null}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger aria-label='Open administrator account menu' className='flex h-9 items-center gap-2 border border-transparent bg-transparent px-2 outline-none transition-colors hover:border-border hover:bg-muted'>
            <span className='flex size-7 items-center justify-center bg-primary text-primary-foreground'><UserRound className='size-3.5' /></span>
            <span className='hidden text-left md:block'><strong className='block text-[11px] leading-none'>Administrator</strong><small className='mt-1 block text-[9px] text-muted-foreground'>Manager</small></span>
            <ChevronDown className='hidden size-3.5 text-muted-foreground md:block' />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' sideOffset={6} className='w-48 rounded-xl border border-border bg-card p-1 shadow-lg ring-0'>
            <DropdownMenuItem className='rounded-lg px-2.5 py-2 text-[12px]'><Link href='/admin/settings' className='w-full'>Account settings</Link></DropdownMenuItem>
            <DropdownMenuItem className='rounded-lg px-2.5 py-2 text-[12px]'><Link href='/admin/activity-logs' className='w-full'>Activity logs</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
