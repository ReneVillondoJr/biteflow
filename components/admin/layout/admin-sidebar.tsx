'use client';

import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { adminNavigationGroups } from './navigation';

type AdminSidebarProps = {
  pathname: string;
  onSignOut: () => Promise<void>;
};

export default function AdminSidebar({ pathname, onSignOut }: AdminSidebarProps) {
  return (
    <>
    <aside className='fixed inset-y-0 left-0 z-40 hidden w-[256px] flex-col bg-[#102d22] px-3 py-4 text-white shadow-[12px_0_40px_rgba(16,45,34,0.08)] lg:flex'>
      <Link className='flex h-[62px] items-center gap-3 rounded-xl px-3 transition-colors hover:bg-white/[0.06]' href='/admin/dashboard'>
        <span className='flex size-11 items-center justify-center rounded-[13px] bg-[#d8ef8c] text-sm font-black tracking-tight text-[#173528] shadow-[0_8px_24px_rgba(216,239,140,0.14)]'>BF</span>
        <span>
          <strong className='block text-[13px] font-extrabold tracking-[0.08em]'>BITEFLOW</strong>
          <small className='mt-0.5 block text-[8px] font-bold tracking-[0.24em] text-white/45'>ADMIN PORTAL</small>
        </span>
      </Link>

      <nav className='mt-1 flex-1 space-y-2 overflow-y-auto px-1 pb-2' aria-label='Admin navigation'>
        {adminNavigationGroups.map((group) => (
          <div className='mb-2 grid gap-0.5' key={group.label}>
            <span className='mb-0.5 block px-3 text-[8px] font-black uppercase tracking-[0.2em] text-white/35'>{group.label}</span>

            {group.items.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  className={[
                    'group relative flex h-[38px] items-center gap-3 rounded-[10px] px-3 text-[12px] font-semibold text-white/60 transition-all hover:bg-white/[0.07] hover:text-white',
                    active ? 'bg-[#d8ef8c] text-[#173528] shadow-[0_8px_20px_rgba(216,239,140,0.12)] hover:bg-[#d8ef8c] hover:text-[#173528]' : '',
                  ].filter(Boolean).join(' ')}
                  href={item.href}
                  key={item.href}
                  title={item.label}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className='size-4' aria-hidden='true' />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <Button className='mx-1 h-10 justify-start rounded-[10px] text-white/55 hover:bg-white/[0.07] hover:text-white' variant='ghost' type='button' onClick={onSignOut}>
        <LogOut className='size-4' aria-hidden='true' />
        Sign out
      </Button>
    </aside>
    <nav className='fixed inset-x-3 bottom-3 z-50 grid h-[64px] grid-cols-5 items-center rounded-2xl border border-border bg-card/95 px-2 shadow-[0_16px_40px_rgba(32,46,37,0.16)] backdrop-blur lg:hidden' aria-label='Primary admin navigation'>
      {adminNavigationGroups.flatMap((group) => group.items).filter((item) => item.mobile).map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            className={`flex h-12 flex-col items-center justify-center gap-1 rounded-xl text-[9px] font-black ${active ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'}`}
            href={item.href}
            key={item.href}
            aria-current={active ? 'page' : undefined}
          >
            <Icon className='size-[18px]' aria-hidden='true' />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
    </>
  );
}
