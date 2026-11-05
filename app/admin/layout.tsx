'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

import {
  Activity,
  Boxes,
  ChefHat,
  LayoutDashboard,
  LogOut,
  Menu as MenuIcon,
  PackageCheck,
  ReceiptText,
  Settings,
  ShieldCheck,
  Store,
  Truck,
  Users,
  WalletCards,
} from 'lucide-react';

const navigationGroups = [
  {
    label: 'Operations',
    items: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, mobile: true },
      { label: 'Orders', href: '/admin/orders', icon: ReceiptText, mobile: true },
      { label: 'Kitchen', href: '/admin/kitchen', icon: ChefHat },
      { label: 'Delivery', href: '/admin/delivery', icon: Truck },
    ],
  },
  {
    label: 'Catalog',
    items: [
      { label: 'Menu', href: '/admin/menu', icon: MenuIcon, mobile: true },
      { label: 'Inventory', href: '/admin/inventory', icon: Boxes, mobile: true },
      { label: 'Promotions', href: '/admin/promotions', icon: Activity },
    ],
  },
  {
    label: 'Management',
    items: [
      { label: 'Customers', href: '/admin/customers', icon: Users, mobile: true },
      { label: 'Payments', href: '/admin/payments', icon: WalletCards },
      { label: 'Staff', href: '/admin/staff', icon: Users },
      { label: 'Payroll', href: '/admin/payroll', icon: PackageCheck },
    ],
  },
  {
    label: 'Insights',
    items: [
      { label: 'Reports', href: '/admin/reports', icon: Store },
      { label: 'Activity logs', href: '/admin/activity-logs', icon: Activity },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const isLogin = pathname === '/admin/login';

  useEffect(() => {
    if (isLogin) {
      return;
    }

    fetch('/api/admin/auth', { cache: 'no-store' })
      .then((response) => response.json())
      .then((result: { authenticated?: boolean }) => {
        if (!result.authenticated) {
          router.replace(`/admin/login?next=${encodeURIComponent(pathname)}`);
          return;
        }
        setAuthorized(true);
      })
      .catch(() => router.replace('/admin/login'));
  }, [isLogin, pathname, router]);

  async function signOut() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.replace('/admin/login');
  }

  if (isLogin) return <>{children}</>;
  if (!authorized) return <div className='admin-checking' aria-label='Checking authorization' />;

  return (
    <div className='admin-shell'>
      <aside className='admin-sidebar'>
        <Link className='admin-brand' href='/admin/dashboard'>
          <span className='admin-brand-mark'>BF</span>
          <span>
            <strong>BITEFLOW</strong>
            <small>ADMIN PORTAL</small>
          </span>
        </Link>

        <nav className='admin-nav' aria-label='Admin navigation'>
          {navigationGroups.map((group) => (
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
                  >
                    <Icon aria-hidden='true' />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <button className='admin-signout' type='button' onClick={signOut}>
          <LogOut aria-hidden='true' />
          Sign out
        </button>
      </aside>

      <main className='admin-main'>
        <header className='admin-header'>
          <div>
            <span>Administration</span>
            <strong>BiteFlow Operations</strong>
          </div>
          <div className='admin-security-badge'>
            <ShieldCheck aria-hidden='true' />
            Secure session
          </div>
        </header>
        <div className='admin-content'>{children}</div>
      </main>
    </div>
  );
}
