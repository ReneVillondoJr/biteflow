import type { ReactNode } from 'react';

import SiteHeader from '@/components/public/layout/site-header';
import SiteFooter from '@/components/public/layout/site-footer';

export default function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <SiteHeader />

      <main className='min-h-[60vh]'>{children}</main>

      <SiteFooter />
    </>
  );
}
