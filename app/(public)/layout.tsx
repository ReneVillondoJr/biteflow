import type { ReactNode } from 'react';

import SiteHeader from '@/components/public/layout/site-header';
import SiteFooter from '@/components/public/layout/site-footer';
import { CartProvider, CartStorageNotice } from '@/modules/cart/provider';

export default function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <CartProvider>
      <div className='public-site'>
        <SiteHeader />
        <CartStorageNotice />

        <main className='min-h-[60vh]'>{children}</main>

        <SiteFooter />
      </div>
    </CartProvider>
  );
}
