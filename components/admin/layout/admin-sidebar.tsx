'use client';

import Link from 'next/link';
import { LogOut } from 'lucide-react';

import { adminNavigationGroups } from './navigation';

type AdminSidebarProps = {
  pathname: string;
  onSignOut: () => Promise<void>;
};

export default function AdminSidebar({ pathname, onSignOut }: AdminSidebarProps) {
  return (
    <aside className='admin-sidebar'>
      <Link className='admin-brand' href='/admin/dashboard'>
        <span className='admin-brand-mark'>BF</span>
        <span>
          <strong>BITEFLOW</strong>
          <small>ADMIN PORTAL</small>
        </span>
      </Link>

      <nav className='admin-nav' aria-label='Admin navigation'>
        {adminNavigationGroups.map((group) => (
          <div className='admin-nav-group' key={group.label}>
            <span className='admin-nav-label'>{group.label}</span>

            {group.items.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  className={[
                    'admin-nav-link',
                    active ? 'admin-nav-link--active' : '',
                    item.mobile ? 'admin-nav-link--mobile-primary' : '',
                  ].filter(Boolean).join(' ')}
                  href={item.href}
                  key={item.href}
                  title={item.label}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon aria-hidden='true' />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <button className='admin-signout' type='button' onClick={onSignOut}>
        <LogOut aria-hidden='true' />
        Sign out
      </button>
    </aside>
  );
}
