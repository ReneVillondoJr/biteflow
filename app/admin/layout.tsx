'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

import AdminHeader from '@/components/admin/layout/admin-header';
import AdminSidebar from '@/components/admin/layout/admin-sidebar';

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
      <AdminSidebar pathname={pathname} onSignOut={signOut} />
      <main className='admin-main'>
        <AdminHeader />
        <div className='admin-content'>{children}</div>
      </main>
    </div>
  );
}
