 'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, ChevronDown, Search, ShieldCheck, UserRound } from 'lucide-react';
import { useMemo, useState } from 'react';

import { adminNavigationGroups } from './navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [unreadNotifications, setUnreadNotifications] = useState(['orders', 'stock']);

  const pageName = useMemo(() => {
    const item = adminNavigationGroups.flatMap((group) => group.items).find((nav) => pathname === nav.href || pathname.startsWith(`${nav.href}/`));
    return item?.label ?? 'Administration';
  }, [pathname]);

  const results = query.trim()
    ? adminNavigationGroups.flatMap((group) => group.items).filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 5)
    : [];

  function openNotification(id: string, href: string) {
    setUnreadNotifications((current) => current.filter((notificationId) => notificationId !== id));
    router.push(href);
  }

  return (
    <header className='sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-border/80 bg-background/90 px-4 backdrop-blur-xl md:px-8'>
      <div className='min-w-0'>
        <span className='block text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground'>Workspace</span>
        <strong className='mt-0.5 block text-[15px] font-semibold tracking-tight text-foreground'>{pageName}</strong>
      </div>

      <div className='relative hidden w-[280px] md:block'>
        <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#97a096]' aria-hidden='true' />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className='h-10 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-[12px] outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/15'
          placeholder='Search admin modules'
          aria-label='Search admin modules'
        />
        {query && (
          <div className='absolute left-0 right-0 top-[46px] rounded-xl border border-border bg-card p-1.5 shadow-lg'>
            {results.length ? results.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setQuery('')} className='flex h-9 items-center rounded-lg px-3 text-[12px] font-semibold text-muted-foreground hover:bg-muted hover:text-foreground'>
                {item.label}
              </Link>
            )) : <div className='px-3 py-2 text-[12px] text-[#97a096]'>No matching modules</div>}
          </div>
        )}
      </div>

      <div className='flex items-center gap-2'>
          <div className='hidden items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-[9px] font-bold text-secondary-foreground sm:flex'>
          <ShieldCheck className='size-3.5' aria-hidden='true' />
          Secure
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger aria-label={`Notifications${unreadNotifications.length ? `, ${unreadNotifications.length} unread` : ''}`} className='relative flex size-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground outline-none transition-colors hover:bg-muted'>
            <Bell className='size-4' aria-hidden='true' />
            {unreadNotifications.length > 0 ? <span className='absolute right-2 top-2 size-2 rounded-full bg-[#c78336] ring-2 ring-white' aria-hidden='true' /> : null}
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' sideOffset={6} className='w-72 rounded-xl border border-border bg-card p-1 shadow-lg ring-0'>
            <div className='flex items-center justify-between px-2.5 py-1'>
              <DropdownMenuLabel className='px-0'>Notifications</DropdownMenuLabel>
              {unreadNotifications.length ? <button type='button' className='text-[10px] font-semibold text-muted-foreground hover:text-foreground' onClick={() => setUnreadNotifications([])}>Mark all read</button> : null}
            </div>
            <DropdownMenuItem className='rounded-lg px-2.5 py-2 text-[12px]' onClick={() => openNotification('orders', '/admin/orders')}>
              <span className={`mt-1 size-1.5 shrink-0 rounded-full ${unreadNotifications.includes('orders') ? 'bg-[#c78336]' : 'bg-transparent'}`} aria-hidden='true' /><span><strong className='block font-semibold'>Review incoming orders</strong><small className='text-muted-foreground'>Open the order queue</small></span>
            </DropdownMenuItem>
            <DropdownMenuItem className='rounded-lg px-2.5 py-2 text-[12px]' onClick={() => openNotification('stock', '/admin/inventory')}>
              <span className={`mt-1 size-1.5 shrink-0 rounded-full ${unreadNotifications.includes('stock') ? 'bg-[#c78336]' : 'bg-transparent'}`} aria-hidden='true' /><span><strong className='block font-semibold'>Check stock levels</strong><small className='text-muted-foreground'>Review inventory alerts</small></span>
            </DropdownMenuItem>
            {!unreadNotifications.length ? <p className='px-3 py-2 text-[11px] text-muted-foreground'>You’re all caught up.</p> : null}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-2 pr-2.5 outline-none transition-colors hover:bg-muted'>
            <span className='flex size-7 items-center justify-center rounded-lg bg-secondary text-secondary-foreground'><UserRound className='size-4' /></span>
            <span className='hidden text-left md:block'><strong className='block text-[11px] leading-none'>Administrator</strong><small className='mt-1 block text-[9px] text-[#90988f]'>Manager</small></span>
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
