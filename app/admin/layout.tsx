'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';

import AdminHeader from '@/components/admin/layout/admin-header';
import AdminSidebar from '@/components/admin/layout/admin-sidebar';
import { Skeleton } from '@/components/ui/skeleton';

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

  return (
    <div className='min-h-screen bg-[#f4f6f1] text-foreground'>
      <AdminSidebar pathname={pathname} onSignOut={signOut} />
      <main className='min-h-screen min-w-0 lg:ml-[256px]'>
        <AdminHeader />
        <div className='relative mx-auto w-full max-w-[1480px] p-4 pb-24 md:p-6 lg:pb-6'>
          {!authorized && (
            <div className='grid gap-4' role='status' aria-label='Checking authorization'>
              <Skeleton className='h-24 w-full rounded-xl' />
              <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
                {[0, 1, 2, 3].map((item) => <Skeleton className='h-28 rounded-xl' key={item} />)}
              </div>
            </div>
          )}
          <div
            className={authorized ? '' : 'pointer-events-none hidden'}
            aria-hidden={!authorized}
          >
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
