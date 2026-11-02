import type { ReactNode } from 'react';

import SiteHeader from '@/components/public/layout/site-header';
import SiteFooter from '@/components/public/layout/site-footer';

export default function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main>
      <SiteHeader />

      <main className='public-main'>{children}</main>

      <SiteFooter />
    </main>
  );
}
