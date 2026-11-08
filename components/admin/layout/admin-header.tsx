 'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const [query, setQuery] = useState('');

  const pageName = useMemo(() => {
    const item = adminNavigationGroups.flatMap((group) => group.items).find((nav) => pathname === nav.href || pathname.startsWith(`${nav.href}/`));
    return item?.label ?? 'Administration';
  }, [pathname]);

  const results = query.trim()
    ? adminNavigationGroups.flatMap((group) => group.items).filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 5)
    : [];

  return (
    <header className='sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-[#e8ebe4] bg-[#fbfcf9]/95 px-4 backdrop-blur-xl md:px-7'>
      <div className='min-w-0'>
        <span className='block text-[9px] font-black uppercase tracking-[0.18em] text-[#7f897f]'>Workspace</span>
        <strong className='mt-0.5 block text-[15px] font-bold tracking-tight text-[#20372c]'>{pageName}</strong>
      </div>

      <div className='relative hidden w-[280px] md:block'>
        <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#97a096]' aria-hidden='true' />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className='h-10 w-full rounded-md border border-[#dde3da] bg-white pl-9 pr-3 text-[12px] outline-none placeholder:text-[#9da59c] focus:border-[#dde3da] focus:bg-white'
          placeholder='Search admin modules'
          aria-label='Search admin modules'
        />
        {query && (
          <div className='absolute left-0 right-0 top-[46px] rounded-md border border-[#e4e8df] bg-white p-1.5 shadow-[0_16px_40px_rgba(32,46,37,0.12)]'>
            {results.length ? results.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setQuery('')} className='flex h-9 items-center rounded-lg px-3 text-[12px] font-semibold text-[#5e695f] hover:bg-[#f1f4ed] hover:text-[#20372c]'>
                {item.label}
              </Link>
            )) : <div className='px-3 py-2 text-[12px] text-[#97a096]'>No matching modules</div>}
          </div>
        )}
      </div>

      <div className='flex items-center gap-2'>
        <div className='hidden items-center gap-1.5 rounded-md border border-[#dce6d5] bg-[#f4f7ef] px-2.5 py-1.5 text-[9px] font-black text-[#53704f] sm:flex'>
          <ShieldCheck className='size-3.5' aria-hidden='true' />
          Secure
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className='relative flex size-10 items-center justify-center rounded-md border border-[#e3e7df] bg-white text-[#627064] shadow-sm outline-none hover:bg-[#f4f6f1]'>
            <Bell className='size-4' aria-hidden='true' />
            <span className='absolute right-2 top-2 size-1.5 rounded-full bg-[#e2a65b] ring-2 ring-white' />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-72 rounded-md'>
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuItem>3 new orders need review</DropdownMenuItem>
            <DropdownMenuItem>Kitchen queue is running normally</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex h-10 items-center gap-2 rounded-md border border-[#e3e7df] bg-white px-2 pr-2.5 shadow-sm outline-none hover:bg-[#f4f6f1]'>
            <span className='flex size-7 items-center justify-center rounded-md bg-[#e8efdf] text-[#3c6048]'><UserRound className='size-4' /></span>
            <span className='hidden text-left md:block'><strong className='block text-[11px] leading-none'>Administrator</strong><small className='mt-1 block text-[9px] text-[#90988f]'>Manager</small></span>
            <ChevronDown className='hidden size-3.5 text-[#9aa298] md:block' />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-48 rounded-md'>
            <DropdownMenuItem><Link href='/admin/settings' className='w-full'>Account settings</Link></DropdownMenuItem>
            <DropdownMenuItem><Link href='/admin/activity-logs' className='w-full'>Activity logs</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
